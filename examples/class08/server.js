net module - tcp/ip servers and clients
.
.
\/
http module <--- - creation of http servers and clients (built-in to node)
* build on top of net module
express
* builds on top of http module
/*
Request
Response
App
* routes
* middleware
* .get
* .listen
* .use
*/
* routes are intertwined with server
* entire module isn't really reusable
* writing html by hand
* we only have one middleware function







/**
 * create an http server using
 * using node's net module
 * net module only create tcp/ip servers and clients
 * layer http on top of it
 */

class Request {
  constructor(s) {
    // super(); 
    // required to use this
    // ???? but clearly not now
    const [method, path] = s.split(' ');
    this.path = path;
    this.method = method;
  }
}


const net = require('net');
// port as the number that service is running on
// hostname is localhost
const [PORT, HOST] = [3000, '127.0.0.1'];

function createResponse(statusCode, description, body) {    
  return `HTTP/1.1 ${statusCode} ${description}\r\nContent-Type: text/html\r\n\r\n${body}`;
}
const routes = {
  '/hello': function(sock) {
    const res = createResponse(200, 'OK', '<h1>hello!</h1>');
    sock.write(res); 
    sock.end();
  },

  '/bye': function(sock) {
    const res = createResponse(200, 'OK', '<h3>bye!</h3>');
    sock.write(res); 
    sock.end();
  }
};

// you'd have to edit the source code to add another path







// either send back the response yourself
// or call the next function
// serveStatic
// checks for the path on the file system
// if it finds it, then it uses readfile to read the actual file and send it back
// if it doesn't find it, call next.

// callback 
// (called when client connects)
// (has one arg socket <-- represents connected client
const server = net.createServer((sock) => {
  console.log('client has connected', sock.remoteAddress);
  // react to an event
  // sock.on ... 1st arg is a string (name of event)
  // 2nd arg is callback that is invoked when event occurs
  sock.on('data', (data) => {
    // data is a buffer object
    // convert to a string
    const s = data + ''; 
    const req = new Request(s);
    // check: does path exist in routes
    if(routes.hasOwnProperty(req.path)) {
      const routeHandler = routes[req.path];
      routeHandler(sock);
    } else {
      const res = createResponse(404, 'NOT FOUND', 'page not found');
      sock.write(res);
      sock.end();
    }
  });
});

server.listen(PORT, HOST);
















