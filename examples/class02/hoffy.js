/*
const numbers = [3, 5, 7];
function logStuff(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
logStuff(numbers);
function logDouble(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i] * 2);
  }
}
logDouble(numbers);
*/
/*
const numbers = [3, 5, 7];
function myForEach(arr, action) {
  for(let i = 0; i < arr.length; i++) {
    action(arr[i]); 
    // console.log(arr[i] * 2);
  }
}
*/
// myForEach(numbers, console.log);
/*
function logDouble(n) {
  console.log(n * 2);
}
*/
// myForEach(numbers, logDouble);
// myForEach(numbers, n => console.log(n * 2));

/*
for(const n of numbers) {

}
*/

/*
numbers.forEach

* you can't continue
* you can't return
* you can't break
* */
/*
An iterable function is an object that has the property

[Symbol.iterator]

that property is a function that returns an "Iterator"

Iterator is an object that implements a function called next

next returns the next element in the Iterator as object

{val: 3 ,done: False}
*/
/*
take an array and give back a new array with all elements passing some condition include (other elements that don't pass, excluded)

*/
/*
// f is a function that returns whether not its argument is less than 4
// (returns a boolean)
const result = mystery(numbers, n => n > 4);
// console.log(result);
// result = [5, 7]
function mystery(arr, test) {
  const newArr = [];
  for(const ele of arr) {
    if(test(ele)) {
      newArr.push(ele); 
    }
  }
  return newArr;
}
*/

/*
let acc = 0;
let acc;
for(const n of numbers) {
  acc += n;
}
console.log(acc);

total = 0
n = 3
total = 3
n = 5
total = 8
const result = numbers.reduce(function(total, n) {
  // give back the new value of the accumulator
  // (the new value of total)
  return total + n;
}, 0);

console.log(result);

const squares = numbers.reduce(function(total, n) {
  // give back the new value of the accumulator
  // (the new value of total)
  return [...total, n * n];
}, []);
console.log(squares);
*/
/*
reduce(f, initialValueForAccumulator)

f(acc, curVal)
*/

/*
reduce will take an array an accumulate all of its elements into a single
value

that value can be anything (number, another Array, an object, etc.)
*/


/*
X forEach (use for of)
> filter
> map
> reduce
*/
/*
function makeAdder(n) {
  return x => n + x;
}
const addFive = makeAdder(5);
console.log(addFive(1));
*/
/*
caching function
a function that caches its return values based on arguments
however... if the arguments are the same as some previous call
then use the cached return value instead of running body

create a function that makes another function a caching function

 */
function factorial(n) {
  if(n === 0) {
    return 1;
  } else {
    let acc = 1; 
    for(let i = 1; i <= n; i++) {
      acc *= i;
    } 
    return acc;
  }
}
const cachedFactorial = cachify(factorial);
console.log(cachedFactorial(3)); // 6
console.log(cachedFactorial(3)); 
console.log(cachedFactorial(4)); 
console.log(cachedFactorial(4)); 

function cachify(oldFunc) {
  const cache = {};
  function newFunc(...args) {
    console.log(cache);
    const k = JSON.stringify(args);
    if(cache.hasOwnProperty(k)) {
      console.log('cache hit!');
      return cache[k];
    } else {
      const ret = oldFunc(...args);
      cache[k] = ret;
      return ret;
    }
  }
  return newFunc;
}


































































