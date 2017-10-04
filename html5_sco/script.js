function show1() {
  document.getElementById('englishchoice1').style.display = 'block';
  document.getElementById('englishchoice2').style.display = 'none';
}
function show2() {
  document.getElementById('englishchoice2').style.display = 'block';
  document.getElementById('englishchoice1').style.display = 'none';
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setHiddenValues() {
  var mresult = parseInt(getParameterByName('math')) || 0;
  var cresult = parseInt(getParameterByName('cosine')) || 0;
  var e1result = parseInt(getParameterByName('mark1')) || 0;
  var e2result = parseInt(getParameterByName('mark2')) || 0;
  var vresult = parseInt(getParameterByName('video')) || 0;
  var quantitative = parseInt(getParameterByName('quantitative')) || 0;
  var reading = parseInt(getParameterByName('reading')) || 0;
  var videoaudio = parseInt(getParameterByName('videoaudio')) || 0;
  quantitative = quantitative + mresult + cresult;
  reading = reading + e1result + e2result;
  videoaudio = videoaudio + vresult;
  document.getElementById('quantitative').value = quantitative;
  document.getElementById('reading').value = reading;
  document.getElementById('videoaudio').value = videoaudio;
  console.log(document.getElementById('quantitative').value);
}

function getHiddenValues() {
  var quantitative = parseInt(getParameterByName('quantitative')) || 0;
  var reading = parseInt(getParameterByName('reading')) || 0;
  var videoaudio = parseInt(getParameterByName('videoaudio')) || 0;
  document.getElementById('quantitative').innerHTML = quantitative;
  document.getElementById('reading').innerHTML = reading;
  document.getElementById('videoaudio').innerHTML = videoaudio;
  document.getElementById('qscore').innerHTML = quantitative / 2 * 100;
  document.getElementById('rscore').innerHTML = reading / 2 * 100;
  document.getElementById('vscore').innerHTML = videoaudio / 1 * 100;
}
