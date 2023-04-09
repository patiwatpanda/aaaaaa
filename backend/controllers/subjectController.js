const subjects = require("../models/subjectModel");
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
exports.addSubject = (req, res) => {
  const { namesubject, comment, objectdescription, category, username } =
    req.body;
  console.log("44", namesubject);
  console.log("4d4", category);
  console.log("44", req.file);
  const imagesubject = req.file ? req.file.filename : undefined;
  const description = req.body.description;
  console.log("ddd", imagesubject);
  // let slug = slugify(namesubject);
  if (
    !namesubject ||
    !comment ||
    !objectdescription ||
    !category ||
    !username ||!imagesubject
  ) {
    res.status(400).json({ error: `กรุณากรอกข้อมูลให้ครบ` });
  } else {
    subjects.create(
      {
        namesubject,
        username,
        comment,
        objectdescription,
        imagesubject,
        category,
        description,
      },
      (err, subject) => {
        if (err) {
          res.status(400).json({ error: `${err}subject ซำ้กัน` });
        }
        res.json(subject);
      }
    );
  }
};
exports.getsubject = (req, res) => {
  const { user } = req.params;
  subjects.find({ username: user }).exec((err, sub) => {
    if (err) {
      res.json(err);
    }
    res.json(sub);
  });
};
exports.getsubjectin = (req, res) => {
  const { _id } = req.params;
  subjects.find({ _id: _id }).exec((err, sub) => {
    if (err) {
      res.json(err);
    }
    res.json(sub);
  });
};
exports.deleteSubject = (req, res) => {
  const { sub_id } = req.params;
  subjects.findOneAndRemove({ _id: sub_id }).exec((err, subj_id) => {
    if (err) console.log(err);
    res.json({
      message: "ลบเรียบร้อย",
    });
  });
};
exports.updateSubject = async (req, res) => {
  const { update_id } = req.params;
  const { namesubject, comment, objectdescription, category, username, slug } =
    req.body;

  console.log(namesubject, "image");

  const image = await subjects.findById(update_id);

  if (req.file) {
    const imagesubject = req.file.filename;
    const description = req.body.description;

    if (
      !namesubject ||
      !comment ||
      !objectdescription ||
      !category ||
      !username ||!imagesubject
    ) {
      res.status(400).json({ error: `กรุณากรอกข้อมูลให้ครบ` });
    }
    else{
      subjects
      .findOneAndUpdate(
        { _id: update_id },
        {
          namesubject,
          username,
          comment,
          objectdescription,
          description,
          imagesubject,
          category,
          slug,
        },
        { new: true }
      )
      .exec((err, updatee) => {
        if (err) {
          console.log(err);
        }
        res.json(updatee);
      });
    }
   
  } else {
    const { imagesubject } = req.body;
    if (
      !namesubject ||
      !comment ||
      !objectdescription ||
      !category ||
      !username ||!imagesubject
    ) {
      res.status(400).json({ error: `กรุณากรอกข้อมูลให้ครบ` });
    }
    else{
      subjects
      .findOneAndUpdate(
        { _id: update_id },
        {
          namesubject,
          username,
          comment,
          objectdescription,
          imagesubject,
          category,
          slug,
        },
        { new: true }
      )
      .exec((err, updatee) => {
        if (err) {
          console.log(err);
          res.json({
            message: "ไม่สามารถอัพเดทได้",
          });
        }
        res.json(updatee);
      });
    }
 
  }
};
exports.getsubjectOne = (req, res) => {
  const { _id } = req.params;
  subjects.findOne({ _id: _id }).exec((err, getsubone) => {
    if (err) {
      console.log(err);
      res.json({
        message: "ไม่สามารถอ่านข้อมูลได้",
      });
    }
    res.json(getsubone);
  });
};
exports.getsubjectAll = (req, res) => {
  // const {user} = req.params
  subjects.find().exec((err, sub) => {
    if (err) {
      res.json(err);
    }
    res.json(sub);
  });
};
exports.getsubjectCatagory = (req, res) => {
  const { category } = req.params;
  subjects.find({ category }).exec((err, sub) => {
    if (err) {
      res.json(err);
    }
    res.json(sub);
  });
};
// exports.searchsubject=(req,res)=>{
//    const searchQuery = req.query.q;
//  subjects.find({namesubject: { $regex: searchQuery , $options: "$i"}}).limit(10).exec((err,sub)=>{
//    // subjects.find({ $text: { $search: searchQuery } }).limit(10).exec((err,sub)=>{
// // subjects.find({ namesubject:searchQuery
// //    }).limit(10).exec((err,sub)=>{
//    if(err){
//       res.json(err)
//    }
//    res.json(sub);
//  })
// }
exports.searchsubject = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const regex = new RegExp(searchQuery, "i");
    const results = await subjects
      .find({ namesubject: { $regex: regex } })
      .limit(10);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
exports.searchsubjectOne = (req, res) => {
  const { namesubject } = req.params;
  subjects.findOne({ namesubject: namesubject }).exec((err, getsubone) => {
    if (err) {
      console.log(err);
      res.json({
        message: "ไม่สามารถอ่านข้อมูลได้",
      });
    }
    res.json(getsubone);
  });
};
