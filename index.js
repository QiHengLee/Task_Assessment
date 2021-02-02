// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

// const mysql = require('mysql');
var express = require("express");
var app = express();


// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'password',
//     database : 'testing'
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
  
app.listen(9007, () => console.log('Listening on port 9007!'));

app.get('/',function(req, res) {
  res.sendFile(__dirname + '/main.html');
});

app.use('/', express.static(__dirname + '/'));