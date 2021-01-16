const express = require('express');
const app = express();
const path = require('path');

// static file serving
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// body parsing middleware
// gives us access to req.body
// req.body.formInputName <--- to get value out
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log('REQ.QUERY', req.query);
  console.log('REQ.BODY', req.body);
  console.log(req.headers);
  next();
});

const cats = ['kitty purry', 'paw newman', 'cat'];

// configure templating
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.set('X-Foo', 'Bar'); // set header
  res.status(200).send('hello!!!!');
});

app.get('/example', (req, res) => {
  let n = req.query['len'];
  if(!n)  {
    n = 0; 
  }
  const minLength = parseInt(n);
  res.render('example', {catNames: cats.filter(n => n.length > minLength)});
});

app.post('/add', (req, res) => {
  cats.push(req.body.catName);
  res.redirect('/example');
  // res.send('success!');
})

app.get('/add', (req, res) => {
  res.render('add');
});


app.listen(3000);







