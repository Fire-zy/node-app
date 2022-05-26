//排单的路由模块

const express = require("express")
const router = express.Router()

const modules_handler = require("../router_handler/modules")



router.post('/insertModules', modules_handler.insertModules)
router.post('/deleteModules', modules_handler.deleteModules)

router.get('/getModules', modules_handler.getModules)

router.post('/updateModules', modules_handler.updateModules)

//将路由对象共享出去
module.exports = router;