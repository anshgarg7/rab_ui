import React, { useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import '../../assets/css/style.css';
import http from "../../Helper/http"
import vist_img from '../../assets/images/vist.png';
import award_img from '../../assets/images/award.png';
import SweetAlert from 'react-bootstrap-sweetalert';

const PaymentMethod = () => {
    const [accHolder, setAccHolder] = useState("")
    const [account, setAccount] = useState("")
    const [ifsc, setIfsc] = useState("")
    const [message_err, setMessageErr] = useState("")
    const [Success, setSuccess] = useState(false)
    const [error,setError] = useState({})
   
    const addAcount = async () => {
        setMessageErr("")
        var urlencoded = new URLSearchParams();
        urlencoded.append("account_holder_name", accHolder);
        urlencoded.append("account_no", account);
        urlencoded.append("ifsc_code", ifsc);

        await http.postData(`v1/vendor/bank_details`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    setAccount("")
                    setAccHolder("")
                    setIfsc("")
                    setSuccess(true)
                }
                else {
                    setMessageErr(data.message)
                }
            })
            .catch(error => {
                setMessageErr(error)
            });
    };
  const  valdaction = () => {
        let error = {}
        if (account == '') {
            error.account = "* Account Number is required"
        } if (accHolder == "") {
            error.accHolder = "*  Account Holder Name is required"
        } if (ifsc == '') {
            error.ifsc = "*  IFSC Number is required"
        } 
        return error
    };


    const handleSubmit = () => {
        setError(valdaction())
        if (Object.keys(error).length === 0) {
            
        } else {
            addAcount()
        }
    }



    return (
        <div>
            {
                Success ? <SweetAlert
                    success
                    // closeOnClickOutside={true}
                    confirmBtnBsStyle="danger"
                    title="Success"
                    onConfirm={() => setSuccess(false)}
                >
                    Bank Details Add Successfull
                </SweetAlert> : ''
            }
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div className="mainfile mt-3">
                            <div className="formcolr">
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <h6 className="meefont text-white bfont">My Payment Methods</h6>
                                        <Form>
                                            {['radio'].map((type) => (
                                                <div key={`inline-${type}`} className="mb-3">
                                                    <ul className="payment_method">
                                                        <li className="d-flex align-items-center">
                                                            <div>
                                                                <Form.Check
                                                                    inline
                                                                    label="1"
                                                                    name="group1"
                                                                    type={type}
                                                                    id={`inline-${type}-1`}
                                                                />
                                                            </div>
                                                            <div className="bankname d-flex align-items-center">
                                                                <span>
                                                                    <i className="fa fa-university" aria-hidden="true"></i>
                                                                </span>
                                                                <span className="ms-3">
                                                                    <h4>**** **** **** 8765</h4>
                                                                    <p>Punjab National Bank</p>
                                                                </span>
                                                            </div>
                                                            <div className="carddelete ms-auto">
                                                                <Button className="">
                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                    <p>Delete</p>
                                                                </Button>
                                                            </div>

                                                        </li>

                                                        <li className="d-flex align-items-center">
                                                            <div>
                                                                <Form.Check
                                                                    inline
                                                                    label="2"
                                                                    name="group1"
                                                                    type={type}
                                                                    id={`inline-${type}-2`}
                                                                />
                                                            </div>
                                                            <div className="bankname d-flex align-items-center">
                                                                <span>
                                                                    <i className="fa fa-university" aria-hidden="true"></i>
                                                                </span>
                                                                <span className="ms-3">
                                                                    <h4>**** **** **** 8765</h4>
                                                                    <p>Punjab National Bank</p>
                                                                </span>
                                                            </div>
                                                            <div className="carddelete ms-auto">
                                                                <Button className="">
                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                    <p>Delete</p>
                                                                </Button>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                            ))}
                                        </Form>


                                    </Col>

                                    <Col md={6}>
                                        <div className="mainfile">
                                            <div className="formcolr pt-0">

                                                <h6 className="meefont text-white bfont">Add New Bank</h6>

                                                <Row className="mb-3">
                                                    <Col lg={12}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label">Account Holder Name</Form.Label>
                                                            <Form.Control className="cus" type="text" name="accHolder" value={accHolder} onChange={(e) => setAccHolder(e.target.value)} placeholder="Enter Name" />
                                                            {error&&error.accHolder?<span  className="text-danger">{error.accHolder}</span>:""}
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label">Account Number</Form.Label>
                                                            <Form.Control className="cus" type="text" name="account" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Enter Number" />
                                                            {error&&error.account?<span  className="text-danger">{error.account}</span>:""}
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label">IFCI Code</Form.Label>
                                                            <Form.Control className="cus" type="text" name="ifsc" value={ifsc} onChange={(e) => setIfsc(e.target.value)} placeholder="Enter Code" />
                                                            {error&&error.ifsc?<span  className="text-danger">{error.ifsc}</span>:""}
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col md={12} >
                                                        <div className="addbutt text-center mb-2">
                                                            <Button variant="secondary" className="custom_btn" onClick={() => handleSubmit()}>Submit</Button>
                                                            {message_err ? <p style={{ color: "red", fontSize: "15px" }}> {message_err} </p> : ""}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default PaymentMethod;