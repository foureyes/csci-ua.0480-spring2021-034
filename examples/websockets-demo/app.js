const express = require('express');
const app = express();

// we want to add socket.io to our express app

// 1. create a regular http server from our app
const server = require('http').Server(app);

// 2. mount socket.io (websocket) server on top of that
io = require('socket.io')(server)

// client portion goes here
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

let count = 0;

io.on('connect', socket => {
  // socket reprsents connection w/ specific client
  // socket.id is unique identifier for connected client
  // everytime client connects log it out
  
  console.log(socket.id, 'has just connected');
  // we want to handle any chat message sent to us from a client
  socket.on('chat', data => {
    console.log('got message', data); 
    // send to everyone
    io.emit('chat', data);
  });
  socket.on('movement', data => {
    const {x, y} = data
    const newData = {x, y, socketID: socket.id};
    socket.broadcast.emit('movement', newData);
  });
});

/*
function sendCount() {
  // all connected clients (don't have to use socket)
  // (don't have to be in callback for this)
  // send event w/ data to all clients
  console.log(count);
  io.emit('count', {count});
  count += 1;
}
setInterval(sendCount, 1000);
*/

server.listen(3000);



















