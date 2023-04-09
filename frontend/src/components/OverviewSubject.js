import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "react-bootstrap/Button";
import Footer from "./Footer";
import Card from "react-bootstrap/Card";
import { getUser } from "../services/Sessionservice";
import { getUserPermission } from "../services/Sessionservice";
import CarouselMenu from "./CarouselMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Col, Container, Row } from "react-bootstrap";
//import "./OverviewSubject.css"
const OverviewSubject = () => {
  const [state, setState] = useState([]);
  const [allsubject, setAllsubject] = useState("All");
  const [hidOpen,setHidOpen] =useState(1);
  const [Open1,setHidOpen1] =useState(2);
  const [filtercatagary,setFilterCatagary]=useState("")
  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/getsubjectAll`)
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleFilterCatagory=(e)=>{
    setFilterCatagary(e.target.value)
  }
  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 360 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 360, min: 0 },
      items: 1,
      slidesToSlide: 1,
    }
    // desktop: {
    //   breakpoint: { max: 3000, min: 1024 },
    //   items: 3,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
    // tablet: {
    //   breakpoint: { max: 1024, min: 464 },
    //   items: 1,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
    // mobile: {
    //   breakpoint: { max: 464, min: 0 },
    //   items: 1,
    //   slidesToSlide: 1, // optional, default to 1.
    // },
    
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const confirmDelete = (sub_id) => {
    //ไปดูลูกเล่นอื่น ใน sweetalert2.com ได้
    Swal.fire({
      title: "ลบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //กดปุ่ม ok หรือตกลง
      if (result.isConfirmed) {
        deleteSubject(sub_id);
      }
    });
  };
  
  const deleteSubject = (sub_id) => {
    console.log(sub_id, "dds");

    Promise.all([
      axios.delete(`${process.env.REACT_APP_API}/deleteSubject/${sub_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllEp/${sub_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllVideoSub/${sub_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllFileSub/${sub_id}`),
      // })
    ])
      .then((response) => {
        Swal.fire("Deleted!", response[0].data.message, "success");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [showFullText, setShowFullText] = useState(false);
  const [showFullText2, setShowFullText2] = useState(false);
  const [showFull_id, setShowFull_id] = useState("");
  const handleToggleText = (e) =>{
     setShowFullText(!showFullText)
     setShowFull_id(e);
     setHidOpen(0)
    }
    const handleToggleText1 = (e) =>{
      setShowFullText2(!showFullText2)
      setShowFull_id(e);
      setHidOpen(1)
     }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {getUser() ? <Navbar /> : <Navbar2 />}
      <CarouselMenu/>
      <div className="container">
        <select
          class="form-select form-select-lg mt-3"
          style={{ width: "300px" }}
          aria-label=".form-select-lg example"
          onChange={handleFilterCatagory}
        >
          <option value="" selected>Open this select menu</option>
          <option value="การจัดการ">การจัดการ</option>
          <option value="ศิลปะและสังคม">ศิลปะและสังคม</option>
          <option value="สุขภาพ">สุขภาพ</option>
          <option value="เทคโนโลยี">เทคโนโลยี</option>
          <option value="ภาษา">ภาษา</option>
          <option value="อื่น ๆ">อื่น ๆ</option>
        </select>
      </div>
      <div className="container d-flex justify-content-between  pt-5">
        <h1>All Course</h1>
     
        <Link to={`/alloverview/${allsubject}`} className="link-secondary">
          เพิ่มเติม
        </Link>
      </div>
      <div className="container border-bottom pb-2">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive1}
          itemClass="carousel-item-padding-40-px"
          centerMode={true}
          containerClass="carousel-container"
          
        >
        
          {state.map((value, index) => (
            //  <Row xs={1} md={12} className="g-4">
            //      <Col>
                  <Card style={{ maxWidth: '540px' ,minWidth:'200px'}} className="me-2 mb-3 p-2">
              <Card.Img
                style={{ height: "200px", width: "" }}
                className=" mt-2"
                variant="top"
                src={`/images/${value.imagesubject}`}
              />
              <Card.Body
              
               style={{ minHeight:"200px", width: "" }}
                className="border-top  mb-2"
              >
                <Card.Title    >{value.namesubject}</Card.Title>
                <Card.Text
                  style={{ minHeight: "130px", width: "" }}
                  className="  p-2 "
                >
                     {value.comment.substring(0, 100)}
          {(showFullText&&showFull_id===value._id )&& value.comment.substring(100)}
              <Button id={value._id} onClick={()=>handleToggleText(value._id)} variant="link">
              {((showFullText&&showFull_id===value._id )&&hidOpen===0) ? "Read Less" : "Read More"}
            </Button>
                </Card.Text>
                {getUserPermission() === "Admin" ? (
                  <div>
                    <Link
                      to={`/subject/${value._id}`}
                      className="btn btn-success"
                    >
                      View
                    </Link>
                    &nbsp;
                    <Link
                      to={`/editsubject/${value._id}`}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(value._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <Link
                    to={`/subject/${value._id}`}
                    className="btn btn-success"
                  >
                    View
                  </Link>
                )}
              </Card.Body>
            </Card>
            //      </Col>
                
            //  </Row>
           
          ))}
        </Carousel>
        ;
        {/* epis.findIndex(eps => eps.nameepisode === ep.nameepisode) === index */}
      </div>
      {" "}
      {filtercatagary ?   <div className="container  border-bottom pb-3">
            <div className="container d-flex justify-content-between  pt-2">
              <h1 className="">{filtercatagary}</h1>
              {/* target="_blank" */}
              <Link
                to={`/alloverview/${filtercatagary}`}
                className="link-secondary"
              >
                เพิ่มเติม
              </Link>
            </div>

            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive1}
              itemClass="carousel-item-padding-40-px"
              centerMode={true}
            >
              {/* ,marginLeft:"100px" */}
              {state
                .filter((ep, index) => ep.category === filtercatagary)
                .map((ei, index) => (
                  <Card style={{ width: "20rem" }} className="me-2 mb-3 p-2 ">
                    <Card.Img
                      style={{ height: "200px", width: "" }}
                      className=" mt-2"
                      variant="top"
                      src={`/images/${ei.imagesubject}`}
                    />
                    <Card.Body
                 style={{ minHeight: "130px", width: "" }}
                      className="border-top  mb-2"
                    >
                      <Card.Title>{ei.namesubject}</Card.Title>
                      <Card.Text
                        style={{ height: "", width: "" }}
                        className="  p-2 "
                      >
                                       {ei.comment.substring(0, 100)}
          {(showFullText2&&(showFull_id===ei._id))&& ei.comment.substring(100)}
          {/* {value.comment.length > 100 && (
            <Button onClick={handleToggleText} variant="link">
              {setShowFullText ? "Read Less" : "Read More"}
            </Button>
          )} */}
              <Button id={ei._id} onClick={()=>handleToggleText1(ei._id)} variant="link">
              {(showFullText2&&showFull_id===ei._id&&ei.category ) ? "Read Less" : "Read More"}
            </Button>
                        
                      </Card.Text>
                      {getUserPermission() === "Admin" ? (
                        <div>
                          <Link
                            to={`/subject/${ei._id}`}
                            className="btn btn-success"
                          >
                            View
                          </Link>
                          &nbsp;
                          <Link
                            to={`/editsubject/${ei._id}`}
                            className="btn btn-warning"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <Button
                            variant="danger"
                            onClick={() => confirmDelete(ei._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <Link
                          to={`/subject/${ei._id}`}
                          className="btn btn-success"
                        >
                          View
                        </Link>
                      )}

                      {/* <Button variant="primary">Go somewhere</Button>
                           &nbsp;<Link to={`/editsubject/${ei._id}`} className="btn btn-warning">Edit</Link> */}
                      {/* ()=>confirmDelete(value._id) 
                             &nbsp; <Button variant="danger" onClick="">Delete</Button>*/}
                    </Card.Body>
                  </Card>
                ))}
            </Carousel>
          </div> : 
      state
        .filter(
          (eep, index) =>
            state.findIndex((cat) => cat.category === eep.category) === index
              )
        .map((eei, index) => (
          <div className="container  border-bottom pb-3">
            <div className="container d-flex justify-content-between  pt-2">
              <h1 className="">{eei.category}</h1>
              {/* target="_blank" */}
              <Link
                to={`/alloverview/${eei.category}`}
                className="link-secondary"
              >
                เพิ่มเติม
              </Link>
            </div>

            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive1}
              itemClass="carousel-item-padding-40-px"
              centerMode={true}
            >
              {/* ,marginLeft:"100px" */}
              {state
                .filter((ep, index) => ep.category === eei.category)
                .map((ei, index) => (
                  <Card style={{ width: "20rem" }} className="me-2 mb-3 p-2 ">
                    <Card.Img
                      style={{ height: "200px", width: "" }}
                      className=" mt-2"
                      variant="top"
                      src={`/images/${ei.imagesubject}`}
                    />
                    <Card.Body
                      style={{ minHeight: "200px", width: "" }}
                      className="border-top  mb-2"
                    >
                      <Card.Title>{ei.namesubject}</Card.Title>
                      <Card.Text
                        style={{ minHeight: "130px", width: "" }}
                        className="  p-2 "
                      >
                                     {ei.comment.substring(0, 100)}
          {(showFullText2&&showFull_id===ei._id)&& ei.comment.substring(100)}
          {/* {value.comment.length > 100 && (
            <Button onClick={handleToggleText} variant="link">
              {setShowFullText ? "Read Less" : "Read More"}
            </Button>
          )} */}
              <Button id={ei._id} onClick={()=>handleToggleText1(ei._id)} variant="link">
              {(showFullText2&&showFull_id===ei._id ) ? "Read Less" : "Read More"}
            </Button>
                      </Card.Text>
                      {getUserPermission() === "Admin" ? (
                        <div>
                          <Link
                            to={`/subject/${ei._id}`}
                            className="btn btn-success"
                          >
                            View
                          </Link>
                          &nbsp;
                          <Link
                            to={`/editsubject/${ei._id}`}
                            className="btn btn-warning"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <Button
                            variant="danger"
                            onClick={() => confirmDelete(ei._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <Link
                          to={`/subject/${ei._id}`}
                          className="btn btn-success"
                        >
                          View
                        </Link>
                      )}

                      {/* <Button variant="primary">Go somewhere</Button>
                           &nbsp;<Link to={`/editsubject/${ei._id}`} className="btn btn-warning">Edit</Link> */}
                      {/* ()=>confirmDelete(value._id) 
                             &nbsp; <Button variant="danger" onClick="">Delete</Button>*/}
                    </Card.Body>
                  </Card>
                ))}
            </Carousel>
          </div>
        ))}

      <Footer />
    </div>
  );
};
export default OverviewSubject;
