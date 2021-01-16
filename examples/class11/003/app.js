const express = require('express');
const app = express();

const session = require('express-session');

const sessionOptions = {
  secret: 'some secret text',
  saveUninitialized: false,
  resave: false
};


// gives access to an object called req.session 
// available on server
// add arbitrary data to the client's session
// req.session.visits = 1
app.use(session(sessionOptions));

app.set('view engine', 'hbs');


// this gives us
// req.body
// (it parses the http request body and creates a property
// on the req object called body)
app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

app.get('/', (req, res) => {
  const cookies = req.get('Cookie');
  console.log(cookies);
  res.send('hello');
});

app.get('/make-cookies', (req, res) => {
  res.set('Set-Cookie', 'foo=bar');
  res.append('Set-Cookie', 'baz=qux');
  res.append('Set-Cookie', 'sessid=123; HttpOnly');
  res.send('made some cookies for you');
});

app.get('/peek', (req, res) => {
  const code = 'alert(document.cookie)';
  res.send(`<script>${code}</script>`);
});

app.get('/name', (req, res) => {
  console.log('session is', req.session);
  res.render('name', {name: req.session.name});
});

app.post('/name', (req, res) => {
  console.log('body is', req.body);
  req.session.name = req.body.yourName;
  res.redirect('/name');
});

app.listen(3000);










