## databases

* we're using mongodb
	* document store
	* json (bson ... <--- binary json)
* after installing
	* mongod <-- long running process because it's the server!
		* must have this on
		* in order to connect to a database
	* mongo <-- just a client
		* a commandline client
		* crud operations (create, read ....)
		* other clients - graphical client, mongodb in node, mongoose
		* mongoose 

## why mongodb

because it's easy!

* supported cross platform
* easy to install
	* add authentication yourself
* query language is in js X
* document format is in json X

## structure

instance of mongod

* data directory
* running process

a single instance

* multiple databases

a database can have

* multiple collections

a collection can have

* multiple documents


mongodb --> databases --> collections --> documents (json)



## clients

mongo - commandline client

* db.colName.insert
* db.colName.find
* db.colName.update
* db.colName.remove
* db.colName.drop

mongodb (official library for node)
mongoose - odm



## mongoose

odm, orm (object relational mapper)

* object document mapper
* it will create objects based on the documents stored in the database
* you HAVE to specify what those objects will look like:
	* what are the properties
	* what are their types

## mongoose

schema - defines object properties and their types
Constructor/model - responsible for creating instance 

schema + constructor / model = collection

instances = single document










