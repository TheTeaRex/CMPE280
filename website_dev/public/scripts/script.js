var paragraphs = {
  '#management_paragraph': 'files/management.txt',
  '#cc_paragraph': 'files/code_of_conduct.txt',
  '#iot_paragraph': 'files/iot.txt',
  '#big_data_paragraph': 'files/big_data.txt',
  '#mobile_paragraph': 'files/mobile.txt',
  '#bp_paragraph': 'files/business_process.txt'
};

var popovers = {
  '.right1': 'files/right1.txt',
  '.right2': 'files/right2.txt',
  '.ceo_pop': 'files/ceo_desc.txt',
  '.coo_pop': 'files/coo_desc.txt',
  '.cfo_pop': 'files/cfo_desc.txt',
  '.cto_pop': 'files/cto_desc.txt',
  '.cpo_pop': 'files/cpo_desc.txt'
}

var locations = {
  'santa_clara': {
    'id': 'santa_clara',
    'map': 'santa_clara_map',
    'street': '2605 The Alameda',
    'city': 'Santa Clara',
    'state': 'CA',
    'zip': '95050',
    'lat': 37.345346,
    'lng': -121.936433
  },
  'mountain_view': {
    'id': 'mountain_view',
    'map': 'mountain_view_map',
    'street': '570 N Shoreline Blvd',
    'city': 'Mountain View',
    'state': 'CA',
    'zip': '94043',
    'lat': 37.403028,
    'lng': -122.079240
  },
  'south_san_jose': {
    'id': 'south_san_jose',
    'map': 'south_san_jose_map',
    'street': '4950 Almaden Expy',
    'city': 'San Jose',
    'state': 'CA',
    'zip': '95118',
    'lat': 37.322822,
    'lng': -121.912135
  },
  'milpitas': {
    'id': 'milpitas',
    'map': 'milpitas_map',
    'street': '555 E Calaveras Blvd',
    'city': 'Milpitas',
    'state': 'CA',
    'zip': '95035',
    'lat': 37.434960,
    'lng': -121.898005
  }
};

var delay_load = 500;

var server_form_submission = 'http://localhost:3000/';

$(document).ready(function() {
  $('[data-toggle="popover"]').popover();

  // filling paragraphs
  $.each(paragraphs, function(key, value) {
    $.ajax({
      async: false,
      url: value,
      dataType: 'text',
      success: function(data) {
        $(key).append(data.replace(/\n/g, "<br>"));
      }
    });
  });

  // filling the popover content
  $.each(popovers, function(key, value) {
    $.ajax({
      async: false,
      url: value,
      dataType: 'text',
      success: function(data) {
        $(key).attr('data-content', data);
      }
    });
  });

  // loading the blog entrys
  $.ajax({
    type: 'GET',
    url: server_form_submission + 'getBlogEntries',
    success: function(results) {
      var toggle = 0;
      $.each(results, function(index, item) {
        var new_li;
        if (toggle == 0) {
          new_li = $('<li></li>').addClass('list-group-item').addClass('list-group-item-dark').text(item.entry + ' - ' + item.time)
          toggle = 1;
        } else {
          new_li = $('<li></li>').addClass('list-group-item').text(item.entry + ' - ' + item.time)
          toggle = 0;
        };
        $('#entry_list').append(new_li);
      });
    }
  });

  $('#submit').bind('click', function(event) {
    var data = {
      'first': $('#first').val(),
      'last': $('#last').val(),
      'email': $('#email').val()
    };
    $.ajax({
      type: 'POST',
      url: server_form_submission + 'submit',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(result) {
        console.log(result);
        $('#form_start').hide();
        $('#form_result').show();
        $('#form_result').text(result.message);
        if (result.code == 0) {
          $('#form_result').css('color', 'green');
        } else {
          $('#form_result').css('color', 'red');
        };
        $('#first').val('');
        $('#last').val('');
        $('#email').val('');
        setTimeout(function(){
          $('#white_paper_modal').modal('toggle');
          $('#form_start').show();
          $('#form_result').hide();
        }, 2000);
      }
    });
  });

  $('#submitEntry').bind('click', function(event) {
    var dt = new Date();
    var time = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    var data = {
      'entry': $('#entry').val(),
      'time': time
    };
    console.log(data);
    $.ajax({
      type: 'POST',
      url: server_form_submission + 'blogSubmit',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(result) {
        console.log(result);
        var new_li;
        if ($('#entry_list li:first').hasClass('list-group-item-dark')) {
          new_li = $('<li></li>').addClass('list-group-item').text(data.entry + ' - ' + data.time)
        } else {
          new_li = $('<li></li>').addClass('list-group-item').addClass('list-group-item-dark').text(data.entry + ' - ' + data.time)
        };
        $('#entry_list').prepend(new_li);
        $('#entry').val('');
      }
    });
  });

});

function initMap() {
  //unfortunately bootstrap doesn't play well with google map
  //so there is not point on actually initializing the map here
};

function initMapSecond(id) {
  var loc = {
    'id': id,
    'obj': document.getElementById(locations[id].map),
    'map': locations[id].map,
    'lat': locations[id].lat,
    'lng': locations[id].lng,
    'street': locations[id].street,
    'city': locations[id].city,
    'state': locations[id].state,
    'zip': locations[id].zip
  }
  setTimeout(function () {
    create_map(loc);
  }, delay_load);
};

function create_map(item) {
  var address = item.street + '<br>' + item.city + ', ' + item.state + ' ' + item.zip
  var annotation = '<p><b>Address:</b><br>' + address + '</p>';
  $('#' + item.id + ' .address p').html(address);
  var map = new google.maps.Map(item.obj, {
    zoom: 15,
    center: {lat: item.lat, lng: item.lng}
  });
  var marker = new google.maps.Marker({
    position: {lat: item.lat, lng: item.lng},
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: annotation
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
};
