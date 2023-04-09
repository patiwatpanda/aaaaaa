import axios from "axios";
import { useState,useEffect } from "react" ;
import Carousel from "react-multi-carousel";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { Container, Row, Col } from 'react-bootstrap';
import { getUser } from "../services/Sessionservice";
import { getUserPermission } from "../services/Sessionservice";
import Navbar2 from "./Navbar2";
import CarouselMenu from "./CarouselMenu";
import Swal from "sweetalert2";
const Alloverview =()=>{
  const {category} =useParams();
  const {allsubject} =useParams();
  const [showFullText, setShowFullText] = useState(false);
  const [showFull_id, setShowFull_id] = useState("");
    const [state,setState] = useState([])
   console.log(category,"asda");
    const fetchDataView =()=>{
      axios.get(`${process.env.REACT_APP_API}/getsubjectcatagory/${category}`)
      .then(response=>{
        console.log(response.data,"qwe")
          setState(response.data)
      }).catch(err=>{
        alert(err)
      })
    }
    const fetchDataAllView =()=>{
      axios.get(`${process.env.REACT_APP_API}/getsubjectAll`)
      .then(response=>{
        console.log(response.data,"qwe")
          setState(response.data)
      }).catch(err=>{
        alert(err)
      })
    }
    const handleToggleText = (e) =>{
      setShowFullText(!showFullText)
      setShowFull_id(e);
      // setHidOpen(0)
     }
    const responsive = {
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 3,
		  slidesToSlide: 1 // optional, default to 1.
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 1,
		  slidesToSlide: 1 // optional, default to 1.
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1,
		  slidesToSlide: 1 // optional, default to 1.
		}
	  };
    const confirmDelete=(sub_id)=>{
      //ไปดูลูกเล่นอื่น ใน sweetalert2.com ได้
      Swal.fire({
        title:"ลบหรือไม่ ?",
        icon:"warning",
        showCancelButton:true 
      }).then((result)=>{
        //กดปุ่ม ok หรือตกลง
        if(result.isConfirmed){
          deleteSubject(sub_id)
        }
      })
    }
    const deleteSubject =(sub_id)=>{
      console.log(sub_id,"dds")
 
    Promise.all([ axios.delete(`${process.env.REACT_APP_API}/deleteSubject/${sub_id}`),
    axios.delete(`${process.env.REACT_APP_API}/deleteAllEp/${sub_id}`),
    axios.delete(`${process.env.REACT_APP_API}/deleteAllVideoSub/${sub_id}`),
    axios.delete(`${process.env.REACT_APP_API}/deleteAllFileSub/${sub_id}`)
    // })
    ])
    .then(response=>{
    Swal.fire(
      "Deleted!",
     response[0].data.message,
      "success"
    
    )
    window.location.reload();
    })
    .catch(error => {
      console.log(error);
    });
    }
      useEffect(()=>{
    if(category==="All"){
      fetchDataAllView(); 
    }
     else {
       fetchDataView();
     }
     console.log(allsubject,"allsubject");
     console.log(category,"asda");
    },[])

    return(      
    <div>
      {getUser() ?  <Navbar/>:<Navbar2/>}
          <CarouselMenu/>
         {/* {state.filter((eep,index)=>state.findIndex(cat =>cat.category === eep.category) === index  ).map((eei,index)=>(  */}
     {category==="All"?<h1 className="mx-5">All Course</h1>: state.filter((eep,index)=>state.findIndex(cat =>cat.category === eep.category) === index  ).map((eei,index)=>(    
<h1 className="mx-5">{eei.category}</h1>
   )) }  
        <div className="row mt-5 mx-2  " >
              <div className="col-xl-12 card ">
              <div className="row">   
                    {state.map((value,index)=>(
              <div className="col col-md-3   mt-2 mb-2">
           <Card style={{ width: '20rem'}} className="me-2 mb-1 p-2">
      <Card.Img style={{height:'200px', width:""}} className=" mt-2" variant="top" src={`/images/${value.imagesubject}`} />
      <Card.Body style={{ minHeight: "200px", width: "" }} className="border-top  mb-2">
        <Card.Title>{value.namesubject}</Card.Title>
        <Card.Text className="  p-2 "   style={{ minHeight: "130px", width: "" }}>
        {value.comment.substring(0, 100)}
          {(showFullText&&(showFull_id===value._id))&& value.comment.substring(100)}
          {/* {value.comment.length > 100 && (
            <Button onClick={handleToggleText} variant="link">
              {setShowFullText ? "Read Less" : "Read More"}
            </Button>
          )} */}
              <Button id={value._id} onClick={()=>handleToggleText(value._id)} variant="link">
              {(showFullText&&showFull_id===value._id&&value.category ) ? "Read Less" : "Read More"}
            </Button>
          
        </Card.Text>
        {getUserPermission ()==="Admin" ? <div>
     <Link to={`/subject/${value._id}`} className="btn btn-success" >View</Link> 
     &nbsp;
     <Link to={`/editsubject/${value._id}`} className="btn btn-warning">Edit</Link>
     &nbsp;
     <Button variant="danger" onClick={()=>confirmDelete(value._id)}>Delete</Button>
     </div>  :<Link to={`/subject/${value._id}`} className="btn btn-success" >View</Link>
     }
    
      </Card.Body>
    </Card>
              </div>
    
    ))}
             
          </div>

          
                
              </div>
         
        </div>
    </div>
    )
}
export default Alloverview ;

