const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('user.db', (err)=> {
    if(err){
        console.log(err.message);
    }
    else{
        console.log('Connected to user.db');
    }
});

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

//DB erstellen
app.get(['/','index'], (request,response) =>{
    const sql = 'SELECT * FROM user';
    db.all(sql,(error, rows)=>{
        if(error) {
            console.log(error.message);
            if(rows == undefined){
                db.run('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, age NUMERIC)');
                response.render('newUser');
            }
        }else {
            response.render('allUser', {'rows' : rows || []});
        }
    });
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
    console.log(req.body.user.name);

    const sql = `INSERT INTO user (username, password, alter) VALUES ('${username}', '${password}','${age}')`;
    console.log(sql);
    db.run(sql, function(err){
        res.redirect('/index.ejs');
    })
});
