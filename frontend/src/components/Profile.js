import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";

import { getUser } from "../services/Sessionservice";
const Profile = () => {
  const user = getUser();
  const [oldPass, setOldPass] = useState("");
  const [newPass, serNewPass] = useState("");
  const [state, setState] = useState({
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
    _id,
  } = state;

  const [imguser, setImguser] = useState("");
  const fetchdatauser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/findprofile/${user}`)
      .then((response) => {
        console.log(response.data, "dddd");
        setState(response.data);
        setImguser(response.data.imguser);
        // const {username,password,nameuser,imguser,userpermission,email,education} = response.data ;
        // setState({...state,username,password,nameuser,imguser,userpermission,email,education})
      })
      .catch((err) => {
        alert(err);
      });
  };
  const inputProfile = (name) => (event) => {
    console.log(name, "dd", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  const inputProfileImg = (e) => {
    //type file
    setImguser(e.target.files[0]);
  };
  const submitEditProfile = () => {};
  const getOldpass = (e) => {
    setOldPass(e.target.value);
  };
  const getnewpass = (e) => {
    serNewPass(e.target.value);
  };
  const SumMitchangePassword = async (e) => {
    e.preventDefault(); //ให้ข้อมูลค้างใน แบบ form ก่อน
    console.log(imguser, "test");
    console.log(password, "password");
    // console.table({title,author,content});//แสดงค่า
    if (oldPass != newPass) {
      alert("กรุณากรอกรหัสผ่านให้ถูกต้อง");
    } else if (oldPass === "" || newPass === "") {
      alert("กรุณาป้อนข้อมูลที่ต้องการเปลี่ยน");
    } else if (newPass === password) {
      alert("รหัสผ่านไม่มีการเปลียนแปลง");
    } else {
      const password = newPass;
      console.log("API URL", process.env.REACT_APP_API);
      await axios
        .put(
          `${process.env.REACT_APP_API}/editprofile/${_id}`,
          {
            imguser,
            username,
            password,
            nameuser,
            userpermission,
            email,
            education,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          const {
            _id,
            username,
            password,
            nameuser,
            userpermission,
            email,
            education,
          } = response.data;
          setState({
            ...state,
            _id,
            username,
            password,
            nameuser,
            userpermission,
            email,
            education,
          });

          setImguser(response.data.imguser);
          //  window.location.reload()
        })
        .catch((err) => {
          //   alert(err.response.data.error)//คือค้าerrorที่อยู่ใน Server ที่เราเขียนไป
          console.log(err);
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    }
  };
  //NODE ยังไม่ได้ทำsubmit PROFILE ทั้งสองอย่าง frontend และ backend
  //ยังบัคเวลาบันทึกอยู่นะ
  const profileSubmit = async (e) => {
    e.preventDefault(); //ให้ข้อมูลค้างใน แบบ form ก่อน
    console.log(imguser, "test");

    // console.table({title,author,content});//แสดงค่า

    console.log("API URL", process.env.REACT_APP_API);
    await axios
      .put(
        `${process.env.REACT_APP_API}/editprofile/${_id}`,
        {
          imguser,
          username,
          password,
          nameuser,
          userpermission,
          email,
          education,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
        const {
          _id,
          username,
          password,
          nameuser,
          userpermission,
          email,
          education,
        } = response.data;
        setState({
          ...state,
          _id,
          username,
          password,
          nameuser,
          userpermission,
          email,
          education,
        });

        setImguser(response.data.imguser);
        //  window.location.reload()
      })
      .catch((err) => {
        //   alert(err.response.data.error)//คือค้าerrorที่อยู่ใน Server ที่เราเขียนไป
        console.log(err);
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };
  // **** ให้ดูตัวอย่างจาก หน้า Edit น่ะ เพราะ อาจจะต้อง แตกfield เพื่อรับค่า
  useEffect(() => {
    fetchdatauser();
    // const x = finduser.map(e=>e.nameuser)
    // console.log(x,"asdasd")
    console.log(state, "sss");
  }, []);
  return (
    <div>
      <Navbar />
      <div className="row mt-5 mx-2">
        <div class="col-xl-4">
          {/* {state.map((datauser,index)=>(  */}
          <div class="card">
            <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
              {/* /images/${datauser.imguser} */}
              <img
                src={`/images/${imguser}`}
                alt="Profile"
                class="rounded-circle"
                style={{ width: "250px" }}
              />
              <h2>{nameuser}</h2>
          <h5>{userpermission}</h5> 
              <div class="social-links mt-2">
                <a href="#" className="twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          {/* ))}  */}
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body pt-3">
              {/* <!-- Bordered Tabs --> */}

              <ul className="nav nav-tabs nav-tabs-bordered">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-overview"
                  >
                    Overview
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-edit"
                  >
                    Edit Profile
                  </button>
                </li>

                {/* <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                </li> */}

                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-change-password"
                  >
                    Change Password
                  </button>
                </li>
              </ul>

              <div className="tab-content pt-2">
                {/* {state.map((datauser,index)=>(    ))} */}

                <div
                  className="tab-pane fade show active profile-overview"
                  id="profile-overview"
                >
                  {/* <h5 className="card-title">About</h5>
                  <p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</p> */}

                  <h5 className="card-title">Profile Details</h5>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Full Name</div>
                    <div className="col-lg-9 col-md-8">
                      <p>{nameuser}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Username</div>
                    <div className="col-lg-9 col-md-8">{username}</div>
                  </div>
                  {/* <div className="row">
                    <div className="col-lg-3 col-md-4 label">Education</div>
                    <div className="col-lg-9 col-md-8">{education}</div>
                  </div> */}

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Permission</div>
                    <div className="col-lg-9 col-md-8">{userpermission}</div>
                  </div>

                  {/* <div className="row">
                    <div className="col-lg-3 col-md-4 label">Country</div>
                    <div className="col-lg-9 col-md-8">USA</div>
                  </div> */}
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Education</div>
                    <div className="col-lg-9 col-md-8">{education}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Email</div>
                    <div className="col-lg-9 col-md-8">{email}</div>
                  </div>
                </div>

                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
                  {/* <!-- Profile Edit Form --> */}
                  <form onSubmit={profileSubmit}>
                    <div class="row mb-3">
                      <label
                        for="profileImage"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Profile Image
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <imgC alt="Profile" />
                        <div class="pt-2">
                          <Form.Group
                            onChange={inputProfileImg}
                            controlId="formFile"
                            className="form-control mb-3"
                          >
                            <Form.Label>รูปภาพ</Form.Label>
                            <Form.Control name="imagesubject" type="file" />
                          </Form.Group>
                          {/* <a href="#" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"/></a>
                          <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"/></a> */}
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="fullName"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Username
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                        disabled
                          name="fullName"
                          type="text"
                          class="form-control"
                          id="username"
                          value={username}
                          onChange={inputProfile("username")}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="fullName"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Full Name
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          class="form-control"
                          id="nameuser"
                          value={nameuser}
                          onChange={inputProfile("nameuser")}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="fullName"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Userpermission
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          class="form-control"
                          id="userpermission"
                          disabled
                          value={userpermission}
                          onChange={inputProfile("userpermission")}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="fullName"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Email
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          class="form-control"
                          id="email"
                          value={email}
                          onChange={inputProfile("email")}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="fullName"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Education
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="fullName"
                          type="text"
                          class="form-control"
                          id="education"
                          value={education}
                          onChange={inputProfile("education")}
                        />
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary">
                        Save Change
                      </button>
                    </div>
                  </form>
                </div>
                <div class="tab-pane fade pt-3" id="profile-change-password">
                  {/* <!-- Change Password Form --> */}
                  <form>
                    <div class="row mb-3">
                      <label
                        for="currentPassword"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Current Password
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="password"
                          disabled
                          type="password"
                          value={password}
                          class="form-control"
                          id="currentPassword"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="newPassword"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        New Password
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="newpassword"
                          type="password"
                          onChange={getOldpass}
                          class="form-control"
                          id="newPassword"
                        />
                      </div>
                    </div>

                    <div class="row mb-3">
                      <label
                        for="renewPassword"
                        class="col-md-4 col-lg-3 col-form-label"
                      >
                        Re-enter New Password
                      </label>
                      <div class="col-md-8 col-lg-9">
                        <input
                          name="renewpassword"
                          type="password"
                          onChange={getnewpass}
                          class="form-control"
                          id="renewPassword"
                        />
                      </div>
                    </div>

                    <div class="text-center">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={SumMitchangePassword}
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                  {/* <!-- End Change Password Form --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <p>dd</p> */}
      </div>
    </div>
  );
};
export default Profile;
