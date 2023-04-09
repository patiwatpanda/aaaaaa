const videos = require('../models/videoModel')
const slugify = require('slugify')

exports.addvideo=(req,res)=>{
   const {nameepisode,namesubject,video,nametopic} = req.body
   const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    //const description1 =req.body.description1
    console.log(video,"video")
    console.log(nametopic,"nametopic")
    if(video===""||nametopic===""||video===undefined||nametopic===undefined){
        res.status(400).json({error:`กรุณากรอกข้อมูลให้ครบ`})
    }
  else  if (!youtubeRegex.test(video)) {
      return res.status(400).json({ error: "กรุณากรอก YouTube link ให้ถูกต้อง" });
    }
    else{
        videos.create({nameepisode,namesubject,video,nametopic},(err,v)=>{
            if(err){ 
                res.status(400).json(err)
            }
            res.json(v)
        })
    }
 
}
exports.getVideoEP =(req,res)=>{
    const {_id} = req.params ;
 videos.find({namesubject:_id},(err,getVideo)=>{
    if(err){
        res.status(400).json(err)
    }
    res.json(getVideo)
 })
}

exports.getVideoEdit =(req,res)=>{
    const {video_id} = req.params ;
 videos.findOne({_id:video_id},(err,getVideo)=>{
    if(err){
        res.status(400).json(err)
    }
    res.json(getVideo)
 })
}
exports.removeVideoEP=(req,res)=>{
    const {EP_id} =req.params
    videos.findOneAndRemove({_id:EP_id}).exec((err,blog)=>{
        if(err)console.log(err)
        res.json({
            message:"ลบข้อความเรียบร้อย"
        })
    })
}
exports.updateVideo=(req,res)=>{
    const {EPvideo_id} = req.params ;
    const {nameepisode,namesubject,video,nametopic} = req.body ;
    // const {imguser} = req.body
    videos.findOneAndUpdate({_id:EPvideo_id}, {nameepisode,namesubject,video,nametopic}
        ,{new:true}).exec((err,updateVideo)=>{
      if(err){
        console.log(err)
      }
      res.json(updateVideo)
    })
  }
  exports.removeAllVideoSub=(req,res)=>{
    const {_id} =req.params
    videos.deleteMany({namesubject:_id}, {new:true})
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
  exports.removeAllVideoEP=(req,res)=>{
    const {_id} =req.params
    videos.deleteMany({nameepisode:_id}, {new:true})
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