const express = require('express');
const app = express();

const session = require('express-session');

const sessionOptions = { 
    secret: 'secret for signing session id', 
    saveUninitialized: false, 
    resave: false 
};

// this gives you access to req.session
// an object that you can store data in
// for a particular connected client
app.use(session(sessionOptions));

const path = require('path');

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// body parser into req.body
app.use(express.urlencoded({extended:false}));


app.get('/', (req, res) => {
  res.set('Set-Cookie', 'foo=bar');
  res.append('Set-Cookie', 'baz=qux');
  res.append('Set-Cookie', 'sessid=secret; Secure');
  res.append('Set-Cookie', 'another=secretthing; HttpOnly');
  res.send('hello');
});

app.get('/cookies-sent', (req, res) => {
  console.log(req.headers);
  res.send(req.headers);
});

app.get('/peek', function(req, res) {
    // uncomment this: 
    const s = "alert(document.cookie);";
    res.send('<script>' + s + '</script>' + 'check out yr cookies!');
});

app.get('/name', (req, res) => {
  console.log(req.session.name);
  res.render('name', {name: req.session.name});
});

app.post('/name', (req, res) => {
  console.log(req.body);
  req.session.name = req.body.yourName;
  res.redirect('/name'); 
});













app.listen(3000);
