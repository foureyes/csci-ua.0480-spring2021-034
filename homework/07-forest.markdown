---
layout: homework
title: CSCI-UA.0480 - Homework #7
---

<div class="panel panel-default">
	<div class="panel-heading">Homework #7</div>
	<div class="panel-body" markdown="block">

# Forest Simulator (Client Side JavaScript) - __Due 11/26 at 11pm__

## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* manipulating the DOM
* setting DOM element attributes
* handling events with addEventListener

### Description

There's a twitter bot that just [tweets emoji forests](https://twitter.com/tiny_forests). As you can see, it basically just creates multiline strings using characters from some set of forest-related emoji. But it makes people happy, so what's the difference? 🤷

A big part of poetry/art/fun with code is curation. You will be making an interface that creates forests similar to the one that this twitter bot generates by using pure clientside javascript where you can curate some parts of the forest, but also allow randomness to generate other parts. The interface will then compute the biodiversity of your forest in realtime using [Simpson's index](https://en.wikipedia.org/wiki/Diversity_index#Simpson_index) so you can see how sickly your forest is as you are generating it.


<img src="../resources/img/hw07-forest-01-main.gif">

### Submission Process

You will be given access to a private repository on GitHub.  The final version of your assignment should be in GitHub

* __Push__ your changes to the homework repository on GitHub.

### Make at Least 4 Commits

* Commit multiple times throughout your development process.
* Make at least 4 separate commits

## Forest Generator Requirements

### __Required Features__

__Use the following markup__

1. Start a new express project that uses express-static.
	* the root directory should contain `package.json`, your eslint config, `.gitignore`, etc.
	* the `src` directory should contain `app.js` (serving on 3000), `public`, etc.
2. (there's no need to create any route handlers for this homework, you can do the whole thing with static files)
3. In your public folder, create an <code>index.html</code> file.
4. Add the following code to your <code>index.html</code>:
    <pre><code data-trim contenteditable>
        &lt;!doctype html&gt;
        &lt;html&gt;

        &lt;head&gt;
            &lt;title&gt;FOREST SIMULATOR&lt;/title&gt;
            &lt;script src="sim.js"&gt;&lt;/script&gt;
            &lt;link rel="stylesheet" href="base.css" type="text/css" media="screen" title="no title" charset="utf-8"&gt;
          &lt;link href="https://fonts.googleapis.com/css?family=Lato|Playfair+Display" rel="stylesheet" &gt;

        &lt;/head&gt;

        &lt;link href="https://fonts.googleapis.com/css?family=Lato|Playfair+Display" rel="stylesheet"&gt;


        &lt;body&gt;
            &lt;div id="content"&gt;
                &lt;h1&gt;FOREST SIMULATOR&lt;/h1&gt;
                &lt;div id="intro"&gt;
                    starting forest (leave empty to randomize):
                    &lt;br /&gt;
                    &lt;textarea id="inputForest" name="inputForest" cols="16" rows="8"&gt;&lt;/textarea&gt;
                    &lt;br /&gt;
                    &lt;button&gt;generate&lt;/button&gt;
                &lt;/div&gt;
                &lt;div id="sim" class="hidden"&gt;
                &lt;/div&gt;
                &lt;div id="pushtray" class="overlay"&gt;
                &lt;/div&gt;
            &lt;/div&gt;&lt;!--close id="content"--&gt;
        &lt;/body&gt;
        &lt;/html&gt;
    </code></pre>
5. __You are not allowed to use any additional markup__; you must generate any additional elements you'll need with JavaScript
6. All of your JavaScript should go in your external JavaScript file.
7. ... and, of course, all of your CSS should go in your external CSS file.

__Only show title screen and form on page load__

* Only show the content in the div with id <code>intro</code>
    * Make sure the overlay div and the sim div are not displayed
    * Hint:
        * Make the appropriate CSS rules
        * Use JavaScript's <code>someElementObj.classList</code>'s <code>add</code>, <code>remove</code>, and <code>contains</code> [to _add and remove_ classes](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) so that you can control which CSS rules are active
* If the user clicks on the button, then start the sim (see next requirement for instructions)
* Here's what the interaction should look like (you won't have any real content on the _next_ page yet, though):
    <br>
    <img src="../resources/img/hw07-forest-02-start.gif">
    <br>

__Pressing "generate" reveals the simulation screen and sets predefined forest lines__

* Use <code>addEventListener</code> to allow the button on the _title screen_ to be pressed
    * It should lead to the next _screen_, which will be contained within the `div` with id, `sim`
    * Check out the [slides on events](../slides/19/events.html#/)
    * Along with mdn's documentation on [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [click](https://developer.mozilla.org/en-US/docs/Web/Events/click), and [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
    * Remember, you'll need to put all of your DOM dependant JavaScript in a <code>DOMContentLoaded</code> listener
    * And, of course, you'll need to add a <code>click</code> event listener for your button
    * <code>document.querySelector</code> will also be very useful - see the [docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or [slides](slides/19/js-css.html)!
    * Create and apply the appropriate classes to get rid of the _title screen_ (do this with styles, there's no need to remove the element) and show the _sim screen_
* Note that there's a form field in the _title screen_ ...
    * This field will allow the player to manually set the emoji forest in the sim (it's kind of like cheating / playing Intelligent Creator, but it's really for making it easier to test)
    * If the player enters a value in this field, then the forest  will be set to the sequence inputted
    * The input should be a multiline string of forest emojis
		* (no commas, just a string with multiple lines of emoji)
		* if it's useful, a string can be broken into an `Array` of characters using the spread operator: `[..."asdf"] // [ 'a', 's', 'd', 'f' ]`)
		* <s>(if it's useful, a string can be broken into an `Array` of characters: `"asdf".split(''); // [ 'a', 's', 'd', 'f' ]`)</s>
    * No validation is required (assume that the user puts in valid input or no input)
    * You can retrieve the user input from the text field by using the `value` property on the form element that contains the user input - [see the mdn docs on value under HTML textarea Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
    * If there's nothing in the field, then forest should be completely random
    * To implement this behavior, see below ...
* Create a function or object that generates an 8x8 forest
    * You'll use this any time a new forest is needed 
    * Again, the emoji forest should initially be random ...
    * However, the function or object should be _configurable_ so that it can draw emojis from the list of emojis entered
    * (Use whatever mechanism you like to do this - perhaps storing the list in a closure or in a property in the function or constructor... or just a plain old global)
    * the function should output an array of 8 strings, where each string is 8 emojis (or spaces) long
* Here's an example of how it may work (again, the sim screen will be blank for now, but when it's implemented, it should function like this):
    <img src="../resources/img/hw07-forest-03-genagain.gif">
    <br>


__Generate DOM elements for the lines of forest, the biodiversity metric, and 3 buttons__

* Create DOM elements to show Simpson's Index
    * use this function
        <pre><code data-trim contenteditable>const simpsonsIndex = forest =>
	1 - Object.entries(
		[...forest.join("")].reduce(
			(counts, emoji) => ({...counts, [emoji]: (counts[emoji] || 0) + 1}),
			{}
		)
	).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
	.reduce((sumLilN,bigN) => sumLilN / (bigN * (bigN - 1)))
</code></pre>
    which takes one argument in the form of an array of emoji strings to output the Simpson's Index biodiversity estimate for the forest at hand

* Create DOM elements to show the 8 rows of forest
    * The elements should start off with no text
    * Hint: you may find it helpful to create a containing element that holds all 8 lines of forest

* Create a button, `generate`
* The generated forest and buttons should look something like this:
    <br>
    <img src="../resources/img/hw07-forest-04-button.gif">

__Selecting rows to pin / save__
* add onclick handlers to all of the rows so that when clicked, it toggles between a _pinned_ and _unpinned_ state
* make sure that the state change is visually reflected somehow, such as with a change in background color (for just that row of the forest)

__Pressing the generate button__

* Add an onclick handler to the generate button so that
    * it finds all of the rows that aren't pinned
    * it replaces the contents of those rows with new randomized forest strings
    * it recalculates and redisplays the Simpson's Index
* Everything together should look like:
    <br>
    <img src="../resources/img/hw07-forest-05-pinned.gif">


__Omnious alerts__

Let's implement push-_like_ notifications for when the biodiversity index drops below 0.7. Or more specifically
1. when `generate` is clicked and calculates a new index, the index should be checked to see if it is higher than 0.7
2. if not, add another div to the #pushtray element

* implement this using plain CSS and/or JavaScript (no JQuery or bootstrap)
* Hint: the overlay should be <code>position:fixed</code> and forced to the right side of the screen
* Hint: the overlay's <code>z-index</code> should be a high number (100?) so that it appears _on top_ of everything else

<img src="../resources/img/hw07-forest-06-alerts.gif">


### Optional Features (Extra Credit)

Implement any of the following features

(10 points) __Restart Sim__

* add a restart button along the bottom of the sim
* the restart button makes the original form show up, and essentially starts from the beginning without refreshing the page

(15 points) __Pin Single Cells__

* Pin single emoji instead of entire row
</div>
</div>



