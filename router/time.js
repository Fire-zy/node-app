//排单的路由模块

const express = require("express")
const router = express.Router()

const time_handler = require("../router_handler/time")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交排期信息
router.post('/insertTime', time_handler.insertTime)
//删除排期信息
router.post('/deleteTime', time_handler.deleteTime)

router.get('/getTime', time_handler.getTime)

router.post('/updateTime', time_handler.updateTime)

//将路由对象共享出去
module.exports = router;