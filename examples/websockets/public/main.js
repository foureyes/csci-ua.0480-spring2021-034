const sock = io();

/*
sock.on('count', (data) => {
  document.body.textContent = data.count + '!!!!!';
});
*/

function handleChat(data) {
  console.log('handle chat', data);
  const messagesDiv = document.querySelector("#messages");
  const div = document.body.appendChild(document.createElement('div'));
  div.textContent = data.message;
}

function handleClick(evt) {
  const val = document.querySelector("#message").value;
  console.log(val);
  sock.emit('chat', {message: val});
}

function main() {
  const btn =  document.querySelector("input[type='button']");
  btn.addEventListener('click', handleClick);
  sock.on('chat', handleChat);
  sock.on('mouseMoved', handleOtherMouseMoved);
}

function handleOtherMouseMoved(data) {
  const {x, y, sockID} = data;
  const pointerID = 'mouse-' + data.sockID;
  let otherMouse = document.querySelector('#' + pointerID);
  if(!otherMouse) {
    otherMouse = document.createElement('div');
    otherMouse.textContent = sockID;
    otherMouse.id = pointerID;
    document.body.appendChild(otherMouse);
  }
  otherMouse.style.position = 'fixed'; 
  otherMouse.style.top = x + 'px'; 
  otherMouse.style.left = y + 'px'; 
}

function handleMouseMove(evt) {
  const {x, y} = evt;
  sock.emit('mouseMoved', {x, y});
}
document.addEventListener('mousemove', handleMouseMove);

document.addEventListener("DOMContentLoaded", main);
