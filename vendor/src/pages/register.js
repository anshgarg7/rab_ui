import React, { Component } from "react";
import "../assets/css/style.css"
import { Container, Tabs, Tab, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../assets/images/register_bg.png';
import user_image from '../assets/images/user_image.png';


class Register extends Component {

  render() {

    return (<>   

        <div className="register_form bg_dark_black d-flex">
            <div className="w-30">
                <div className="right_bg_img">
                    <img src={register_bg} />
                </div>
            </div>

            <div className="w-70 px-3 d-flex align-items-center">
           
                <Container fluid>
                <div className="title text-white">
                        <h3>Register Now</h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                    </div>
                    <div className="sssss d-flex">
                <div className="formaddbank w-25 p-3 d-flex ">
                <div className="right_bg1_img pt-3">
                <img src={user_image} />
                <p className="UploadBusinessPicture"> Upload Business Picture</p>
                </div>
                </div>
                    <div className="formaddbank w-75 p-3 d-flex align-items-center">
                    
                    <Form className="label_form mt-4" >
                        <Row>
                        <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Business Name</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Business Name" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Alternative Phone Number</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Number" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Location</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Location" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Category</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option selected>Select Category</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </Col>
              <Col lg={12} md={12} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Description</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter some about your business" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <h6 className="text-white">Do you have visiting card?</h6>
               <div>
                   
               </div>
              </Col>

              
    
                        </Row>
                        <Row>
                        <h5 className="text-white mt-4">KYC</h5>
                        <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Name" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Address</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Address" />
                </div>
              </Col>
                      
                        </Row>
                        <Row>
                        <h5 className="text-white mt-4">Add Bank</h5>
                        <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Account Holder Name</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Account Name" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Account Number</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Address" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Account Number</Form.Label>
                  <Form.Control type="text" className="cus" placeholder="Enter Address" />
                </div>
              </Col>
                      
                        </Row>
                        <Row className="mt-1">
                            <Col lg={6}>
                                <Form.Group className="mb-3 text-white" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Set as primary bank" />
                                </Form.Group>
                                <Link to="/registerstep2" className="custom_btn w100">Submit</Link>
                            </Col>
                        </Row>
                    </Form>
                    </div>
                    </div>
                </Container>
            </div>
            
            
        </div>

    </>)


  }
}
export default Register;