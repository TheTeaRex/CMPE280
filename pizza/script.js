var meat_toppings = [];
var nonmeat_toppings = [];

function init() {
  console.log('showing size and crust section');
  var second = document.getElementById('toppings_section');
  second.style.display = 'none';
};

function change_page() {
  console.log('clicked');
  var size_crust = document.getElementById('size_crust');
  var toppings = document.getElementById('toppings');
  if (size_crust.value == 'not set') {
    var size = document.getElementsByName('size');
    for (i = 0; i < size.length; i++) {
      if (size[i].checked) {
        size_crust.value = size[i].value;
        console.log(size_crust.value);
        break;
      };
    };

    if (size_crust.value == 'not set') {
      return false;
    } else {
      console.log('showing topping section');
      var first = document.getElementById('size_crust_section');
      var second = document.getElementById('toppings_section');
      first.style.display = 'none';
      second.style.display = 'block';
    }
  } else if (toppings.value == 'not set') {
    var meat = document.getElementsByName('meat');
    var nonmeat = document.getElementsByName('nonmeat');
    for (i = 0; i < meat.length; i++) {
      if (meat[i].checked) {
        toppings.value = 'set';
        meat_toppings.push(meat[i].value);
      };
    };
    for (i = 0; i < nonmeat.length; i++) {
      if (nonmeat[i].checked) {
        toppings.value = 'set';
        nonmeat_toppings.push(nonmeat[i].value);
      };
    };
    console.log(meat_toppings);
    console.log(nonmeat_toppings);
  };

};
