// http protocol for the web
// application layer ^^^^

// tcp/ip for internet ... tcp/ip is the name of a suite of protocols for the internet...
// transport layer - tcp .... application connections (which "program"), control flow, connection status, port gets assigned here, message may be packetized (broken down into smaller chunks)
// internet layer - ip .... communication accross network boundaries
// hardware / physical / link - wifi, ethernet... turn info to radio signals
// a module called node called net, allows creation of tcp/ip servers and clients
// only accepts network connections
const net = require('net');
function handleConnect(sock) {
  console.log('someone connected');

  // gets called when data sent from client
  sock.on('data', (binaryData) => {
    // binaryData is the data that's sent (client)
    // if it's the browser that's sending (client) data
    // then binaryData is an http request
    console.log(binaryData + '');
    const path = (binaryData + '').split(' ')[1];
    if(path === '/hello') {
      sock.write('HTTP/1.1 200 OK\r\n');
      sock.write('Content-Type: text/html\r\n');
      sock.write('X-Foo: i made this up!\r\n');
      sock.write('\r\n\r\n<h1>hello</h1>');
      sock.end();
    } else if(path === '/bye') {
      sock.write('HTTP/1.1 200 OK\r\n');
      sock.write('Content-Type: text/html\r\n');
      sock.write('X-Foo: i made this up!\r\n');
      sock.write('\r\n\r\n<h2>bye</h2>');
      sock.end();
    }
  });
}
const server = net.createServer(handleConnect);

server.listen(3000, '127.0.0.1');







