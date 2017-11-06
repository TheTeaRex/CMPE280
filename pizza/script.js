var translation = {
  'hts': 'Hand Tossed Small',
  'htm': 'Hand Tossed Medium',
  'htl': 'Hand Tossed Large',
  'htxl': 'Hand Tossed Extra-Large',
  'hmpm': 'Hand Made Pan Medium',
  'ctcm': 'Crunchy Thin Crust Medium',
  'ctcl': 'Crunchy Thin Crust Large',
  'bsl': 'Brooklyn Style Large',
  'bsxl': 'Brooklyn Style Extra-Large',
  'gfls': 'Gluten Free Crust Small',
  'rits': 'Robust Inspired Tomato Sauce',
  'hms': 'Hearty Marinara Sauce',
  'bbq': 'BBQ Sauce',
  'gpws': 'Garlic Parmesan White Sauce',
  'as': 'Alfredo Sauce',
  'light': 'Light',
  'normal': 'Normal',
  'extra': 'Extra',
  'double': 'Double',
  'pepperoni': 'Pepperoni',
  'sausage': 'Italian Sausage',
  'sliced_sausage': 'Sliced Italian Sausage',
  'beef': 'Beef',
  'philly_steak': 'Philly Steak',
  'ham': 'Ham',
  'bacon': 'Bacon',
  'salami': 'Salami',
  'chicken': 'Chicken',
  'cheddar_cheese': 'Cheddar Cheese',
  'feta_cheese': 'Feta Cheese',
  'asiago': 'Shredded Parmesan Asiago',
  'provolone_cheese': 'Sgreeded Provolone Cheese',
  'banana_cheese': 'Banana Peppers',
  'olives': 'Olives',
  'garlic': 'Garlic',
  'green_peppers': 'Green Pepper',
  'jalapeno_peppers': 'Jalapeno Peppers',
  'mushrooms': 'Mushrooms',
  'pineapple': 'Pineapple',
  'onions': 'Onions',
  'red_peppers': 'Roasted Red Pepper',
  'spinach': 'Spinach',
  'tomatoes': 'Diced Tomatoes',
  'hot_sauce': 'Hot Sauce'
};
var size_crust_selection = '';
var meat_toppings = [];
var nonmeat_toppings = [];
var cheese_selection = {};
var sauce_selection = {};
var toppings_sorted = {};

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
          break;
        };
      };
      var right = document.getElementsByName('right');
      for (i = 0; i < right.length; i++) {
        if (right[i].selected) {
          cheese_selection['right'] = right[i].value;
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
          break;
        };
      };
      var sauce_sel = document.getElementsByName('sauce_choices');
      for (i = 0; i < sauce_sel.length; i++) {
        if (sauce_sel[i].checked) {
          sauce_selection['sauce'] = sauce_sel[i].value;
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

    if (toppings.value == 'not set') {
      return false;
    } else {
      console.log('showing dashboard section');
      var third = document.getElementById('toppings_section');
      var fourth = document.getElementById('dashboard_section');
      var build = document.getElementById('build');
      var home = document.getElementById('home');
      var container = document.getElementById('inner_container');
      third.style.display = 'none';
      fourth.style.display = 'block';
      build.style.display = 'none';
      home.style.display = 'block';
      container.style.height = '950px';
      display_dashboard();
    };
  };
};

function display_dashboard() {
  console.log(size_crust_selection);
  console.log(cheese_selection);
  console.log(sauce_selection);
  console.log(meat_toppings);
  console.log(nonmeat_toppings);
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(draw_pie_chart);
  google.charts.load('current', {'packages':['sankey']});
  google.charts.setOnLoadCallback(draw_sankey);
};

