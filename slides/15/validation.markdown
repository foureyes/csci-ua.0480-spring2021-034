---
layout: slides
title: "Validation, Error Handling, Forms"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* where to implement validation
* validation in our schema
* sending errors back
* express-validate

<!--
* checking the err object
* an aside on exceptions
* throwing an exception
* use flash messages
* mongoose validation
-->

</section>

<section markdown="block">
## MongoDB and Creating Documents

__Does mongo impose any constraints on the documents that you create? Does it care if certain keys and values exist?__ &rarr;


* mongo doesn't care at all!
* you can insert whatever document you want, with whatever key/value pairs
* it doesn't even matter if there's no database yet or no collection yet, it'll create those for you (__remember?__ &rarr;)
{:.fragment}

<br>

</section>

<section markdown="block">
## MongoDB is Pretty Laid Back

Maybe too laid back. __Sooo... do we just let users enter in whatever data they want?__ &rarr;

We _probably_ shouldn't do that, of course.  __So if our database doesn't deal with constraints and validations, who's going to be responsible for doing that?__
{:.fragment}

The application layer! __But where in our application layer - client-side (in our form, through constrained form fields) or server-side (in our express app)? Why?__
{:.fragment}

* at the very least, server side (you can always bypass the frontend by sending a request directly with something like the request module for node, curl, etc.)
* ideally, however, you'd want validation on both the client and the server side (the sooner the user can get feedback, the better)
* __which poses an interesting problem...__ &rarr;
* {:.fragment} syncing validation 
{:.fragment}
</section>

<section markdown="block">
## Server Side Validation

Ok, so we know that we need to validate on the server side. __Where in our application can we place this validation logic?__

