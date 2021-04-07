---
layout: slides
title: "Managing Callbacks / Promises"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Asynchronous Tasks and Dependencies

Initially, dealing with asynchronous tasks is a bit tricky. A lot of times, you want to run code only __after a task__ completes.

__If you have a task, and you don't know it will finish, how do you ensure that it's done before running other code that's dependent on it?__ &rarr;

* {:.fragment} we've seen a common pattern for tasks that are asynchronous; they expect a callback
* {:.fragment} the callback is fired when the task is finished
* {:.fragment} so we put any code that's dependent on that task within the callback

</section>

<section markdown="block">
## A Long Running Function

__Let's start off by creating a function that will take some amount of time to produce an output__ &rarr;

* name the function `delayedShout`
* it should accept one argument, `s`, the `String` that it will print out
* `delayedShout` will print out `s` as uppercase with exclamation points after ~1 to ~3 seconds
* example: `delayedShout('foo')` will print out `FOO!!!` around 1 to 3 seconds after the initial call

```
function delayedShout(s) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(
    () => {
      const shout = `${s.toUpperCase()}!!!`
      console.log(shout);
    }, 
    delay
  );
}

```
{:.fragment}


</section>

<section markdown="block">
## When Does `delayedShout` Print?

__Based on our implementation of `delayedShout`, what will the following code output?__ &rarr;

```
console.log('before');
delayedShout('foo');
console.log('after');
```
{:.fragment}

```
before
after
FOO!!!
```
{:.fragment}

</section>


<section markdown="block">
## Modify `delayedShout` 

__How can we change our implementation of `delayedShout` so that we are able to do _something_ (like print 'after') when `delayedShout` finishes processing and outputting the string?__ &rarr;

* {:.fragment} add a callback as a parameter
* {:.fragment} call the callback after processing...


```
function delayedShout(s, cb) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(
    () => {
      const shout = `${s.toUpperCase()}!!!`
      console.log(shout);
      cb();
    }, 
    delay
  );
}
```
{:.fragment}


</section>


<section markdown="block">
## Using our new `delayedShout`

__How do we call our new `delayedShout` so that:__

* the string `"after"` is printed ...
* when `delayedShout` finishes processing and outputting the original string
* for example:
	```
before
FOO!!!
after
```

```
console.log('before');
delayedShout('foo', () => console.log('after'));
```
{:.fragment}

</section>

<section markdown="block">
## What About Errors?

This version __waits some time before throwing an error due to length__ &arr;

```
function delayedShout(s, cb) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(
    () => {
      if(s.length == 0) {
        throw 'empty string';
      }
      const shout = `${s.toUpperCase()}!!!`
      console.log(shout);
      cb();
    }, 
    delay
  );
}
```


</section>

<section markdown="block">
## Errors Continued

__Based on our new implementation of `delayedShout`, what will happen if we run the code below?__ &rarr;


Will this print out _something_, nothing, or an error? If it prints out _something_, what will it print out?

```
console.log('before');
try {
  delayedShout('', () => console.log('after'));
} catch(e) {
  console.log(e); 
}
```

We get an error despite the try catch:

* as the callback (which causes the error) gets called later 
* (after the try catch block has been executed)
* but the call to `delayedShout` finishes running  without an error.
{:.fragment}
</section>






<section markdown="block">
## An Example

Assuming we have a function called __get__ that retrieves a url... __we tend to want to do this__ &rarr;

<pre><code data-trim contenteditable>
const data = get(url);
parseResult(data);
</code></pre>

__But if our get is asynchronous, we can't guarantee that get finishes before parseResult is called__ (so callback functions it is) &rarr;

<pre><code data-trim contenteditable>
get(url, function(data) {
  parseResult(data);
});
</code></pre>

</section>
<section markdown="block">
## No Big Deal

Ok. We get asynchronous tasks... and we understand that:

* if code depends on an async task
* put in async task's callback
* and it'll get executed when the task is finished

</section>

