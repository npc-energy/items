$(function () {
    var reg = /^1[3-9]\d{9}$/;
    $('#pemail').on('keyup', function () {
        if (reg.test($(this).val())) {
            $.ajax({
                type: "post",
                url: "../lib/hasname.php",
                data: {
                    "username": $(this).val()
                },
                dataType: "json",
                success: function (response) {
                    if (response.has) {
                        $('.pemailmsg').html(response.msg).css('color', 'red');
                    } else {
                        $('.pemailmsg').html(response.msg).css('color', 'green');
                    }
                }
            });
        } else {
            $('.pemailmsg').html("手机号格式不正确, 请输入正确的手机号").css('color', 'red');
        }
    });
    // 提交
    $('#reg_submit').on('click', function () {
        console.log($('#pemail').val());
        console.log($('#password').val());
        $.ajax({
            type: "get",
            url: "../lib/register.php",
            data: {
                "username": $('#pemail').val(),
                "password": $('#password').val()
            },
             dataType: "json",
            success: function (response) {
                if(response.has){
                      alert('注册成功');location.href='login.html';
                }else{
                    alert('注册失败');location.href='register.html';
                }
              
            }

        });
    });

});