---
layout: slides
title: "Authentication"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* storing password information
	* not about crypto
	* you should prob use...
	* why encrypt?
* using passport
	* how many different ways can you sign up / sign in to a site?
		* what are some common ones... let's start with the obvious
		* fb, twitter, g+, linkedin, etc.
	* what's a strategy
	* * other auth schemes
* integrating user with other model
	* first, last
	* address
* login considerations
	* user does not exist
	* password not right
	* both
	* errors?
* registration considerations
	* user already exists
	* password or username doesn't meet reqs
	* errors?
	* revealing username and password
* maybe error handling
</section>
