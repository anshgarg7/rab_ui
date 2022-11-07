import React, { Component } from 'react';
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import { Redirect } from 'react-router-dom';
import auth from "../../services/auth"
import http from "../../Helper/http"
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class VerifyMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loder:false,
            phone: this.props.history.location.state.data2.mobile.phone,
            country_code: this.props.history.location.state.data2.mobile.dialCode,
            country_iso: this.props.history.location.state.data2.mobile.iso2,
            loading: false,
            redirect: false,
            form: {},
            otp: '',
            Success: false,
            Success_message: "",
        };
    }
    componentDidMount() {
        if (this.props.history.location.state) {
            console.log("=======", this.props.history.location.state)
            this.setState({ form: this.props.history.location.state })
        }
        // }if(this.props.history.location.state)
    }

    handleEdit = () => {
        this.props.history.push({
            pathname: '/verifyMobile',
            state: {
                data: this.state
            }
        });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    redirectOTP = async () => {
        this.setState({loder:true})
        var urlencoded = new URLSearchParams();
        urlencoded.append("old_mobile_no", this.state.phone);
        urlencoded.append("new_mobile_no", this.state.phone);
        urlencoded.append("country_iso", this.state.country_iso);
        urlencoded.append("country_code", `+${this.state.country_code}`);

        http.Login_APi(`v1/hotel/update/mobile_no`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    this.setState({loder:false})
                    this.props.history.push({
                        pathname: '/verifyOtp',
                        state: {
                            data: this.state.phone
                        }
                    });
                }
                else {
                    this.setState({loder:false})
                    console.log(data.message)
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

    handleSubmit = () => {
        this.setState({loder:true})
        if (this.state.otp == '') {
            this.setState({ message_err: "Please Enter the OTP" ,loder:false})
        } else {
            console.log(this.state.phone, this.state.otp)
            var urlencoded = new URLSearchParams();
            urlencoded.append("mobile_no", this.state.phone);
            urlencoded.append("otp", this.state.otp);
            console.log(urlencoded)
            http.Login_APi(`v1/hotel/otp_verify`, urlencoded)
                .then(result => {
                    console.log(result)
                    let { data } = result
                    if (data && data.status === 200) {
                        this.setState({
                            loder:false,
                            Success: true,
                            Success_message: result.data.message,
                        })

                    }
                    else {
                        this.setState({
                            loder:false,
                            message_err: data.message,
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        loder:false
                    })
                    console.log(error)
                });
        }

    }

    onSuccess = () => {
        this.setState({
            Success: false,
            Success_message: "",
        })
        this.props.history.push("/login")
    };

    render() {

        const { message_err, Success, Success_message } = this.state;
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
                {
                    Success ? <SweetAlert
                        success
                        // closeOnClickOutside={true}
                        confirmBtnBsStyle="danger"
                        title="Success"
                        onConfirm={this.onSuccess}
                    >
                        Mobile Number is verifyed Successfull
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
                            <div class="img_verify">
                                <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" height="120px" />
                            </div>
                            <div className="title">
                                <h1><center>Verify OTP</center></h1>
                                <p><center>Lorem Ipsum is simply dummy text of the printing and typesetting industry</center></p>
                            </div>
                            <Form className="label_form mt-4" >
                                <Row>
                                    <Col lg={2}></Col>
                                    <Col lg={8}>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Col sm="10" >
                                                <Form.Label >
                                                    Mobile Number :  <span className="text-white">{this.state.country_code}{this.state.phone}</span>
                                                </Form.Label>
                                            </Col>
                                            <Col sm="2" style={{ textAlign: "end" }}>
                                                {/* <Form.Label className="edit_btn" onClick={() => this.handleEdit()} >Edit</Form.Label> */}
                                            </Col>
                                        </Form.Group>

                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>OTP Number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Code" id="otp" name="otp" maxLength={4} value={this.state.otp} onChange={this.handleChange} />
                                        </Form.Group>
                                        {message_err ? <span className="text-danger text-center">{message_err}</span> : ""}
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={12}>
                                        <center>
                                            <button type="button" className='custom_btn w100' onClick={() => this.handleSubmit()}>SUBMIT</button><br />

                                            <button type="button" className='custom_btn w100 mt-3' onClick={() => this.redirectOTP()}>RESEND</button><br />

                                            {/* <Link to="/login" className="custom_btn1 w100 text-white">0 : 06</Link> */}
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

export default VerifyMobile;