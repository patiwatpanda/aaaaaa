import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import{useParams} from 'react-router-dom';
const Episodecreate =()=>{
  const {namesubParams} = useParams();
    const [state,setState] = useState({
        nameepisode:"",
        namesubject:namesubParams,
        username:"",
        video:"",
        nametopic:"",
    });
   const {nameepisode,namesubject,username,video,nametopic} = state ;
   const [docpdf,setDocpdf] = useState("");
   const inputDocpdf=(event)=>{
    console.log(event.target.name,"+",event.target.files)
     
    setDocpdf(event.target.files[0])
   }
   const checkJson=()=>{
    console.log(state,"aaa",docpdf)
   }
    const inputEpiode=name=>event=>{
  console.log(name,"=",event.target.value)

   setState({...state,[name]:event.target.value})
    }
    const submitEpisode = async (e) =>{
        e.preventDefault();
        console.log(state,"aaa",docpdf)
       await axios.put(`${process.env.REACT_APP_API}/episode`,{docpdf,nameepisode,namesubject,username,video,nametopic}
       ,{
        headers:{
           'Content-Type': 'multipart/form-data'
        }
    }).then(response=>{
        console.log(response.data)
        Swal.fire(
            "แจ้งเตือน",
            'บันทึกข้อมูลเรียบร้อย',
            'success',

          )
          setState({...state, nameepisode:"",
          namesubject:"",
          username:"",
          video:"",
          nametopic:"",
         })
       //   setCategory("")
       setDocpdf("")
        //  window.location.reload()
    }

    ).catch()
    }

    return(
        <div className="container">
            <form onSubmit={submitEpisode}>
            <label>ชื่อบท</label>
          <input type="text" name="nameepisode"  value={nameepisode} onChange={inputEpiode("nameepisode")}></input>  
          <br/><br/>
          <label>ชื่อวิชา</label>
          
          <input type="text" name="namesubject" value={namesubject} onChange={inputEpiode("namesubject")}></input>  
          <br/><br/>
          <label>ผู้สอน</label>
          <input type="text" name="username" value={username} onChange={inputEpiode("username")}></input>  
          <br/><br/>
          <label>ชื่อหัวข้อ</label>
          <input type="text" name="nametopic" value={nametopic} onChange={inputEpiode("nametopic")}></input>  
          <br/><br/>
          <label>Video</label>
          <input type="text" name="video" value={video} onChange={inputEpiode("video")}></input>  
          <br/><br/>
          <Form.Group  onChange={inputDocpdf}  style={{width:"500px"}} controlId="formFile" className="mb-3">
        <Form.Label>เอกสาร</Form.Label>
        <Form.Control type="file" name="docpdf" />
      </Form.Group>
      <br/><br/>
        
          {/* <Form.Group style={{width:"500px"}} controlId="formFile" className="mb-3">
        <Form.Label>video</Form.Label>
        <Form.Control type="file" />
      </Form.Group> */}
          <button type="submit" className='btn btn-primary'>Submit</button>
         
            </form>
            <button onClick={checkJson} className='btn btn-primary'>Check</button>
        </div>
    )
}
export default Episodecreate ;