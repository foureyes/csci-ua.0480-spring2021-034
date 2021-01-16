* hw05 - repos are empty, ok if there's a warning re: this
* mongodb
	* no authentication
	* add authentication by following the documentation

* to config your app
* create a file that's not in version control
* (multiple files) 
	* development - config-dev.json
	* testing  - testing-dev.json // contain credentials and other config stuff
	* production 
	* "grader's"

environment variables
====
name value pairs in the context of a running process (a node app, your shell, your os)

Authorization vs Authentication
====
AuthN - is the person who they say they are?
AuthZ - can this person do _this thing_?

Authentication on the Web
====
* username and password
* biometrics
* 2FA - something you know + have (password + hardware)
* facebook / google

If you're on the web, use tls/ssl for application
(esp. if you're transmitting sensitive data)

* client and the server agree on which cryptographic protocols to use
 (what version)
* server says... I'm me! by sending back a certificate, signed by some
 trusted third party
* keys are exchanged
* encrypted communication can error
































