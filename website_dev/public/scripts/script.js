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

var server_form_submission = 'http://localhost:3000/submit';

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

  // loading the google maps
  var locations = ['#santa_clara', '#south_san_jose', '#mountain_view', '#milpitas']
  // $('#santa_clara_map').attr('src', 'https://www.google.com/maps/embed/v1/view?key=AIzaSyBNHiPabrQaE7rYgoivlDOP9GDtkIGyGOQ&center=-33.8569,151.2152&zoom=18'); 

  $('#submit').bind('click', function(event) {
    var data = {
      'first': $('#first').val(),
      'last': $('#last').val(),
      'email': $('#email').val()
    };
    $.ajax({
      type: 'POST',
      url: server_form_submission,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(result) {
        console.log(result.result);
        $('#form_start').hide();
        $('#form_result').show();
        $('#form_result').text(result.result.message);
        if (result.result.code == 0) {
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
});

function initMap() {
  // var locations = ['#santa_clara', '#south_san_jose', '#mountain_view', '#milpitas'];
  var map = new google.maps.Map(document.getElementById('santa_clara'), {
    zoom: 5,
    center: {lat: 37.328933, lng: -121.945702}
  });
  var marker = new google.maps.Marker({
    position: {lat: 37.345289, lng: -121.936751},
    map: map
  });
  $("#santa_clara").on("shown.bs.tab", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
  });
};
