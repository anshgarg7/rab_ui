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
import 'react-intl-tel-input/dist/main.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

class VerifyMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPhone: null,
            phone: "",
            loading: false,
            message_err: "",
            redirect: false,
            value: null,
            form: {},
            success:false,
            loader: false,
        };
    }
    componentDidMount() {
        if (this.props.history.location.state) {
            console.log(this.props.history.location.state.data)
            this.setState({ 
                oldPhone: this.props.history.location.state.data.phone,
                form: this.props.history.location.state.data.form
            })
        }
    }

    handleOtp = () => {
        this.setState({ loader: true })
        var urlencoded = new URLSearchParams();
        urlencoded.append("old_mobile_no", this.state.oldPhone);
        urlencoded.append("country_iso", this.state.form.mobile_number.iso2);
        urlencoded.append("country_code", `+${this.state.form.mobile_number.dialCode}`);
        urlencoded.append("new_mobile_no", this.state.form.mobile_number.phone);

        http.Login_APi(`v1/user/update/mobile_no`, urlencoded)
            .then(result => {

                let { data } = result
                if (data && data.status === 200) {
                    this.setState({success:true})
                }
                else {
                    console.log(data.message)
                }
                this.setState({ loader: false })
            })
            .catch(error => {
                this.setState({
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

    onSuccess=()=>{
        this.setState({success:false})
        this.props.history.push({
            pathname: '/verifyOtp',
            state: {
                data: this.state.form.mobile_number.phone,
                data2: this.state.form
            } 
        });
    }
    handleMob = (event) => {
        let s1 = { ...this.state }
        console.log(event)
        s1.form.mobile_number = event
        this.setState(s1)
    }
    render() {
        console.log(this.state);
        const { message_err, value, loading, phone ,success, loader } = this.state;
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loader}
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
                            Mobile number : {this.state.form.mobile_number.phone}
                        </SweetAlert>
                    :
                    ""
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
                                            <ReactIntlTelInput
                                                className="mob"
                                                // inputProps={inputProps}
                                                // intlTelOpts={intlTelOpts}
                                                // name="phone"
                                                style={{width: "54%"}}
                                                value={this.state.form.mobile_number}
                                                onChange={this.handleMob}
                                                    // onReady={onReady}
                                            />
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
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={12}>
                                        <center>
                                            <button type="button" className='custom_btn' onClick={() => this.handleOtp()} >SEND</button><br />
                                            {/* <Link to="/login" className="custom_btn1 w100 text-white">Back to Login</Link> */}
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