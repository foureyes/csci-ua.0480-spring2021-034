---
layout: homework
title: CSCI-UA.0480 - Homework 5
---
<style>
img {
	width: 100%;
}
</style>

<div class="panel panel-default">
<div class="panel-heading">Homework #5</div>
<div class="panel-body" markdown="block">

# 'Tech Gallery' - Express Site with Images & HTML Forms - Due __Monday, March 9th, by 11PM__

## Overview

How your app will look like when you complete the assignment:

(🔎👀 right-click and open image in new tab to see larger version for all images)

![example interaction](../resources/img/hw05-tech-gallery/interaction-full.gif)

### Description

In this homework assignment you will be extending a basic web application built with `express` and `handlebars` to include search functionality and the ability to add new data 
via __HTML forms__. So far, the skeleton application you are given loads a bit of `JSON` data from disk, stores it in-memory, and contains a single route handler that renders an
`.hbs` template that displays the data. The focus of this assignment is on:

* working with HTML `<form>`'s
* working with query strings
* handling POST and redirects

The application you are given is a simple gallery-like single-page application that displays images and some tags that are associated with a particular image. If you wish, feel free to check
out the `data.json` file that is provided for the exact format of the data as well as the provided `home.hbs` file that renders the data with handlebars. 

Here is how the site looks like right now:

![screenshot](../resources/img/hw05-tech-gallery/screenshot-1.png)

 
The site in it's current state is quite boring, since it just gives back whatever data we have and does not really support any kind of user interaction, so...
your task is to implement 2 major features for our app:

1) Ability to filter based on the tags associated with each image
2) Ability to add a __completely new__ image entry by providing a URL and some relevant tags

You'll be primarily working with HTML forms and query strings to implement the features.

### Requirements

You'll be expanding the web site to contain 2 pages:

* __Home__ - `/`: 'home' page that displays all of the images and their tags in a grid and contains a filter form to filter based on a single tag or a list of tags
* __Add__ - `/add`: a page that lets a user add a new data item to the in-memory store (and thus the image grid) by specifying an image URL and some relevant comma-separated tags

Your directory layout should look like the following __once you're done with the assignment__:

```
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── css
│   │   └── main.css
│   └── img
│       └── logo.svg
├── data.json
└── views
    └── add.hbs
    ├── home.hbs
    └── layout.hbs
├── util.js
```

### Submission Process

1. You will be given access to a private repository on GitHub
2. The final version of your assignment should be in GitHub
3. __Push__ your changes to the homework repository on GitHub by the due date.

###  Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits - (for example, one option may be to make one commit per part in the homework).


## Part 1 - Setup and Running Skeleton Application

###  .gitignore

* create a `.gitignore`
* ignore the following files / directories:
	* `/node_modules`
	* any other files that aren't relevant to the project... for example
        * `DS_Store` if you're on OSX
        * etc.

### linting

