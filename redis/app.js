var express = require('express');
var app = express();
var translation = {
  'sjsu': 'image_sjsu.png',
  'cmpe': 'image_cmpe_building.png',
  'library': 'image_library.png'
};

app.use(express.static('public'));
// app.use('/images', express.static('images'));

app.get('/images/:name', function (req, res) {
  res.sendFile(__dirname + '/images/' + translation[req.params.name]);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
