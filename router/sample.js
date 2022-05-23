//用户的路由模块

const express = require("express")
const router = express.Router()

const sample_handler = require("../router_handler/sample")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交商品信息
router.post('/insertSample', sample_handler.insertSample)
//删除商品信息
router.post('/deleteSample', sample_handler.deleteSample)

router.get('/getSample', sample_handler.getSample)
router.post('/getDifferent', sample_handler.getDifferent)

router.post('/updateSample', sample_handler.updateSample)

//将路由对象共享出去
module.exports = router;