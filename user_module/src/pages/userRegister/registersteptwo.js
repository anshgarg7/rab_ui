import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import { Country, State, City } from 'country-state-city';

import SweetAlert from 'react-bootstrap-sweetalert';
import Spinner from "react-bootstrap/Spinner";
import http from "../../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

class RegisterStepTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {

            form: {
                country: "",
                state: "",
                city: "",
                address: "",
                pincode: "",
                landmark: "",
                countryVal: ""
            },
            error: {},
            stateVal: "",
            cityVal: "",

            loader: false,
            Danger: false,
            Success_message: "",
        }
    }

    componentDidMount = () => {
        console.log(this.props.history.location.state);
        if (this.props.history.location.state) {
            this.setState({ form: this.props.history.location.state.data })
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let s1 = { ...this.state }
        if (name == "country") {
            s1.form.countryVal = value
            Country.getAllCountries().map(op => {
                if (s1.form.countryVal == op.isoCode) {
                    s1.form.country = op.name

                }
            })
        } else if (name == "state") {
            s1.stateVal = value
            State.getStatesOfCountry(s1.form.countryVal).map(op => {
                if (s1.stateVal == op.isoCode) {
                    s1.form.state = op.name
                }
            })
        } else if (name == "policy") {
            s1.form[name] = event.target.checked
        } else {
            s1.form[name] = value
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error=this.validation()
        }
        this.setState(s1);
    };



    validation = () => {
        let s1 = { ...this.state }
        let error = {}
        if (s1.form.pincode && s1.form.pincode.length > 6){
            error.pincode = "*  Pincode should be maximum 6 numbers"
        }
        if (s1.form.country == '' || s1.form.country == undefined) {
            error.country = "*  Select your country"
        } if (s1.form.state == '' || s1.form.state == undefined) {
            error.state = "*  Select your state"
        } if (s1.form.city == '' || s1.form.city == undefined) {
            error.city = "Select your city"
        } if (s1.form.pincode == '' || s1.form.pincode == undefined) {
            error.pincode = "* Pincode is required"
        } if (s1.form.address == '' || s1.form.address == undefined) {
            error.address = "*  Address is required"
        } if (s1.form.landmark == '' || s1.form.landmark == undefined) {
            error.landmark = "*  Landmark is required"
        }
        console.log(s1.form.country);
        return error
    };

    signupAPI = () => {
        this.setState({ loader: true })
        // console.log("==9393999999999", this.state.form);
        // return false
        this.setState({
            message_err: ""
        })
        var formdata = new FormData();
        formdata.append("first_name", this.state.form.first_name);
        formdata.append("last_name", this.state.form.last_name);
        formdata.append("mobile_no", this.state.form.mobile_number.phone);
        formdata.append("email", this.state.form.email);
        formdata.append("password", this.state.form.password);
        formdata.append("gender", this.state.form.gender);
        formdata.append("dob", this.state.form.dob);
        formdata.append("country", this.state.form.country);
        formdata.append("country_iso", this.state.form.mobile_number.iso2);
        formdata.append("country_code", `+${this.state.form.mobile_number.dialCode}`);
        formdata.append("state", this.state.form.state);
        formdata.append("city", this.state.form.city);
        formdata.append("pin_code", this.state.form.pincode);
        formdata.append("address", this.state.form.address);
        formdata.append("landmark", this.state.form.landmark);
        formdata.append("image", this.state.form.profile_logo);
        formdata.append("device_type", "Web");

        // =================================== //

        http.Login_APi(`v1/user/signup`, formdata)
            .then(result => {
                console.log("===================", result);
                if (result.data.status === 200) {
                    this.props.history.push({
                        pathname: '/verifyOtp',
                        state: {
                            data: this.props.history.location.state.data.mobile_number.phone,
                            data2: this.state.form,
                        }
                    });
                    this.setState({ loader: false })
                }
                else if(result.data.status === 400)
                {
                    this.setState({
                        Danger: true,
                        Success_message: result.data.message,
                        loader: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    message_err: error,
                })
            });

    }
    handleSubmit = () => {
        let s1 = { ...this.state }
        s1.error = this.validation()
        // console.log(Object.keys(s1.error).length);
        if (Object.keys(s1.error).length === 0) {
            this.signupAPI()
        } else {
            this.setState(s1)
        }
    };


    backtoRegister = () => {
        this.props.history.push({
            pathname: '/register',
            state: {
                data: this.state.form,
            }
        });
    };

    danger = () =>{
        this.setState({
            Danger: false,
            Success_message: "",
            loader: false
        })
    }

    render() {
        let { form } = this.state;
        const { error, Danger, Success_message, loader } = this.state;
        return (
            <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            // open="true"
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                        <img src={register_bg} />
                    </div>
                </div>

                <div className="w-70 p-3 d-flex align-items-center">
                    <Container fluid>
                        <div className="title">
                            <h1>Add Address</h1>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                        </div>
                        <Form className="label_form mt-4" >
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mt-3 mb-3">
                                        <Form.Label>Address1</Form.Label>
                                        <Form.Control type="text" name="address" value={form.address} onChange={this.handleChange} placeholder="Enter House no/Flat No" />
                                        {error && error.address ? <><span className="text-danger">{error.address}</span></> : ""}
                                    </Form.Group>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="mt-3 mb-3">
                                        <Form.Label>Land mark</Form.Label>
                                        <Form.Control type="text" name="landmark" value={form.landmark} onChange={this.handleChange} placeholder="Enter Land Mark" />
                                        {error && error.landmark ? <><span className="text-danger">{error.landmark}</span></> : ""}
                                    </Form.Group>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="my-2 editform1">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select id="country" name="country" selected value={this.state.form.country} onChange={this.handleChange} required>
                                            <option >{this.state.form.country ? this.state.form.country : "Select"}</option>
                                            {Country.getAllCountries().map(op => (
                                                <option value={op.isoCode}>{op.name}</option>
                                            ))}

                                        </Form.Select>
                                        {error && error.country ? <><span className="text-danger">{error.country}</span></> : ""}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="my-2 editform1">
                                        <Form.Label>State</Form.Label>
                                        <Form.Select id="state" name="state" onChange={this.handleChange} required>
                                            <option >{this.state.form.state ? this.state.form.state : "Select"}</option>
                                            {this.state.form.countryVal &&
                                                State.getStatesOfCountry(this.state.form.countryVal).map(op => (
                                                    <option value={op.isoCode}>{op.name}</option>
                                                ))}

                                        </Form.Select>
                                        {error && error.state ? <><span className="text-danger">{error.state}</span></> : ""}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className=" my-2 editform1">
                                        <Form.Label>City</Form.Label>
                                        <Form.Select id="city" name="city" selected={true} value={this.state.form.city} onChange={this.handleChange} required>
                                            <option >{this.state.form.city ? this.state.form.city : "Select"}</option>
                                            {this.state.form.countryVal && this.state.stateVal &&
                                                City.getCitiesOfState(this.state.form.countryVal, this.state.stateVal).map(op => (
                                                    <option value={op.name}>{op.name}</option>
                                                ))}

                                        </Form.Select>
                                        {error && error.city ? <><span className="text-danger">{error.city}</span></> : ""}
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mt-3 mb-3">
                                        <Form.Label  >Pin Code</Form.Label>
                                        <Form.Control type="number" name="pincode" value={form.pincode} onChange={this.handleChange} placeholder="Enter Pincode" />
                                        {error && error.pincode ? <><span className="text-danger">{error.pincode}</span></> : ""}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col lg={6}>
                                    <button type="button" className="custom_btn w100" onClick={() => this.handleSubmit()}>Submit</button>
                                    {/* <div className="text-center">
                                        <Link className="link_white mt-3" onClick={() => this.handleSubmit()}>Skip</Link>
                                    </div> */}

                                </Col>
                                <Col lg={6}>
                                    {/* {loader ? 
                                        <Spinner animation="border" role="status" className="spinner_custom" style={{color: '#fff'}}>
                                        </Spinner> 
                                        :  */}
                                        <button type="button" className='custom_btn w100' style={{ backgroundColor: "white", color: "black" }} onClick={this.backtoRegister}>BACK</button>
                                    {/* } */}
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>


            </div>

        </>)


    }
}
export default RegisterStepTwo;