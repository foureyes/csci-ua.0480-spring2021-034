const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const catNames = ['bill furry', 'paw newman', 'cat'];
// use body parsing middleware...
// results in req.body being available (containing post req form data)
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log('query string\n=====\n', req.query , '\n');
  console.log('body\n=====\n', req.body , '\n');
  next();
});

app.get('/', (req, res) => {
  res.set('X-My-Header', 'Something...');
  res.status(200).send('hello, this is express!!!!!');
})

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  catNames.push(req.body.catName);
  res.redirect('/cats');
});

app.get('/cats', (req, res) => {
  let qs = req.query.len;
  if(!qs) {
    qs = 0; 
  }
  const minLength = parseInt(qs);
  const context = {catNames: catNames.filter(n => n.length >= minLength) };
  res.render('cats', context);
});

app.listen(3000);










