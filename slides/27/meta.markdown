---
layout: slides
title: "About Class #27 / Final Project Notes"
---
<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## Some Administrative Things

* final project, of course
* evaluations, hopefully!

</section>

<section markdown="block">
## Final Project

__Final Projects are Due Today at 11pm__

* There's a 24 hour grace period, with a 5 point penalty if you submit after today
* Classes closes on Friday at 11pm
* __However__... I can't tell if you tinker with i6, (I can see commits, though) so that's totally fine because...
	* I still expect deploy issues
	* or processes inadvertently going down
	* aaaaaand....

</section>
<section markdown="block">
## We Got Shut Down

We used up so much RAM/CPU on i6, that the server was slowing down! Resources were added, but that meant that your mongod and app were probably shut down.

__To bring everything back up without doing the full redeploy...__ &rarr;

<pre><code data-trim contenteditable>
# start mongod
mongod --fork --logpath ~/var/log/mongodb.log --dbpath ~/data/db --smallfiles --port your_port_number --nohttpinterface

# check that it's running
tail ~/var/log/mongodb.log

# you should see something like: 
# Wed Dec  2 07:12:45.954 [initandlisten] waiting for connections on port PORT

# start your app (in the directory where your project is, using your
# own APP_PORT_NUMBER)
PORT=APP_PORT_NUMBER bin/www

# finally, go through Part #7 in these instructions to run it as a daemon:
# http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/deploy.html
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## Evaluations

* Let me know when there are about 5-10 minutes left in class
* __Course Number__: 0480
* __Section__: 001
* I love comments. In addition to whatever you're planning on writing, I'd like to hear about:
	* your feedback on the general pace / difficulty level of the class
	* what topics you liked / didn't like
	* the amount of work and projects that you were doing
	* I kind of want to push the frontend stuff earlier and do more of it too (maybe svg, more react, animations, etc.) - thoughts?

</section>

