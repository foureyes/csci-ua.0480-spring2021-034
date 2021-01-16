/*
// create a promise, use constructor
// 1 argument, a function, called the executor
// this function has 2 arguments
// * a function to call when task completes successfully
// * a function to call when it does not complete successfully
const p = new Promise(function(fulfill, reject) {
  // within here, do ur async task: read a file, get a url, whatevz
  // when task completes successfully, call fulfill (with whatever value u want... to represent completed task)
  // when there's an error, call reject (with some error message)
  // fulfill('hello promises!');
  reject('uh oh... error!!!!');
});

// to set fulfill and reject, call then (a method) on the promise
// the first arg is fullfill, the second is reject
p.then(console.log, function(val){
  console.log('something bad happened');
  console.log(val);
});
// the then method ALWAYS returns a promise.....
// usually that will be whatever is returned by fulfill
// but sometimes fulfill doesn't return a promise
*/
// THEN WILL ALWAYS RETURN A PROMISE
const p = new Promise(function(fulfill, reject) {
  fulfill(1);
});


const p2 = p.then(function(val) {
  console.log(val);
  // this is what then will return
  // regardless of what this returns, it will always wrap it in a promise
  // (promise immediately fulfills with return value)
  return 2;
  /*
  return new Promise(function(fulfill, reject) {
    fulfill(2); 
  });
  */
});

p2.then(console.log);





























