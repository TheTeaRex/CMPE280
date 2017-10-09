function alertme() {
  alert('what!?');
}

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
}

function hide_pw_req() {
  document.getElementById('pw_req_col').style.display = 'none';
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

function validate_pw() {
  var ids = ['upper', 'lower', 'number', 'special', 'lenght', 'same', 'nospace']
  password = document.getElementById('pw').value
  validate_upper(password);
  validate_lower(password);
  validate_fouralphabets(password);
  validate_number(password);
  validate_special(password);
  validate_length(password);
  validate_same(password);
  validate_nospace(password);
}

function validate_upper(password) {
  var id = 'upper';
  if (password.match(/[A-Z]/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_lower(password) {
  var id = 'lower';
  if (password.match(/[a-z]/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_fouralphabets(password) {
  var id = 'fouralphabets';
  if (password.match(/[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_number(password) {
  var id = 'number';
  if (password.match(/[0-9]/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_special(password) {
  var id = 'special';
  if (password.match(/[!$#%]/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_special(password) {
  var id = 'special';
  if (password.match(/[!$#%]/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_length(password) {
  var id = 'length';
  if (7 <= password.length && password.length <= 20) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_same(password) {
  var id = 'same';
  if (password != document.getElementById('user').value) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}

function validate_nospace(password) {
  var id = 'nospace';
  if (!password.match(/\s/g)) {
    mk_valid(id);
  } else {
    mk_invalid(id);
  }
}
