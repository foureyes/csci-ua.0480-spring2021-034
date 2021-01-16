---
layout: slides
title: ""
---


<section markdown="block">
## Integrating with Express 

(Without Codepen / JSbin / Glitch / create-react-app) Sooo... how do you think we could serve up our small React client side examples through Express? __What would we minimally need to do to even start a React app?__ &rarr;

* {:.fragment} include the react library in our client side code
* {:.fragment} _serve_ any of the components that we create 
</section>

<section markdown="block">
## Integrating With Express Continued

This would normally be a straightforward task:

1. just serve up our client side JavaScript from the public/javascripts directory using express static
2. do the same with the react library... 
	* download it or use some sort of client side package manager like bower... and, again, serve it from our public/javascripts folder 
	* or just include the file from someone else that's hosting it (like a [content delivery network / cdn](https://cdnjs.com/libraries/react)... [or from facebook](https://facebook.github.io/react/downloads.html))
</section>

<section markdown="block">
## Some Setup

1. create an Express app
2. create an html file in <code>public</code>
3. include the appropriate scripts... using the examples for setting up a dev version of a react app [from facebook](https://facebook.github.io/react/downloads.html):

<pre><code data-trim contenteditable>
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
</code></pre>


</section>

<section markdown="block">
## Create and Mount a Test Component

Markup

<pre><code data-trim contenteditable>
&#x9;&#x3C;div id=&#x22;app&#x22;&#x3E; &#x3C;/div&#x3E;
</code></pre>

Component

<pre><code data-trim contenteditable>
class MyComponent extends React.Component{
&#x9;render() {
&#x9;&#x9;return React.createElement(&#x27;h1&#x27;, {}, &#x27;hello&#x27;);
&#x9;}
}

ReactDOM.render(
&#x9;React.createElement(MyComponent),
&#x9;document.getElementById(&#x27;app&#x27;)
);
</code></pre>

</section>

<section markdown="block">
## Easy, Right?

Hey... wait, I thought we used JSX with react. Let's change our code...

<pre><code data-trim contenteditable>
class MyComponent extends React.Component({
&#x9;render() {
&#x9;&#x9;return (
&#x9;&#x9;&#x9;&#x3C;h1&#x3E;Hello&#x3C;/h1&#x3E;
&#x9;&#x9;);
&#x9;}
}

ReactDOM.render(
&#x9;&#x3C;MyComponent /&#x3E;
&#x9;document.getElementById(&#x27;app&#x27;)
);
</code></pre>

__Let's see what happens__ &rarr;
</section>

<section markdown="block">
## Sad Face

<pre><code data-trim contenteditable>
Uncaught SyntaxError: Unexpected token &lt;
</code></pre>

This _is_ valid JSX, right? It works on Glitch and Codepen... __so what do you think happened here__? &rarr;

* {:.fragment} Hmmm... looks like our browser doesn't understand JSX!
* {:.fragment} We need to somehow compile it...
</section>

<section markdown="block">
## Babel

[Babel](https://babeljs.io/) is a set of tools that allows you to use __new JavaScript__ syntax, now, __even if browsers don't support it yet__!!! YES. THE FUTURE IS NOW!

* it transforms syntax from ES6/ES2015, ES2016, ES2017, etc. to plain ol' ES5... 
* ...so that you can write ES6 without having to wait for full browser support 🙌
* ...and, of course, __it'll compile JSX to plain JavaScript__
</section>

<section markdown="block">
## How About In-Browser?

__So when/where do we use a transformer, like babel?__ &rarr;

Things would be pretty easy if we could just use babel or some other transformer by including some client side JavaScript?
{:.fragment}

* {:.fragment} our client side JavaScript will include a JSX transformer script / library
* {:.fragment} which means that compilation of JSX into JavaScript will happen in the user's browser
* {:.fragment} so... it seems like we just find this thing, and magically, JSX will work in our browser, right?

</section>

<section markdown="block">
## But Wait

So... all signs point to the fact that compiling in browser is a bad idea, (sigh, yes, it is).

* [facebook says so (don't use JSX-Transformer)](https://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html)
* [_this_ project exists (babel-standalone)and is folded into babel, but it lists out very specific use cases](https://github.com/Daniel15/babel-standalone)
	* [react's docs suggest this](https://reactjs.org/docs/try-react.html)
	* but it also says...  _don’t use it in production_

<br> 

There's probably a reason why everyone says avoid in-browser transform... __why__ &rarr;
{:.fragment}

* {:.fragment} facebook docs say "(the JSX transformer) is fairly large and results in extraneous computation client-side that can be avoided - do not use it in production"
* {:.fragment} we really only want to transform once (not once per client!)
* {:.fragment} why transform on the client for every user (slowing down the user experience), when we can just transform once on the server by precompiling before deploy!?

</section>


<section markdown="block">
## Ohhh Kaaay. So Now What?


__So here's where things get kind of complicated. We'll need:__ &rarr;

* __babel__ to do the processing
* __and some tool to find the files that need processing__, and apply the transformation to those files
* __why do you think we need a separate tool for this - why can't we just compile our one js file and call it a day?__ &rarr;
* {:.fragment} your file may have dependencies which may also need to be compiled
* {:.fragment} dependencies can get complicated really fast, even for small projects

</section>

<section markdown="block">
## Enter Webpack

This is where __webpack__ comes in. Webpack will do two things for us:

1. it'll investigate our app using some __entry point__ JavaScript file that we specify... and figure out all of that file's dependencies
	* for example, we may have a client side JavaScript file, client.js, that depends on React and socket.io
2. then, it'll use additional libraries (__loaders__ to __run some processes__) based on the extension of each dependency
	* for example, for all of our js files, it may compile any jsx syntax into regular JavaScript
	* there's a __loader__ that integrates __babel__ into the webpack workflow

<br />
Note that there's some intersection in functionality among __webpack__, __grunt__, and __gulp__ (for example, they can all be used to concatenate files)
</section>


<section markdown="block">
## webpack vs grunt and gulp

So __grunt__ and __gulp__ are build tools. That is, you specify some tasks, and they'll run them automatically. For example, you want your build tools to:

* minify your client side JavaScript and CSS
* concatenate all of those files
* even run your JSX transformations!

<br>

And... this will all be done without having to run separate commands. However, grunt and gulp are focused on files, while webpack is focused on a _project_. __What does that exactly mean...__ &rarr; 
</section>


<section markdown="block">
## Webpack and Dependencies

__Webpack requires that you specify a single entry point to your application.__

* typically, this is a single js file like <code>main.js</code> or <code>client.js</code>
* then, it'll figure out what that file depends on by <code>require</code> statements (or import statements for ES6 syntax!)... 
* this will also work for assets like urls in CSS or hrefs in image tags!

<br>
It'll take all of these dependencies and output them as static assets based on your configuration.

</section>
<section markdown="block">
## Setting up Express with Webpack

Assuming we have a barebones Express app, the [webpack docs](https://webpack.js.org/guides/getting-started/) recommend installing the following (the commandline script and the library):


<pre><code data-trim contenteditable>
npm install --save-dev webpack webpack-cli
</code></pre>

This gives us a commandline tool, __webpack__ (of course), that we'll use to bundle our JavaScript...

<pre><code data-trim contenteditable>
npx webpack --help
</code></pre>
</section>

<section markdown="block">
## babel and webpack

Of course, we'll also need to integrate babel into the mix - that was the whole point. We'll want to install the following libraries:

* {:.fragment} <code>babel-core</code> -  babel itself
* {:.fragment} <code>babel-loader</code> - webpack plugin for babel
* {:.fragment} [<code>babel-preset-react</code>](https://babeljs.io/docs/plugins/preset-react/) - a bunch of plugins for babel that are useful for react apps (most notably, JSX transform)

<br>
Install all of these with <code>--save-dev</code> since they're for building our project (not actual libraries that the app depends on).
{:.fragment}

You may be asked to install a specific version of `babel-loader` later on (for example `babel-loader@7`.
</section>

<section markdown="block">
## webpack Everything

Since we're using webpack (which relies on <code>require</code>s), we'll download local versions of React rather than relying on a hosted / CDN version.

We can install with npm... remember to use <code>--save</code>)

<pre><code data-trim contenteditable>
react
react-dom
</code></pre>

</section>

<section markdown="block">
## Setting up our App for webpack

__Let's modify where we place our code so that we can use webpack.__ &rarr;

1. Move our code to external JavaScript 
2. Perhaps separate out our __component__, and the __initial mounting of the component__
3. Designate one of those files as the __entry point__ ...
4. Add <code>require</code>s so that webpack knows what to put together

<pre><code data-trim contenteditable>
PROJECT_DIR 
|
+-webpack.config.js // config options for webpack
|
+-client.js // entry point into our client side code
|
+-components
  |
  +-MyComponent.js // a single react component
</code></pre>
</section>

<section markdown="block">
## Our Bare Bones Page

So... let's get rid of that inline JavaScript... 

* __and assume that we'll have a single js file available to us once webpack is done generating assets for us.__ &rarr;
* (<code>bundle.js</code>) __doesn't exist yet__!

<pre><code data-trim contenteditable>
&#x3C;div id=&#x22;app&#x22;&#x3E;
&#x3C;/div&#x3E;
&#x3C;script src=&#x22;javascripts/bundle.js&#x22;&#x3E;&#x3C;/script&#x3E;
</code></pre>

Of course, we'll have to remember to __tell webpack that our output should be <code>javascripts/bundle.js</code>__.
</section>

<section markdown="block">
## Move the Component into a Separate File

Create a directory in our project folder that will contain all of our components. Drop our <code>MyComponent</code> code there. Remember to export it... to make it available when using <code>require</code>.

In <code>components/MyComponent.js</code>:

<pre><code data-trim contenteditable>
const React = require(&#x27;react&#x27;);
class MyComponent extends React.Component {
&#x9;render() {
&#x9;&#x9;return (
&#x9;&#x9;&#x9;&#x3C;h1&#x3E;Hello&#x3C;/h1&#x3E;
&#x9;&#x9;);
&#x9;}
}
module.exports = MyComponent;
</code></pre>

</section>
<section markdown="block">
## Our Entry Point

Our entry point will just be a file in the project directory called <code>client.js</code>. __Within it, we can mount the component that we created to our DOM.__ &rarr;

* `require` the React libraries
* `require` our component

<pre><code data-trim contenteditable>
const React = require(&#x27;react&#x27;);
const ReactDOM = require(&#x27;react-dom&#x27;);
const MyComponent = require(&#x27;./components/MyComponent&#x27;);
ReactDOM.render(&#x3C;MyComponent /&#x3E;, document.getElementById(&#x27;app&#x27;));

</code></pre>

</section>
<section markdown="block">
## Webpack Configuration

The webpack configuration file is called <code>webpack.config.js</code>. This will be in the root of your project directory.

<pre><code data-trim contenteditable>
const path = require('path');
module.exports = {
  mode: 'development' // or production
  // configure the entry point
  // where to output the bundle of static assets
  // and configure the plugins / modules that we'll use
};
</code></pre>

This is the _entry point_ into our client side web app... (anything that this file requires will be bundled by webpack)

<pre><code data-trim contenteditable>
  entry: './client.js',
</code></pre>
</section>

<section markdown="block">
## webpack Configuration Continued

Specify where the resulting JavaScript file should go... (<code>javascripts/bundle.js</code>)

<pre><code data-trim contenteditable>
  output: {
    path: path.join(__dirname, '/public', 'javascripts'),
    filename: 'bundle.js',
    publicPath:'/javascripts'
  },
</code></pre>

<br>

* <code>path</code> - where on the file system we're writing to 
* <code>filename</code> - name of resulting .js file
* <code>publicPath</code> - the path where you're serving this file from (<code>http://localhost:3000/javascripts <-- /javascripts</code>)

</section>

<section markdown="block">
## Webpack / Babel Configs

__Specify our loaders (the transformations we'll be using...)__ &rarr;

* this means... use babel for the transformation
* and the default configuration will be react specific (for example, transpile JSX)

<br>

<pre><code data-trim contenteditable>
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /"app.js/],
        loader: "babel-loader",
        options: {
          presets: ["react"]
        }
      }
    ]
  },
</code></pre>
</section>

<section markdown="block">
## Whew. Finally

In the root of your project folder, just run webpack... aaand hopefully we'll find a new <code>js</code> file in <code>public/javascripts</code>

__Running webpack:__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
npx webpack
# magic
</code></pre>
{:.fragment}

__Checking if it created bundle.js:__ &rarr;
{:.fragment}

<pre><code data-trim contenteditable>
ls public/javascripts
# hopefully bundle.js
</code></pre>
{:.fragment}



</section>

<section markdown="block">
## Let's Try Changing Our Component

Ok... instead of hello, we'll change the text in our component. __Let's see the output. What happened?__ &rarr;

* {:.fragment} nothing changed! __why__ &rarr;
* {:.fragment} probably because <code>bundle.js</code> is still the same... __what do we have to do?__ &rarr;
	* {:.fragment} ugh... we have to recompile with <code>webpack</code>
	* {:.fragment} (wait, what? are we working with C or Java, here... I thought this was JavaScript!?)

</section>

<section markdown="block">
## Automatically Rebuilding on Change

Soooo... there are a lot of ways to automatically refresh the contents of <code>bundle.js</code>. We're going to use one that:

* skips the _actual_ compilation to a file on disk
* and... instead, creates an in-memory version on file change
* and intercepts requests to the file using middleware (so that it picks up the in memory version rather than the one on the file system)

</section>

<section markdown="block">
## Webpack Dev Middleware

We'll use <code>webpack-dev-middleware</code> to do this.

* [__webpack-dev-middleware__](https://github.com/webpack/webpack-dev-middleware) is express middleware that serves the files created from webpack
* however, instead of writing the files to disk, __it just stores the file in memory__
* by default, it'll monitor the file system for changes, and if it does, it __automatically rebuilds the in-memory JavaScript bundle__

<br>

Install via npm...

<pre><code data-trim contenteditable>
npm install --save-dev webpack-dev-middleware
</code></pre>
</section>

<section markdown="block">
## Integrating Webpack Dev

In <code>app.js</code> add the code below __before the express static middleware__. 

<pre><code data-trim contenteditable>
if(process.env.NODE_ENV === 'development') { 
    // configure webpack-dev-middlware with our original webpack config
    // then... "use" webpack-dev-middleware

    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require('./webpack.config.js')
    const webpack = require("webpack");
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        publicPath:'/javascripts'
    }));
}
</code></pre>
</section>

<section markdown="block">
## Webpack Dev Notes 

__A few things about the webpack-dev-middleware integration...__ &rarr;

* notice that we're essentially just reading our _plain ol'_ webpack configuration
* <code>publicPath</code> is the path in the url 
    * (so <code>localhost:3000/javascripts</code> <-- <code>/javascripts</code>)
    * should match what's in <code>webpack.config.js</code>
* you can see it rebuild the javascript bundle on your server's output
* we can even delete <code>bundle.js</code>, and we'll see that it all works out fine (since the in-memory version is being used)!
* as mentioned previously, __put this before the express static middleware__
    * otherwise... you'll _have_ to delete <code>bundle.js</code>
</section>

<section markdown="block">
## Dev Means Dev

The example code is only active when there's an environment variable called <code>NODE_ENV</code> present and equal to <code>'development'</code>:

* <code>if(<code>process.env.NODE_ENV === 'development') { ... }</code>)</code>
* which means... only run the webpack dev middleware when we're in development, not production
* in production we should build the javascript once only, and serve the _compiled_ files
* sooo ... this means __to start with the middelware enabled__, we _must_ use <code>NODE_ENV=development nodemon bin/www</code>
</section>
