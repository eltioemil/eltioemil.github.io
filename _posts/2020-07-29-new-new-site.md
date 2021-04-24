---
title: New, new site
layout: post
category:
  - jekyll
---

I got tired of the original site based on minima theme (yeah, I got tired real quick, sometimes), so I decided to modify a [`quite nice and clean template that I found which is called Tale`](https://github.com/chesterhow/tale){:target="\_blank"}. But I added some features that I had in the old one, changed some tiny details and I am sure I will be changing more in the future.

I wanted to change and give posts more importance, so I decided to land in the post section and then, if someone is interested on my resume, they can just navigate to about.

At this point I don't know if anyone reads me or I am just writing to me, but, that works either. I might add some categories to not just write about technology, I will meditate about that.

### Edit:

I found this cool codepen for the scroll thingy on the right of the page, I adapted it a bit but not much, credit: [`https://codepen.io/Askwithloud/pen/yNxQvm`](https://codepen.io/Askwithloud/pen/yNxQvm){:target="\_blank"}

Also I added header shrink on scroll to reduce header occupation on top of the page.

#### Edit 2:

I also added `Simple Jekyll Search`, to the site. Credit: [`https://github.com/christian-fei/Simple-Jekyll-Search`](https://github.com/christian-fei/Simple-Jekyll-Search){:target="\_blank"}.

#### Edit 3:

I decided to stop using Hyvor Talk to manage site comments due they use Google Analytics to track user activity on your site. I don't use Google Analytics myself, so, why do I have to use it through Hyvor Talk?

I started looking for new ways to post comments on this site, disqus was the most extended solution apparently, but it also tracks and shows adds in your site. But then I found this tiny project called [`https://utteranc.es/`](https://utteranc.es/){:target="\_blank"}, which was pretty nice an clean. It is based on Github issues to store your comments, but it creates the issues for you and it does not make you go to Github if you want to post a comment because it embeds a comment box in your site.

It uses a bot installed in Cloudfare Jobs to centralise and secure Github issue creation, so you don't have to store plain secrets in your site [like this one](https://aristath.github.io/blog/static-site-comments-using-github-issues-api) LOL. And is pretty nice and easy to use. So, despite the fact that it would be nice to disable token cookie creation (for GDPR), it's a great way to enable Github stored comments in your site.

#### Edit 4:

I didn't like the default syntax highlighter so I decided to add [`prismjs.com`](prismjs.com){:target="\_blank"}. It's a pretty easy tool to use, you just select the languages, plugins and themes you want and it will generate 2 files, javascript and css. You only need to load them into your code and disable jekyll default highlighter by adding in your `_config.yml` this little yaml config:

```yaml
kramdown: 
  syntax_highlighter_opts:
    disable : true
```

There are plenty of themes and plugins to select, and language support is huge, it also supports many popular configuration syntaxes for Admins, which is my preference.