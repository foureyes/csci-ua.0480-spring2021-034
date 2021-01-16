for a form that uses method=GET
.... and action=/form/path
the input data is placed in the path

(assuming there are inputs with names foo and baz)

GET /form/path?foo=bar&baz=qux


username and password as a GET form

* we don't want this showing up in path, so bad idea!
	* you don't want username and password bookmarkable
	* you don't want want it to show up in server logs
	* as the user, you don't want someone to see your username and password in your urlbar
* using POST instead is not adequate to protect sensitive data
	* in a POST, the form data goes in the HTTP request body
	* POST has no bearing on whether or not http message is sent as clear text or encrypted
	* protocol _should_ be https...



```
<form method="POST" action="whatever">
	<input type="text" name="username">
	<input type="text" name="password">
```
```
===========================
POST /whatever HTTP/1.1
Content-Type: www-form-url-encoded;

username=jversoza&password=notreallymypassword
============================
```
GET vs POST

* GET: reading
	* retrieving data
	* filtering
	* search
* POST: creating (updating too!)
	* login / authentication (creating a new authenticated session)
	* adding stuff to a database


for post form:

GET /form
200 OK 

POST /action

formInput1=val1
303???? See Other
Location: /anotherPage
(redirect)

GET /anotherPage
200 OK




GET /some/path HTTP/1.1
Content-Type: ...
User-Agent
X-Unique-ID: sessionid=foobarbaz

....


on the server, we need to store:
user information
an id associated with their "session"
on server, there should a mechanism to store sessions and their associated ids

{foobarbaz: 'some user info'}



1. client requests page
2. did you send me a session id?
	* if not: create a session id
		* send a back a response that tells browser what their session id is
	* if i found it: ... get user info
3. every subsequent request from client / browser will contain that session id
	* (until it expires or is purposely invalidated)

cookie - a piece of data stored in browser
in the server response, the server can add this header:
Set-Cookie: name=value;secure;httponly
Set-Cookie: name2=value2;secure;httponly

every time client makes new request add this header:
Cookie: name=value;name2=value2

(for particular domain and maybe path)






















