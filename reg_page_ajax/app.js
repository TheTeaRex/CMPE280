var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('info.db');
var check;

function create_db() {
	db.serialize(function() {

    var query ='CREATE TABLE if not exists user_info (userid text primary key, password text not null, email text not null, question1 text not null, answer1 text not null, question2 text not null, answer2 text not null, mobile text not null, address text not null)';
    db.run(query);
	});

	// db.close();
}

create_db();

var port = 8080;
var host = '127.0.0.1';
var http = require('http');
var server = http.createServer();
server.on('request', request);
server.listen(port, host);
function request(request, response) {
  var store = '';

  request.on('data', function(data) {
    store += data.toString();
  });
  request.on('end', function() {
    console.log('begin' + store);
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'content-type');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.end('Updated Database');
    try {
      var data = JSON.parse(store);
      console.log('inserting..');
      insert_sql(data);
    } catch(e) {
      console.log('caught');
    }
  });
}

function insert_sql(data) {
  console.log(data);
  query = 'INSERT INTO user_info VALUES ('
  query = query + '"' + data.user + '"' + ', ';
  query = query + '"' + data.pw + '"' + ', ';
  query = query + '"' + data.email + '"' + ', ';
  query = query + '"' + data.question1 + '"' + ', ';
  query = query + '"' + data.answer1 + '"' + ', ';
  query = query + '"' + data.question2 + '"' + ', ';
  query = query + '"' + data.answer2 + '"' + ', ';
  query = query + '"' + data.mobile + '"' + ', ';
  query = query + '"' + data.address + '"' + ')';
  console.log(query);
  db.run(query);
}
