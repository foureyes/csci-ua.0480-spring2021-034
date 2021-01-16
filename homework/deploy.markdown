---
layout: homework
title: Final Project Deployment
nav-state: "Final Project Deployment"
---
<style>

.warning {
    background-color: #eecccc;
}

pre {
  display: inline-block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 15px;
  word-break: break-all;
  word-wrap: break-word;
  background-color: rgb(224, 229, 234);  
  color: #001446;
  border-radius: 4px;
  border: none !important;
}

#final h3 {
}

section {
  padding-left: 1em;
}
</style>
<div id="final" class="panel panel-default">
  <div class="panel-heading">Final Project</div>
  <div class="panel-body" markdown="block">

## Final Project Deployment

These instructions detail deployment to Courant's compute and assignment servers. __If you'd like to deploy elsewhere (your own server, AWS, etc.), please let me know by sending a direct message on piazza.__ 

Deployment __to Courant's compute and assignment servers__ involves the following steps:

1. Finding your assigned server and port number 
2. Logging in to the server and prepping your home directory
3. Creating a database for your project
4. Getting your project onto the server
5. Installing your project's dependencies
6. Configuring your project
7. Running your project as a daemon
8. Reinstalling and/or redeploying


### Part 1: Finding your assigned server and port number

<section markdown="block">
Courant's compute / assignment servers are shared, so other students will be running their projects on it. Consequently, to run your node web application, you'll have run it on a port number and server that's been assigned to you.

