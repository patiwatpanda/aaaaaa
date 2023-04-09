
const express = require("express")
const router = express.Router()
const slugify = require("slugify")
const users = require("../models/userModel")
const {create,findProfile,updateProFile,findProfileAll} = require("../controllers/userController")
const {login} = require("../controllers/loginController")
const multer = require('multer')
const storage=multer.diskStorage({
   destination:function(req,file,cb){
  cb(null,'../frontend/public/images')//ตำแหน่งจัดเก็บไฟล์
   },
   filename:function(req,file,cb){
      //cb หรือ callback กำหนดการทำงาน
      if(file.mimetype == 'image/jpeg'){
            cb(null,Date.now()+".jpg")//เปลี่ยนชื่อไฟล์
      }
       else  if(file.mimetype == 'image/webg'){
       cb(null,Date.now()+".webg")//เปลี่ยนชื่อไฟล์
      }
     // cb(null,Date.now()+".jpg")//เปลี่ยนชื่อไฟล์
      else  if(file.mimetype == 'image/png'){
      cb(null,Date.now() + '.png')//เปลี่ยนชื่อไฟล์
     }
      else {
      cb(new Error('File type not supported.'), false);
   }
   },
});
const upload = multer({ storage })
router.post('/create',upload.single("imguser"),create)
router.post('/login',login)
router.put('/editprofile/:_id',upload.single("imguser"),updateProFile)
router.get('/findprofile/:username',findProfile)
router.get('/fineprofileall',findProfileAll)
module.exports = router