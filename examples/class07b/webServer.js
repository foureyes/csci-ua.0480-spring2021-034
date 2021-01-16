// A Web Server that Serves Static Files
// =====================================
//
// Some context: are http and tcp/ip are difference things?
//
// Yes, they're different...
//
// * http - application layer protocol`
//    * protocol for the web
// * tcp/ip stack - transport layer, internet layer, physical layer protocols
//    * suite of protocols for the internet
//
// Let's learn about HTTP by building an HTTP server!
//
// * we'll learn enough about net module so that we can build an HTTP on top 
//   of it
// * the net module is a built-in node module for creating tcp/ip servers and 
//   clients 

// The net module has a function called createServer:
//
// const myServer = net.createServer(callback)
//
// * it's function that creates (and returns) a server object (specifically, a
//   tcp/ip server)
// * callback is called when _something_ connects to our server object
// * callback(sock)
//    * sock represents the connected client
//    * sock has methods that you can use on it...
//      * on(event, callback) - allows you to react to a specific event
//        * event - String - 'close', 'data', etc.
//        * callback - gets called when event is triggered
//          * if event is data, then argument will be binaryData sent from client
//      * write(data) - write data to client
//      * end() - tell client connection will be closed
// * server object has a method called listen
//    * listen... bind to specific port and hostname
//    * port (application), hostname (ip address)

//  The following code uses both the net module and fs.readFile to serve up
//  html files.
//
// About reading files... use fs.readFile:
// (https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
//
// fs.readFile(fileName, config, callback)
// * fileName - relative or absolute path to file
// * config - (optional)... can include encoding, like 'utf8'
// * callback - function to call __when file is finished reading!__
//    * callback(err, data)
//    * the callback itself has two arguments:
//    * err - an object that contains information on an error if an error occurred
//    * data - the data read from the file
//
// Note that this is async! ... that is, if you want to do something after a file
// is read, it __must be done in the callback!__

const net = require('net');
const fs = require('fs');
const path = require('path');
// use path.join for cross platform path creation
// > path.join('foo', 'bar', 'baz')
// 'foo/bar/baz'
// also, it's sometimes handy to use a built-in variable that dynamically
// determines your script path:
// __dirname <--- directory that script is running in 

// destructuring
const [PORT, HOSTNAME] = [3000, '127.0.0.1'];

const HTTP_STATUS_DESC = {
  200: 'OK',
  404: 'NOT FOUND',
  500: 'SERVER ERROR'
};

function makeResponse(status, contentType, body) {
  let response = `HTTP/1.1 ${status} ${HTTP_STATUS_DESC[status]}\r\n`;
  response += 'Server: my awesome server\r\n';
  response += `Content-Type: ${contentType}\r\n\r\n`;
  response += body;
  return response
}

function handleRead(sock, err, data) {
  fn, (err, data) => {
    if(err) {
      console.log(err);
      sock.write(makeResponse(500, 'text/plain', 'uh oh!????'));
      sock.end();
    } else {
      sock.write(makeResponse(200, 'text/html', data));
      sock.end();
    }
  }
}
function handleConnect(sock) {
  console.log('connected!');
  
  sock.on('data', binaryData => {
    const s = '' + binaryData;
    const [method, reqPath, ...doNotUse] = s.split(' ');
    console.log(s);
    if(reqPath === '/harry') {
      // for this path, we're going to read a file
      const fn = path.join(__dirname, 'public', 'harry.html');
      fs.readFile(handleRead.bind(null, sock));
      
      // note that we _want_ to use the handleRead function defined
      // above as the callback function to readFile (that is, we want
      // to run the code in handleRead AFTER the file is read). However,
      // handleRead has more parameters than what the callback for
      // readFile is called with (recall from the specs and notes above
      // that readFile's callback only has err, data as parameters,
      // whereas handleRead has 3!).
      //
      // there are two ways to fix this... you can use bind to reduce
      // the number of arguments so that there's only two:
      // fs.readFile(handleRead.bind(this, sock)) so
      //
      // alternatively, we can wrap a call to handleRead within an
      // arrow function that only has two arguments...
      // SEE? 2 args --> 3 args!!!
      fs.readFile((err, data) => {handleRead(sock, err, data)});
    } else if(reqPath === '/mouse') {
      sock.write(makeResponse(200, 'text/html', '<em>mickey mouse</em>'));
      sock.end();
    } else {
      sock.write(makeResponse(404, 'text/plain', 'i do not have wat u want1111!!11'));
      sock.end();
    
    }
  });
}

const server = net.createServer(handleConnect);

server.listen(PORT, HOSTNAME);

