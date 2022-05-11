//用户的路由模块

const express = require("express")
const router = express.Router()

const userHandler = require("../router_handler/user")

//1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//注册新用户
router.post('/register', userHandler.register)
//登录
// router.post('/login', expressJoi(reg_login_schema), userHandler.login)
router.post('/login', userHandler.login)


//超级管理员，删除某位用户
router.get('/deleteUser/:id', expressJoi(delete_cate_schema), userHandler.deleteUser)

//将路由对象共享出去
module.exports = router;