1. in our database abstraction layer (our Mongoose schema)
2. in our _controller_ (our Express router)
3. some other intermediary object / layer (maybe we'll create a form object responsible for mediating between Mongoose and our frontend)
{:.fragment}

<br>
We'll be looking at numbers 1 and 2. A good candidate to start with is our Schema...
{:.fragment}

</section>

<section markdown="block">
## Rejected by Mongoose!

Mongoose has facilities for validation, and we're already sort of using them.  __Let's see this in action by setting up a quick schema and form.__ &rarr;

* let's go back to our cat schema...
	* cat name
	* cat age
* make sure one of the fields is a Number

<br>
In db.js....
{:.fragment}

<pre><code data-trim contenteditable>
const mongoose = require('mongoose');

// back to cats!
const CatSchema = new mongoose.Schema({
  name: {type:String},
  age: Number
});

const Cat = mongoose.model('Cat', CatSchema);
mongoose.connect('mongodb://localhost/catdb'); 
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## And the Remainder of the Setup on the Server

And, of course, __require in app.js__:

<pre><code data-trim contenteditable>
require('./db');
</code></pre>
{:.fragment}

__Set up your route and handlers in index.js__:
{:.fragment}

<pre><code data-trim contenteditable>
const mongoose = require('mongoose');
const Cat = mongoose.model('Cat');
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
router.get('/', function(req, res) {
  res.render('index');
});
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## And the Post

<pre><code data-trim contenteditable>
router.post('/', function(req, res) {
  console.log(req.body);
  const cat = new Cat({
    name: req.body.name, 
    age: req.body.age,
  });
  cat.save(function(err, cat, count) {
    console.log("Saved!");
  });
});
</code></pre>

</section>

<section markdown="block">
## Lastly, Our Form

In __views/index.hbs__ &rarr;

<pre><code data-trim contenteditable>
&lt;form method="POST" action=""&gt;
&lt;div&gt;&lt;label&gt;Name&lt;/label&gt; &lt;input type="text" name="name"&gt;&lt;/div&gt;
&lt;div&gt;&lt;label&gt;Age&lt;/label&gt; &lt;input type="text" name="age"&gt;&lt;/div&gt;
&lt;input type="submit"&gt;&lt;/div&gt;
&lt;/form&gt;
</code></pre>
</section>

<section markdown="block">
## Whew!

Let's try inserting... and checking our database:

* <code>katy purry</code> and <code>3</code>
* <code>bill furry</code> and <code>idk!</code>
<br>
__What happened to the second one? How can we find out?__ &rarr;
* insert didn't work for <code>bill furry</code>
* log the error in our save callback
* looks like there was a cast error, and an error object
</section>

<section markdown="block">
## Mongoose Validators, Types

In Mongoose, Validation is defined in the SchemaType.

* it occurs when a document attempts to be saved, after defaults have been applied
* embedded document validation occurs as well

<br>
Remember that <code>err</code> object in our save callback? Mongoose will populate the error object if:

* the document doesn't pass built-in Mongoose schema validations
* the document doesn't pass custom Mongoose validations
* the document doesn't adhere to the types declared in the schema

<br>
Let's look at some built-in Mongoose schema validations first, since they're a bit nicer to deal with.
</section>

<section markdown="block">
## Built-In Validators

Mongoose has the following built-in validators:

* all schema types can be _required_ 
* Numbers can have a _min_ and _max_
* Strings can be constrained to a specific set of strings (an _enum_) or to a specific _match_
* these all involve setting the property/field in your schema to an object
</section>

<section markdown="block">
## Required

<pre><code data-trim contenteditable>
// required
name: {type:String, required:true}

// required with a nice error message
name: {type:String, required:[true, '{PATH} is required']}
</code></pre>

* use the required property with a boolean
* optionally set the value to an array, with the first element a boolean, and the second a custom error message
	* {PATH} can optionally be used a placeholder for the field/property name
</section>

<section markdown="block">
## Min and Max

For numbers, we have min and max...

<pre><code data-trim contenteditable>
// min
age: {type:Number, min:[0, '{PATH} must be greater than {MIN}']}

// max
age: {type:Number, max:[0, '{PATH} must be less than {MAX}']}
</code></pre>

* can gave just number or number and custom message
* additional placeholders include {MIN} and {MAX}
* you can have a min and max on the same field
</section>

<section markdown="block">
## Enum

For strings, we have enum and match:

<pre><code data-trim contenteditable>
// enum
temperament: { type: String, required: true, enum: ['annoying', 'playful'] }

//enum with message
const enumOptions = {values:['annoying', 'playful'], message:'{VALUE} is not a valid temperament'} ;

temperament: { type: String, required: true, enum: enumOptions}

// match
nickname: { type: String, match: /^\w\w\w$/ }}
</code></pre>

* enum has an array of possible values
* note that to include a custom message, you must use an object with a values and message property
* match has regex for validation
</section>

<section markdown="block">
## Summary of Placeholders

* {PATH} - the property name
* {VALUE} - the property's value
* {TYPE} - the validator type ("regexp", "min", or "user defined")
* {MIN} - the specified minimum
* {MAX} - the specified maximum
</section>

<section markdown="block">
## Need More?

