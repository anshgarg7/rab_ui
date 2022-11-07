import React, { Component, useState } from "react";
import { Breadcrumb, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/css/style.css';
import car_img from '../assets/images/car.png';

function TaxibookingForm() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (<>

    <div>
      <Breadcrumb>
        <Link className="breadcrumb_link" to="/myActivity">Taxi Booking /</Link>
        <Link className="breadcrumb_link active" to="/bookactivity">New Taxi Book</Link>
      </Breadcrumb>

      <div className="mainfile">
        <div className="formcolr1">
          <Form>
            <Row>
            <Col lg={6} md={4} sm={12} >
                <div class="addbutt2 my-2">
                  <Button variant="primary" className="custom_btn">Pre-Booking</Button>
                </div>
              </Col> 
              <Col lg={6} md={4} sm={12} >
                <div class="addbutt3 my-2">
                  <Button variant="primary" className="custom_btn">Outstation</Button>
                </div>
              </Col> 
            </Row>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Customer Name</Form.Label>
                  <Form.Control className="cus" type="text" placeholder="Enter Name" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Phone Number</Form.Label>
                  <Form.Control className="cus" type="text" placeholder="Enter Number" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Pick Location</Form.Label>
                  <Form.Control className="cus" type="text" placeholder="Enter Location" />
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className="editform">
                  <Form.Label className="form-label">Drop Location</Form.Label>
                  <Form.Control className="cus" type="text" placeholder="Enter Location" />
                </div>
              </Col>
              <h6 className="text-white mt-2">Car Type</h6>
              <Row>
                <Col lg={3} md={6} sm={12} >
                  <div className="cartype">
                    <img src={car_img} alt="" />
                    <p className="text-center text-white mt-3"> MIni  $70</p>
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12} >
                  <div className="cartype1">
                  <img src={car_img} alt="" />
                    <p className="text-center text-white mt-3"> MIni  $70</p>
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12} >
                  <div className="cartype1">
                  <img src={car_img} alt="" />
                  <p className="text-center text-white mt-3"> MIni  $70</p>
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12} >
                  <div className="cartype1">
                  <img src={car_img} alt="" />
                  <p className="text-center text-white mt-3"> MIni  $70</p>
                  </div>
                </Col>
                <Col lg={12} md={4} sm={12} >
                <div class="addbutt2 mt-4 text-center">
                <Link to="/searchlist" className="custom_btn">Find Ride</Link>


                </div>
              </Col>

              </Row>
              </Row>

          </Form>
        </div>
      </div>

    </div>



  </>)
}

export default TaxibookingForm;