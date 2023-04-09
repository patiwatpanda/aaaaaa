import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Navbar from "./Navbar";
import ReactQuill from 'react-quill' ;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import validator from 'validator';
import {getUserPermission} from '../services/Sessionservice' 
const Adduser =()=>{
    const [state,setState] = useState({
        username:"",
        password:"",
        nameuser:"",
        email:"",
        education:"",
        userpermission:""
    });
    const {username,password,nameuser,email,education,userpermission} = state ;
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const inputUser = name=>event=>{
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value})
    }
    const  [imguser,setImage] =useState('')

const inputImage =(event)=>{
    console.log(event.target.name,"+",event.target.files)
 
    setImage(event.target.files[0])
}

    const userSubmit = async (e)=>{
         e.preventDefault()//ให้ข้อมูลค้างใน แบบ form ก่อน
        // console.log(imagesubject,"test")
        //  // console.table({title,author,content});//แสดงค่า
        let errors = {};
          // Validate name
    if (!username) {
      errors.username = 'Username is required';
    }

    // Validate email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }
  // Validate nameuser
  if (!nameuser) {
    errors.nameuser = 'Nameuser is required';
  } 
  // else if (!validator.isEmail(email)) {
  //   errors.email = 'Email is invalid';
  // }
    // Validate password
    if (!password) {
      errors.password = 'Password is required';
    }
    //  else if (password.length < 6) {
    //   errors.password = 'Password must be at least 6 characters';
    // }
      // Validate education
  if (!education) {
    errors.education = 'Education is required';
  } 
  //selectedFile && !['image/png', 'image/jpeg'].includes(selectedFile.type)
  if(!imguser){
    errors.imguser = 'Imguser is required';
  }
        // Validate userpermission
        if (!userpermission) {
          errors.userpermission = 'Userpermission is required';
        } 
    setErrors(errors);
    setValidated(true);
         console.log("API URL",process.env.REACT_APP_API)
         await  axios.post(`${process.env.REACT_APP_API}/create`,{username,password,nameuser,imguser,email,education,userpermission}
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
                 window.location.reload()
               )
               setState({...state, 
               username:"",
                password:"",
                nameuser:"",
               email:"",
        education:""})
               
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
         }).catch(err=>{
          //   alert(err.response.data.error)//คือค้าerrorที่อยู่ใน Server ที่เราเขียนไป
          console.log(err)   
          Swal.fire(
                 "แจ้งเตือน",
                 err.response.data.error,
                 'error'
               )
         })
        //          setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
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

<div className="card " style={{width: "1000px"}}>
            <div className="card-body">
              <h5 className="card-title"><h2>เพิ่มผู้ใช้</h2></h5>
              <Form   noValidate  onSubmit={userSubmit}>
              {/* validated={Object.keys(errors).length === 0} */}
              <Row className="g-3">
              <Form.Group
              as={Col}
              md="6"
              controlId="formUsernane"
              className="position-relative"

            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                // value={values.firstName}
                onChange={inputUser("username")}
                onKeyDown={handleKeyDown}
                isInvalid={!!errors.username}
                // isValid={username && !errors.username}
                required 
              />
              <Form.Control.Feedback  type="invalid">{errors.username}</Form.Control.Feedback>
              {/* <Form.Control.Feedback>{username && !errors.username}</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              controlId="formPassword"
              className="position-relative"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                // value={values.firstName}
                onChange={inputUser("password")}
                isInvalid={!!errors.password}
                required
              />
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              <Form.Control.Feedback  type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="12"
              controlId="formUsernane"
              className="position-relative"
            >
              <Form.Label>ชื่อ - นามสกุล</Form.Label>
              <Form.Control
                type="text"
                name="nameuser"
                // value={values.firstName}
                onChange={inputUser("nameuser")}
                isInvalid={!!errors.nameuser}
                required
              />
              <Form.Control.Feedback  type="invalid">{errors.nameuser}</Form.Control.Feedback>
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              controlId="formEmail"
              className="position-relative"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                // value={values.firstName}
                onChange={inputUser("email")}
                isInvalid={!!errors.email}
                // isValid={email && !errors.email}
                required
              />
              <Form.Control.Feedback  type="invalid">{errors.email}</Form.Control.Feedback>
              {/* <Form.Control.Feedback>{email && !errors.email}</Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group
              as={Col}
              md="6"
              controlId="formUsernane"
              className="position-relative"
            >    <Form.Label>Education</Form.Label>
            <Form.Control
              type="text"
              name="education"
              // value={values.firstName}
              onChange={inputUser("education")}
              isInvalid={!!errors.education}
              required
            />
            <Form.Control.Feedback  type="invalid">{errors.education}</Form.Control.Feedback>
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Form.Group>
  {getUserPermission()==="Admin"?  <Form.Group
              as={Col}
              md="6"
              controlId="formuserpermission"
              className="position-relative"
              // isInvalid={!!errors.userpermission}
            >
               <Form.Label>การอนุญาติ</Form.Label>
                  <Form.Select   isInvalid={!!errors.userpermission} onChange={inputUser("userpermission")} aria-label="Default select example" require>
      <option >Open this select menu</option>
      <option value="Admin">Admin</option>
      <option value="User">User</option>
    </Form.Select>
    <div className="invalid-feedback">
    {errors.userpermission}
    </div>   </Form.Group>  :    <Form.Group
              as={Col}
              md="6"
              controlId="formuserpermission"
              className="position-relative"
              // isInvalid={!!errors.userpermission}
            >
               <Form.Label>การอนุญาติ</Form.Label>
                  <Form.Select   isInvalid={!!errors.userpermission} onChange={inputUser("userpermission")} aria-label="Default select example" require>
      <option >Open this select menu</option>
      <option value="user">User</option>
    </Form.Select>
    <div className="invalid-feedback">
    {errors.userpermission}
    </div>   </Form.Group>    }

    {/* <div class="">
    <label for="validationDefault04" class="form-label">Education</label>
    <select class="form-select" id="validationDefault04" required>
      <option selected disabled value="">Open this select menu</option>
      <option value="Admin">Admin</option>
      <option value="user">User</option>
    </select>
  </div> */}
  {/* <div className="invalid-feedback">
    {errors.userpermission}
    </div> */}
    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
           
            
        <Form.Group  as={Col}
              md="6">
         <Form.Group onChange={inputImage}   controlId="formFile"  className="form-control mb-3">
 <Form.Label>Default file input example</Form.Label>
 <Form.Control  name="imguser" type="file" required   isInvalid={!!errors.imguser}/>
 <Form.Control.Feedback type="invalid" >
              {errors.imguser}
            </Form.Control.Feedback>
 </Form.Group>

        </Form.Group>
              </Row>
              <div className="d-flex justify-content-center">
                        <Button   type="submit">Submit form</Button>
              </div>
      
              </Form>
    </div>
    </div>
