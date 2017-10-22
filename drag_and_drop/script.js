function drag_over(event) {
  event.preventDefault();
}

function drag(event) {
  var style = window.getComputedStyle(event.target, null);
  var data = (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY) + ',' + event.target.id;
  event.dataTransfer.setData("text", data);
  console.log(style.getPropertyValue("left"));
  console.log(style.getPropertyValue("top"));
}

function drop(event) {
  var data = event.dataTransfer.getData("text").split(',');
  var l = (event.clientX + parseInt(data[0])) + 'px';
  var t = (event.clientY + parseInt(data[1])) + 'px';
  console.log(l);
  console.log(t);
  var object = document.getElementById(data[2]);
  object.style.setProperty('left', l);
  object.style.setProperty('top', t);
  event.preventDefault();
}
