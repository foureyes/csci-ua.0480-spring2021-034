middleware
get and post forms
===
finish up post
maintaining state between requests

two http methods: GET and POST
=====

GET
-----
form inputs and their data show up show in the url
(as query string)

POST
-----
form inputs and their data show up in the request body

```
<form method="POST" action="/processStuff">
<input name="foo" type="text">
```

```
POST /processStuff HTTP/1.1
Content-Type: www-form-urlencoded

foo=whateverUserTypedIn
```

when do you use GET, POST
=====
* GET: read
	* retrieving a page
	* filtering some data
	* maybe a search
* POST: create (sometimes update)
	* creating an authenticated session
	* adding something to "the database" / persistent storage 

POST if you don't want information shown in url bar
if you want information to be secure (in transit, and also on your screen)
... use HTTPS (and then form should be POST)

if you want a "permalink" to form submission data / result... use GET 

1. type in url
```
GET /add HTTP/1.1

HTTP/1.1 200 OK

<form....
``
2. press the button
```
POST /add HTTP/1.1

catName=asdfasdfasdf

HTTP/1.1 200 OK

u succeeded

1. GET the form
2. POST the form
   server sends back redirect if form is successful
   server sends back old form if form is not successful (no redirect)
3. GET /follow/the/redirect

PRG => post redirect get



1. we want to maintain state between http requests
	* shopping cart
	* track number of visits
	* authenticate
2. server generates some sort of information that a client could use to uniquely identify itself: session id
	* unique
	* transmitted securely (encrypted)
		* difficult to "see" (not in url, not in page)
	* difficult to guess
	* collision resistant
	* server will use this session id to look up information _about that session_ ... is there a username associated? are they authenticated? how many visits?
	* this will be a session store (key ... session id, value ... is any data about that session)
3. your client should always send a bit of extra information
	* _should_ identify itself
	* session id

cookie - is a piece of data stored by the client
client sends cookies over based on domain and optionally:
path, subdomain, protocol

Response header
Set-Cookie foo=bar;httponly;secure
Set-Cookie baz=qux


REquest header
Cookie: foo=bar;baz=qux

1. browser to site
2. server checks cookies
	* if cookie exists
		* check for session id
			* if session id exists
				* get info for client
			* if no session id
				* generate session id
				* store it in session store
				* make sure Set-Cookie is set with session id in response
	* if cookie doesn't exist ^^^
3. send back response
4. browser's next request will contain that cookie and that session 



















GET /foo HTTP/1.1
Content-Type:
User-Agent:

...


200 OK...















































