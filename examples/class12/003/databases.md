# Databases

## Relational

* data is stored in tables
* attributes are column names
* actual _instances_ of data .... rows in table

## About...

* very rigid
	* you have describe your table(s) before adding data
	* what kind of data ... what type the data will be
	* how is it related to other tables


## Primary Key / FK

* pk is a unique identifier for a particular row
* table1 ... and table2 (table2_id)
* table2_id


book
id : integer increments automatically
title : string consisting of at most 255
publish_year : timestampe or smallint
author_id : foreign key relationship to author table (int)


author
id
first
last

1
Dune
1984
2

2
frank
herber



## Transactions

a logical database operation

(which could consist of more than one instruction)

* Atomic - all or nothing... if one instruction fails in a transaction, roll back everything
* Consistent - before a transaction database is in a consistent state, same after the transaction
* Isolation - transactions have no effect on each other (if one fails, any parallel transactions aren't affected) ... or if run parallel, running serially will have same results
* Durability - after power failure / crash, database will come back up in consistent state (all of previous transactions still there)

most relational databases are acid compliant

## Use Case

* web apps totally fine
* data analysis, business intelligence
* all purpose
* a little tricker to scale than nosql

## Examples

* postgres
* mysql
* ms sql server
* ms access


## Non-Relational (No-SQL)

* key value
	* scale very well of large amounts of data / operations
	* session store
	* caching 
	* memcache
	* Riak
* document
	* storage is in some document format
	* json, xml, etc.
	* very flexible.... no specification has to be created before inserting data
	* good for prototyping
	* cases where you know kind of data will change
	* habase
	* mongo
	* couchdb
* object
* columnar


## MongoDB

document store
stores data in json (actually binary json, bson)
query language is in javascript
cross platform / easy to install

## rationale

* less languages to learn 4 U
	* you already know json
	* you already know js
easy to install (again)!

## installation

use `brew`
download graphical installer

it actually installs:

* the database server `mongod`
* a commandline client `mongo`
	* (other clients available)



## mongodb stores documents

it stores json
organized into collections

there can be multiple collections in a database

multiple databases in one running instance of mongodb

mongodb -> databases -> collections -> json documents

## mongodb clients

* mongo (commandline)
	* allow for easier debugging
* use a library to connect our web app
	* mongodb
	* mongoose - object document mapper
		* creates javascript objects that represent documents in mongodb



## mongoose

connect to a database -> schema / model / constructor -> instances / objects
a single database     -> collection name              -> document

allows:

* the definition of a document
* specify properties
* ...and their related types

create, read, update and delete documents






























