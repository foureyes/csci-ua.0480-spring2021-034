/*
1. do what we did in class
2. who's spirit animal
3. create classes (App, Request, Response)
4. app.get .... will add a route to routes object in App
5. you'll check if path exist on file system before looking at route
6. if path exists, serve up that file 
7. if doesn't go to your routes // kind of like middleware
 */
const net = require('net');
const fs = require('fs');
const path = require('path');

class Request {
  constructor(s) {
    const [method, path, ...notUsed] = s.split(' ');
    this.method = method;
    this.path = path;
  }
}
// path module...
// path.join ... concatenates paths w/ appropriate separator for environment
// __dirname <-- built in variable within scope contains name of directory that
// we're in
//
// fs.readFile(fileName, options, handleRead)
// handleRead(err, data)
//
// GOAL: read homer.html
// pika.html
// serve those instead of handcoding in a string html
// all files will go in folder called public
// note that public WILL NOT BE IN url path
// but it will be in the file system path

// destructuring, creates two variables
const [PORT, HOSTNAME] = [3000, '127.0.0.1'];

const HTTP_RESP_DESC = {
  200: 'OK',
  404: 'NOT FOUND',
  500: 'SERVER ERROR'
};

function makeResponse(status, contentType, body) {
  let response = `HTTP/1.1 ${status} ${HTTP_RESP_DESC[status]}\r\n`;
  response += `Content-Type: ${contentType}\r\n\r\n`;
  response += body;
  return response;
}

// with images
// you never want to inadvertently convert to a string
// fs.readFile('homer.png' <--- this is an image)
// 1. make sure that options are not included (either leave it out or {})
//  ....just read as binary data
// 2. never concatenate with anything
//
// (assuming this is within callback of readfile)
// sock.write('HTTP/1.1 200 OK')
// sock.write('Content-Type: image/png')
// sock.write(data)
function handleRead(sock, err, data) {
  // read already happened  
  if(err) {
    sock.write(makeResponse(500, 'text/html', data));
  } else {
    sock.write(makeResponse(200, 'text/html', data));
    sock.end();
  }
}

function handleConnect(sock) {

  console.log(sock.remoteAddress, 'connected!');
  sock.on('data', (binaryData) => {
    const s = binaryData + '';
    const req = new Request(s);
    if(req.path === '/pika') {
      const fn = path.join(__dirname, 'public', 'pika.html');
      fs.readFile(fn, {encoding: 'utf8'}, (err, data) => { handleRead(sock, err, data); });
    } else if(req.path === '/homer') {
      const favChar = 'homer';
      const html = `<em>${favChar}</em>`;
      sock.write(makeResponse(200, 'text/html', html));
      sock.end();
    } else {
      sock.write(makeResponse(404, 'text/plain', 'not here at all!!!!'));
      sock.end();
    }
    // write out favorite character as an h1
  });
}


const server = net.createServer(handleConnect);
console.log('we are in ', __dirname);
server.listen(PORT, HOSTNAME);

