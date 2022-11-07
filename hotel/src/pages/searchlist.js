import React, { useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/css/style.css';
import hondaCar_img from '../assets/images/hondaCar.png';



function Searchlist() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (<>


        <div> 
            <Breadcrumb>
                <Link className="breadcrumb_link" to="/myActivity">Taxi Booking /</Link>
                <Link className="breadcrumb_link" to="/activitydetails">New Taxi Book</Link>
                <Link className="breadcrumb_link active" to="/activitydetails">Search Result</Link>
            </Breadcrumb>


            <div>
                <Container>
                    <div className="page_title d-flex justify-content-between align-items-center">
                        <h5>Search Result</h5>
                    </div>
                    <hr className="text-white" />
                    <div className="mt-2 text-white">
                        <Row>
                            <Col lg={5} md={12} sm={12}>
                                <div className="sidespac">
                                    <h5>20 Result Found</h5>
                                    <ul className="backcoboo p-0">
                                    <li>
                                            <div className="d-flex align-items-center">
                                                <div className="searchlist1">
                                                <img src={hondaCar_img} alt="" />
                                                </div>
                                                <div className="ps-2 pe-2">
                                                    <h6>Honda City</h6>
                                                    <p>10-15 min away</p>
                                                </div>
                                                <div className=" px-4">
                                                    <h5>$70.00</h5>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <div className="searchlist1">
                                                <img src={hondaCar_img} alt="" />
                                                </div>
                                                <div className="ps-2 pe-2">
                                                    <h6>Honda City</h6>
                                                    <p>10-15 min away</p>
                                                </div>
                                                <div className=" px-4">
                                                    <h5>$70.00</h5>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <div className="searchlist1">
                                                <img src={hondaCar_img} alt="" />
                                                </div>
                                                <div className="ps-2 pe-2">
                                                    <h6>Honda City</h6>
                                                    <p>10-15 min away</p>
                                                </div>
                                                <div className=" px-4">
                                                    <h5>$70.00</h5>
                                                </div>
                                            </div>
                                        </li>
                                      
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={7} md={12} sm={12}>
                                <div className="searchlistcar d-flex">
                                <div className="searchlistcar1">
                                <img src={hondaCar_img} alt="" />
                                </div>
                                <div className="searchlistdata ms-5">

                            <div className="my-2">
                            <p> <span class=" red me-2">
                                </span>Vpo Paisa Teh Dehra HImachal Pradesh 117101</p>
                                
                            </div>
                           
                            <div className="my-2 mt-4">
                            <p> <span class=" green me-2">
                                </span>Vpo Paisa Teh Dehra HImachal Pradesh 117101</p>
                                
                            </div>
                            <hr></hr>
                            < h5>Booking Details</h5>
                            <div className="searchlistbooking d-flex">
                              
                               <div className="serachcardetails">
                                   <p>Car</p>
                                   <p>Date</p>
                                   <p>Fare</p>
                               </div>
                               <div className="serachcardetails">
                                   <p>Honda City</p>
                                   <p>22-10-2021</p>
                                   <p>$210</p>
                               </div>
                            </div>
                            <hr></hr>
                            <div class="addbutt1 mt-4">
                   
                            <Link to="/taxibooking" className="custom_btn">Book Now</Link>


                  </div>

                                </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>


            </div>

            

        </div>

    </>)
}
export default Searchlist;