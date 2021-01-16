* middleware
* form handling

## http as a stateless protocol

* a request/response does not know about previous request/responses
* sometimes we want state
	* shopping cart
	* user preference
	* user tracking / analytics
	* authenticated


## to add state... 

1. have a session id assigned to a client
2. that client will always send that session id somehow
	* in the http request _somewhere_
	* perhaps the headers


## session id

* collision resistant
* non-sequential
* "difficult" to guess / "brute force"
* make the session easily viewable


## use cookies to do this!

(there are other ways)

* little bit of data stored in the client
* they can store any data, not session id
	* this data, because it's in the client
		1. be read by the user of the client
		2. manipulated by client
	* maybe it's ok to store session id because:
		1. followed guidelines, and session id complex enough where if it's tampered with
		2. you won't match an existing session id <-- new session!
		3. ....it's not complex enough .... you've hijacked session


## cookies

1. a server can tell a client to create a cookie by sending one ore more `Set-Cookie` headers
	* name=value
		* color=green
		* session_id=123abc123
	* options (semicolon separated)
		* max-age (a server can't tell the client to delete cookies) .... after a certain num of seconds, remove cookie
		* expires.... this will be a date to remove cookie
		* domain ... only send these cookies back if you're on this particular domain
			* cookies won't be sent for other domains anyway, but this handles subdomains
			* access.foo.bar vs www.foo.bar
		* path ... only send cookies for specific path
		* httponly ... only send these cookies / read cookies via http request and response (only browser can read), but client side js can't
		* secure ... only send these cookies over ssl / https
2. browser creates a cookie(s) for that domain
3. every subsequent request cookies will be sent
	* Cookie: name=value;name2=value2;
	* no options
	* all cookies sent at once

## session handling and cookies

0. server has some storage for session ids where session id maps to some info:
	* {sessid1: {foo: bar, baz:qux}, sessid2: {foo: corge, baz:whatever}}
	* this can be an in-memory data store
	* or an _actual_ database, etc.
	* preferences to shopping carts to .... have they been authenticated
1. when a request comes in
2. server checks for cookies
	* if there's a cookie
		* check for session id in that cookie
			* if there's a session id... then try to see if that session id is in your session store
				* if it exists, then pull info for that session
	* if no cookie or no session id or session id doesn't exist...
		* server will generate session id
		* server will respond with Set-Cookie: session=newsessionid
		* client receives response
		* creates cookie with session id
		* every subsequent request from client will send Cookie: session=foo
	* only data stored in cookie will be session id, other data... like has user visited before or do they have stuff in their cart or have they accepted terms of use.... all of that stored in session store on server



mybank.abc

contains a map of locations
donttrustmemaps.com/map.js




## express session

npm install --save expression-session

provides middleware that:

1. configures your session storage
2. checks for cookie, then session id, then existence of session in session storage
3. pulls out data and dumps it in req property called req.session
4. allows server side to add data to req.session
	* req.session.visits = 1
	* if req.session.visits exists .... then set it += 1
5. if the check works
	* uses some algo to come up with session id
	* uses Set-Cookie header to set sesion id for client
6. when it's done with above goes to next middleware / route














































































