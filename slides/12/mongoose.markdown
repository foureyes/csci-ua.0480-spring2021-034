---
layout: slides
title: "Mongoose"
---


<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## NoSQL Database, ODM

__What's a NoSQL database again?__?

* a database that doesn't model data using tables and relations between those tables
* instead, usually a key value store
* or a document store
{:.fragment}

<br>
__And what's an ODM?__ &rarr;
{:.fragment}

* object document mapper
* maps application objects (objects in your code) to documents in your database
	* allows CRUD operations on those documents
{:.fragment}


<br>
__We're using MongoDB as our database and Mongoose as our ODM__
{:.fragment}


</section>
<section markdown="block">
## Mongoose


<div markdown="block" class="img">
![mongoose]({{ site.vars.slides_img_prefix }}/mongoose.jpg)
</div>
</section>

<section markdown="block">
## Vocabulary

__What's a document... and what's a collection?__ &rarr;

In MongoDB
{:.fragment}

* __document__ - a single row or object in your database (like... an instance of a pizza or cat)
* __collection__ - a group of documents, similar to a table in a relational database
{:.fragment}

__What's a schema, model... and object?__ &rarr;
{:.fragment}

In Mongoose...
{:.fragment}

* __schema__ - describes a collection, provides properties and other constraints (think class)
* __model__ - built from a schema, a constructor that allows you to create objects (think constructor for class)
* __objects/model instances__ - represent a document
{:.fragment}

</section>

<section markdown="block">
## Schemas

A schemas is analogous to a collection. We create a schema with the <code>mongoose.Schema</code> constructor.

* the convention is that your schema's name will match a lowercase, plural colleciton in your database
* the Schema constructor takes an object with keys as names of keys that the documents created from this schema will have
* ...and values that represent the configuration of these keys (for example, type)
</section>

<section markdown="block">
## Models

Once you have a schema, you can then register a model. A model is a constructor for creating objects that represent MongoDB Documents.

Instance Methods

* <code>save</code> (create a new document)

Static Methods

* <code>find</code>
* <code>findOne</code>
* <code>findOneAndUpdate</code>

</section>

<section markdown="block">
## Slugs and Plugins (Slug-ins?)

To add extra features to your schemas, you can use plug-ins.

One plug-in, mongoose-url-slugs... 

