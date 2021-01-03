---
title: "Playing with EKS 2: Kube2iam on EKS"
layout: post
date: "2020-06-28 18:00:00 +0200"
category:
  - kubernetes
---

In the last entry on this blog I wrote about giving permissions to k8s service accounts with IRSA and OIDC in EKS clusters. But, before that method was available, there was (and still is) a repository called [`kube2iam`](https://github.com/jtblin/kube2iam){:target="\_blank"} created by Jerome Touffe-Blin, which allowed to use IAM roles to give permissions to our deployments, PODs, replicasets, etc.

Long story short, what I do (and I will explain further) is to allow worker IAM role to assume whatever the role I need (with some restrictions). Then, I pass this role to the PODs through annotations. And this will let the node where the PODs are running to assume permissions to achieve what the POD needs.

Obviously, this only makes sense when you try to get, create or destroy AWS resources from your PODs (or Jobs), for instance, [`Kubernetes Cluster Autoscaler`](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler){:target="\_blank"} will need permissions in order to change ASG values from within a POD in order to achieve scale up or down. This is a common example on how `kube2iam` is used and I will use it for this post, also is the same that I used in the other post so I will be able to see how different they are.

### **TL;DR**

Basically what I do is:

- Create a policy that allows to assume any role in the cluster.
- Attach that policy to the workers IAM role (If I need to run PODs that need `kube2iam` in the master, then we also include master's role).
- Create a role with the permissions that I need my PODs to have, and add a trust policy that allows assume role to workers IAM role ARN's.
- Pass the role to our POD's, deployments, etc through annotations.

### **How we do this**

In the last post, I used terraform for all the examples, so I will do the same here:

#### **Create a very dangerous policy**

We need to allow workers to assume whatever roles we create in the future for working with `kube2iam`. We can simply create this policy and attach it to the workers IAM role, but I would strongly not recommend doing this:

> ⚠ **Do not just copy paste without reading, please.**

```hcl
data "aws_iam_policy_document" "cluster_kube2iam_document" {
  statement {
    effect = "Allow"
    actions = [
      "sts:AssumeRole"
    ]
    resources = ["*"] # Do not do this
  }
}
```

The policy above, will work, but, our worker nodes will be able to assume any role. In the scenario that our kubernetes cluster gets compromised, an attacker will be able to use our worker nodes to assume any role in our AWS account, and that includes giving admin privileges to whatever the attacker wants. Including; yes, you guessed it, the attacker.

So I suggest to be really careful with this and make sure about two things:

- One, our worker IAM roles have the strictly necessary privileges to run our cluster.
- Two, we create a role prefix or a custom path or both so we make sure we can only assume the roles we want and not every role in the account. An example for this would be:

```hcl
data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "cluster_kube2iam_document" {
  statement {
    effect = "Allow"
    actions = [
      "sts:AssumeRole"
    ]
    resources = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/whatever/custom/path/${var.prefix-for-kube2iam-only}*"]
  }
}
```

This way, it will only be able to assume the roles that match this "filter" and we will create the roles we want to use with kube2iam following that structure. But, still, be careful with this.

#### **Attach the policy to the workers role**

Now we have our policy, we just attach it to the worker role. If, for any reason, we need to run a POD in the masters that needs to use `kube2iam`, we will attach this policy to our master IAM role too. An example would be:

```hcl
resource "aws_iam_policy" "cluster_kube2iam_policy" {
  name   = "kube2iam-assume-policy"
  path   = "/whatever/custom/path/" #This is optional
  policy = data.aws_iam_policy_document.cluster_kube2iam_document.json
}

resource "aws_iam_role_policy_attachment" "cluster_kube2iam_attach" {
  role       = aws_iam_role.your_eks_workers.id
  policy_arn = aws_iam_policy.cluster_kube2iam_policy.arn
}
```

Now, our worker nodes can assume any roles that match our pattern.

#### **Create the role that will be assumed by the worker nodes**

Now we create a IAM role that will trust our worker nodes:

```hcl
data "aws_iam_policy_document" "ec2_assume_role_policy_autoscaler" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "AWS"
      identifiers = [
        aws_iam_role.eks_workers.arn,
      ]
    }
  }
}

resource "aws_iam_role" "cluster_autoscaler" {
  name               = "autoscaler-role"
  path               = "/whatever/custom/path/"
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role_policy_autoscaler.json
}
```

And, following our Cluster Autoscaler example, we will create a role that can modify our workers ASG:

```hcl
data "aws_iam_policy_document" "cluster_autoscaler_document" {
  statement {
    effect = "Allow"
    actions = [
      "autoscaling:DescribeAutoScalingGroups",
      "autoscaling:DescribeAutoScalingInstances",
      "autoscaling:DescribeLaunchConfigurations",
      "autoscaling:DescribeTags",
      "ec2:DescribeLaunchTemplateVersions"
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "autoscaling:SetDesiredCapacity",
      "autoscaling:TerminateInstanceInAutoScalingGroup"
    ]
    resources = [ aws_autoscaling_group.workers_asg.arn ] #Our worker ASG arn.
  }
}

resource "aws_iam_policy" "cluster_autoscaler_policy" {
  name   = "cluster_autoscaler_policy"
  path   = "/whatever/custom/path/"
  policy = data.aws_iam_policy_document.cluster_autoscaler_document.json
}

resource "aws_iam_role_policy_attachment" "cluster_autoscaler_attachment" {
  role       = aws_iam_role.cluster_autoscaler.id
  policy_arn = aws_iam_policy.cluster_autoscaler_policy.arn
}
```

What we did here is to create an IAM role that can be assumed by our worker nodes that is allowed to read any information related with the ASG's in the account, and can modify capacity of our workers ASG. We limited functionality to the minimum possible for security reasons.

#### **Last but not least**

The only missing step is to grant our PODs permission to use this IAM role. I used helm provider for kubernetes to deploy Cluster Autoscaler, like we mentioned in the [`previous post`](k8s-kube2iam-eks.html){:target="\_blank"}. So, following that, what we need to do is to create an annotation in our PODs definition, or, in my case, to the deployment template through a helm chart, this is a basic example:

```hcl
resource "helm_release" "cluster_autoscaler" {
  name       = "cluster-autoscaler"
  namespace  = var.your_namespace
  repository = var.your_helm_repository_url
  chart      = "cluster-autoscaler"
  version    = var.autoscaler_chart_version

  set {
    name  = "autoDiscovery.clusterName"
    value = var.cluster_name
  }

  set {
    name  = "awsRegion"
    value = data.aws_region.current.name
  }

  set {
    name  = "rbac.create"
    value = "true"
  }

  set {
    name  = "sslCertPath"
    value = "/etc/ssl/certs/ca-certificates.crt"
  }

  set {
    name  = "sslCertHostPath"
    value = "/etc/ssl/certs/ca-bundle.crt"
  }

  # In order to use kube2iam, role should be specified with an annotation
  set {
    name  = "podAnnotations.iam\\.amazonaws\\.com/role"
    value = aws_iam_role.cluster_autoscaler.arn
  }

  set {
    name  = "extraArgs.skip-nodes-with-local-storage"
    value = "false"
  }

  set {
    name  = "extraArgs.skip-nodes-with-system-pods"
    value = "false"
  }
}

```

And that is pretty much it. Our CA will be able to control our worker's ASG size.

### **Coming up next**

I'm not completely sure, but I would probably write about Pod Security Policies on my next post. I will write about how they work, patterns and best practices.
