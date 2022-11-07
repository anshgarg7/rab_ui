import React from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import '../../assets/css/style.css';
import vist_img from '../../assets/images/vist.png';
import award_img from '../../assets/images/award.png';
const CustmorSupport = () =>{


    return( <div>
        <Container fluid>
            <Row>
                <Col md={5}>
                    <div className="mainfile mt-3">
                        <div className="formcolr">
                            <h6 className="meefont text-white bfont">Customer Support</h6>
                            <Row className="mb-3">
                                <Col lg={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Email Address</Form.Label>
                                        <Form.Control className="cus" type="taext" placeholder="Enter Email" />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Message</Form.Label>
                                        <Form.Control as="textarea" placeholder="Enter Message" style={{ height: '100px' }} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} >
                                    <div className="addbutt text-center mb-2">
                                        <Button variant="secondary" className="custom_btn">Submit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>)
}
export default CustmorSupport;