* can be used to generate a __slug__ (human readable string that's unique for each document) for all of your objects
* __without having to manually specify slug in the schema!__
</section>

<section markdown="block">
## Pizza

__Let's try creating a schema for a pizza and toppings.__ &rarr;

* it should allow pizzas to have a size and crust
* it should associate pizzas with toppings
* the pizza should have a short-name (a slug)
* toppings should have a name, and some way of noting whether or not you'd like 'extra' toppings

<pre><code data-trim contenteditable>
{
	size: 'medium',
	crust: 'thin',
	slug: 'medium-thin-2'
	toppings: [{name:'mushroom', extra:true}, {name:'peppers'}]
}
</code></pre>
</section>

<section markdown="block">
## Let's Start With Some Setup

Make sure that you have the required modules for connecting to the database... and creating a slug!

* mongoose
* mongoose-url-slugs

<br>
<pre><code data-trim contenteditable>
npm install --save mongoose mongoose-url-slugs
</code></pre>

Require and connect...

<pre><code data-trim contenteditable>
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

// more stuff goes here

mongoose.model('Pizza', Pizza);
mongoose.model('Topping', Topping);
mongoose.connect('mongodb://localhost/pizzadb');
</code></pre>
</section>

<section markdown="block">
## Types / Embedded Documents

* one way to define relationships is to __embed__ one document in another... 
    * for example, this specifies that field Foo contains an Array / list of Bar objects
    * Foo: [Bar]
* additionally, instead of specifying the type outright, you can use an object that defines some field specifications:
    * type
    * max
    * min
    * required
    * default (for default value)
</section>
<section markdown="block">
## Your Schema

Schemas represent collections (tables). Notice the different ways of specifying the type of a field:


<pre><code data-trim contenteditable>
const Topping = new mongoose.Schema({
	name: String,
	extra: {type: Boolean, default:false}
});

const Pizza = new mongoose.Schema({
	size: {type: String, enum: ['small', 'medium', 'large']},
	crust: String,
	toppings: [Topping]
});
</code></pre>

<pre><code data-trim contenteditable>
// note that we left out slug from the schema... 
// (the plugin will add it for you!)
// this should go before registering model!
Pizza.plugin(URLSlugs('size crust'));
</code></pre>
</section>

<section markdown="block">
## Models

With mongoose, a model allows you to: 

* create new instances and save them
* find saved instances (using a static method)
* update existing instances

<br>
<pre><code data-trim contenteditable>
Pizza = mongoose.model('Pizza');
</code></pre>
</section>

<section markdown="block">
## Creating and Saving

<pre><code data-trim contenteditable>
const pizza1 = new Pizza({
	size: 'small',
	crust: 'thin'
});

pizza1.save(function(err, pizza, count) {
	console.log('made me some pizza', pizza, count, err);
});

// call mongoose.disconnect() in callback function to close
// database connection;
</code></pre>
</section>

<section markdown="block">
## Finding / Retrieving

Ok... just like the commandline client, we can use __find__:

<pre><code data-trim contenteditable>
// find all (try with query/criteria)
Pizza.find(function(err, pizzas, count) {
	console.log(err, pizzas, count);
});
</code></pre>

Notice that we get back an Array!
</section>
<section markdown="block">
## Finding Only One!

__But I only want one!__ Sometimes it's annoying to have to index into an Array if you only want one of something, so there's also __findOne__ &rarr;
<pre><code data-trim contenteditable>
// find only one (returns first)
Pizza.findOne({slug: 'small-2' }, function(err, pizza, count) {
	console.log(err, pizza, count);
});
</code></pre>
</section>

<section markdown="block">
## Finding Then Updating

In Mongoose... instead of using the push operator (like in the commandline client), we have a method, __push__, that can be called on a property if it represents a list / Array of embedded values:
<pre><code data-trim contenteditable>
// update one after finding (hello callbacks!)
Pizza.findOne({slug: 'small-2' }, function(err, pizza, count) {
    // we can call push on toppings!
	pizza.toppings.push({name: 'mushroom'});
	pizza.save(function(saveErr, savePizza, saveCount) {
		console.log(savePizza);	
	});
});
</code></pre>
</section>

<section markdown="block">
## Finding Then Updating Take Two

But of course... we can _actually_ use push in an update query. In this case, we're using __findOneAndUpdate__ to do the find and update all at once!

<pre><code data-trim contenteditable>
// find one and update it; maybe better than previous?
// ...notice $push?
Pizza.findOneAndUpdate({slug:'small-2'}, {$push: {toppings: {name:'peppers'}}}, function(err, pizza, count) {
	console.log(err, pizza, count);
});
</code></pre>
</section>
<section markdown="block">
## Finding by Embedded Documents

We can also adjust our query to find by an embedded document. In this case, we use the property of the list of embedded documents... and use another object that describes the embedded document that we'd like to match.

<pre><code data-trim contenteditable>
Pizza.find({toppings: {name:'mushroom'}}, function(err, pizzas, count) {
	console.log(pizzas);
});
</code></pre>
</section>
<section markdown="block">
## Finding and Updating Multiple Embedded Documents

Notice that when we update an embedded document, before we save the parent, we have to let mongoose know that we made changes to embedded documents. (shrug)

<pre><code data-trim contenteditable>
Pizza.findOne({slug:'small-2'}, function(err, pizza, count) {
	for (let i = 0; i < pizza.toppings.length; i++) {
		pizza.toppings[i].extra = true;
	}
	pizza.markModified('toppings');
	pizza.save(function(err, modifiedPizza, count) {
		console.log(err, modifiedPizza);
	});
});
</code></pre>

(whew!) 
</section>
