var server = 'http://localhost:5000/';
var cur_data = {};
var global_gauge = '';

function init() {
  global_guage = fill_guage(0);
  populate_reservoir();
  update();
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
        document.getElementById('rname').innerHTML = cur_data.name;
        document.getElementById('rid').innerHTML = cur_data.id;
        latest = get_latest(cur_data.value);
        global_gauge.update(latest.value);
        document.getElementById('latest').innerHTML = latest.date_time;
        draw_highchart(cur_data);
        update_map(cur_data);
        document.getElementById('processing').style.display = 'none';
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
  document.getElementById('processing').style.display = 'inline';
  var id = document.getElementById('reservoir_selection');
  var days = document.getElementById('period');
  get_data(construct_url(id.value, days.value));
};

function fill_guage(num) {
  var config1 = liquidFillGaugeDefaultSettings();
  config1.minValue = 0;
  config1.maxValue = 2000;
  config1.circleThickness = 0.1;
  config1.textVertPosition = 0.2;
  config1.waveAnimateTime = 1000;
  config1.waveRiseTime = 2000;
  config1.displayPercent = false;
  global_gauge = loadLiquidFillGauge("gauge", num, config1);
};

function get_latest(data) {
  var result = {};
  result.date_time = data[data.length - 1].dateTime;
  result.value = data[data.length - 1].value;

  // for (i = 1; i < data.length; i++) {
  //   var temp_date = data[i].dateTime;
  //   if (temp_date >= result.date_time) {
  //     result.date_time = temp_date;
  //     result.value = data[i].value;
  //   };
  // };
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

function draw_highchart(data) {
  $(document).ready(function() {
    var temp = [];
    var title = {
      text: 'Historical Graph'   
    };

    for (i = 0; i < data.value.length; i++) {
      temp.push(data.value[i].dateTime);
    };
    var xAxis = {
      categories: temp
    };

    var yAxis = {
      title: {
        text: 'Thousand Acre-Feet (TAF)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    };   

    var tooltip = {
      valueSuffix: 'TAF'
    };

    // var legend = {
    //   layout: 'vertical',
    //   align: 'right',
    //   verticalAlign: 'middle',
    //   borderWidth: 0
    // };

    temp = [];
    for (i = 0; i < data.value.length; i++) {
      temp.push(data.value[i].value / 1000);
    };
    var series =  [{
        name: data.name,
        data: temp
      } 
    ];

    var json = {};
    json.title = title;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    // json.legend = legend;
    json.series = series;

    $('#highchart_container').highcharts(json);
  });
};

function update_map(data) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {lat: data.latitude, lng: data.longitude}
  });

  var marker = new google.maps.Marker({
    position: {lat: data.latitude, lng: data.longitude},
    map: map
  });

	var contentString = '<p><b>Reservoir Name:</b> ' +
		data.name +
    '</p><p><b>Reservoir ID:</b> ' +
    data.id +
    '</p><p><b>Last Recorded Storage:</b> '+
    data.value[data.value.length - 1].value +
    'AF';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
};
