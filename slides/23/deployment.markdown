---
layout: slides
title: "Deployment"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Deployment

For most projects, we can use the CS department's undergraduate projects server, i6, to deploy our applications.

However... we'll need to familiarize ourselves with a few tools to get started:

* ssh
* forever
* mongod
* scp or sftp ... or git

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
## forever

Forever will keep your node process up and running.

<pre><code data-trim contenteditable>
# starting your app
export PORT=10000; node_modules/.bin/forever start my_project/bin/www

# stopping your app
node_modules/.bin/forever stopall
</code></pre>

</section>

<section markdown="block">
## Mongo

So... to run mongo as a demon, and with a specific db directory:

<pre><code data-trim contenteditable>
mongod --fork --logpath var/log/mongodb.log --dbpath db/data
</code></pre>

To shut down

<pre><code data-trim contenteditable>
mongod --dbpath db/data --shutdown
</code></pre>
</section>

<section markdown="block">
## Finding and Killing Processes

<pre><code data-trim contenteditable>
ps aux | grep process_you_want_to_find
kill process_id
</code></pre>

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


</section>
