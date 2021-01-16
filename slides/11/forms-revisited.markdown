---
layout: slides
title: "Forms Revisited"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Form Elements

__What form elements do we know / have we used?__ &rarr;

* __text__ (&lt;input type="text" name="..."&gt;)
* a __submit button__ (&lt;input type="submit" name="..."&gt;)
{:.fragment}

<br>
__What are some other form elements that you've seen for collecting data?__ &rarr;
{:.fragment}

* dropdowns
* multi-selects
* textboxes
* radio buttons
* checkboxes
{:.fragment}
</section>

<section markdown="block">
## And Others...

Some newer ones...

* email
* url
* number
* range
* date
</section>

<section markdown="block">
## You Can't See Me!

There's also a __hidden input__:

* a form element that's not visible in the user interface
* but it still sends its value along with the other input elements 
* (when a form is submitted)
</section>

<section markdown="block">
## All Together 

* text
* email
* url
* number
* radio buttons
* checkboxes
* range
* date
* submit buttons
* dropdowns
* multi-selects
* textboxes
* hidden

</section>
<section markdown="block">
## About Form Markup 

Of course, all of these elements have to be nested within a parent &lt;form&gt; element.

And.... if you want to be able to submit a form (of course you do), you'll probably want a submit button:

<pre><code data-trim contenteditable>
&lt;form method="POST" action=""&gt;
&lt;!-- other form element placed within form tags--&gt;
&lt;input type="submit"&gt;
&lt;/form&gt;
</code></pre>
</section>

<section markdown="block">
## About Form Markup Continued

__Each of these form elements have different markup__: 

* the majority of them are &lt;input&gt;, and vary only by having a different <code>type</code> attribute
* there are others that use entirely different form elements, such as &lt;select&gt; or &lt;textarea&gt;

</section>
<section markdown="block">
## About Form Markup Continued

__But there are some element attributes that are common to all of them__ &rarr;:

* <code>name</code>
	* the __name__ of the form data that you're passing over
	* the property name in the <code>req.body</code> or <code>req.query</code> objects
* <code>value</code> 
	* can be set by the actual __value__ of the form field
	* or set explicitly (can be a default value) in the element's attributes...
	* it's the __value__ associated with the form element's _name_
	* the value contained in the property name in the <code>req.body</code> or <code>req.query</code> objects
{:.fragment}
</section>

<section markdown="block">
## Text, Email, URL

Text, email and url are, as their names imply, input fields for text, emails and urls.  They're all <code>&lt;input&gt;</code> elements. They vary by type:

<pre><code data-trim contenteditable>
&lt;label&gt;Text&lt;/label&gt;&lt;input type="text" name="textExample"&gt;
&lt;label&gt;Email&lt;/label&gt;&lt;input type="email" name="emailExample"&gt;
&lt;label&gt;URL&lt;/label&gt;&lt;input type="url" name="urlExample"&gt;
</code></pre>

* they all look like boxes of text
* __they show up as you'd expect on the server side, the name of the element and its value map directly to a property and value in Express__ &rarr;
* __so... what do you think the difference is between these elements?__ &rarr;
* {:.fragment} __some clients have validation__ &rarr;
</section>

<section markdown="block">
## Range and Number

__Range__ and __number__ represent a numeric value, and again, they're both &lt;input&gt; elements. They have a type of <code>range</code> and <code>number</code>. However, instead of regular text entry...

* __number__ represents a _spin box_
* __range__ represents a slider

<br>
Here's some markup:

<pre><code data-trim contenteditable>
&lt;label&gt;Number&lt;/label&gt;&lt;input type="number" min="1" max="10" step="1" name="numberExample"&gt;
&lt;label&gt;Range&lt;/label&gt;&lt;input  min="1" max="10" step="1" type="range" name="rangeExample"&gt;
</code></pre>

</section>
<section markdown="block">
## Range and Number Continued

__Did you see any extra attributes there?__ &rarr;

The following attributes are optional:
{:.fragment}

* <code>min</code> - the lower bound of the form element
* <code>max</code> - the upper bound of the form element
* <code>step</code> - the interval between values (the increment/decrement from one value to the next)
{:.fragment}
</section>

<section markdown="block">
## Radio Buttons

__Radio buttons__ allow you to choose __only one value__ from a set of values. They're &lt;input&gt; elements with a type of <code>radio</code>.

<pre><code data-trim contenteditable>
&lt;label&gt;Radio 1&lt;/label&gt;&lt;input type="radio" name="radioExample" value="1"&gt;
&lt;label&gt;Radio 2&lt;/label&gt;&lt;input type="radio" name="radioExample" value="2"&gt;
&lt;label&gt;Radio 3&lt;/label&gt;&lt;input type="radio" name="radioExample" value="3"&gt;
</code></pre>

__What's peculiar about the way they're named and the values that they're given? What value do you think is sent over to the server?__ &rarr;

* __all radio buttons within a group of radio buttons should have the same name__
* you can use the <code>checked</code> attribute to have a default radio button selected
* each radio button has its own value
* __the value of the button that's selected is what's sent over to the server__
{:.fragment}
</section>
<section markdown="block">
## Check Boxes

__Check boxes__ allow you to choose __multiple__ values from a set of values. They're &lt;input&gt; elements with a type of <code>checkbox</code>.

