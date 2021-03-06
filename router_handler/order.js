/**
 * 在这里定义和用户相关的路由处理函数，供 /router/order.js 模块进行调用
 */

//导入sql模块
const db = require("../db/db")

const bcrypt = require('bcryptjs')
const { object } = require("joi")
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')

//提交我的选品信息的处理函数
exports.insertOrder = (req, res) => {
    //获取客户端提交到服务器的数据
    const order = req.body
    //插入新商品信息
    const sql = `insert into orders set ?`
    db.query(sql, order, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send('提交我的商品信息失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('提交我的商品信息成功', 0)
    })
}

//删除我的选品信息
exports.deleteOrder = (req, res) => {
    const sql = `delete from orders where id=?`
    db.query(sql, req.body.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send('删除订单失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('删除订单成功', 0)
    })
}

//查询我的选品信息
exports.getOrder = (req, res) => {
    const sql = `select * from orders where id=?`
    db.query(sql, req.body.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.length < 1) {
            return res.send('查询订单失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        // res.cc('查询商品信息成功', 0)
        res.send({
            status: 0,
            message: '获取订单内容成功',
            data: results
        })
    })
}
//更新我的选品信息
exports.updateOrder = (req, res) => {
    //定义待执行的sql语句
    const sql = `update orders set? where id=?`
    //调用db.query()执行sql语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句失败，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('更新订单失败')
        //更新用户成功
        res.cc('更新订单成功！', 0)
    })
}