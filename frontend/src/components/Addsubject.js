import { useState,useRef } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill' ;
import Form from 'react-bootstrap/Form';
import "react-quill/dist/quill.snow.css"
import { getUser } from "../services/Sessionservice";
import Navbar from "./Navbar";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import validator from 'validator';
const Addsubject=()=>{
    // const inputRef = useRef();
    const [state,setState] = useState({
        namesubject:"",
        comment:"",
        category:"",
        username:getUser()
    });
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    
        //จับคู้ตัวแปรกับ แตัวแปรใน object
        const {namesubject,comment,category,username} = state ;
        const inputValue = name=>event=>{
            console.log(name,"=",event.target.value)
            setState({...state,[name]:event.target.value})
        }
        const  [objectdescription,setObjectdescription] =useState('')
       
        const  [imagesubject,setImage] =useState('')
        // const  [category,setCategory] =useState('')
    const inputImage =(event)=>{
        console.log(event.target.name,"+",event.target.files)
     
        setImage(event.target.files[0])
        
    }
    const submitObjectdescription=(event)=>{
        setObjectdescription(event)
        }
    // const selectInput =(event)=>{
    //     console.log("+",event.target.value)
    //     setCategory(event.target.value)
    // }
    const subjectSubmit = async (e)=>{
        e.preventDefault()//ให้ข้อมูลค้างใน แบบ form ก่อน

        let errors = {} ;
        if (!namesubject) {
            errors.namesubject = 'Namesubject is required';
          }
      
          // Validate comment
          if (!comment) {
            errors.comment = 'Comment is required';
        }
        if (!username) {
            errors.username = 'Username is required';
          } 
          if (!category) {
            errors.category = 'Category is required';
          } 
          if (!objectdescription) {
            errors.objectdescription = 'Objectdescription is required';
          }
          if(!imagesubject){
            errors.imagesubject = 'Imagesubject is required';
          }
          setErrors(errors);
          setValidated(true);
         // console.table({title,author,content});//แสดงค่า
        
         await axios.post(`${process.env.REACT_APP_API}/addsubject`,{namesubject,comment,username,imagesubject,objectdescription,category}
         ,{
             headers:{
                'Content-Type': 'multipart/form-data'
             }
         },
         ).then(response=>{
            console.log(response.data)
             Swal.fire(
                 "แจ้งเตือน",
                 'บันทึกข้อมูลเรียบร้อย',
                 'success',
               )
               setState({...state, namesubject:"",
               comment:"",
               objectdescription:"",
               category:""
              })
            //   setCategory("")
               setImage("")
               window.location.reload()
         }).catch(err=>{
          //   alert(err.response.data.error)//คือค้าerrorที่อยู่ใน Server ที่เราเขียนไป
          console.log(err)   
          Swal.fire(
                 "แจ้งเตือน",
                 err.response.data.error,
                 'error'
               )
         })
     }   
     const handleKeyDown =(event)=>{
      const value = event.target.value
      if (event.keyCode === 32 && value.endsWith("")) {
        event.preventDefault();
        // alert("ห้ามเว้นวรรคที่ท้ายข้อความ")
      }
    }
   
return(
    <div>
        <Navbar/>
    <div className="d-flex justify-content-center pt-5 mt-2 ">

    <div className="card" style={{width: "1000px"}}>
    <div className="card-body">
              <h5 className="card-title"><h2>เพิ่มวิชาใหม่</h2></h5>
        <Form noValidate onSubmit={subjectSubmit}>
            <Row className="g-3">
                <Form.Group
              as={Col}
              md="12"
              controlId="formNamesubject"
              className="position-relative"
             
            >
              <Form.Label>ชื่อรายวิชา</Form.Label>
              <Form.Control
                type="text"
                name="namesubject"
                // value={values.firstName}
                onChange={inputValue("namesubject")}
                isInvalid={!!errors.namesubject}
                onKeyDown={handleKeyDown}
              />
              <Form.Control.Feedback  type="invalid">{errors.namesubject}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group    as={Col}
              md="12" controlId="comment">
        <Form.Label>รายละเอียด</Form.Label>
        <Form.Control as="textarea" rows={3}   onChange={inputValue("comment")}  isInvalid={!!errors.comment}/>
        <Form.Control.Feedback  type="invalid">{errors.comment}</Form.Control.Feedback>
      </Form.Group>
        <div className="form-group col-md-12">
        <label>เกี่ยวกับรายวิชา</label>&nbsp;
        <Form.Group>
        <ReactQuill value={objectdescription}
               //  name="objectdescription" 
                onChange={submitObjectdescription}
                theme="snow"
                className={`pb-5 mb-3 ${validated && (!objectdescription || objectdescription.trim().length === 0) ? 'is-invalid' : ''}`}
                onBlur={() => setValidated(true)}
                placeholder="เขียนบทความของคุณ"style={{border:'1px solid #666'}}/>
            <Form.Control.Feedback  type="invalid">{errors.objectdescription}</Form.Control.Feedback>
        </Form.Group>
                </div> 
         <br/><br/>
        <Form.Group
              as={Col}
              md="12"
              controlId="formNamesubject"
              className="position-relative"
             
            >
              <Form.Label>ผู้สอน</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={inputValue("username")}
                disabled
                // isInvalid={!!errors.username}
               
              />
              <Form.Control.Feedback tooltip type="invalid">Look</Form.Control.Feedback>
            </Form.Group>
        <br/><br/>
        <Form.Group
              as={Col}
              md="6"
              controlId="formuserpermission"
              className="position-relative"
           
            > <Form.Label>หมวดหมู่</Form.Label>
                  <Form.Select  
                  isInvalid={!!errors.category} 
                onChange={inputValue("category")}
                   aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="การจัดการ">การจัดการ</option>
            <option value="ศิลปะและสังคม">ศิลปะและสังคม</option>
        <option value="สุขภาพ">สุขภาพ</option>
        <option value="เทคโนโลยี">เทคโนโลยี</option>
        <option value="ภาษา">ภาษา</option>
        <option value="อื่น ๆ">อื่น ๆ</option>
    </Form.Select>
    <div className="invalid-feedback">
    {errors.category}
    </div>
            </Form.Group>
        {/* <input type="select" name="category" value={category} onChange={inputValue("category")}></input> */}
        <br/><br/>
        <div className="col-md-6">
    <Form.Group onChange={inputImage}   controlId="formFile"  className="form-control mb-3">
        <Form.Label>รูปภาพ</Form.Label>
        <Form.Control  name="imagesubject" type="file"  isInvalid={!!errors.imagesubject}/>
        <Form.Control.Feedback type="invalid" >
              {errors.imagesubject}
            </Form.Control.Feedback>
      </Form.Group>
      </div>
   
      <div className="text-center">
    <Button type="submit" class="btn btn-primary">submit</Button>
    </div>
    </Row>
        </Form>
        </div>
    </div>
    </div>
    </div>
)
}

export default Addsubject ;

