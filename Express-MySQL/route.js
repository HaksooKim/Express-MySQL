var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('Root');
});

app.get('/persons', function(req, res){

  connection.query('SELECT * from Persons', function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });
});

app.get('/persons_insert', function(req, res){
	let name = req.query.name;
	let age = req.query.age;
	
	console.log("> Data : " + name + ", " + age);
	
	connection.query("insert into persons values ((select max(id)+1 from persons a), '" + name + "', " + age + ")", function(err, rows) {
	    if(err) throw err;

	    console.log('Inserted', name);
	    res.send('Add Success');
	  });
	});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});