// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

const mysql = require('mysql');
var express = require("express");
var app = express();


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'task_database'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!");
});
  
app.listen(9001, () => console.log('Listening on port 9007!'));

app.get('/',function(req, res) {
  res.sendFile(__dirname + '/main.html');
});

app.get('/getUser', function(req, res) {
  var sql = 'SELECT username, img, tag, captured FROM user WHERE username="johnny293"';
  connection.query(sql, function(err, result) {
  if (err) {
    throw err;
  }
  res.send(result);
 });	
});

app.get('/getRank', function(req, res) {
  var sql = 'SELECT A.rank FROM (SELECT username, RANK() OVER(ORDER BY (tag + captured) DESC) AS "rank" FROM user) AS A where A.username="johnny293"';
  connection.query(sql, function(err, result) {
  if (err) {
    throw err;
  }
  res.send(result);
 });	
});

app.get('/getTotal', function(req, res) {
  var sql = 'SELECT COUNT(*) FROM user';
  connection.query(sql, function(err, result) {
  if (err) {
    throw err;
  }
  res.send(result);
 });	
});

app.get('/mention', function(req, res) {
  var sql = 'SELECT * FROM mention WHERE tagged="johnny293"';
  connection.query(sql, function(err, result) {
  if (err) {
    throw err;
  }
  res.send(result);
 });	
});


app.use('/', express.static(__dirname + '/'));