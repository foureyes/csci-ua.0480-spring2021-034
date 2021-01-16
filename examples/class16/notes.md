* repository is empty ... it's ok if there's nothing in the repository
* mongodb
	* no authentication (for grading this is ok)
	* you can implement it, but:
		* conditionally configures your app based on environment variable
		* environment variable will determine whether to read a configuration file with u and p
		* or to just connect normally
* name value pair that exists for your os or running process
	* a different environment may be brought up depending on how you run your process

Authentication vs Authorization
====
* AuthN - you are who you say you are
* AuthZ - are you allowed to do this thing

Authentication on the web

* username / password
* 2FA - know + have (username and password + hardware - fob or phone or whatever)
* biometrics ----^^^?
* have a 3rd party vouch for your identity ...
	* social media - facebook, twitter, github, google

Sensitive Information Being Transmitted to You 
(if you do anything on the web)

* make sure that the connection is encrypted (via TLS/SSL)
* agree on which cryptographic protocols to use and what versions
* the server will provide the client with a cert ... ensuring that the server is who they say they are
	* some trusted third party cryptographically signs a certificate...
		* geotrust
		* digicert
		* letsencrypt
	* server presents that certificate
* the browser is satisifed... so keys are exchanged
* encrypted communication can begin


store username and password in database
=====

const UserSchema = mongoose.Schema({
	username: String,
	password: String,
}); 

const u = new User({
	username: 'jversoza',
	password: 'myawesomepassword'
});


if someone has access to your database and passwords are in clear text... then that person
has allllll the passwords

* employees that have access to data may abuse their access
* unauthorized will probably occur at some point in time
* leaking of backup data

hashing vs encrypting
one way .... two way
             server can decrypt the message

we use hashing to ensure that if database is accessed, then passwords cannot be retrieved from hash (again hashing is one way)

to reg:

1. user enters username and password
2. server adds salt to password
3. server hashes resulting string
4. server saves hash, salt and username

a salt has to be generated per user per password

to login: compare hashes

1. user enters username and password
2. server retrieves hash based on username
	* server retrieves salt based on username
3. server adds salt to input password
	* server hashes resulting string
4. compare hashes to determine login

* can't be reversed
* collision resistant
* computationally difficult to generate

come up with every permutation of every possible password string (maybe 8 or 12 chars)
hash that permutation  <---- 

don't ever create your own hashing algorithm
times change:
* computational power increases
* new algorithms created

use convention for particular time (whatever the contemporary hashing algo is)

* bcrypt




to login: compare hashes

1. user enters username and password
2. server retrieves hash based on username
	* server retrieves salt based on username
3. server adds salt to input password
	* server hashes resulting string
4. compare hashes to determine login
5. if hashes match....
	* generate a session id
	* store some info about that user in the session store (username, preferences, id)
	* send the session id back via Set-Cookie



I'm already logged ... go to some page
Cookie: sessid=foooooo

1. server will check for sessid
2. check for that in session store (another db, or in memory)
3. if exists, then we know this person is already logged in ... so we can show logged in templates


httponly

app.post('/register'.... 

	User.find(err, res, count  =>  (
	
			const u = new User({
				username: req.body.username`	
				passowrd: bcrypt(req.body.password + salt())
			
			})
	))
)

build vs buy
buying / cots usually a good idea

passport

* a pluggable authentication libraries
* creating a user (reg)
* authentication (login)
* maintaining an authenticated session
* serializing / deserializing data from session store
* you can select an auth strategy

passport-local

* strategy for username password from a local database


passport-local-mongoose

* using mongodb and mongoose for local database auth



























salt - a random string that you prepend / append to password prior to hashing









































































