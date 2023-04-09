import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { getUser } from "../services/Sessionservice";
import { getUserPermission } from "../services/Sessionservice";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
// import "./Subject.css";
const Subject = () => {
  const user = getUser();
  const { _id } = useParams();
  const [state, setState] = useState([]);

  const [epis, setEpisode] = useState([]);
  const [videoView, setVideoView] = useState([]);
  const [fileView, setFileView] = useState([]);
  const [docpdf, setDocpdf] = useState("");
  const [usern, setUser] = useState([]);
  const [medal, setmedalsubject] = useState([]);
  const [imguser, setImguser] = useState("");
  //  const medaluser = medal.map(e=>{return e.username})

  const [episodeAddnew, setEpisodeAddnew] = useState({
    nameepisode: "",
    namesubject: _id,
  });
  const [episodeEdit, setEpisodeEdit] = useState([]);
  const [statemadelfile, setStatemadelFile] = useState({
    nameepisode: "",
    namesubject: _id,
    nametopic: "",
  });
  const [statemadel, setStatemadel] = useState({
    nameepisode: "",
    namesubject: "",
    nametopic: "",
    video: "",
  });
  const [stateEditVideomadel, setStateEditVideomadel] = useState([]);
  const [stateEditFile, setStateEditFile] = useState([]);

  const [errors, setErrors] = useState({});
  const [errorsEP, setErrorsEP] = useState({});
  const [episode, setEpisoded] = useState(_id);
  const fetchdata = async () => {

    await axios
      .get(`${process.env.REACT_APP_API}/subject/${_id}`)
      .then((response) => {
        console.log(user, "sss");
        console.log(response.data, "insubject");

        setState(response.data);

        // setUserTest(response.data.username);
        // console.log(usertest,"inuser")
        //  fetchDataUser(usertest)
        //  console.lusernameog("77",namesubject)
        //  setEpisodeAddnew({...episodeAddnew,namesubject:response.data._id})
      })
      .catch((err) => {
        alert(err);
      });

    // const username = state.map(e=>{return e.username})
    // fetchDataUser()
  };

  const fetchdata2 = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/getepisode/${episode}`)
      .then((response) => {
        console.log(response.data, "aaa");
        setEpisode(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //ดึงข่้อมูลVideo
  const fetchdataVideo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/getVideoEP/${_id}`)
      .then((response) => {
        setVideoView(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const fetchdataFile = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/viewfileEP/${_id}`)
      .then((response) => {
        console.log(response.data, "aas");
        setFileView(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const fetchDataUser = () => {
    axios
      .get(`${process.env.REACT_APP_API}/fineprofileall`)
      .then((response) => {
        console.log(response.data, "dddd");
        setUser(response.data);
        // setImguser(response.data.imguser)
      })
      .catch((err) => {
        alert(err);
      });
  };
  //ดึงข้อมูลใส่หน้าต่าง เพิ่มบท
  // const getEpisodeData = (e) => {
  //   //   console.log(e,"dd");
  //   //   axios.get(`${process.env.REACT_APP_API}/medalsubject/${e}`).then(response=>{
  //   //     console.log(response.data,"sss")
  //   //     const {nameepisode,namesubject,username} = response.data;
  //   //     setStatemadel({...statemadel,nameepisode,namesubject,username})
  //   //   })
  //   //   .catch(err=>{
  //   //     alert(err)
  //   //   })
  //   // }
  // };

  //สร้าง บทใหม่่
  const getEpisodemodal = () => {
    const inputEpisode = (name) => (event) => {
      console.log(name, "=", event.target.value);

      setEpisodeAddnew({ ...episodeAddnew, [name]: event.target.value });
    };
    const handleKeyDown = (event) => {
      const value = event.target.value;
      if (event.keyCode === 32 && value.endsWith("")) {
        event.preventDefault();
        // alert("ห้ามเว้นวรรคที่ท้ายข้อความ")
      }
    };
    const { nameepisode, namesubject } = episodeAddnew;
    const submitEpisode = async (e) => {
      let errorsEP = {};
      e.preventDefault();
      if (!nameepisode) {
        errorsEP.nameepisode = "Nameepisode is required";
      }
      setErrorsEP(errorsEP);
      console.log(namesubject, "aaa");
      await axios
        .post(`${process.env.REACT_APP_API}/episode`, {
          nameepisode,
          namesubject,
        })
        .then((response) => {
          console.log(response.data);
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          setEpisodeAddnew({
            ...episodeAddnew,
            nameepisode: "",
            namesubject: "",
          });
          //   setCategory("")พิ่มบท
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    };
    return (
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
            เพิ่มบท
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Form noValidate onSubmit={submitEpisode}>
              <Form.Group
                controlId="formNameepisode"
                className="position-relative"
              >
                <Form.Label>ชื่อบท:</Form.Label>
                <Form.Control
                  type="text"
                  name="nameepisode"
                  // value={values.firstName}
                  onChange={inputEpisode(`nameepisode`)}
                  isInvalid={!!errorsEP.nameepisode}
                  onKeyDown={handleKeyDown}
                />
                <Form.Control.Feedback type="invalid">
                  {errorsEP.nameepisode}
                </Form.Control.Feedback>
              </Form.Group>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  บันทึก
                </button>
                {/* onClick={submitEpisode} */}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  };
  //ดึงข้อมูลใส่ Edit บท 
  const getEditEp =(e)=>{
    console.log(e, "dd");
    axios
      .get(`${process.env.REACT_APP_API}/medalsubject/${e}`)
      .then((response) => {
        console.log(response.data, "sss");
        // const { nameepisode, namesubject, username } = response.data;

        // setStatemadel({ ...statemadel, nameepisode, namesubject });
        setEpisodeEdit(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }
  //Edit บท 
  const editEpModel =()=>{
    const inputEpisode = (name) => (event) => {
      console.log(name, "=", event.target.value);

      setEpisodeEdit({...episodeEdit, [name]: event.target.value });
    };
    const handleKeyDown = (event) => {
      const value = event.target.value;
      if (event.keyCode === 32 && value.endsWith("")) {
        event.preventDefault();
        // alert("ห้ามเว้นวรรคที่ท้ายข้อความ")
      }
    };
    const { _id,nameepisode, namesubject } = episodeEdit;
    const submitEpisode = async (e) => {
      let errorsEP = {};
      e.preventDefault();
      if (!nameepisode) {
        errorsEP.nameepisode = "Nameepisode is required";
      }
      setErrorsEP(errorsEP);
      console.log(_id, "aaa");
      await axios
        .put(`${process.env.REACT_APP_API}/editEP/${_id}`, {
          nameepisode,
          namesubject,
        })
        .then((response) => {
          console.log(response.data);
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          // setEpisodeAddnew({
          //   ...episodeAddnew,
          //   nameepisode: "",
          //   namesubject: "",
          // });
          //   setCategory("")
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    };
    return (
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
             แก้ไขบท
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <Form noValidate onSubmit={submitEpisode}>
              <Form.Group
                controlId="formNameepisode"
                className="position-relative"
              >
                <Form.Label>ชื่อบท:</Form.Label>
                <Form.Control
                  type="text"
                  name="nameepisode"
                  value={nameepisode}
                  onChange={inputEpisode(`nameepisode`)}
                  isInvalid={!!errorsEP.nameepisode}
                  onKeyDown={handleKeyDown}
                />
                <Form.Control.Feedback type="invalid">
                  {errorsEP.nameepisode}
                </Form.Control.Feedback>
              </Form.Group>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  บันทึก
                </button>
                {/* onClick={submitEpisode} */}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  //ดึงข้อมูลใส่หน้าต่าง เพิ่ม video
  const medalSubject = (e) => {
    console.log(e, "dd");
    axios
      .get(`${process.env.REACT_APP_API}/medalsubject/${e}`)
      .then((response) => {
        console.log(response.data, "sss");
        // const { nameepisode, namesubject, username } = response.data;

        // setStatemadel({ ...statemadel, nameepisode, namesubject });
        setStatemadel(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //modal Video หน้าต่างเพิ่มวิดิโอ
  const getmedel = (e) => {
    console.log(medal, "999");
    const inputEpiode = (name) => (event) => {
      console.log(name, "=", event.target.value);

      setStatemadel({ ...statemadel, [name]: event.target.value });
    };
    const {_id, namesubject, nametopic, video } = statemadel;
    const medalSubmit = () => {
      const nameepisode = _id ;
      axios
        .post(
          `${process.env.REACT_APP_API}/addEpVideo`,
          { nameepisode, namesubject, video, nametopic }
          // {
          //  headers:{
          //     'Content-Type': 'multipart/form-data'
          //  },
          // }
        )
        .then((response) => {
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    };

    return (
      <div class="modal-dialog"   data-backdrop="static">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
            เพิ่มวิดีโอ
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              {/* <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  ชื่อบท:
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={_id}
                  onChange={inputEpiode("nameepisode")}
                />
              </div> */}
              <div>
                <label for="recipient-name" class="col-form-label">
                  ชื่อหัวข้อ:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={nametopic}
                  onChange={inputEpiode("nametopic")}
                ></input>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Video:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={video}
                  onChange={inputEpiode("video")}
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onClick={medalSubmit}>
              บันทึก
            </button>
            {/* <button type="button" class="btn btn-primary" onClick={check}>ccc</button> */}
          </div>
        </div>
      </div>
    );
  };
  // const inputSubjectEP =(e)=>{
  //   console.log(typeof(e),"444")
  //     // setEpisodeAddnew({...episodeAddnew,  namesubject: e })
  //     setTestep(e)
  // }
  //ดึงข้อมูลใส่หน้าต่าง เพิ่ม หน้าต่างเพิ่ม file
  const getModalFile = (e) => {
    console.log(e, "dd");
    axios
      .get(`${process.env.REACT_APP_API}/medalsubject/${e}`)
      .then((response) => {
        console.log(response.data, "sss");
        // const { nameepisode } = response.data;

        // setStatemadelFile({ ...statemadelfile, nameepisode });
        setStatemadelFile(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //หน้าต่างเพิ่ม file
  const modelFile = () => {
    const {_id,nameepisode, namesubject, nametopic } = statemadelfile;
    const inputDocpdf = (event) => {
      console.log(event.target.name, "+", event.target.files);

      setDocpdf(event.target.files[0]);
    };
    const inputFile = (name) => (event) => {
      setStatemadelFile({ ...statemadelfile, [name]: event.target.value });
    };
    const medalFileSubmit = (e) => {
      e.preventDefault()
      console.log(namesubject, "545");
      const nameepisode = _id ;
      axios
        .post(
          `${process.env.REACT_APP_API}/addfile`,
          { nameepisode, namesubject, docpdf, nametopic },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    };

    return (
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              เพิ่มเอกสาร
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              {/* <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  ชื่อบท:
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={_id}
                  onChange={inputFile("nameepisode")}
                />
              </div> */}
              <div>
                <label for="recipient-name" class="col-form-label">
                  ชื่อหัวข้อ:
                </label>
                <input
                  type="text"
                  class="form-control"
                  onChange={inputFile("nametopic")}
                ></input>
              </div>
              {/* onChange={inputDocpdf}  */}
              <Form.Group
                onChange={inputDocpdf}
                style={{ width: "400px" }}
                controlId="formFile"
                className="mb-3"
              >
                <Form.Label>เอกสาร</Form.Label>
                <Form.Control type="file" name="docpdf" />
              </Form.Group>
            </form>
          </div>
          <div class="modal-footer">
            {/* onClick={medalSubmit} */}
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={medalFileSubmit}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    );
  };
  //ดึงข้อมูลใส่หน้าต่าง เพิ่ม Editvideo
  const getEditVideo = (e) => {
    console.log(e, "dd");
    axios
      .get(`${process.env.REACT_APP_API}/getEditVideo/${e}`)
      .then((response) => {
        console.log(response.data, "sss");
        // const {_id, nameepisode, namesubject,video,nametopic, username } = response.data;

        setStateEditVideomadel(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //หน้าต่างเพิ่ม EditVideo
  const modelEditVideo = () => {
    // console.log(stateEditVideomadel, "999");
    const { _id, nameepisode,namesubject, video, nametopic } =
      stateEditVideomadel;
    // const {}
    const inputVideoEdit = (name) => (event) => {
      console.log(name, "=", event.target.value);

      setStateEditVideomadel({
        ...stateEditVideomadel,
        [name]: event.target.value,
      });
    };

    const medalEditSubmit = () => {
      // const nameepisode = _id ;
      axios
        .put(
          `${process.env.REACT_APP_API}/editVideo/${_id}`,
          { nameepisode, namesubject, video, nametopic }
          // {
          //  headers:{
          //     'Content-Type': 'multipart/form-data'
          //  },
          // }
        )
        .then((response) => {
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    };
    return (
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              แก้ไขวิดีโอ
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
          
              <div>
                <label for="recipient-name" class="col-form-label">
                  ชื่อหัวข้อ:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={nametopic}
                  onChange={inputVideoEdit("nametopic")}
                ></input>
              </div>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">
                  Video:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={video}
                  onChange={inputVideoEdit("video")}
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={medalEditSubmit}
            >
              บันทึก
            </button>
            {/* <button type="button" class="btn btn-primary" onClick={check}>ccc</button> */}
          </div>
        </div>
      </div>
    );
  };
  //ดึงข้อมูล EditFile
  const getFileEdit = (e) => {
    axios
      .get(`${process.env.REACT_APP_API}/geteditFile/${e}`)
      .then((response) => {
        console.log(response.data, "sss");
        // const { nameepisode, namesubject, docpdf, nametopic } = response.data;

        setStateEditFile(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //  //หน้าต่างเพิ่ม EditFile *****ทำต่อ
  const modelEditFile = () => {
    const { _id, nameepisode, namesubject, nametopic } = stateEditFile;
    const inputDocpdf = (event) => {
      console.log(event.target.name, "+", event.target.files);

      setDocpdf(event.target.files[0]);
    };
    const inputFile = (name) => (event) => {
      setStateEditFile({ ...stateEditFile, [name]: event.target.value });
    };
    const medalFileSubmit = () => {
      console.log(namesubject, "545");
      axios
        .put(
          `${process.env.REACT_APP_API}/editfile/${_id}`,
          { nameepisode, namesubject, docpdf, nametopic },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
          // setFileView(response.data)
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        });
    };
    return (
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
             แก้ไขเอกสาร
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
         
              <div>
                <label for="recipient-name" class="col-form-label">
                  ชื่อหัวข้อ:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={nametopic}
                  onChange={inputFile("nametopic")}
                ></input>
              </div>
              {/* onChange={inputDocpdf}  */}
              <Form.Group
                onChange={inputDocpdf}
                style={{ width: "400px" }}
                controlId="formFile"
                className="mb-3"
              >
                <Form.Label>เอกสาร</Form.Label>
                <Form.Control type="file" name="docpdf" />
              </Form.Group>
            </form>
          </div>
          <div class="modal-footer">
            {/* onClick={medalSubmit} */}
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={medalFileSubmit}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    );
  };
  //ลบ EP
  const confirmDelete = (_id) => {
    //ไปดูลูกเล่นอื่น ใน sweetalert2.com ได้
    Swal.fire({
      title: "ลบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //กดปุ่ม ok หรือตกลง
      if (result.isConfirmed) {
        deleteEP(_id);
      }
    });
  };
  //delete all VIDEO and File
  const deleteEP =(_id)=>{
  Promise.all([ 
      axios.delete(`${process.env.REACT_APP_API}/deleteEp/${_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllVideoEp/${_id}`),
      axios.delete(`${process.env.REACT_APP_API}/deleteAllFileEp/${_id}`)
  // })
  ])
  .then(response=>{
  Swal.fire(
    "Deleted!",
   response[0].data.message,
    "success"

  )
  fetchdata();
        fetchdata2();
        fetchdataFile();
        fetchdataVideo();
  })
  .catch(error => {
    console.log(error);
  });
  }
  //delete sigle EP
  // const deleteEP = (_id) => {
  //   //ส่ง request ไปที่ api เพื่อลบข้อมูล
  //   axios
  //     .delete(`${process.env.REACT_APP_API}/deleteEp/${_id}`, {
  //       //   headers:{
  //       //     authorization:`Bearer ${getToken()}`
  //       // }
  //     })
    
  //     .then((response) => {
  //       Swal.fire("Deleted!", response.data.message, "success");
  //       fetchdata();
  //       fetchdata2();
  //       fetchdataFile();
  //       fetchdataVideo();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  //ลบ documant ใน EP
  const confirmDocumantEPDelete = (_id) => {
    //ไปดูลูกเล่นอื่น ใน sweetalert2.com ได้
    Swal.fire({
      title: "ลบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //กดปุ่ม ok หรือตกลง
      if (result.isConfirmed) {
        deleteFileEP(_id);
      }
    });
  };
  const deleteFileEP = (_id) => {
    //ส่ง request ไปที่ api เพื่อลบข้อมูล
    axios
      .delete(`${process.env.REACT_APP_API}/deleteFileEp/${_id}`, {
        //   headers:{
        //     authorization:`Bearer ${getToken()}`
        // }
      })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchdata();
        fetchdata2();
        fetchdataFile();
        fetchdataVideo();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //ลบ video EP
  const confirmVideoDelete = (_id) => {
    //ไปดูลูกเล่นอื่น ใน sweetalert2.com ได้
    Swal.fire({
      title: "ลบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      //กดปุ่ม ok หรือตกลง
      if (result.isConfirmed) {
        deletevideoEP(_id);
      }
    });
  };
  //ลบ doccument ใน video EP
  const deletevideoEP = (_id) => {
    //ส่ง request ไปที่ api เพื่อลบข้อมูล
    axios
      .delete(`${process.env.REACT_APP_API}/deleteVideo/${_id}`, {
        //   headers:{
        //     authorization:`Bearer ${getToken()}`
        // }
      })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchdata();
        fetchdata2();
        fetchdataFile();
        fetchdataVideo();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchdata();
    fetchdata2();
    fetchdataFile();
    fetchdataVideo();
    fetchDataUser();
  }, []);
  return (
    <div>
      {getUser() ? <Navbar /> : <Navbar2 />}
      {state.map((sub, index) => (
        // <div className="">
        //   {/* <div  style={{height:"500px",width:""}}> */}
        //   <div
        //     className="row bg-light  w-100"
        //     style={{ height: "500px", width: "" }}
        //   >
        //     <Col>
        //       <div
        //         style={{ height: "", padding: "80px 100px 40px" }}
        //         className="bg-light mt-5"
        //       >
        //         <div>
        //           <h1 className="ms-5">{sub.namesubject}</h1>
        //         </div>

        //         <p>{sub.comment}</p>
        //       </div>
        //     </Col>
        //     <Col>
        //       <div
        //         style={{ height: "", width: "" }}
        //         className="ratio ratio-21x9  mt-5 "
        //       >
        //         {/* <iframe className="mt-2" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="Youtube video" allowFullScreen></iframe> */}
        //         <img
        //           src={`/images/${sub.imagesubject}`}
        //           className="rounded img-fluid"
        //           style={{ height: "" }}
        //           alt="..."
        //         />
        //       </div>
        //     </Col>
        //   </div>
        //   {/* </div> */}
        // </div>

        <div className="d-flex flex-column justify-content-center align-items-center ">
  <div className="row bg-light w-100 mb-2">
    <Col xs={12}  lg={6}>
      <div
        style={{ height: "", padding: "80px 40px 40px" }}
        className="bg-light mt-5"
      >
        <div>
          <h1 className="ms-5">{sub.namesubject}</h1>
        </div>

        <p>{sub.comment}</p>
      </div>
    </Col>
    <Col xs={12} lg={6}>
      <div
        style={{ height: "", width: "" }}
        className="ratio ratio-21x9 mt-5"
      >
        <img
          src={`/images/${sub.imagesubject}`}
          className="rounded img-fluid"
          style={{ maxHeight: "" }}
          alt="..."
        />
      </div>
    </Col>
  </div>
</div>
      ))}
      {state.map((sub, index) => (
        <div
          className="container-fluid bg-dark bg-opacity-25"
          style={{ height: "auto" }}
        >
          {/* xs={1} sm={1} lg={2} */}
          <Row className="">
            <Col>
              <div
                className=" bg-opacity-10  border-end my-2 "
                style={{ height: "auto" }}
              >
                <div className=" container ">
                  <div className="d-flex justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="600"
                      height="50"
                      fill="currentColor"
                      class="bi bi-card-text"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                      <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </div>
                  <div className=" d-flex justify-content-center">
                    <h2>เกี่ยวกับรายวิชา</h2>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{ __html: sub.objectdescription }}
                  ></p>
                </div>
              </div>
            </Col>
            <Col>
              {/* <Link to={`/episodecreate/${sub._id}`} className="btn btn-primary">เพิ่มบท</Link> */}

              <div className="mb-3">
                <br />
                { (getUserPermission() === "Admin" ||
                                          sub.username === getUser()) && (
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary text-center"
                    data-bs-toggle="modal"
                    data-bs-target="#creacteEpisode"
                  >
                    เพิ่มบท
                  </button>
                </div>)}
                <br />
                {/* <button className="btn btn-primary" onClick={fetchdata2} >check</button> */}
                <Accordion defaultActiveKey={["0"]}>
                  {epis
                    .filter(
                      (ep, index) =>
                        epis.findIndex(
                          (eps) => eps.nameepisode === ep.nameepisode
                        ) === index
                    )
                    .map((ei, index) => (
                      <Accordion.Item eventKey={index}>
                        {/* <div className="d-flex"><h3>{ei.nameepisode}</h3><Button >เพิ่มวิดิโอ</Button></div>data-value={ei._id}  */}
                        <Accordion.Header>
                          <div
                            className="d-flex justify-content-between "
                            style={{ width: "825px" }}
                          >
                            <div class="">
                              <h3>{ei.nameepisode}</h3>
                            </div>
                            {usern
                              .filter(
                                (person, index) =>
                                  person.username === sub.username
                              )
                              .map(
                                (e, index) =>
                                  (getUserPermission() === "Admin" ||
                                    e.username === getUser()) && (
                                    <div class="">
                                        <Button
                                        className="mx-1"
                                        variant="warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#getEditEp"
                                        onClick={() => getEditEp(ei._id)}
                                      >
                                        แก้ไขบท
                                      </Button>
                                      <Button
                                        className="mx-1"
                                        variant="info"
                                        data-bs-toggle="modal"
                                        data-bs-target="#creacteFile"
                                        onClick={() => getModalFile(ei._id)}
                                      >
                                        เพิ่มไฟล์
                                      </Button>
                                      <Button
                                        className="mx-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#creactevideo"
                                        onClick={() => medalSubject(ei._id)}
                                      >
                                        เพิ่มวิดิโอ
                                      </Button>
                                      <Button
                                        variant="danger"
                                        className="mx-1"
                                        onClick={() => confirmDelete(ei._id)}
                                      >
                                        ลบ
                                      </Button>
                                    </div>
                                  )
                              )}
                          </div>
                        </Accordion.Header>

                        <Accordion.Body>
                          <div className="">
                            {" "}
                            {videoView
                              .filter(
                                (eep, index) =>
                                  eep.nameepisode === ei._id 
                              )
                              .map((eei, index) => (
                                <div className="d-flex justify-content-between mb-1">
                                  {" "}
                                  <p>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-camera-video-fill "
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
                                      />
                                    </svg>
                                    &nbsp;{" "}
                                    <a href={eei.video} target="_blank">
                                      {eei.nametopic}
                                    </a>
                                  </p>
                                  {usern
                                    .filter(
                                      (person, index) =>
                                        person.username === sub.username
                                    )
                                    .map(
                                      (e, index) =>
                                        (getUserPermission() === "Admin" ||
                                          e.username === getUser()) && (
                                          <div>
                                            <Button
                                              className="mx-1"
                                              variant="warning"
                                              data-bs-toggle="modal"
                                              data-bs-target="#editVideo"
                                              onClick={() =>
                                                getEditVideo(eei._id)
                                              }
                                            >
                                              edit
                                            </Button>

                                            <Button
                                              variant="danger"
                                              onClick={() =>
                                                confirmVideoDelete(eei._id)
                                              }
                                            >
                                              ลบ
                                            </Button>
                                          </div>
                                        )
                                    )}{" "}
                                </div>
                              ))}
                            {fileView
                              .filter(
                                (eep, index) =>
                                  eep.nameepisode === ei._id 
                              )
                              .map((eei, index) => (
                                <div className="d-flex justify-content-between mb-1">
                                  <p>
                                  {eei.docpdf.endsWith('.pdf') && (<svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-file-pdf-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M5.523 10.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.035 21.035 0 0 0 .5-1.05 11.96 11.96 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.888 3.888 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 4.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z" />
                                      <path
                                        fill-rule="evenodd"
                                        d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.64 11.64 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.707 19.707 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"
                                      />
                                    </svg>) }
                                    {eei.docpdf.endsWith('.docx') && (<i class="bi bi-file-earmark-word"></i>) }
                                    {eei.docpdf.endsWith('.xlsx') && (<i class="bi bi-file-earmark-excel"></i>) }
                                    &nbsp;{" "}
                                    <a
                                      target="_blank"
                                      rel="noreferrer"
                                      href={`/file/${eei.docpdf}`}
                                      src=""
                                      onClick=""
                                    >
                                      {eei.nametopic}
                                    </a>
                                  </p>
                                  {usern
                                    .filter(
                                      (person, index) =>
                                        person.username === sub.username
                                    )
                                    .map(
                                      (e, index) =>
                                        (getUserPermission() === "Admin" ||
                                          e.username === getUser()) && (
                                          <div>
                                            <Button
                                              variant="warning"
                                              data-bs-toggle="modal"
                                              data-bs-target="#getEditFile"
                                              onClick={() =>
                                                getFileEdit(eei._id)
                                              }
                                            >
                                              edit
                                            </Button>
                                            &nbsp;
                                            <Button
                                              variant="danger"
                                              onClick={() =>
                                                confirmDocumantEPDelete(eei._id)
                                              }
                                            >
                                              ลบ
                                            </Button>
                                          </div>
                                        )
                                    )}
                                </div>
                              ))}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                </Accordion>
              </div>
            </Col>
          </Row>
        </div>
      ))}
      {/*ทำต่อ ๆ 13/2/2566  */}
      {state.map((value, i) =>
        usern
          .filter((person, index) => person.username === value.username)
          .map((e, index) => (
            <div
              className="container-fluid d-flex justify-content-center"
              style={{ height: "500px" }}
            >
              <div className=" mt-5 d-flex flex-column align-items-center">
                <img
                  src={`/images/${e.imguser}`}
                  style={{ height: "300px" }}
                  class="rounded-circle"
                ></img>
                <h2>{e.nameuser}</h2>
                <h3>{e.education}</h3>
              </div>
              <br />

              <div></div>
            </div>
          ))
      )}
      {/* {medal.map((e,index)=>())} */}
      <div
        class="modal fade"
        id="creactevideo"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
            data-backdrop="static"
      >
        {getmedel()}
      </div>
      <div
        class="modal fade"
        id="creacteEpisode"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {getEpisodemodal()}
      </div>
      <div
        class="modal fade"
        id="creacteFile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {modelFile()}
      </div>
      <div
        class="modal fade"
        id="editVideo"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {modelEditVideo()}
      </div>
      <div
        class="modal fade"
        id="getEditFile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {modelEditFile()}
      </div>
      <div
        class="modal fade"
        id="getEditEp"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {editEpModel()}
      </div>
      <Footer />
    </div>
  );
};
export default Subject;
