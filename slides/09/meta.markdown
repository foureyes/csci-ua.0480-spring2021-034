---
layout: slides
title: "About Class #9"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## 

* express basics
    * demo: routes
    * demo: using sendFile
    * demo: serving static files
    * global variables vs variables in functions
* request and response objects properties and methods
    * demo: use get and set, logging headers 
* templating
    * demo: iterate over list of things
* what is post about?
    * bodyparser
    * demo: guessing game
    * iterate: prg
* briefly about middleware
    * applications?
    * demo: logging
    * demo: injecting data into req or res, like:
        * adding a header to the response
        * if content type text/html, replace body with....
* cookies / sessions
* homework
* onresponse module

</section>
<section markdown="block">
## Topics

* Finish Out Intro to Express
* Request and Response Objects
* Templating
* Maybe 
	* Middleware
	* Remote Server Administration
	* Debugging,  Tools
* Templating
</section>

<section markdown="block">
## Homework

* Questions?
* fs read
* express-handlebars
* objects.js posted tonight
</section>

<section markdown="block">
## Lots of Moving Parts

__How many 'languages' are we using? What are some things we have to keep track of, and where can things go wrong?__ (hint... everywhere!)&rarr;

* in your server side JavaScript
* html
* css
* in your templates
* pathing issues / directory structure
* reading files
{:.fragment}


<br>
(__whew!__)
{:.fragment}
</section>

<section markdown="block">
## How Do We Debug

Easy ways to debug:

* Chrome developer tools
* Logging on the server side

</section>
