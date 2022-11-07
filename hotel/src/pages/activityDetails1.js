import React, { useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/css/style.css';
import bike_img from '../assets/images/bike.png';
import CustomerImage_img from '../assets/images/CustomerImage.jpg';
import jetskiing_img from '../assets/images/jetskiing.png';



function ActivityDetails1() {

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
                        <div className="activity1_details d-md-inline-flex d-sm-inline-flex align-items-center text-white">
                            <div className="me-3 text-center">
                            <img src={jetskiing_img} alt="" />
                            </div>

                            <div>
                                <h4 className="title">Jet Skiing</h4>
                                <div className="rating d-flex align-items-center">
                                    <p className="ratingstar">4.5<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    <p className="ms-1 reviews">(546 Reviews)</p>
                                </div>
                                <p className="location1"><i class="fa fa-map-marker me-1" aria-hidden="true"></i> 1st Block, Rammurthy nagar, Bangalore, 6472</p>
                                <div className="box_detail mt-3">
                                    <h5>Highlights</h5>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking  at its layout.</p>
                                </div>
                            </div>

                            <div >
                                <div class="venderdetailsdoller1 text-white my-3">
                                    <p>Booked Amount</p>
                                    <h2 className="">$2070.00</h2>

                                </div>

                            </div>
                        </div>
                    </Row >
                    <hr />
                    <Row>
                        <Col md={12}>
                            <ul className="info_list1 p-0">
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking Id</h5>
                                        <p>F1234</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Activity</h5>
                                        <p>Jet Skiing</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking Date</h5>
                                        <p>05/Jan/2023</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Slot</h5>
                                        <p>10:00 am - 11:00 am</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Payment</h5>
                                        <p>Recieved</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Status</h5>
                                        <p>In-Progress</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>No of people</h5>
                                        <p>4</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Add-on</h5>
                                        <p>Shoes, Knee guard</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Price</h5>
                                        <p>Yes</p>
                                    </div>
                                </li>
                               

                            </ul>

                            <hr />
                            <div className="Adventurekingvendor mt-4 text-white">
                            <h4>Adventure king <span class="vendorsize">(Vendor)</span></h4>
                            <div className="detailscategory2">
                                <p> <span class="me-2"><i class="fa fa-envelope" aria-hidden="true"></i>
                                    </span>peterparker@gmail.com</p>
                            </div>
                            <div className="detailscategory2">
                                <p> <span class="me-2"><i class="fa fa-phone" aria-hidden="true"></i>
                                    </span>9876543210, 8979765435</p>
                            </div>
                            <div className="detailscategory2">
                                <p> <span class="me-2"><i class="fa fa-file-text" aria-hidden="true"></i>
                                        </span>Activity</p>
                            </div>
                            <div className="detailscategory2">
                                <p> <span class="me-2"><i class="fa fa-map-marker" aria-hidden="true"></i>
                                    </span>1st Block, Rammurthy nagar, Bangalore</p>
                            </div>
                        </div>

                            <div className="box_detail1 mt-3 text-white">
                                <h5>Itinerary</h5>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>

                            <hr />

                        </Col>

                    </Row>
                    <Row>
                    <Col md={1}>
                        <div className="venderdetailsimgs1 mt-2">
                        <img src={CustomerImage_img} alt="" />
                        </div>
                    </Col>
                    <Col md={6}>
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
export default ActivityDetails1;