const mongoose = require('mongoose')
const videoSchema =mongoose.Schema({
    nameepisode:{
        type: String ,
        require:true
    },
    namesubject:{
        type:String ,
        require:true
    },
    video:{
        type:String,
        require:true
    },
    nametopic:{
        type:String,
        require:true,
        unique:true,
    },
},{timestamps:true})
module.exports = mongoose.model("videoModel",videoSchema)