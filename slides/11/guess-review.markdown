---
layout: slides
title: "Guessing Game Project / Review"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Write a Simple Number Guessing Game

On the server side:

* your application should have a hardcoded secret number
* and a way of storing a user's guesses

On the frontend:

* you'll have a form that:
	* allows you to submit a guess
	* shows all of the previous guesses
* and a win page that shows the secret number (this is silly)

</section>


<section markdown="block">
## Guessing Game in Action

<div markdown="block" class="img">
![guess](../../resources/img/guess.gif)
</div>

</section>

<section markdown="block">
## Some More Details

Use Post, Redirect, Get (PRG) to implement your form submission process. The URL's you'll have to handle are:

* __GET /__ - the form
* __POST /__ - sending data to the server
* __GET /win__ - the win page

</section>

<section markdown="block">
## Where Do We Start!?

__What are some steps to implementing this?__ &rarr;

1. {:.fragment} package.json and install modules
2. {:.fragment} create directory layout (make views/layouts, touch files)
3. {:.fragment} create app.js
4. {:.fragment} add routes (handle specified urls)
5. {:.fragment} add templates (create form, win page, etc.)

</section>
