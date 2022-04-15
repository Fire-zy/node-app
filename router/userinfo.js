const express = require('express')
const router = express.Router()




//导入路由处理模块
const uerinfo_handler = require('../router_handler/userinfo')


//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证的规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')


//获取用户的基本信息的路由
router.get('/userinfo', uerinfo_handler.getUserInfo)

//更新用户的基本信息,里面的中间件会验证数据
router.post('/userinfo', expressJoi(update_userinfo_schema), uerinfo_handler.updateUserInfo)

//重置密码路由
router.post('/updatepwd', expressJoi(update_password_schema), uerinfo_handler.updatePassword)

//更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), uerinfo_handler.updateAvatar)

module.exports = router;