<section markdown="block">
## Async Tasks All the Way Down

So... what happens if we have async tasks that are dependent on other async tasks? For example: 

* retrieving a url results in a second url
* which also has to be retrieved... 
* and maybe, in turn, the second url produces a third!

<br>
Let's assume that we have our get function:

* it takes two arguments, a url and a callback
* and the callback has a single parameter, the response data from the request

<br>
__Using our imaginary get function, what would this look like?__ &rarr;

A tiny pyramid. ▲ ▲ ▲ ▲ ▲
{:.fragment}



</section>
<section markdown="block">
## A Tiny Pyramid Made of HTTP Requests

We use a bunch of nested callbacks... (the pyramid is the white space to the left).

<pre><code data-trim contenteditable>
get(url, function(data) {
  const urlTwo = parseResult(data);
  get(urlTwo, function(data) {
    const urlThree = parseResult(data);
    get(urlThree, function(data) {
      console.log("Aaaand we're done");
    });
  });
});
</code></pre>
</section>

<section markdown="block">
## Let's Actually Try This

__Create 3 json files that each have an object with a `url` property holding the url of another json file. Then retrieve these files one by one...__ &rarr;

1. Create an express app to serve up our files...
2. Create a bunch of json files in a directory called <code>data</code> within <code>public</code>
	* <code>tango.json</code>: <code>{ "url":"http://localhost:3000/data/uniform.json" }</code>
	* <code>uniform.json</code>: <code>{ "url":"http://localhost:3000/data/victor.json" }</code>
	* <code>victor.json</code>: <code>{}</code>
3. Create a page that uses external JavaScript that...
4. Uses XMLHttpRequest to pull retrieve <code>tango.json</code>
5. Extract the url, and retrieve it... and do the same for the third url...

</section>

<section markdown="block">
## This is Going to be Ugly

Oh hello scrollbars. This won't even fit on this slide.

<pre><code data-trim contenteditable>
const url = 'http://localhost:3000/data/tango.json';
req1 = new XMLHttpRequest();
req1.open('GET', url, true);
req1.addEventListener('load', function() {
  console.log('loading req1');
  if(req1.status >= 200 && req1.status < 400) {
    console.log(req1.responseText);
    const data1 = JSON.parse(req1.responseText) 
    console.log(data1.url);
    req2 = new XMLHttpRequest();
    req2.open('GET', data1.url, true);
    req2.addEventListener('load', function() {
      console.log('loading req2');
      if(req2.status >= 200 && req2.status < 400) {
        console.log(req2.responseText);
        const data2 = JSON.parse(req2.responseText) 
        console.log(data2.url);
        req3 = new XMLHttpRequest();
        req3.open('GET', data2.url, true);
        req3.addEventListener('load', function() {
          console.log('loading req3');
          if(req3.status >= 200 && req3.status < 400) {
            console.log(req3.responseText);
            console.log('done');  
          }
        });
        req3.send();
      }
    });
    req2.send();
  }
});
req1.send();
</code></pre>
</section>


<section markdown="block">
## Obviously, That Was Terrible

Oof. Apologies for making your eyes bleed. 

* So much nesting. 
* Such repetition! 
* __What can we do to tame this a bit?__ &rarr;
	* {:.fragment} hey... maybe stop using so many anonymous functions (start naming _those things_)
	* {:.fragment} and/or wrap up URL retrieval and data extraction into separate functions
	* {:.fragment} <code>get(url, cb)</code>
	* {:.fragment} <code>extractURL(json)</code>
</section>

<section markdown="block">
## get

So... this function will retrieve a url, and when it gets a response, it'll call the callback with the response text.

<pre><code data-trim contenteditable>
function get(url, cb) {
  console.log('getting ', url);
  req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.addEventListener('load', function() {
    console.log('loading req');
    if(req.status >= 200 && req.status < 400) {
      console.log(req.responseText);
      cb(req.responseText);
    }
  });
  req.send();
}
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## extractURL...

