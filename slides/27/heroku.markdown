---
layout: slides
title: "Heroku"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Heroku and MongoLab

We can deploy our Express / MongoDB apps using __Heroku__ and __MongoLab__. Both have _free_ plans (though you need a credit card to link the two together).

* Heroku is a cloud service for deploying web applications
	* not server based
	* your application is allocated _dynos_ instead (I think of them as processes)
* MongoLab is a MongoDB service

</section>
<section markdown="block">
## First Step - Prepping Your Application

* git
	* use git for your application's version control
	* simply git init within your application's directory (you don't necessarily need github)
* .gitignore
	* add a .gitignore file
	* __make sure to exclude node_modules__
</section>

<section markdown="block">
## The Heroku _Toolbelt_

Heroku has a commandline tool for managing and deploying applications.

* sign up for heroku
* get the toolbelt
	* https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
</section>
<section markdown="block">
## Authentication and Specifying Your App

Auth using toolbelt using the following command:

<pre><code data-trim contenteditable>
heroku login
</code></pre>

(choose which key you'd like to use if you have multiple ssh keys)

Use this to create a Heroku App from your project directory:

<pre><code data-trim contenteditable>
heroku create
</code></pre>
</section>

<section markdown="block">
## Sending Your Code to Heroku

From your project directory:

* push your branch to the heroku remote
* the command should look like:

<br>

<pre><code data-trim contenteditable>
git push heroku master
</code></pre>

</section>

<section markdown="block">
## MongoLab

* set up an account at mongolab.com
* (verify email address)
* add mongolab to your app:
	* heroku addons:add mongolab
	* or https://addons.heroku.com/mongolab
* they'll want a cc
* free sandbox account not really intended for prod use, though!
</section>

<section markdown="block">
## Getting the Two to Work Together!


* heroku config to get connection string
* modify your db.js
* push to heroku master again
* heroku open
* check out logs! heroku logs --tail
</section>

<section markdown="block">
## Prod / Dev Configurations

Hrm. not great, eh?... __What's wrong with our database configuration?__

Both our development and prod environments point to the same database!
{:.fragment}

<pre><code data-trim contenteditable>
mongo_connection = process.env.MONGO_URI || 'mongodb://localhost/imageboarddb';
</code></pre>
{:.fragment}

And... configure heroku to use an environment variable:
{:.fragment}

<pre><code data-trim contenteditable>
heroku config:add MONGO_URI=mongodb://your.domain/yourdb
</code></pre>
{:.fragment}
</section>
