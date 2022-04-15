const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


//定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()




// 定义注册和登录表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}

//验证规则对象-更新用户基本信息
exports.update_userinfo_schema = {
    //需要对req.body里面的数据进行验证
    body: {
        id,
        nickname,
        email
    }
}

//验证密码对象规则
exports.update_password_schema = {
    //使用password这个规则，验证req.body.oldPwd的值
    body: {
        oldPwd: password,
        //1. joi.ref('oldPwd')表示newPwd的值必须和oldPwd的值保持一致
        //2. joi.not(joi.ref('oldPwd'))表示newPwd的值不能等于oldPwd的值
        //3. 。conact()用于合并joi.not(joi.ref('oldPwd'))和password的值
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

//修改头像，验证表单数据
//dataUri()指的是如下格式的字符串数据
//data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()
exports.update_avatar_schema = {
    body: {
        avatar
    }
}

//定义分类id的校验规则
// const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params: {
        id
    }
}