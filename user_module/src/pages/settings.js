import React, { useState, useEffect } from "react";
import { Nav, Tab, Row, Col, Form, Table, Button, ProgressBar, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/css/style.css';
import jetskiing_img from '../assets/images/jetskiing.png';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import http from "../Helper/http";
import auth from "../services/auth";
import SweetAlert from 'react-bootstrap-sweetalert';
import NavBar from "../Common/navBar";
import Footer from "../Common/footer";
import Files from 'react-files';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import 'intl-tel-input/build/css/intlTelInput.css';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
import 'react-intl-tel-input/dist/main.css';

function Settings() {

   const [show, setShow] = useState(false);
   const [show1, setShow1] = useState(false);
   const [show2, setShow2] = useState(false);
   const [loder, setLoder] = useState(false);
   const [editprofile, setEditProfile] = useState(false);
   const [massege_err, setMassege] = useState("")
   const [errMessage, setErrMessage] = useState()
   const [oldPhone, setOldPhone] = useState()
   const [profile, setProfile] = useState({
      profile_image: "",
      profile_logo: "",
      logo_error: "",
      mobile_no: ""
   })
   const [interestCategory, setInterestCategory] = useState([])
   const [interest, setInterest] = useState([])
   const [interesterr, setInteresterr] = useState()

   const [levelCategory, setLevelCategory] = useState(["1", "2", "3"])
   const [level, setLevel] = useState()
   const [levelerr, setLevelerr] = useState()

   const handleChangeCategory = (op) => {
      if (interest.find(o => o == op) == op) {
         interest.splice( interest.findIndex(o => o == op), 1)
         setInterest([...interest])
      }
      else {
         setInterest([...interest,op])
      }
   }

   const levelhandleChange = (op) => {
      setLevel(op)
   }

   const handleSubmit = () => {

      if (interest.length == 0) {
         setInteresterr("* Interest is required")
         return false
      }
      if (level == '') {
         setLevel("* Level is required")
         return false
      }
      setLoder(true)
      var urlencoded = new URLSearchParams();
      urlencoded.append("email", profile.email);
      urlencoded.append("mobile_no", mobile.phone);
      // urlencoded.append("activity_id[]", Array(1,2));
      urlencoded.append("level", level);
      for (var i = 0; i < interest.length; i++) {
          urlencoded.append('activity_id', interest[i]);
      }

      http.Login_APi(`v1/user/user_interested_activities/store`, urlencoded)
          .then(result => {
              let { data } = result
              if (data && data.status === 200) {
                  console.log("");
                  setLoder(false)
                  setAlert({ ...alert, interestAct: true })
              }
              else {
                  setLoder(false)
                  console.log(data.message)
              }
          })
          .catch(error => {
            console.log(error)
            setLoder(false)
          });
  };



   const [mobile, setMobile] = useState({iso2: '', dialCode: '', phone: ''})
   const [event, setEvent] = useState("Profile")

   const [alert, setAlert] = useState({
      warning: false,
      message: "",
      loginsuccess: false,
      loginMessage: false,
      editproSuccess: false,
      editSuccess: false,
      contactSuccess: false,
      contactMessage: "",
      interestAct:false,
   })

   const onFilesChange = (files) => {
      if (files[0]) {
         setProfile({ ...profile, profile_image: files[0].name, profile_logo: files[0], logo_error: "" })
      }
   }

   const onFilesError = (error, file) => {
      setProfile({ ...profile, logo_error: `${error.message} limit upto 3MB max` })
   }
   // Show mobile number input
  
   const handleMob= (event) =>{
      setMobile({ ...mobile, phone: event.phone, iso2: event.iso2, dialCode: event.dialCode })
   }

   const inputProps = {
      placeholder: 'ReactIntlTelInput',
   };
   
   const intlTelOpts = {
      preferredCountries: ['cn'],
   };
   
    
   
   //  const onChange = value => console.log(value);
   //  const onReady = (instance, IntlTelInput) => console.log(instance, IntlTelInput);
   const getApi = (url,val) => {
      http.getList(url)
      .then(result => {
         if (result.status == 200) {
            console.log("=====================",result);
            if(val=="profile"){
               setProfile(result.data)
               setErrMessage(result.message)
               setOldPhone(result.data.mobile_no)
               setMobile({ ...mobile, phone: result.data.mobile_no, iso2: result.data.country_iso, dialCode: result.data.country_code })
               setLoder(false)
            } else if (val=="activity"){
               setLoder(false)
               setInterestCategory(result.data)
            }           
         } else {
            setErrMessage(result.message)
            setLoder(false)
         }
      })
      .catch(error => {
         console.log(error)
         setLoder(false)
      });
      
   }
   
   useEffect(() => {
      // Get Profile Detail API Start

      setLoder(true)
      getApi(`v1/user/get_profile`,"profile")
      getApi(`v1/user/get_all_activities`,"activity")
      // http.getList(`v1/user/get_profile`)
      //    .then(result => {
      //       if (result.status == 200) {
      //          console.log("=====================",result);
      //          setProfile(result.data)
      //          setErrMessage(result.message)
      //          setOldPhone(result.data.mobile_no)
      //          setMobile({ ...mobile, phone: result.data.mobile_no, iso2: result.data.country_iso, dialCode: result.data.country_code })
      //          setLoder(false)
      //       } else {
      //          setErrMessage(result.message)
      //          setLoder(false)
      //       }
      //    })
      //    .catch(error => {
      //       console.log(error)
      //       setLoder(false)
      //    });
      // Get Profile Detail End 
   }, []);


   // Contact Us Form Start
   const [contactform, setContactForm] = useState({
      email: "",
      subject: "",
      message: "",
   })
   const onContactSuccess = () => {
      setAlert({ ...alert, contactSuccess: false, contactMessage: "", interestAct: false })
      setShow2(false)
   }
   const handleContactForm = async () => {
      setLoder(true)
      var urlencoded = new URLSearchParams();
      urlencoded.append("first_name", profile.first_name);
      urlencoded.append("last_name", profile.last_name);
      urlencoded.append("email", profile.email);
      urlencoded.append("mobile_no", profile.mobile_no);
      urlencoded.append("message", contactform.message);

      await http.postData(`v1/user/contact_us/store`, urlencoded)
         .then(result => {
            let { data } = result;
            // console.log(data);
            if (data && data.status === 200) {
               
               setAlert({ ...alert, contactSuccess: true, contactMessage: data.message })
               setLoder(false)
            }
            else if (data && data.status === 400) {
               setAlert({ ...alert, warning: true, message: result.data.message })
               setLoder(false)
            }
            else {
               setAlert({ ...alert, warning: true, message: result.data.message })
               setLoder(false)
            }
         })
         .catch(error => {
            setMassege(error)
            setLoder(false)

         });
   }
   const handleChange = (text) => {
      setContactForm({ ...contactform, message: text })
   };
   // Contact Us Form End


   // Change Password Form Start

   const [form, setForm] = useState({
      old_password: "",
      new_password: "",
      confirm_new_password: "",
   })
   const [validation, setValidation] = useState({
      oldpassword_err: "",
      password_err: "",
      c_password_err: "",
      message_err: ""
   })
   const handleLogin = async () => {
      
      
      if (form.old_password == '') {
         setValidation({
            ...validation,
            oldpassword_err: '* Old Password is required',
            password_err: '',
            message_err: '',
            c_password_err: '',
         })
         return false
      }

      if (form.new_password == '') {
         setValidation({
            ...validation,

            password_err: "* Password is required",
            message_err: '',
            c_password_err: '',
            oldpassword_err: '',
         })
         return false
      }
      if (form.confirm_new_password == '') {
         setValidation({
            ...validation,
            c_password_err: "* Confirm Password is required",
            oldpassword_err: '',
            password_err: "",
            message_err: '',

         })
         return false
      }
      if (form.new_password !== form.confirm_new_password) {
         setValidation({
            ...validation,
            message_err: '*  Confirm Password is not match with password',
            oldpassword_err: '',
            password_err: "",

            c_password_err: "",
         })
         return false
      }
      setLoder(true)
      var urlencoded = new URLSearchParams();
      urlencoded.append("old_password", form.old_password);
      urlencoded.append("new_password", form.new_password);

      await http.postData(`v1/user/change_password`, urlencoded)
         .then(result => {
            let { data } = result;
            // console.log(data);
            if (data && data.status === 200) {
               setLoder(false)
               setAlert({ ...alert, loginsuccess: true, loginMessage: data.message })
            }
            else if (data && data.status === 400) {
               setLoder(false)
               setAlert({ ...alert, warning: true, message: result.data.message })
            }
            else {
               setLoder(false)
               setAlert({ ...alert, warning: true, message: result.data.message })
            }
         })
         .catch(error => {
            setLoder(false)
            setMassege(error)

         });
   }
   const onloginSuccess = () => {
      setForm({
         ...form, old_password: "",
         new_password: "",
         confirm_new_password: "",
      })
      setAlert({ ...alert, loginsuccess: false, loginMessage: "" })
   }
   // Change Password Form End


   // Edit Profile Form Start
   const [error, setEditvalidation] = useState({})
   const validations = () => {
      let error = {}
      if (profile.first_name == '') {
         error.first_name = "* First Name is required"
      }
      if (profile.dob == '') {
         error.dob = "*  DOB is required"
      } if (profile.gender == '') {
         error.gender = "*  Select your Gender"
      }
      return error

   };

   const handleSubmint = () => {
      if (Object.keys(validations()).length === 0) {
         editProfileAPI()
      }
      else {
         setEditvalidation(validations())
      }
   };

   const editProfileAPI = async () => {
      setLoder(true)
      var formdata = new FormData();
      formdata.append("first_name", profile.first_name);
      formdata.append("last_name", profile.last_name);
      formdata.append("mobile_no", mobile.phone);
      formdata.append("gender", profile.gender);
      formdata.append("dob", profile.dob);
      formdata.append("country_code", `+${mobile.dialCode}`);
      formdata.append("country_iso", mobile.iso2);
      formdata.append("image", profile.profile_logo);

      await http.postData(`v1/user/update/profile`, formdata)
         .then(result => {
            let { data } = result;
            console.log("=", data);
            if (data && data.status === 200) {
               setLoder(false)
               if (data && data.data.is_otp_verified == 0) {
                  setLoder(false)
                  setOtpVerify(true)
               }
               else {
                  setLoder(false)
                  setAlert({ ...alert, editSuccess: true })
               }

            }
            else if (data && data.status === 400) {
               setLoder(false)
               setAlert({ ...alert, warning: true, message: result.data.message })
            }
            else {
               setLoder(false)
               setAlert({ ...alert, warning: true, message: result.data.message })
            }
         })
         .catch(error => {
            setLoder(false)
            setMassege(error)

         });
   }
   const [otpVerify, setOtpVerify] = useState(false)
   const [otp, setOtp] = useState("")
   const onEditSuccess = () => {
      setAlert({ ...alert, editSuccess: true, editproSuccess: false })
      setOtpVerify(false)
   }
   const onEditProfileSuccess = () => {
      setAlert({ ...alert, editSuccess: false })
      setEditProfile(false)
      window.location.reload();
   }
   const handleChangeOtp = () => {
      setLoder(true)
      if (otp == '') {
         setMassege("Please Enter the OTP")
      } else {
         var urlencoded = new URLSearchParams();
         urlencoded.append("mobile_no", mobile.phone);
         urlencoded.append("otp", otp);

         http.Login_APi(`v1/user/otp_verify`, urlencoded)
            .then(result => {
               let { data } = result
               if (data && data.status === 200) {
                  setLoder(false)
                  setAlert({ ...alert, editproSuccess: true })
               }
               else {
                  setLoder(false)
                  setMassege(data.message)

               }
            })
            .catch(error => {
               setLoder(false)
               setMassege(error)
            });
      }
   }
   // Edit Profile Form End
 
console.log("=========",interest);
   return (<>
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={loder}
      // onClick={handleClose}
      >
         <CircularProgress color="inherit" />
      </Backdrop>

      {
         alert.warning ?
            <SweetAlert
               danger
               confirmBtnBsStyle="danger"
               title={alert.message}
               onConfirm={() => setAlert({ ...alert, success: true, warning: false, message: "" })}
               focusCancelBtn
            >
            </SweetAlert> : ""
      }

      {
         alert.loginsuccess ?
            <SweetAlert
               success
               title={alert.loginMessage}
               confirmBtnBsStyle={'danger'}
               onConfirm={() => onloginSuccess()}
            >
            </SweetAlert> : ""
      }
      {
         alert.editproSuccess ?
            <SweetAlert
               success
               title="Otp Verified Successflly"
               confirmBtnBsStyle={'danger'}
               onConfirm={() => onEditSuccess()}
            >
            </SweetAlert> : ""
      }
      {
         alert.editSuccess ?
            <SweetAlert
               success
               title="Your Profile Updated Successfully"
               confirmBtnBsStyle={'danger'}
               onConfirm={() => onEditProfileSuccess()}
            >
            </SweetAlert> : ""
      }
      {
         alert.contactSuccess ?
            <SweetAlert
               success
               title={alert.contactMessage}
               confirmBtnBsStyle={'danger'}
               onConfirm={() => onContactSuccess()}
            >
            </SweetAlert> : ""
      }
      {
         alert.interestAct ?
            <SweetAlert
               success
               title="Updated your intersted Activities"
               confirmBtnBsStyle={'danger'}
               onConfirm={() => onContactSuccess()}
            >
            </SweetAlert> : ""
      }
      <NavBar />
      <div>
         <div className="searchtaxibanner2">
            <Row>
               <Col md={12}>
                  <h2 className="text-white mt-5">Book your ride on finger tips</h2>
                  <p className="text-white">Lorem Ipsum is simply dummy text of the printing and
                     typesetting industry.
                  </p>
               </Col>
            </Row>
         </div>
         <div className="settingtabs">
            <div className="settingtabs1">
               <div className="container">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                     <Row>
                        <Col sm={3}>
                           <Nav variant="pills" className="flex-column settingnav">
                              <Nav.Item>
                                 <Nav.Link eventKey="first"> <i class="fa fa-user btnbackround" aria-hidden="true" style={{ cursor: "pointer" }}></i>Profile</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link eventKey="second"><i class="fa fa-google-wallet btnbackround" aria-hidden="true" style={{ cursor: "pointer" }}></i>My Wallet</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link eventKey="four"><i class="fa fa-unlock-alt btnbackround" aria-hidden="true" style={{ cursor: "pointer" }}></i>Change password</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link eventKey="five"><i class="fa fa-phone btnbackround" aria-hidden="true" style={{ cursor: "pointer" }}></i>Contact us</Nav.Link>
                              </Nav.Item>
                           </Nav>
                        </Col>
                        <Col sm={9}>
                           <Tab.Content>
                              <Tab.Pane eventKey="first">
                                 <div className="profilesetting1 d-sm-inline-flex justify-content-between align-items_between w-100">
                                    <h4 className="title m-0">Profile</h4>
                                    {/* <a class="custom_btn m-0" href="/bookactivity">Edit</a> */}
                                    <Button variant="primary adrsbtn" onClick={() => setEditProfile(true)}>
                                       Edit
                                    </Button>
                                 </div>
                                 <hr>
                                 </hr>
                                 <Row className="mb-4">
                                    <Col md={3}>
                                       <div className="me-3 text-center">
                                          <img src={profile && profile ? profile.image : jetskiing_img} alt="" />
                                       </div>
                                    </Col>
                                    <Col md={9}>
                                       <div>
                                          <h4 className="title">{profile && profile ? profile.first_name + profile.last_name : ""}</h4>
                                          <p className="location1"><i class="fa fa-envelope me-1" aria-hidden="true"></i>{profile && profile ? profile.email : ""} </p>
                                          <p className="location1"><i class="fa fa-phone me-1 mt-1" aria-hidden="true"></i> {profile && profile ? profile.mobile_no : ""}</p>
                                          <hr>
                                          </hr>
                                          <Row>
                                             <Col md={9}>
                                                <div className="box1_detail mt-3">
                                                   <h6>Profile Completion Level</h6>
                                                   <ProgressBar variant="success" now={40} />
                                                </div>
                                             </Col>
                                             <Col md={3} className="d-flex align-items-end justify-content-end">
                                                <h6 className="m-0">Intermediate</h6>
                                             </Col>
                                          </Row>
                                          <hr>
                                          </hr>
                                          <Row>
                                             <Col md={9}>
                                                <div className="adressss">
                                                   <h6>Address</h6>
                                                   <div className="adressss d-flex">
                                                      <p>
                                                         <i class="fa fa-map-marker me-1 mt-1" aria-hidden="true"></i> {profile && profile ? profile.address : ""}
                                                      </p>
                                                   </div>
                                                </div>
                                             </Col>
                                             <Col md={3} className="d-sm-inline-flex align-items-center justify-content-end">
                                                {/* <Button variant="primary adrsbtn" onClick={() => setShow(true)}>Change</Button> */}
                                             </Col>
                                          </Row>
                                          <hr>
                                          </hr>
                                          <Row>
                                             <Col md={9}>
                                                <div className="adressss2">
                                                   <h6>Adventure Experience</h6>
                                                   <div className="adressss">
                                                      <p>
                                                         <span className="Activitythat"> Activity that you link - </span>Paragliding, Rafting, Cycling
                                                      </p>
                                                      <p>
                                                         <span className="Activitythat"> Adventure Level - </span>Intermediate (7)
                                                      </p>
                                                   </div>
                                                </div>
                                             </Col>
                                             <Col md={3} className="d-sm-inline-flex align-items-center justify-content-end">


                                                <Button variant="primary adrsbtn" onClick={() => setShow2(true)}>
                                                   Edit
                                                </Button>
                                             </Col>
                                          </Row>
                                       </div>
                                    </Col>
                                 </Row>
                              </Tab.Pane>




                              <Tab.Pane eventKey="second">
                                 <div className="profilesetting1 d-flex justify-content-between">
                                    <h4 className="title">My Wallet</h4>
                                 </div>
                                 <hr>
                                 </hr>
                                 <div className="profilesetting d-sm-inline-flex justify-content-between align-items-center">
                                    <h4 className="title">$100.75 <br></br> <span className="CurrentBalance">Current RAB Wallet Balance</span> </h4>
                                    <div>
                                       <Button variant="primary adrsbtn" onClick={() => setShow1(true)}>
                                          Add Money
                                       </Button>
                                    </div>
                                 </div>
                                 <hr>
                                 </hr>
                                 <div>
                                    <div className="page_title d-flex justify-content-between align-items-center mt-5">
                                       <h6>All Transaction Details</h6>
                                    </div>
                                    <div className="">
                                       <Table responsive="sm" className="custom-table">
                                          <thead>
                                             <tr className="iddate">
                                                <th>ID</th>
                                                <th className="px-5">Date</th>
                                                <th> Method</th>
                                                <th> Amount</th>
                                                <th>Status</th>
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <td>DG3452</td>
                                                <td>10/01/2022, 10:00 AM</td>
                                                <td>Bank</td>
                                                <td>$30</td>
                                                <td>Pending</td>
                                             </tr>
                                             <tr>
                                                <td>DG3452</td>
                                                <td>10/01/2022, 10:00 AM</td>
                                                <td>Bank</td>
                                                <td>$30</td>
                                                <td>Pending</td>
                                             </tr>
                                             <tr>
                                                <td>DG3452</td>
                                                <td>10/01/2022, 10:00 AM</td>
                                                <td>Bank</td>
                                                <td>$30</td>
                                                <td>Pending</td>
                                             </tr>
                                          </tbody>
                                       </Table>
                                    </div>
                                 </div>
                              </Tab.Pane>
                              {/* <Tab.Pane eventKey="third">
                        sdfcade
                     </Tab.Pane> */}
                              <Tab.Pane eventKey="four">
                                 <div className="profilesetting1 d-flex justify-content-between">
                                    <h4 className="title">Change Password</h4>
                                 </div>
                                 <hr>
                                 </hr>
                                 <div className="mainfile">
                                    <div className="formcolr1">
                                       <Form>
                                          <Row>
                                             <Col lg={12} md={12} sm={12}>
                                                <div className="editform">
                                                   <Form.Label className="form-label">Old Password</Form.Label>
                                                   <Form.Control type="text" className="cus" name="old_password" value={form.old_password} onChange={(ev) => setForm({ ...form, old_password: ev.target.value })} placeholder="Enter Old Password" />
                                                   {validation.oldpassword_err && validation.oldpassword_err ? <><span className="text-danger">{validation.oldpassword_err}</span></> : ""}
                                                </div>
                                             </Col>
                                             <Col lg={12} md={12} sm={12}>
                                                <div className="editform">
                                                   <Form.Label className="form-label">New Password</Form.Label>
                                                   <Form.Control type="text" className="cus" name="new_password" value={form.new_password} onChange={(ev) => setForm({ ...form, new_password: ev.target.value })} placeholder="Enter New Password" />
                                                   {validation.password_err && validation.password_err ? <><span className="text-danger">{validation.password_err}</span></> : ""}
                                                </div>
                                             </Col>
                                             <Col lg={12} md={12} sm={12}>
                                                <div className="editform">
                                                   <Form.Label className="form-label">Confirm Password</Form.Label>
                                                   <Form.Control type="text" className="cus" name="confirm_new_password" value={form.confirm_new_password} onChange={(ev) => setForm({ ...form, confirm_new_password: ev.target.value })} placeholder="Enter Confirm Password" />
                                                   {validation.c_password_err && validation.c_password_err ? <><span className="text-danger">{validation.c_password_err}</span></> : ""}
                                                </div>
                                                {validation.message_err && validation.message_err ? <><span className="text-danger">{validation.message_err}</span></> : ""}
                                             </Col>
                                             <Row>
                                                <Col lg={12} md={4} sm={12} >
                                                   <div class="addbutt2 mt-4 text-center">
                                                      {/* <Link to="/searchlist" className="custom_btn"> */}
                                                      {/* Submit</Link> */}
                                                      <Button type="button" className="custom_btn" onClick={() => handleLogin()}>Submit</Button>
                                                   </div>
                                                </Col>
                                             </Row>
                                          </Row>
                                       </Form>
                                    </div>
                                 </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="five">
                                 <div className="profilesetting1 d-flex justify-content-between">
                                    <h4 className="title">Contact Us</h4>
                                 </div>
                                 <hr>
                                 </hr>
                                 <div className="mainfile">
                                    <div className="formcolr1">
                                       <Form>
                                          <Row>
                                             <Col lg={12} md={12} sm={12}>
                                                <div className="editform">
                                                   <Form.Label className="form-label">Email Address</Form.Label>
                                                   <Form.Control className="cus" type="text" name="email" value={profile && profile ? profile.email : ""} placeholder="Enter Email Address" readOnly />
                                                </div>
                                             </Col>
                                             <Col lg={12} md={12} sm={12}>
                                                <div className="editform">
                                                   <Form.Label className="form-label">Mobile Number</Form.Label>
                                                   <Form.Control className="cus" type="text" name="mobile_no" value={profile && profile ? profile.mobile_no : ""} placeholder="Enter Subject" readOnly />
                                                </div>
                                             </Col>
                                             <Col lg={12} md={12} sm={12}>
                                                <div className="editform">
                                                   <Form.Label className="form-label">Message</Form.Label>
                                                   {/* <Form.Control className="cus" type="text" name="message" onChange={(ev) => setContactForm({ ...contactform, message: ev.target.value })} placeholder="Enter Message" /> */}
                                                   <div class="form-group">
                                                      <CKEditor
                                                         editor={ClassicEditor}
                                                         data={contactform.message}
                                                         onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            handleChange(data);
                                                         }}
                                                         onReady={editor => {
                                                            // You can store the "editor" and use when it is needed.
                                                            // console.log('Editor is ready to use!', editor);
                                                         }}
                                                         onBlur={(event, editor) => {
                                                            // console.log('Blur.', editor);
                                                         }}
                                                         onFocus={(event, editor) => {
                                                            // console.log('Focus.', editor);
                                                         }}
                                                      />
                                                   </div>
                                                </div>
                                             </Col>
                                             <Row>
                                                <Col lg={12} md={4} sm={12} >
                                                   <div class="addbutt2 mt-4 text-center">

                                                      <Button type="button" className="custom_btn" onClick={() => handleContactForm()}>Submit</Button>
                                                   </div>
                                                </Col>
                                             </Row>
                                          </Row>
                                       </Form>
                                    </div>
                                 </div>
                              </Tab.Pane>
                           </Tab.Content>
                        </Col>
                     </Row>
                  </Tab.Container>
               </div>
            </div>
         </div>
      </div>

      <Modal show={editprofile} onHide={() => setEditProfile(false)} size="lg">
         <Modal.Header closeButton >
         </Modal.Header>
         <div className="text-center text-white">
            <h4>Edit Profile</h4>
         </div>
         <Modal.Body>
            <div className="mainfile">
               <div className="formcolr2">
                  <Form>
                     <Row>
                        <Col lg={12} md={12} sm={12}>
                           <div className="editformimg">
                              <img src={profile.profile_logo && profile.profile_logo.preview ? profile.profile_logo.preview.url : profile.image} alt="" />

                              <div class="custom-file" >
                                 <Files
                                    className='cus'
                                    onChange={onFilesChange}
                                    onError={onFilesError}
                                    accepts={['image/*']}
                                    multiple={false}
                                    maxFileSize={10000000}
                                    minFileSize={0}
                                    clickable
                                    style={{ cursor: "pointer" }}
                                    required
                                 >
                                    {profile.profile_image ? <button type="button" className="custom_btn">Change profile picture</button> : <button type="button" className="custom_btn">update profile picture</button>}
                                 </Files>
                              </div>
                           </div>
                        </Col>

                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">First Name</Form.Label>
                              <Form.Control className="cus" type="text" name="first_name" value={profile.first_name} onChange={(ev) => setProfile({ ...profile, first_name: ev.target.value })} placeholder="Enter First Name" />
                              {error && error.first_name ? <><span className="text-danger">{error.first_name}</span></> : ""}
                           </div>

                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Last Name</Form.Label>
                              <Form.Control className="cus" type="text" name="last_name" value={profile.last_name} onChange={(ev) => setProfile({ ...profile, last_name: ev.target.value })} placeholder="Enter Last Name" />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Mobile Number</Form.Label>
                              {/* <Form.Control className="cus" type="text" name="mobile_no" value={profile.mobile_no} onChange={(ev) => setProfile({ ...profile, mobile_no: ev.target.value })} placeholder="Enter Mobile Number" required /> */}
                              <ReactIntlTelInput
                                 // inputProps={inputProps}
                                 // intlTelOpts={intlTelOpts}
                                 value={mobile}
                                 onChange={handleMob}
                                 // onReady={onReady}
                              />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Gender</Form.Label>
                              <Form.Select className="cus" id="gender" value={profile.gender} onChange={(ev) => setProfile({ ...profile, gender: ev.target.value })} name="gender" required>
                                 <option>Select</option>
                                 <option>Male</option>
                                 <option>Female</option>
                              </Form.Select>
                              {error && error.gender ? <><span className="text-danger">{error.gender}</span></> : ""}
                           </div>

                        </Col>

                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Date of Birth</Form.Label>
                              <Form.Control className="cus" type="date" name="dob" value={profile.dob} placeholder="Enter DOB" />
                              {error && error.dob ? <><span className="text-danger">{error.dob}</span></> : ""}
                           </div>

                        </Col>

                        <Row>
                           <Col lg={12} md={4} sm={12} >
                              <div class="addbutt2 mt-4 text-center">
                                 <Button type="button" className="custom_btn" onClick={() => handleSubmint()}>Submit</Button>
                                 {/* <Link to="/searchlist" className="custom_btn"> */}
                                 {/* Submit</Link> */}
                              </div>
                           </Col>
                        </Row>
                     </Row>
                  </Form>
               </div>
            </div>
         </Modal.Body>
      </Modal>


      <Modal show={show} onHide={() => setShow(false)} size="lg">
         <Modal.Header closeButton >
         </Modal.Header>
         <div className="text-center text-white">
            <h4>Add Address</h4>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when .</p>
         </div>
         <Modal.Body>
            <div className="mainfile">
               <div className="formcolr2">
                  <Form>
                     <Row>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Address1</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter House no/Flat No" />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Address2</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter Land Mark" />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">City</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter City" />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">State</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter State" />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Country</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter Country" />
                           </div>
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Pin code</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter Pin code" />
                           </div>
                        </Col>
                        <Row>
                           <Col lg={12} md={4} sm={12} >
                              <div class="addbutt2 mt-4 text-center">
                                 <Link to="/searchlist" className="custom_btn">
                                    Submit</Link>
                              </div>
                           </Col>
                        </Row>
                     </Row>
                  </Form>
               </div>
            </div>
         </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={() => setShow1(false)} >
         <Modal.Header closeButton >
         </Modal.Header>
         <div className="text-center text-white">
            <h4>Add Money</h4>
            <p>It is a long established fact that a reader will be
               distracted by the readable content.</p>
         </div>
         <Modal.Body>
            <div className="mainfile">
               <div className="formcolr3">
                  <Form>
                     <Row>
                        <Col lg={12} md={12} sm={12}>
                           <div className="editform">
                              <Form.Label className="form-label">Amount</Form.Label>
                              <Form.Control className="cus" type="text" placeholder="Enter Amount" />
                           </div>
                        </Col>


                        <Row>
                           <Col lg={12} md={4} sm={12} >
                              <div class="addbutt2 mt-4 text-center">
                                 <Link to="/searchlist" className="custom_btn">
                                    Submit</Link>
                              </div>
                           </Col>
                        </Row>
                     </Row>
                  </Form>
               </div>
            </div>
         </Modal.Body>
      </Modal>

      <Modal show={show2} onHide={() => setShow2(false)} size="lg">
         <Modal.Header closeButton >
         </Modal.Header>
         <div className="text-center text-white">
            <h4>Select Any 3 Activities That You Like</h4>
            <p>It is a established fact that a reader will distracted.</p>
         </div>
         <Modal.Body>
            <div className="mainfile">
               <div className="formcolr3">
                  <div className="selectbox text-white text-center">
                     <ul>
                        {interestCategory && interestCategory.map((op, index) => (
                           <li onClick={() => handleChangeCategory(op.id)} style={interest.findIndex(o => o == op.id)!=-1 ? {cursor:"pointer", backgroundColor: "#E52346", color: "#fff" } : {cursor:"pointer", backgroundColor: "#202026", color: "#fff"  }} >{op.title}</li>
                        ))}
                        <br />
                        {interesterr && interesterr ? <><span className="text-danger">{interesterr}</span></> : ""}
                     </ul>
                  </div>
                  <hr></hr>
                  <div className="selectbox text-white text-center">
                     <h4>Select Any 3 Activities That You Like</h4>
                     <p>It is a established fact that a reader will distracted.</p>
                     <ul className="mt-3">
                        {levelCategory && levelCategory.map((op) => (
                           <li onClick={() => levelhandleChange(op)} style={level == op ? {cursor:"pointer", backgroundColor: "#E52346", color: "#fff" } : { backgroundColor: "#202026",cursor:"pointer" }} > {op == 1 ? "Beginner" : op == 2 ? "Intermediate" : op == 3 ? "Advanced" : ""} </li>
                        ))}
                        <br />
                        {levelerr && levelerr ? <><span className="text-danger">{levelerr}</span></> : ""}
                     </ul>
                  </div>
                  <Row>
                     <Col lg={12} md={4} sm={12} >
                        <div class="addbutt2 mt-4 text-center">
                           <button type="button" className="custom_btn" onClick={() => handleSubmit()}>Submit</button>
                           {/* <Link to="/ " className="custom_btn">
                              Submit</Link> */}
                        </div>
                     </Col>
                  </Row>
               </div>
            </div>
         </Modal.Body>
      </Modal>


      <Modal show={otpVerify} onHide={() => setOtpVerify(false)} >
         <Modal.Header closeButton >
         </Modal.Header>
         <div className="text-center text-white">
            <h1><center>Verify OTP</center></h1>
         </div>
         <Modal.Body>
            <div className="mainfile">
               <div className="formcolr3">
                  <Form>
                     <Row>
                        <Col lg={12} md={12} sm={12}>
                           <div className="editform">
                              <Form.Label>OTP Number</Form.Label>
                              <Form.Control type="text" placeholder="Enter Code" id="otp" name="otp" maxLength={4} value={otp} onChange={(ev) => setOtp(ev.target.value)} />
                           </div>
                        </Col>
                        <Row>
                           <Col lg={12} md={4} sm={12} >
                              <div class="addbutt2 mt-4 text-center">
                                 <Button type="button" className="custom_btn" onClick={() => handleChangeOtp()}>Submit</Button>
                              </div>
                           </Col>
                        </Row>
                     </Row>
                  </Form>
               </div>
            </div>
         </Modal.Body>
      </Modal>
      <Footer />
   </>)
}
export default Settings;