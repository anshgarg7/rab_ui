import React, { Component } from "react";
import "../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../assets/images/register_bg.png';
import user from '../assets/images/user.jpg';


class Registervendor extends Component {

  render() {

    return (<>   

        
        <div className="register_form bg_dark_black d-flex">
        <Row className="m-0">
        <Col lg={3} md={12}>
            <div className="vendorwidth ">
            <div className="right_bg_img">
                    <img src={register_bg} />
                </div>
            </div>
            </Col>

            <Col lg={9} md={12}>
            <div className="vendorwidth1 p-2 d-flex align-items-center">
                <Container fluid>
                    <div className="title">
                        <h1>Register Now</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                    </div>
                    <Form className="label_form mt-4" >
                        <Row>
                          <Col md={3}>
                          <div className="right_bg1_img">
                    <img src={user} />
                </div>
                <p className="text-white text-center">Upload Picture</p>
                </Col>  
                          <Col md={9}>
                      
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" />
                                </Form.Group>
                            </Col> 

                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name" />
                                </Form.Group>
                            </Col>

                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Mobile" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="Email" placeholder="Enter Email" />
                                </Form.Group>
                            </Col>
                           
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="Email" placeholder="Enter Password" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="Email" placeholder="Re-Enter Password" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2 editform">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" placeholder="Enter DOB" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2 editform">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select>
                                        <option>Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2 editform">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select>
                                    <option>Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2 editform">
                                    <Form.Label>City</Form.Label>
                                    <Form.Select>
                                    <option>Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control type="Email" placeholder="Enter Pincode" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="Email" placeholder="Enter Address" />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="my-2">
                                    <Form.Label>Land mark</Form.Label>
                                    <Form.Control type="Email" placeholder="Enter Land Mark" />
                                </Form.Group>
                            </Col>

                            
                        </Row>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="I agree to the Term & Services and Privacy Policy" />
                                </Form.Group>
                             
                            </Col>
                           
                        </Row>
                        <Row className="">
                            <Col lg={6}>
                                
                                <Link to="/registerstep2" className="custom_btn w100">Next</Link>
                            </Col>
                            <Col className="loginlink1" lg={6}>
                                
                                <Link to="/registerste" className="custom_btn1 w100">Already have an account? <span className="loginlink">LOGIN</span> </Link>
                                
                            </Col>
                        </Row>
                        
                        
                         </Col>   </Row>
                    </Form>
                </Container>
            </div>
            </Col>
            </Row>
        </div>

    </>)


  }
}
export default Registervendor;