---
layout: slides
title: Variables and Some Built-In Functions
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

</section>

<section markdown="block">
## Some Definitions

We learned how to produce values from using operators on other values. __We created expressions!__.

* __expression__ - a fragment of code that produces a value
	* not a statement by itself
	* every literal value is an expression - <code>27</code>, <code>"YES!"</code>
* __statement__ - a full instruction/action for the computer
	* in JavaScript __most statements end in a semicolon__ (__;__)
	* the simplest statement is an expression with a semicolon at the end - <code>27;</code>, <code>"YES!";</code>
* __program__ - <span class="fragment"> a sequence of statements that specify to a computer actions to perform</span>
* __function__ - <span class="fragment"> a named sequence of code that can be called by name</span>
* __built-in function__ <span class="fragment"> - a function available in the _global_ namespace that is part of the core language</span>

</section>

<section markdown="block">
## Expressions and Statements Examples


<pre><code data-trim contenteditable>
// Expression (no semicolon), evaluates to 6
1 + 5

// Statement, contains an expression
1 + 5;

// Statement, contains multiple expressions
parseInt("4" + "2");

// Even these are statements:
1;
"hi";
</code></pre>

* Note that loops and if statements are also examples of (of course) __statements__, but they don't end in a semicolon. 
* __Any statements that end with a block (curly braces) are not terminated with a semicolon__.

</section>

<section markdown="block">
## A Quick Note on Functions

__If you declare a function using this (function declaration) syntax:__ &rarr;

<pre><code data-trim contenteditable>
// function declaration, a single statement
function f() {
    // do stuff
}
</code></pre>
{:.fragment}

... you have a single __statement__ (note, no semicolon at the end).
{:.fragment}

However, any statement that:
{:.fragment}

* involves functions 
* but doesn't start with the actual keyword, `function`
* will have a function expression (that is, an expression that evaluates to a function) in it:
{:.fragment}

<br>

<pre><code data-trim contenteditable>
const foo = function bar(bax) {}; // <-- function expression
const qux = function(corge) {}; // <-- function expression
</code></pre>
{:.fragment}
</section>

<section markdown="block" data-background="#440000">
## Soooo... most statements end with a semicolon.

</section>


<section markdown="block">
## Automatic Semicolon Insertion

__JavaScript has a feature that automatically inserts semicolons at the end of statements (Automatic Semicolon Insertion / ASI)__ &rarr;

