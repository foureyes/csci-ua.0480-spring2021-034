function MyError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
// MyError.prototype = Object.create(Error.prototype); // new Error();
MyError.prototype = new Error();
MyError.name = "MyError";

function makeError() {
  throw new MyError('blah');
}

try {
  makeError();

} catch(e) {
  console.log('hi', e, e instanceof MyError);
}
var funcs = [];
// creating three functions, each should log 1
for (var i = 0; i < 3; i++) {
  funcs[i] = function() {
    console.log("My value: " + i);
  };
}

// but what?
for (var j = 0; j < 3; j++) {
  funcs[j]();
}
