import React, { Component,useState } from "react";
import {Breadcrumb,Row,Col,Form,Button,Modal} from "react-bootstrap";
import {Link  } from "react-router-dom";
import '../assets/css/style.css';

function BookActivity (){

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    return(<>
    
        <div> 
          <Breadcrumb>
              <Link className="breadcrumb_link" to="/myActivity">My Bookings /</Link>
              <Link className="breadcrumb_link" to="/activitydetails">Activity/</Link>
              <Link className="breadcrumb_link" to="/bookactivity">Details/</Link>
              <Link className="breadcrumb_link active" to="/bookactivity">Book Now</Link>
          </Breadcrumb>

          <div className="mainfile">
            <div className="formcolr">
            <Form>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Customer Name</Form.Label>
                    <Form.Control className="cus" type="text" placeholder="Enter Name" />
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Phone Number</Form.Label>
                    <Form.Control className="cus" type="text" placeholder="Enter Number" />
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
                  <div className="editform">
                    <Form.Label className="form-label">10 Slots Available (21/Jan/2021)</Form.Label>
                    <ul className="timlist mt-2">
                        <li className="timeslots">8:00 am - 9:00 am</li>
                        <li className="timeslots active">9:00 am - 10:00 am</li>
                        <li className="timeslots">10:00 am - 11:00 am</li>
                        <li className="timeslots">11:00 am - 12:00 pm</li>
                        <li className="timeslots">12:00 pm - 1:00 pm</li>
                    </ul>
                  </div>
                </Col>
                
              

                <hr className="text-white mt-2" />

                <Col md={6} sm={12}>
                  <h6 className="meefont text-white bfont">Add Ons</h6>
                  <ul className="addons_label text-white">
                    <li className="d-flex align-items-center justify-content-between mb-3 ">
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
                          <Form.Control className="cus numb" type="number" placeholder="1" />
                        </div>    
                      </div>

                      <div>
                        <p>$10</p>
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
                          <Form.Control className="cus numb" type="number" placeholder="1" />
                        </div>    
                      </div>

                      <div>
                        <p>$10</p>
                      </div>
                    </li>
                  </ul>
                
                  
                
                </Col>
              </Row>

              <hr className="text-white" />
              
              
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">First Name</Form.Label>
                    <Form.Control className="cus" type="text" placeholder="Enter First Name" />
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Last Name</Form.Label>
                    <Form.Control className="cus" type="text" placeholder="Enter First Name" />
                  </div>
                </Col>
                <Col lg={2} md={6} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Age</Form.Label>
                    <Form.Control className="cus datepick" type="date" placeholder="dd/mm/yy" />
                  </div>
                </Col>
                <Col lg={2} md={6} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Gender</Form.Label>
                    <Form.Select aria-label="Default select example">
                      <option selected>Male</option>
                      <option value="1">Female</option>
                      
                    </Form.Select>
                  </div>
                </Col>
                <Col lg={2} md={4} sm={12} >
                  <div class="addbutt mt-2">
                    {/* <Link className="custom_btn" to="/">Submit</Link> */}
                      <Button variant="primary" className="custom_btn">Add</Button>
                  </div>
                </Col>

              </Row>
              <Row>
              <Col lg={2} md={4} sm={12} >
                  <div class="addbutt my-3">
                    
                    <Link to="/activityDetails1" className="custom_btn ">Book Now</Link>
                  </div>
                </Col>
              </Row>

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