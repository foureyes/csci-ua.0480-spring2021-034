/*
 * create tcp/ip servers and clients with net module
 * (no need to install)
 */
const net = require('net');

/*
 * this server will run on "localhost" (127.0.0.1)
 * to run: 
 * 1. in terminal: node demo.js
 * 2. keep terminal open...
 * 3. go to browser and type in localhost:3000
 *
 * note, that there are some port numbers that are for
 * specific services:
 * 80 - http (web)
 * 443 - https (web, encrypted)
 * ports under 1000 privileged ports (admin access to run server)
 * ports over 1000 we can usually bind to without admin access
 * .... so we're running this server on localhost, port 3000
 */
const HOST = '127.0.0.1';
const PORT = 3000;


/*
 * a class that represents an HTTP request
 * usage:
 *
 * const req = new Request('GET /foo HTTP/1.1');
 * console.log(req.path); // /foo
 */
class Request {
  /* 
   * take a string that represents an HTTP request
   * and parse out some important parts:
   * 1. method (like GET or POST)
   * 2. path (like /foo/bar or /baz.html)
   */
  constructor(s) {
    // cheap n' easy (no validation at allz okay!?)
    // just split and grab the first two bits parts
    const [method, path] = s.split(' ');  
    this.method = method;
    this.path = path;
  }
}




/*
 * use net.createServer to make a server (of course!):
 *
 * one argument, a callback function
 *
 * callback is called when a client connects to this server
 * callback has a single arg: socket
 * socket represents the connected client
 *
 * callback can be named or anonymous
 */ 

/*
 * example with named function:
 * function handleConnect(sock) { 
 *  // do stuff with sock here...
 * }
 * const server = net.createServer(handleConnect);
 *
 * ....and below for anonymous function
 */

const server = net.createServer((socket) => {

  // this callback gets called when client connects
  // socket object represents connected client
  
  console.log('client connected', socket.remoteAddress);

  
  // this object maps routes (paths, like /foo) to
  // functions that will generate http responses....
  const routes = {};

  routes['/foo'] = function(sock) {
      let response = "HTTP/1.1 200 OK\r\n";
      response += "Content-Type: text/html\r\n\r\n";
      response += "<h1>foo!!! hello</h1>";
      sock.write(response);
  };

  routes['/bar'] = function(sock) {
      let response = "HTTP/1.1 200 OK\r\n";
      response += "Content-Type: text/html\r\n\r\n";
      response += "<h1>bar!!! bye</h1>";
      sock.write(response);
  };

  // let's listen for data sent to us from client...
  // ===========================================
  // socket.on method can be used to respond to events:
  // 2 args:
  // 1. event name
  // 2. callback function fo
  //
  // the callback to socket.on
  // has a single parameter ....
  // buffer of data received from client
  // this is a Buffer object (not a string) so...
  socket.on('data', (d) => {
    // s is the http request as a string
    const s = d + '';

    const req = new Request(s);

    // we moved responses to an object called routes
    // routes has a key = to the path
    // the value at that key is a function that sends
    // back a response
    
    // does the path exist in my list of routes?
    if(routes.hasOwnProperty(req.path)) {
      const responseFunction = routes[req.path];
      responseFunction(socket);
    } else {
      let response = "HTTP/1.1 404 NOT FOUND\r\n";
      response += "Content-Type: text/html\r\n\r\n";
      response += "<h1>not found!!!!!!</h1>";
      socket.write(response);
    }
    // sends data to client!
    socket.end();

    // console.log(s);
    // would print on the server side
  });

});

server.listen(PORT, HOST);















