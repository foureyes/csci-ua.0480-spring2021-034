

/*
function delayedShout(s) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(
    () => {
      const shout = `${s.toUpperCase()}!!!`
      console.log(shout);
    }, 
    delay
  );
}

console.log('before');
delayedShout('foo');
console.log('after');
*/

/*
function delayedShout(s, cb) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(
    () => {
      const shout = `${s.toUpperCase()}!!!`
      console.log(shout);
      cb();
    }, 
    delay
  );
}

console.log('before');
delayedShout('foo', () => console.log('after'));
*/

/*
function delayedShout(s, cb) {
  // ~1.5 to ~3.5 seconds
  const delay = 1000 + Math.random() * 2000;
  setTimeout(
    () => {
      if(s.length == 0) {
        throw 'empty string';
      }
      const shout = `${s.toUpperCase()}!!!`
      console.log(shout);
      cb();
    }, 
    delay
  );
}

console.log('before');
try {
  delayedShout('', () => console.log('after'));
} catch(e) {
  console.log(e); 
}
*
*/















