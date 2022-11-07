import React, { Component, useState } from "react";
import { Breadcrumb, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
// import 'react-intl-tel-input/dist/main.css';
import 'intl-tel-input/build/css/intlTelInput.css';

function BookActivity() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [mobile, setMobile] = useState({iso2: '', dialCode: '', phone: ''})
  const [levelCategory, setLevelCategory] = useState(["8:00 am - 9:00 am", "9:00 am - 10:00 am", "10:00 am - 11:00 am", "11:00 am - 12:00 pm", "12:00 pm - 1:00 pm"])
  const [level, setLevel] = useState()
  const [levelerr, setLevelerr] = useState()
  const levelhandleChange = (op) => {
    setLevel(op)
  }
  const handleMob= (event) =>{
    setMobile({ ...mobile, phone: event.phone, iso2: event.iso2, dialCode: event.dialCode })
 }
  return (<>
    <div className="p-5">
      <Breadcrumb>
        <Link className="breadcrumb_link" to="/mybookings">My Bookings /</Link>
        {/* <Link className="breadcrumb_link" to="/activitydetails">Booking Details /</Link> */}
        <Link className="breadcrumb_link active" to="/bookactivity">Book Now</Link>
      </Breadcrumb>
      <div className="mainfile">
        <div className="formcolr">
          <Form>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">First Name</Form.Label>
                  <Form.Control className="cus" type="text" name="first_name" placeholder="Enter First Name" />
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Last Name</Form.Label>
                  <Form.Control className="cus" type="text" name="last_name" placeholder="Enter Last name" />
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control className="cus" type="text" placeholder="Enter Email" />
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                {/* <div className="editform"> */}
                <Form.Group className="my-2">
                  <Form.Label className="form-label">Mobile Number</Form.Label>
                    <ReactIntlTelInput
                      className="mob"
                      pattern="[0-9]*"
                      style={{width: "54%"}}
                      value={mobile}
                      onChange={handleMob}
                  />
                  {/* <Form.Label className="form-label">Phone Number</Form.Label>
                  <Form.Control className="cus" type="text" placeholder="Enter Phone Number" /> */}
                {/* </div> */}
                </Form.Group>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select id="gender" name="gender" required>
                    <option hidden>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" placeholder="Enter DOB" id="dob" name="dob" />
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Number of People</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option selected>1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                  </Form.Select>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Select Date</Form.Label>
                  <Form.Control className="cus datepick" type="date" placeholder="dd/mm/yy" />
                </div>
              </Col>
              <Col lg={12} md={12} sm={12}>
                <div className="editform"> <Form.Label className="form-label">10 Slots Available (21/Jan/2021)</Form.Label>
                  <ul className="d-sm-inline-flex mt-2 w-100">
                    {levelCategory && levelCategory.map((op) => (
                      <li className="timeslots" onClick={() => levelhandleChange(op)} style={level == op ? { cursor: "pointer", backgroundColor: "#E52346", color: "#fff" } : {}} > {op} </li>
                    ))}
                    <br />
                    {levelerr && levelerr ? <><span className="text-danger">{levelerr}</span></> : ""}
                  </ul>
                </div>
              </Col>
              <hr className="text-white" />
              <Col md={6} sm={12}>
                <h6 class="meefont text-white bfont">Add Ons</h6>
                <ul className="addons_label">
                  <li className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`}>
                          <Form.Check
                            type={type}
                            id={`shoes-${type}`}
                            label="Shoes"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="editform">
                        <Form.Control className="cus" type="number" placeholder="1" />
                      </div>
                    </div>
                    <div>
                      <p>10</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      {['checkbox'].map((type) => (
                        <div key={`default-${type}`}>
                          <Form.Check
                            type={type}
                            id={`shoes-${type}`}
                            label="Knee Guard"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="editform">
                        <Form.Control className="cus" type="number" placeholder="1" />
                      </div>
                    </div>
                    <div> 
                      <p>10</p>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
            <hr className="text-white" />
            <Row>
              <Col lg={2} md={4} >
                <div className="addbutt mb-2">
                  {/* <Link className="custom_btn" to="/">Submit</Link> */}
                  <Button variant="primary" className="custom_btn">Submit</Button>
                </div>
              </Col>
            </Row>
            {/* <Button variant="primary" className="custom_btn" onClick={handleShow}>Add More</Button> */}
          </Form>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="custom_model" size="sm">
        <Modal.Body className="p-4 text-center">
          <p>Payment link has been send to the registered phone number</p>
          <Button variant="secondary" onClick={handleClose} className="custom_btn">Okay</Button>
        </Modal.Body>
      </Modal>
    </div>
  </>)
}

export default BookActivity;