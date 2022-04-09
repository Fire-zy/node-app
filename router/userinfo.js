const express = require('express')
const router = express.Router()




//导入路由处理模块
const uerinfo_handler = require('../router_handler/userinfo')


//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证的规则对象
const { update_userinfo_schema } = require('../schema/user')


//获取用户的基本信息的路由
router.get('/userinfo', uerinfo_handler.getUserInfo)

//更新用户的基本信息,里面的中间件会验证数据
router.post('/userinfo', expressJoi(update_userinfo_schema), uerinfo_handler.updateUserInfo)

module.exports = router;