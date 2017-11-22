var express = require('express');
var app = express();

app.use(express.static('public'));
// app.use('/images', express.static('images'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
