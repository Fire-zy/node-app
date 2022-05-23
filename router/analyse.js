//排单的路由模块

const express = require("express")
const router = express.Router()

const analyse_handler = require("../router_handler/analyse")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交排期信息
router.post('/insertAnalyse', analyse_handler.insertAnalyse)
//删除排期信息
router.post('/deleteAnalyse', analyse_handler.deleteAnalyse)

router.get('/getAnalyse', analyse_handler.getAnalyse)
router.post('/getDifferent', analyse_handler.getDifferent)


router.post('/updateAnalyse', analyse_handler.updateAnalyse)

//将路由对象共享出去
module.exports = router;