var express = require('express');
var fs = require('fs');
var redis = require('redis');
var app = express();
var translation = {
  'sjsu': 'image_sjsu.png',
  'cmpe': 'image_cmpe_building.png',
  'library': 'image_library.png'
};

var client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

app.use(express.static('public'));
// app.use('/images', express.static('images'));

app.get('/exists/:name', function (req, res) {
  client.get(req.params.name, function(err, reply) {
    if (!reply) {
      res.send(JSON.stringify({'response': 'Database'}));
    } else {
      res.send(JSON.stringify({'response': 'Redis Cache'}));
    };
    res.end();
  });
});

app.get('/images/:name', function (req, res) {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': 0
  });
  console.log(translation[req.params.name]);

  client.get(req.params.name, function(err, reply) {
    if (!reply) {
      var file = __dirname + '/images/' + translation[req.params.name];
      var bitmap = fs.readFileSync(file);
      var base64_store = new Buffer(bitmap).toString('base64');
      client.set(req.params.name, base64_store);
      console.log('from DB');
      res.sendFile(file);
    } else {
      client.get(req.params.name, function(err, reply) {
        var bitmap = new Buffer(reply, 'base64');
        console.log('from redis');
        res.end(bitmap, 'binary');
      });
    };
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
