/**
 * 在这里定义和用户相关的路由处理函数，供 /router/modules.js 模块进行调用
 */

//导入sql模块
const db = require("../db/db")

const bcrypt = require('bcryptjs')
const { object } = require("joi")
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')


//查询所有我的模块状态
exports.getModules = (req, res) => {
    const sql = `select * from modules`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) {
            return res.send('查询模块状态失败')
        }
        res.send({
            status: 0,
            message: '获取模块状态成功',
            data: results
        })
    })
}



//提交我的模块状态的处理函数
exports.insertModules = (req, res) => {
    //获取客户端提交到服务器的数据
    const modules = req.body
    //插入新商品信息
    const sql = `insert into modules set ?`
    db.query(sql, modules, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send('提交模块状态失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('提交模块状态成功', 0)
    })
}

//删除我的模块状态
exports.deleteModules = (req, res) => {
    const sql = `delete from modules where id=?`
    db.query(sql, req.body.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send('删除模块状态失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('删除模块状态成功', 0)
    })
}


//更新我的模块状态
exports.updateModules = (req, res) => {
    //定义待执行的sql语句
    const sql = `update modules set? where id=?`
    //调用db.query()执行sql语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句成功，但是影响行数不等于1
        console.log(results.affectedRows)
        if (results.affectedRows !== 1) return res.cc('更新模块状态失败')
        //更新用户成功
        res.cc('更新模块状态成功！', 0)
    })
}