function draw_pie_chart() {
  toppings_sorted = sort_toppings();
  var data = google.visualization.arrayToDataTable([
    ['Toppings', 'Portion'],
    ['Meat', toppings_sorted['meat']],
    ['Cheese', toppings_sorted['cheese']],
    ['Olives', toppings_sorted['olives']],
    ['Garlic', toppings_sorted['garlic']],
    ['Mushrooms', toppings_sorted['mushrooms']],
    ['Fruit', toppings_sorted['fruit']],
    ['Vegetables', toppings_sorted['veggies']],
    ['Peppers', toppings_sorted['peppers']],
  ]);

  var options = {
    title: 'Toppings Distribution'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
};

function sort_toppings() {
  result = {};

  result['meat'] = meat_toppings.length;
  result['cheese'] = 0;
  if (nonmeat_toppings.indexOf('cheddar_cheese') > -1) {
    result['cheese']++;
  };
  if (nonmeat_toppings.indexOf('feta_cheese') > -1) {
    result['cheese']++;
  };
  if (nonmeat_toppings.indexOf('asiago') > -1) {
    result['cheese']++;
  };
  if (nonmeat_toppings.indexOf('provolone_cheese') > -1) {
    result['cheese']++;
  };

  result['olives'] = (nonmeat_toppings.indexOf('olives') > -1) ? 1 : 0;
  result['garlic'] = (nonmeat_toppings.indexOf('garlic') > -1) ? 1 : 0;
  result['mushrooms'] = (nonmeat_toppings.indexOf('mushrooms') > -1) ? 1 : 0;

  result['fruit'] = 0;
  if (nonmeat_toppings.indexOf('pineapple') > -1) {
    result['fruit']++;
  };
  if (nonmeat_toppings.indexOf('tomatoes') > -1) {
    result['fruit']++;
  };

  result['veggies'] = 0;
  if (nonmeat_toppings.indexOf('onions') > -1) {
    result['veggies']++;
  };
  if (nonmeat_toppings.indexOf('spinach') > -1) {
    result['veggies']++;
  };

  result['peppers'] = 0;
  if (nonmeat_toppings.indexOf('banana_peppers') > -1) {
    result['peppers']++;
  };
  if (nonmeat_toppings.indexOf('green_peppers') > -1) {
    result['peppers']++;
  };
  if (nonmeat_toppings.indexOf('jalapeno_peppers') > -1) {
    result['peppers']++;
  };
  if (nonmeat_toppings.indexOf('red_peppers') > -1) {
    result['peppers']++;
  };

  console.log(result);
  return result;
};

function draw_sankey() {
  var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows(create_sankey_array());

  // Instantiates and draws our chart, passing in some options.
  var chart = new google.visualization.Sankey(document.getElementById('sankey'));
  chart.draw(data);
};

function create_sankey_array() {
  result = [];

  if ('left' in cheese_selection) {
    result.push([translation[size_crust_selection], 'left cheese', quantity_to_weight(cheese_selection['left'])]);
    result.push([translation[size_crust_selection], 'right cheese', quantity_to_weight(cheese_selection['right'])]);
  };

  if ('sauce' in sauce_selection) {
    result.push([translation[size_crust_selection], translation[sauce_selection['sauce']], quantity_to_weight(sauce_selection['quantity'])]);
  };

  if (meat_toppings.length != 0) {
    if ('left' in cheese_selection) {
      for (i = 0; i < meat_toppings.length; i++) {
        if (get_random_number(6) != 1) {
          result.push(['left cheese', translation[meat_toppings[i]], get_random_number(5)]);
        };
        if (get_random_number(6) != 1) {
          result.push(['right cheese', translation[meat_toppings[i]], get_random_number(5)]);
        };
      };
    };
    if ('sauce' in sauce_selection) {
      for (i = 0; i < meat_toppings.length; i++) {
        if (get_random_number(6) != 1) {
          result.push([translation[sauce_selection['sauce']], translation[meat_toppings[i]], get_random_number(5)]);
        };
      };
    };
    if (!('left' in cheese_selection) && !('sauce' in sauce_selection)) {
      for (i = 0; i < meat_toppings.length; i++) {
        result.push([translation[size_crust_selection], translation[meat_toppings[i]], get_random_number(5)]);
      };
    };
    if (nonmeat_toppings.length != 0) {
      for (i = 0; i < meat_toppings.length; i++) {
        for (j = 0; j <nonmeat_toppings.length; j++) {
          if (get_random_number(6) != 1) {
            result.push([translation[meat_toppings[i]], translation[nonmeat_toppings[j]], get_random_number(5)]);
          };
        };
      };
    };
  };

  if (nonmeat_toppings.length != 0) {
    if (meat_toppings.length == 0 && !('sauce' in sauce_selection) && !('left' in cheese_selection)) {
      for (i = 0; i < nonmeat_toppings.length; i++) {
        result.push([translation[size_crust_selection], translation[nonmeat_toppings[i]], get_random_number(5)]);
      };
    };
    if ('sauce' in sauce_selection) {
      for (i = 0; i < nonmeat_toppings.length; i++) {
        if (get_random_number(6) != 1) {
          result.push([translation[sauce_selection['sauce']], translation[nonmeat_toppings[i]], get_random_number(5)]);
        };
      };
    };
    if ('left' in cheese_selection) {
      for (i = 0; i < nonmeat_toppings.length; i++) {
        if (get_random_number(6) != 1) {
          result.push(['left cheese', translation[nonmeat_toppings[i]], get_random_number(5)]);
        };
        if (get_random_number(6) != 1) {
          result.push(['right cheese', translation[nonmeat_toppings[i]], get_random_number(5)]);
        };
      };
    };
  };

  return result;
};

function quantity_to_weight(q) {
  if (q == 'light') {
    return 1;
  } else if (q == 'normal') {
    return 2;
  } else if (q == 'extra') {
    return 3;
  } else if (q == 'double') {
    return 4;
  } else {
    return 0;
  };
};

function get_random_number(num) {
  return (Math.floor(Math.random() * 100) % num) + 1;
};
