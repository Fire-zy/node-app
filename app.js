//入口文件
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const joi = require('joi')


//导入跨域的中间件
const cors = require("cors")
app.use(cors())
//配置解析表单数据的中间件，使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//一定要在路由之前，封装res.cc函数
app.use((req, res, next) => {
    //status默认值为1，表示失败的情况
    //err可能是错误对象，也可能是一个错误的描述对象
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

//一定要在路由之前配置解析token的中间件
const expressJwt = require('express-jwt')
const config = require('./config')

//验证token
// app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

//导入并注册用户路由模块
const userRouter = require('./router/user')
// const { UnauthorizedError } = require("express-jwt")
app.use('/api', userRouter)

//导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//导入并使用商品信息的路由模块
const productRouter = require('./router/product')
app.use('/product', productRouter)

//导入并使我的选品信息的路由模块
const sampleRouter = require('./router/sample')
app.use('/sample', sampleRouter)

//解决跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
    next();
});

//上传图片
const uploadRouter = require('./router/upload')
app.use('/api', uploadRouter)

//导入并使用订单的路由模块
const orderRouter = require('./router/order')
app.use('/order', orderRouter)

//导入并使用排单的路由模块
const timeRouter = require('./router/time')
app.use('/time', timeRouter)

//导入并使用数据分析的路由模块
const analyseRouter = require('./router/analyse')
app.use('/analyse', analyseRouter)


//导入并使用系统通知的路由模块
const noticeRouter = require('./router/notice')
app.use('/notice', noticeRouter)

//导入并使用模块设置的路由模块
const modulesRouter = require('./router/modules')
app.use('/modules', modulesRouter)


//导入上传文件中间件，能帮助我们实现接收文件的接口
const multer = require('multer')
//接收到的文件放uploads文件夹
const upload = multer({ dest: 'uploads/' })
//使得让外部通过链接可以访问这个文件夹里文件（ 地址 + 端口 / 文件名 ）便可访问
app.use(express.static('uploads'))

app.use('/public', express.static('public'));//将文件设置成静态

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    //身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    // 未知的错误
    res.cc(err)
})


//启动服务器
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})