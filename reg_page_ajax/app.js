var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('info.db');
var check;

function create_db() {
	db.serialize(function() {

    var query ='CREATE TABLE if not exists user_info (userid text primary key, password text not null, email text not null, question1 text not null, answer1 text not null, question2 text not null, answer2 text not null, mobile text not null, address text not null)';
    db.run(query);
		// var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
		// for (var i = 0; i < 10; i++) {
		// 		stmt.run("Ipsum " + i);
		// }
		// stmt.finalize();

		// db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
		// 		console.log(row.id + ": " + row.info);
		// });
	});

	db.close();
}

create_db();

// var http = require('http');
// var fs = require('fs');
// server = http.createServer( function(req, res) {

//     console.dir(req.param);

//     if (req.method == 'POST') {
//         console.log("POST");
//         var body = '';
//         req.on('data', function (data) {
//             body += data;
//             console.log("Partial body: " + body);
//         });
//         req.on('end', function () {
//             console.log("Body: " + body);
//         });
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('post received');
//     }
// });

// port = 8080;
// host = '127.0.0.1';
// server.listen(port, host);
// console.log('Listening at http://' + host + ':' + port);

var port = 8080;
var host = '127.0.0.1';
var http = require("http");
var server = http.createServer();
server.on('request', request);
server.listen(port, host);
function request(request, response) {
    var store = '';

    request.on('data', function(data) 
    {
        store += data;
    });
    request.on('end', function() 
    {  console.log(store);
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "content-type");
        response.end(store)
    });
 }  
