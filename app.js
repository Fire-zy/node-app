//入口文件
const express = require("express")
const app = express()
const bodyParser = require("body-parser")


//导入跨域的中间件
const cors = require("cors")
app.use(cors())
//配置解析表单数据的中间件，使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//导入并注册用户路由模块
const userRouter = require("./router/user")
app.use("/api", userRouter)

// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//启动服务器
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})