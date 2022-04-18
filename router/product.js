//用户的路由模块

const express = require("express")
const router = express.Router()

const product_handler = require("../router_handler/product")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交商品信息
router.post('/insertProduct', product_handler.updateProduct)
//删除商品信息
router.post('/deleteProduct', product_handler.deleteProduct)

router.get('/getProduct', product_handler.getProduct)

router.post('/updateProduct', product_handler.updateProduct)

//将路由对象共享出去
module.exports = router;