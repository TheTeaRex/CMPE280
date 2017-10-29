var connected = false;
var socket = '';

function init() {
  update_status('Disconnected', 'red');
};

function connect_to_server(callback){
  if (!connected) {
    socket = io.connect('http://localhost:3000', {'forceNew': true});
    console.log('Connected to server');
    connected = true;
    update_status('Connected', 'green');
    callback(socket);
  }
};

function disconnect_from_server() {
  if (connected) {
    socket.disconnect();
    console.log('Disconnected from server');
    connected = false;
    update_status('Disconnected', 'red');
  };
};

function update_status(msg, color) {
  console.log(msg);
  var status = document.getElementById('status');
  status.innerHTML= msg;
  status.style.color = color;
};

function listen_socket(socket) {
  console.log('supposed to be listening');
  try {
    socket.on('comment', function(msg) {
      console.log(msg);
      document.getElementById('comment').innerHTML = msg;
    });
  } catch(err) {
    console.log('caught');
  };
};
