var size_crust_selection = '';
var meat_toppings = [];
var nonmeat_toppings = [];
var cheese_selection = {};
var sauce_selection = {};

function init() {
  console.log('showing size and crust section');
  var second = document.getElementById('cheese_sauce_section');
  var third = document.getElementById('toppings_section');
  var fourth = document.getElementById('dashboard_section');
  var home = document.getElementById('home');
  second.style.display = 'none';
  third.style.display = 'none';
  fourth.style.display = 'none';
  home.style.display = 'none';
};

function cheese_change() {
  var cheese = document.getElementById('cheese');
  var selection = document.getElementById('cheese_selection');
  if (cheese.checked) {
    selection.style.display = 'block';
  } else {
    selection.style.display = 'none';
  };
};

function sauce_change() {
  var sauce = document.getElementById('sauce');
  var selection = document.getElementById('sauce_selection');
  if (sauce.checked) {
    selection.style.display = 'block';
  } else {
    selection.style.display = 'none';
  };
};

function change_page() {
  console.log('clicked');
  var size_crust = document.getElementById('size_crust');
  var cheese_sauce = document.getElementById('cheese_sauce');
  var toppings = document.getElementById('toppings');
  if (size_crust.value == 'not set') {
    // size and crust
    var size = document.getElementsByName('size');
    for (i = 0; i < size.length; i++) {
      if (size[i].checked) {
        size_crust.value = size[i].value;
        size_crust_selection = size[i].value;
        console.log(size_crust.value);
        break;
      };
    };

    if (size_crust.value == 'not set') {
      return false;
    } else {
      console.log('showing cheese and sauce section');
      var first = document.getElementById('size_crust_section');
      var second = document.getElementById('cheese_sauce_section');
      first.style.display = 'none';
      second.style.display = 'block';
    };
  } else if (cheese_sauce.value == 'not set') {
    // cheese and sauce
    cheese_sauce.value = 'set';
    var cheese = document.getElementById('cheese');
    if (cheese.checked) {
      var left = document.getElementsByName('left');
      for (i = 0; i < left.length; i++) {
        if (left[i].selected) {
          cheese_selection['left'] = left[i].value;
          console.log(left[i].value);
          break;
        };
      };
      var right = document.getElementsByName('right');
      for (i = 0; i < right.length; i++) {
        if (right[i].selected) {
          cheese_selection['right'] = right[i].value;
          console.log(right[i].value);
          break;
        };
      };
    };

    var sauce = document.getElementById('sauce');
    if (sauce.checked) {
      var sauce_quantity = document.getElementsByName('sauce_quantity');
      for (i = 0; i < sauce_quantity.length; i++) {
        if (sauce_quantity[i].selected) {
          sauce_selection['quantity'] = sauce_quantity[i].value;
          console.log(sauce_quantity[i].value);
          break;
        };
      };
      var sauce_sel = document.getElementsByName('sauce_choices');
      for (i = 0; i < sauce_sel.length; i++) {
        if (sauce_sel[i].checked) {
          sauce_selection['sauce'] = sauce_sel[i].value;
          console.log(sauce_sel[i].value);
          break;
        };
      };
    };

    if (cheese_sauce.value == 'not set') {
      return false;
    } else {
      console.log('showing toppings section');
      var second = document.getElementById('cheese_sauce_section');
      var third = document.getElementById('toppings_section');
      second.style.display = 'none';
      third.style.display = 'block';
    };

  } else if (toppings.value == 'not set') {
    // toppings
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

    if (toppings.value == 'not set') {
      return false;
    } else {
      console.log('showing dashboard section');
      var third = document.getElementById('toppings_section');
      var fourth = document.getElementById('dashboard_section');
      var build = document.getElementById('build');
      var home = document.getElementById('home');
      third.style.display = 'none';
      fourth.style.display = 'block';
      build.style.display = 'none';
      home.style.display = 'block';
      print_selections();
    };
  };
};

function print_selections() {
  console.log(size_crust_selection);
  console.log(cheese_selection);
  console.log(sauce_selection);
  console.log(meat_toppings);
  console.log(nonmeat_toppings);
};
