var server = 'http://localhost:5000/';
var cur_data = {};
var global_gauge = '';

function init() {
  global_guage = fill_guage(55);
  populate_reservoir();
  // get_data(construct_url('08313000', '7'));
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
        // console.log(JSON.stringify(http.responseText));
        cur_data = JSON.parse(http.responseText);
        console.log(cur_data.value[0].dateTime instanceof String);
        latest = get_latest(cur_data.value);
        global_gauge.update(latest.value);
        console.log('got it');
      }
  }
  http.send();
};

function populate_reservoir() {
  var items = reservoir.sort()
  var select = document.getElementById('reservoir_selection')
  for (i = 0; i < items.length; i++) {
    var option = document.createElement('option');
    option.text = items[i];
    option.value = items[i];
    select.add(option);
  };
};

function update() {
  var id = document.getElementById('reservoir_selection');
  var days = document.getElementById('period');
  get_data(construct_url(id.value, days.value));
};

function fill_guage(num) {
  var config1 = liquidFillGaugeDefaultSettings();
  config1.circleThickness = 0.1;
  config1.textVertPosition = 0.2;
  config1.waveAnimateTime = 1000;
  config1.waveRiseTime = 2000;
  config1.displayPercent = false;
  global_gauge = loadLiquidFillGauge("fillgauge1", num, config1);
};

function get_latest(data) {
  var result = {};
  result.latest = parse_datetime(String(data[0].dateTime));
  result.value = data[0].value;

  for (i = 1; i < data.length; i++) {
    var temp_date = parse_datetime(String(data[i].dateTime));
    if (temp_date >= result.latest) {
      result.latest = temp_date;
      result.value = data[i].value;
    };
  };
  result.value = result.value / 1000;
  console.log(result);
  return result;
};

function parse_datetime(datetime) {
  // var datetime = '2017-11-05T02:45:00.000-08:00';
  var item = datetime.split('T');

  var date = item[0];
  item = item[1].split('-');
  var time = item[0];
  var offset = item[1];
  
  date = date.split('-');
  var y = date[0];
  var mon = date[1];
  var d = date[2];

  time = time.split(':');
  var h = time[0];
  var min = time[1];
  var s = time[2].split('.')[0];

  return new Date(y, mon, d, h, min, s);
};
