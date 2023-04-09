
const episodes = require('../models/episodeModel')
const slugify = require('slugify')
   // const video = req.file.filename1

    //const description1 =req.body.description1,slug
const { v4: uuidv4 } = require('uuid');
exports.episodesubject=(req,res)=>{
    const {nameepisode,namesubject} = req.body
   console.log(namesubject,"asdsad")
//
   if(nameepisode===""){
    res.status(400).json({error:`กรุณากรอกข้อมูลให้ครบ`})
   }else{
    episodes.create({nameepisode,namesubject},(err,episode)=>{
        if(err){
            res.status(400).json({error:`ชื่อบทซ้ำกัน |${err}`})
        }
        res.json(episode)
    })
   }

}
exports.getepisode=(req,res)=>{
    const {getepsode} = req.params ;
    episodes.find({namesubject:getepsode}).exec((err,epi)=>{
        if(err){
            res.json(err)
         }
         res.json(epi)
    })
}
exports.getmedalsub=(req,res)=>{
    const {_id} =req.params ;
    episodes.findOne({_id:_id}).exec((err,getsub)=>{
       if(err){
          console.log(err)
          res.json({
             message:"ไม่สามารถอ่านข้อมูลได้",
          })
       }
       res.json(getsub)
    })
 }
 exports.removeEP=(req,res)=>{
    const {_id} =req.params
    episodes.findOneAndRemove({_id}).exec((err,blog)=>{
        if(err)console.log(err)
        res.json({
            message:"ลบข้อความเรียบร้อย"
        })
    })
}
exports.removeAllEP=(req,res)=>{
    const {_id} =req.params
    episodes.deleteMany({namesubject:_id},{new:true}).then(() => {
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
  exports.updateEp=(req,res)=>{
    const {EP_id} = req.params ;
    const {nameepisode,namesubject} = req.body ;
    episodes.findOneAndUpdate({_id:EP_id}, {nameepisode,namesubject}
        ,{new:true}).exec((err,updateEp)=>{
      if(err){
        console.log(err)
      }
      res.json(updateEp)
    })
  }