import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';

import user from '../../assets/images/dummy_profile.png';
import Files from 'react-files';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
import 'react-intl-tel-input/dist/main.css';
import PasswordField from 'material-ui-password-field'
import 'intl-tel-input/build/css/intlTelInput.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                first_name: "",
                last_name: "",
                gender: "",
                email: "",
                password: "",
                dob: "",
                profile_image: "",
                profile_logo: "",
                mobile_number: "",
                confirm_password: "",
                policy: false,
            },
            error: {},
        }
    }

    componentDidMount = () => {
        if (this.props.history.location.state) {
            this.setState({ form: this.props.history.location.state.data })
        }
    }

    onFilesChange = (files) => {
        let s1 = { ...this.state }
        if (files[0]) {
            s1.form["profile_logo"] = files[0]
            s1.form["profile_image"] = files[0].name
            s1.logo_error = ""
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error=this.validation()
        }
        this.setState(s1)
    }
    onFilesError = (error, file) => {
        this.setState({
            logo_error: error.message + "limit upto 3MB max"
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        let s1 = { ...this.state }
        s1.form[name] = value
        if (name == "first_name")
        {
            s1.form.first_name=value.replace(/[^A-Za-z]/gi, "")
        }
        if (name == "last_name")
        {
            s1.form.last_name=value.replace(/[^A-Za-z]/gi, "")
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error=this.validation()
        }
        this.setState(s1)
    }

    validation = () => {
        let s1 = { ...this.state }
        let error = {}
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(s1.form.email)){
                error.email = "*  Email is not valid"
            }
            if (s1.form.email.length > 40) {
                error.email = "*  Email must be less than 40 characters "
            }
       
        if (s1.form.password.length < 8){
            error.password = "*  Password must be at least 8 characters"
        }
        if (s1.form.profile_logo == '') {
            error.profile_logo = "* Profile image is required"
        }
        if (s1.form.first_name == '') {
            error.first_name = "* First Name is required"
        } if (s1.form.mobile_number.phone== "") {
            error.mobile_number = "*  Mobile number is required"
        } if (s1.form.email == '') {
            error.email = "*  Email is required"
        } if (s1.form.password == '') {
            error.password = "*  Password is required"
        } if (s1.form.confirm_password == '') {
            error.confirm_password = "*  Confirm Password is required"
        } if (s1.form.password !== s1.form.confirm_password) {
            error.confirm_password = "*  Confirm Password is not match with password"
        } if (s1.form.dob == '') {
            error.dob = "*  DOB is required"
        } if (s1.form.gender == '') {
            error.gender = "*  Select your Gender"
        } if (!s1.form.policy) {
            error.policy = "*  Please check policy"
        }
        return error

    };

    handleSubmit = () => {
        let s1 = { ...this.state }
        s1.error = this.validation()
        if (Object.keys(s1.error).length === 0) {
            this.props.history.push({
                pathname: '/register-two',
                state: {
                    data: this.state.form,
                }
            });
        } else {
            this.setState(s1)
        }
    }

    handleMob = (event) => {
        let s1 = { ...this.state }
        const result = event.phone.replace(/\D/g, '');
        event.phone=result
        s1.form.mobile_number = event
        if (Object.keys(s1.error).length != 0) {
            s1.error=this.validation()
        }
        this.setState(s1)
    }

    render() {
        let { form } = this.state
        const { message_err, profile_image, profile_logo } = this.state.form;
        let { error } = this.state
        return (<>


            <div className="register_form bg_dark_black d-sm-inline-flex">
                <div className="w-30">
                    <div className="right_bg_img">
                        <img src={register_bg} />
                    </div>
                </div>

                <div className="w-70 d-flex align-items-center">
                    <Container fluid>
                        <div className="title">
                            <h1>Create Profile</h1>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                        </div>
                        <Form className="label_form mt-4" >
                            <Row>
                                <Col md={3}>
                                    <div className="right_bg1_img">
                                        
                                        <Form.Group className="mt-3">
                                            <div class="custom-file" >
                                                <Files
                                                    className='text-white text-center'
                                                    onChange={this.onFilesChange}
                                                    onError={this.onFilesError}
                                                    accepts={['image/*', '.gif', '.png', '.jpg', 'jpeg']}
                                                    multiple={false}
                                                    maxFileSize={10000000}
                                                    minFileSize={0}
                                                    clickable
                                                    style={{ cursor: "pointer" }}
                                                    required
                                                >
                                                    <img src={profile_logo && profile_logo.preview ? profile_logo.preview.url : user} alt="" />
                                                 
                                                    {this.state.form.profile_image ? this.state.form.profile_image :<p>Upload Picture</p> }
                                                </Files>
                                                {error && error.profile_logo ? <><span className="text-danger">{error.profile_logo}</span></> : ""}
                                            </div>
                                           
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col md={9}>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" name="first_name" onChange={this.handleChange} value={form.first_name} placeholder="Enter Name" />
                                                {error && error.first_name ? <><span className="text-danger">{error.first_name}</span></> : ""}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" name="last_name" onChange={this.handleChange} value={form.last_name} placeholder="Enter Last Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select id="gender" name="gender" value={this.state.form.gender} onChange={this.handleChange} required>
                                                    <option>Select</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </Form.Select>
                                                {error && error.gender ? <><span className="text-danger">{error.gender}</span></> : ""}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control type="date" name="dob" onChange={this.handleChange} value={form.dob} placeholder="Enter DOB" />
                                                {error && error.dob ? <><span className="text-danger">{error.dob}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Mobile Number</Form.Label>
                                                    <ReactIntlTelInput
                                                        className="mob mob-data"
                                                        // inputProps={inputProps}
                                                        // intlTelOpts={intlTelOpts}
                                                        // name="phone"
                                                        style={{width: "54%"}}
                                                        value={this.state.form.mobile_number}
                                                        onChange={this.handleMob}
                                                    // onReady={onReady}
                                                    />
                                                {/* <Form.Control type="text" name="mobile_number" onChange={this.handleChange} value={form.mobile_number} placeholder="Enter Mobile Number" /> */}
                                                {error && error.mobile_number ? <><span className="text-danger">{error.mobile_number}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="text" name="email" onChange={this.handleChange} value={form.email} placeholder="Enter Email" />
                                                {error && error.email ? <><span className="text-danger">{error.email}</span></> : ""}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Password</Form.Label>
                                                <br/>
                                                <PasswordField
                                                    hintText="At least 8 characters"
                                                    floatingLabelText="Enter your password"
                                                    errorText="Your password is too short"
                                                    name="password"
                                                    value={this.state.form.password}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                <br/>


                                                {/* <Form.Control type="text" name="password" onChange={this.handleChange} value={form.password} placeholder="Enter Password" /> */}
                                                {error && error.password ? <><span className="text-danger">{error.password}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="mt-3 mb-3">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <br/>
                                                <PasswordField
                                                    hintText="At least 8 characters"
                                                    floatingLabelText="Enter your confirm password"
                                                    name="confirm_password"
                                                    value={this.state.form.confirm_password}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                                <br/>
                                                {/* <Form.Control type="text" name="confirm_password" onChange={this.handleChange} value={form.confirm_password} placeholder="Re-Enter Password" /> */}
                                                {error && error.confirm_password ? <><span className="text-danger">{error.confirm_password}</span></> : ""}
                                            </Form.Group>
                                        </Col>



                                    </Row>
                                    <Row className="mt-4">
                                        <Col lg={12}>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                {/* <Form.Check type="checkbox" label="I agree to the Term & Services and Privacy Policy" /> */}
                                                <Form.Check type="checkbox" id="policy" name="policy" checked={this.state.form.policy} onChange={this.handleChange} label="I agree to the Term & Services and Privacy Policy" required />
                                                {error && error.policy ? <><span className="text-danger">{error.policy}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="">
                                        <Col lg={6}>
                                            <button type="button" className="custom_btn w100" onClick={() => this.handleSubmit()}>Next</button>
                                        </Col>
                                        <Col className="loginlink1" lg={6}>
                                            <Link to="/registerste" className="custom_btn1 w100">Already have an account? <span className="loginlink">LOGIN</span> </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            </div>
        </>)
    }
}
export default Register;