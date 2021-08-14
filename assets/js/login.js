$(function () {
    // 点击去注册账号的链接
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    // 点击去登录的链接
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    // 从laiui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的
        repwd: function (value) {
            // 通过形参拿到得事确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次判断
            // 如果判断失败则return一个提示消息即可
            var pwd = $(".reg-box [name = password]").val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        //提交ajax post请求
        $.post("/api/reg", {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
                repassword: $("#form_reg [name=repassword]").val()
            },
            function (res) {
                if (res.code !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录")
                // 模拟人点击行为
                $("#link_login").click()


            })





    })

    // 监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            // 快速获取表单数据
            data: $(this).serialize(),

            success: function (res) {
                console.log(res);

                if (res.code !== 0) {
                    return layer.msg("登陆失败")
                }
                layer.msg("登录成功")

                localStorage.setItem("token", res.token)
                // 跳转到index页面
                location.href = "/index.html"
            }
        });
    })


})