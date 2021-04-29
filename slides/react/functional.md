---
layout: slides
title: "Functional Components and Hooks"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Functional Components vs Classes

__So far, we've learned that in order to create components with state, you can use class-based components__ &rarr;

What may be tricky about about functional components and maintaining state?
{:.fragment}

How would state be maintained from one functional call to another? ... we have a couple of options:
{:.fragment}

1. {:.fragment} global variables / variables within scope
2. {:.fragment} closures

</section>

<section markdown="block">
## A Quick Example

__Let's try to prove that we can maintain state between function calls__ &rarr;

1. {:.fragment} our components will simply be functions that return a string of html
2. {:.fragment} we'll mimic a little bit of React's API for maintaining state using functional components: [hooks](https://reactjs.org/docs/hooks-state.html)
3. {:.fragment} rendering our component will simply print to the screen
4. {:.fragment} we're doing this in node, but we'll try using es6 `import` statements rather than `require` (consequently, we'll have to name our files `mjs`

</section>

<section markdown="block">
## A Toy Functional Component

__The following component will increment its state each time it's rendered. It will use a module, `myreact.mjs` to create a component__ &rarr;

```
import MyReact from './myreact.mjs';

function Foo() {
  const [num, setNum] = MyReact.useState(0);
  setNum(num + 1);
  return `<div>${num}</div>`
}
```
{:.fragment}


</section>

<section markdown="block">
## Rendering the Component

__We'll cause the component to be "rendered" twice__ &rarr;

* {:.fragment} this should result in the number being incremented
* {:.fragment} the output should be:
	```
<div>0</div>
<div>1</div>
```

```
MyReact.render(Foo);
MyReact.render(Foo);
```
{:.fragment}
</section>

<section markdown="block">
## Now for Our Version of "React"

__Our version of react will have the ability to use state even though components are functions__ &rarr;

1. {:.fragment} let's add a property that holds state
2. {:.fragment} then we'll define a simple render method
3. {:.fragment} finally, we'll give functions access to the state 

</section>

<section markdown="block">
## A Simple Property for State

__Let's start by creating an object that represents our version of react... and within it, add a property to hold state__ &rarr;

```
const MyReact = {
  _state: null,
}

export default MyReact
```
{:.fragment}
</section>

<section markdown="block">
## Render

__Let's add a render method that simply logs out whatever our functional component returns__ &rarr;


```			
  render(Component) {
    console.log(Component());
  },
```
{:.fragment}

</section>

<section markdown="block">
## useState

__Finally, we'll create a function that gives back__ &rarr;

1. {:.fragment} the current value of the state
2. {:.fragment} a function to set the state

```
  useState(initVal) {
    this._state = this._state || initVal;
    
    const setState = newVal => this._state = newVal;

    return [this._state, setState];
  }
```
{:.fragment}

__And with this, we have a functional component that is able to access state.__
{:.fragment}

{:.fragment}
</section>


<section markdown="block">

## Toy Implementation!

🤖 This goes without saying, but __this is not at all like React's actual implementation, as it allows__ &rarr;

* {:.fragment} multiple state variables
* {:.fragment} batches state updates
* {:.fragment} automatically triggers rerender
* {:.fragment} deals with events, dom etc. ...!
</section>

<section markdown="block">
## Functional Components / Why the Detour? ⑂

__That seemed like a weird detour... what was that about?__ &rarr;

* {:.fragment} functional components on their own don't have state
	* {:.fragment} functional components can have props, though
	* {:.fragment} simply define as parameter: `function MyComponent(props)`
* {:.fragment} instead, you have to use a feature called hooks
</section>

<section markdown="block">
## Hooks

1. `setState`
</section>

<section markdown="block">
## 

</section>