There are multiple potential servers that can host assignments. See the [documentation](https://cims.nyu.edu/webapps/content/systems/resources/computeservers) on compute servers. These can only be accessed via ssh by going through another host, cims.nyu.edu. 

To determine which port number and server, see the milestone #2 announcement on piazza:

1. Log in to piazza
2. Go to the pinned post announcing <code>Final Project Deployment Ports</code>
3. User the link to the port retrieval page and the password supplied in the post

</section>


### Part 2: Logging in to cims and prepping your home directory

<section markdown="block">

We'll be using ssh, a commandline tool that allows you to login to and run commands on a remote server, to access your server. If you're on windows, a popular ssh client is [putty](http://www.putty.org/). You'll need a "cims" account to log in to any of these compute/assignment servers. You _should_ have one already created for you.


1. You can retrieve your credentials by going to [https://cims.nyu.edu/webapps/password](https://cims.nyu.edu/webapps/password) first
    * use your netid to log in
    * save the credentials that you receive
    * if the above does not work or if you need to reset the password that was given to you from the above page, you can go to [https://cims.nyu.edu/webapps/password/reset](https://cims.nyu.edu/webapps/password/reset)
  * if you receive an error saying that your account does not exist:
	* try using this flowchart to troubleshoot:	https://cims.nyu.edu/cms_content/cims-account-access-troubleshooting.pdf
		* yes, I know it _looks_ complicated, but follow along to make sure there's really a system related issue
	* if that still doesn't work, send me a note with:
		* all of the solutions you've tried
		* along with your username and netid (do not send me your password)
	* I will contact helpdesk@ on your behalf
2. To access your assigned server, you must first ssh to `access.cims.nyu.edu`... and then from there, ssh to your _actual_ server:
    * `ssh your_username@access.cims.nyu.edu`
    * once you've logged in... use ssh again
    * `ssh your_username@your_assigned_server` 
3. Once you've logged in, create the following directories in your home directory: 
  * <code>var/log</code> a directory to dump your application logs
  * <code>usr/local/lib</code> to store all of your "global" node modules
  * <code>opt</code> ... as the directory where you'll install your web application
  * run the following command to create the directories specified above (note that `~` means your _home directory_):
        <br>
    <pre><code>mkdir -p ~/var/log
mkdir -p ~/usr/local/lib
mkdir ~/opt</code></pre>

4. Verify that these directories exist by running:

  <pre><code>ls ~</code></pre>

  Should show:

  <pre><code>opt  usr  var</code></pre>

5. <span class="warning">The version of node on the servers currently doesn't support ES6.</span>
    * consequently, you'll have to install the most current version of node
    * you can do this by installing and using a tool called [node version manager, or nvm](https://github.com/creationix/nvm)
    * to install:
        * `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
`
    * to get the latest version of node
        * `. ~/.nvm/nvm.sh`
        * `nvm install node`
</section>

### Part 3: Creating a database for your project

<section markdown="block">

You'll have your own database on an instance of __mongod__ running on one of Courant's server. You don't have to keep the database running like you do locally; that's already taken care of for you. 

1. [Follow these instructions for initializing your mongoDB database on the server](https://cims.nyu.edu/webapps/content/systems/userservices/databases/class-mongodb)
2. __Make sure you keep the password that's given to you after you follow the above instructions.__ (ideally, in a password safe)
3. To test connectivity, you can try connecting to your database while your ssh'd in to the server:

  <pre><code>module load mongodb-3.2.0
mongo &lt;dbname&gt; --host class-mongodb.cims.nyu.edu -u &lt;username&gt; -p
</code></pre>

4. You should see your MongoDB shell if you're able to successfully connect!
5. If you see the following error `Failed global initialization: BadValue Invalid or no user locale set. Please ensure LANG and/or LC_* environment variables are set correctly.` ... try setting your locale (default language - like English) with `export LC_ALL=C` before running the `mongo` commandline client on the server

</section>

### Part 4: Using an external configuration file for your database, configuring the port number

<section markdown="block">
Because the mongodb server you'll connect to from the server requires user authentication, the string you pass in to `mongoose.connect` (your __database connection string__) will have to include the username and password you were given from the previous section, Part 3. The new connection string will have the following format:

<pre><code data-trim contenteditable>mongodb://USERNAME:PASSWORD@class-mongodb.cims.nyu.edu/USERNAME
</code></pre>

Where:

* `USERNAME` - is the username you used for logging it to the server
* `PASSWORD` - is the password for __mongodb__ that you created from Part 3.

<span class="warning">The name of your database is the same as your username!</span>

However, you should not put these credentials directly into your `db.js` file, and they should not be in a file in version control (you may inadvertently disclose these credentials if your repository becomes public). One way to deal with this issue is to put your credential in an external file that is conditionally read:

1. add a conditional to your database configuration code that...
2. checks if an environment variable named `NODE_ENV` is set to `PRODUCTION`
    * [read the excellent digital ocean summary regarding environment variables](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)
    * use [process.env.NAME_OF_VARIABLE] to access environment variables through node
3. if the above is true, then read a file synchronously (blocking) by using [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_file_options)
4. the file that is read in will be a `json` file that's not in version control... that contains the database connection string for your application when deployed on the server

(Note that this is a simple way of managing configuration, so if you plan on _actually_ deploying your app outside of this class, consider using a configuration / configuration management library, like [node-convict](https://github.com/mozilla/node-convict))

__To add an external configuration file, follow these steps__ &rarr;

1. add `config.json` to your `.gitignore` so that your credentials don't inadvertently get committed
2. in `db.js` add the following code before `mongoose.connect`:
    <pre><code data-trim contenteditable>// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/YOUR_DATABASE_NAME_HERE';
}
</code></pre>
3. when you use `mongoose.connect`, pass in `dbconf` as the argument instead of a hardcoded string
    * `mongoose.connect(dbconf);`
4. you can test that everything works by:
    * try running your application __locally__ (on your own computer) without any environment variables (just use `node app.js` or `./bin/www`)
        * ... and inserting data
        * via your form
        * (make sure the data persists)
    * create a `config.json` that contains a connection string with a different database name (change the last part, after localhost, to a different database name, like `mongodb://localhost/finalprojectconfig`)
        * the key should be `"dbconf"` (remember that json keys are double quoted)
        * the value should be `"mongodb://localhost/SOME_OTHER_DATABASE_NAME"`
        * `{"dbconf":"mongodb://localhost/SOME_OTHER_DATABASE_NAME"}
    * then, run your application again, this time forcing your app to use the config file
        * `NODE_ENV=PRODUCTION node app.js` or `NODE_ENV=PRODUCTION ./bin/www`
    * the new database shouldn't have any data that you entered previously!
    * __DO NOT COMMIT__ `config.json` (in fact, it should be in your `.gitignore` as the previous instructions specify)
    * (you'll create a `config.json` on the server)
5. Finally, because you'll want to use a custom port number, <span class="warning">you'll have to modify your app.listen call so that it uses an environment variable</span>
    * change your call to `app.listen` so that it checks for an environment variable, `PORT`, first... otherwise, default to 300
    * `app.listen(process.env.PORT || 3000);`
5. commit and push your code


</section>

### Part 5: Getting your project onto the server

<section markdown="block">

1. <span class="warning">make sure you're logged in to you remote server (linserv1 or linserv2)</span> via ssh (remember, you have to ssh to access.cims.nyu.edu first, then ssh to your server)


2. Clone your repository into your opt directory (you can find your full repository name on GitHub). Remember to substitute <code>REPOSITORY_NAME</code> with your actual repository name:

  <pre><code>cd ~/opt
git clone https://github.com/nyu-csci-ua-0480-SECTION-SEMESTER-YEAR/REPOSITORY_NAME</code></pre>

3. Alternatively, you can use <code>sftp</code> or <code>scp</code> to transfer files to the server

</section>

### Part 6: Installing your project's dependencies

<section markdown="block">
<span class="warning">Before installing your project's dependencies, make sure you're using the right version of node.</span> and that <span class="warning">you're logged in to the right server - either linserv1 or linserv2</span>. 

1. check your node version with `node -v`
2. it should be grader than `6.x.x`
3. if it isn't, make sure that you installed the latest node with `nvm` from the beginning of these instructions
4. if you already installed, then try running your installed nvm: `. ~/.nvm/nvm.sh`

Just like local development, you'll have to install your projects dependencies. Replace <code>REPOSITORY_NAME</code> with your project's actual repository name in the following command.

<pre><code>cd ~/opt/REPOSITORY_NAME/ && npm install</code></pre>

(basically... just go to the same directory that your `package.json` is in... and install from there.

</section>

### Part 7: Configuring your project

<section markdown="block">

Create a <code>config.js</code> file on the server to add the `PRODUCTION` version of your mongodb connection string. You can use a commandline text editor, like <code>nano</code>, <code>vim</code> or <code>emacs</code>. We'll use <code>nano</code> in these examples (but you can use vim or emacs as well). 

Again, <span class="warning">make sure you're logged in to you remote server (linserv1 or linserv2)</span> via ssh (remember, you have to ssh to access.cims.nyu.edu first, then ssh to your server). Do not run these commands if your are only logged in to cims.

1. In your project directory, create and open your file by:
    <br>
    <pre><code>nano config.json</code></pre>
2. Then add your connection string so that it includes username and password (that you retrieved above):
  <br>
    <pre><code>{"dbconf":"mongodb://jversoza:my_password@class-mongodb.cims.nyu.edu/jversoza"}</code></pre>
3. <span class="warning">Remember, the name of your database is the same as your username!</span>
4. Save it by <code>CONTROL+O</code> to _write out_ the file. Press <code>RETURN/ENTER</code> to accept the file name.
5. Quit <code>nano</code> by <code>CONTROL+X</code>
6. Test your application. Substitute <code>APP_PORT_NUMBER</code> with the port number you retrieved from Part 1 and add the environment variable, `NODE_ENV`.
  * Use <code>node app.js</code>. __Don't use nodemon to run it.__
    <br>
        <pre><code>PORT=APP_PORT_NUMBER NODE_ENV=PRODUCTION node app.js</code></pre>
  * If it starts up fine, try connecting to it from your browser: 
        <br>
    <pre><code>http://server_name:APP_PORT_NUMBER/</code></pre>
  * So something like: `http://linserv1.cims.nyu.edu:NNNNN` where `NNNNN` is your port number
6. Troubleshooting:
  * If you see the following error 
        <br>
    <pre><code data-trim contenteditable>/home/net_id/opt/final-project/node_modules/mongoose/node_modules/mongodb/lib/server.js:235
        process.nextTick(function() { throw err; })
Error: connect ECONNREFUSED
    at errnoException (net.js:905:11)
    at Object.afterConnect [as oncomplete] (net.js:896:19)</code></pre>
    You can't connect to your database; double check your mongoose connection string... and review part 3.
  * If you see <code>Error: listen EADDRINUSE</code> ... the port you've been assigned is already in use. Either your application is already running or someone inadvertently is running there application on your port. Contact me if it's the latter.
  
</section>

### Part 8: Running your project as a daemon

<span class="warning">Make sure you're logged in to you remote server (linserv1 or linserv2)</span> via ssh (remember, you have to ssh to access.cims.nyu.edu first, then ssh to your server) before proceeding.

<section markdown="block">

In order to have your project run even when you're not logged in to the server through an interactive shell, you'll have to run it as a daemon. We'll use a node module called <code>forever</code> to do this. It will run your application in the background and give you tools to manage it (start and stop).

1. Install <code>forever</code>:

  <pre><code>cd ~/usr/local/lib/
npm install forever</code></pre>

2. Run your app with <code>forever start</code>. Substitute <code>APP_PORT_NUMBER</code> with your actual port number. Note the <code>-o</code> and <code>-e</code> options; they specify where your application's output (debug and error output) should go. The first version is with `app.js` (without express generator), and the second is with `bin/www`

  <pre><code>cd ~/opt/final-project/
export PORT=APP_PORT_NUMBER; export NODE_ENV=PRODUCTION; ~/usr/local/lib/node_modules/.bin/forever -o ~/var/log/app.log -e ~/var/log/app_error.log start app.js</code></pre>

  <pre><code>cd ~/opt/final-project/
export PORT=APP_PORT_NUMBER; export NODE_ENV=PRODUCTION; ~/usr/local/lib/node_modules/.bin/forever -o ~/var/log/app.log -e ~/var/log/app_error.log start bin/www</code></pre>

3. Check that everything started up fine by looking for the process id, and then checking the log files.

  <pre><code>ps aux | grep forever | grep -v grep</code></pre>

  Your application would usually log debug lines and errors to the console. However, since you're running your app as a daemon, all of that output is now dumped into log files, which are in <code>~/var/log</code>. To view the last few lines of the error and app log:

  <pre><code>tail ~/var/log/app.log ~/var/log/app_error.log</code></pre>

4. Listing managed apps and Stopping <code>forever</code> / shutting down your app:

  <pre><code data-trim contenteditable># show managed apps
~/usr/local/lib/node_modules/.bin/forever list
# stop all apps
~/usr/local/lib/node_modules/.bin/forever stopall
</code></pre>

5. Viewing error logs and debug statements.

  For all logs:

  <pre><code>cat ~/var/log/app.log ~/var/log/app_error.log</code></pre>

  For just the last few lines:

  <pre><code>tail ~/var/log/app.log ~/var/log/app_error.log</code></pre>

6. Viewing error logs and debug statements _as they happen_ use the <code>-f</code> flag with <code>tail</code>. __This is super useful for debugging.__ 

  <pre><code>tail ~/var/log/app.log ~/var/log/app_error.log</code></pre>

7. (Optional) Want to have <code>forever</code> accessible in your path? Add <code>PATH=$PATH:home/jjv222/usr/local/lib/node_modules/.bin/</code> to your <code>.bash_profile</code>

</section>

### Part 8: Reinstalling and/or redeploying
<section markdown="block">

1. If you'd like to __reinstall__  your application (again, with <code>REPOSITORY_NAME</code> replaced with your repository name):

  1. <code>rm -rf ~/opt/REPOSITORY_NAME</code>
  2. go back to Part 5

2. If you'd like to simply __redeploy__ or __update__ your application, run <code>git pull</code> to update your code on the server:
    1. `cd ~/opt/REPOSITORY_NAME`
    2. `git pull`

</section>
</div>
</div>

