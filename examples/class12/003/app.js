require('./db.js');
const mongoose = require('mongoose');
const Cat = mongoose.model('Cat'); const express = require('express');
const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));


app.get('/form', (req, res) => {
  res.render('add');
});

app.get('/', (req, res) => {
  Cat.find({}, (err, cats) => {
    console.log(err, cats);
    // access the result of find IN THE CALLBACK
    res.render('home', {cats: cats});
  });
});

app.post('/form', (req, res) => {
  const c = new Cat({
    // name: req.body.catName, 
    lives: req.body.lives
  });
  c.save((err, result) => {
    if(err) {
      res.send('u have an error!'); 
    } else {
    res.redirect('/');
    }
  });
});
// see cat names
// add cat names

/*
// grab constructor
const Cat = mongoose.model('Cat');

Cat.find({}, (err, cats, count) => {
  console.log(err, cats, count);
});
*/

/*
const c = new Cat({
  name: 'paw newman',
  lives: 7
});

c.save((err, result) => {
  console.log(err, result);
});
*/


app.listen(3000);
