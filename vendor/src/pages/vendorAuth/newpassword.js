import React, { Component } from 'react';
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import { Redirect } from 'react-router-dom';
import auth from "../../services/auth";
import http from "../../Helper/http";
import SweetAlert from 'react-bootstrap-sweetalert';
import Spinner from "react-bootstrap/Spinner";

class CreateNewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm_password: '',
            loading: false,
            message_err: "",
            redirect: false,

            Success: false,
            Success_message: "",
            Danger: false,

            password_err: '',
            c_password_err: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        if(this.state.password == '')
        {
            this.setState({
                password_err : "* Password is required",
                message_err: '',
                c_password_err: '',
            })
            return false
        }
        if(this.state.confirm_password == '')
        {
            this.setState({
                c_password_err : "* Confirm Password is required",
                password_err: '',
                message_err: '',
            })
            return false
        }
        if (this.state.password !== this.state.confirm_password) {
            this.setState({
                message_err : "*  Confirm Password is not match with password",
                password_err: '',
                c_password_err: ''
            })
            return false
        }
        // this.setState({ loading: true })
        const vendortoken = this.props.match.params.token;
        var urlencoded = new URLSearchParams();
        urlencoded.append("password", this.state.password);

        http.Login_APi(`v1/vendor/reset_password/${vendortoken}`, urlencoded)
            .then(result => {
                console.log("========", result);
                let { data } = result
                if (data && data.status === 200) {
                    this.setState({
                        Success: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else if(data && data.status === 400)
                {
                    this.setState({
                        Danger: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else {
                    console.log(data.message)
                }
            })
            .catch(error => {
                this.setState({
                    message_err: error,
                })
            });

    }

    onSuccess = () => {
        this.setState({
            Success: false,
            Success_message: "",
            loading: false
        })
        this.props.history.push("/login")
    };

    danger = () =>{
        this.setState({
            Danger: false,
            Success_message: "",
            loading: false
                    
        })
    }

    render() {
        const { message_err, password_err, c_password_err, phone, password, confirm_password, Success, Danger, Success_message, loading } = this.state;
        
        return (
            <div>
                {
                    Success ? <SweetAlert
                        success
                        closeOnClickOutside={true}
                        confirmBtnBsStyle="danger"
                        title="Success"
                        onConfirm={this.onSuccess}
                    >
                        {Success_message}
                    </SweetAlert> : ''
                }

                {
                    Danger ? <SweetAlert
                        danger
                        closeOnClickOutside={true}
                        confirmBtnBsStyle="danger"
                        onConfirm={this.danger}
                    >
                        {Success_message}
                    </SweetAlert> : ''
                }
                <div className="register_form bg_dark_black d-flex">
                    <div className="w-30">
                        <div className="right_bg_img">
                            <img src={register_bg} alt="" />
                        </div>
                    </div>
                    <div className="w-70 p-3 d-flex align-items-center">
                        <Container fluid>
                            <div className="img_verify">
                                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" height="120px" />
                            </div>
                            <div className="title">
                                <h1><center>Create New Password</center></h1>
                                <p><center></center></p>
                            </div>
                            <Form className="label_form mt-4" >
                                <Row>
                                    <Col lg={2}></Col>
                                    <Col lg={8}>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Col sm="10" >
                                                {/* <Form.Label >
                                                    Email :  <span className="text-white">gourav@gmail.com</span>
                                                </Form.Label> */}
                                            </Col>
                                            <Col sm="2" style={{ textAlign: "end" }}>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="password" name="password" value={this.state.password} placeholder="Enter New Password" onChange={this.handleChange}/>
                                            {password_err && password_err ? <><span className="text-danger">{password_err}</span></> : ""}
                                            
                                        </Form.Group>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} placeholder="Enter Confirm Password" />
                                            {c_password_err && c_password_err ? <><span className="text-danger">{c_password_err}</span></> : ""}
                                        </Form.Group>
                                        {message_err && message_err ? <><span className="text-danger">{message_err}</span></> : ""}
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={12}>
                                        <center>
                                            <button type="button" className='custom_btn w100' onClick={() => this.handleSubmit()}>SUBMIT</button><br />
                                        </center>
                                    </Col>
                                </Row>
                            </Form>

                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateNewPassword;