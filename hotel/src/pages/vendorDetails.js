import React, { useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/css/style.css';
import driverImage_img from '../assets/images/driverImage.jpg';
import CustomerImage_img from '../assets/images/CustomerImage.jpg';



function VendorDetails() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>


        <div>
            <Breadcrumb>
                <Link className="breadcrumb_link" to="/myActivity">My Bookings /</Link>
                <Link className="breadcrumb_link active" to="/activitydetails">Details</Link>
            </Breadcrumb>


            <div class="pb-5">
                <Container fluid>
                    <Row className="mb-4">
                        <div className="activity_details d-flex align-items-center">
                            <div className="me-3">
                                <img src={driverImage_img} alt="" />
                            </div>

                            <div>
                                <h4 className="title">Mark Smith (Taxi Driver)</h4>
                                <p className="location1"><i class="fa fa-envelope me-2" aria-hidden="true"></i>shivbhatiabca01@gmail.com</p>
                                <p className="location1"><i class="fa fa-phone me-2" aria-hidden="true"></i> 98827-61105</p>
                                
                            </div>

                            <div className="ms-auto" >
                                <div class="venderdetailsdoller1 text-white">
                                    <p>Amount Paid</p>
                                    <h2 className="text-center">$200.00</h2>

                                </div>

                            </div>
                        </div>
                    </Row >
                    <hr />
                    <Row>
                        <Col md={12}>
                            <ul className="info_list2">
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Vehicle</h5>
                                        <p>Honda City</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Registration No</h5>
                                        <p>CH-04-3242</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking Date</h5>
                                        <p>10/01/2023</p>
                                    </div>
                                </li>
                               
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Status</h5>
                                        <p>Pending</p>
                                    </div>
                                </li>
                              
                            </ul>


                            <hr />

                        </Col>

                    </Row>
                    <Row>
                    <Col md={6}>
                        <div className="venderdetails3 text-white mt-2">
                            
                            <div className="my-2">
                            <h6> <span className="green"></span> Pickup Location</h6>
                                <p> <span class="me-2"><i class="fa fa-map-marker" aria-hidden="true"></i>
                                </span>Vpo Paisa Teh Dehra HImachal Pradesh 117101</p>
                            </div>
                           
                            <div className="my-2 mt-4">
                            <h6> <span className="red"></span>Drop Location</h6>
                                <p> <span class="me-2"><i class="fa fa-map-marker" aria-hidden="true"></i>
                                </span>Vpo Paisa Teh Dehra HImachal Pradesh 117101</p>
                            </div>
                           
                        </div>
                    </Col>
                    <Col md={1}>
                        <div className="venderdetailsimgs1 mt-2">
                        <img src={CustomerImage_img} alt="" />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="venderdetails2 text-white mt-2">
                            <h6>Mark Smith (Customer)</h6>
                            <div className="my-2">
                                <p> <span class="me-2"><i class="fa fa-phone" aria-hidden="true"></i>
                                </span>9876543210, 8979765435</p>
                            </div>
                           
                        </div>
                    </Col>
                    
                 
                </Row>
                </Container>
            </div>

            <Modal show={show} onHide={handleClose} className="custom_model">
                <Modal.Header closeButton>
                    <Modal.Title>Add Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    </>)
}
export default VendorDetails;