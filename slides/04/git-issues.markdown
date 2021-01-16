---
layout: slides
title: "Git Issues"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Some Common Issues Encountered

* cloning vs init and push
* credential cache
</section>

<section markdown="block">
## Cloning vs init and push

* previous instructions specified to clone
* those instructions were if you _actually_ had stuff in the repository beforehand
* if your remote is empty... use the init and push workflow instead

</section>

<section markdown="block">
## Multiple GitHub Accounts

There may be a credential caching issue if you have more than 1 github account.

* I believe you can fix this by changing your global .gitconfig.
* However, a fix that definitely works is to use SSH rather than HTTPS (you'll have to generate a key if you don't already have one... and add to your github settings)

</section>
