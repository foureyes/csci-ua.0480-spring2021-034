---
layout: slides
title: "React Basics"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## React

__React__, by itself, is a library for generating the user interface of an application. 

* it's essentially the __view__ in an MVC app
* it provides an API for creating and rendering reusable view components
	* including state management
	* ...and event handling

</section>

<section markdown="block">
## React (Again)

__What did all of that mean?__ What functionality does React actually give us? It's actually pretty similar to what we've been doing with vanilla client side JavaScript:

* manipulate the DOM (well, indirectly, via a _virtual DOM_)
* work with events
* changing the DOM based on _state_

</section>

<section markdown="block">
## Getting Started

We can use jsbin or codepen to learn the React API. 

* for __codepen__: 
	* set __Babel__ as the JavaScript preprocessor
	* add the __react library__ as external JavaScript
	* add the __react DOM library__ as external JavaScript
* for __jsbin__:
	* use __Add Library__ to add react
	* select __JSX (React)__ in the JavaScript drop down

From there, you can use the <code>React</code> object in your JavaScript as __your entry point to the React API__.
</section>

<section markdown="block">
## Render an Element

First... let's try something that should look really familiar. __What do you think this code will do?__ &rarr;

<pre><code data-trim contenteditable>
ReactDOM.render(
    React.createElement('div', {className: 'foo'}, 'Hey... familiar!'), 
	document.body
);
</code></pre>

* {:.fragment} create a div with class="foo"
* {:.fragment} the div will have "Hey... familiar!" as text content
* {:.fragment} ...and the whole div will be _rendered_ into the body (react components are usually rendered into another containing element, not just document.body)
</section>

<section markdown="block">
## A Bit More About createElement and render

<code>React.createElement</code>:

* first parameter... element that you want to create as a string
* second parameter... its attributes (note `className` instead of `class`)
* third parameter... its text content
* it'll return a __ReactElement__ object

<br>
<code>ReactDOM.render</code>

* first parameter... element
* second parameter... insertion point (where to add element as a child)
</section>
<section markdown="block">
## Another Way to Render an Element 

__Let's try this...__ &rarr;

<pre><code data-trim contenteditable>
ReactDOM.render(
	<div className="foo">Um, whut?</div>, 
	document.body
);
</code></pre>
</section>


<section markdown="block">
## Another Way Explained....

__What looks strange about this code?__ &rarr;

<pre><code data-trim contenteditable>
ReactDOM.render(
	<div className="foo">Um, whut?</div>, 
	document.body
);
</code></pre>

It looks like there's an unquoted string of markup in the JavaScript!
{:.fragment}

</section>

<section markdown="block">
## JSX

JSX is an extension to JavaScript syntax that allows _XML-like_ syntax without all of the fussy quoting!

* JSX is not a templating language
* you can think of it as a preprocessor
	* it takes in JavaScript with JSX syntax
	* and _compiles_ JSX to plain vanilla JavaScript 
* you don't _have_ to use JSX with React, but it seems to be a common practice
	
	

</section>

<section markdown="block">
## JSX Continued

So that means... this JSX

<pre><code data-trim contenteditable>
<div className="foo">Um, whut?</div>
</code></pre>

...is equivalent to this vanilla JavaScript

<pre><code data-trim contenteditable>
React.createElement('div', {className: 'foo'}, 'Um, whut?'), 
</code></pre>

They both produce a ReactElement!
</section>

<section markdown="block">
## Why JSX

Er. Didn't we spend half of the semester separating our HTML from JavaScript? __Why is JSX the standard? Did the react devs pull a prank on us?__ &rarr;

* {:.fragment} mainly because it's _familiar_ (no need to remember another API)
* {:.fragment} it _can_ be more concise than using the regular API (less code!)
</section>

<section markdown="block">
## Components

You can bundle elements together into a single component. __Here's an example.__ &rarr;

<pre><code data-trim contenteditable>
var MyComponent = React.createClass({
  render: function() {
    return (
      <div> <h1>A Message</h1>{this.props.message}</div>
    );
  }
});
</code></pre>

<pre><code data-trim contenteditable>
ReactDOM.render(
  <MyComponent message="Hi there!" &#47;>,
  document.getElementById('root');
);
// assuming element with id="root"
</code></pre>
</section>

<section markdown="block">
## Alternatives for Defining Components

__Using shorthand method definitions:__ &rarr;

<pre><code data-trim contenteditable>
const MyComponent = React.createClass({
    render() {
        return(
            <div><h1>A Message</h1>{this.props.message}</div>
        );
    }
});
</code></pre>
</section>

<section markdown="block">
## Using ES6 Classes

You can also use ES6 classes to create components by __extending `React.Component`__ &rarr;

<pre><code data-trim contenteditable>
class MyComponent extends React.Component {
    render() {
        return (
            <div><h1>A Message</h1>{this.props.message}</div>
        );
    }
}
</code></pre>
</section>

<section markdown="block">
## Components and Props

To make a component, use <code>React.createClass</code>, which takes an object as a parameter.

* you must define a render property in the object, and that property should be a function that returns/generates elements
* note that a component variable must start with uppercase
* once you have a component, you can pass it to render using JSX, with the variable name as the tag name
* you can access attributes defined in JSX via __this.props__ in your component
* use curly braces to add the result of a javascript expression into JSX
</section>

