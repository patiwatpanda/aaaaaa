import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../services/Sessionservice";
import {  logout} from "../services/Sessionservice";
import { Form, InputGroup,FormControl, Button, ListGroup,Container } from 'react-bootstrap';
import { useEffect,useState } from "react";
import axios from "axios";
const Navbar2 =()=>{
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const LogOut =()=>{
      logout(navigate(`/`));
   
  }
  
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const Check =()=>{
   console.log(getUser())
  }
  const handleSearchSubmit  = (event) => {
 
    // const query = event.target.value;
  if(!searchQuery.trim()){
  setSearchResults([]);
  return
  }
    // setSearchQuery(query);
    axios.get(`${process.env.REACT_APP_API}/search?q=${searchQuery}`)
      .then(response => setSearchResults(response.data))
      .catch(error => console.error(error));
  };
//   const fetchdataImgUser =()=>{
//     axios.get(`${process.env.REACT_APP_API}/getuser/`)
//     .then(response=>{

//     }).catch(err=>{

//     })
//   }

useEffect(()=>{
  handleSearchSubmit()
 },[searchQuery])


    return(
<div>
 {/* {getUser() ? 'currently' : 'not'} */}
<nav class="navbar navbar-expand-sm  bg-warning" data-bs-theme="dark">
    <div class="container">

    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="/"><h2>ระบบกวดวิชา</h2></a>
    <Form onSubmit={handleSearchSubmit} className="ms-auto">
              <div className="d-flex">
                
                <FormControl type="text" value={searchQuery} onChange={handleSearchQueryChange} placeholder="Search" className="me-2" />
              
                {/* <Button variant="primary">Signin</Button> */}
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
   {/* <button className="btn btn-outline-primary" onClick={Check}>check</button> */}
    <div class="offcanvas offcanvas-start" id="navbarSupportedContent">
      <ul class="navbar-nav p-2 me-auto mb-2 mb-lg-0">
      {/* <li class="nav-item ">
          <a class="nav-link active" aria-current="page" href="/">Login</a>
        </li> */}
        <Link to={"/login"} className="btn btn-info" >Login</Link>
        &nbsp;
      
     
      </ul>
  
    </div>
  </div>
</nav>
   {/* <Container className=""> */}
   {/* {searchResults &&  searchResults.length > 0 && (  <ListGroup className="w-50">
          {searchResults.map(result => <ListGroup.Item className="" action    key={result._id} href={`/searchoverview/${result.namesubject}`}>{result.namesubject}</ListGroup.Item>)}
        </ListGroup>) }  */}
      {/* </Container> */}
</div>
     
      
    )
}
export default Navbar2 ;