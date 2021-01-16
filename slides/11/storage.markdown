---
layout: slides
title: "Persistent Storage"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Storing Birds!

In our birdwatcher site, __where did we store our data__? &rarr;

* {:.fragment} in a global variable in our Express application
* {:.fragment} __and where does that application live?__ &rarr;
* {:.fragment} in memory!

<br>
__What are some downsides to storing data as part of our application in memory?__ &rarr;

* when you restart the server, you lose that data!


</section>
<section markdown="block">
## 

* file store
* cloud storage
* we're using mongo
* for our purposes, it doesn't matter
	* it's whatever you know how to use, and what gets you there faster
	* mongodb's pretty easy
	* i've used couch a little bit in the past
	* but most of my experience is with relational database, like postgres and mysql
	

</section>
