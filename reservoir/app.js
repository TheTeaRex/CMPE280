var express = require("express");
var request = require('request');
var app = express();

app.get('/', function(req, res){
  var id = req.query.id;
  var days = req.query.days;
  request({
    url: construct_url(id, days),
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      // responding with request's body
      res.write(JSON.stringify(body));
      res.end();
    }
  })

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});

function construct_url(id, period) {
  return 'https://waterservices.usgs.gov/nwis/iv/?sites=' + id + '&period=P' + period + 'D&format=json';
};
