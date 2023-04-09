import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { getUser } from "../services/Sessionservice";
import Navbar2 from "./Navbar2";
import { getUserPermission } from "../services/Sessionservice";


import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import CarouselMenu from "./CarouselMenu";

const SearchOverview = () => {
  const [state, setState] = useState({
    namesubject: "",
    comment: "",
    imagesubject: "",
    objectdescription: "",
    category: "",
    username: "",
    _id: "",
  });
  const [allsubject, setAllsubject] = useState("All");
  const { namesub } = useParams();
  const [showFullText, setShowFullText] = useState(false);
  const [showFullText2, setShowFullText2] = useState(false);
  const [showFull_id, setShowFull_id] = useState("");
  const handleToggleText = (e) =>{
     setShowFullText(!showFullText)
     setShowFull_id(e);
    //  setHidOpen(0)
    }
  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/searchview/${namesub}`)
      .then((response) => {
        console.log(response.data, "search");
        setState(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const {
    namesubject,
    comment,
    imagesubject,
    objectdescription,
    category,
    username,
    _id,
  } = state;
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {getUser() ? <Navbar /> : <Navbar2 />}
      <CarouselMenu/>
      <h1 className="mx-5">Search Course</h1>
      <div className="row mt-5 mx-2  ">
        <div className="col-xl-12 card ">
          <div className="row">
            {/* {state.map((value,index)=>(    
        ))} */}
            <div className="col col-md-3   mt-2 mb-2">
              <Card style={{ width: "20rem" }} className="me-2 mb-1 p-2">
                <Card.Img
                  style={{ height: "200px", width: "" }}
                  className=" mt-2"
                  variant="top"
                  src={`/images/${imagesubject}`}
                />
                <Card.Body className="border-top  mb-2">
                  <Card.Title>{namesubject}</Card.Title>
                  <Card.Text className="  p-2 ">
                    {comment.substring(0, 100)}...
                    {comment.substring(0, 100)}
          {(showFullText&&showFull_id===_id )&& comment.substring(100)}
              <Button id={_id} onClick={()=>handleToggleText(_id)} variant="link">
              {((showFullText&&showFull_id===_id )) ? "Read Less" : "Read More"}
            </Button>
                  </Card.Text>
                  {getUserPermission() === "Admin" ? (
                    <div>
                      <Link to={`/subject/${_id}`} className="btn btn-success">
                        View
                      </Link>
                      &nbsp;
                      <Link
                        to={`/editsubject/${_id}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                      &nbsp;
                      <Button variant="danger" onClick="">
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <Link to={`/subject/${_id}`} className="btn btn-success">
                      View
                    </Link>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchOverview;
