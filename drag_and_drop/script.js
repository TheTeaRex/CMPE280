function drag_over(event) {
  event.preventDefault();
}

function drag(event) {
  var style = window.getComputedStyle(event.target, null);

  // 17, 130
  // 17, 214
  // 17, 300
  var x = event.clientX;
  var y = event.clientY;
  var offsetx = 17 - x;
  var offsety = 0;
  if ( 130 <= y && y <= 210 ) {
    offsety = 130 - y;
  } else if ( 214 <= y && y <= 294 ) {
    offsety = 214 - y;
  } else if ( 300 <= y && y <= 380) {
    offsety = 300 - y;
  }

  var data = parseInt(offsetx) + ',' + parseInt(offsety) + ',' + event.target.id;
  event.dataTransfer.setData("text", data);
}

function drop(event) {
  var board = document.getElementById('board');
  var data = event.dataTransfer.getData("text").split(',');
  var l = (event.clientX + parseInt(data[0])) + 'px';
  var t = (event.clientY + parseInt(data[1])) + 'px';
  if ( data[2] == "circle" ) {
    var new_obj = create_circle();
  } else if ( data[2] == "rectangle") {
    var new_obj = create_rectangle();
  } else if ( data[2] == "triangle") {
    var new_obj = create_triangle();
  } else {
    return false;
  }
  new_obj.style.setProperty('left', l);
  new_obj.style.setProperty('top', t);
  board.appendChild(new_obj);
  event.preventDefault();
}

function create_circle() {
  var circle = document.createElement("IMG");
  circle.setAttribute("class", "not_draggable");
  circle.setAttribute("src", "circle.png");
  circle.setAttribute("height", "80");
  circle.setAttribute("width", "80");
  circle.style.position = "absolute";
  return circle;
}

function create_rectangle() {
  var rectangle = document.createElement("IMG");
  rectangle.setAttribute("class", "not_draggable");
  rectangle.setAttribute("src", "rectangle.png");
  rectangle.setAttribute("height", "80");
  rectangle.setAttribute("width", "80");
  return rectangle;
}

function create_triangle() {
  var triangle = document.createElement("IMG");
  triangle.setAttribute("class", "not_draggable");
  triangle.setAttribute("src", "triangle.png");
  triangle.setAttribute("height", "80");
  triangle.setAttribute("width", "80");
  return triangle;
}
