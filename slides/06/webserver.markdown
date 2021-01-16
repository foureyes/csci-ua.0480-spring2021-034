---
layout: slides
title: "A Simple Web Server"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## A Live Coding Experiment! 

* Goal - make a library that allows you to do something like ...
* Architecture
    * App
        * listen
        * get
    * Request
        * path
        * headers
        * body
    * Response
        * write
        * end
        * setHeader
        * send
</section>

<section markdown="block">
## Let's Try to Do This

* Serve an HTML Page
* A quick diversion into fs.readFile
* Serve an Image
* Wrap everything in an App object
    * watch out for _this_ and callbacks!!!
* Wrap response in Response object
* In class activity
* Switch Response based on parsed request
</section>

