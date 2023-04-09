const express = require('express')
const router = express.Router()
const {addfile,getFileEP,getFileEditEP,removeFileEP
   ,removeAllFileSub,updateFile,removeAllFileEP} =require('../controllers/fileController')
const multer = require('multer')

const storage=multer.diskStorage({
   destination:function(req,file,cb){
  cb(null,'../frontend/public/file')//ตำแหน่งจัดเก็บไฟล์
   },
   filename:function(req,file,cb){
      //cb หรือ callback กำหนดการทำงาน
      if(file.mimetype == 'application/pdf'){
            cb(null,Date.now()+".pdf")//เปลี่ยนชื่อไฟล์
      }
   else  if(file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
       cb(null,Date.now()+".docx")//เปลี่ยนชื่อไฟล์
      }
    else  if(file.mimetype=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
         cb(null,Date.now()+".xlsx")//เปลี่ยนชื่อไฟล์
      }
      else {
         cb(new Error('File type not supported.'), false);
      }
     // cb(null,Date.now()+".docx")//เปลี่ยนชื่อไฟล์
    
   // cb(null,Date.now() + '.pdf')//เปลี่ยนชื่อไฟล์
   },
});
const upload = multer({ storage });

router.post("/addfile",upload.single("docpdf"),addfile)
router.get("/viewfileEP/:_id",getFileEP)
router.get("/geteditFile/:fileEP_id",getFileEditEP)
router.delete("/deleteFileEp/:_id",removeFileEP)
router.delete("/deleteAllFileSub/:_id",removeAllFileSub)
router.delete("/deleteAllFileEp/:_id",removeAllFileEP)
router.put("/editfile/:fileEP_id",upload.single("docpdf"),updateFile)

module.exports =router