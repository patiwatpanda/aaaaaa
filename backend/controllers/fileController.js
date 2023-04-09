const fileEps = require ('../models/fileEpisodeModel.js')
const slugify = require('slugify')

exports.addfile=(req,res)=>{
   const {nameepisode,namesubject,nametopic} = req.body
    //const description1 =req.body.description1
    console.log(namesubject,"asdasd")
   
    const docpdf = req.file ? req.file.filename : undefined;
    // const checkdocPDF = req.file
    console.log(docpdf,"asdaa")
    const description = req.body.description
    if(!nametopic || !docpdf){
      res.status(400).json({error:`กรุณากรอกข้อมูลให้ครบ`})
} 
else {
  fileEps.create({nameepisode, namesubject, docpdf, nametopic, description},(err,v)=>{
      if(err){ 
          res.status(400).json(err)
      }
      res.json(v)
  })
}
}
exports.getFileEP =(req,res)=>{
    const {_id} = req.params ;
    fileEps.find({namesubject:_id}).exec((err,fileEp)=>{
        if(err){
            res.json(err)
         }
         res.json(fileEp)
    })
}
exports.removeFileEP=(req,res)=>{
    const {_id} =req.params
    fileEps.findOneAndRemove({_id}).exec((err,blog)=>{
        if(err)console.log(err)
        res.json({
            message:"ลบข้อความเรียบร้อย"
        })
    })
}
exports.getFileEditEP =(req,res)=>{
    const {fileEP_id} = req.params ;
    fileEps.findOne({_id:fileEP_id}).exec((err,fileEp)=>{
        if(err){
            res.json(err)
         }
         res.json(fileEp)
    })
}
exports.updateFile=(req,res)=>{
    const {fileEP_id} = req.params ;
    const {nameepisode,namesubject,nametopic} = req.body ;
    // const {imguser} = req.body
    // if(nametopic===""||docpdf===""){
    //     res.status(400).json({error:`กรุณากรอกข้อมูลให้ครบ`})
    // }else{
    //     fileEps.findOneAndUpdate({_id:EPfile_id}, {nameepisode,namesubject,video,nametopic}
    //         ,{new:true}).exec((err,updateVideo)=>{
    //       if(err){
    //         console.log(err)
    //       }
    //       res.json(updateVideo)
    //     })
    // }
    if(req.file){
        console.log("เข้ามา")
        const docpdf = req.file.filename
        const description = req.body.description;
        fileEps.findOneAndUpdate({_id:fileEP_id}, {docpdf,nametopic,description}
            ,{new:true}).exec((err,updateFile)=>{
          if(err){
            console.log(err)
          }
          res.json(updateFile)
        })
    }else{
        // const {docpdf} = req.body
        console.log("เข้ามา",nametopic)
        fileEps.findOneAndUpdate({_id:fileEP_id}, {nameepisode,namesubject,nametopic}
                    ,{new:true}).exec((err,updateFile)=>{
                  if(err){
                    console.log(err)
                  }
                  res.json(updateFile)
                })
    }
  }
  exports.removeAllFileSub=(req,res)=>{
    const {_id} =req.params
    fileEps.deleteMany({namesubject:_id}, {new:true})
    .then(() => {
        res.json({
          message: "ลบข้อความเรียบร้อย",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น ไม่สามารถลบได้",
        });
      });
  };
  exports.removeAllFileEP=(req,res)=>{
    const {_id} =req.params
    fileEps.deleteMany({nameepisode:_id}, {new:true})
    .then(() => {
        res.json({
          message: "ลบข้อความเรียบร้อย",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "มีข้อผิดพลาดบางอย่างเกิดขึ้น ไม่สามารถลบได้",
        });
      });
  };