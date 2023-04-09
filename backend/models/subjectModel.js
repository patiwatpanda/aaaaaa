const mongoose = require('mongoose')
const subjectShcema =mongoose.Schema({
    namesubject:{
        type:String ,
        require:true 
    },
    comment:{
        type:String ,
    },
    imagesubject:{
        type:String ,
        require:true 
    },
    objectdescription:{
        type:String ,
    },
    category:{
        type:String ,
        require:true 
    },
    description:{
        type:String ,
        require:true 
    },
    username:{
        type:String ,
        require:true ,
    },
    // slug:{
    //     type:String,
    //     lowercase:true,//ถ้ามีตัวengพิมพ์ใหญ่จะปรับเป็นพิมพ์เล็กทั้งหมด
    //     unique:true,//ใส่ชื่อห้ามซ้ากัน false คือตรงข้าม
    // }
},{timestamps:true})
module.exports = mongoose.model("subjects",subjectShcema)