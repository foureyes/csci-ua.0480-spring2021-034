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


### It's about making [websites](http://csszengarden.com/?cssfile=http://www.brucelawson.co.uk/zen/sample.css).

### (Or __web apps__ if you want to get fancy)
{:.fragment}

<div markdown="block" class="img">
![or bacon pancakes](http://media.giphy.com/media/StYTkwUST4HUQ/giphy.gif)
{:.fragment}
</div>

</section>


<section markdown="block">
## Full Stack Web Development

This course is __a practical introduction__ to creating __modern web applications__. We'll cover (roughly in this order):

* JavaScript
* Server Side Programming 
* Storing Data
* Client Side _Build-Out_ (HTML and CSS)
* Client Side Programming
* A Few _Trendy_ Frameworks / Libraries 
* Development Tools \*
</section>

<section markdown="block">
## This May be Ambitious! 

### (Or Not... Depending on Your Past Experience. __¯\\_(ツ)_/¯__)
{:.fragment}

#### Let's Get Into Some Specifics
{:.fragment}
</section>

<section markdown="block">
## JavaScript

* {:.fragment} Basics (__Types__, __Operators__, __Control Structures__, etc.)
* {:.fragment} Object Oriented Programming (__Objects__, __Prototypes__)
* {:.fragment} Functional Programming (__Functions__ as _First Class Objects_)
* {:.fragment} Patterns (__Encapsulation__, __Namespacing__, __Interfaces__, etc.)

<aside class="notes">
* Who already knows js?
* Describe - type system, tools for abstraction... like inheritance,
</aside>
</section>

<section markdown="block">

## Server Side Programming 

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

## Storing Data

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
## Client Side _Build-Out_ 

* {:.fragment} Quick Review - __DOM/HTML5/CSS3__
* {:.fragment} CSS Layout
* {:.fragment} Flexbox
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
## Client Side Programming

* {:.fragment} DOM Manipulation - __Plain JavaScript, ES5 (we're not using JQuery)__
* {:.fragment} Ajax 
* {:.fragment} JavaScript Framework - Hm... maybe __React__ for this one
* {:.fragment} A Quick Look at Some ES6/ES2015 Features

<aside class="notes">
* anyone ever use JQuery
* what about backbone or angular?
</aside>
</section>

<section markdown="block">
## Development Tools

* {:.fragment} Version Control - __Git__
* {:.fragment} Task Runner - one of these: __Grunt__, __Gulp__ ... or __webpack__?
* {:.fragment} Linter - __JSHint/JSLint__
* {:.fragment} Unit Testing Tools
* {:.fragment} (Optionally) Debugger - __Node Debugger, Inspector__ and __Chrome Developer Tools__

<aside class="notes">
* what's version control? why?
* ever used git?
</aside>
</section>

<section markdown="block">
## Whew - That's a Lot of Stuff!
</section>


<section markdown="block">
## Me?

### Joe Versoza

* {:.fragment} I think I know some of you / you know me (uh-oh ... why would you want take another _class_ with me?)!
* {:.fragment} __Clinical Assistant Professor__ (you can find me at: {{ site.vars.office_hours_room }})
* {:.fragment} Before teaching...
	* part-time adjunct at __NYU__ and __City-Tech__
	* IT Manager at non-profit (wrangling developers / herding cats) 
        <br>
        ![herding cats](http://i.imgur.com/Yj9Xe2A.gif)
* {:.fragment} also worked as software engineer for a looong time mostly with Python ([web.py](http://webpy.org/) and [Django](https://www.djangoproject.com/)), but some [Rails](http://rubyonrails.org/), [PHP](http://en.wikipedia.org/wiki/PHP), [Java/JSP](http://en.wikipedia.org/wiki/JavaServer_Pages), etc.

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

### If you already know this stuff...
{:.fragment}

* {:.fragment} like... maybe you do this professionally (seriously, I've had people who get paid to do this take this class???)
* {:.fragment} or... you've already taken several web minor courses, including web programming and databases
* {:.fragment} __what are you doing here? GET OUT!__
* {:.fragment} really, though, you won't get much out of the class
</section>

<section markdown="block">
## More About You...

### Additionally, I expect that you would:

* be very comfortable using the __commandline__
* have the ability to install tools, software, etc. ... and troubleshoot installations (basically _know how to use a computer_)
* be able navigate to navigate your file system
* have basic/rudimentary knowledge of __HTML__ and __CSS__ (even a [late 90's notion](https://www.google.com/search?q=90%27s+website&espv=2&tbm=isch&tbo=u&source=univ&sa=X&ei=wegEVMjPJcPxgwTA5YDICg&ved=0CCgQsAQ&biw=1307&bih=729) of how this stuff works _may be_ fine)
* _actually do homework and come to class_
* low bar, I know...
{:.fragment}
</section>


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

<section markdown="block">
## Motivation for Technologies

__Why use JavaScript, Node.js and Express over Ruby and Ruby on Rails or Python and Django?__

The concepts and theory remain roughly the same across all of these _technology stacks_, but here's why I chose what I did:

1. {:.fragment} we only need to learn one language throughout the course for server side development, front end development... and even for querying the database
2. {:.fragment} pretty straightforward to install the entire stack (node, mongodb) on Windows, Linux and OSX
3. {:.fragment} seems like there's a lot of opportunity out there (I've had former students contact me to let me know that they're working with node professionally!)
4. {:.fragment} work with tools that are either currently or becoming industry standards (__git__, __jshint__, etc.)
5. {:.fragment} a __fun__ stack to learn (really! ...I'm excited about delving into it too!)
6. {:.fragment} we'll talk about the technical trade-offs for using this stack next week
</section>

<section markdown="block">
## Too Easy or Too Difficult?

* __You may consider choosing a different class if you:__
	* _are a professional web developer_? 
	* already know this stuff
	* think this may be too much work 
	* not comfortable with the requirements
* {:.fragment} __(There are some non major courses around as well)__
	* __CSCI-UA.60__ Database Design & Web Implementation
	* __CSCI-UA.61__ Web Development & Programming

</section>

<section markdown="block">
## This is the 4th Run of This Course

* I'm trying to compress the beginning part of the course to make sure I get through all of the topics
* Some common themes throughout the comments from previous versions of this course were:
    * {:.fragment} "__Hard class for me (no previous exp to webdev) but is fair. There should be a prereq to this class not to let people like me take the class.__"
    * {:.fragment} "__General pace was good - could have maybe been a little faster.__"
    * {:.fragment} drawing of a cat (????)
* {:.fragment} All that is to say - I'm catering to a wide variety of skills/backgrounds, so just let me know if you think I'm going to fast or too slow
	* come see me during my [office hours](../../index.html)
	* contact me at __jversoza__ at __cs__ dot __nyu__ dot __edu__
    {:.fragment}
</section>


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

<section markdown="block">
## Logistics / Course Info / Office Hours

* __Course Site__: [ {{ site.vars.course_site }}]({{ site.vars.course_site }})
* __Easier Link (Maybe)__: [ {{ site.vars.course_site_alt }}]({{ site.vars.course_site_alt }})
* __Course Title:__ {{ site.vars.course_name }}
* __Course Number:__ {{ site.vars.course_number }}-{{ site.vars.course_section }}
* __Semester:__ {{ site.vars.course_semester }}
* __Meeting Time:__ {{ site.vars.course_time }}
* __Room:__ {{ site.vars.course_room }}
* __Instructor:__ Joe Versoza
* __Email:__ jversoza at cs dot nyu dot edu
* __Office Hours:__ {{ site.vars.office_hours }}
* __Office Hours Room:__  {{ site.vars.office_hours_room }}
</section>

<section markdown="block">
## Grading

* __5%__ - Quizzes / Class Participation / Activities
* __25%__ - Homework
* __25%__ - Midterm Exam
* __15%__ - Final Project
* __30%__ - Final Exam
</section>

<section markdown="block">
## Homework

* about __one homework__ every __week or so__
* turned in __electronically via GitHub__ and __NYU Classes__
	* we'll discuss this submission process next class
* homework assignments are __due about one two week after posting__
* read the [page on academic integrity](http://www.cs.nyu.edu/webapps/content/academic/undergrad/academic_integrity)
	* __collaboration__ in terms of help debugging, discussing potential solutions, etc. is ok
	* __but write your own code!__
</section>

<section markdown="block" data-background="#440000">
## Oh Yes - Did You Remember the Part About __Writing Your Own Code__?

</section>
<section markdown="block">
## Books

Readings will be assigned in the required books.

* __Required:__
	* [{{ site.vars.book_js }}]( {{ site.vars.book_js_link }}) by {{ site.vars.book_js_author }} (available [free, online]({{ site.vars.book_js_link }}))
	* [{{ site.vars.book_js_2 }}]( {{ site.vars.book_js_2_link }}) by {{ site.vars.book_js_2_author }}
</section>

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
