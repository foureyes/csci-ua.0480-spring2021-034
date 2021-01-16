require('./db.js');
const mongoose = require('mongoose');
const Cat = mongoose.model('Cat'); 

const express = require('express');
const app = express();

app.set('view engine', 'hbs');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  Cat.find((err, foundCats, count) => {
    res.render('index', {cats: foundCats});
  });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const c = new Cat({
    name: req.body.catName,
    lives: req.body.lives
  });

  c.save((err, newCat, count) => {
    // console.log(err, newCat, count);
    res.redirect('/');
  });
});



app.listen(3000);
