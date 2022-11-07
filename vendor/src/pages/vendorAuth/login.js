import React, { Component } from 'react';
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import auth from "../../services/auth"
import http from "../../Helper/http"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loder:false,
            email: "",
            password: "",
            role: "",
            loading: false,
            phone: "",
            country_iso: "",
            country_code: "",
            message_err: "",
            redirect: false,
            open: false

        };
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

   
    redirectOTP = async () => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("old_mobile_no", this.state.phone);
        urlencoded.append("new_mobile_no", this.state.phone);
        urlencoded.append("country_iso", this.state.country_iso);
        urlencoded.append("country_code", this.state.country_code);
        console.log(this.state.country_code)
        http.Login_APi(`v1/vendor/update/mobile_no`, urlencoded)
            .then(result => {

                let { data } = result
                if (data && data.status === 200) {
                    this.setState({loder:false})
                    this.props.history.push({
                        pathname: '/verifyOtp',
                        state: {
                            data2:{
                                mobile: {
                                    phone: this.state.phone, 
                                    dialCode: this.state.country_code, 
                                    iso2: this.state.country_iso
                                }
                            }
                        }
                    });
                }
                else {
                    this.setState({loder:false})
                    console.log(data.message)
                    // this.setState({
                    //     message_err: data.message,
                    // })
                }
            })
            .catch(error => {
                this.setState({
                    loder:false,
                    message_err: error,
                })
                // console.log(error)
            });



    }
    login_api = (event) => {
        event.preventDefault();
        this.setState({
            message_err: "",loder:true
        })
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.email);
        urlencoded.append("password", this.state.password);
        console.log(urlencoded)
        // debugger
        http.Login_APi(`v1/vendor/login`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    console.log(data)
                    let user = { token: data.data.token, name: data.data.first_name, img: data.data.image, category_id: data.data.vendor_business_detail.category_id }
                    auth.login(user)
                    this.setState({loder:false})
                    window.location.reload('/dashboard');
                }
                else {
                    if (data.data && data.data.is_otp_verified) {
                        console.log("==", data.data);
                        this.setState({
                            warning: true,
                            
                            warning_message: result.data.message,
                            phone: data.data.mobile_no,
                            country_code: data.data.country_code,
                            country_iso: data.data.Linkcountry_iso,
                            loder:false,
                        })
                        console.log(data.data)
                        // this.setState({open:true,
                        //     phone:data.data.mobile_no})
                    }
                    this.setState({
                        loder:false,
                        message_err: data.message,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    loder:false,
                    message_err: error,
                })
                // console.log(error)
            });
    };

    onWarning = () => {
        this.setState({
            warning: false,
            warning_message: "",
            success: true
        })
    };
    onSuccess = () => {
        this.setState({
            success: false,loder:true
        })
        this.redirectOTP()
    }

    render() {
        const { message_err, open, warning, warning_message, success } = this.state;
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.loder}
                // open="true"
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>


                {warning ? <SweetAlert
                    warning
                    // showCancel
                    // style={{ backgroundColor: 'black', color: 'white' }}
                    confirmBtnText="OK"
                    confirmBtnBsStyle="danger"
                    title={warning_message}
                    onConfirm={this.onWarning}
                    // onCancel={this.onCancel}
                    focusCancelBtn
                >
                    Please verify your mobile Number
                </SweetAlert> : ""
                }
                {
                    success ?
                        <SweetAlert
                            success
                            title="OTP will be send your register mobile Number"
                            // style={{ backgroundColor: 'black', color: 'white' }}
                            confirmBtnBsStyle={'danger'}
                            onConfirm={this.onSuccess}
                            onCancel={this.onCancel}
                        >
                            Mobile number : {this.state.phone}
                        </SweetAlert> : ""}
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
                                <h1><center>Login Now</center></h1>
                            </div>
                            <Form onSubmit={this.login_api} className="label_form mt-4"  >
                                <Row>
                                    <Col lg={2}></Col>
                                    <Col lg={8}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="Email" placeholder="Enter Email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2}></Col>
                                    <Col lg={2}></Col>
                                    <Col lg={8}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                        </Form.Group>

                                        {message_err ? <p style={{ color: "red", fontSize: "15px" }}> {message_err} </p> : ""}
                                    </Col>
                                    <Col lg={8} className="text-white"></Col>
                                    <Col lg={2}>
                                        <Form.Group className="mt-3 mb-3 ">
                                            <Link to="/forgotPassword"><Form.Label className="text-white ml-4">Forget Password ?</Form.Label></Link>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3}></Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={12}>
                                        <center>
                                            <button type="submit" className='custom_btn w100'>LOGIN</button><br />
                                            {/* <Link to="/vendor/dashboard"><button type="button" className='custom_btn w100'>Vander Login</button></Link><br/> */}
                                            {/* <Link  to="/user/dashboard">  <button type="button" className='custom_btn w100' >User Login</button></Link><br/> */}
                                            {/* <Link to="/dashboard" className="custom_btn w100"  onClick={this.login_api}>Next</Link> */}
                                            <Link to="/registerNow" className="custom_btn1 w100">Create an account? </Link>
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

export default login;