/*
var players = [
{"lastName":"Duncan", "team":"Spurs", "FGM":5, "FGA":10},
{"lastName":"Parker", "team":"Spurs", "FGM":7, "FGA":18},
{"lastName":"Ginobili", "team":"Spurs", "FGM":6, "FGA":11},
{"lastName":"James", "team":"Heat", "FGM":10, "FGA":21},
{"lastName":"Wade", "team":"Heat", "FGM":4, "FGA":12},
{"lastName":"Bosh", "team":"Heat", "FGM":6, "FGA":14}
];
function heat(player) { return player.team === 'Heat'; }
function spurs(player) { return player.team === 'Spurs'; }
function shootingPercentage(player) { return player.FGM / player.FGA; }
function sum(curTotal, num) { return curTotal + num}
function average(arr) { return arr.reduce(sum, 0) / arr.length; 
}
console.log(average(players.filter(heat).map(shootingPercentage)).toFixed(2));
console.log(average(players.filter(spurs).map(shootingPercentage)).toFixed(2));

function inTeam(teamName) {
  return function(player) { return player.team === teamName; }
}
console.log(average(players.filter(inTeam('Heat')).map(shootingPercentage)).toFixed(2));
console.log(average(players.filter(inTeam('Spurs')).map(shootingPercentage)).toFixed(2));

function f() {
  Array.prototype.forEach.call(arguments, function(ele) {
    console.log(ele);
  });
}

f(2, 4, 6);


function timeIt(f) {
  return function() {
    console.time('f');
    var retVal = f.apply(null, arguments);
    console.timeEnd('f');
    return retVal;
  };
}
function wasteTime(start, limit) { for(var i=start; i<limit;i++){2 * 2;}}
wasteTime = timeIt(wasteTime);
wasteTime(-5000000, 5000000);
var x = 0;
function blah(x) {
  x = x + 1;
}
blah(x);
console.log(x);

console.log(global)
  function oopsGlobal() {
      mistake = "yup";
  }
oopsGlobal();
console.log(mistake);
console.log(global.mistake);

function f() {
  return this;
}
console.log(f());

list = require('./class5-list.js');
console.log("called from class5");
list.prepend();

var werewolf = {
  hairy:"true",
  howl: function(thing) {console.log('howls at ' + thing)}
}

var sadWerewolf = Object.create(werewolf);
sadWerewolf.howl('thang');

console.log(Object.getPrototypeOf(sadWerewolf) === werewolf);
*/

function Werewolf(m) {
  this.mood = m;
}

var w = new Werewolf('happy');
console.log(w.mood);
console.log(Object.getPrototypeOf(w));
console.log(w.__proto__);