This one's simple
<pre><code data-trim contenteditable>
function extractURL(json) {
  const data = JSON.parse(json) 
  console.log(data.url);
  return data.url;
}
</code></pre>
</section>

<section markdown="block">
## Voila (Using get and extractURL)

Ah. Much nicer. 

<pre><code data-trim contenteditable>
const url = 'http://localhost:3000/data/tango.json';

get(url, function(responseText) {
  const url2 = extractURL(responseText); 
  get(url2, function(responseText) {
    const url3 = extractURL(responseText); 
    get(url3, function(responseText) {
      console.log('done'); 
    });
  });
});
</code></pre>

We still get a tiny pyramid, though. To get around that, we can:

* for this example only (since it's doing the same thing for each), encapsulate each level of nesting in a single function
* use _Promises_
</section>
<section markdown="block">
## One More Function

Getting and extracting were repeated 3 times. Why don't we just __wrap this in another function__? &rarr;

(this only works because we're doing the __same exact thing__ in each level of callback nesting).
{:.fragment}

<pre><code data-trim contenteditable>
function getAndExtract(url) {
  get(url, function(responseText) {
    const url = extractURL(responseText); 
    if(url) {
      getAndExtract(url);
    } else {
      console.log('done'); 
    }
  });
}
getAndExtract(url);
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Promises

So, an alternate way to deal with this is to __use an API that allows to code as if we were dealing with simple, sequential operations__.

One of these APIs, __Promise__, is in ES6 and is actually [already available on a lot of browsers](http://caniuse.com/#feat=promises)

A __Promise__ is an object that __represents an asynchronous action__ - some operation that may or may not have been completed yet.

For example, a Promise may represent:

* retrieving data from a database can be a promise
* writing to a file
* making an http request
</section>

<section markdown="block">
## A Promise Object Continued

__Again, a Promise is an object that represents an async task__ &rarr;

Consequently, a Promise can be in one of the following states:

1. pending - the task hasn't been completed yet (still getting a url, reading a file, etc.)
2. fulfilled - the task has completed successfully
3. rejected - the task did not complete successfully (error state)


</section>

<section markdown="block">
## Creating a Promise

__To create a <code>Promise</code> use the <code>Promise</code> constructor:__ &rarr;

* it has one parameter, a function called the `executor`
* the executor function is going to do some async stuff
* it is executed __immediately__, even before the constructor returns!
* the executor has two parameters:
	* a function to call if the task succeeded (`fulfill`)
	* a function to call if the task failed (`reject`)
	* both of these functions have a single argument 

<pre><code data-trim contenteditable>
const p = new Promise(function(fulfill, reject) {
  // do something async
  if(asyncTaskCompletedSuccessfully) {
	fulfill('Success!');
  } else {
	reject('Failure!');
  }
});
</code></pre>
</section>

<section markdown="block">
## Promise Objects Methods

__Promise objects have a couple of methods that allow the `fulfill` and `reject` arguments of the `executor` function to be set:__ &rarr;

* {:.fragment} `then(fulfill, reject)` - sets both the `fulfill` and `reject` functions
* {:.fragment} `catch(reject)`- only sets the `reject` function
</section>

<section markdown="block">
## Then and Success / Fulfill

__`then` can represent the next step to execute when a `Promise` completes (either successfully or fails).__ &rarr;

* it accepts a couple of callbacks as parameters... 
    * the thing to do if our Promise was _resolved_ or _successful_
    * the thing to do if our Promise was _rejected_ or _unsuccessful_
* these callbacks have a single parameter
	* the value that was passed into the original succeed or reject function call in the original Promise
    * think of these as the succeed and fail in the original promise

</section>

<section markdown="block">
## An Immediately Fulfilled Promise

Let's take a look at how `then` works: 

* start with a Promise that immediately is fulfilled 
* (it's as if the async task finished instantly)

<br>

__What is the output of this code, if any?__ &rarr;

<pre><code data-trim contenteditable>
const p = new Promise(function(fulfill, reject) {
  fulfill('Success!');
});
p.then(function(val) {
  console.log(val);
})
</code></pre>

<pre><code data-trim contenteditable>
Success!
</code></pre>

</section>

<section markdown="block">
## Immediately Fulfilled Continued

__Let's take a closer look at what's happening here:__ &rarr;

<pre><code data-trim contenteditable>
const p = new Promise(function(fulfill, reject) {
  fulfill('Success!');
});
p.then(function(val) {
  console.log(val);
})
</code></pre>

* The first argument to `then` is a function that takes a single argument and logs out that argument
* Using `then` sets `fulfill` to the function above, so calling `fulfill` results in logging out the value
* In fact any function that takes a single argument would work as the first argument to `then`
* This would result in the same output:

<br>

<pre><code data-trim contenteditable>
p.then(console.log);
</code></pre>
</section>

<section markdown="block">
## When is Fulfill or Reject Executed?

__The functions passed to `then` are guaranteed to be executed AFTER the Promise is created.__ &rarr;

This is true even if it looks like `fulfill` is called immediately and before `then` is called!. __What's the output of this code?__ &rarr;

<pre><code data-trim contenteditable>
const p1 = new Promise(function(fulfill, reject) {
    console.log('begin');
    fulfill('succeeded');
    console.log('end');
});
p1.then(console.log);
</code></pre>

<pre><code data-trim contenteditable>
begin
end
succeeded
// the fulfill function, console.log, is
// guaranteed to be called after the Promise 
// is created even though it looks like fulfill 
// is called between logging begin and end!
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## `then`'s Second Argument

__To specify what happens when a Promise results in an error or if the async task fails, use `then`'s 2nd argument.__ &rarr;

<pre><code data-trim contenteditable>
const p = new Promise(function(fulfill, reject) {
    reject('did not work!');
});

p.then(console.log, function(val) {
    console.log('ERROR', val);
});
</code></pre>

The code above results in the following output ...

<pre><code data-trim contenteditable>
ERROR did not work!
</code></pre>
</section>

<section markdown="block">
## `catch`

__You can also use the method `catch` to specify the `reject` function.__ &rarr; 

<pre><code data-trim contenteditable>
const p = new Promise(function(fulfill, reject) {
    reject('did not work!');
});

p.catch(function(val) {
    console.log('ERROR', val);
});
</code></pre>

</section>

<section markdown="block">
## Back to Then! 

__`then` always returns a Promise__ &rarr;

* if the `fulfill` function returns a `Promise`, `then` will return that `Promise`
* if the `fulfill` function returns a value, `then` will return a `Promise` that immediately fulfills with the return value

<br>
That sounds convoluted... __Let's see some examples.__ &rarr;

</section>

<section markdown="block">
## `then` return Value

Starting with a `Promise`...

<pre><code data-trim contenteditable>
const p1 = new Promise(function(fulfill, reject) {
    fulfill(1);
});
</code></pre>

The `fulfill` function passed to `then` returns a `Promise`, so `then` returns that same `Promise` object (which is assigned to `p2`)

<pre><code data-trim contenteditable>
const p2 = p1.then(function(val) {
    console.log(val);
    return new Promise(function(fulfill, reject) {
        fulfill(val + 1);    
    });
});
</code></pre>

Because `p2` is another `Promise`, we can call `then` on that too.

<pre><code data-trim contenteditable>
p2.then(console.log);
</code></pre>

__So the resulting output is...__ &rarr;

<pre><code data-trim contenteditable>
1
2
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Fulfill not Returning a Promise?

__Let's make a minor modification to the code in the previous slide. Again, start with a Promise...__ &rarr;

<pre><code data-trim contenteditable>
const p1 = new Promise(function(fulfill, reject) {
    fulfill(1);
});
</code></pre>

This time, though, instead of `fulfill` returning a `Promise`, it'll return a regular value.

<pre><code data-trim contenteditable>
const p2 = p1.then(function(val) {
    console.log(val);
    return val + 1;    
});
</code></pre>

Again, let's try calling `then` on `p2` (but is `p2` a `Promise`... or will an error occur!?)

<pre><code data-trim contenteditable>
p2.then(console.log);
</code></pre>

`p2` is still a `Promise`
{:.fragment}

</section>

<section markdown="block">
## Wrapping a Value in a Promise

__If `fulfill` returns a non-Promise, `then` will return a `Promise` that immediately calls fulfill with the value that was returned.__ &rarr;

Consequently, the following two code samples return the same `Promise` for `p2`:

<pre><code data-trim contenteditable>
const p2 = p1.then(function(val) {
    console.log(val);
    return new Promise(function(fulfill, reject) {
        fulfill(val + 1);    
    });
});
</code></pre>

<pre><code data-trim contenteditable>
const p2 = p1.then(function(val) {
    console.log(val);
    return val + 1;    
});
</code></pre>

</section>

<section markdown="block">
## Promises with AJAX

__So maybe our version of `get` will now just give back a Promise to wrap the async code.__ &rarr;

<pre><code data-trim contenteditable>
function get(url) {
  return new Promise(function(fulfill, reject) { 
    console.log('getting ', url);
    req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        fulfill(req.responseText);
      } else {
        reject('got bad status code ' + req.status); 
      }
    });
    // also reject for error event listener!
    req.send();
  });
}
</code></pre>
</section>

<section markdown="block">
## Keeping Our Extract Function...

<pre><code data-trim contenteditable>
function extractURL(json) {
  const data = JSON.parse(json) 
  console.log(data.url);
  return data.url;
}
</code></pre>
</section>

<section markdown="block">
## We Can Make Async Look Sequential

<pre><code data-trim contenteditable>
const url = 'http://localhost:3000/data/tango.json';

get(url)
  .then(extractURL)
  .then(get)
  .then(extractURL)
  .then(get)
  .then(extractURL)
  .then(function(val){
    console.log(val);
    console.log('done');
  });
</code></pre>
</section>

<section markdown="block">
## Things We Pretended Didn't Exist

So, promises are kind of complicated, but in the end, they do simplify things. Some things that we didn't cover that further show the power of using the Promise API are:

* error handling 
* having code trigger only when multiple async tasks are finished (rather than just one)
</section>

<section markdown="block">
## Promises Look Hard! / Fetch

Using `Promise`s seemed to complicate AJAX rather than make it easier. 

It's certainly tricky manually wrapping async tasks with Promises, but:

* __fortunately for us, we'll mostly encounter Promises as the result of using some built-in functions in JavaScript, like fetch__ &rarr;
* the [`fetch` api](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) provides a global function `fetch` that allows the retrieval of a url
* but wraps the result of that retrieval in a Promise:

<br>
<pre><code data-trim contenteditable>
fetch(url)
  .then(function(response) { return response.text(); })
  .then(handleResponse)
</code></pre>

</section>

<section markdown="block">
## Fetch API Details

__The Fetch API offers a `Request` and `Response` object, as well as a global `fetch` function__ &rarr;


The `fetch` function:

* {:.fragment} takes one argument, a `url`
* {:.fragment} it returns a promise
* {:.fragment} the promise is resolved with `Response` object


<pre><code data-trim contenteditable>
fetch('http://foo.bar.baz/qux.json')   
	.then(function(response) {
		# Response object!
		return response.json();
	})
	.then(function(data) {
		console.log(JSON.stringify(data));
	});
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Response Object

__The `Response` object has a few methods and properties__ &rarr;

* `status`
* `headers`
* `json()` - response body __parsed__ json
* `text()` - response body
</section>


<section markdown="block">
## fetch and Config

__A `fetch` call can be configured by passing in an object as the second argument__ &rarr;

<pre><code data-trim contenteditable>
// example of options for a POST
{         
	method: "POST", 
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	body: 'foo=bar'
}
</code></pre>

Check out [mdn's Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for more detailed examples.
</section>














