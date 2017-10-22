function drag_over(event) {
  event.preventDefault();
}

function drag(event) {
  var style = window.getComputedStyle(event.target, null);
  var data = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
  event.dataTransfer.setData("text", data);
  console.log(event);
  console.log(event.clientX);
  console.log(event.clientY);
  console.log(style.getPropertyValue("left"));
  console.log(style.getPropertyValue("top"));
}

function drop(event) {
  var board = document.getElementById('board');
  console.log(board.offsetLeft);
  console.log(board.offsetTop);
  var data = event.dataTransfer.getData("text").split(',');
  console.log(data);
  console.log(event.clientX);
  console.log(event.clientY);
  var l = (event.clientX) + 'px';
  var t = (event.clientY) + 'px';
  console.log(l);
  console.log(t);
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
