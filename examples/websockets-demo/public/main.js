// connect to socket.io server
const socket = io(); // connects to localhost

function handleChat(data) {
  // console.log('got chat message', data);
  const div = document.createElement('div');
  div.textContent = data.msg;
  document.body.appendChild(div);
}

function handleClick() {
  const msg = document.querySelector("#message").value;
  // console.log(msg);
  // NO XMLHttpRequest😎
  socket.emit('chat', {msg});
}

function handleMovement(data) {
  const {x, y, socketID} = data;
  const selector = 'mouse-' + socketID;
  let otherMouse  = document.querySelector("#" + selector);
  if(!otherMouse) {
    otherMouse = document.createElement('div'); 
    document.body.appendChild(otherMouse);
    otherMouse.id = selector;
    otherMouse.textContent = socketID;
  }
  otherMouse.style.position = 'fixed';
  otherMouse.style.top = y + 'px';
  otherMouse.style.left = x + 'px';

  console.log(data);
}

function main() {
  const btn = document.querySelector("input[type='button']");
  btn.addEventListener("click", handleClick);
  socket.on('chat', handleChat);
  socket.on('movement', handleMovement);
}

function handleMouseMove(evt) {
  const {x, y} = evt;
  socket.emit('movement', {x, y})
  // console.log(x, y);
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener("DOMContentLoaded", main);
/*
// respond to count events
// call some function (takes one arg, which data from emit)
function handleCount(data) {
  document.body.textContent = data.count;
}

socket.on('count', handleCount);
*/
