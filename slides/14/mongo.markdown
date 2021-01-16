---
layout: slides
title: "MongoDB"
---

<section markdown="block" class="intro-slide">
# {{ page.title }}

### {{ site.vars.course_number}}-{{ site.vars.course_section }}

<p><small></small></p>
</section>

<section markdown="block">
## So You Want to Persist Data

In our homework and class examples, __where did we store our data__? &rarr;

* {:.fragment} in a global variable in our Express application
* {:.fragment} __and where does that application live?__ &rarr;
* {:.fragment} in memory!

<br>
__What are some downsides to storing data as part of our application in memory?__ &rarr;
{:.fragment}

* when you restart the server, you lose that data!
{:.fragment}
</section>

<section markdown="block">
## Storing Data

__What are some other options... let's list as many as we can.__ &rarr;

* {:.fragment} on the filesystem
* {:.fragment} _in the cloud_ (S3, firebase, <strike>parse</strike>, SalesForce)
* {:.fragment} in a database

<br>

__We'll be using a database in this part of the class...__ 
{:.fragment}
</section>

<section markdown="block">
## SO MANY DATABASES

__We can categorize databases as:__ &rarr;

* relational
* nosql (also _non-relational_)
{:.fragment}

<br>
__nosql databases can be further categorized by the data model they use:__ &rarr;
{:.fragment}

* {:.fragment} key-value
* {:.fragment} document
* {:.fragment} column
* {:.fragment} graph

</section>
<section markdown="block">
## Warning: Broad Generalizations Coming Up!

So, the following slides include high level overviews of different kinds of databases.

* I'm going to use __broad generalizations__
* __but there are _always_ exceptions__ &rarr;
* {:.fragment} for example:
	* {:.fragment} although PostgreSQL is considered a relational databases, it has a built-in data type for key-value storage!
	* {:.fragment} many document stores can be used as key-value stores
	* {:.fragment} some document stores are also relational!

</section>

<section markdown="block">
## Relational Databases

__Relational databases__ organize data in a collection of tables (relations).  __Can you describe characterstics of a relational database?__ &rarr;

* {:.fragment} each table has named columns... with the actual data that populates the table in separate rows
* {:.fragment} each table row has __primary key__ that:
	* {:.fragment} uniquely identifies that row 
	* {:.fragment} allows data in one table to be _related_ to data in another (via _foreign key_ relationships)

</section>

<section markdown="block">
## Relational Databases Continued

__Regarding additional relational database features...__ &rarr;

* {:.fragment} relational databases are typically pretty rigid:
	* {:.fragment} highly structured
	* {:.fragment} you have to define the columns and the types of columns before inserting rows
	* {:.fragment} has a lot of features for maintaining  _data integrity_ (such user defined data constraints, foreign keys, etc.)
