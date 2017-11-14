var image_server = 'http://localhost:3000/images/';
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
  var image = document.getElementById('image');
  var setting = translation[img];
  image.style.display = 'block';
  image.style.height = setting.height;
  image.style.width = setting.width;
  image.src = image_server + setting.filename;
  image.alt = setting.alt;
};
