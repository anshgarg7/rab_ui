import React, { Component } from 'react';
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import http from '../../Helper/http';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
// import 'react-intl-tel-input/dist/main.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class VerifyMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loder:false,
            oldPhone: null,
            mobile: {},
            loading: false,
            message_err: "",
            redirect: false,
            value: null,
            success: false
        };
    }
    componentDidMount() {
        if (this.props.history.location.state) {
            console.log("ghghgh", this.props.history.location.state.data)
            this.setState({ oldPhone: this.props.history.location.state.data.phone })
        }
    }

    handleOtp = () => {
        this.setState({loder:true})
        console.log(this.state.mobile)
        var urlencoded = new URLSearchParams();
        urlencoded.append("old_mobile_no", this.state.oldPhone);
        urlencoded.append("new_mobile_no", this.state.mobile.phone);
        urlencoded.append("country_iso", this.state.mobile.iso2);
        urlencoded.append("country_code", `+${this.state.mobile.dialCode}`);
        http.Login_APi(`v1/vendor/update/mobile_no`, urlencoded)
            .then(result => {
                let { data } = result
                console.log(data)
                if (data && data.status === 200) {
                    this.setState({ success: true,loder:false })
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
                    loder:false,
                    message_err: error,
                })
            });

        // this.props.history.push({
        //     pathname: '/verifyOtp',
        //     state: {
        //         data: this.state
        //     }
        // });
    }
    handleChangeNumber = (e) => {
        console.log(e)
    }

    handleChange = (e) => {
        this.setState({ phone: e.target.value })
    }
    handleMob = (event) => {
        let s1 = { ...this.state }
        console.log(event)
        s1.mobile = event
        this.setState(s1)
    }

    onSuccess = () => {
        this.setState({ success: false })
        this.props.history.push({
            pathname: '/verifyOtp',
            state: {
                data2: {
                    mobile: {
                        phone: this.state.mobile.phone,
                        dialCode: this.state.mobile.dialCode,
                        iso2: this.state.mobile.iso2
                    }
                }

            }
        });
    }
    render() {
        console.log(this.state);
        const { message_err, value, loading, success } = this.state;
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
                    success ?
                        <SweetAlert
                            success
                            title="OTP will be send your register mobile Number"
                            // style={{ backgroundColor: 'black', color: 'white' }}
                            confirmBtnBsStyle={'danger'}
                            onConfirm={this.onSuccess}
                            onCancel={this.onCancel}
                        >
                            Mobile number : {this.state.mobile.phone}
                        </SweetAlert> : ""}
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
                                <h1><center>Verify Mobile Number</center></h1>
                                <p><center>Lorem Ipsum is simply dummy text of the printing and typesetting industry</center></p>
                            </div>
                            <Form className="label_form mt-4" >
                                <Row>
                                    <Col lg={2}></Col>
                                    <Col lg={8}>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Col sm="10" >
                                                <Form.Label >
                                                    Old Mobile Number :  <span className="text-white">{this.state.oldPhone}</span>
                                                </Form.Label>
                                            </Col>
                                            <Col sm="2" style={{ textAlign: "end" }}>

                                            </Col>
                                        </Form.Group>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>New Mobile Number</Form.Label>
                                            {/* <PhoneInput
                                                inputStyle={{
                                                    backgroundColor: 'black',
                                                    width: "100%",
                                                    borderBottom: " 1 px solid #8D8D8D !important",
                                                    borderRadius: "0",
                                                    background: "none",
                                                    border: "none",
                                                    resize: "none",
                                                    color: "#fff",
                                                }}
                                                containerStyle={{ height: "20px" }}
                                                buttonStyle={{
                                                    height: "34px",
                                                    borderRadius: "0",
                                                    background: "none",
                                                    border: "none",
                                                    resize: "none",
                                                }}

                                                dropdownStyle={{ backgroundColor: 'black', color: "white" }}
                                                country={'in'}
                                                value={this.state.phone}
                                                onChange={phone => this.setState({ phone })}
                                            /> */}
                                            <ReactIntlTelInput
                                                className="mobile"
                                                containerClassName="intl-tel-input w-100"
                                                inputClassName="form-control w-100"
                                                // inputProps={inputProps}
                                                // intlTelOpts={intlTelOpts}
                                                // name="phone"
                                                value={this.state.mobile}
                                                onChange={this.handleMob}
                                                // onReady={onReady}
                                                style={{ outerWidth: "100% !important" }}
                                            />
                                        </Form.Group>
                                        {this.state.message_err && <span className='text-danger'>{this.state.message_err}</span>}
                                    </Col>

                                </Row>
                                <Row className="mt-4">
                                    <Col lg={12}>
                                        <center>
                                            <button type="button" className='custom_btn w100' onClick={() => this.handleOtp()} >SEND</button><br />
                                            <Link to="/login" className="custom_btn1 w100 text-white">Back to Login</Link>
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