* {:.fragment} some relational databases guarantee that transactions (or changes in the database) are reliable 
* {:.fragment} see [ACID compliance](https://en.wikipedia.org/wiki/ACID) - Atomicity, Consistency, Isolation, Durability
* {:.fragment} [this database consultant has a pretty good write-up on relational databases](http://r937.com/relational.html)

</section>

<section markdown="block">
## Aside on ACID

* __Atomicity__ - each _transaction_ / (series of operations in a transaction) is all or nothing 
* __Consistency__ - every _transaction_ ensures that the resulting database state is valid (goes from one valid state to another)
* __Isolation__ - a failed _transaction_ should have no effect on other transactions (even if the transactions are concurrent)
* __Durability__ - once a _transaction_ / operation is done, the results will remain persistent even through crash, power loss, etc.

</section>

<section markdown="block">
## Quick Demo of Designing a Data Model for a Relational Database

Maybe we want to store these fields:

* first name
* last name
* street address
* city
* state
* zip

<br>
__Let's get to it!__ &rarr;

</section>

<section markdown="block">
## Examples of Relational Databases

__What are some examples of relational databases?__ &rarr;

* {:.fragment} MySQL
* {:.fragment} PostgreSQL
* {:.fragment} Oracle
* {:.fragment} Microsoft SQL Server

<br>
These are all great choices for storing highly structured data, related data.
{:.fragment}

They are all in common usage for conventional web applications. However, there's a bit of a learning curve, and some are difficult to set up.
{:.fragment}

</section>


<section markdown="block">
## NoSQL Databases

__NoSQL__ databases can be categorized by how they store their data:

* key-value
* document
* column
* graph
* there are others 
	* (such as object, tuple store, etc.)
	* [check out a whole list](https://en.wikipedia.org/wiki/NoSQL#Types_and_examples_of_NoSQL_databases)
* note that nosql databases _can_ have reliable transactions as well, but this is usually not the focus of a nosql database

<br>
We'll focus on __key-value__ and __document stores__...

</section>

<section markdown="block">
## Key Value Store

Probably the most simple conceptually... data is stored in key/value pairs. __This should sound similar to some data structures that you've seen before.__ &rarr;

* {:.fragment} maybe a hash
* {:.fragment} or a dictionary
* {:.fragment} or an associative array

<br>
They're typically good at scaling to handle large amounts of data and dealing with high volumes of changes in data.
{:.fragment}

<br>
__What may be some good applications for key value stores?__ &rarr;
{:.fragment}

* {:.fragment} caching
* {:.fragment} storing sessions!
</section>

<section markdown="block">
## Key Value Store Examples

Some key value databases include:

* Redis (a popular backend for queuing)
* Memcache (as the name implies, typically used for caching)
* Riak
* [many others](https://en.wikipedia.org/wiki/Key-value_database#KV_-_eventually_consistent)
</section>


<section markdown="block">
## Document Stores

As you might guess by the name, __document stores__ organize data semi-structured documents. 

* think JSON (but there are many possible formats, such as XML, YAML, etc.)
* or... a _richer_ key-value store (there's _meta data_ within the document... the keys are usually meaningful)
* typically, no schema is required (that is, data types of values are inferred from values)
* typically, semi structured (documents, property names, etc... do not have to be pre-defined)
* some document stores are particularly featureful when it comes to high availability and scaling (through replication/redundancy and sharding/separating large databases into smaller ones)

<br>
They're particularly good for applications where flexible data storage or constantly changing data storage is required.
</section>

<section markdown="block">
## Document Store Examples

Two of the most popular NoSQL databases are:

* MongoDB
* CouchDB

<br>
Of course, there are a [bunch of others](https://en.wikipedia.org/wiki/Document-oriented_database#Implementations)

<br>
Some use cases for document stores include:

* applications that require semi structured data / data that has does not have rigid requirements (perhaps a resume)
* again, large volumes of data
* _fluid_ data or data whose structure is prone to change


</section>

<section markdown="block">
## So Which One are We Using?

We're using MongoDB. Not for all of the reasons we previously mentioned, though... __We're using it because...__ &rarr;

* {:.fragment} it uses a __JSON__ like data structure (we know JSON)
* {:.fragment} it's __query language is JavaScript__ (we know JavaScript syntax)
* {:.fragment} it's not very rigid when it comes to dealing with data (we don't have to be so precise/exacting)
* {:.fragment} it's fairly straightforward to set up, usually with __little / no configuration required__ 
* {:.fragment} (to the point where the default installation doesn't even require a username/password to connect to the database -- wait, that's not so good!?)

<br>
All this can pretty much be summed up by saying that __it's easy to use__! (As an aside, I'm a bit biased to using relational databases, specifically Postgres)
{:.fragment}
</section>

<section markdown="block">
## MongoDB

* MongoDB will be our data store that we use for this part of the course
* It's a nosql database...
* Specifically, it's a document store
	* a single __record__ in Mongo is a __document__ (a _user_, a _bird_ in the case of our homework!)
	* a document is a bunch of key value pairs... 
	* hey... __that sounds like...__ &rarr; 
	* {:.fragment} documents are similar to JSON objects (actually BSON?)
</section>

<section markdown="block">
## Documents and Collections

A couple of terms to remember (yay, definitions again!)

* __key__ - a field name - analogous to a column in a relational database
* __value__ - obvs, a value
* __document__ - a single object or record in our database, 
	* consists of key value pairs
	* similar to a single row in a relational database
* __collection__ - a group of documents 
	* analogous to tables in relational databases
</section>

<section markdown="block">
## Data Types

Although MongoDB doesn't require you to pre-define the types of values that your documents will have, it does have data types. These types __are inferred from the value__. Some available types include:


* __string__ - an empty string or an ordered sequence characters
* __numeric types__ - such as integer, double (float)
* __boolean__ - true / false
* __array__ -  a list of values
* __timpestamp__ - 64 bit value where first 32 bits are seconds since the Unix epoch
* __Object ID__ every MongoDB object or document must have an Object ID which is unique

<br>
More about __Object ID__: a 12-byte value, consists of: a 4-byte timestamp (seconds since epoch), a 3-byte machine id, a 2-byte process id, and a 3-byte counter

</section>

<section markdown="block">
## Installation

[Comprehensive docs are here](http://docs.mongodb.org/manual/installation/)

* basically, just [use the appropriate installer from their downloads page](http://www.mongodb.org/downloads?_ga=1.39460320.233151851.1414030989)
* if you use a package manager, do that instead 
	* they have .debs for Debian and Ubuntu
	* since I'm on OSX, and I use homebrew, I used <code>brew install mongodb</code>
* starting will vary based on OS
* you may need to create and/or specify a directory where your data will be stored, so if mongo doesn't start up, it's missing its data directory
</section>	

<section markdown="block">
## A Whirlwind Tour

Working with MongoDB on the commandline...

If your OS doesn't autostart by default, you can run:

<pre><code data-trim contenteditable>
mongod
</code></pre>

To connect via the commandline MongoDB client and connect to a locally running instance:

<pre><code data-trim contenteditable>
mongo
</code></pre>

This drops you into the MongoDB shell (yay... more shell). You can issue commands that

* inspect the database
* modify and create documents and collections
* find documents
</section>

<section markdown="block">
## Some Commands

__The following commands can be used to navigate, create and remove databases and collections__ &rarr;

* `show databases` - show available databases (remember, there can be more than one database)
* `use db` - work with a specific database (if unspecified, the default database connected to is test)
* `show collections` - once a db is selected, show the collections within the database
* `db.dropDatabase()` - drop (remove) the database that you're currently in
* `db.collectionName.drop()` - drop (remove) the collection named `collectionName`

To get some inline help:

* `help` - get help on available commands

</section>

<section markdown="block">
## Starting Out

__To begin using the commandline client to inspect your data:__ &rarr;

1. make sure that `mongod` is running in a different window (or running _in the background_ or as a daemon)
2. start up the commandline client with `mongo`
3. type in `use databaseName` to switch to the database that you're looking through

From there, you can start querying for data, inserting documents, etc. These basic create, read, update, and delete operations are called __CRUD__ operations...


</section>
<section markdown="block">
## CRUD!?

__(C)reate, (R)ead, (U)pdate, and (D)elete operations:__ &rarr;

* {:.fragment} db.[collection].insert(obj)
	* <code>db.Person.insert({'first':'bob', 'last':'bob'})</code>
* {:.fragment} db.[collection].find(queryObj)
	* <code>db.Person.find({'last':'bob'})</code>
	* <code>db.Person.find() // finds all!</code>
* {:.fragment} db.[collection].update(queryObj, queryObj)
	* <code>db.Person.update({'first':'foo'}, {$set: {'last':'bar'}})</code>
* {:.fragment} db.[collection].remove(queryObj)
	* <code>db.Person.remove({'last':'bob'})</code>

<br>
Where `queryObj` is a name value pair that represents the property you're searching on... with a value that matches the value you specify
{:.fragment}
</section>

<section markdown="block">
## More Examples

__As prep for the next part, some insert and finds (with a test for greater than!)__ &rarr;

Inserting, finding all, then finding by exact number of lives:
{:.fragment}

<pre><code data-trim contenteditable>
> db.Cat.insert({name:'foo', lives:9})
WriteResult({ "nInserted" : 1 })
> db.Cat.find()
{ "_id" : ObjectId("57ff86a14639d0fd263f87a0"), "name" : "foo", "lives" : 9 }
> db.Cat.find({lives:9})
{ "_id" : ObjectId("57ff86a14639d0fd263f87a0"), "name" : "foo", "lives" : 9 }
</code></pre>
{:.fragment}

Inserting more, then using greater than!
{:.fragment}

<pre><code data-trim contenteditable>
> db.Cat.insert({name:'bar', lives:2})
WriteResult({ "nInserted" : 1 })
> db.Cat.insert({name:'qux', lives:5})
WriteResult({ "nInserted" : 1 })
> db.Cat.find({lives: {$gt: 4}})
{ "_id" : ObjectId("57ff86a14639d0fd263f87a0"), "name" : "foo", "lives" : 9 }
{ "_id" : ObjectId("57ff86c14639d0fd263f87a2"), "name" : "qux", "lives" : 5 }
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## Using MongoDB in Express

As with everything else we've done in node, there's a module for our specific task. If we'd like to use MongoDB in our application, there are [a few options](http://docs.mongodb.org/ecosystem/drivers/node-js/):

* __mongodb__ - the officially supported driver from MongoDB; optimized for simplicity
* __mongoose__ - lots of features, more complex, based on mongodb
* __monk__ - somewhere between mongoose and mongodb in terms of features and complexity (for example, no models) 

<br>
We'll be using mongoose, as it seems to have the most traction out of the three. (But it's a bit more complicated than it needs to be).
</section>

<section markdown="block">
## ORM / ODM

__Has anyone heard of ORM or ODM before?__ &rarr;

* __ORM__ - object relational mapper
* __ODM__ - object document mapper
{:.fragment}

<br>
Both map objects in your application to their counterparts in your database (tables, collections). Mongoose is our __ODM__.
{:.fragment}
</section>

<section markdown="block">
## Mongoose Concepts


* __schema__ - analogous to a collection
* __model__ - the actual constructors that we use to create objects
* __object__ - a single document



</section>

<section markdown="block">
# A Quick Example of Storing Cat Names!

Let's use MongoDB and Mongoose to store our classic list of cat names.
</section>

<section markdown="block">
## Install Mongoose

<pre><code data-trim contenteditable>
npm install --save mongoose
</code></pre>

</section>
<section markdown="block">
## Set Up Your Connection

For simplicity, we'll dump everything in a file called <code>[PROJECT ROOT]/db.js</code> for now. We'll see other ways of laying things out.


<br>
In <code>db.js</code>:


<pre><code data-trim contenteditable>
// as always, require the module
const mongoose = require('mongoose'); 

// some extra stuff goes here...

// connect to the database (catdb)
mongoose.connect('mongodb://localhost/catdb');

</code></pre>
</section>

<section markdown="block">
## Create a Schema

Between your require and connect... create a __schema__. A schema represents a MongoDB collection. Here we're specifying a collection for Cats.

* the cat schema will allow us to read objects from the collection
* as well as modify and add objects to the collection

<br>
<pre><code data-trim contenteditable>
// define the data in our collection
const Cat = new mongoose.Schema({
	name: String,
	updated_at: Date
});

// "register" it so that mongoose knows about it
mongoose.model('Cat', Cat);
</code></pre>
</section>

<section markdown="block">
## Using Our db Module

In <code>app.js</code>, simply:

<pre><code data-trim contenteditable>
require( './db' );
</code></pre>

<br>

* this will initialize our connection to the database when our application runs
* it also sets up our schemas, so we can use them in our routes

</section>

<section markdown="block">
## Using Schemas

Ostensibly, we would want to create, update, read or delete data based on what page (path/url/etc.) we're on. __Let's start by adding some setup to our <code>index.js</code> routes.__ &rarr;

<pre><code data-trim contenteditable>
const mongoose = require('mongoose');
const Cat = mongoose.model('Cat');
</code></pre>
</section>

<section markdown="block">
## Cats. Because Why Not?

__Let's create a simple site that saves a bunch of cat names.__ &rarr;

(for when we adopt three new adorable cats for our class)
{:.fragment}

__What pages do you think we should have?__ &rarr;
{:.fragment}

* minimally...
* a list of cat names
* a form that allows you to add cat names
{:.fragment}
</section>

<section markdown="block">
## URLs and Routes

__So what kind of routes will we need?__ &rarr;

* __GET__ a form (perhaps /cats/create)
* accept __POSTs__ to that form (/cats/create again)
* __GET__ a list of cat names (how about... just /cats? yeeaah.)
{:.fragment}
</section>

<section markdown="block">
## /cats

Use the schema's find method to read objects (of course, we have to define a callback that gets triggered when the read is done)!

<pre><code data-trim contenteditable>
router.get('/cats', function(req, res) {
	Cat.find(function(err, cats, count) {
		res.render( 'cats', {
			cats: cats
		});
	});
});

</code></pre>
</section>

<section markdown="block">
## /cat/create

We'll also need a form. __We can handle this one pretty easily.__ &rarr;

<pre><code data-trim contenteditable>

router.get('/cat/create', function(req, res) {
  res.render('create');
});
</code></pre>
{:.fragment}

</section>

<section markdown="block">
## /cats/create

Let's accept posts to <code>/cat/create</code>. We'll use our schema to create an object:

* create a new Cat object
* set its properties
* call save
* tell save what to do when it finishes saving (callback, ftw)

<pre><code data-trim contenteditable>
router.post('/cat/create', function(req, res) {
	console.log(req.body.catName);
	new Cat({
		name: req.body.catName,
		updated_at : Date.now()
	}).save(function(err, cat, count){
		res.redirect('/cats');
	});
});
</code></pre>
</section>


<section markdown="block">
## And Some Templates....

__Our is essentially the same as all of the previous forms we've had__ &rarr;

<pre><code data-trim contenteditable>
&lt;form method="POST" action=""&gt;
cat name plz
&lt;input type="text" name="catName"&gt;
&lt;input type="submit"&gt;
&lt;/form&gt;
</code></pre>
{:.fragment}
</section>

<section markdown="block">
## And a Template for the List

__As with our previous templates, we'll just loop through all of the objects that we retrieve.__ &rarr;

* note that because we have a list of objects...
* we can reference each property name, rather than using this
* for our example, name is a property of each object

<pre><code data-trim contenteditable>
&lt;ul&gt;
{{"{{#each cats"}}}}
&lt;li&gt;{{"{{name"}}}}</li>
{{"{{/each"}}}}
&lt;/ul&gt;
</code></pre>
{:.fragment}
</section>
<!--
<section markdown="block">
## 

Wait, what's JSON again?

</section>
<section markdown="block">
## BSON

Binary JSON
portmanteau, frankenword
ugh... another format

</section>
-->
