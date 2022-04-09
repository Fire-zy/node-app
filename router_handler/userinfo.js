//导入数据库操作模块
const db = require('../db/db')


//获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    //定义查询用户信息的sql语句
    const sqlSelect = `select id,username,nickname,email,user_pic from users where id=?`
    //调用dq.query()执行sql语句
    db.query(sqlSelect, req.user.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行成功，但是查询结果可能为空
        if (results.length !== 1) return res.cc('获取用户信息失败')

        //用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {

    res.send('ok')
}