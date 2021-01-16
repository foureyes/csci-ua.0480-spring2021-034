const express = require('express');
const app = express();
const session = require('express-session');
app.set('view engine', 'hbs');

// body parsing middleware
app.use(express.urlencoded({ extended: false }));

const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
// gives us access to req.session
app.use(session(sessionOptions));


app.get('/', function(req, res) {
    const name = req.session.myName || '';
    res.render('index', {'myName':name});
});

app.post('/', function(req, res) {
    console.log(req.body);
    req.session.myName = req.body.firstName;
    res.redirect('/');
});


app.get('/make-a-cookie', function(req, res) {
    // used append so that we can Set-Cookie more than once
    res.append('Set-Cookie', 'MY_SESSION_ID=123; HttpOnly');
    res.append('Set-Cookie', 'color=#00ff00');
    res.send('made you a cookie');
});

app.get('/peek', function(req, res) {
    // uncomment this:
    const s = "alert(document.cookie);";
    res.send('<script>' + s + '</script>' + 'check out yr cookies!');
});
app.listen(3000);









