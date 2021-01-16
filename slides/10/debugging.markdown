---
layout: slides
title: "Tools, Web Browsers, and Debugging"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Paths

* absolute vs relative
* on your computer
* on your site, relative to a url
</section>

<section markdown="block">
## Redirects

* what's a 301?
* why redirect?
* how does a redirect work
* let's try curl...
</section>

<section markdown="block">
## Speed Up, Slow Down

__Name some browser features that speed up page load times / browsing experience. Name one that makes our development tricky!__ &rarr;

Caching... 	
{:.fragment}

* use incognito mode
* command (or ctrl) shift + r
* even redirects get cached(!)
* 304s (Not Modified?)
{:.fragment}

</section>

<section markdown="block">
## Tools

* curl
* browser
* stack trace
* node debugger
</section>

<section markdown="block">
## Some Problems

* html isn't showing up!
* where's my css?
* initialized handlebars incorrectly (that's a crazy stack trace!)
</section>
