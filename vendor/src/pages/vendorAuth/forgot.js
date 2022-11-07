import React, { Component } from 'react';
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import http from "../../Helper/http"
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loder:false,
            email: null,
            loading: false,
            message_err: "",
            redirect: false,
            value: null,
            Success: false,
            Success_message: "",
            loading: false,
            Danger: false
        };
    }


    handleOtp = () => {
        this.setState({ loading: true })
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.email);

        http.Login_APi(`v1/vendor/forgot_password`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    this.setState({
                        Success: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else if (data && data.status === 400) {
                    this.setState({
                        Danger: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else {
                    this.setState({
                        Danger: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                    console.log(data.message)
                }
            })
            .catch(error => {
                this.setState({
                    message_err: error,
                    loading: false
                })
            });
    }
    handleChangeNumber = (e) => {
        console.log(e)
    }

    handleChange = (e) => {
        this.setState({ email: e.target.value })
    }
    onSuccess = () => {
        this.setState({
            Success: false,
            Success_message: "",
            loading: false
        })
        this.props.history.push("/login")
    };

    danger = () => {
        this.setState({
            Danger: false,
            Success_message: "",
            loading: false

        })
    }
    render() {
        const { message_err, value, loading, email, Success, Danger, Success_message } = this.state;
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                // open="true"
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
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
                                <h1><center>Forgot Password</center></h1>
                                <p><center>Enter your registered email address we will send you a link to reset your password</center></p>
                            </div>
                            <Form className="label_form mt-4" >
                                <Row>
                                    <Col lg={2}></Col>
                                    <Col lg={8}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="text" name="email" value={email} onChange={this.handleChange} placeholder="Enter Email Address" id="email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-4">

                                    <Col lg={12}>
                                        <center>
                                            <button type="button" className='custom_btn w100' onClick={() => this.handleOtp()} >SEND</button><br />

                                          

                                            {/* <Link to="/vendor/dashboard"><button type="button" className='custom_btn w100'>Vander Login</button></Link><br/> */}
                                            {/* <Link  to="/user/dashboard">  <button type="button" className='custom_btn w100' >User Login</button></Link><br/> */}
                                            {/* <Link to="/dashboard" className="custom_btn w100"  onClick={this.login_api}>Next</Link> */}

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

export default Forgot;