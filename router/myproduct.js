//用户的路由模块

const express = require("express")
const router = express.Router()

const myproduct_handler = require("../router_handler/myproduct")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交商品信息
router.post('/insertMyproduct', myproduct_handler.insertMyproduct)
//删除商品信息
router.post('/deleteMyproduct', myproduct_handler.deleteMyproduct)

router.get('/getMyproduct', myproduct_handler.getMyproduct)

router.post('/updateMyproduct', myproduct_handler.updateMyproduct)

//将路由对象共享出去
module.exports = router;