//用户的路由模块

const express = require("express")
const router = express.Router()

const order_handler = require("../router_handler/order")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交订单信息
router.post('/insertOrder', order_handler.insertOrder)
//删除订单信息
router.post('/deleteOrder', order_handler.deleteOrder)

router.get('/getOrder', order_handler.getOrder)

router.post('/updateOrder', order_handler.updateOrder)

//将路由对象共享出去
module.exports = router;