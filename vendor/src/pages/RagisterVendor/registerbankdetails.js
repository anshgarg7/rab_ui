import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import user_profile from '../../assets/images/dummy_profile.png';


class Vendorregisterbankdetails extends Component {

  render() {

    return (<>   
        <div className="register_form bg_dark_black">
        <Row className="m-0">
                <Col lg={3} md={12}>
            <div className="">
                <div className="right_bg_img">
                    <img src={register_bg} />
                </div>
            </div>
            </Col>
            <Col lg={9} md={12}>

            <div className=" p-2 d-flex align-items-center">
                <Container fluid>
                    <div className="title">
                        <h1>Add Bank Details</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                    </div>

                    <Row>
                        
                    
                        <Col lg={12}>
                            <Form className="label_form mt-4" >
                                <Row>

                                    <h4 className="sec_tite mt-3">Add bank</h4>

                                    <Col lg={6}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Account Holder Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Name" />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Account Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Number" />
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>IFSC Code</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Code" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={6}>
                                        <Link to="/registerkycdetails" className="custom_btn w100">SUBMIT</Link>        
                                    </Col>
                                    {/* <Col lg={6}>
                                        <Link to="/businessDetails" ><button type="button" className='custom_btn w100' style={{backgroundColor: "white",color: "black"}} >BACK</button></Link>
                                    </Col> */}
                                </Row>
                            </Form>
                        </Col>
                    </Row>


                </Container>
            </div>
            </Col>
            </Row>
        </div>

    </>)


  }
}
export default Vendorregisterbankdetails;