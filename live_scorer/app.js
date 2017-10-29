var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', function(req, res){
    res.sendFile(__dirname + '/script.js');
});

app.get('/style.css', function(req, res){
    res.sendFile(__dirname + '/style.css');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

setInterval( function(){
  io.emit('comment', 'hi');
  console.log('sending');
  update_comment();
}, 5000);

function update_comment() {
  comments = [
    'Good Shot',
    'Missed to field',
    'Classic Text Book Shot',
    'Hat trick',
    'Classical Sot',
    'Unbelievable miss',
    'Very good catch by mid-on player'
  ];
  var choice = Math.floor(Math.random() * 10) % comments.length;
  return comments[choice];
};
