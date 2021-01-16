---
layout: homework
title: CSCI-UA.0480 - Homework #6
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #6</div>
	<div class="panel-body" markdown="block">

# Image Posting Board - __Due Thursday, November 9th, by 11PM__

## Overview

### Description

#### Create an image posting site called "480chan"

Image posting boards are kind of the worst and best part of the web (mostly worst). For example, a well known image board was the origin of lolcats (text on cat pictures), as well as the birthplace of the _hacker group_, Anonymous. 

We're going to implement an image board where anyone visiting the site can create a post containing several images (via url, not by upload). Any user can then add an image to a post or remove images from a post.

To implement the features above, we'll use the following techniques:

* creating a schema / data model
* using a mongoose plugin to add a slug to your schema
* connecting to MongoDB with Mongoose
* creating and reading data from MongoDB
* extracting parameters from a URL path
* adding and removing embedded documents with Mongoose
* adding input validation

And, as extra credit:

* using references to other documents instead of embedded

#### In this application, any user will be able to:

* view all image posts
* create image posts (with 0 to 3 images initially, but more can be added later)
* add additional images to an image post
* remove images from a post
* validation


#### You'll only have 2 pages and 3 forms:

* __/image-posts__ 
    * a list of image posts as well as all of the images contained in each post
    * contains a form to add another image post (with at most 3 images)
    * links to an __individual__ image-post page... that allows you to add images or remove images from that image-post
* __/image-post/&lt;slug&gt;__ 
    * displays the images in a single image-post
    * contains a form to add an image to the image-post
    * contains a form to remove images by checking checkboxes


#### Example Interaction

Here's an example of adding an image post that has 1 image in it:

![add post with multiple images](/csci-ua.0480-fall2017-007/resources/img/hw06-01-add-one-post.gif)

### Submission Process

You will be given access to a private repository on GitHub. Create an Express application from scratch. 

The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.
* Add the URL of the repository to your assignment submission in NYU Classes.

###  Make at Least 3 Commits

* Commit multiple times throughout your development process.
* Make at least 3 separate commits - (for example, one option may be to make one commit per part in the homework).

## Part 1 - Setup

###  Installing Tools, Starting Project

You'll be starting this project from scratch. Clone your repository and add the following:

1. a directory called `image-board`
2. within that directory, create everything that you need for an express project, such as:
    * templating
    * linting (you can use a previous linting config from another assignment)
    * serving static files
    * `.gitignore`
    * `package.json` (you can use `npm init` to create this)
    * etc.
3. make sure that you have use `--save` as you proceed to install necessary modules

## Part 2 - Installing MongoDB, Creating a Schema, Connecting to the Database

###  Install MongoDB

* if you haven't already installed it, follow the [install instructions](http://docs.mongodb.org/manual/installation/) for your operating system
* ensure that it is up and running by connecting to it using a commandline client:
	* connect to the test database by typing in <code>mongo</code> (in any directory)
	* you should be given a message with the version number of the Mongo shell
	* ....along with a prompt
	* <code>CTRL-D</code> quits

###  Connect to the Database

Create a file called <code>db.js</code> within the root of your project directory. <code>db.js</code> will contain the following:

* the required data related modules for our project
	* mongoose - our __Object to Document Mapper__, which we'll use to access MongoDB from our app
	* mongoose-url-slugs - a plugin for mongoose that automatically creates a unique slug property in a specified object
		* a slug is a string that serves as a short, human readable name
		* usually contains dashes to separate words, and a number suffix
		* for example, <code>this-is-a-slug</code>

Add the required modules:

<pre><code data-trim contenteditable>const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs');
</code></pre>

Leave a placeholder for your schema...

<pre><code data-trim contenteditable>// my schema goes here!</code></pre>

Here's the connection string... we'll connect to the local instance of MongoDB, and we'll use a database called <code>hw06</code> (this will be created for you once you start inserting documents!).

<pre><code data-trim contenteditable>mongoose.connect('mongodb://localhost/hw06');
</code></pre>

###  Schema 

