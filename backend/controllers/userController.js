//ติดต่อกับฐานข้อมูล
const slugify = require("slugify");
const users = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { updateOne } = require("../models/userModel");

//const useupload = upload.single("imguser")
//บันทึกข้อมูล upload.single("imguser")
exports.create = (req, res) => {
  const { username, password, nameuser, education, userpermission, email } =
    req.body;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const imguser = req.file ? req.file.filename : undefined;
  const description = req.body.description;

  console.log("55", username);

  let slug = slugify(nameuser);
  // Check if the username already exists in the database
  users.findOne({ username }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ error: `เกิดข้อผิดพลาด|${err}` });
    }
    if (existingUser) {
      return res.status(400).json({ error: `ชื่อผู้ใช้ ${username} มีอยู่แล้วในระบบ` });
    }
  //check ว่า slug เป็นค่าว่างหรือเปล่า ถ้าว่าง ให้เรียกใช่ uuid
  if (!slug) slug = uuidv4();
  if (
    !username ||
    !password ||
    !nameuser ||
    !education ||
    !userpermission ||
    !imguser
  ) {
    res.status(400).json({ error: `กรุณากรอกข้อมูลให้ครบ` });
  } else if (!emailregex.test(email)&&email!="-") {
    return res.status(400).json({ error: "กรุณาป้อนEmail" });
  } else {
    users.create(
      {
        username,
        password,
        userpermission,
        nameuser,
        education,
        email,
        imguser,
        description,
        slug,
      },
      (err, user) => {
        if (err) {
          res.status(500).json({ error: `ไม่สามารถบันทึกได้|${err}` });
        }
        res.json(user);
      }
    );
  }
});
  // res.json({
  //     data:{title,content,author,slug}
  // })
};
exports.updateProFile = (req, res) => {
  const _id = req.params;

  const { username, password, nameuser, education, userpermission, email } =
    req.body;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const imguser = req.file ? req.file.filename : undefined;
  if (req.file) {
    const imguser = req.file.filename;
    const description = req.body.description;
    if(!username ||
      !password ||
      !nameuser ||
      !education ||
      !userpermission ){
        res.status(400).json({ error: `กรุณากรอกข้อมูลให้ครบ` });
    }else if (!emailregex.test(email)&&email!="-") {
      res.status(400).json({ error: "กรุณาป้อนEmail" });
    }
    else{
      
      users
      .findOneAndUpdate(
        { _id },
        {
          imguser,
          username,
          password,
          nameuser,
          education,
          userpermission,
          email,
          description,
        },
        { new: true }
      )
      .exec((err, updateUser) => {
        if (err) {
          res.json({
            message: "ไม่สามารถอัพเดทได้",
          });
        }
        res.json(updateUser);
      });
    }
   
  }  else {
    const { imguser } = req.body;
    if (
      !username ||
      !password ||
      !nameuser ||
      !education ||
      !userpermission ||
      !imguser
    ) {
      res.status(400).json({ error: `กรุณากรอกข้อมูลให้ครบ` });
    }
    else if (!emailregex.test(email)&&email!="-") {
      res.status(400).json({ error: "กรุณาป้อนEmail" });
    }
    else{
      users
      .findOneAndUpdate(
        { _id },
        {
          imguser,
          username,
          password,
          nameuser,
          education,
          userpermission,
          email,
        },
        { new: true }
      )
      .exec((err, updateUser) => {
        if (err) {
          console.log(err);
        }
        res.json(updateUser);
      });
    }
   
  }
};
exports.findProfile = (req, res) => {
  const { username } = req.params;
  users.findOne({ username: username }).exec((err, finduser) => {
    if (err) {
      res.json({
        message: "ไม่พบข้อมูล",
      });
    }
    res.json(finduser);
  });
};
exports.findProfileAll = (req, res) => {
  users.find().exec((err, finduser) => {
    if (err) {
      res.json({
        message: "ไม่พบข้อมูล",
      });
    }
    res.json(finduser);
  });
};
