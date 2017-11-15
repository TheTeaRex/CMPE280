var image_server = 'http://localhost:3000/';
var translation = {
  'sjsu': {
    'filename': 'sjsu',
    'height': '300px',
    'width': '300px',
    'alt': 'SJSU Image'
  },
  'cmpe': {
    'filename':'cmpe',
    'height': '300px',
    'width': '450px',
    'alt': 'CMPE Building Image'
  },
  'library': {
    'filename' :'library',
    'height': '300px',
    'width': '400px',
    'alt': 'Dr. Martin Luther King Jr. Library'
  }
};

function init() {
  document.getElementById('image').style.display = 'none';
};

function load_picture(img) {
  document.getElementById('msg').style.display = 'none';
  document.getElementById('image').remove();
  var image = document.createElement('img');
  var setting = translation[img];


  var http = new XMLHttpRequest();
  var url = image_server + 'exists/' + setting.filename;
  http.open("GET", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        document.getElementById('load_from').innerHTML = JSON.parse(http.responseText)['response'];
      }
  }
  http.send();

  image.style.display = 'block';
  image.style.height = setting.height;
  image.style.width = setting.width;
  image.src = image_server + 'images/' + setting.filename;
  image.alt = setting.alt;
  image.id = 'image';
  document.getElementById('image_container').appendChild(image);
};
