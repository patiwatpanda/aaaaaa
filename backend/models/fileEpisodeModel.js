const mongoose = require('mongoose')
const fileEpisodeSchema =mongoose.Schema({
    nameepisode:{
        type: String ,
        require:true
    },
    namesubject:{
        type:String ,
        require:true
    },
    docpdf:{
        type:String,
        require:true
    },
    nametopic:{
        type:String,
        require:true
    },


},{timestamps:true})
module.exports = mongoose.model("fileEpisode",fileEpisodeSchema)