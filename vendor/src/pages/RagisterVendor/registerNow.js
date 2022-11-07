import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import user from '../../assets/images/dummy_profile.png';
import Files from 'react-files';
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2'
import ReactIntlTelInput from 'react-intl-tel-input-v2';
// import 'react-intl-tel-input/dist/main.css';
import PasswordField from 'material-ui-password-field'
import 'intl-tel-input/build/css/intlTelInput.css';
class Registervendor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                first_name: "",
                last_name: "",
                mobile: { iso2: 'in', dialCode: '91' },
                email: "",
                password: "",
                confirm_password: "",
                gender: "",
                dob: "",
                country: "",
                state: "",
                city: "",
                pincode: "",
                address: "",
                landmark: "",
                policy: false,
                profile_image: "",
                profile_logo: "",
                country_code: "",
                country_iso: "",
                is_visiting_card: '1',
            },
            message_err: "",
            logo_error: "",
            error: {},
            stateVal: "",
            cityVal: "",
        };
    }
    componentDidMount = () => {
        if (this.props.history.location.state) {
            this.setState({ form: this.props.history.location.state.data })
        }
    }
    handleMob = (event) => {
        let s1 = { ...this.state }
        const result = event.phone.replace(/\D/g, '');
        event.phone = result
        console.log(event, result)
        s1.form.mobile = event
        this.setState(s1)

    }

    onFilesChange = (files) => {
        let s1 = { ...this.state }
        if (files[0]) {
            s1.form["profile_logo"] = files[0]
            s1.form["profile_image"] = files[0].name
            s1.logo_error = ""
        }
        this.setState(s1)
    }
    onFilesError = (error, file) => {
        console.log(error, file, "dad    ")
        let s1 = { ...this.state }
        s1.error.profile_logo = "Profile picture limit min 500 kb "

        this.setState(s1)
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        let s1 = { ...this.state }

        if (name == "country_code") {
            s1.form.countryVal = value
            Country.getAllCountries().map(op => {
                if (value == op.phonecode) {
                    s1.form.country_code = op.phonecode
                    s1.form.country_iso = op.isoCode
                }
            })

        }
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
        if (name == "first_name") {
            s1.form.first_name = value.replace(/[^A-Za-z]/gi, "")
        }
        if (name == "last_name") {
            s1.form.last_name = value.replace(/[^A-Za-z]/gi, "")
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error = this.valdaction()
        }
        this.setState(s1);
    };

    handleMobile = (mobile_number) => {

        let s1 = { ...this.state }

        s1.form.mobile_number = mobile_number
        this.setState(s1)
    }

    valdaction = () => {
        let s1 = { ...this.state }
        let error = {}
        console.log(s1.form)
        // if (s1.form.first_name){

        //     if(!/\s/g.test(s1.form.first_name)&&!/^(?:[A-Za-z]+|\d+)$/.test(s1.form.first_name)){
        //         error.first_name = "* Only Alpha is required"
        //     }
        //     if (/\s/g.test(s1.form.first_name)&&/^(?:[A-Za-z]+|\d+)$/.test(s1.form.first_name)){
        //         error.first_name = "* Space is not required"
        //     }
        // }
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(s1.form.email)) {
            error.email = "*  Email is not valid"
        }
        if (s1.form.email.length > 40) {
            error.email = "*  Email must be less than 40 characters "
        }
        if (s1.form.password.length < 8) {
            error.password = "*  Password must be at least 8 characters"
        }
        if (s1.form.pincode.length > 6) {
            error.pincode = "*  Pincode should be maximum 6 numbers"
        }
        if (s1.form.profile_logo == '') {
            error.profile_logo = "* Profile image is required"
        }
        if (s1.form.first_name == '') {
            error.first_name = "* First Name is required"
        } if (s1.form.mobile.phone == "") {
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
        } if (s1.form.country == '') {
            error.country = "*  Select your country"
        } if (s1.form.state == '') {
            error.state = "*  Select your state"
        } if (s1.form.city == '') {
            error.city = "Select your city"
        } if (s1.form.pincode == '') {
            error.pincode = "* Pincode is required"
        } if (s1.form.address == '') {
            error.address = "*  Address is required"
        } if (s1.form.landmark == '') {
            error.landmark = "*  Landmark is required"
        } if (!s1.form.policy) {
            error.policy = "*  Please check policy"
        }
        return error

    };
    handleSubmint = () => {
        let s1 = { ...this.state }
        s1.error = this.valdaction()
        console.log(s1.error)
        if (Object.keys(s1.error).length === 0) {
            this.props.history.push({
                pathname: '/businessDetails',
                state: {
                    data: this.state.form,
                }
            });
        } else {
            this.setState(s1)
        }
    }

    render() {
        const { message_err, profile_image, profile_logo } = this.state.form;
        let { error } = this.state
        const options = Country.getAllCountries()
        console.log(this.state.logo_error)
        return (<>
            <section class="regiForm_banner" >
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div className="register_form  form-height bg_dark_black d-flex">
                                <div className="vendorwidth1 p-2 align-items-center">
                                    <Container fluid>
                                        <div className="title">
                                            <h1>Register Now</h1>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                                        </div>
                                        <Form className="label_form mt-4" >
                                            <Row>
                                                <Col md={3}>
                                                    {/* <div className="right_bg1_img">
                                                <img src={user} />
                                            </div>
                                            <p className="text-white text-center">Upload Picture</p> */}
                                                    <div className="right_bg1_img">

                                                        <Form.Group className="mt-3">
                                                            <div className="custom-file text-center" >
                                                                <Files
                                                                    className='text-white text-center'
                                                                    onChange={this.onFilesChange}
                                                                    onError={this.onFilesError}
                                                                    // accepts={['.pdf', '.docx', '.doc']}
                                                                    accepts={[ '.png', '.jpg', 'jpeg']}
                                                                    multiple={false}
                                                                    maxFileSize={500000}
                                                                    minFileSize={0}
                                                                    clickable
                                                                    style={{ cursor: "pointer" }}
                                                                    required
                                                                >

                                                                    <img src={profile_logo && profile_logo.preview ? profile_logo.preview.url : user} alt="" />
                                                                    <p>{this.state.form.profile_image ? this.state.form.profile_image : "Upload Picture"}</p>
                                                                </Files>
                                                                {error && error.profile_logo ? <><span className="text-danger">{error.profile_logo}</span></> : ""}
                                                            </div>

                                                        </Form.Group>
                                                    </div>
                                                </Col>
                                                <Col md={9}>

                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="Enter First Name" id="first_name" name="first_name" value={this.state.form.first_name} onChange={this.handleChange} required />
                                                                {error && error.first_name ? <><span className="text-danger">{error.first_name}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>

                                                        <Col lg={6}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="Enter Last Name" id="last_name" name="last_name" value={this.state.form.last_name} onChange={this.handleChange} required />
                                                                {error && error.last_name ? <><span className="text-danger">{error.last_name}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="Email" placeholder="Enter Email" id="email" name="email" value={this.state.form.email} onChange={this.handleChange} required />
                                                                {error && error.email ? <><span className="text-danger">{error.email}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>

                                                        <Col lg={4}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Password <span className="text-danger">*</span></Form.Label><br />
                                                                <PasswordField
                                                                    hintText="At least 8 characters"
                                                                    floatingLabelText="Enter your password"
                                                                    errorText="Your password is too short"
                                                                    name="password"
                                                                    value={this.state.form.password}
                                                                    onChange={this.handleChange}
                                                                    required
                                                                />
                                                                <br />

                                                                {/* <Form.Control type="Password" placeholder="Enter Password" id="password" name="password" value={this.state.form.password} onChange={this.handleChange} required /> */}
                                                                {error && error.password ? <><span className="text-danger">{error.password}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
                                                                <br />
                                                                <PasswordField
                                                                    hintText="At least 8 characters"
                                                                    floatingLabelText="Enter your confirm password"
                                                                    name="confirm_password"
                                                                    value={this.state.form.confirm_password}
                                                                    onChange={this.handleChange}
                                                                    required
                                                                />
                                                                <br />
                                                                {/* <Form.Control type="Password" placeholder="Re-Enter Password" id="confirm_password" name="confirm_password" value={this.state.form.confirm_password} onChange={this.handleChange} required /> */}
                                                                {error && error.confirm_password ? <><span className="text-danger">{error.confirm_password}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>


                                                        <Col lg={4}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
                                                                <ReactIntlTelInput
                                                                    className="mob mob-data"
                                                                    // inputProps={inputProps}
                                                                    // intlTelOpts={intlTelOpts}
                                                                    // name="phone"
                                                                    pattern="[0-9]*"
                                                                    // style={{width: "100%"}}
                                                                    value={this.state.form.mobile}
                                                                    onChange={this.handleMob}
                                                                // onReady={onReady}
                                                                />
                                                                {/* <Row>
                                                            <Col lg={3}>
                                                                <Form.Select id="country_code" name="country_code" value={this.state.form.country_code} onChange={this.handleChange} required>
                                                                    {this.state.form.country_code ? <option>{this.state.form.country_code}</option> : ""}
                                                                    {options.map(op => (
                                                                        <option value={op.phonecode}>{op.flag}{op.phonecode}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                            <Col lg={9}>
                                                                <Form.Control type="Number" placeholder="Enter Mobile" id="mobile_number" name="mobile_number" value={this.state.form.mobile_number} onChange={this.handleChange} required />
                                                            </Col>
                                                        </Row> */}
                                                                {error && error.mobile_number ? <><span className="text-danger">{error.mobile_number}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2 editform1">
                                                                <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                                                                <Form.Select id="gender" name="gender" value={this.state.form.gender} onChange={this.handleChange} required>
                                                                    <option hidden>Select</option>
                                                                    <option>Male</option>
                                                                    <option>Female</option>
                                                                </Form.Select>
                                                                {error && error.gender ? <><span className="text-danger">{error.gender}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="date" placeholder="Enter DOB" id="dob" name="dob" value={this.state.form.dob} onChange={this.handleChange} required />
                                                                {error && error.dob ? <><span className="text-danger">{error.dob}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2 editform1">
                                                                <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                                                                <Form.Select id="country" name="country" selected value={this.state.form.country} onChange={this.handleChange} required>
                                                                    <option >{this.state.form.country ? this.state.form.country : "Select"}</option>
                                                                    {Country.getAllCountries().map(op => (
                                                                        <option value={op.isoCode}>{op.name}</option>
                                                                    ))}

                                                                </Form.Select>
                                                                {error && error.country ? <><span className="text-danger">{error.country}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2 editform1">
                                                                <Form.Label>State <span className="text-danger">*</span></Form.Label>
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
                                                        <Col lg={4}>
                                                            <Form.Group className=" my-2 editform1">
                                                                <Form.Label>City <span className="text-danger">*</span></Form.Label>
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
                                                        <Col lg={8}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="Enter Address" id="address" name="address" value={this.state.form.address} onChange={this.handleChange} required />
                                                                {error && error.address ? <><span className="text-danger">{error.address}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Pin Code <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="number" placeholder="Enter Pincode" id="pincode" name="pincode" value={this.state.form.pincode} onChange={this.handleChange} required />
                                                                {error && error.pincode ? <><span className="text-danger">{error.pincode}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={12}>
                                                            <Form.Group className="my-2">
                                                                <Form.Label>Land mark <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="text" placeholder="Enter Land Mark" id="landmark" name="landmark" value={this.state.form.landmark} onChange={this.handleChange} required />
                                                                {error && error.landmark ? <><span className="text-danger">{error.landmark}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>


                                                    </Row>
                                                    <Row className="mt-4">
                                                        <Col lg={12}>
                                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                                <Form.Check type="checkbox" id="policy" className="check-policy" name="policy" checked={this.state.form.policy} onChange={this.handleChange} label="I agree to the Term & Services and Privacy Policy" required />
                                                                {error && error.policy ? <><span className="text-danger">{error.policy}</span></> : ""}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>



                                                    <Row className="">
                                                        <Col lg={6}>
                                                            <button type="button" className='custom_btn w100' onClick={this.handleSubmint}>Next</button>

                                                            {/* <Link to="/vendor_register" className="custom_btn w100">Next</Link> */}
                                                        </Col>
                                                        <Col className="loginlink1" lg={6}>
                                                            <Link to="/login" className="custom_btn1 w100">Already have an account? <span className="loginlink">LOGIN</span> </Link>
                                                        </Col>
                                                    </Row>

                                                </Col>
                                            </Row>
                                        </Form>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>)


    }
}
export default Registervendor;