---
layout: slides
title: "About Class #3"
---
<section markdown="block" class="intro-slide">
# {{ page.title | escape_xhtml }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Today's Topics

* finish out __functions__ (closures, optional arguments, hoisting)
* a _very quick_ intro to __Node.js__, __NPM__, and __debugging__
* a _primer_ on __Git__ and __GitHub__
* __objects__ and __arrays__
* homework clarifications

</section>

<section markdown="block">
## Assignment #01

* if git clone doesn't work, use init workflow
* name the files and function exactly as specified
* commandline arguments: <code>process.argv[2]</code>

</section>

<section markdown="block">
## Wrapper Objects

__This was actually in this week's set of slides =P__

* so... yes, they have different methods... buuuut
* used when using a number, string, boolean _like_ an object (a new wrapper is created and discarded!?)
</section>

<section markdown="block">
## About Types (Again)
* also... embarrassingly, there's a correction for types
    * typeof behaves kind of strangely
    * _actual_ types in specification does not include function (it's just an object!), and adds null a distinct type from object
    * (both of which contradict <code>typeof</code>'s behavior)
    * I'll accept either...
* [specs for types](http://www.ecma-international.org/ecma-262/5.1/#sec-8) (but why? <code>typeof</code> does...)
* [specs for typeof](http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3) (yes, it behaves the way it's supposed to)
* [mistakes were made](http://javascript.crockford.com/survey.html) (says Crockford, the guy who _created_ JSON)
* you got me again, JavaScript!


</section>
