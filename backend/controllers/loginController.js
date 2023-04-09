const jwtt = require("jsonwebtoken");
const { expressjwt: jwt } = require("express-jwt");
const users = require("../models/userModel")
const bcrypt = require('bcrypt');
const validateLogin = async (username, password) => {
    // Query MongoDB to retrieve user information
    const user = await users.findOne({ username });
    if (!user) {
      return { error: 'Username not found' };
    }
    console.log(user,"asddd")
    // Validate password
    // const passwordCorrect = await bcrypt.compare(password, user.password);
    if (password!=user.password) {
      return { error: 'Incorrect password' };
    }
    return  user ;
  };
  
exports.login= async (req,res)=>{
    const {username,password,slug,nameuser} = req.body
    // {$and:[{username:username},{password:password}]}
// users.findOne({username:username}).exec((err,users)=>{
//     console.log(err)
    // if (err) {
    //     res.status(500).json({ message: err });
    //   }
    const result = await validateLogin(username, password);
   const userpermission = result.userpermission ;
  //  console.log(userpermission,"user")
    if(result.error){
      return  res.status(404).json({
            error:`${result.error} | 'Username not found'!!`
        })
    }
    else{//เปลียน user.username เป็น _id กันเวลาuser ซ้ำกัน
        const token =  jwtt.sign({username:result.username,
          
        },process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username,userpermission,result})
 
    }
//   res.json(users)
//})

//ตรวจสอบ Token
exports.requireLogin = jwt({
  secret:process.env.JWT_SECRET,
  algorithms:["HS256"],
  userProperty:"auth",
})

}
// exports.requireLogin = jwt({
//     secret:process.env.JWT_SECRET,
//     algorithms:["HS256"],
//     userProperty:"auth",
// })
