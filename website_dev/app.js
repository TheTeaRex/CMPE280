var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var sqlite3 = require('sqlite3').verbose();

var db_file = 'info.db';
var db = new sqlite3.Database(db_file);

// check if database file exists
// fs.access(db_file, function(err) {
//   if (err) {
//     console.log('No Database found, creating one');
//     db = new sqlite3.Database(db_file);
//     create_db();
//   } else {
//     console.log('Database found.');
//   };
// });

// create table
function create_table() {
	db.serialize(function() {

    var query ='CREATE TABLE if not exists user_info (email text primary key, first text not null, last text not null)';
    db.run(query);
    query ='CREATE TABLE if not exists blogs (time text primary key, entry text not null)';
    db.run(query);
	});

	// db.close();
}

function insert_data(data, callback) {
  console.log(data);
  query = 'INSERT INTO user_info VALUES ('
  query = query + '"' + data.email + '"' + ', ';
  query = query + '"' + data.first + '"' + ', ';
  query = query + '"' + data.last + '"' + ')';
  console.log(query);
  db.run(query, function(err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    };
  });
}

function insert_blog(data, callback) {
  console.log(data);
  query = 'INSERT INTO blogs VALUES ('
  query = query + '"' + data.time + '"' + ', ';
  query = query + '"' + data.entry + '"' + ')';
  console.log(query);
  db.run(query, function(err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    };
  });
}

function get_blogs(callback) {
  db.all('SELECT * FROM blogs', function(err, rows) {
    var result = [];
    rows.forEach(function (row) {
      result.unshift({'entry': row.entry, 'time': row.time});
    });
    callback(result);
  });
};


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/submit', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });
  insert_data(req.body, function(err) {
    var msg;
    var code;
    if (err) {
      if (err.code == 'SQLITE_CONSTRAINT') {
        msg = 'Email exists in database already!';
        code = 5;
      } else {
        msg = 'Operation failed, please try again';
        code = 255;
      };
    } else {
      msg = 'Successfully recorded in database';
      code = 0;
    };
    res.write(JSON.stringify({'message': msg, 'code': code}));
    res.end();
  });
});

app.post('/blogSubmit', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });
  insert_blog(req.body, function(err) {
    var msg;
    var code;
    if (err) {
      msg = 'Operation failed, please try again';
      code = 255;
    } else {
      msg = 'Successfully recorded in database';
      code = 0;
    };
    res.write(JSON.stringify({'message': msg, 'code': code}));
    res.end();
  });
});

app.get('/getBlogEntries', function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });
  get_blogs(function(result) {
    res.write(JSON.stringify(result));
    res.end();
  });
});

create_table();

app.use(express.static('public'));
// app.use('/images', express.static('images'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
