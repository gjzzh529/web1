$(function () {
    //点击去注册账号链接
    $("#link_reg").on("click", function () {
        // 登陆的盒子隐藏
        $(".login-box").hide()
        // 注册的盒子显示出来
        $(".reg-box").show()

    })

    // 点击去登陆的链接
    $("#link_login").on("click", function () {
        // 登陆的盒子显示
        $(".login-box").show()
        // 注册的盒子隐藏
        $(".reg-box").hide()
    })

    // 从laiui中获取form对象
    var form = layui.form
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [/^[\s]{6,12}$/, '密码必须6到12位且不能出现空格'],
        // 检验两次密码是否为一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框的中内容
            // 然后进行一次等于的判断
            // 如果判断失败则return一个提示信息即可
            var pwd = $('.reg-box[name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })
})