---
layout: slides
title: "HTTP Summary, Review"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## HTTP?

__What's HTTP?__ &rarr;

* it's the protocol used by the world wide web (you know, a bunch of interconnected documents, identified by URLs)
* it's a request-response protocol between a client and a server
* the client sends request, and the server sends back a response
{:.fragment}

</section>

<section markdown="block">
## HTTP Request

__What does an _actual_ HTTP request look like?__ &rarr;

* __a request line ...__  a request __method__ and a __path__ - <code>GET /teaching HTTP/1.1</code>
* __request headers (one per line)__ <code>Host: jvers.com</code>, <code>User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 </code>
* __an empty line__
* __an optional body__
{:.fragment}

<pre><code data-trim contenteditable>
GET /~jversoza/ HTTP/1.1
Host:cs.nyu.edu
</code></pre>
{:.fragment}
</section>


<section markdown="block">
## HTTP Request Methods

HTTP supports a few different request methods - these methods (sometimes called _verbs_) specify the kind of action to be performed on the document/resource requested.  __What are some HTTP request methods?__ &rarr;

* GET
* POST
* PUT
* DELETE
* HEAD
{:.fragment}

</section>

<section markdown="block">
## HTTP Request Methods Continued

So, if request methods specify some action on a requested resource, __what's the difference between GET and POST?__ &rarr;

* __GET__  retrieves a resource (reads a resource)
* __POST__  asks the server to store or update data (usually related to the resource itself) using the data supplied in the request body
{:.fragment}
</section>

<section markdown="block">
## HTTP Response

__What does the response to a request look like?__ &rarr;


* __a status-line ...__ which includes a status code and reason - <code>HTTP/1.1 200 OK</code>
* __response header fields__ - <code>Content-Type: text/html</code>
* __an empty line__
* __an optional message body__ - usually an HTML document!
{:.fragment}


<pre><code data-trim contenteditable>
HTTP/1.1 200 OK
Date: Tue, 29 Sep 2015 11:53:39 GMT
Server: Apache/2.2.15 (Red Hat)
...
(html document) ...
</code></pre>
{:.fragment}

</section>
<section markdown="block">
## HTTP

__What are some HTTP response codes?__ &rarr;

* 200 - OK
* 404 - Not Found
* 500 - Server Error
{:.fragment}
</section>

<section markdown="block">
## HTTP 

__What are the _classes_ of response coes?__ &rarr;

* 1xx - informational
* 2xx - success
* 3xx - redirect
* 4xx - client error
* 5xx - server error
{:.fragment}
</section>

<section markdown="block">
## URLs

__What are the parts of a URL?__ &rarr;

* {:.fragment} __scheme/protocol__ - http
* {:.fragment} __domain or actual ip address__ - pizzaforyou.com
* {:.fragment} __port__ (optional) - 80 (default if http)
* {:.fragment} __path__ - /search
* {:.fragment} __query_string__ (optional) - ?type=vegan
* {:.fragment} __fragment_id__ (optional) - #topresult

<br>
<code>scheme://domain:port/path?query_string#fragment_id</code>
{:.fragment}

<code>http://pizzaforyou.com:80/search?type=vegan#top_result</code>
{:.fragment}
</section>

<section markdown="block">
## Clients

__What are some tools that we use to make HTTP requests... and how do we use them?__ &rarr;

* nc hostname port
* curl hostname
* Chrome!
{:.fragment}

<br>
__Let's see them in action.__ &rarr;
</section>

