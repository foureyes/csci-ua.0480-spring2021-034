client - connect to the server first
send an http request

server - send an http response

HTTP Request
======
| the request method: GET, POST, PUT, DELETE...
| GET and POST
|
| GET data goes in query string  / for reading data
| POST data in request body /  creating data
|
|
\/
GET /some/path HTTP/1.1
name: value
Host: 
Referer:
User-Agent: Mozilla
Cookies: foo=bar

Request body optional


http version status code short description of that code
HTTP/1.1 200 OK
Content-Type: text/html

<!doctype><html>....


1xx - informational
2xx - ok
3xx - redirects
4xx - "client" error or don't do that again
5xx - "server" error or maybe try again later





















