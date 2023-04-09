import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import validator from "validator";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
const Editsubject = () => {
  const { _id } = useParams();
  const inputRef = useRef();
  const [editsubid, setEditsubid] = useState(_id);
  const [state, setState] = useState({
    namesubject: "",
    comment: "",
    category: "",
    username: "",
  });
  //จับคู้ตัวแปรกับ แตัวแปรใน object
  const { namesubject, comment, category, username } = state;
  const [errors, setErrors] = useState({});
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  const [objectdescription, setObjectdescription] = useState("");

  const [imagesubject, setImage] = useState("");
  // const  [category,setCategory] =useState('')
  const inputImage = (event) => {
    console.log(event.target.name, "+", event.target.files);

    setImage(event.target.files[0]);
  };
  const submitObjectdescription = (event) => {
    setObjectdescription(event);
  };
  // const selectInput =(event)=>{
  //     console.log("+",event.target.value)
  //     setCategory(event.target.value)
  // }
  const subjectSubmit = async (e) => {
    e.preventDefault(); //ให้ข้อมูลค้างใน แบบ form ก่อน
    console.log(imagesubject, "test");

    // console.table({title,author,content});//แสดงค่า
    console.log("API URL", process.env.REACT_APP_API);
    await axios
      .put(
        `${process.env.REACT_APP_API}/editsubject/${editsubid}`,
        {
          namesubject,
          comment,
          username,
          imagesubject,
          objectdescription,
          category,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
        const { namesubject, comment, category, username } = response.data;
        setState({ ...state, namesubject, comment, category, username });
        setObjectdescription(response.data.objectdescription);
        setImage(response.data.imagesubject);
        window.location.reload();
      })
      .catch((err) => {
        //   alert(err.response.data.error)//คือค้าerrorที่อยู่ใน Server ที่เราเขียนไป
        console.log(err);
        Swal.fire("แจ้งเตือน",err.response.data.error, "error");
      });
  };
  const fetchdata = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/getupdatesub/${editsubid}`)
      .then((response) => {
        console.log(editsubid, "dfd");
        console.log(response.data, "ggg");
        const { namesubject, comment, category, username } = response.data;
        setState({ ...state, namesubject, comment, category, username });
        setObjectdescription(response.data.objectdescription);
        setImage(response.data.imagesubject);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleKeyDown =(event)=>{
    const value = event.target.value
    if (event.keyCode === 32 && value.endsWith("")) {
      event.preventDefault();
      // alert("ห้ามเว้นวรรคที่ท้ายข้อความ")
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center p-5">
        <div className="card" style={{ width: "1000px" }}>
          <div className="card-body">
            <h5 className="card-title">
              <h2>Edit</h2>
            </h5>
            <form className="row g-3" onSubmit={subjectSubmit}>
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    name="namesubject"
                    className="form-control"
                    value={namesubject}
                    onChange={inputValue("namesubject")}
                    onKeyDown={handleKeyDown}
                  ></input>
                  <label for="floatingName">ชื่อวิชา</label> &nbsp;
                </div>
              </div>
              <br />
              <br />
              <div className="col-md-12">
                <div className="form-floating">
                  <textarea
                    type="text"
                    className="form-control"
                    style={{ height: " 200px" }}
                    name="comment"
                    value={comment}
                    onChange={inputValue("comment")}
                  ></textarea>
                  <label for="floatingName">รายละเอียด</label>&nbsp;
                </div>
              </div>
              <br />
              <br />
              <div className="col-md-12">
                <label>เกี่ยวกับรายวิชา</label>&nbsp;
                <ReactQuill
                  dangerouslySetInnerHTML={{ __html: objectdescription }}
                  value={objectdescription}
                  //  name="objectdescription"
                  onChange={submitObjectdescription}
                  theme="snow"
                  className="pb-5 mb-3"
                  placeholder="เขียนบทความของคุณ"
                  style={{ border: "1px solid #666" }}
                />
              </div>{" "}
              <br />
              <br />
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                  disabled
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={inputValue("username")}
                  ></input>
                  <label for="floatingName">ผู้สอน</label>&nbsp;
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <select
                    onChange={inputValue("category")}
                    class="form-select form-select-sm mb-3"
                    aria-label=".form-select-lg example"
                    value={category}
                  >
             <option>Open this select menu</option>
                    <option value="การจัดการ">การจัดการ</option>
            <option value="ศิลปะและสังคม">ศิลปะและสังคม</option>
        <option value="สุขภาพ">สุขภาพ</option>
        <option value="เทคโนโลยี">เทคโนโลยี</option>
        <option value="ภาษา">ภาษา</option>
        <option value="อื่น ๆ">อื่น ๆ</option>
                  </select>
                  <label for="floatingName">หมวดหมู่</label>&nbsp;
                </div>
              </div>
            
              {/* <input type="select" name="category" value={category} onChange={inputValue("category")}></input> */}
              <br />
              <br />
              <div className="col-md-12">
                <Form.Group
                  onChange={inputImage}
                  controlId="formFile"
                  className="form-control mb-3"
                >
                  <Form.Label>รูปภาพ</Form.Label>
                  <Form.Control name="imagesubject" type="file" />
                </Form.Group>
              </div>
              <br />
              <br />
              <button type="submit" class="btn btn-primary">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Editsubject;
