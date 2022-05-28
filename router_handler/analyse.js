/**
 * 在这里定义和用户相关的路由处理函数，供 /router/analyse.js 模块进行调用
 */

//导入sql模块
const db = require("../db/db")

const bcrypt = require('bcryptjs')
const { object } = require("joi")
//导入生成token的包
const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')


//查询所有我的数据分析
exports.getAnalyse = (req, res) => {
    const sql = `select * from analyse`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) {
            return res.send('查询数据分析失败')
        }
        function Score(value, callback) {
            var rank = 0
            if (value > 4.8) {
                rank += 100
                callback(rank)
            } else if (value <= 4.8 && value > 4.7) {
                rank += 90
                callback(rank)
            } else if (value <= 4.7 && value > 4.6) {
                rank += 80
                callback(rank)
            } else if (value <= 4.6 && value > 4.5) {
                rank += 70
                callback(rank)
            } else {
                rank += 60
                callback(rank)
            }
        }
        for (let key in results) {
            var sum = 0  //总分
            var logscore = results[key].logscore  //物流评分
            var serscore = results[key].serscore  //服务评分
            var describescore = results[key].describescore  //描述评分
            Score(logscore, function (rank) {
                sum += rank * 0.25
            })
            Score(serscore, function (rank) {
                sum += rank * 0.25
            })
            Score(describescore, function (rank) {
                sum += rank * 0.25
            })
            // console.log(sum)
        }
        res.send({
            status: 0,
            message: '获取数据分析成功',
            data: results
        })
    })
}

//按需查询数据
exports.getDifferent = (req, res) => {
    const sql = `select * from analyse where pro_type=?`
    db.query(sql, req.body.pro_type, (err, results) => {
        if (err) return res.cc(err)
        if (results.length < 1) {
            return res.send('查询数据分析失败')
        }
        function Score(value, callback) {
            var rank = 0
            if (value > 4.8) {
                rank += 100
                callback(rank)
            } else if (value <= 4.8 && value > 4.7) {
                rank += 90
                callback(rank)
            } else if (value <= 4.7 && value > 4.6) {
                rank += 80
                callback(rank)
            } else if (value <= 4.6 && value > 4.5) {
                rank += 70
                callback(rank)
            } else {
                rank += 60
                callback(rank)
            }
        }
        for (let key in results) {
            var sum = 0  //总分
            var logscore = results[key].logscore  //物流评分
            var serscore = results[key].serscore  //服务评分
            var describescore = results[key].describescore  //描述评分
            Score(logscore, function (rank) {
                sum += rank * 0.25
            })
            Score(serscore, function (rank) {
                sum += rank * 0.25
            })
            Score(describescore, function (rank) {
                sum += rank * 0.25
            })
        }
        res.send({
            status: 0,
            message: '获取数据分析成功',
            data: results
        })
    })
}


//提交我的数据分析的处理函数
exports.insertAnalyse = (req, res) => {
    //获取客户端提交到服务器的数据
    const analyse = req.body
    //插入新商品信息
    const sql = `insert into analyse set ?`
    db.query(sql, analyse, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send('提交数据分析失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('提交数据分析成功', 0)
    })
}

//删除我的数据分析
exports.deleteAnalyse = (req, res) => {
    const sql = `delete from analyse where id in (?)`
    db.query(sql, [req.body], (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        console.log(results.affectedRows)
        if (results.affectedRows < 1) {
            return res.send('批量删除数据分析失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('批量删除数据分析成功', 0)
    })
}


//更新我的数据分析
exports.updateAnalyse = (req, res) => {
    //定义待执行的sql语句
    const sql = `update analyse set? where id=?`
    //调用db.query()执行sql语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句成功，但是影响行数不等于1
        console.log(results.affectedRows)
        if (results.affectedRows !== 1) return res.cc('更新数据分析失败')
        //更新用户成功
        res.cc('更新数据分析成功！', 0)
    })
}