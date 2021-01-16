---
layout: slides
title: "About Class #19"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Topics

* Finish Up Validation
* Authentication (!)
* Related Documents / Population

</section>

<section markdown="block">
## Where to Next?

I've lingered on server side development a bit... so it's time to check out front-end development

* Document Object Model
* JavaScript on the frontend
* CSS/Less

</section>

<section markdown="block">
## Final Project and Homework

There's a final project for this class

* I'll be assigning it within the next two weeks
* It will be 2~3 weeks worth of work
* It will likely be open ended 
* (Though I'll have some suggestions if you don't have ideas)
* I'll post a smaller homework tonight that covers the topics in today's class
</section>

<section markdown="block">
## Office Hours Today

There's a grader meeting and curriculum meeting today, so I've had to shuffle my office hours a bit today:

* 11:30am-12:30pm
* 2:30am-3:00pm
</section>

<section markdown="block">
## Validation Recap

__Where does validation of user-inputted data occur in the technology stack that we're using? In the datbase? The application?__ &rarr;

In our technology stack, validation occurs in the application layer - both on the client side and on the server side.
{:.fragment}

__Should validation occur on the client, server, or both?__ &rarr;
{:.fragment}

* minimally, it should be done on the server side since requests can originate from clients that aren't browsers
* ideally, validation would be done on both the server and client side
{:.fragment}

<br>

__Where in our application have we done validation so far?__ &rarr;
{:.fragment}

* in the mongoose Schema
* on the client side through form elements
{:.fragment}

<br>

__Let's review some validation.__ &rarr; ...  __And... let's go back and check out other places where we can place validation.__ &rarr;
{:.fragment}
</section>
