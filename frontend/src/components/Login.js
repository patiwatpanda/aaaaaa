import {useEffect, useState,Navigate  } from "react";
import axios from "axios";
import{Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";
import { authenticate, getUser ,getUserPermission} from "../services/Sessionservice";
import Navbar2 from "./Navbar2";
const Login =()=>{
    const [state,setState] = useState({
        username:"",
        password:"",
        nameuser:"",
        slug:""
    })
    const {username,password,nameuser,slug} = state 
    const navigate  = useNavigate();
    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value})
    }
    const submitLogin=(e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
         //login สำเร็จ
         console.log(response.data,"66")
         authenticate(response)
         navigate(`/home`)
         window.location.reload()
        }).catch(err=>{
         Swal.fire("แจ้งเตือน",
             err.response.data.error,
             "error"
         )
     //    console.log(err.response.data.error)
        })
    }
    
    useEffect(()=>{
        console.log(getUser())
        console.log(getUserPermission(),"test")
        getUser() && navigate("/")
    },[])
    return(
   
        <div className="">
        {/* <Navbar2 /> */}
  
        <div className="container p-5">  

         <h1>เข้าสู่ระบบ | Admin</h1>
         {/* ดีบัคดูค่า {JSON.stringify(state)} */}
        
         <form onSubmit={submitLogin}>
           <div className="form-group">
               <label>Username</label>
               <input type="text" className="form-control" value={username}
               onChange={inputValue("username")}/>
           </div>
           
           <div className="form-group">
               <label>Password</label>
               <input type="password" className="form-control" value={password} onChange={inputValue("password")}></input>
           </div>
           <br/>
           <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary "/>
           &nbsp;
           <Link to={'/'} className="btn btn-outline-primary">Back</Link>
         </form>
      </div>
      </div>
    )
}
export default Login ;