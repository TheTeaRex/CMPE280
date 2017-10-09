function chk_pw_rpt() {
  var pw = document.getElementById('pw').value;
  var vpw = document.getElementById('vpw').value;

  if (document.getElementById('vpw').value.length != 0 && pw != vpw) {
    document.getElementById('vpw_err').innerHTML = '*passwords do not match!';
  } else {
    document.getElementById('vpw_err').innerHTML = '';
  }
}

function chk_e_rpt() {
  var email = document.getElementById('email').value;
  var vemail = document.getElementById('vemail').value;

  if (document.getElementById('vemail').value.length != 0 && email != vemail) {
    document.getElementById('vemail_err').innerHTML = '*emails do not match!';
  } else {
    document.getElementById('vemail_err').innerHTML = '';
  }
}

function chk_q_rpt() {
  var q1 = document.getElementById('question1').value;
  var q2 = document.getElementById('question2').value;

  if (q1 == q2) {
    document.getElementById('q_err').innerHTML = '*cannot select the same security question as the first one';
  } else {
    document.getElementById('q_err').innerHTML = '';
  }
}

function show_pw_req() {
  document.getElementById('pw_req_col').style.display = 'block';
  pw_strength();
}

function hide_pw_req() {
  document.getElementById('pw_req_col').style.display = 'none';
  pw_strength();
}

function mk_valid(id) {
  var obj = document.getElementById(id);
  obj.innerHTML = '&#x2714';
  obj.style.color = 'green';
}

function mk_invalid(id) {
  var obj = document.getElementById(id);
  obj.innerHTML = '&#x2718';
  obj.style.color = 'red';
}

function pw_strength() {
  var block = document.getElementById('pw_strength');
  var correct = validate_pw();
  if (document.getElementById('pw').value.length == 0) {
    block.style.display = 'none';
  } else {
    block.style.display = 'block';
    base = 'Current Password Strength: ';
    if (7 <= correct && correct <= 8) {
      block.innerHTML = base + 'Strong';
      block.style.backgroundColor = 'green';
      block.style.color = 'White';
    } else if (4 <= correct && correct <=6) {
      block.innerHTML = base + 'Moderate';
      block.style.backgroundColor = 'yellow';
      block.style.color = 'black';
    } else {
      block.innerHTML = base + 'Weak';
      block.style.backgroundColor = 'red';
      block.style.color = 'white';
    }
  }
}

function validate_pw() {
  var result = 0;
  var password = document.getElementById('pw').value
  result += validate_upper(password);
  result += validate_lower(password);
  result += validate_fouralphabets(password);
  result += validate_number(password);
  result += validate_special(password);
  result += validate_length(password);
  result += validate_same(password);
  result += validate_nospace(password);
  return result;
}

function validate_upper(password) {
  var id = 'upper';
  if (password.match(/[A-Z]/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_lower(password) {
  var id = 'lower';
  if (password.match(/[a-z]/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_fouralphabets(password) {
  var id = 'fouralphabets';
  if (password.match(/[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_number(password) {
  var id = 'number';
  if (password.match(/[0-9]/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_special(password) {
  var id = 'special';
  if (password.match(/[!$#%]/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_special(password) {
  var id = 'special';
  if (password.match(/[!$#%]/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_length(password) {
  var id = 'length';
  if (7 <= password.length && password.length <= 20) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_same(password) {
  var id = 'same';
  if (password != document.getElementById('user').value) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}

function validate_nospace(password) {
  var id = 'nospace';
  if (!password.match(/\s/g)) {
    mk_valid(id);
    return 1;
  } else {
    mk_invalid(id);
    return 0;
  }
}
