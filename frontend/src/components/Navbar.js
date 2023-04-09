import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../services/Sessionservice";
import { logout } from "../services/Sessionservice";
import {
  Form,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Container,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userProfile, setUserProfile] = useState({
    username: "",
    password: "",
    nameuser: "",
    imguser: "",
    userpermission: "",
    email: "",
    education: "",
    _id: "",
  });
  const {
    username,
    password,
    nameuser,
    userpermission,
    email,
    education,
    imguser,
    _id,
  } = userProfile;
  const LogOut = () => {
    logout(navigate(`/`));

  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   axios.get(`${process.env.REACT_APP_API}/search?q=${searchQuery}`)
  //     .then(response =>{
  //       console.log(response.data);
  //        setSearchResults(response.data)
  //      } )
  //     .catch(error => console.error(error));
  // };
  //   const handleSearchSubmit  = (event) => {

  //     const query = event.target.value;
  // if(!query.trim()){
  //   setSearchResults([]);
  // }
  //     setSearchQuery(query);
  //     axios.get(`${process.env.REACT_APP_API}/search?q=${searchQuery}`)
  //       .then(response => setSearchResults(response.data))
  //       .catch(error => console.error(error));
  //   };
  //   const clearSearch =()=>{
  //     setSearchResults([]);
  //   }
  const handleSearchSubmit = (event) => {
    // const query = event.target.value;
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    // setSearchQuery(query);
    axios
      .get(`${process.env.REACT_APP_API}/search?q=${searchQuery}`)
      .then((response) => setSearchResults(response.data))
      .catch((error) => console.error(error));
  };
  const fetchdataImgUser = () => {
    axios
      .get(`${process.env.REACT_APP_API}/findprofile/${user}`)
      .then((response) => {
        // console.log()
        setUserProfile(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    handleSearchSubmit();
    fetchdataImgUser();
  }, [searchQuery]);

  return (
    <div>
      {/* {getUser() ? 'currently' : 'not'} */}
      <nav
        class="navbar navbar-expand-lg  bg-warning"
        style={{ minHeight: "30px" }}
        data-bs-theme="dark"
      >
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/">
            <h2>ระบบกวดวิชา</h2>
          </a>
          {/* <div>
          <form onSubmit={handleSearchSubmit} class="d-flex mx-1" role="search">
        <input class="form-control me-5" onChange={handleSearchQueryChange} style={{width:"300px"}} type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> </div> */}

          {/* <Form onSubmit={handleSearchSubmit}>
        <InputGroup>
          <Form.Control type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search" />
          <Button type="submit" variant="primary">Search</Button>
        </InputGroup>
      </Form>
   */}

          {/* <Button variant="primary" onClick={clearSearch}>Clear Search</Button> */}
          {/* <button className="btn btn-outline-primary" onClick={Check}>check</button> */}
          <div className="offcanvas offcanvas-start container-fluid bg-warning" id="navbarSupportedContent">
          <div class="offcanvas-header">
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
            <ul className="navbar-nav p-2 me-auto mb-2 mb-lg-0">
           
              <li class="nav-item ">
                <a class="nav-link " aria-current="page" href="/profile">
                <i class="bi bi-person-circle"></i>   Profile
                </a>
              </li>
              <li class="nav-item ">
                <a class="nav-link " aria-current="page" href="/home">
                <i class="bi bi-house-door-fill"></i>   Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/adduser">
                <i class="bi bi-person-fill-add"></i>   เพิ่มผู้ใช้
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/addsub">
                <i class="bi bi-plus-square"></i>  เพิ่มรายวิชา
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                <i class="bi bi-briefcase-fill"></i>     Overview
                </a>
              </li>
              <li class="nav-item ">
            <Form onSubmit={handleSearchSubmit} className="ms-auto">
                <div className="d-flex ">

                  <FormControl
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Search"
                    className="me-2 "
                  />
                  {/* <Button variant="primary">Search</Button> */}
                </div>
                {searchResults && searchResults.length > 0 && (
        <ListGroup
          style={{
            position: "absolute",
            // top: "63px",
            // right: "1200px",
            zIndex: 1,
            width: "210px",
          }}
        >
          {searchResults.map((result) => (
            <ListGroup.Item
              action
              key={result._id}
              href={`/searchoverview/${result.namesubject}`}
            >
              {result.namesubject}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
              </Form>
              </li>
              {/* <button className="btn btn-outline-primary" onClick={LogOut}>Logout</button> */}
     
              
              <li className="nav-item dropdown">
              
                <li className="nav-item dropdown pe-3">
                  <a
                    className="nav-link nav-profile d-flex align-items-center pe-0"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                      <img
                      src={`/images/${imguser}`}
                      alt="Profile"
                      style={{ maxHeight: "35px" }}
                      class="rounded-circle"
                    />
                    <span class="d-none d-md-block dropdown-toggle ps-2">
                      {nameuser}
                    </span>
                  </a>
                  {/* <!-- End Profile Iamge Icon --> */}

                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                      <h6>{nameuser}</h6>
                      <span>{userpermission}</span>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="users-profile.html"
                      >
                        <i class="bi bi-person"></i>
                        <span>
                          <Link className="link-secondary" to={`/profile`}>
                            My Profile
                          </Link>
                        </span>
                      </a>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>

                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        onClick={LogOut}
                        href="#"
                      >
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                      </a>
                    </li>
                  </ul>
                  {/* <!-- End Profile Dropdown Items --> */}
                </li>
                {/* <!-- End Profile Nav --> */}
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      {/* <Container className=""> */}
     
      {/* </Container> */}
    </div>
  );
};
export default Navbar;
