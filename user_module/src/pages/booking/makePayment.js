import React, { Component } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class MakePayment extends Component {



    render() {

        return (
            <>
                <Col lg={4}>

                    {/* booking form start */}
                    <div className="dark_form_bg top_margin">
                        <div className="price"><h1>{this.props.price.amount}/Person</h1></div>
                        <Form className="label_form payment_form" >
                            <div className="m-3">
                                <Form.Label>Make Payment</Form.Label>
                                <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" />
                                    <div className="ms-3">
                                        <p><b>My Wallet</b></p>
                                        <small>$10 Balance in Wallet</small>
                                    </div>
                                </Form.Group>
                            </div>
                            <div className="m-3">
                                <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" />
                                    <div className="ms-3">
                                        <p><b>**** **** **** 9876</b></p>
                                        <small>Expires Jan/2025</small>
                                    </div>
                                </Form.Group>
                            </div>

                            <hr className="custom_hr" />

                            <div className="text-center mb-4">
                                <Link to="" className="white_link">ADD NEW CARD</Link>
                            </div>



                            <Button variant="primary" type="button" className="custom_btn w100" onClick={()=>this.props.handleMakePayment()}>Make Payment</Button>
                        </Form>
                    </div>
                    {/* booking form start */}
                </Col>
            </>
        )
    }

}
export default MakePayment;