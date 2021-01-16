---
layout: slides
title: "Web Servers"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Serving Static Sites, Remote Server Administration

Before we move on, it wouldn't be a class about the web without talking about serving __static sites__.

* you can think of __static sites__ as sites that have pages that are served up from the file system __as is__. The content is not generated dynamically from a server-side web application.
* __This site is actually a static site!__ If you know a little bit of HTML, CSS and client side JavaScript (all of which we'll discuss later during the semester), a static site may suit your needs.
</section>

<section markdown="block">
## A Quick Survey of Options

__So... where do I _host_ my static site? What are some options?__ &rarr;

* (in order of _my_ preference)
* github pages
* weebly, squarespace, wordpress (these aren't exactly just static sites, but no server side experience needed)
* run a web server in AWS/Rackspace/DigitalOcean... or some other VPS, dedicated hosting, etc.
* (I guess Amazon S3 as well)
{:.fragment}
</section>

<section markdown="block">
## Let's About a Couple of These

1. github pages - since we're already using github to host our repositories
2. run a web server - 'cause I found out no one's ever ssh'd into a remote server before in our last class

(and to be honest, I've only briefly looked at weebly, squarespace, etc.)
</section>

<section markdown="block">
## GitHub Pages

GitHub has a feature called [Pages](https://pages.github.com/) (we'll use project pages, rather than user pages).

* automatic site generator via repository settings
* via commandline ...
	* clone repository
	* create a new __branch__ called gh-pages
	* add a file
	* push your changes to github
	* go to: username.github.io/repository-name
	* (or use the online editor!)
</section>

<section markdown="block">
## It Hasn't Changed Since the 90's

The next bit is about working with traditional web servers like Apache, lighttpd, Nginx, etc. Generally, in these cases, you'll be working with a remote server, so you'll need tools to connect to a remote machine. Let's talk about:

* __ssh__ - secure shell
* __scp__ - secure copy
* __sftp__ - secure file transfer
* __graphical sftp__ - transmit, fetch, etc.
</section>

<section markdown="block">
## ssh

ssh gives you remote terminal access to a server. You can issue commands on the server as you would commands in terminal on your computer!

<pre><code data-trim contenteditable>
ssh username@hostname
</code></pre>

(then you can edit files directly... using nano, emacs or, of course, vim!)
</section>

<section markdown="block">
## scp

scp allows you to copy a file from your local machine to a remote computer.

<pre><code data-trim contenteditable>
scp file.to.copy username@hostname:/path/to/copy/to
</code></pre>

</section>

<section markdown="block">
## sftp

sftp is a commandline sftp client. Typing in 

<pre><code data-trim contenteditable>
sftp username@hostname
</code></pre>

will give you __yet another shell__, where you can issue commands like:

* __ls__ - list files (same as usual)
* __pwd__ - print working directory (same as usual)
* __cd__ - change directory (same as usual)
* __put__ - copy a local file to remote server
</section>

<section markdown="block">
## You Can Use All of These Methods to Transfer Files

If you're running Apache on Debian, you can drop your files in ...

<pre><code data-trim contenteditable>
/var/www
</code></pre>

And voila. Served!

</section>