For larger projects, there is usually one file per schema, all located in a separate folder called models. For now, however, define the following Schema within <code>db.js</code>. Check out the slides on:

* [check out the docs!](http://mongoosejs.com/docs/guide.html)
* [the MongoDB Demo](../slides/14/mongo.html) 
* [and/or the Mongoose API](../slides/14/mongoose.html) 

Your model should accommodate the following requirements:

* for a single image in your image-post, <code>Image</code>, you'll need the following fields:
	* <code>caption</code> - a caption for the image
	* <code>url</code> - the url to the image
* for an image-post (a group of images), <code>ImagePost</code>, you'll need the following fields:
	* <code>title</code>
	* <code>images</code> (an Array of embedded documents... you can use the following syntax): <code>images: [Image]</code>
* outside of the <code>ImagePost</code> schema, use the <code>mongoose-url-slugs</code> plugin to automatically generate a <code>slug</code> property:
	* <code>&lt;your schema name&gt;plugin(URLSlugs('&lt;what properties your slug should consist of&gt;'));</code>
	* (don't include the angle brackets, come up with your own schema name, etc.)

Drop this under your <code>// my schema goes here!</code> comment.

Then, use your schemas to define your models... these will be used as constructors later on in our project. You can place this code after your schema and before the connection (assuming that you're schema looks something like this):

<pre><code data-trim contenteditable>mongoose.model('Image', Image);
mongoose.model('ImagePost', ImagePost);
</code></pre>

## Part 3 - Adding an ImagePost with Images and Displaying All ImagePosts and Their Images

### Overview

We'll be using mongoose to create, read and modify data from MongoDB, and we'll be doing this in the functions that handle our routes.

Consequently, in whatever file contains your route handlers (probably `app.js`):

* require mongoose
* retrieve a model (to be used as a constructor later)

<pre><code data-trim contenteditable>const mongoose = require('mongoose');
const ImagePost = mongoose.model('ImagePost');
</code></pre>

* you'll have to create route, <code>/image-posts</code>; it'll contain:
    * a form to add an image-post
    * a list of all of the image-posts, along with their images
* you'll also need to create another route to handle a <code>POST</code> request from the form to add an image-post; __you can make the path whatever you like__ 

The flow of the image-post create form should follow the conventional POST, redirect, GET workflow:

* <code>GET /image-posts</code> (to display all image-posts and the form)
* <code>POST /some/path/you/choose</code> (to actually process the submitted form)
* <code>redirect to GET /image-posts</code> (to go back to the listing of all image-posts)

###  Form to Create an ImagePost with Images 


In this route handler, <code>GET /image-posts</code>: 

1. render a template that displays a form (it'll also display all image posts... but we'll get to that later)
2. add the fields necessary to create an image post along with 3 images
    * it should have the title of the post
    * and 3 fields, each with a url (a link to an image) and a caption
        ![form](/csci-ua.0480-fall2017-007/resources/img/hw06-00-form.png) 
3. have the form post to a path of your choosing (you'll define this route handler later in the next part)
4. __test that your form renders by going to__ <code>/image-posts</code>

###  Handling the Image-Post Form


In this route handler, <code>POST /path/of/your/choosing</code>: 

* use your mongoose model for an image-post to create a new <code>ImagePost</code> instance
    * create a new <code>ImagePost</code> first, and just populate the title
    * then... you can use <code>.push</code> to add each image to the `images` property on your newly created `ImagePost` object
    * the initial form allows up to 3 images to be initially included in the <code>ImagePost</code>
    * if a url for an image is blank, don't add it to the list of images
    * since an <code>ImagePost</code> can have up to 3 images, it's a pain to check each url individually...
    * instead, you can use a loop - remember that you can dynamically access object properties using bracket (<code>obj[prop]</code>) notation instead of dot (<code>obj.prop</code>notation
    * for example, if your form names for each image url is: <code>image-url-1, image-url-2, ... image-url-n</code>: 
        <pre><code data-trim contenteditable>
// you can use a loop, and reference each property on body as:
req.body['image-url-' + n]
</code></pre>
* ... and, of course, save it ([here's an example from our pizza demo](../slides/14/mongoose.html#/16))
* this should create a single <code>ImagePost</code> with up to 3 embedded <code>Image</code>s in it
* within your callback for save, redirect to <code>/image-posts</code> (only redirect page when we're sure the new list has been saved - that is, within the callback, if there are no errors)

{% comment %}
to the actual single list page that contains the list items... so the url it goes to would be similar to the links above: <code>/list/[slug-name]</code>
{% endcomment %}

### Testing Out ImagePost Creation

Testing Process

1. got to <code>/image-posts</code>
2. fill in:
    * title
    * two images - both url and caption
3. submit
4. verify that you're redirected back to image-posts
    * in the network tab in Chrome...
    * you should have:
        * <code>GET /image-posts</code> - <code>200</code>
        * <code>POST /image-posts</code> - <code>302</code> or <code>303</code>
        * <code>GET /image-posts</code> - <code>200</code> again
5. verify that a new <code>ImagePost</code> object is created in your database
    * run <code>mongo</code> to start a commandline database client
    * use <code>.find</code> to search for any created documents:
    * (the collection name should be all lowercase, plural: <code>db.imageposts.find()</code>)

Troubleshooting if No Documents Are Found

1. verify that your collection name and schema name match (remember, the collection name is the lowercase, plural version of your schema name: <code>ImagePost</code> &rarr; <code>imageposts</code>)
2. in the route handler that deals with your POST, either log out the error from your save callback or send it back as a response:
    * <code>console.log(err)</code>
    * <code>res.send(err)</code>

###  Displaying All Image Posts

The list of all <code>ImagePost</code>s should appear underneath your form. Retrieve all of the image-posts from the database (see [the slides on the mongoose API](../slides/14/mongoose.html)), and for every image-post:

* display the title of the image-post as a header and a link
* the link should go to /image-posts/&lt;slug&gt; (where do you think you get the image-post slug from?)
* display all of the images in the image-post
    * show each image's caption
    * ...and use the url to add an <code>img</code> tag underneath the caption (to display the image, of course!)
* if you were to place a list of <code>ImagePost</code>s into your template context, you could access every individual <code>ImagePost</code> in an <code>#each</code> loop
* __within that loop, you can use__:
    * <code>&#123;&#123;fieldName&#125;&#125;</code> to access a property named <code>fieldName</code> (note that there's no need to use dot, <code>.</code>, or square brackets, <code>[]</code>'s)
        * you can also __nest__ <code>#each</code> loops to go over all of the embedded <code>Image</code> documents in an <code>ImagePost</code>

### Testing That ImagePosts Can be Read from the Database

* try going to <code>/image-posts</code> in your browser
* see that the image post that you created earlier is displayed below the form
* try adding a new image-post with three images
* verify that you're redirected back to <code>image-posts</code> with your new post added to the bottom of the page.
* see the example below:

![add post with multiple images](/csci-ua.0480-fall2017-007/resources/img/hw06-02-add-multi-pizza-party.gif)


## Part 4 - Single ImagePost Detail Page, Adding New Images to ImagePost, Deleting Iamges from ImagePost

###  Single ImagePost Detail Page


In this route handler, <code>GET /image-post/[slug-name]</code>: 

* you'll use the slug in the url to render an __image-post details__ page
* find __exactly one image-post__ that matches the slug in the url
	* remember to use [route parameters](../slides/14/params.html) 
	* use <code>:slug</code> in your path to specify a part of the path as a parameter
	* you can find this part of the path in your request object (<code>req.params.slug</code>)
* display the title of the <code>ImagePost</code>
* place all of the images below the title
* in the next two parts, add a couple of forms this page to add more images and delete images

<div markdown="block" class="img">
![go to detail page](/csci-ua.0480-fall2017-007/resources/img/hw06-03-detail-slug.gif) 
</div>

###  Adding Images

Instead of creating a separate page for adding items to your list, embed your form directly underneath your image-post in your image-post details page

The flow of the __image create form__ should be:

* <code>GET /image-post/[slug-name]</code>
* <code>POST /path/of/your/choosing</code>
* <code>redirect to GET /image-post/[slug-name]</code> (go back to page that you came from)

__First, add a form to create a new image in your image-post:__

* create a form that posts to <code>/path/of/your/choosing</code>
* your form will have the following fields
	* url
	* caption
* __you'll have to let the server know which image-post you're adding this new image to__ ... and you can do this by:
    * having the slug in the url that you're posting to
    * or by having a hidden input field that contains the slug [(check out the slides on revisiting forms)](../slides/11/forms-revisited.html#/16)

__you'll have to handle this post, so...__

* create a route handler to accept a <code>POST /path/of/your/choosing</code>... 
* (depending on how you've structured your application this may need to go into a different router file than the one you used for list creation)
* use one of these methods to add an image (assuming that you've embedded images into image-list in your schema):
	* [findOneAndUpdate](../slides/14/mongoose.html#/19)
	* [lots of callbacks](../slides/14/mongoose.html#/12)
* in your last callback, redirect back to the original __image-post detail__ page
* here's the example interaction:

![add image to existing](/csci-ua.0480-fall2017-007/resources/img/hw06-04-add-image.gif) 

## Part 5 - Deleting Images

###  Deleting Images

Create another form for deleting images from an image-post. The flow of the __image delete form__ should be:

* <code>GET /image-posts/[slug-name]</code>
* <code>POST /path/of/your/choosing</code>
* <code>redirect to GET /image-posts/[slug-name]</code>

__You'll have to modify your template a bit to integrate this additional form__:

* in addition to your add image form, you'll have another separate form on the same page
* the item check form will start above all of your image
* and end after the last image
* populate your form with some form elements:
	* a checkbox before each image
        * the <code>name</code> of all of your checkboxes should be the same
        * however, the value of each should be <code>_id</code>
        * (<code>_id</code> is automatically generated for you by mongodb, so every document you create has this field)
	* a submit button
* decide whether you'll use a hidden input or url parameter (if using a hidden input, add the slug of the image-post as a hidden input form element... if you're using a url parameter, make sure your form posts to the appropriate url)

__Finally, in your route handler, you'll have to remove all of the images that were checked__:

* once again, get the image-post that these images belong to
    * based on the slug, which comes through as:
    * a url param
    * ... or a hidden input
* checkbox inputs come in as an Array or a string
    * ([see checkbox behavior in these slides](../slides/11/forms-revisited.html))
    * if there's only one image checked, the id comes in as a single string
    * otherwise, if you have more than one image checked, you'll have an array
    * __you can see this by logging out the contents of req.body.[name of your checkbox fields]__ 
    * you can use <code>Array.isArray</code> to check what you have ([see the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray))
* go through all of the ids and remove the images with the incoming ids:
    * [see the docs on using .remove()](http://mongoosejs.com/docs/subdocs.html)
    * for example, if you have a <code>Factory</code> schema
    * ...that has an array of <code>Widget</code> objects called <code>widgets</code>
    * removing a single widget would be:
    * <code>factoryObj.widgets.id(varWithId).remove()</code>
* here's what the interaction should look like:

![remove images](/csci-ua.0480-fall2017-007/resources/img/hw06-05-remove.gif) 

### Validation and Error Messages

1. make all fields in every schema required except for caption
2. if a required field is blank, send back an error message to the user
    * check the <code>err</code> object in the callback to your mongoose related functions like <code>save</code>
    * if it exists, and it has to do with a required field...
    * populate a template variable so that the error message can be displayed in red above your form

## Extra Credit

__If you're doing extra credit, add a REAMDE.md file that specifies that you are implementing it__ (otherwise, the graders won't check for it, do don't complain if it's not counted 🙃):


### Referenced Documents

Instead of embedding <code>Image</code>s in <code>ImagePost</code>s, make them separate documents linked together by some id field. Check out [the mongoose docs](http://mongoosejs.com/docs/populate.html).

This is more difficult than just changing the schema, as you'll have to change all of your route handlers that modify or add data.


</div>

</div>


