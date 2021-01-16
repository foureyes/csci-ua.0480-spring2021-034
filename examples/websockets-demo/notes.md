1. keep track of x and y of cursor
2. send to server
3. server will broadcast to everyone except current client
	* broadcast x and y
	* also socket.id

1. construct a css selector out of socket id
2. if we can't find element
3. create new element (with socket id)
	* text content is also socket id
4. ... set to fixed
5. ... set top and left









emit - sends an event
on - listens an event
(same for server and client)


server:

* io.emit - send to all clients
* socket.emit - send to specific client (current)
* socket.broadcast.emit - all clients except current client



socket io is two parts

1. server
	* listen for events and their data
	* send an event w/ some data
	* you have access to a global (perhaps) object representing your websocket server
	* io.emit(eventName, data) ---> broadcasts to everyone (all clients), a specific event and data
	* io.on(eventName, callback)
		* callback(socket)
		* 'connect'
		* 'disconnect'
		* callback is called when new client connects / disconnect
	* socket.on(eventName, callback)
	* socket.emit(eventName, data) - sends to one client
	* socket.broadcast.emit(eventName, data) - sends to all clients except current one
2. client 
	* listen for events and their data
	* send an event w/ some data
	* access to global io object which can connect to server
	* ... it returns a socket
	* emit
	* on











socket.io is a realtime web app library

can use the following:

* websockets (a customization of websockets)
* long polling
* regular pollng



realtime app

LONG POLLING

* still not realtime
* still over HTTP
* kind of like polling, in that app creates multiple consecutive requests
* when client makes a request
	* server keeps connection open, and doesn't response
	* server only responds when data has actually changed


POLLING

* create an api end point that served some data
* on frontend, our client application requested that data
* continue request (background request)... and update frontend
* polling
	* HTTP GET requests
	* (protocol remains HTTP)




0. meta
	* exam is in same format as 1st
		* short answer q's
		* choose from pool of questions to do
	* authentication will be on exam
	* react, socket.io
1. various methods for creating realtime applications
2. websockets

