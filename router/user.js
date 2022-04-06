//用户的路由模块

const express = require("express")
const router = express.Router()

const userHandler = require("../router_handler/user")

//注册新用户
router.post('/register', userHandler.register)
//登录
router.post('/login', userHandler.login)

//将路由对象共享出去
module.exports = router;