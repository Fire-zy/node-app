const express = require("express")
const app = express()


//引入users.js
const users = require("./routes/api/users")



//连接mysql
const mysql = require("mysql")
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: "root",
    database: "my_db_01"
})

//写接口
app.get("/", (req, res) => {
    res.send("hello world!")
})

//使用routes
app.use("/api/users", users)


//启动服务器
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})