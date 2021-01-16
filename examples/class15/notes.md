* keep track of some data on the server (web app itself)
* and associate that data w/ an id
* that id will represent a specific client
* we a session id
	* difficult to guess / sufficiently complex
	* collision resistant
	* not easily viewable

1. when we first get to site
2. server will check:
	* do you have a session id (in a cookie sent from request)
	* if you do, and i can't find it my session store, or if you don't have a session id....
		* session id will be generated for you
		* server sends back set-cookie header instructing browser to create cookie that contains session id 
		* browser sees that it should create a cookie.... and stores session id in it
		* cookie is just some data stored on client (was plain text files)
		* every subsequent request from client will send along session id via cookie
	* if session already exists, then retrieve data for that particular client!
3. session != authentication (session is: are you same client that i've seen previously)



To "coerce" the browser to create a cookie, server must send back a header in the http response:

response from server to set two cookies
www.foo.pizza
HTTP/1.1 200 OK
Set-Cookie: foo=bar
Set-Cookie: baz=qux


every subsequent request to www.foo.pizza from client will contain a cookie header, sending along all cookies for that particular domain only!
GET / HTTP/1.1
Host: www.foo.pizza
Cookie: foo=bar; baz=qux














































