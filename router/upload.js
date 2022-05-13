// //用户的路由模块

// const express = require("express")
// const router = express.Router()
// const multer = require('multer');

// // const uploadHandler = require("../router_handler/upload")



// //图片上传
// var stroage = multer.diskStorage({
//     //设置上传的文件夹
//     destination: function (req, file, cd) {
//         cd(null, './public/images')  // 注意是根目录 ，根目录，根目录
//     },
//     filename: function (req, file, cb) {
//         //设置图片的名称
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })
// var upload = multer({ storage: stroage });
// //upload.any()
// router.post('/upload', upload.any(), function (req, res, next) {
//     /*注意  app.js中设置(*设置token后，放在expressJwt 前面  ，在它可能图片不显示*)
//        ***  app.use(express.static(path.join(__dirname, 'public')));
//        ***  设置托管静态目录; 项目根目录+ public.  可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
//     */
//     //拼接ulr 地址，本地监听的端口和图片的目录；
//     let url = `${req.headers.host}/images/${req.files[0].filename}`
//     // let url = `/images/${req.files[0].filename}`
//     if (!req.files) {
//         return res.json({
//             code: 1,
//             message: '上传失败'
//         })
//     } else {
//         return res.json({
//             code: 200,
//             message: '上传成功',
//             url: url
//         })

//     }
// })




// //将路由对象共享出去
// module.exports = router;

// 第二种
const express = require("express");
var router = express.Router();

//导入sql模块
const db = require("../db/db")

// 下载multiparty 插件 用来传送图片
var multiparty = require("multiparty")
// 下载uuid npm install uuid --save 用来生成唯一名字
const uuid = require('uuid');
// 下载images插件 用来做24行的（图片处理）
const images = require("images")


router.post('/upload', function (req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        // console.log(files.file[0])
        // //找到上传的图片上传之前的名字
        var orgFilename = files.file[0].originalFilename;
        // console.log(orgFilename)
        // //切割orgFilename 找到图片的扩展名 以证明图片是什么格式的
        // //切割后是一个数组，找到数组最后一个
        var formate = orgFilename.split(".");
        // //拼接新的图片名称
        var fileName = uuid.v1() + "." + formate[formate.length - 1];
        //  将图片存储到服务器本地
        images(files.file[0].path) //Load image from file
            .size(1920, 1276) // 这里一定要先把这个public/images文件夹给创建好 不然要报错哦
            .save("public/images/" + fileName, {
                quality: 1000
            });

        // console.log(fileName)
        // var picture = { pro_picture: fileName }
        // // console.log(picture)
        // const sqlInsert = `insert into product set ?`
        // db.query(sqlInsert, picture, (err, results) => {
        //     if (err) console.log(err)
        // })

        //返回前台存储地址
        var src = "/images/" + fileName;
        res.send({
            message: fileName
        })
    });

});

module.exports = router;

// 第三种

// const express = require("express");
// var router = express.Router();

// //上传个人头像图片
// router.post('/upload', function (req, res, next) {
//     console.log(req)
//     let form = new multiparty.Form();
//     form.uploadDir = "./public/images";
//     // form.keepExtensions=true;   //是否保留后缀
//     form.parse(req, function (err, fields, files) {  //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
//         console.log(files.image);
//         if (err) {
//             res.send({
//                 status: "1",
//                 msg: "上传失败！" + err
//             });
//         } else {
//             res.send({
//                 status: "0",
//                 msg: "上传成功！",
//                 imgSrc: files.image
//             });
//         }
//     })

// });
// module.exports = router;