* an eslint configuration file (for example `.eslintrc.json`) should be in the root directory (or copy one from a previous project if it doesn't exist)
* make sure that any linting tools are installed (`eslint`)
* periodically lint your program as you work
* minor deductions (0.5 to 1 point) will be taken off for each __class__ of error, w/ a maximum of 3 to 5 points total

### running the app

* The provided `package.json` contains all of the dependencies that are required to run the application
* from the root of the assignment directory:
    * run `npm install` to install the dependencies
    * `node app.js` to start the server
* head over to `localhost:3000` and verify that the server is running correctly and is serving the page that simply displays all of the data

This is what you should be able to see at this time:

![screenshot](../resources/img/hw05-tech-gallery/screenshot-1.png)

## Part 2 - Filtering

Displaying all of the data in a single page is nice, but we should be able to get back results in a more specific way. To achieve this we will use
query string parameters to pass data with a request. This feature will consist of 2 main parts - the HTML form and the modified route handler that will return 
data only matching some input.

### Adding an HTML form

Add an HTML form to the `home.hbs` template file such that the form appears above the grid of images. (refer to https://cs.nyu.edu/courses/spring20/CSCI-UA.0480-008/_site/slides/10/forms.html#/ for
lecture slides on forms)

* The method of the form should be `GET`
* The route it will trigger should be `/`
* the form should have a single `<input>` 
    * of type `text` that will server as a text field to capture user input
    * give it a name to identify, e.g. `tagQuery`
* and finally the form should have a `search` submit button that triggers the form to be submitted

Here is how the site should look like once you add only the HTML of the form (`CSS` doesn't have to be exact but try to make it centered)

![screenshot](../resources/img/hw05-tech-gallery/screenshot-2.png)

### Adding Filtering to route

Now that you have an HTML form done, connect it to a route by parsing in the query parameters and add logic to filter the in-memory store of data.

* parse the query string from the `req` object (refer to slides and code snippets for how to do this)
    * this string should serve as a 'filter' where only images with tags that match the string are returned
* find a way (perhaps a loop) to filter only the relevant data items
* modify the `render` call by passing in the __filtered array of data items__ other than the __entire__ list of data.

Here is an example interaction where text is submitted via a form and the data is filtered to return only the data items where any one of the tags
matches the form text input. __Note that submitting an empty form should clear any 'filtering' and just return all of the data__.

![example interaction](../resources/img/hw05-tech-gallery/interaction-1.gif)

### Adding links to tags

Now that we have filtering working via a form, it would be nice to be able to click on those tags that are rendered next to every image and trigger the same 
filtering behavior where only the images with tags containing the tag that was clicked are displayed.

* Add a relevant `<a>` anchor tag that will act just like a form submission
* HINT: inspect the URL when submitting the form to see what the pattern of query strings is
* HINT: make the `href` of the `<a>` correspond to the correct query string (you have access to the tag text inside of the `#each` loop)

Here is how the interaction should look like when you are done with this part:

![example interaction](../resources/img/hw05-tech-gallery/interaction-2.gif)

### More Advanced Filtering

Modify your code for filtering out data on the route handler to support query string parameters that let you submit __comma-separated__ lists of tags.

This more advanced filtering should parse the query string, extract individual tags, and return all data points that match __at least__ one of the tags in the 
list. Another way to think about this is doing a logical OR on the tag queries as opposed to an AND.

Here is an example interaction, note how images with tags that contain at least one of the tags `#react`, `#msft`, and `#github` are returned:

![example interaction](../resources/img/hw05-tech-gallery/interaction-3.gif)

## Part 4 - 'Add New Image' Page

Our app is looking more interactive now that there is functionality to submit queries to filter down the data based on tags and can click on the tags 
themselves to apply a filter. There is, however, no way to add new data to our in-memory data store, so...

__Add a new page that will let a user submit a form and add a new image along with some tags__.

* Add a new `add.hbs` file
* Add a route handler to render the `add.hbs` template on the `/add` route

We will be submitting new data to the in-memory store via.... another form.

* Add a second HTML form to the `add.hbs` file.

This form:
* should have a method of `POST`
* should trigger the request to the `/add` route
* should contain 2 `input` fields:
    * 1) A URL input of type `text` that asks for a URL of an image somewhere on the internet
    * 2) A `text` field for the comma-separated tags that are associated with the image (linked via the URL)
        * HINT: can use `textarea` input for an input that looks like a larger text box
        * the input fields does not have to be separated, simply as long as you can parse it into an array of tags
* should have a submit button that triggers the submission of the form

How your form might look like with some basic styling:

![screenshot](../resources/img/hw05-tech-gallery/screenshot-3.png)
        
Since the form will be `POST`ing to a new route, don't forget to add a new route handler to handle the result of the form submission
The route handler should:
* Handle a `POST` request
* Parse the body of the request (`req` object) and extract the tags and the URL
* Create a new instance of `Image` class that is provided to you
* Add the new object to the in-memory store (__the object should be added to the beginning of the list__)
* Finally, the route handler should redirect __back to the home page__
    * The new image along with the user-inputted tags should appear at the start of the image grid!
    
    
Here is an example of a new image being added along with some tags that your site should be able to support
(Note the new image tags are clickable to filter!)

![interaction](../resources/img/hw05-tech-gallery/interaction-4.gif)

</div>
</div>