<pre><code data-trim contenteditable>
&lt;label&gt;Checkbox 1&lt;/label&gt;
&lt;input type="checkbox" name="checkboxExample" value="1"&gt;
&lt;label&gt;Checkbox 2&lt;/label&gt;
&lt;input type="checkbox" name="checkboxExample" value="2"&gt;
&lt;label&gt;Checkbox 3&lt;/label&gt;
&lt;input type="checkbox" name="checkboxExample" value="3"&gt;
</code></pre>

* __check boxes within a group should have the same name__
* to default to checked, add a <code>checked</code> attribute to the tag
* each checkbox in a group of check boxes has its own value
* __all values of the items checked are sent to the server__ (__how do you think they're represented?__ &rarr;)
* {:.fragment} ...as an array! (or as a single value if only one item checked)
* {:.fragment} if the frst two were checked, <code>req.body.checkboxExample</code> &rarr; <code>[1, 2]</code>
</section>

<section markdown="block">
## Date

__Date__ shows up as a date picker in your browser. It is an &lt;input&gt; element with a type of <code>date</code>

<pre><code data-trim contenteditable>
&lt;label&gt;Date&lt;/label&gt;&lt;input type="date" name="dateExample"&gt;
</code></pre>

* sent over to the server in <code>yyyy-mm-dd</code> format
* other date and time element types include <code>datetime</code>, <code>week</code>, <code>month</code>, etc.
</section>

<section markdown="block">
## Dropdowns and Multi-Selects

__Dropdowns__ represent a form element that lets you pick a single value from a set of values (Similar to radio buttons). However, the markup for dropdowns uses a single &lt;select&gt; element (with the <code>name</code> attribute), and &lt;option&gt; elements (with the <code>value</code>) nested within it:

<pre><code data-trim contenteditable>
&lt;select name="selectExample"&gt;
&lt;option value="Option 1"&gt;Option 1&lt;/option&gt;
&lt;option value="Option 2" selected&gt;Option 2&lt;/option&gt;
&lt;option value="Option 3"&gt;Option 3&lt;/option&gt;
&lt;/select&gt;
</code></pre>

* single value shows up on server side
* you can use selected in <code>option</code> element to default to that option
* use the attribute, <code>multiple</code>, on the <code>select</code> element...
	* to allow multiple values to be selected
	* ...if multiple values, interpreted as an Array on server side

</section>

<section markdown="block">
## Textbox/Textareas

A larger version of text input!

<pre><code data-trim contenteditable>
&lt;textarea name="textareaExample"&gt;&lt;/textarea&gt;
</code></pre>

(not much to see here)
</section>

<section markdown="block">
## Hidden Input

This input will send along the data that's in the <code>value</code> attribute when the form is submitted. It's not visible in the user interface.

<pre><code data-trim contenteditable>
&lt;input type="hidden" name="hiddenExample" value="someValue&gt;
</code></pre>

Particularly useful if you want a pre-set piece of data to be submitted along with the rest of your form (perhaps the id of an associated resource).
</section>

<section markdown="block">
## For a Demo


In a router...

<pre><code data-trim contenteditable>
router.get('/forms', function(req, res) {
	res.render('forms', { title: 'Express' });
});

router.post('/forms', function(req, res) {
	console.log('=====\n', req.body, '\n=====');
	res.redirect('/forms');
});
</code></pre>
</section>

<section markdown="block">
## For a Demo Continued


In forms.hbs:

<pre><code data-trim contenteditable>
<form method="POST" action="">
<div>
<label>Text</label><input type="text" name="textExample">
</div>
<div>
<label>Email</label><input type="email" name="emailExample">
</div>
<div>
<label>URL</label><input type="url" name="urlExample"></div>
<div>
<label>Search</label><input type="search" name="searchExample">
</div>
<div>
<label>Number</label><input type="number" min="1" max="10" step="1" name="numberExample">
</div>
<div>
<label>Range</label><input  min="1" max="10" step="1" type="range" name="rangeExample">
</div>
<div>
<label>Radio 1</label><input type="radio" name="radioExample" value="Radio 1">
<label>Radio 2</label><input type="radio" checked name="radioExample" value="Radio 2">
<label>Radio 3</label><input type="radio" name="radioExample" value="Radio 3">
</div>
<div>
<label>Checkbox 1</label><input type="checkbox" name="checkboxExample" value="Checkbox 1">
<label>Checkbox 2</label><input type="checkbox" name="checkboxExample" value="Checkbox 2">
<label>Checkbox 3</label><input type="checkbox" name="checkboxExample" value="Checkbox 3">
</div>
<div>
<label>Date</label><input type="date" name="dateExample">
</div>
<div>
<label>Dropdown</label>
<select name="selectExample">
<option value="Option 1">Option 1</option>
<option value="Option 2" selected>Option 2</option>
<option value="Option 3">Option 3</option>
</select>
</div>
<div>
<label>Multi-select</label>
<select multiple name="multiSelectExample">
<option value="Option 1">Option 1</option>
<option value="Option 2">Option 2</option>
<option value="Option 3">Option 3</option>
</select>
</div>
<div>
<textarea name="textareaExample"></textarea>
</div>
<div>
<label></label><input type="submit">
</div>
</form>
</code></pre>
</section>
