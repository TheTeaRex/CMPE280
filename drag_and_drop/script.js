function allowDrop(evt) {
  evt.preventDefault();
}

function drag(evt) {
  evt.dataTransfer.setData("text", evt.target.id);
}

function drop(evt) {
  evt.preventDefault();
  var data = evt.dataTransfer.getData("text");
  evt.target.appendChild(document.getElementById(data));
}
