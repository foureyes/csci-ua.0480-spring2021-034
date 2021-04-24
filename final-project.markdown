---
layout: default
title: Final Project
nav-state: "Final Project"
---
<style>

.warning {
    background-color: #eecccc;
}

pre {
	display: inline-block;
	padding: 9.5px;
	margin: 0 0 10px;
	font-size: 15px;
	word-break: break-all;
	word-wrap: break-word;
	background-color: rgb(224, 229, 234);	
	color: #001446;
	border-radius: 4px;
	border: none !important;
}

#final h4 {
	font-size:1.2em;
	margin-top: 1.5em;
	text-decoration: underline;
}
</style>
<div class="panel panel-default">
	<div class="panel-heading">Final Project</div>
	<div class="panel-body" markdown="block">

# Final Project, __Final Milestone Due__ <strike>4/29</strike> 4/30 at 11pm

Earlier milestones due every one or two weeks leading up to final milestone due date.


## Overview 

Create a __small__ web application using Express and MongoDB. Build the application incrementally over the course of 4-5 weeks.

<a name="requirements">

## Project Requirements

### Requirements

* You must use Express and MongoDB (or other server-side framework and database with permission)
* You must write your own code, with annotations/references added for any code sourced from books, online tutorials, etc.

### Grading Rubric

__Completing the milestones leading up to the due date is required!__ Milestones 1 through 3 are worth over half of your final project grade.

* (20) Milestone #1 - requirements, draft data model, and a skeleton application
* (20) Milestone #2 - deployment attempt and a single working form (__You cannot change _your idea_ for your final project after this__, but you can still make minor modifications)
* (20 points) Milestone #3 - two working forms and proof of work on research topics
* (40 points total) Completed project
    * (12 points) minimum 3 x forms or ajax interactions (__excluding login__)
    * (6 points) minimum 3 x any of the following (can be the same): 
        * es6 classes that you've written yourself (using the `class` keyword)
        * Object.create (where prototype matters)
        * original higher order functions that you've written yourself
		* or use any of these built-in higher order functions found in `Array.prototype`: `map`, `reduce`, `filter`
    * (2 points) minimum 2 x mongoose schemas
    * (8 points) stability / security
        * simple validation on user input to prevent application from crashing
        * doesn't allow user input to be displayed unescaped directly on page
        * pages that require authentication cannot be accessed without authentication
        * data specified as private to a user cannot be viewed by another user
        * etc.
    * (4 points) _originality_ 
        * is not mostly based on existing homework
        * majority of code is not from online tutorial
    * (8 points) worth of research topics; see below


{% comment %}
* provide api end points
* what data is authenticated
* urls of where data
{% endcomment %}

## Additional Requirements, Your Choice

Choose at least __8 points__ worth of these following topics (research and implementation). __This list may change slightly (added items, adjustments to points) as project ideas come in.__ 

