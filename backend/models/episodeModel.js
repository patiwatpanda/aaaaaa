const mongoose = require('mongoose')
const episodeSchema =mongoose.Schema({
    nameepisode:{
        type: String ,
        // require: true,
        unique: false,
    },
    namesubject:{
        type:String ,
        // require:true,
        // unique: false,
    },


},{timestamps:true})
module.exports = mongoose.model("episodes",episodeSchema)