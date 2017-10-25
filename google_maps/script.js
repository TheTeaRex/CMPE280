function initMap() {
  var data = stores['locations']['location'];

  // store location with different color flags
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {lat: 37.328933, lng: -121.945702}
  });
  for ( var i = 0; i < data.length; i++ ) {
    console.log(data[i]);
    if ( data[i].type == 'Distribution Facility' ) {
      var image = {
        url: 'red_flag.png'
      };
    } else if ( data[i].type == 'HeadQuarters' ) {
      var image = {
        url: 'white_flag.png'
      };
    } else if ( data[i].type == 'Call Center' ) {
      var image = {
        url: 'blue_flag.png'
      };
    } else {
      var image = {
        url: 'green_flag.png'
      };
    }
    var marker = new google.maps.Marker({
      icon: image,
      label: data[i].id,
      position: {lat: data[i].latitude, lng: data[i].longitude},
      map: map
    });
  }

  // different size of circle on location based on the revenue of the retail location
  var circle_map = new google.maps.Map(document.getElementById('circle_map'), {
    zoom: 9,
    center: {lat: 37.328933, lng: -121.945702}
  });
  for ( var i = 0; i < data.length; i++ ) {
    if ( data[i].type != 'RetailLocation' ) {
      continue;
    }
    console.log(data[i].$revenue);
    var circle_marker = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: circle_map,
      center: {lat: data[i].latitude, lng: data[i].longitude},
      radius: Math.sqrt(data[i].$revenue)
    });
  }
}