// import axios from "axios";
// import { useState,useEffect } from "react" ;
// import Carousel from "react-multi-carousel";
// import Navbar from "./Navbar";

// import Card from 'react-bootstrap/Card';
// import Button from "react-bootstrap/esm/Button";
// import { useParams } from "react-router-dom";
// const Alloverview =()=>{
//   const category =useParams();
//   const [state,setState] = useState([])
// //  console.log(category,"asda");
// //   const fetchDataView =()=>{
// //     axios.get(`${process.env.REACT_APP_API}/getsubjectcatagory/${category}`).then(response=>{
// //         setState(response.data)
// //     }).catch(err=>{
// //       alert(err)
// //     })
// //   }
//     const responsive = {
// 		desktop: {
// 		  breakpoint: { max: 3000, min: 1024 },
// 		  items: 3,
// 		  slidesToSlide: 3 // optional, default to 1.
// 		},
// 		tablet: {
// 		  breakpoint: { max: 1024, min: 464 },
// 		  items: 2,
// 		  slidesToSlide: 2 // optional, default to 1.
// 		},
// 		mobile: {
// 		  breakpoint: { max: 464, min: 0 },
// 		  items: 1,
// 		  slidesToSlide: 1 // optional, default to 1.
// 		}
// 	  };
//     useEffect=(()=>{
//       console.log(category,"asda");
//    //   fetchDataView()
//     },[])
//     return(      
//     <div>
//          <Navbar/>
//          <div  className="container-fluid mt-1 mb-5 " >
//           <Carousel   swipeable={false}
//   draggable={false}
//   showDots={true}
//   responsive={responsive}
//   // itemClass="carousel-item-padding-40-px"

//  >
//     <div  className="" >
        
//         <img src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png" class="" style={{height:"400px"}}  alt="..."/>
  
//      </div>
//       <div class="">

//         <img src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png" class=" "  style={{height:"400px"}}  alt="..."/>
  
//       </div>
//       <div class="">

//         <img src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png" class=""  style={{height:"400px"}} alt="..."/>
 
//       </div>

//       <div class="">

//       <img src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png" class=""  style={{height:"400px"}} alt="..."/>

//     </div>
//     <div class="">

// <img src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png" class=""  style={{height:"400px"}} alt="..."/>

// </div>
//           </Carousel>
//         </div> 
//         <div className="row mt-5 mx-2  " >
//               <div className="col-xl-12 card ">
//               <div className="row">   
//               <div className="col col-md-3 bg-success  mt-2 mb-2">
//               <Card className="container" style={{ width: '18em' }} >
//       <Card.Img variant="top" src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png" />
//       <Card.Body>
//         <Card.Title>Card Title</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//               </div>
         
//           </div>

          
                
//               </div>
         
//         </div>
//     </div>
//     )
// }
// export default Alloverview ;

