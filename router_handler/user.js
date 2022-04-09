/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

//导入sql模块
const db = require("../db/db")

const bcrypt = require('bcryptjs')
const { object } = require("joi")
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')

//注册用户的处理函数
exports.register = (req, res) => {
    //获取客户端提交到服务器的数据
    const userInfo = req.body
    //对表单中的数据进行合法的校验
    if (!userInfo.username || !userInfo.password) {
        return res.cc('用户名或密码不合法')
    }

    //根据username查询数据库
    const sqlSelect = `select * from users where username=?`
    db.query(sqlSelect, userInfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }
        //使用bcrypt.hashSync（）对用户密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        //插入新用户
        const sqlInsert = `insert into users set ?`
        db.query(sqlInsert, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            //执行sql语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send('注册用户失败，请稍后再试')
            }
            // 注册成功,注意要写status:0表示注册成功
            res.cc('注册成功', 0)
        })
    })



}

// 登录的处理函数
exports.login = (req, res) => {
    //接收表单的数据
    const userInfo = req.body
    //定义sql语句
    const sqlSelect = `select * from users where username=?`
    //执行sql语句,根据用户名查询用户的信息
    db.query(sqlSelect, userInfo.username, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句成功，但是获取到的数据条不等于1
        if (results.length != 1) return res.cc('登录失败！')

        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误，登陆失败')


        //在服务器端生成token的字符串
        const user = { ...results[0], password: '' }
        //对用户的信息进行加密，生成token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        //将token响应给客户端
        res.send({
            status: 0,
            message: '登陆成功',
            token: 'Bearer ' + tokenStr
        })
    })


}