---
layout: slides
title: "About Class #17"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* HTML Primer, JavaScript and the Browser
* Document Object Model
* Miscellaneous Stuff:
	* Checkboxes and Hidden Input
	* Nodemon Demo
	* Homework
	* Quiz Demo
	* Final Projects
	* Midterm
	* (Moving on to Client Side)
</section>

<section markdown="block">
## Checkboxes and Hidden Input


Check out the previous slides on [revisiting forms](../slides/11/forms-revisited.html)

</section>
<section markdown="block">
## Nodemon

Use __nodemon__ to automatically restart your server whenever file changes occur:

<pre><code data-trim contenteditable>
# install it
npm install -g nodemon
</code></pre>

<pre><code data-trim contenteditable>
# run your project calling nodemon... and the executable for your project
nodemon bin/www
</code></pre>

<pre><code data-trim contenteditable>
# sometimes you have to specify the exact extensions to monitor
nodemon bin/www -e "js hbs css html"
</code></pre>

</section>

<section markdown="block">
## Homework

Homework #6 is posted:

* it's about creating grocery lists
* __let's check it out__ &rarr;
* ... authentication is extra credit
	* because it's a bit lengthy and covers a few more topics that we haven't gotten a chance to go over
	* and I wanted to assign a take-from-home quiz (finally)

</section>

<section markdown="block">
## Quiz

Since we're easing out of server side development, I want to make sure everyone's caught up with HTML/CSS. I've put gathered some tutorials / articles in case you need a refresher.

</section>

<section markdown="block">
## Final Projects

Initial requirements to be posted this evening... but bascially: 

* open ended, database backed site
* a few milestones throughout the semester 
</section>

<section markdown="block">
## Midterm Exams

* 60 points total
* average was around 46 points (77-78%)
* median was close... 48 points (80%)
* minor curve - 2 points
* solutions are posted
* midterm grades (mostly from exam based on split between exams and homework)

</section>
