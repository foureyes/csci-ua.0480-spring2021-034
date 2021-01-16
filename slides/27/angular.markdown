---
layout: slides
title: "Angular"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## What's Angular.js?

Angular is a client-side JavaScript framework for creating web applications.

* {:.fragment} extends HTML _vocabulary_ for dynamic views (rather than just static content)
* {:.fragment} based on model, view, controller architecture
* {:.fragment} particularly well suited for creating single page, interactive web applications
* {:.fragment} does not abstract away html/css (a bit different from what we've been doing so far)
</section>
<section markdown="block">
## Why Use Angular?

* a quick way for creating client side web apps
* familiar templating engine
* html tags... w/ data
* handles dom very well
* data directly bound to template (two-way data binding)
* easily load json documents
</section>

<section markdown="block">
## A Quick Recap of MVC

* __model__ - your data
* __views__ - how data or model is displayed
* __controllers__ - orchestrates how models, templates, views and data work together
</section>

<section markdown="block">
## Data Binding

Binding in classical template systems vs two way data binding:

[https://docs.angularjs.org/guide/databinding](https://docs.angularjs.org/guide/databinding)

* in classical template systems, model and template are merged once and pushed to the view
* keeping view in sync with data changes up to developer - had to be done manually
* angular templates are automatically updated when the model changes, and the model is updated when ineteraction occurs in the view
* __Two-Way Data Binding__
</section>

<section markdown="block">
## Some Notes

* again... Angular is a client side JavaScript framework
* models, views and controllers are client side
* even templating is compiled on the client side
* usually only relies on server for initial page load and persistent storage
	* not really a need for server side templating, tho, right?
</section>

<section markdown="block">
## Which Version?

The latest version of Angular is 1.3.x. 

* it's a recent significant release, with some breaking changes for legacy applications
* most of the guides and tutorials out there are still for 1.2.x
* probably a good idea to learn 1.3, though... as it paves the wave for Angular 2
* some changes from 1.2 to 1.3 ...
	* [https://docs.angularjs.org/guide/migration](https://docs.angularjs.org/guide/migration)
	* [http://ng-learn.org/2014/06/Migration_Guide_from_1-2_to1-3/](http://ng-learn.org/2014/06/Migration_Guide_from_1-2_to1-3/)
</section>


<section markdown="block">
## Using Angular

Get angular by:

* downloading from [https://angularjs.org/](https://angularjs.org/)
* or using a cdn (for example, [https://ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js)
</section>

<section markdown="block">
## Angular Directives

__directives__ - markers on DOM elements (usually an element attribute) that tell Angular's HTML compiler to associate behavior/command/transformation to that element 

* think of as commands that can be placed in html
* usually prefixed with ng or data-ng
* there are built in directives
* ... and you can create your own
* an example directive below:

<pre><code data-trim contenteditable>
&lt;html ng-app="myApp"&gt;
</code></pre>
</section>

<section markdown="block">
## ng-app

The __ng-app__ directive:

* specifies the root element of our Angular application
* it's usually near the _actual_ root element of the document (<code>html</code>) 
* __required__ to _activate_ / bootstrap angular!

</section>

<section markdown="block">
## Angular Expressions

__AngularJS expressions__ bind data to HTML

* they're written within double braces: {{"{{ some expression "}}}}.
* you can have simple JavaScript expessions within them
* kind of like handlebars templating!
<br>

<pre><code data-trim contenteditable>
&lt;!DOCTYPE html&gt;
&lt;html ng-app=""&gt;
&lt;head&gt;
&lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;div&gt;
 	&lt;p&gt;{{"{{ 'hello' + 'world' "}}}}&lt;/p&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
</section>

<section markdown="block">
## Scopes

Scopes are the glue between the application layer and the view.

It's essentially an object that can be used to access the model.

<pre><code data-trim contenteditable>
$scope
</code></pre>

</section>

<section markdown="block">
##  Two Way Data Binding

Here, we bind the input text field with a model, myName.

<pre><code data-trim contenteditable>
&lt;div class="field"&gt;
  &lt;input type="text" ng-model="myName" /&gt;
  &lt;p&gt;My name is &lt;strong&gt;&lt;/strong&gt;&lt;/p&gt;
  &lt;button ng-click="myName='default value'"&gt;Reset to 'default value'&lt;/button&gt;
&lt;/div&gt;
</code></pre>

</section>

<section markdown="block">
## Another Example of Two Way Data Binding

<pre><code data-trim contenteditable>
&lt;div class="field"&gt;
	&lt;input type="text" ng-model="myName" /&gt;
	{{"{{myName"}}}}
&lt;/div&gt;
</code></pre>

</section>

<section markdown="block">
## Defining Models and Controllers

Let's try creating a model and controller... and using $scope, and a directive called ng-repeat (a loop!).

<pre><code data-trim contenteditable>
var myApp = angular.module('myApp', []);
myApp.controller("ImageBoardController", function ($scope) {
	$scope.images = [
    {'title':'image 1', 'url': 'http://foo.bar'},
    {'title':'image 2', 'url': 'http://baz.qux'},
    {'title':'image 3', 'url': 'http://weeble.wuz'}
	];
});
</code></pre>
</section>

<section markdown="block">
## Defining Models, Controllers Continued

In your markup, <code>index.html</code>:

<pre><code data-trim contenteditable>
&lt;html ng-app="myApp"&gt;
	&lt;head&gt;
		&lt;title&gt;&lt;/title&gt;
		&lt;script src="javascripts/angular.js"&gt;&lt;/script&gt;
		&lt;script src="javascripts/controllers.js"&gt;&lt;/script&gt;
	&lt;/head&gt;
	&lt;body&gt;
	&lt;div ng-controller="ImageBoardController"&gt;
		&lt;ul&gt; 
			&lt;li ng-repeat="image in images"&gt;
				&lt;span&gt;	{{"{{ image.title "}}}} - {{"{{ image.url "}}}} {{"{{ $index "}}}}&lt;/span&gt;
			&lt;/li&gt;
		&lt;/ul&gt;
	&lt;/div&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code></pre>
