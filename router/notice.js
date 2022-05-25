//用户的路由模块

const express = require("express")
const router = express.Router()

const notice_handler = require("../router_handler/notice")

//1.导入验证数据的中间件
// const expressJoi = require('@escook/express-joi')
//2.导入需要的验证规则对象
// const { reg_login_schema, delete_cate_schema } = require('../schema/user')

//提交通知信息
router.post('/insertNotice', notice_handler.insertNotice)
//删除通知信息
router.post('/deleteNotice', notice_handler.deleteNotice)

router.get('/getNotice', notice_handler.getNotice)

router.post('/updateNotice', notice_handler.updateNotice)

//将路由对象共享出去
module.exports = router;