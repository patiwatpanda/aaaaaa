const express = require('express');
const morgan = require("morgan")
const cors = require("cors")
const path = require('path')
const app = express()
const userRouter =require("./routes/user")
const subjectRouter = require("./routes/subject")
const episodeRouter = require("./routes/episode")
const videoRouter = require("./routes/video")
const fileRouter = require("./routes/fileEpisode")
const mongoose = require("mongoose")
require('dotenv').config()


// connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>console.log(err))


app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.use("/api",userRouter)
app.use("/api",subjectRouter)
app.use("/api",episodeRouter)
app.use("/api",videoRouter)
app.use("/api",fileRouter)
const port = process.env.PORT 
app.listen(port,()=>console.log(`start server on port${port}`))