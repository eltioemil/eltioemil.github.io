---
title: New, new site
layout: post
category:
  - jekyll
comments_id: 6
---

I got tired of the original site based on minima theme (yeah, I got tired real quick, sometimes), so I decided to modify a [`quite nice and clean template that I found which is called Tale`](https://github.com/chesterhow/tale){:target="\_blank"}. But I added some features that I had in the old one, changed some tiny details and I am sure I will be changing more in the future.

I wanted to change and give posts more protagonism, so I decided to land in the post section and then, if someone is interested on my resume, they can just navitage to about.

At this point I don't know if anyone reads me or I am just writing to me, but, that works either. I might add some categories to not just write about technology, I will meditate about that.

### Edit:

I found this cool codepen for the scroll thingy on the right of the page, I adapted it a bit but not much, credit: [`https://codepen.io/Askwithloud/pen/yNxQvm`](https://codepen.io/Askwithloud/pen/yNxQvm){:target="\_blank"}

Also I added header shrink on scroll to reduce header ocupation on top of the page.

#### Edit 2:

I also added `Simple Jekyll Search`, to the site. Credit: [`https://github.com/christian-fei/Simple-Jekyll-Search`](https://github.com/christian-fei/Simple-Jekyll-Search){:target="\_blank"}.

#### Edit 3:

I added a cookie warning banner, just to say that the only cookie is the cookie consent banner cookie. Which is pretty absurd, but it is what it is. As I don't want to have tracking cookies on this site, it's been quite hard to find ways to add functionality without that. I don't even like functionality cookies from third-party apps that I don't control, because I would have to read all the policies and agreements to make sure that they don't use any tracking in the background. I honestly don't have time to investigate that deep. But I am pretty sure that tools like disqus or hyvor use tracking on the background. As they either post adds or use Google Analytics under the hood.

But still, I wanted to add comments. So I found this guy that made this tiny javascript to use github issues as comments, but in a rudimentary way, not the way that utteranc.es does. This javascript does not embed the comments dialog on the post or creates the issue automatically, it requies that you manually create the issue and then people have to go over there to post a comment. But, if anyone cares enough to do that in order to comment, then I will might care about that comment. And I believe I will save much noise (not that I have much right now...) by using comments this way.

If you want to know more about this, just visit his blog and find out how he did it. I might improve it a bit more if I have time, maybe. [This is the blog post](https://aristath.github.io/blog/static-site-comments-using-github-issues-api){:target="\_blank"} where he explains the basics.

__One security concern, though__. This guy encourages you to create a Github APP ID and secret to avoid the limitation of 60 requests per hour on Github API. He actually stores his APP ID and Secret on his website repo, plain text and public, which is not great. My opinion is that this works if you don't have many comments or if you don't care that people might reload your page several times until they reach the limitation (which is my case). If you want to extend API limits, this is not the best way to implement comments, find another way. Never checkout secrets on a repo, even if it's private.
