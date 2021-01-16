---
layout: slides
title: "About Class #6"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
<section markdown="block">
# Hey. So You Turned in Your Homework.

### (nice)
</section>

<section markdown="block">
## A Few Additional Notes


* <code>indexOf</code>
* <code>total += isNaN(+ele.face) ? 10 : +ele.face;</code>
* <code>Number</code>, <code>Array</code> ... in function signature
* avoid using names of built-in objects!
* _using git_ (this deserves a quick run down)

</section>

<section markdown="block">
## Using Git

__Um... why are we using git again (really, though)?__ &rarr;

* it become the standard version control system used today
* you will definitely be using it if you end up working as professional program
{:.fragment}

<br>
__Why github then?__ &rarr;
{:.fragment}

* it's an easy, centralized way for me to collect your homework
* it also keeps track of meta data (commit messages and dates, diffs, etc.)
* can be used as _your_ portfolio (and often, employers/interviewers look for sample code)
* widely used as platform to host projects
{:.fragment}

</section>

<section markdown="block">
## What's the General Workflow?

If we want to change some files and send them to our _remote repository_, __what are the steps that should be followed?__ &rarr;

1. make changes
2. stage your changes
3. save your changes
4. send your changes to the remote repository
{:.fragment}

</section>

<section markdown="block">
## Git Workflow Continued

Loosely, that translates to the following commands... __(Anyone know?)__ &rarr;

<pre><code data-trim contenteditable>
# make changes

# what changes are there?
git status

# stage
git add --all

# save to local repository
git commit -m 'a commit message'

# send to remote repository
git push
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Git Continued

* I'll set up a quick guide
* watch out for dropping off the -m flag
	* you can quit vim by <ESC>:q!
	* or you can export your EDITOR environment variable to _whatevs_ in .bash_profile (or is it .bashrc)?
</section>

<section markdown="block">
## Topics

So... today, only two things:

* finish up higher order functions (I'm sure you can't wait)
* objects revisited, start looking at prototypes

</section>

<section markdown="block">
## Back to Homework

* the next homework should be posted by 11pm this evening 
	* most likely based off of exercises in chapters 5 and 6 in the book
	* ... or on the project from Chapter 7, Electronic Life
* grades for homework #1 should be posted by end of next week

</section>
