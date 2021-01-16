---
layout: slides
title: Intro
---
<section markdown="block" class="intro-slide">

# {{ site.vars.course_name }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p>
<small>
	<strong>(By the way, I'm Joe Versoza. <a href="http://emojicons.com/funfunfunfun">Nice to meet you.</a></strong> (・_・)ノ<strong>)</strong>
</small>
</p>
</section>

<section markdown="block">

## Soooo... What Class Is This Again?

Just to make sure you're in the right place:

* Special Topics - __{{ site.vars.course_name }}__ 
* _Someone_ started calling it AIT (not me, I have enough acronyms in my life!), and for some reason, that caught on
* Course Number __{{ site.vars.course_number }}__, Section __{{ site.vars.course_section }}__

<aside class="notes">
* hold on, are you in the right place?
</aside>
</section>


<section markdown="block">
## What's it About?

<div markdown="block">

### It's about making websites (er... web apps?).


<div markdown="block" class="img">
(like [endless.horse](http://endless.horse/), [skifree.js](https://basicallydan.github.io/skifree.js/), or [weather is happening](http://weatherishappening.com/)!!!)
</div>

<div markdown="block" class="img">
![or bacon pancakes](../../resources/img/pancake.gif)
</div>




</div>
{:.fragment}

<div markdown="block" style="text-align: center;">
(p.s. check out [brutalistwebsites.com](http://brutalistwebsites.com/) or the [90's design subreddit](https://www.reddit.com/r/90sdesign/) for more _excellent_ 90's style design)
</div>
{:.fragment}


</section>


<section markdown="block">
## Full Stack Web Development

This course is __a practical__, __hands-on__ __introduction__ to creating __modern(ish) web applications__. We'll cover (roughly in this order):

1. {:.fragment} JavaScript (just learning the language itself)
2. {:.fragment} Server Side Programming 
3. {:.fragment} Storing Data
4. {:.fragment} Client Side _Build-Out_ (HTML and CSS)
5. {:.fragment} Client Side Programming
6. {:.fragment} A Few _Trendy_ Frameworks / Libraries 
7. {:.fragment} And We'll Pick up Some Development Tools Along the Way \*

<br>
Let's check out the rough [schedule on the course site](../../schedule.html)
{:.fragment}
</section>

<section markdown="block">
## This May be Ambitious! 

### (Or Not... Depending on Your Past Experience. __¯\\_(ツ)_/¯__)
{:.fragment}

{:.fragment}
</section>

<section markdown="block">
## JavaScript Topics

* {:.fragment} Basics (__Types__, __Operators__, __Control Structures__, etc.)
* {:.fragment} Object Oriented Programming (__Objects__, __Prototypes__)
* {:.fragment} Functional Programming (__Functions__ as _First Class Objects_)

<aside class="notes">
* Who already knows js?
* Describe - type system, tools for abstraction... like inheritance,
</aside>
</section>

<section markdown="block">

## Server Side Programming Topics

<div markdown="block" class="img">
(specific technologies in __bold__)
</div>

* {:.fragment} Server Side Framework/Language - __Node.js__
* {:.fragment} HTTP
* {:.fragment} Web Framework - __Express__
* {:.fragment} Session Management
* {:.fragment} Building and Consuming APIs
* {:.fragment} Forms
* {:.fragment} MVC
* {:.fragment} Deployment

<aside class="notes">
* Request Methods / Response Codes?
* What's MVC stand for? Examples?
</aside>
</section>

<section markdown="block">

## Storing Data Topics

<div markdown="block" class="img">
(specific technologies in __bold__)
</div>

* {:.fragment} NoSQL Database - __MongoDB__ ([btw, database rankings!](http://db-engines.com/en/ranking))
* {:.fragment} Database Design
* {:.fragment} Using a Database Abstraction Layer - __Mongoose__

<aside class="notes">
* has anyone use NoSQL data stores?
* what about traditional databases? Postgres? MySQL?
* some [comparisons](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems)
* Hooooowzzzz about JSON?
</aside>
</section>

<section markdown="block">
## Client Side _Build-Out_ Topics

<div markdown="block" class="img">
(specific technologies in __bold__)
</div>

* {:.fragment} Quick Review - __DOM/HTML5/CSS3__
* {:.fragment} CSS Layout
* {:.fragment} Flexbox (Maybe)
* {:.fragment} Using JavaScript to Manipulate Styles (which brings us to...)

{% comment %}
* {:.fragment} CSS Pre-processor / CSS Meta Language - Maybe __SASS__ ('cause it won)
* {:.fragment} Maybe... CSS Framework / Grid System - Maybe something simple, like __Skeleton__
* {:.fragment} Maybe... _Responsive_ Design / _Mobile First_
{% endcomment %}

<aside class="notes">
* know html? 
* know css?
* who's built a mobile ready site? what are some considerations when going from desktop to tablet or phone? think interaction design?
	* perhaps touch vs click/hover
	* resolution, obvs
	* performance / size
</aside>
</section>

<section markdown="block">
## Client Side Programming Topics

<div markdown="block" class="img">
(specific technologies in __bold__)
</div>

* {:.fragment} DOM Manipulation - __Plain JavaScript, ES5/ES6__ (we're not using JQuery)
* {:.fragment} AJAX 
* {:.fragment} JavaScript Framework - __React__  or __vue.js__

<aside class="notes">
* anyone ever use JQuery
* what about backbone or angular?
</aside>
</section>

<section markdown="block">
## Development Tools Topics


<div markdown="block" class="img">
(specific technologies in __bold__)
</div>

* {:.fragment} Version Control - __Git__
* {:.fragment} Task Runner - one of these: __Grunt__, __Gulp__ ... or __webpack__?
* {:.fragment} Linter - __ESLint__
* {:.fragment} Unit Testing Tools
* {:.fragment} (Optionally) Debugger - __Node Debugger, Inspector__ and __Chrome Developer Tools__

<aside class="notes">
* what's version control? why?
* ever used git?
</aside>
</section>

<section markdown="block">
## Motivation for Technologies

__Why use JavaScript, Node.js and Express over Ruby and Ruby on Rails or Python and Django?__


1. {:.fragment} only __one language to learn__ throughout the course for server side development, front end development... and even database queries
2. {:.fragment} __straightforward to install__ entire stack (node, mongodb) on Windows, Linux and OSX
3. {:.fragment} seems like a __skill set that's currently sought after__ (former students are working with these technologies professionally!)
4. {:.fragment} chosen tools are becoming (if not already) __industry standard__ (__git__, __eslint__, etc.)
5. {:.fragment} a __fun__ stack to learn (really!)

<br> 
The concepts and theory remain roughly the same across this and other _technology stacks_, though...
{:.fragment}

Pros and cons for using this stack will be discussed in future classes.
{:.fragment}
</section>

<section markdown="block">
## Whew - That's a Lot of Stuff!
</section>


<section markdown="block">
## Me?

### Joe Versoza

* {:.fragment} I think I know some of you / you know me (uh-oh ... __why__ would you want take another _class_ with me?)!
* {:.fragment} __Clinical Assistant Professor__ (you can find me at: {{ site.vars.office_hours_room }})
* {:.fragment} Before teaching...
	* {:.fragment} part-time adjunct at __NYU__ and __City-Tech__
	* {:.fragment} while working as an IT Manager at non-profit 
    * {:.fragment} (turns out that managing programmers is sometimes _not fun_    &#128557; &#128514; &#128528;) 
    * {:.fragment} also worked as software engineer for a looong time - mostly with &#128013; ([web.py](http://webpy.org/) and [Django](https://www.djangoproject.com/), and even some [flask](http://flask.pocoo.org/)), but with some [Rails](http://rubyonrails.org/), [PHP](http://en.wikipedia.org/wiki/PHP), [Java/JSP](http://en.wikipedia.org/wiki/JavaServer_Pages) too...

<aside class="notes">
Why would you ever take another class with me?
Really love teaching. Left great full time job management/programming job to teach!
FYI, also - for coders - management is difficult, but it's a legit career track
</aside>
</section>

<section markdown="block">
## About... You

### Some (non-) expectations:

Only __minimal__ experience with
{:.fragment}

* __JavaScript__ 
* __server-side web development__ 
* _modern_ __front-end development__
{:.fragment}

</section>
<section markdown="block">

## If You Already Know This Stuff

For example...

* {:.fragment} if __you do this professionally__ (seriously, I've had people who get paid to do this take this class???  &#129300;)
* {:.fragment} or... if __you've already taken several web minor courses__, including web programming and databases

<br> 
__What are you doing here? GET OUT!__ &#128073;
{:.fragment}

* {:.fragment} Really, though, you probably won't get much out of the class 
* {:.fragment} And you'll slack off a bit 
* {:.fragment} <small markdown="block" style="display:inline">(and then get like a B+, and then you'll try to argue with me about your grade, and I'll be like _I told you not to take this class_, and then we'll both be sad. The end.)</small>

</section>

<section markdown="block">
## More About You...

### Additionally, I expect that you would:

1. {:.fragment}  be very __comfortable__ using the __commandline__
2. {:.fragment} have the ability to install tools, software, etc. ... and troubleshoot installations (<strong>basically _know how to use a computer_ </strong>)
3. {:.fragment} be able __navigate__ through your __file system__ (both through a file explorer like Finder and through the commandline)
4. {:.fragment} have basic/rudimentary knowledge of __HTML__ and __CSS__ (even a [late 90's notion](https://www.google.com/search?q=90%27s+website&espv=2&tbm=isch&tbo=u&source=univ&sa=X&ei=wegEVMjPJcPxgwTA5YDICg&ved=0CCgQsAQ&biw=1307&bih=729) of how this stuff works _may be_ fine)
5. {:.fragment} <strong>_actually do homework and - you know - occasionally come to class_</strong> 
6. {:.fragment} low bar, I know... but I mean it
</section>


{% comment %}
<section markdown="block">
## Technologies

__If you've been following along, the specific tools, languages and frameworks we'll be using include:__

* [JavaScript](http://eloquentjavascript.net/)
* [Node.js](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [MongoDB](http://www.mongodb.org/) (and Mongoose)
* [Skeleton](http://getskeleton.com/) (maybe)
* [React](http://facebook.github.io/react/)
* [Gulp](http://gulpjs.com/) (or maybe Grunt... or maybe webpack)
* [Git](http://git-scm.com/)
* etc.

</section>
{% endcomment %}

<section markdown="block">
## Workload

__Some salient quotes from evaluations/reviews__ &rarr;

* {:.fragment}"__Gives Lots of homework__ and focuses on too many details at exam. He has some sort of weird smartness that he would like to show off."
* {:.fragment} "Great professor. Gives __a decent amount of homework__, but it's very effective at helping you learn the material." 

<br>
So, regardless of whether or not the review was positive or negative, __the common thread is there's kind of _a lot of work_ involved in this course__ ...
{:.fragment}

__Expect the workload to be on the same level as some your earlier cs courses__ (like Intro to CS, Data Structures) &rarr;
{:.fragment}

</section>
<section markdown="block">
## Workload Continued

__Uh, so... how much work is this _really_?__ &rarr;

* {:.fragment} almost __weekly homework__ (8 total, which is actually less than the number of homeworks for 0002 or 0101) __and a final project__
* {:.fragment} this course is not challenging in the way that something like _algorithms_ is, but it's challenging because of: 
    * {:.fragment} the __wide range of topics__ covered
    * {:.fragment} the __volume of hands-on work__ (again, though, no more than weekly assignments in 101)
    * {:.fragment} the  __difficult nature of debugging__ web applications that involve integrating several technologies
* {:.fragment} a lot of homework will be:
    * write your own library that _does x_
    * use that library to implement some sort of web application
    * use an existing library that already _does x_ to re-write above ^
</section>


<section markdown="block">
## Too Easy/Difficult, Too Much Work?

__Consider choosing a different course if you:__

1. {:.fragment} _are a __professional__ web developer_ or __already know this stuff__
3. {:.fragment} think this may be __more work than you accommodate__ this semester
4. {:.fragment} __not comfortable with the requirements__ (commandline, basic html, css, etc.)
5. {:.fragment} you're a senior and want an easy C to meet your cs major requirements

<br>
__If you want a slower pace and are _truly_ interested in the material, there are some non major courses around as well__
{:.fragment}

* __CSCI-UA.60__ Database Design & Web Implementation
* __CSCI-UA.61__ Web Development & Programming
{:.fragment}

</section>


{% comment %}
<section markdown="block">
## This is the 4th Run of This Course

* I'm trying to compress the beginning part of the course to make sure I get through all of the topics
* Some common themes throughout the comments from previous versions of this course were:
    * {:.fragment} drawing of a cat (????)
* {:.fragment} All that is to say - I'm catering to a wide variety of skills/backgrounds, so just let me know if you think I'm going to fast or too slow
	* come see me during my [office hours](../../index.html)
	* contact me at __jversoza__ at __cs__ dot __nyu__ dot __edu__
    {:.fragment}
</section>
{% endcomment %}

<section markdown="block">
## How to Make No One Happy

Students coming into the course __have very different backgrounds when it comes to web development__ (from _What's a CSS?_ to _You mean this course doesn't go into using Redux?_) &rarr;

* {:.fragment} Sooo... I try to hit the __middle ground__
* {:.fragment} which means, for students with no web development experience, it's a: "__Hard class for me (no previous exp to webdev) but is fair. There should be a prereq to this class not to let people like me take the class.__"
* {:.fragment} and for students with web development experience: "__General pace was good - could have maybe been a little faster.__"
* {:.fragment} just can't make anyone happy  &#128580; ... though one comment was __(a drawing of a cat)__

<br>
(this should probably be two courses, and maybe it will eventually be that...)
{:.fragment}

</section>

<section markdown="block">
## That Sounds Pretty Harsh/Boring

__If you're concerned about the workload and the material...__ &rarr;

* {:.fragment} I'm __always available to help__, especially on piazza, but also before and after class, during office hours and by appointment
* {:.fragment} We'll also have a tutor (I'll post a schedule mid-week)

<br>
__If you think it's going too slowly...__ &rarr;

* {:.fragment} challenge yourself... for example, if the assignment is to make a simple game
* {:.fragment}  __make your own library/framework__ from scratch (for example, if you use rxjs or immutable.js, try to re-implement parts of it), and use it to write the game
* {:.fragment} or... __add features__ to make the game _more complete_ - like... adding an undo move feature
* {:.fragment} or... add support tooling like unit tests, linters, and other build tools
* {:.fragment} or... or _actually_ deploy it

</section>



{% comment %}

<section markdown="block">
## A Tentative Schedule

Let's check out the [schedule on the course site](../../schedule.html)

* the broad sections are:
	* __JavaScript__
	* __Node / Express__
	* __MongoDB__
	* __Client Side Build-Out__
	* __Client Side Programming__
	* __Frameworks and Libraries__
* {:.fragment} (all this could change based on class progress / existing class experience)

</section>
{% endcomment %}

{% comment %} 

TODO
=====
    * group final project??? maybe??? will not grade
    * take home quizzes (will drop 1)
    * in-class simple quizzes based on homework (will drop 2)
    * ask me on piazza, it actually keeps track of open issues
    * there will be a tutor
    * if you know you like to use tutors, let me know
    * first in-class quiz: fill out this survey, we'll check out the results
        * github username
        * paste your github link here
    * on the waitlist? do the readings and work right away
{% endcomment %}


<section markdown="block">
## Logistics / Grading / Quizzes / Homework / etc.

* [course info](/#info)
* [readings (pulled from free online books and documentation)](/#books)
* [grading (weights for homework, exams, etc.)](/#grading)
* 2 exams (__no exam during finals week!__... 2nd exam will be given on last day of class)
* final project
    * details for final projects for a class of this size still being determined (uh... there's a lot of you?)
    * due a couple of weeks before the semester ends
* [quizzes](/#quiz-policy)
* [homework](/#hw-policy)

</section>

{% comment %}
<section markdown="block">
## Logistics / Course Info / Office Hours

* __Course Site__: [ {{ site.vars.course_site }}]({{ site.vars.course_site }})
* __Course Title:__ {{ site.vars.course_name }}
* __Course Number:__ {{ site.vars.course_number }}-{{ site.vars.course_section }}
* __Semester:__ {{ site.vars.course_semester }}
* __Meeting Time:__ {{ site.vars.course_time }}
* __Room:__ {{ site.vars.course_room }}
* __Instructor:__ Joe Versoza
* __Contact:__ <a href="{{ site.vars.contact_link }}"> {{ site.vars.contact_label }} __{{ site.vars.contact_note }}__ </a>
* __Email:__ jversoza at cs dot nyu dot edu
* __Office Hours:__ {{ site.vars.office_hours }}
* __Office Hours Room:__  {{ site.vars.office_hours_room }}
</section>

<section markdown="block">
## Grading

* __25%__ - Homework
* __25%__ - Exam #1
* __25%__ - Exam #2
* __10%__ - Quizzes / Activities
* __15%__ - Final Project
</section>

<section markdown="block">
## Homework

* again, about __one homework__ every __week or so__
* turned in __electronically via GitHub__ 
	* we'll discuss this submission process next class
* homework assignments are __due about one week after posting__
* read the [page on academic integrity](http://www.cs.nyu.edu/webapps/content/academic/undergrad/academic_integrity)
	* __collaboration__ in terms of help debugging, discussing potential solutions, etc. is ok
	* __but write your own code!__
</section>
{% endcomment %}

<section markdown="block" data-background="#440000">
## Oh Yes - Did You Remember the Part About __Writing Your Own Code__?

</section>
{% comment %}
<section markdown="block">
## Books

Readings will be assigned in the required books.

* __Required:__
	* [{{ site.vars.book_js }}]( {{ site.vars.book_js_link }}) by {{ site.vars.book_js_author }} (available [free, online]({{ site.vars.book_js_link }}))
	* [{{ site.vars.book_js_2 }}]( {{ site.vars.book_js_2_link }}) by {{ site.vars.book_js_2_author }}
</section>
{% endcomment %}

<section markdown="block">
## Required Software

### Node.js (obvs)

1. Suggested install - use the package manager on your OS
	* __OSX__ 
		* [install](https://github.com/Homebrew/homebrew/wiki/Installation) [homebrew](http://brew.sh/) 
		* <pre><code data-trim contenteditable>brew install node</code></pre>
	* __Linux__ (Specifically Debian/Ubuntu)
		* <pre><code data-trim contenteditable>sudo apt-get install nodejs
sudo apt-get install npm</code></pre>
2. Use the Node.js installer:
	* __Windows__, __OSX__, and __Linux__: see the [downloads page on the Node.js site](http://nodejs.org/) 
</section>

<section markdown="block">
## This Site, These Slides

* you can find my courses at [http://cs.nyu.edu/~jversoza/](http://cs.nyu.edu/~jversoza/)
* these slides were built with [reveal.js](http://revealjs.com/) for HTML/CSS slides
	* use arrow keys to navigate
	* (or click on arrow buttons)
* add a <code>?print-pdf</code> to the end of the slide deck's url to see the [one page version of the slides](intro.html?print-pdf)
</section>

<section markdown="block" data-background="#440000">
## If You Got Anything Out of These Slides

This &#128071;

* You're going to be writing __a lot of JavaScript__
* __I'm (maybe too) available for help__! The best way to get in touch with me is in-person (before/after class,  office hours, or scheduled appointment) or... even better, piazza
* __the 2nd exam is on the last day of class, NOT DURING FINALS WEEK__
* If you're a __graduating senior__, make sure you do the work; I can't just hand out C's (also, are you _really_ just trying to get a C?)!
* __Write your own code for assignments!__


</section>