<section markdown="block">
## Too Many Greetings

__Let's try to create a component that...__ &rarr;

* displays "hello" some number of times in a div
* however, when creating the component with JSX, you can add an attribute called times that will specify the number of times "hello" should be repeated in the div

<br>
For example... rendering...

<pre><code data-trim contenteditable>
<MyComponent times="5" &#47;>,
</code></pre>

Gives us
<pre><code data-trim contenteditable>
<div>hello hello hello hello hello</div>
</code></pre>
</section>

<section markdown="block">
## Too Many Greetings

<pre><code data-trim contenteditable>
const MyComponent = React.createClass({
  render: function() {
    var text = "";
    for(var i = 0; i < this.props.times; i++) {
      text += "hello ";
    }
    return (
      <div> {text} </div>
    )
  }
});
</code></pre>

<pre><code data-trim contenteditable>
ReactDOM.render(
  <MyComponent times="5" &#47;>,
  document.body
);
</code></pre>

</section>

<section markdown="block">
## A Bit About Looping

__What if we wanted to surround our hello with markup and add a number?__ &rarr;

<pre><code data-trim contenteditable>
const Greeting = React.createClass({
  render: function() {
    const paragraphs = [];
    for(let i = 0; i < this.props.times; i++) {
      paragraphs.push(<p key={i} >hello {i}</p>);
    }
    return (
      <div> {paragraphs} </div>
    );
  }
});
</code></pre>

* it turns out that you can render a list of elements (but depending on react version, you may have to wrap it in a containing single element)
* in the example above, we generate a few paragraph elements
* a render a div that contains all of those elements by dropping the Array in curly braces

</section>


<section markdown="block">
## Multiple React Elements

__If you have multiple elements__ &rarr;

* with react grater than version 16, `render` can return a list of ReactElements directly
* alternatively, you can wrap in react fragment tags: &lt;&gt; and &lt;/&gt;

</section>



<section markdown="block">
## Using Map

__It's also pretty common to use map to generate elements.__ &rarr;

* in the example below...
* map creates an Array of paragraph elements
* that is nested within a div

<br>

<pre><code data-trim contenteditable>
const Greeting = React.createClass({
  render: function() {
    const greetings = ['hi', 'hello', 'hola'];
    const greetingElements = greetings.map((g, i) => {
        <p key={i}>{g}</p>
    });
    return (
      <div>
        {greetingElements}
      </div>
    );
  }
});
</code></pre>

</section>

<section markdown="block">
## Keys

__Hey - did you notice that weird key attribute in both examples in the previous slides?__ &rarr;

<pre><code data-trim contenteditable>
for(let i = 0; i < this.props.times; i++) {
  paragraphs.push(<p key={i} >hello {i}</p>);
}
</code></pre>

<pre><code data-trim contenteditable>
const greetingElements = greetings.map((g, i) => {
    <p key={i}>{g}</p>
});
</code></pre>

When adding an Array of elements, __the `key` _attribute_ should be defined__ so that React can determine DOM changes more easily. Check out the [details on why to use keys] (https://facebook.github.io/react/docs/reconciliation.html#recursing-on-children), and an in-depth article on [Arrays and keys](https://facebook.github.io/react/docs/lists-and-keys.html).
</section>

<section markdown="block">
## Arrays in React Elements 

__When adding an Array of elements to a component, you must keep the following things in mind...__ &rarr; 

1. {:.fragment} when defining render, only one react element can be returned, but you can have multiple elements nested within that initial element
    <pre><code data-trim contenteditable>
return (
    <div>only one element<p>but you can nest!</p></div>
);    
</code></pre>
2. {:.fragment} a common pattern to add an Array of elements is to use map
3. {:.fragment} ...but regardless of which method you use to generate an Array of elements, add a `key` attribute to each element!
4. {:.fragment} (note that wrapping in JSX elements in `[]` and commas or wrapping in `<></>` will work without needing a wrapping element

</section>

<section markdown="block">
## Events

To add an event handler in JSX... add an inline attribute (wait, what!?). For example, click events would be represented by <code>onClick</code>:

<pre><code data-trim contenteditable>
const MyButton = React.createClass({
  onButtonClick: function(evt) {
    alert("OMG! OMG!");
  },

  render: function() {
    return <div onClick={this.onButtonClick}>Press This Button<&#47;div>;
  }
});

ReactDOM.render(
  <MyButton &#47;>,
  document.body
)
</code></pre>
</section>

<section markdown="block">
## Callbacks, ES6 Classes, and this (Again!)

__If you're using ES6 classes and want to use `this` in your click handler, remember to bind to this (or use arrow functions)__ &rarr;

Here's an alert that uses `this.props`:

<pre><code data-trim contenteditable>
onButtonClick(evt) {
  alert(this.props.someProp);
},
</code></pre>

To enable the above code access `this`, though, bind it when you assign the callback function for `onClick`. 

<pre><code data-trim contenteditable>
render() {
    return <div onClick={this.onButtonClick.bind(this)}>Press This Button<&#47;div>;
}
</code></pre>

We'll see more about this later on...

</section>

<section markdown="block">
## Resources

* [React Docs](https://facebook.github.io/react/docs/installation.html)
* [Build with React](http://buildwithreact.com/)
</section>
