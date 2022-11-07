import React, { useState  } from "react";
import {Breadcrumb,Container,Row,Col,Form,Button,Modal} from "react-bootstrap";
import {Link } from "react-router-dom";
import '../assets/css/style.css';

function AvailableSlots() {

    return(<>
    
        <div>
        <Breadcrumb>
            <Link className="breadcrumb_link" to="/myActivity">My Activity /</Link>
            <Link className="breadcrumb_link" to="/activitydetails">Activity Details /</Link>
            <Link className="breadcrumb_link active" to="/availableslots">Availability Details</Link>
        </Breadcrumb>

        <div className="pb-5">
            <Container fluid>
                <Row>
                    <Col md={6}>
                    <div className="mainfile">
                        <div className="formcolr">

                            <Row className="mb-1">
                                <Col>
                                <div className="editform">
                                    <Form.Label className="form-label">Select Date</Form.Label>
                                    <Form.Control className="cus datepick" type="date" placeholder="dd/mm/yy" />
                                </div>
                                </Col>
                            </Row>
                            <h6 className="meefont text-white bfont">10 Slots Available (21/Jan/2021)</h6>
                            <Row className="mb-3">
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Time</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10:00 AM" />
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Max Capacity</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Time</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10:00 AM" />
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Max Capacity</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Time</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10:00 AM" />
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Max Capacity</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Time</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10:00 AM" />
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Max Capacity</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10" />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Time</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10:00 AM" />
                                    </div>
                                </Col>
                                <Col md={6} sm={12}>
                                    <div className="editform">
                                    <Form.Label className="form-label">Max Capacity</Form.Label>
                                    <Form.Control className="cus" type="text" placeholder="10" />
                                    </div>
                                </Col>
                            </Row>
                          
                            <Row>
                            <Col md={12} >
                                <div className="addbutt text-center mb-2">
                                    <Button variant="secondary" className="custom_btn">Update</Button>
                                </div>
                            </Col>
                            </Row>
                        </div>
                        </div>
                    </Col>
                </Row>
           
           
            </Container>
        </div>

        
            
        </div>
      
    </>)
  }
export default AvailableSlots;