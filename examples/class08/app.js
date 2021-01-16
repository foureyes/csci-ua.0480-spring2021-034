const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, 'public');

// hbs is our templating engine
// change default templating from pug to hbs
app.set('view engine', 'hbs');

// adds middleware
// add static file serving middleware
// * checks if file exists in publicPath folder
// * if it does, then serve that file
// * otherwise go on to routes below
app.use(express.static(publicPath))


app.get('/demo', (req, res) => {
  res.render('foo');
});

app.get('/bar', (req, res) => {
  res.render('bar');
});


app.get('/baz', (req, res) => {
  res.render('baz', {x: 100});
});


app.get('/', (req, res) => {
  res.send('<em>whatever</em>');
})


app.listen(3000);
