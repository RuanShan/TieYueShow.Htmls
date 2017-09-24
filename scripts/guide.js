///////////////////////////////////////////////////////////////////////////////
// 首页密码退出功能
$(document).ready(function(){

  $('#exitModal').on('shown.bs.modal', function (e) {
    $('.password-form-group').removeClass('has-error');
    $('.password-form-group .help-block').text('');

    $('#exit_password').val('').focus();
  })
  // 点击退出按钮，输入密码，退出
  // exit_password
  $('#exit_with_password_btn').on( 'click', function(){

    $('#exitModal').modal();

  })

  $('#exit_with_password_confirm_btn').click(function(){

    if (window.c_bound) {
      var password = $('#exit_password').val();
      if(c_bound.onTrigger('validtePassword', password) == 1)
      {
        c_bound.onTrigger( 'exit', 'required' );
      }else{
        $('.password-form-group').addClass('has-error');
        $('.password-form-group .help-block').text('密码错误！');
      }
    }else{
      $('#myModal').modal('hide');
      alert('发生系统错误');
    }

  });
})
