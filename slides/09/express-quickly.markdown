---
layout: slides
title: "Express Quickly"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>
basic app
1. bring in express: `var express = require('express');
2. create app: `var app = express()`;
3. `app.listen()`

handlebars
1. npm install --save hbs
2. `app.set('view engine', 'hbs');`: 
    * sets which templating library to use ("engine extension")
    * http://expressjs.com/en/api.html#app.settings.table
    * A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client
    


1. `req.set` - sets a header
