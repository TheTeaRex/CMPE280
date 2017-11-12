var server = 'http://localhost:5000/';

function init() {
  get_data(construct_url('08313000', '7'));
};

function construct_url(id, period) {
  return server + '?id=' + id + '&days=' + period;
};

function get_data(url) {
  var http = new XMLHttpRequest();
  var url = url;
  http.open("GET", url, true);

  //Send the proper header information along with the request
  // http.setRequestHeader("Content-type", "application/json");
  // http.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log(JSON.stringify(http.responseText));
      }
  }
  http.send();
}
