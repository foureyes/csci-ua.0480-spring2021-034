function Player(name) {
  this.name = name;
  this.playerMoves = [];
  this.opponentMoves = [];
}

Player.prototype.getNextMove = function() { return 'R' }

Player.prototype.move = function() {
  var nextMove = this.getNextMove();
  this.playerMoves.push(nextMove);
  return nextMove;
}

Player.prototype.recordOpponentMove = function(opponentMove) {
  this.opponentMoves.push(opponentMove);
}

function HistoryRepeatsItselfPlayer(name) { 
  Player.call(this, name);
}

HistoryRepeatsItselfPlayer.prototype = Object.create(Player.prototype);
HistoryRepeatsItselfPlayer.prototype.winningMoves = {R:'P', P:'S', S:'R'};
HistoryRepeatsItselfPlayer.prototype.getNextMove = function() {
  if(this.opponentMoves.length > 0) {
    return this.winningMoves[this.opponentMoves[this.opponentMoves.length - 1]]; 
  } else {
    return Object.keys(this.winningMoves)[Math.floor(Math.random() * 3)];
  }
}

var nancy = new Player('Normal Nancy');
console.log(nancy.name);
console.log("---------");
console.log("Nancy always plays rock: " + nancy.move());
nancy.recordOpponentMove('P');
console.log("Nancy always plays rock, regardless of her opponent's last move: " + nancy.move());
console.log("All of Nancy's moves so far: ", nancy.playerMoves);
console.log("All of her opponent's moves so far: ", nancy.opponentMoves);
console.log("\n...\n");
var tabitha = new HistoryRepeatsItselfPlayer('Timely Tabitha');
console.log(tabitha.name);
console.log("---------");
console.log("Tabitha's first move should be random: " + tabitha.move());
tabitha.recordOpponentMove('R');
console.log("If her last opponent's move was rock, she'll play paper: " + tabitha.move());
tabitha.recordOpponentMove('P');
console.log("If her last opponent's move was paper, she'll play scissors: " + tabitha.move());
console.log("All of Tabitha's moves so far: ", tabitha.playerMoves);
console.log("All of her opponent's moves so far: ", tabitha.opponentMoves);
console.log("\n...\n");


function LookAtPreviousMoveStrategy() { }

LookAtPreviousMoveStrategy.prototype.getNextMove = function(playerMoves, opponentMoves) {
  if(opponentMoves.length > 0) {
    return this.winningMoves[opponentMoves[opponentMoves.length - 1]]; 
  } else {
    return Object.keys(this.winningMoves)[Math.floor(Math.random() * 3)];
  }
}

LookAtPreviousMoveStrategy.prototype.winningMoves = {R:'P', P:'S', S:'R'};

function StrategyPlayer(name, strategy) {
  this.name = name;
  this.playerMoves = [];
  this.opponentMoves = [];
  this.strategy = strategy;
}

StrategyPlayer.prototype.getNextMove = function() { 
  return this.strategy.getNextMove(this.playerMoves, this.opponentMoves);
}

StrategyPlayer.prototype.move = function() {
  var nextMove = this.getNextMove();
  this.playerMoves.push(nextMove);
  return nextMove;
}

StrategyPlayer.prototype.recordOpponentMove = function(opponentMove) {
  this.opponentMoves.push(opponentMove);
}


var patty = new StrategyPlayer('Previous Patty', new LookAtPreviousMoveStrategy());
console.log(patty.name);
console.log("---------");
console.log("Tabitha's first move should be random: " + patty.move());
patty.recordOpponentMove('R');
console.log("If her last opponent's move was rock, she'll play paper: " + patty.move());
patty.recordOpponentMove('P');
console.log("If her last opponent's move was paper, she'll play scissors: " + patty.move());
console.log("All of Tabitha's moves so far: ", patty.playerMoves);
console.log("All of her opponent's moves so far: ", patty.opponentMoves);
console.log("\n...\n");

/*
function A() {
  this.b = new B();
}

A.prototype.sayHello = function() {
  this.b.sayHello();
}

function B() { }

B.prototype.sayHello = function() {
  console.log('hello');
}

var a = new A();
a.sayHello();


function A() {

}

function B() {

}
*/
function A(b, c) {
	this.b = b;
	this.c = c;
}

A.prototype.foo = function() {
	this.b.bar();
	this.c.qux();
}

function B() {}
B.prototype.bar = function() { console.log('bar');}

function C() {}
C.prototype.qux = function() { console.log('qux');}

obj = new A(new B(), new C());
obj.foo();
