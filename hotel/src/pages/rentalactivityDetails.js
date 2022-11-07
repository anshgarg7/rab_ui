import React, { useState  } from "react";
import {Breadcrumb,Container,Row,Col,Form,Button,Modal} from "react-bootstrap";
import {Link } from "react-router-dom";
import '../assets/css/style.css';

import bike_img from '../assets/images/bike.png';
import CustomerImage_img from '../assets/images/CustomerImage.jpg';



function  ActivityDetails() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(<>
    

        <div>
        <Breadcrumb>
        <Link className="breadcrumb_link" to="/myActivity">My Bookings /</Link>
            <Link className="breadcrumb_link" to="/activitydetails">New Booking</Link>
            <Link className="breadcrumb_link" to="/myActivity">Rental/</Link>
            <Link className="breadcrumb_link active" to="/activitydetails">Details</Link>
        </Breadcrumb>


        <div class="pb-5">
            <Container fluid>
                <Row className="mb-4">
                    <div className="activity_details d-flex align-items-center">
                        <div className="me-3">
                         <img src={bike_img} alt="" />
                        </div>
                        
                        <div>
                            <h4 className="title">Jet Skiing</h4>
                            <div className="rating d-flex align-items-center">
                                <p className="ratingstar">4.5<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                <p className="ms-1 reviews">(546 Reviews)</p>
                            </div>
                            <p className="location1"><i class="fa fa-map-marker me-1" aria-hidden="true"></i> 1st Block, Rammurthy nagar, Bangalore, 6472</p>
                            
                        </div>

                        <div className="ms-auto" >
                        <div class="venderdetailsdoller1 text-white ">
                           
                            <h2 className="text-center">$70/<span className="person">day</ span> </h2>

                        </div>
                        <Link to="/bookactivity1" className="custom_btn">Book Now</Link>
                                </div>
                    </div>
                </Row >
                <hr />
                <Row>
                    <Col md={8}>
                        <ul className="info_list">
                            <li>
                                <div className="box_detail mt-3">
                                    <h5>Company</h5>
                                    <p>Royal Enfield</p>
                                </div>
                            </li>
                            <li>
                                <div className="box_detail mt-3">
                                    <h5>Model</h5>
                                    <p>Himalayan 650</p>
                                </div>
                            </li>
                            <li>
                                <div className="box_detail mt-3">
                                    <h5>Item Included</h5>
                                    <p>Helmet</p>
                                </div>
                            </li>
                            <li>
                                <div className="box_detail mt-3">
                                    <h5>Items can task along</h5>
                                    <p>Shoes, Keen guard</p>
                                </div>
                            </li>                           
                       </ul>

                        <hr />

                        <div className="box_detailadvantureKing mt-3  d-flex">
                        <img src={CustomerImage_img} alt="" />
                            <p className="ms-3">Advanture King</p>
                        </div>

                        <hr /> 

                    </Col>
                    <Col md={4}>
                        <div className="box_detail map_box">
                            <h5>Location</h5>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="90%" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                        </div>            
                    </Col>
                </Row>  
                <div className="myreferralList py-4 text-white">
                    <div className="activity1">
                        <h4 className="text-white mb-4">Other Sport</h4>
                        <Row>
                       
                        <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </div>   
                    </div>  
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
export default ActivityDetails;