function alertme() {
  alert('what!?');
}

function chk_pw_rpt() {
  var pw = document.getElementById('pw').value;
  var vpw = document.getElementById('vpw').value;

  if (pw != vpw) {
    document.getElementById('vpw_err').innerHTML = '*passwords do not match!';
  } else {
    document.getElementById('vpw_err').innerHTML = '';
  }
}

function chk_e_rpt() {
  var email = document.getElementById('email').value;
  var vemail = document.getElementById('vemail').value;

  if (email != vemail) {
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