</section>

<section markdown="block">
## Using http

The [http service](https://docs.angularjs.org/api/ng/service/$http) is angular's abstraction for making http requests. In your controller:

<pre><code data-trim contenteditable>
var myApp = angular.module('myApp', []);
// controller
myApp.controller("ImageBoardController", ['$scope', '$http', function($scope, $http) {
  $http.get('/api/images'). 
    success(function(data) {
      $scope.images = data; 
    }).
    error(function(err) {
      console.log('ruh roh');
    });
}]);
</code></pre>
</section>

<section markdown="block">
## Using http continued

On the server...

<pre><code data-trim contenteditable>
var express = require('express');
var router = express.Router();

router.get('/api/images', function(req, res) {
  var images = [
    {'title':'image 1', 'url': 'http://foo.bar'},
    {'title':'image 2', 'url': 'http://baz.qux'},
    {'title':'image 3', 'url': 'http://weeble.wuz'}
  ];
  res.json(images);  
});
module.exports = router;

</code></pre>
</section>

<section markdown="block">
## The Controller...


<pre><code data-trim contenteditable>
var myApp = angular.module('myApp', []);
// controller
myApp.controller("ImageBoardController", ['$scope', '$http', function($scope, $http) {
  $http.get('/api/images'). 
    success(function(data) {
      $scope.images = data; 
    }).
    error(function(err) {
      console.log('ruh roh');
    });
}]);
</code></pre>
</section>


<section markdown="block">
## With a Database

Router 

<pre><code data-trim contenteditable>

// home is in public!
router.get('/api/images', function(req, res) {
  var images = ImagePost.find(function(err, imagePosts){
    res.json(imagePosts);  
  });  
});
</code></pre>
</section>



<section markdown="block">
## A Note on Handlebars

Handlebars and {{"{{ "}}}}!? ...does not really play well with Angular.  Fortunately, you can specify the delimeter for Angular expressions:

<pre><code data-trim contenteditable>

appModule.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
</code></pre>

Then you could use this in angular:

<pre><code data-trim contenteditable>
{[{message}]}
</code></pre>

</section>

<section markdown="block">
## A Complete App

Markup...

<pre><code data-trim contenteditable>
&lt;body ng-controller="ImageBoardController" ng-init="getImages()"&gt;
&lt;form&gt;
	title &lt;input type="text" ng-model="title" name="title"&gt;
	url &lt;input type="text" ng-model="url" name="url"&gt;
	&lt;input type="button" ng-click="addImage(title, url)" value="submit"&gt;

&lt;/form&gt;
&lt;div&gt;
	&lt;ul&gt; 
		&lt;li ng-repeat="image in images"&gt;
			&lt;p&gt;Image  {{"{{$index"}}}}:{{image.title}}&lt;/p&gt; &lt;img  src='{{"{{image.url"}}}}'&gt;&lt;/span&gt;
		&lt;/li&gt;
	&lt;/ul&gt;
&lt;/div&gt;
&lt;/body&gt;

</code></pre>
</section>

<section markdown="block">
## Our Controller

<pre><code data-trim contenteditable>
var myApp = angular.module('myApp', []);

// controller
myApp.controller("ImageBoardController", ['$scope', '$http', function($scope, $http, images) {
  $scope.images = [{'foo':'bar'}];

}]);

</code></pre>

</section>
<section markdown="block">
## getImages Function

<pre><code data-trim contenteditable>
  $scope.getImages = function() {
    $http.get('/api/images') 
      .success(function(data) {
        $scope.images = data;
        console.log("retrieved images", $scope.images);
      })
      .error(function(data, status) {
        console.log('error:', data, status);
      });
  };
</code></pre>

</section>
<section markdown="block">
## addImage Function

<pre><code data-trim contenteditable>
  $scope.addImage = function(title, url) {
    console.log("button clicked:", url, title);
    img = {'title':title, 'url':url}; 
    $http.post('/api/image', {
      method: 'POST',
      data: img,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }) 
      .success(function(data) {
        console.log("success - got: ", data);
        // add to beginning
        $scope.images.unshift({'url':data.url, 'title':data.title});
        console.log("update images:", $scope.images);
      })
      .error(function(data, status) {
        console.log('error:', data, status);
      });
  };
</code></pre>
</section>

<section markdown="block">
## And on the Server

<pre><code data-trim contenteditable>
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ImagePost = mongoose.model('ImagePost');

router.get('/api/images', function(req, res) {
  var images = ImagePost.find({}).sort('-postDate').exec(function(err, imagePosts){
    res.json(imagePosts);  
  });  
});

router.post('/api/image', function(req, res) {
  console.log(req.body);
  image = new ImagePost({
    'title': req.body.data.title,
    'url': req.body.data.url,
    'postDate': Date.now()
  });
  image.save(function(err, saved_image) {
    res.json(saved_image);
  });
});
module.exports = router;
</code></pre>

</section>

<section markdown="block">
## Of Course, the Schema

<pre><code data-trim contenteditable>
var mongoose = require('mongoose');

var ImagePost = new mongoose.Schema({
  title: String,
  url: String,
  postDate: Date
});

mongo_uri = process.env.MONGO_URI || 'mongodb://localhost/imageboarddb';
mongoose.connect(mongo_uri);
mongoose.model('ImagePost', ImagePost);

</code></pre>

</section>
