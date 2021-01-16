const express = require('express');
const app = express();

// socket.io setup
// wrap ur app in an http server object
const server = require('http').Server(app);

// mount a websocket server by passing in ur http server to socket.io require
const io = require('socket.io')(server);

app.get('/hello', (req, res) => {
  res.json({message: 'hello'});
});

let count = 1;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connect', sock => {
  console.log(sock.id, 'has connected!!!!');
  sock.on('chat', data => {
    console.log(data); 
    io.emit('chat', data);
  });

  sock.on('mouseMoved', data => {
    const newData = {};
    Object.assign(newData, data);
    newData.sockID = sock.id;
    console.log(sock.id, newData.sockID);
    sock.broadcast.emit('mouseMoved', newData);
  });
});


/*
function sendMessage() {
  io.emit('count', {count});
  count += 1;
  console.log(count);
}

setInterval(sendMessage, 1000);
*/

// use server to listen rather than app
server.listen(3000);
