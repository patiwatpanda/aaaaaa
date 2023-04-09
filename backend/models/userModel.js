const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true ,
    },
    password:{
        type:String,
        require:true ,
    },
    nameuser:{
        type:String,
     //   default:"Admin"
    },
    education:{
        type:String,
        require:true ,
    },
    email:{
        type:String,
        require:true ,
    },
    imguser:{
        type:String ,
        require:true
    },
    userpermission:{
        type:String ,
        require:true
    },
    slug:{
        type:String,
        lowercase:true,//ถ้ามีตัวengพิมพ์ใหญ่จะปรับเป็นพิมพ์เล็กทั้งหมด
        unique:true,//ใส่ชื่อห้ามซ้ากัน false คือตรงข้าม
    }
},{timestamps:true})

module.exports = mongoose.model("users",userSchema)