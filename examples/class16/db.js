const mongoose = require('mongoose');
const fs = require('fs');

const UserSchema = mongoose.Schema({
  username: String,
  password: String
}); 

const u = new User({
  username: req.body.username, // jversoza
  password: bcrypt(req.body.password), // uguessedrite!
});

u.save((err, newUser) => {
  res.render('account')'
})

{
  username: jversoza
  passwords: uguessedrite!
}

hash ... encrypt
1 way    2 way


1. username and password
2. server will get the user from the db based username
3. ...  now we have password hash
4. ... if the password that was entered is hashed as well
5. it should match the stored hash for login to work

abcdefg....
cdefghi

dad
fcf


bcrypt

md5
sha1 ---> when you get a hash, you can't "reverse" a hash directly


prevent brute forcing

come up with every permutation of characters up to some length
or use common passwords!
then HASH that <---------
look for precomputed hashes!!!!
then check against hash in db


* generate a salt (a random string... a timestamp)
* prepend or append to clear text password
* THEN hash


reg
====
* user enters username and password
* server generates salt
* server adds salt to password
* server hashes salted password
* server saves hash, salt and username


login
=====
* user enters username and password
* server looks up user based on username
* server uses salt from database (that's associated username)
* adds salt to incoming password
* hashes salted incoming password
* compare hashes
* same ... login is good
* server will generate a session id
* it will store user data based on session id in a session store (on the server... as a database or in memory)
  * username
  * some preferences
* send back Set-Cookie: ... session id















































// if we don't know the env (we're grading)
// then the default conn string has no authentication
// included
let dbConn = 'mongodb://localhost/hw05';

console.log(process.env.NODE_ENV); 
if(process.env.NODE_ENV === 'DEV') {
  // read from config-dev.json
  fs.readFile('config-dev.json', (err, data) => {
    const conf = JSON.parse(data); 
    dbConn = conf.dbConn; 
  }); 
} 
// mongoose.connect(dbConn);



* passport
  * registration
  * authentication ... login
  * authenticated session management
  * logout
  * serializing and deserializing user data from session store 
  * use authentication strategy (local, facebook, google)
* passport-local
  * retrieve and write username and password (in a secure fashion)
  * username and password in a local data store
* passport-local-mongoose
  * for mongodb and mongoose









