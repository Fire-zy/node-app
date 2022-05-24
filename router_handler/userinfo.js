//导入数据库操作模块
const db = require('../db/db')
//导入处理密码的模块
const bcrypt = require('bcryptjs')


//获取所有用户基本信息的处理函数
exports.getUsers = (req, res) => {
    //定义查询用户信息的sql语句
    const sqlSelect = `select * from users`
    //调用dq.query()执行sql语句
    db.query(sqlSelect, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行成功，但是查询结果可能为空
        if (results.length < 1) return res.cc('获取用户信息失败')

        //用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results
        })
    })
}

//获取单个用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
    //定义查询用户信息的sql语句
    const sqlSelect = `select * from users where username=?`
    //调用dq.query()执行sql语句
    db.query(sqlSelect, req.body.username, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行成功，但是查询结果可能为空
        if (results.length < 1) return res.cc('获取用户信息失败')

        //用户信息获取成功
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results
        })
    })
}

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    //定义待执行的sql语句
    const sqlUpdate = `update users set? where id=?`
    //调用db.query()执行sql语句并传递参数
    db.query(sqlUpdate, [req.body, req.body.id], (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句失败，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('更新用户失败')
        //更新用户成功
        res.cc('更新用户成功！', 0)
    })
}
//删除用户基本信息的处理函数
exports.deleteUserInfo = (req, res) => {
    //定义待执行的sql语句
    const sql = `delete from users where id=?`
    //调用db.query()执行sql语句并传递参数
    db.query(sql, req.body.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err)
        //执行sql语句失败，但是影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('删除用户失败')
        //更新用户成功
        res.cc('删除用户成功！', 0)
    })
}


//重置密码
exports.updatePassword = (req, res) => {
    const sqlSelect = `select * from users where id=?`
    db.query(sqlSelect, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        console.log(results.length)

        if (results.length !== 1) return res.cc('用户不存在')
        // console.log(results.length)

        //判断密码是否正确
        const compareResults = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResults) return res.cc('旧密码错误')

        const sqlUpdate = `update users set password=? where id=?`
        //给新密码加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // const newPwd = req.body.newPwd
        db.query(sqlUpdate, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            console.log(results.affectedRows)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
        })
        res.cc('更新密码成功', 0)
    })

}

//更新用户头像
exports.updateAvatar = (req, res) => {
    const sqlUpdate = `update users set user_pic=? where id=?`
    db.query(sqlUpdate, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败')

        return res.cc('更新头像成功', 0)
    })
}