* {:.fragment} __semicolons__ are actually __optional__ and are placed at the end of statements for you! &#128077;
* {:.fragment} but there are some corner cases where [ASI doesn't work as expected](http://speakingjs.com/es5/ch07.html#automatic_semicolon_insertion) &#128078; (below, ASI inserts a `;` immediately after `return`!)
    <pre><code data-trim contenteditable>
return
{
    name: 'John'
}
</code></pre>
* {:.fragment} as with other _classic_ divisive issues such as tabs vs spaces, there are two very opinionated camps on this:
    1. {:.fragment} __always explicitly include semicolons__ in your code because of the instances where ASI doesn't work
    2. {:.fragment} __never use semicolons__; ASI corner cases are rare and finite
* {:.fragment} just pick one and be consistent (I try to use #1)

</section>
<section markdown="block">
## Functions

__What's a function?__ &rarr;

* a __function__ is a named sequence of statements that perform some useful action.
* it can take inputs, and it can return values, but it doesn't have to do either
* to __call__ (or execute) a function, just call it by name, with parentheses after (with an optional list of commas separated inputs within the parentheses)
* the values passed to a function are called __arguments__
* for example: isNaN(12) is a function call
</section>

<section markdown="block">
## To call a function, use its name followed by parentheses.
</section>

<section markdown="block">
## Built-In Functions

JavaScript comes with a bunch of built in functions (and objects) that are available globally. Here are a couple:

* __parseInt(string, radix)__ - [returns an integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) based on the string and radix
	* always specify radix
	* <code>parseInt("100", 2)</code> &rarr;
	* <code>parseInt("100", 10)</code> &rarr;
* __console.log(obj1 [,obj2 ..., objN])__ - [outputs a message](https://developer.mozilla.org/en-US/docs/Web/API/console.log) (the string representation of obj) to the console (more on objects and methods later)
	* <code>console.log("hi")</code>
	* <code>console.log("hi", "hello")</code>
</section>


<section markdown="block">
## Variables

__variables__ are symbolic names for values. 

* you can use a variable's name wherever you want to use that value.
* to create a variable, start with one of the following keywords:
    * __const__ or __let__ (ES6) ... or __var__
    * followed by a variable name
    * optionally, assign a value to the variable by using `=` and a value or expression
    * of course, you can add a semicolon (or not)

<br>
<pre><code data-trim contenteditable>
const s = 'hello';
let i = 21 * 2;
console.log(s);
console.log(++i);
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## What's in a Name? 

We can create __identifiers__, or variable names, based on these rules:

* start with a __letter__, __underscore (_)__, or __dollar ($)__ 
* following characters can be any of above, and/or __digits (0-9)__
* variable names are __case sensitive__
* __cannot__ be a __reserved word__

<br> Speaking of reserved words....
</section>
<section markdown="block">
## Don't Use Reserved Words as Variable Names


<pre><code data-trim contenteditable>
abstract
boolean break byte
case catch char class const continue
debugger default delete do double
else enum export extends
false final finally float for function
goto
if implements import in instanceof int interface
</code></pre>
<pre><code data-trim contenteditable>
let long
native new null
package private protected public
return
short static super switch synchronized
this throw throws transient true try typeof
var volatile void
while with
</code></pre>
</section>

<section markdown="block">
## Block Scope w/ const or let (ES6) 

Wait, so it looks like there are three ways to declare variables. __What's the difference__? __Let's look at `const` and `let` first__ &rarr;

* {:.fragment} the __scope__ of variables declared with __`const` and `let`__ is the __block that they're contained in__
* {:.fragment} a __block__ is simply the area __between opening and closing curly braces__

<br>
<pre><code data-trim contenteditable>
{
   const s = 'in'; // just need two curly braces to make a block!
}
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
for(let i = 0; i < 10; i++) {
   const s = 'also in'; // for loop body is a block!
}
</code></pre>
{:.fragment}

<pre><code data-trim contenteditable>
function f() {
   const s = 'in too'; // function body is a block!
}
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Block Scope Continued

__Accessing a variable when it's out of scope produces a run-time error (specifically a `ReferenceError`)!__ 

<pre><code data-trim contenteditable>
console.log('out there');
{
   const s = 'in here'; 
}
console.log(s);
</code></pre>

(heeeey... sort of just like Java)

Variables in an outer scope are visible from an inner scope:

<pre><code data-trim contenteditable>
{
    const first = 'out there';
    {
        const full = `${first} in here`;
        console.log(full);
    }
}
</code></pre>
</section>

<section markdown="block">
## Temporal Dead Zone

__This may seem obvious, but accessing a variable declared by `let` or `const` before it's declared will give a syntax error.__ &rarr;

* {:.fragment} for example:
    <pre><code data-trim contenteditable>
console.log(s);
let s = 'after!';
// ReferenceError! s was used before it was declared
</code></pre>
* {:.fragment} the "area"/time between the start of a scope and when a variable is actually declared is called the __Temporal Dead Zone__ (really, [it's true](http://exploringjs.com/es6/ch_variables.html))
* {:.fragment} why does this matter? __`var` does not behave this way!?__ (we'll see this in the slides on hoisting)


</section>

<section markdown="block">
## const vs let

__OK... so what's the difference between `const` and `let` then?__ &rarr;

* {:.fragment} a variable declared with __`const`__ __can't be assigned a different value after it had been declared__
* {:.fragment} `const` reassignment will result in a run-time error (`TypeError`)
    <pre><code data-trim contenteditable>
const dontChangeMe = "I told you so";
dontChangeMe = "why not?";
</code></pre>
* {:.fragment} note, however, that this  __does not__ mean the variable is immutable
* {:.fragment} in fact, if a `const` declared variable __is mutable__, it can still be changed without error
    <pre><code data-trim contenteditable>
const arr = [1, 2, 3];
arr[0] = 'wat? this is ok!?';
console.log(arr);
</code></pre>
* {:.fragment} on the other hand, `let` declared variables can be reassigned
    <pre><code data-trim contenteditable>
let i = 0;
i = i + 2;
console.log(i);
</code></pre>
</section>

<section markdown="block">
## const vs let Continued

__Again, a value cannot be assigned to a `const` declared variable after it's been declared. This implies that...__ &rarr;

* {:.fragment} from mdn: "An initializer for a constant is __required__; that is, you must specify its value in the same statement in which it's declared"
* {:.fragment} or, simply put, __you must assign a value immediately when declaring a variable with `const`__
* {:.fragment} otherwise, you'll get a syntax error:
    <pre><code data-trim contenteditable>
const foo;
foo = 'bar'
// SyntaxError: Missing initializer in const declaration
</code></pre>

</section>

<section markdown="block">
## Default Initial Value

__When you declare a variable without assigning a value to it, it will be initialized to `undefined`__ (this is really only valid for `let` and `var`, of course). &rarr;

For example, the output of this...

<pre><code data-trim contenteditable>
let a;
console.log(a);
</code></pre>

is
{:.fragment}

<pre><code data-trim contenteditable>
undefined
</code></pre>
{:.fragment}


</section>

<section markdown="block">
## Redeclaring Variables with let and const 

__If a variable has already been declared (with `let`, `const`, or `var`)__... &rarr;

* {:.fragment} redeclaring a variable with the same identifier (name) with __`let` and `const`__ will result in a `SyntaxError`
* {:.fragment} for example:
    <pre><code data-trim contenteditable>
let i = 0;
let i = 1;
</code></pre>

</section>


<section markdown="block">
## A Note About Loops

__`let` and `const` behavior in loops__: &rarr;

* {:.fragment} if the loop variable is incremented/decremented, it must be declared as 'let':
    <pre><code data-trim contenteditable>
for(let i = 0; i < 10; i++) { console.log(i); }    
</code></pre>
* {:.fragment} repeatedly creating a variable with `let` or `const` in a loop body does not count as redeclaration (works fine; it's another scope!) 
    <pre><code data-trim contenteditable>
for(let i = 0; i < 10; i++) { 
    const j = i * 2;
    console.log(j);
}    
</code></pre>


</section>
<section markdown="block">
## let / const Examples #1

__What's the output of this code? No output and error are possible__ &rarr;
<pre><code data-trim contenteditable>
if(true) {
    let name = 'Joe';
} else {
    let name = 'Not Joe';
}
console.log(name);
</code></pre>
<pre><code data-trim contenteditable>
ReferenceError: name is not defined
// name is not in scope (name is declared within the if statement)
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## let / const Examples #2

__What's the output of this code? No output and error are possible__ &rarr;
<pre><code data-trim contenteditable>
let name;
if(true) {
    name = 'Joe';
    {
        let full = name + ' Versoza';
        console.log(full);
    }
} else {
    name = 'Not Joe';
}
console.log(full);
</code></pre>
<pre><code data-trim contenteditable>
Joe Versoza
ReferenceError: full is not defined
// name is in scope, so full is Joe Versoza
// but full is not in scope in last line
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## let / const Examples #3

__What's the output of this code? No output and error are possible__ &rarr;
<pre><code data-trim contenteditable>
for(const i = 0; i < 4; i++) {
    console.log(i);
}
</code></pre>
<pre><code data-trim contenteditable>
TypeError
// assignment to constant (i is incremented)
</code></pre>
{:.fragment}
</section>
<section markdown="block">
## var

__`var` creates a variable in function level scope, regardless of where it appears in the function__ 

__What's the output of the following code?__ &rarr;

<pre><code data-trim contenteditable>
function foo() {
    if(true) {
        var bar = 'baz';
    }     
    console.log(bar);
}
foo();
</code></pre>
<pre><code data-trim contenteditable>
baz
</code></pre>
{:.fragment}

* {:.fragment} even though `bar` is in a block, its scope is the entire function!
* {:.fragment} `var` was the only keyword for declaring variables in ES5
* {:.fragment} behavior may seem unexpected if coming from a language with block scope
</section>

<section markdown="block">
## Redeclaring Variables with var

__If a variable has already been declared `var`__... &rarr;

* {:.fragment} redeclaring a variable with `var` again is ok!
* {:.fragment} for example:
    <pre><code data-trim contenteditable>
// no syntax error
var a = 'bar';
var a = 'baz';
</code></pre>
* {:.fragment} redeclaring with `var` but not assigning a value will have no effect on the original value:
    <pre><code data-trim contenteditable>
// no syntax error
var a = 'bar';
var a;
// a is still 'bar'
</code></pre>

</section>

<section markdown="block" data-background="#440000">

## Always use `const`, `let` or `var` when declaring variable names!

Otherwise, you get global variables! This is particularly important when dealing with variable declarations in functions.
</section>


<section markdown="block">
## Let's See This in Action

__How is a variable declared in JavaScript?__ &rarr;

(create a variable called officeHoursRoom and set it equal to the number 423)

<pre><code data-trim contenteditable>
const officeHoursRoom = 423;
</code></pre>
{:.fragment}

* notice the keyword <code>const</code>? 
* also notice that no type needs to be specified!
{:.fragment}

<!--_ -->
</section>

<section markdown="block">
## (Not) Declaring a Variable

__What happens if you don't use `const`, `let` or `var`?__ &rarr;

* {:.fragment} ... you might end up modifying a variable in an outer scope!
* {:.fragment} or inadvertently creating a global variable __ಠ_ಠ__
    <pre><code data-trim contenteditable>
function foo() {
    wat = 'uh oh!';
}
foo();
console.log(wat);
</code></pre>

<br>

__What happens if you don't declare a variable _at all_?__ &rarr;

* {:.fragment} if you use a variable/identifier without ever declaring it (with or without `const`, `let`, or `var`)
* {:.fragment} you get a runtime error: `ReferenceError: variable is not defined`

</section>

<section markdown="block">
## And Speaking of a Look of Disapproval

### (Variable Names)

__What are the rules for a valid identifier (variable name) again?__ &rarr;

* {:.fragment} start with a __letter__, __underscore__ ( `_` ), or __dollar__ ( <code>$</code> )
* {:.fragment} following characters can be any of above, and/or __digits (0-9)__
* {:.fragment} can't use reserved words / keywords
</section>

<section markdown="block">
## Don't Do This, But...

BTW, __Unicode characters are allowed in variable names!!!__ &rarr;


<!--_ -->
<pre><code data-trim contenteditable>
const ಠ_ಠ = "disapproval";
console.log(ಠ_ಠ);
// totally works (O_o !?)
</code></pre>
{:.fragment}

Thanks [Stackoverflow](http://stackoverflow.com/questions/1661197/valid-characters-for-javascript-variable-names/9337047#9337047)! Also, here's more [about that look](http://knowyourmeme.com/memes/%E0%B2%A0_%E0%B2%A0-look-of-disapproval).
{:.fragment}

Oh, and [this is a site that let's you check if a variable name is valid or not.](https://mothereff.in/js-variables)
{:.fragment}

<!--_ -->
</section>

<section markdown="block">
## Another Note on Variables

Because JavaScript is dynamically typed... __variable reassignment (for `let` and `var`, even of different types, is ok__ &rarr;

<pre><code data-trim contenteditable>
let x = 25;
x = "foo";
</code></pre>

Lastly, a quick aside...
{:.fragment}

* {:.fragment} [foo, bar, and baz are metasyntactic variables](http://en.wikipedia.org/wiki/Metasyntactic_variable)
* {:.fragment} apparently there are different metasyntactic variables for different natural languages!
</section>

<section markdown="block">
## Ok... Soooo, When to Use What

__`const` vs `let` vs `var`... There are a few ways to approach this (what do you think):__ &rarr;

1. {:.fragment} __use the appropriate keyword to express your intent__ ... for example, if you know that you want a variable available throughout the function - use `var`, block level scoping - use `const` or `let`
2. {:.fragment} __never use `var`__
    1. {:.fragment} default to using `const`, and only use `let` when you know you need reassignment (like incrementing a loop variable)
    2. {:.fragment} default to using `let` and use `const` to signify a constant

<br>
My preference is default to using `const` (#2, #1), mainly because it seems to be way the community is moving (preventing reassignment may reduce side effects / bugs).
{:.fragment}


</section>
<section markdown="block">
## Definition Time

### (What time is it?)

From {{ site.vars.book_js }}: 

* the __environment__ is the collection of variables and their values that exist at a given time
* when a program starts up, __this environment is not empty__
* it always __contains variables that are part of the language standard__
* for example: 
	* the <code>console</code> object is an available variable from the start of your program!
	* same with _built-in_ functions!
</section>
