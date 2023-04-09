import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/Sessionservice";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CarouselMenu from "./CarouselMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { getUser } from "../services/Sessionservice";
import CardGroup from "react-bootstrap/CardGroup";
import Swal from "sweetalert2";
import Footer from "./Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import MyImage from '../../public/logo512.png';

const Home = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [state, setState] = useState([]);
  const LogOut = () => {
    logout(navigate(`/`));
  };
  const fetchdata = () => {
    axios
      .get(`${process.env.REACT_APP_API}/home/${user}`)
      .then((response) => {
        console.log(user, "sss");
        console.log(response.data, "aaa");
        setState(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const confirmDelete = (slug) => {
    //ไปดูลูกเล่นอื่น ใน sweetalert2.com ได้
    Swal.fire({
      title: "ลบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //กดปุ่ม ok หรือตกลง
      if (result.isConfirmed) {
        deleteSubject(slug);
      }
    });
  };
  const deleteSubject = (sub_id) => {
    console.log(sub_id, "dds");
    // axios.delete(`${process.env.REACT_APP_API}/deleteSubject/${sub_id}`).then(response=>{
    //   Swal.fire(
    //     "Deleted!",
    //     response.data.message,
    //     "success"

    //   )
    //   fetchdata();
    // })
    // .catch(err=>{
    //   alert(err)
    // })
    Promise.all([
      axios.delete(`${process.env.REACT_APP_API}/deleteSubject/${sub_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllEp/${sub_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllVideoSub/${sub_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllFileSub/${sub_id}`),
      // })
    ])
      .then((response) => {
        //   const user = response[0].data
        //     const comments = response[1].data
        //     const comments = response[2].data
        //     const comments = response[3].data
        Swal.fire("Deleted!", response[0].data.message, "success");
          window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    console.log(state, "ccc");
    fetchdata();
  }, []);
  return (
    <div className="">
      <Navbar />
      <CarouselMenu/>
      <h1 className="container">My Course</h1>
      <div className=" mb-1 card container" >
      {/* className="col-xl-12 card " */}
        <Row  className="m-1">
          {state.map((subject, index) => (
          //  style={{ width: "20rem" }} 
            <Card style={{ width: '19rem'}} className="m-2">
              <Card.Img
                style={{ height: "200px", width: "" }}
                className=" mt-2"
                variant="top"
                src={`/images/${subject.imagesubject}`}
              />
              <Card.Body className="border-top  mb-2">
                <Card.Title>{subject.namesubject}</Card.Title>
                <Card.Text className="  p-2 ">
                  {subject.comment.substring(0, 100)}...
                </Card.Text>
                <Link
                  to={`/subject/${subject._id}`}
                  className="btn btn-success"
                >
                  View
                </Link>{" "}
                &nbsp;
                {/* <Button variant="primary">Go somewhere</Button> */}
                &nbsp;
                <Link
                  to={`/editsubject/${subject._id}`}
                  className="btn btn-warning"
                >
                  Edit
                </Link>
                &nbsp;{" "}
                <Button
                  variant="danger"
                  onClick={() => confirmDelete(subject._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
        
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
