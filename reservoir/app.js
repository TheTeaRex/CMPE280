var express = require('express');
var request = require('request');
var app = express();

app.get('/', function(req, res){
  var id = req.query.id;
  var days = req.query.days;
  request({
    url: construct_url(id, days),
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      });
      // responding with request's body
      res.write(JSON.stringify(process_info(body)));
      res.end();
    };
  });

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});

function construct_url(id, period) {
  return 'https://waterservices.usgs.gov/nwis/iv/?sites=' + id + '&period=P' + period + 'D&format=json';
};

function process_info(data) {
  var result = {};
  for (i = 0; i < data.value.timeSeries.length; i++) {
    if (data.value.timeSeries[i].variable.variableName == 'Reservoir storage, acre-ft') {
      result.name = data.value.timeSeries[i].sourceInfo.siteName;
      result.id = data.value.timeSeries[i].sourceInfo.siteCode[0].value;
      result.latitude = data.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude;
      result.longitude = data.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude;
      result.value = data.value.timeSeries[i].values[0].value;
      break
    };
  };
  console.log(result.name);
  return result;
};