* (3 points) Unit testing with JavaScript
	* [Jasmine](http://jasmine.github.io/)
	* [Mocha](https://github.com/mochajs/mocha)
	* Any others found through research
    * Minimally 4 tests
    * You'll have to link to testing code in repository
    * ... and show a screen capture of tests
* (5 points) Automated functional testing for all of your routes using any of the following:
	* [Selenium](http://www.seleniumhq.org/)
	* [Headless Chrome](https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai) - headless browser testing
    * Minimally 4 tests
    * You'll have to link to testing code in repository
    * ... and show a screen capture of tests
* (3 points) Configuration management
	* [nconf](https://github.com/flatiron/nconf)
	* [Node convict](https://github.com/mozilla/node-convict)
	* Any others found through research
* (3 points) Use [grunt](http://gruntjs.com/), [gulp](http://gulpjs.com/), [Webpack](https://webpack.js.org/) or even make (!) to automate any of the following ... must be used in combination with one or more of the other requirements, such as:
    * (2 points) Integrate ESLint / JSHint / JSLint into your workflow
        * Must be used __with build tool__ (see above requirement on Grunt or Gulp
        * Must have have configuration file in repository
        * Must run on entire codebase __outside of <code>node_modules</code> automatically on file change__ (_watch_ for changes to the file system)
        * Must link to relevant lines in build configuration and lint configuration 
		* Must show screen capture / animated gif of running on save
    * (2 points) Concatenation and minification of CSS  and JavaScript files
        * Must be used __with build tool__ (see above requirement on Grunt or Gulp
        * (Only client side files!)
        * Only minify and concatenate client side JavaScript
        * Must link to relevant lines in build configuration and mark-up (to show included css) 
		* Must run automatically on fille change
		* Must show screen capture / animated gif of running on save
    * (2 points) Use a CSS preprocesser
	    * [Sass](http://sass-lang.com/)
	    * [Less](http://lesscss.org/)
	    * [Myth](http://www.myth.io/)
        * Must link to relevant lines in build configuration and directory of _unprocessed_ CSS source
		* Must run automatically on fille change
		* Must show screen capture / animated gif of running on save
* (3 points) Perform client side form validation using custom JavaScript or JavaScript __library__
    * errors must be integrated into the DOM 
    * the following will not receive full credit:
* (2 points) Use a CSS framework throughout your site, use a reasonable of customization of the framework (don't just use stock Bootstrap - minimally configure a theme):
	* [tailwind.css](https://tailwindcss.com/)
	* [Bootstrap](http://getbootstrap.com/)
	* [Foundation](http://foundation.zurb.com/)
* (1 - 6 points) Use a __server-side__ JavaScript library or module that we did not cover in class (not including any from other requirements) 
    * assign a point value to the library or module that you're using based on amount of effort and/or code required for integration
    * Must link to source code relevant to implementation and evidence of working implementation on site
* (1 - 6 points) Use a __client-side__ JavaScript library or module that we did not cover in class (not including any from other requirements)
    * assign a point value to the library or module that you're using based on amount of effort and/or code required for integration
    * for example, angular or d3 might be 6 points, while google maps might be 1 point
    * Must link to source code relevant to implementation and evidence of working implementation on site
* (1 - 6 points) Per external API used 
    * assign a point value to the library or module that you're using based on amount of effort and/or code required for integration
    * for example, angular might be 6 points, while google maps might be 1 point
    * Must link to source code relevant to implementation and API documentation

<a name="milestone1"></a>

## Milestones

Notes:

* Deploy can be done on platform of your choice (which is recommended if you would like your project to continue running beyond the end of this semester) or on courant's servers
	1. if deploying on courant's servers, and if you're dividing your app into an API and frontend, you can increment port 
	2. if deploying on courant's servers and https (such as working with an external API that required https) is needed:
		* (it should _always_ be required, but for proof of "deployment" for this project, it can be served on non https)
		* please send "direct" message on course forum requesting https port
		* app should listen on one port, but be connected to (via https) on port - 10000 (for example, listen on port 30001, but connect on port 20001)
* Overall project _idea_ cannot be changed after Milestone 2
* However,"requirements and features may change (for example, removed) up until final deployment (as long as project still fits technical requirements)

<a name="proposal"></a>

###  __Due 4/1 at 11PM__ - Milestone 1 - Requirements / Specifications, Draft Data Model, Skeleton Application (20 points)

[Check out sample documentation](https://github.com/nyu-csci-ua-0480-008-spring-2017/final-project-example)

* Documentation
	* Submit electronically through a supplied GitHub repository
	* Write everything up in your README.md
		* Drop the images into your repository (either under a separate branch or in a folder called documentation)
		* [Link to it based on this SO article](http://stackoverflow.com/questions/10189356/how-to-add-screenshot-to-readmes-in-github-repository)
	* A one-paragraph description of your project
	* Requirements
		* Sample documents (JSON / JavaScript literal objects will be fine, or your actualy Schemas) that you will store in your database, and a description of what each document represents
		* Enumerate any references from one document to another
	* Wireframes ([like this one](http://upload.wikimedia.org/wikipedia/commons/4/47/Profilewireframe.png)) 
		* [a great article on wireframes](http://www.onextrapixel.com/2011/03/28/creating-web-design-wireframes-tools-resources-and-best-practices/)
		* some possible tools
			* Hand-drawn
			* Balsamiq
			* Google drawings
			* Omnigraffle
			* Adobe tools such Photoshop (psds), Illustrator (ai) etc.
	* [A Site Map (see examples)](http://creately.com/diagram-community/popular/t/site-map)
	* One of the following to represent what your application will actually do:
		* A list of user stories ([simply a list of sentences in the form of _as a &lt;type of user&gt;, I want &lt;some goal&gt; so that &lt;some reason&gt;_](http://en.wikipedia.org/wiki/User_story#Format))
		* A list/spreadsheet of [use cases (see the end of this article)](http://www.stellman-greene.com/2009/05/03/requirements-101-user-stories-vs-use-cases/)
		* A [Use Case Diagram](https://www.andrew.cmu.edu/course/90-754/umlucdfaq.html)
	* __Which modules / concept will you research?__
		* List of research topics
		* A brief description of concept (3 or 4 sentence each)
			* What is it?
			* Why use it?
			* List of possible candidate modules or solutions
            * Points for research topic (based on specifications above)
* Code
	* A skeleton express app
		* Start populating your package.json with required modules
		* __It's ok to just have boilerplate code and no route handlers!__
	* A 1st draft mongoose schema

<div id="final" markdown="block">

<a id="milestone2" name="milestone2">

<br>
<br>
<br>

### Due Date __4/13 at 11pm__ - Milestone 2 - Completed Schema, Initial Deployment, "Proof of Concept" First Form and Refinement or Start of Research Topics (20 points)

You can deploy your application on any platform you choose, but we have space and resources on Courant's servers, so I have detailed instructions for that deploy process below. In the past, students have also chosen Heroku with MongoDB Atlas. I have links to relevant docs at the end of of these milestone instructions.

#### Regardless of where you deploy:

1. <span class="warning">use [this form to submit your deployed site](https://forms.gle/tN4C8tfhEVHcfMXc6)</span>
2. your submission won't be graded unless the form above is sent with urls to your deployed site
3. your deployed site should contain the following progress:
    * __one working form (that is not login or registration)__ 
        * ...that should allow data to be modified or deleted
        * the results of submitting this form should be apparent/viewable
		* __if planning on using AJAX with API backend__, proof of working API end point is adequate, as long as query string or POST datashows changes in data sent back by API
    * show _some_ progress, regardless of how small it is, on at least 1 of your research topics,  __it doesn't have to be fully working... stub code from documentation or pseudocode is adequate__
        * consequently, a link to the github repository / line no that shows any proof of work is sufficient
        * or, if it's something that's already visible, a link to the a page on your site that's deployed to the server

#### If you're deploying on courant's servers: 

1. your server and port name can be accessed through a link in a forum post for milestone #2
2. attempt to deploy your code to Courant's servers by following [instructions](homework/deploy.html)
3. if you're dividing your app into an API and frontend, you can increment the port number that you were assigned
4. if you require https (such as working with an external API that requires https):
	* (it should _always_ be required, but for proof of "deployment" for this project, it can be served on non https)
	* please send "direct" message on course forum requesting https port
	* app should listen on one port, but be connected to (via https) on port - 10000 (for example, listen on port 30001, but connect on port 20001)

#### If you're interested in deploying on a different platform

Some alternative platforms to deploy on include Heroku with MongoDB Atlas, AWS EC2 or Lightsail, or a VPS like Linode or DigitalOcean.

In particular, a popular option in the past has been using Heroku, a platform as a service for _containerized_ application deploy, in conjunction with MongoDB Atlas, MongoDB's cloud database offering. For relevant documentation:

* see [the node.js Heroku tutorial](https://devcenter.heroku.com/articles/deploying-nodejs#provision-a-database) 
* and [MongoDB's documentation on integrating MongoDb Atlas with Heroku](https://developer.mongodb.com/how-to/use-atlas-on-heroku/)

<a name="milestone03">

<br>
<br>
<br>



### Due Date  __4/22 at 11pm__ - Milestone 3 - Two Working Forms, and Significant Progress on Research Topics (20 points)


{% comment %}
OLD
1. deploy your application
	* if deploying on courant, your server and port name can be accessed through a link in a piazza post `"Final Project Deployment Ports"`
	* follow [these instructions](homework/deploy.html) to get your project running
3. <span class="warning">use [this form to submit your deployed site](https://forms.gle/sbCNzpceszxUmvPr7) to submit your code</span>
4. your submission won't be graded unless the form above is sent with urls to your deployed site
5. your deployed site should contain the following progress:
    * 👀 __one working form (that is not login or registration)__ 
        * ...that should allow data to be modified or deleted
        * the results of submitting this form should be apparent/viewable
    * show _some more_ progress on your research topics,  __it doesn't have to be fully working... stub code from documentation or pseudocode is adequate__
        * consequently, a link to the github repository / line no that shows any proof of work is sufficient
        * or, if it's something that's already visible, a link to the a page on your site that's deployed to the server
	* show work on second form via github links or actual functioning pages on your deployed site
{% endcomment %}



      

1. make at least 3 additional commits to add:
    * your 2nd form / ajax interaction
    * make more progress on your research topics
2. __update youre README.md to reflect any changes to what your final project is__ (you cannot change your project idea after this point, but you can make modifications to your research topics)
3. redeploy your code to Courant's server by running git pull and restarting forever (__do not do this until you receive your milestone #2 grades__)
    1. `ssh` into linserv1 or linserv2 (remember, you have to go to access.cims.nyu.edu first)
    2. `cd` into your project directory (should be in `~/opt/NETID-final-project`)
    3. run `forever stopall` and `forever start bin/www` 
        * you'll have to use the full path to forever, likely `~/usr/local/node_modules/bin/forever`
        * and perhaps the full bath to `bin/www`
4. __[fill out form to submit assignment](https://forms.gle/sXsDjB8qgXvRxuBJ8)__; it will contain:
    * __both working forms or ajax interactions__ 
    * a link to show code changes since milestone #2 (see instructions in form):
		1. start with the url to your repository (remember to replace NETID with your NETID): `https://github.com/nyu-csci-ua-0480-034-spring-2021/NETID-final-project/`
		2. append the following to the url: `commits/master?since=2021-04-13&until=2021-04-23`
		3. For example: `https://github.com/nyu-csci-ua-0480-034-spring-2021/NETID-final-project/commits/master?since=2021-04-13&until=2021-04-23`

<a id="final_submit" name="final_submit">

<br>
<br>
<br>
<br>

### Due Date  <strike>4/29</strike> __4/30 at 11PM__ - Final Project Complete and Code is fully  _Deployed_ (40 points)


{% comment %}
* __all commits must be in by Nov 30th__ 
* __project must be deployed__ on cims servers (or other platform, such as Heroku, gomix, zeit, etc.)     
	* if your application needs to be restarted while being graded; I will contact you     
	* you will not receive a penalty for restarting after the due date 
* __the [final project form submission](https://forms.gle/hJjezpycjV4WPTib6) must be filled out__ (if a form is not submitted, you will receive a 0 for your project)
* __Research Topic Notes__
	* if you require a __specific user to be logged in__, please add the username and password in the form submission above
	* if you used __unit testing__ or __functional testing__, upload a screen shot or an animated gif of your tests running to the documentation folder of your project; link to it in your form submission
	* if you used __grunt__, __gulp__, or __webpack__ ... or some if you used a pre-processor like babel, sass, etc. ... link to the relevant configuration file in your form submission
	* if you are using __facebook login__, and your application is in _testing mode_, add this user: `Eef Aqua` so that graders can test your application

<br>
<br>
<br>
{% endcomment %}



{% comment %}
<a name="suggestions">

## Potential Projects

* A project portfolio site
* Create a one-player game with a computer AI - allow logins, saved high scores, saved games
	* Maybe a card game building off of handy (blackjack) 
    * or something like Cookie Clicker ...
	* or a Battleship clone
	* or a platformer
* Or... whatever you can come up with!
{% endcomment %}
</div>
</div>
</div> 
