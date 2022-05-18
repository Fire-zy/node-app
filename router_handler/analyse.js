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


//查询我的数据分析
exports.getAnalyse = (req, res) => {
    const sql = `select * from analyse`
    db.query(sql, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.length < 1) {
            return res.send('查询数据分析失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        // res.cc('查询商品信息成功', 0)
        //分数比重，好评和差评20%，物流、服务、宝贝描述30%，销量30%，
        // 每一项总分100，计算出每一项得分，最后再算取得分
        // console.log(results.length)
        //循环key次，依次输出每个对象的内容

        // 评论分数计算
        function comment(a, b) {
            var c = a % b
            console.log(c)
        }
        // 物流分数计算
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
        // 服务分数计算
        function serScore(value, rankscore) {
            if (value > 4.8) {
                rankscore += 100
                console.log(rankscore)
            } else if (value <= 4.8 && value > 4.7) {
                rankscore += 90
                console.log(rankscore)
            } else if (value <= 4.7 && value > 4.6) {
                rankscore += 80
                console.log(rankscore)
            } else if (value <= 4.6 && value > 4.5) {
                rankscore += 70
                console.log(rankscore)
            } else {
                rankscore += 60
                console.log(rankscore)
            }
        }


        for (let key in results) {
            var sum = 0  //总分
            var praise = results[key].praise  //好评，没啥意义，可以刷单
            var negative = results[key].negative  //差评，没啥意义，可以刷单
            var sales = results[key].sales  //月销量，这个比较不一样,同一类别的相比较

            var logscore = results[key].logscore  //物流评分
            var serscore = results[key].serscore  //服务评分
            var describescore = results[key].describescore  //描述评分
            // var stoscore = results[key].stoscore  //店铺评分

            Score(logscore, function (rank) {
                sum += rank * 0.1
            })
            Score(serscore, function (rank) {
                sum += rank * 0.1
            })
            Score(describescore, function (rank) {
                sum += rank * 0.1
            })
            console.log(sum)

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
    const sql = `delete from analyse where id=?`
    db.query(sql, req.body.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
            return res.send('删除数据分析失败')
        }
        // 注册成功,注意要写status:0表示注册成功
        res.cc('删除数据分析成功', 0)
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