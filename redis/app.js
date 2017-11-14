var express = require('express');
var request = require('request');
var app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', function(req, res){
    res.sendFile(__dirname + '/script.js');
});

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
