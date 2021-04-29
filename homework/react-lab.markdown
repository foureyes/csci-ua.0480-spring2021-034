---
layout: homework
title: CSCI-UA.0480 -  React Lab
form_url: https://forms.gle/baTDS8Ey2fm4EoCG7
---


<div class="panel panel-default">
  <div class="panel-heading">React Lab</div>
  <div class="panel-body" markdown="block">

# React Lab - MemorEmoji 

## TODO

## Submission Process

* work in groups of 4 or 5 students
* __submit using [this form]({{page.form_url}})__
* __please take note of your breakout room number__
* __each person on the team should submit their own individual form__


{% comment %}
* once you've submitted:
    * raise your hand to let me know
    * either...
        1. help others with their lab
        2. try the other application!

{% endcomment %}

## Scoring

Total Score


* __+70 points__ attending and submitting _any_ code
* __+15 points__ (Part 2) _reasonable_ amount of code for part 2 present (comment out non-working code if deploying)
* __+10 points__ (Part 3) _reasonable_ amount of code for part 3 present (comment out non-working code if deploying)
* __+5 points__ (Part 1) any (1, 2 or 3) working code deployed on [glitch](glitch.com)

{% comment %}
[codepen.io](https://codepen.io), 
{% endcomment %}

{% comment %}
Extra Credit 

* __+15 points__ (Part 4, extra credit) matching game implemented 
* __+20 points__ (Part 5, extra credit) game over message implemented
{% endcomment %}

## Overview

### Goals / Topics Covered

You'll be using the following concepts:

* React
    * props
    * state
    * events
    * nested components
    * conditional rendering

{% comment %}
    * form elements (extra credits)

{% endcomment %}


### Description

Create a card matching game with React.

{% comment %}
Create a game similar to  __MemorEmoji__ from  Homework 6, but using __React__ instead of plain JavaScript.
{% endcomment %}

## Instructions

### Setup

Start by using `create-react-app` and developing locally. ⚠️ __Choose one person in your group to share their screen as you all code!__ Once you've done one or two parts, try deploying. 

To use `create-react-app` to develop locally:

* [see the instructions from the docs](https://create-react-app.dev/docs/getting-started/)
* 👀 the instructions and reference solution may refer to class-based components; if you're comfortable doing so, you can use functional components + `useState` and `useEffect` hooks

To deploy:

*  remix a react starter boilerplate using [glitch.com](https://glitch.com/edit/#!/remix/starter-react)
* add your code to `app.jsx` and inline your css in `index.html` (see end of instructions for details)

{% comment %}
    * [but also, __if you are having path issues, especially on windows__, see this github ticket](https://github.com/facebookincubator/create-react-app/issues/138#issuecomment-334316575)
{% endcomment %}



{% comment %}
Then deploy using one of the options below:
2. create a new project (pen) in [codepen.io](https://codepen.io)
    * debugging might be difficult
    * ...but your application will already be deployed!
    * to setup, configure babel as your JavaScript pre-processor and add React and ReactDOM Libraries:
        <br>
        ![codepen](../resources/img/codepen.gif)

{% endcomment %}

### Part 1 - Single Card

Create a React component or components so that you can toggle a card from being face down or face up. Note that rather than using css, you can manipulate the DOM directly in your jsx (for example, favor conditionally adding a text node to your JSX rather than setting visibility hidden). 

Lastly, to add a class to a React element, use `className=foo`, where `foo` is is your class name.

<video controls>
    <source src="../resources/video/lab08-1.webm" type="video/webm">
    Sorry, your browser doesn't support embedded videos.
</video>

### Part 2 - Multiple Cards

Instead of just a single component that reacts to clicks, create several that can be clicked. Try to use parent and child components to do this. Clicking on any card toggles it from being face down to face up...or from face up to face down. 

<video controls>
    <source src="../resources/video/lab08-2.webm" type="video/webm">
    Sorry, your browser doesn't support embedded videos.
</video>

### Part 3 - Game

Now... only allow the player to flip two cards at a time. Once they flipped two cards, display a message and a confirmation button to proceed to the next turn. If the two cards flipped are the same, keep them face up. Otherwise, turn the cards back over so that the value is hidden.

<video controls>
    <source src="../resources/video/lab08-3.webm" type="video/webm">
    Sorry, your browser doesn't support embedded videos.
</video>

### Part 4 - Game Over

When the game ends (all of the cards are face up and matched), replace the cards with a message that says: "Game Over"

<video controls>
    <source src="../resources/video/lab08-4.webm" type="video/webm">
    Sorry, your browser doesn't support embedded videos.
</video>


### Deployment

To deploy your app on glitch.com... 

1. use the react starter boilerplate on [glitch.com](https://glitch.com/edit/#!/remix/starter-react)
2. add your code to `app.jsx`
	* __Do not bring in `import` statements__
    * (it's already done at the top of `index.js` with `require`)
    * only add your components and your call to `ReactDOM.render`
	* if you're using hooks like `useState`, prefix with `React` (`React.useState`)
3. add styles easily by adding a `style` tag in `index.html` and writing your css directly there

### Submission

* __Submit using [this form]({{page.form_url}})__

{% comment %}
To deploy your app in codepen.io...

1. configure babel, React and React DOM as shown in the gif above (see Instructions &rarr; setup)
2. copy all of your __components__ over to the js panel (don't include any of the import statements)
3. you may have to change `extends` so that it's `extends React.Component` for each component
4. use ```ReactDom.render``` at the very end to render your main/root component:
    ```ReactDOM.render(<App />, document.body);```

{% endcomment %}
