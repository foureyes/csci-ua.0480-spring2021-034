---
layout: slides
title: "About Class #5"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
# Oh hello. Homework, please!
</section>

<section markdown="block">
## About the Homework

Yeah. Soooo... I made a couple of typos.

__Let's talk about shuffling first.__ &rarr;

<div markdown="block" class="img">
![shuffling]({{ site.vars.slides_img_prefix }}/shuffling.gif)
</div>
{:.fragment}

__Oh, I mean the other shuffling.__ &rarr;
{:.fragment}

<div markdown="block" class="img">
![shuffle cards]({{ site.vars.slides_img_prefix }}/shuffle-cards.gif)
</div>
{:.fragment}

</section>

<section markdown="block">
## I Actually Really Meant Algorithmic Shuffling

### (That previous gif seems like an ineffective technique)

How about [something like this](http://bost.ocks.org/mike/shuffle/)?  (I outlined a couple of algorithms in the assignment; the previous article shows an additional 3rd possibility).

* the shuffling algorithm __should use <code>splice</code>__ (the previous description of the algorithm had a typo; it incorrectly stated <code>slice</code> as the function to use)
	* though clearly, just using <code>slice</code> would be adequate too... just _not so efficient_ ([check out the 2nd animation, "One slow option"](http://bost.ocks.org/mike/shuffle/))
* note that <code>splice</code> __returns an Array__! [check out the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
</section>

<section markdown="block">
## Another Typo (Much Less Excusable)

This one's all on me. Aces count as either:

* __11__
* ...or __1__
* (previously, the description mentioned 10)
</section>

<section markdown="block">
## Any Other Questions About the Homework?

### Generally, you can resubmit if you need to...
</section>

<section markdown="block">
## A Few Other Observations

* {:.fragment} __comments if you got 'em__ (code should speak for itself with meaningful variable names and legible formatting; if it doesn't, use comments)
* {:.fragment} __you probably shouldn't hardcode__ every single object in <code>generateCards</code>
* {:.fragment} __commit often__! it'd be great to commit by feature. (even better to branch per feature, but we're not there yet)
* {:.fragment} __it's not a complete blackjack game__ by any means (what about quitting? doubling down? etc.)... feel free to implement these if you like!
</section>

<section markdown="block">
## Topics

* String and Array Methods Review
* Finish Up Objects Basics
* Higher Order Functions
</section>

<section markdown="block">
## Where are We?

__In the midst of the _fun_ stuff.__ &rarr;

* we'll continue to look at higher order functions, prototypes and design patterns in JavaScript for 3 classes. 
* we'll start talkin' web by next Thursday (maybe earlier?)

<div markdown="block" class="img">
![Waldo]({{ site.vars.slides_img_prefix }}/waldo.jpg)
</div>
{:.fragment}
</section>

