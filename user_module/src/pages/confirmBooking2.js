import React, { Component } from "react";
import { Container, Nav, Tab, Row, Col, Form, Table, ProgressBar, Button } from "react-bootstrap";
import '../assets/css/style.css'
import hondaCar_img from '../assets/images/hondaCar.png';
import user_img from '../assets/images/user.jpg';

class ConfirmBooking2 extends Component {

    render() {

        return (<>

            <div className="searchtaxibanner1">
                <div className="container-fluid">
                    <Row >
                        <Col className="p-0" lg={7} md={12} sm={12}>
                            <div className="searchlistcar d-sm-inline-flex">
                                <div className="searchlistcar1">
                                    <img src={hondaCar_img} alt="" />
                                </div>
                                <div className="searchlistdata">
                                    <h3>Manali - Solang valley</h3>
                                    <div className="d-flex justify-content-between align-items-center ms-5;">

                                        <div className="ps-4">
                                            <div className="my-2">
                                                <p> <span class=" red me-2">
                                                </span>Vpo Paisa Teh Dehra HImachal Pradesh 117101</p>
                                            </div>

                                            <div className="my-2 mt-4">
                                                <p> <span class=" green me-2">
                                                </span>Vpo Paisa Teh Dehra HImachal Pradesh 117101</p>

                                            </div>
                                        </div>
                                        <div className="dollar01">
                                            <h1>
                                                $70</h1></div>
                                    </div>
                                    <hr></hr>
                                    <h5>Booking Details</h5>
                                    <div className="searchlistbooking d-flex">

                                        <div className="serachcardetails">
                                            <p>Car</p>
                                            <p>Date</p>
                                            <p>Booking ID</p>
                                        </div>
                                        <div className="serachcardetails">
                                            <p>Honda City</p>
                                            <p>22-10-2021</p>
                                            <p>#73456</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <Row>
                                        <Col md={3}>
                                            <div className="venderdetailsimgs1 mt-2">
                                                <img src={user_img} alt="" />
                                            </div>
                                        </Col>
                                        <Col md={6} className="d-flex align-items-center">
                                            <div className="venderdetails2 text-white mt-2">
                                                <h6>Mark Smith (Customer)</h6>
                                                <div className="my-2">
                                                    <p> <span class="me-2"><i class="fa fa-phone" aria-hidden="true"></i>
                                                    </span>9876543210</p>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>


                                </div>
                            </div>

                        </Col>

                        <Col md={5}>
                            <div className="mapimg">
                                <div className="mt-2">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="500" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>

            </div>



        </>)
    }


}
export default ConfirmBooking2;