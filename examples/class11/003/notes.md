# AGENDA
* use express to create a couple forms
	* ascii art diary / journal
* middleware in hw
* cookies / session
* database stuff???

## http is stateless

* a request and response .... has no idea about previous requests and responses
* but we see that state can be maintained... why... and (later) how?
	* when you authenticate, you don't authenticate again
		* you don't have to login for every request your browser makes
	* shopping cart, user preferences
	* client tracking / analytics
	* authenticate != state though!

## how?

1. have the server generate some unique id for a client
2. client will send back id on every request

all within the framework of http

## session id

* unique identifier for a client session
* props:
	* difficult to guess / sufficiently complex
	* collision resistant
	* don't display publicly
		* not in the url
		* not in the html body
		* (prevent shoulder surfing)
* in our version of session management (typical one)
	* session id will be sent through headers
	* via cookie header

## cookies and headers

cookies are data stored on client
those cookies are associated with a domain
every time browser makes a request to that domain, that cookie data is sent


## making cookies

server will send one or more `Set-Cookie` headers:

(on server response, use these headers)

Set-Cookie: color=green
Set-Cookie: sessid=123; Secure; Http-Only

## cookie options semicolon separated AFTER name value pair

session cookies disappear when you close client unless they're permanent cookies:

* Max-Age: in seconds ... determines when to remove cookies (browser does this)
* Expires: ^^^^ with specific date

server can't tell client to remove cookies explicitly

## security cookie options

* Path - only send cookies if request is to this specific path
* Domain - ^^^ except for domain ... accounts.foo.bar vs www.foo.bar
* HttpOnly - don't let client side javascript read the cookie
* Secure - only transmit / set if on a secure connection (https, ssl)

## cookies are stored on the client!

* user has access to them:
	* they can see them
	* they can manipulate them
	* don't store data that you don't manipulated in cookies


## a browser can send cookies 

* in a request header `Cookie`
* put all cookies separated by semicolon









## workflow

1. have place to store sessions
	* in memory
	* an actual db
	* k/v pairs {12345: {color: green},789: {color: blue} }
2. every incoming request check if there are cookies
	* (look at req object ... req.get('Cookie') ... find session id)
	* there are cookies then check if session id is one of those cookies
		* if there is session id.... then check session store for matching sess id
			* if there's a matching one, pull out data
				* (stuff in their shopping cart, are they logged in)
				* if they're logged in render the logged in account template
				* if there's stuff in the shopping cart, ask the db for
				* ...those items and throw those items in a template
	* no cookie or no session id or session id does not exist in session store
		* use some algorithm to generate a session id
		* add Set-Cookie header to response
	* ... then call next (to handle next middleware or next _actual_ route)
3. every browser makes request Cookie header is set such that there is a session id
	* the one that was assigned to it






GET /foo HTTP/1.1
Header: value
Cookie: sessid=foo


database

1. relational
2. non relational (nosql)
	* more than just this! ^^^


## relational dbs:

* data is stored in tables
* columns represent "attributes" or "properties" of data
* rows represents instances of your data
	* every row has a unique id ... primary key
	* movies directors ... pedro almodovar 6
	* movies .. director_id 6 ------^


movie
title   									year  director id
women on the verge of a nervous breakdown   1988  6


directors
id  name
2   guillermo del toro 
6   pedro almodovar

## Generalizations

relation dbs are:

* highly structured / very rigid
* must define table names, columns types of data in columns
* BEFORE you insert / add anything!!!!



































































