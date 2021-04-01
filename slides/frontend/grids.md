---
layout: slides
title: "CSS Grids"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Markup

Some example markup and styles to start with:

```
<div class="container">
    <div>A</div>
    <div class="foo">B</div>
    <div>C</div>
    <div>D</div>
    <div>E</div>
    <div>F</div>
    <div>G</div>
    <div>H</div>
</div>
```
{:.fragment}


```
.container > div {
    border: 1px solid red;
    padding: 1em;
}
```
{:.fragment}


</section>

<section markdown="block">
## Three Columns

Make container display grid; __every child becomes a _grid item_ ...__ &rarr;

* in your css rule...
* use `grid` as a value for the `display` property

```
container {
    display: grid;
}
```
{:.fragment}

So far... doesn't do much 🤷‍♀️
{:.fragment}

(default is single column)
{:.fragment}
</section>



<section markdown="block">
## Creating a Layout with Columns

We can change the way the elements are arranged by adding columns / using a __grid template__ &rarr;

* in the element that has `display: grid`...
* specify a value for `grid-template-columns`
* the can be space separated measurements for each column, with each measurement being a single column

```
container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
```
{:.fragment}

This means: 
{:.fragment}

* create 3 columns, and...
* place elements across 3 columns, going to the next row if needed
* in this case, each column is equal size 
{:.fragment}
</section>

<section markdown="block">
## Wat? and fr?

The resulting layout will look something like this: &rarr;

```
[_A___][_B___][_C___]
[_D___][_E___][_F___]
[_G___][_H___]
```
{:.fragment}

__Recall that the value and the corresponding units in `grid-template-columns`: `1fr 1fr 1fr`__
{:.fragment}

* {:.fragment} this means to take up this fraction of available space
* {:.fragment} you can change the value to specify a particular ratio (2fr would mean twice the size of a column that's 1fr)
* {:.fragment} you can also use exact measure such as pixels
* {:.fragment} you can mix and match units (pixels and fraction)
</section>

<section markdown="block">
## Gaps

You can modify the space between each grid item with `column-gap`, `row-gap`, and `gap`:

```
container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 4px;
    row-gap: 4px;
}
```
{:.fragment}
</section>

<section markdown="block">
## Spannnnning

Finally, __you can have a grid item span grid lines__ using either `grid-column` or `grid-row`:

* you can specify which grid lines (assume that the lines are counted starting from 1) the span should start and end
* `grid-column: 2 / 4` would start at line 2 and end at line 4
* this makes a particular grid item span two columns

```
.foo {
    grid-column: 2 / 4;
    background-color: blue;
}
```
{:.fragment}

```
[_A___][_B__________]
[_C___][_D___][_E___]
[_F___][_G___][_H___]
```
{:.fragment}
</section>
