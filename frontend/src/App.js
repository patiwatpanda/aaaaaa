import {BrowserRouter , Routes ,Route, Navigate } from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login"
import { getUser } from "./services/Sessionservice";
import  Addsubject  from "./components/Addsubject" ;
import Adduser from "./components/Adduser";
import Subject from "./components/Subject";
import Episode from "./components/Episodecreate" ;
import Profile from "./components/Profile";
import Editsubject from "./components/Editsubject";
import OverviewSubject from "./components/OverviewSubject";
import Alloverview from "./components/Alloverview";
import SearchOverview from "./components/SearchOverview";
//import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<OverviewSubject/>}/>
        <Route path="/episodecreate/:namesubParams" element={<Episode/>}/>
        <Route path="/home" element={ getUser() ? <Home/>  :<Navigate to='/'/> } />
        <Route path="/addsub" element={<Addsubject/>} />
        <Route path="/adduser" element={<Adduser/>} />
        <Route path="/subject/:_id" element={<Subject/>} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/editsubject/:_id" element={<Editsubject/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/alloverview/:category" element={<Alloverview/>}/>
        <Route path="/searchoverview/:namesub" element={<SearchOverview/>}/>
    </Routes>
</BrowserRouter>
  );
}

export default App;
