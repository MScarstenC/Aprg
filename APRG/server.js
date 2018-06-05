const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());

//Initialisierung der Template Engine EJS
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

const port = 3000;
app.listen(3000, function(){
    console.log('listening on port 3000');
});

app.use(express.static(__dirname + '/Views'));

app.get('/', (req, res) => {
    res.render(__dirname + '/Views/index.ejs');
});

app.get('/Registrieren', function(req,res){
    res.render(__dirname+'/Views/Registrieren.ejs');
});

const session = require('express-session');
app.use(session({
    secret: 'example',
    resave: false,
    saveUninitialized: true
}));

app.post('/Registration', function(req, res){
    const username = req.body["username"];
    const password = req.body["password"];
});