/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

//导入sql模块
const db = require("../db/db")

const bcrypt = require('bcryptjs')

//注册用户的处理函数
exports.register = (req, res) => {
    //获取客户端提交到服务器的数据
    const userInfo = req.body
    //对表单中的数据进行合法的校验
    if (!userInfo.username || !userInfo.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不合法'
        })
    }

    //根据username查询数据库
    const sqlSelect = `select * from users where username=?`
    db.query(sqlSelect, userInfo.username, (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名'
            })
        }
        //使用bcrypt.hashSync（）对用户密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        //插入新用户
        const sqlInsert = `insert into users set ?`
        db.query(sqlInsert, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            //执行sql语句失败
            if (err) if (err) return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, message: '注册成功！' })
        })
    })



}

// 登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}