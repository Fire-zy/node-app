//login & register
const express = require("express")
const router = express.Router()

//注意test前面有符号
//GET api/users/test
router.get("/test", (req, res) => {
    res.json({ msg: "login works" })
})

module.exports = router;