</div>
</div>
    )
    
}
export default Adduser ;
{/* <form className="row g-3 needs-validation" onSubmit={userSubmit} novalidate>
<div className="col-md-6"> 
<div className="form-floating ">
    
    <input type="text" className="form-control "  placeholder="username"  name="username" onChange={inputUser("username")} required></input> 
        
    <label for="floatingName"  >username</label> &nbsp; */}
    {/* <div class="valid-feedback">Valid.</div> */}
//     <div class="invalid-feedback">Please enter a product name</div>
// </div>
// </div>

// <div class="col-md-6">  
// <div className="form-floating">
// <input type="text" className=" form-control" placeholder="password"  name="password" onChange={inputUser("password")} required></input>
// <label for="floatingName" >password</label>&nbsp;
// </div>
// </div>

// <div class="col-md-12">
// <div className="form-floating">
// <input type="text" className=" form-control"   placeholder="ชื่อ - นามสกุล" name="nameuser" onChange={inputUser("nameuser")} required></input>
// <label  for="floatingName" className="col-sm-1 col-form-label">ชื่อ - นามสกุล</label>&nbsp;
// </div>
// </div>
// <div class="col-md-6">
// <div className="form-floating">
// <input type="email" className="form-control" placeholder="Email" name="email" onChange={inputUser("email")} required></input>
// <label for="floatingName" className="col-sm-1 col-form-label">email</label>&nbsp;
// </div>
// </div>
// <div class="col-md-6">
// <div className="form-floating">
// <input type="text" className="form-control" placeholder="การศึกษา" name="education" onChange={inputUser("education")}></input>
// <label for="floatingName" className="col-sm-1 col-form-label">การศึกษา</label>&nbsp;
// </div>
// </div>
// <div class="col-md-6">
//   <div class="form-floating mb-3">

// <select   onChange={inputUser("userpermission")}  className="form-select mb-3 " aria-label=".form-select-lg example">
// <option selected>Open this select menu</option>
// <option value="Admin">Admin</option>
// <option value="user">User</option>

// </select>
// <label for="floatingName" className="col-sm-1 col-form-label">การอนุญาติ</label>&nbsp;&nbsp;
// </div>
// </div>
// <div class="col-md-6">
// <Form.Group onChange={inputImage}   controlId="formFile"  className="form-control mb-3">
// <Form.Label>Default file input example</Form.Label>
// <Form.Control  name="imguser" type="file" />
// </Form.Group>
// </div>
// <div class="text-center">
// <button type="submit" class="btn btn-primary">submit</button>
// </div>
// </form>