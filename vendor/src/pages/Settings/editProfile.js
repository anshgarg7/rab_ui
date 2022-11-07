import React, { Component } from 'react';
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab, TabPane } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import user from '../../assets/images/dummy_profile.png';
import Files from 'react-files';
import http from "../../Helper/http";
import auth from "../../services/auth";
import SweetAlert from 'react-bootstrap-sweetalert';
import Spinner from "react-bootstrap/Spinner";
import ReactIntlTelInput from 'react-intl-tel-input-v2';
// import 'react-intl-tel-input/dist/main.css';
import { Country, State, City } from 'country-state-city';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import auth from '../../services/auth';
class editProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                first_name: "",
                last_name: "",
                gender: "",
                dob: "",
                country: "",
                mobile:{  },
                state: "",
                city: "",
                pin_code: null,
                address: "",
                landmark: "",
                profile_image: "",
                image: "",
            },
            oldMob: "",
            message_err: "",
            logo_error: "",
            error: {},
            countryVal: "",
            stateVal: "",
            cityVal: "",
            loading: false,
            Success: false,
            Success_message: "",

        };
    }
    componentDidMount() {
        let s1 = { ...this.state }

        s1.form = this.props.profile ? this.props.profile : s1.form
        if(this.props.profile.country_code ){
            s1.form.mobile={ iso2: this.props.profile.country_iso  , dialCode: this.props.profile.country_code , phone: this.props.profile.mobile_no }
        }
        this.setState(s1)
    }

    onFilesChange = (files) => {
        let s1 = { ...this.state }
        if (files[0]) {
            s1.form["image"] = files[0]
            s1.form["profile_image"] = files[0].name
            s1.logo_error = ""
        }
        this.setState(s1)
    }
    onFilesError = (error, file) => {
        this.setState({
            logo_error: error.message + "limit upto 3MB max"
        })
    }
    handleMob=(event)=>{
        let s1 = {...this.state}
        console.log(event)
        s1.form.mobile=event
        this.setState(s1)
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event)
        let s1 = { ...this.state }
        if (name == "country") {
            s1.countryVal = value
            Country.getAllCountries().map(op => {
                if (s1.countryVal == op.isoCode) {
                    s1.form.country = op.name
                }
            })
        } else if (name == "state") {
            s1.stateVal = value
            State.getStatesOfCountry(s1.countryVal).map(op => {
                if (s1.stateVal == op.isoCode) {
                    s1.form.state = op.name
                }
            })
        } else if (name == "policy") {
            s1.form[name] = event.target.checked
        } else {
            s1.form[name] = value
        }
        console.log(s1.form)
        this.setState(s1);
    };

    valdaction = () => {
        let s1 = { ...this.state }
        let error = {}
        if (s1.form.first_name == '') {
            error.first_name = "* First Name is required"
        }
        if (s1.form.dob == '') {
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
        }
        return error

    };
    editProfileAPI = async () => {
        this.setState({ loading: true })
        var formdata = new FormData();
        formdata.append("first_name", this.state.form.first_name);
        formdata.append("last_name", this.state.form.last_name);
        formdata.append("mobile_no", this.state.form.mobile.phone);
        formdata.append("gender", this.state.form.gender);
        formdata.append("dob", this.state.form.dob);
        formdata.append("country", this.state.form.country);
        formdata.append("country_code", `+${this.state.form.mobile.dialCode}`);
        formdata.append("country_iso", this.state.form.mobile.iso2);
        formdata.append("state", this.state.form.state);
        formdata.append("city", this.state.form.city);
        formdata.append("pin_code", this.state.form.pin_code);
        formdata.append("address", this.state.form.address);
        formdata.append("landmark", this.state.form.landmark);
        // formdata.append("image", this.state.form.image);
        // =================================== //

        await http.postData(`v1/vendor/update/profile`, formdata)
            .then(result => {
                console.log("===================", result);
                if (result.data.status === 200) {
                    console.log("====", result.data.data.is_otp_verified);
                    if (result.data.data.is_otp_verified == 0) {
                        this.setState({
                            Danger: true,
                            // Success_message: "please verifed your mobile no then login",
                            loading: false
                        })
                    } else {
                        this.setState({
                            Success: true,
                            Success_message: result.data.message,
                            loading: false
                        })
                    }
                }
                else if (result && result.data.status === 400) {
                    this.setState({
                        Danger: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else {
                    console.log(result.data.message)
                }
            })
            .catch(error => {
                this.setState({
                    message_err: error,
                })
            });

    }
    handleChangeMob = (res) => {
        this.setState({
            Danger: true,
            Success_message: "please verifed your mobile no then login",
            loading: false
        })
    }

    handleSubmint = () => {
        let s1 = { ...this.state }
        s1.error = this.valdaction()
        if (Object.keys(s1.error).length === 0) {
            this.editProfileAPI()
        } else {
            this.setState(s1)
        }
    };

    onSuccess = () => {
        this.setState({
            Success: false,
            Success_message: "",
            loading: false
        })
        // this.props.history.push({
        //     pathname: '/verifyOtp',
        //     state: {
        //         data: this.state.form.mobile
        //     }
        // });

        // window.location.reload()
    };

    danger = () => {
        auth.logout()
        window.location.reload("/verifyOtp")
    }

    render() {
        // const value = { iso2: 'cn', dialCode: '86', phone: '12345678901' };

        const { message_err, profile_image, image, } = this.state.form;
        let { error, Success, Danger, Success_message, loading } = this.state
        const options = Country.getAllCountries()

        return (

            <div className='="pt-4'>
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
                        success
                        title="Profie Updated Successfully"
                        customButtons={
                            <React.Fragment>

                                <Link to={{ state: { data: this.state.form.mobile } }}   ><button onClick={() => this.danger()} type="button" className='custom_btn w50'>OK</button></Link>
                            </React.Fragment>
                        }
                    >
                        Please verifed your mobile number
                    </SweetAlert> : ''
                }
                <div className="vendorwidth1 p-2 d-flex align-items-center">
                    <Container fluid>
                        <div className="title">
                            <h1>Edit Now</h1>
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
                                        <img src={image && image.preview ? image.preview.url : image} alt="" />
                                        <Form.Group className="mt-3">
                                            <div className="custom-file" >
                                                <Files
                                                    className='text-white text-center'
                                                    onChange={this.onFilesChange}
                                                    onError={this.onFilesError}
                                                    // accepts={['.pdf', '.docx', '.doc']}
                                                    accepts={['image/*', '.pdf']}
                                                    multiple={false}
                                                    maxFileSize={10000000}
                                                    minFileSize={0}
                                                    clickable
                                                    style={{ cursor: "pointer" }}
                                                    required
                                                >
                                                    {this.state.form.profile_image ? this.state.form.profile_image : "Upload Picture"}
                                                </Files>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col md={9}>

                                    <Row>
                                        <Col lg={6}>
                                            <Form.Group className="my-2">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter First Name" id="first_name" name="first_name" value={this.state.form.first_name} onChange={this.handleChange} required />
                                                {error && error.first_name ? <><span className="text-danger">{error.first_name}</span></> : ""}
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group className="my-2">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Last Name" id="last_name" name="last_name" value={this.state.form.last_name} onChange={this.handleChange} required />
                                            </Form.Group>
                                        </Col>

                                        <Col lg={6}>
                                            <Form.Group className="my-2 editform1">
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
                                            <Form.Group className="my-2">
                                                <Form.Label>Date of Birth</Form.Label>
                                                <Form.Control type="date" placeholder="Enter DOB" id="dob" name="dob" value={this.state.form.dob} onChange={this.handleChange} required />
                                                {error && error.dob ? <><span className="text-danger">{error.dob}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="my-2">
                                                <Form.Label>Mobile Number</Form.Label>
                                           
                                                    {/* <IntlTelInput
                                                        // value={this.state.form.mobile_no}
                                                        //  onChange={this.handleChange}
                                                        containerClassName="intl-tel-input"
                                                        inputClassName="form-control"handleMob
                                                        onPhoneNumberChange={(...args) => {
                                                            this.formatPhoneNumberOutput(...args)
                                                            // setFieldValue(name, this.formatPhoneNumberOutput(...args));
                                                        }} /> */}
                                                    <ReactIntlTelInput
                                                    className="mob mob-data"
                                                        // inputProps={inputProps}
                                                        // intlTelOpts={intlTelOpts}
                                                        // name="phone"
                                                        value={this.state.form.mobile}
                                                        onChange={this.handleMob}
                                                    // onReady={onReady}
                                                    />

                                      

                                            </Form.Group>

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
                                                        <Form.Control type="text" placeholder="Enter Last Name" id="mobile_no" name="mobile_no" value={this.state.form.mobile_no} onChange={this.handleChange} required />
                                                    </Col>
                                                </Row> */}

                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="my-2">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Address" id="address" name="address" value={this.state.form.address} onChange={this.handleChange} required />
                                                {error && error.address ? <><span className="text-danger">{error.address}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="my-2">
                                                <Form.Label>Land mark</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Land Mark" id="landmark" name="landmark" value={this.state.form.landmark} onChange={this.handleChange} required />
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
                                                    {this.state.countryVal &&
                                                        State.getStatesOfCountry(this.state.countryVal).map(op => (
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
                                                    {this.state.countryVal && this.state.stateVal &&
                                                        City.getCitiesOfState(this.state.countryVal, this.state.stateVal).map(op => (
                                                            <option value={op.name}>{op.name}</option>
                                                        ))}

                                                </Form.Select>
                                                {error && error.city ? <><span className="text-danger">{error.city}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6}>
                                            <Form.Group className="my-2">
                                                <Form.Label>Pin Code</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Pincode" id="pincode" name="pin_code" value={this.state.form.pin_code} onChange={this.handleChange} required />
                                                {error && error.pincode ? <><span className="text-danger">{error.pincode}</span></> : ""}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="pt-3">
                                        <Col lg={6}>
                                            <button type="button" className='custom_btn w100' onClick={this.handleSubmint}>Submit</button>
                                            {/* {loading ?
                                                <Spinner animation="border" role="status" className="spinner_custom" style={{ color: '#fff' }}>
                                                </Spinner>
                                                : ""
                                            } */}
                                        </Col>
                                        <Col lg={6}>
                                            <button type="button" className='custom_btn w100' onClick={() => this.props.handleEvent("Profile")}>Back</button>


                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

export default editProfile;