[Custom validation also exists](http://mongoosejs.com/docs/validation.html). From the docs:

<pre><code data-trim contenteditable>
// make sure every value is equal to "something"
function validator (val) {
	return val == 'something';
}
new Schema({ name: { type: String, validate: validator }});

// with a custom error message
const custom = [validator, 'Uh oh, {PATH} does not equal "something".']
new Schema({ name: { type: String, validate: custom }});
</code></pre>

* create a function that returns true or false
* set that has the value of the validate property in your schema
</section>

<section markdown="block">
## Errors

When we log out the error object for validation errors, we get:

<pre><code data-trim contenteditable>
{ [ValidationError: Validation failed]
	message: 'Validation failed',
	name: 'ValidationError',
	errors:
		{ temperament:
			{ [ValidatorError: Path `temperament` is required.]
				message: 'Path `temperament` is required.',
				name: 'ValidatorError',
				path: 'temperament',
				type: 'required',
				value: '' },
		name:
			{ [ValidatorError: Path `name` is required.]
				message: 'Path `name` is required.',
</code></pre>

</section>
<section markdown="block">
## Handling Errors

Now that we have errors __what should we do with them? Keep them to ourselves?__ &rarr;

We should probably show the user if there's an issue with their input
{:.fragment}

How do you think we can show errors on the frontend?
{:.fragment}

* check if there's an error in the router
* use the error object to send error messages to our view through the context 
* display the errors
	* look at everything in errors
	* use specific errors.propertyname
{:.fragment}
</section>

<section markdown="block">
## In Our Router...

Do we have an error? Check the __err__ object in our callback. If we do, render form again with errors passed in.

<pre><code data-trim contenteditable>
  const cat = new Cat({
    name: req.body.name, 
    temperament: req.body.temperament, 
    age: req.body.age
  });
  cat.save(function(err, cat, count) {
    console.log(err, cat, count);
    if (err) { 
      res.render('index', { cat:cat, err: err });
    } else {
      res.redirect('/'); 
    }
  });

</code></pre>
</section>

<section markdown="block">
##  In Our View

We can loop through all errors and display them above the form...

<pre><code data-trim contenteditable>
{{"{{#if err"}}}}
&lt;ul&gt;
{{"{{#each err.errors"}}}}
&lt;li&gt;{{"{{message"}}}}&lt;/li&gt;
{{"{{/each"}}}}
&lt;/ul&gt;
{{"{{/if"}}}}
</form>

</code></pre>
</section>

<section markdown="block">
## Another Way

Or we can go field by field. Above each form element, check if there's an error for that element.

<pre><code data-trim contenteditable>
{{"{{#if err.errors.name"}}}} 
&lt;div class="error"&gt;
{{"{{err.errors.name.message"}}}}
&lt;/div&gt;
{{"{{/if"}}}}
</code></pre>
</section>

<section markdown="block">
## Form Fields

__If you're sending errors back, should the form elements be prefilled?__ &rarr;

It'd be courteous to fill them in with what the user had originally submitted:
{:.fragment}

You can access the value of the field in the error object...
{:.fragment}

<pre><code data-trim contenteditable>
&lt;div&gt;
&lt;label&gt;Name&lt;/label&gt; 
&lt;input type="text" name="name" value="{{"{{err.errors.name.value"}}}}"&gt;
&lt;/div&gt;
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Great!

__But let's try a type error. Let's put in a string for a number. What do we get back?__ &rarr;

That's not the same error object!
{:.fragment}

<pre><code data-trim contenteditable>
{ [CastError: Cast to number failed for value "one" at path "age"]
message: 'Cast to number failed for value "one" at path "age"',
name: 'CastError',
type: 'number',
value: 'one',
path: 'age' 
}
</code></pre>
{:.fragment}

Unfortunately, we'd have to handle that through custom validation. (!?)
{:.fragment}
</section>

<section markdown="block">
## Another Option - Express Validator

Validation elsewhere in your app with __express-validator__.

* it's just middleware
* you can replicate and augment your Schema validation using built-in validators
	* isInt
	* notEmpty
	* etc.

<pre><code data-trim contenteditable>
npm install --save express-validator
</code></pre>

In your app.js:
<pre><code data-trim contenteditable>
const validator = require('express-validator');

// after app.use(bodyParser...)
app.use(validator());
</code></pre>
</section>

<section markdown="block">
##  Express Validator Continued

One place you can put it is in your route handler for create. For example... add validators and collect the errors in an error object.

<pre><code data-trim contenteditable>
req.checkBody('age').notEmpty().isInt();
errors = req.validationErrors(true);
</code></pre>

Aaaand... use the error object to send back go your form.

* [docs for express-validator](https://github.com/ctavan/express-validator)
* ...and [node-validator](https://github.com/chriso/validator.js) (contains docs on built-in validators)
</section>
