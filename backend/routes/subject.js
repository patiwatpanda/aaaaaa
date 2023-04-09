const express = require("express")
const router = express.Router()
const {getsubjectCatagory,getsubjectAll,updateSubject,getsubjectOne
 ,searchsubjectOne  ,searchsubject,addSubject,getsubject,getsubjectin,deleteSubject} =require('../controllers/subjectController')
const slugify = require("slugify")
const subjects = require("../models/subjectModel")
//const uploadd = multer({ dest: '../public/images' })

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
       else if(file.mimetype == 'image/webg'){
        cb(null,Date.now()+".webg")//เปลี่ยนชื่อไฟล์
       }
      else if(file.mimetype == 'image/png'){
        cb(null,Date.now()+".png")//เปลี่ยนชื่อไฟล์
       }
       else {
         cb(new Error('File type not supported.'), false);
      }
      // cb(null,Date.now()+".jpg")//เปลี่ยนชื่อไฟล์
     
   //  cb(null,Date.now() + '.png')//เปลี่ยนชื่อไฟล์
    },
 });
 
//อย่าลืม UUID เพื่อ set slug เพราะ slug มันเป็น eng ไม่ได้
 const upload = multer({ storage })
router.post('/addsubject',upload.single("imagesubject"),addSubject )
router.get('/home/:user',getsubject)
router.get('/subject/:_id',getsubjectin)
router.get('/medalsubject/:topic')
router.delete('/deleteSubject/:sub_id',deleteSubject)

router.put('/editsubject/:update_id',upload.single("imagesubject"),updateSubject)
router.get('/getupdatesub/:_id',getsubjectOne)
router.get('/getsubjectAll',getsubjectAll)
router.get('/search',searchsubject)
router.get('/searchview/:namesubject',searchsubjectOne)
router.get('/getsubjectcatagory/:category',getsubjectCatagory)
module.exports = router