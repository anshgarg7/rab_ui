import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import user_profile from '../../assets/images/dummy_profile.png';

import http from "../../Helper/http";
import Files from 'react-files';
import PlacesAutocomplete from 'react-places-autocomplete';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Country, State, City } from 'country-state-city';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
// import 'react-intl-tel-input/dist/main.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
class BusinessDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                exact_location_name: "",
                location_image: "",
                business_name: '',
                alterMobile: {iso2: 'in', dialCode: '91'},
                category_id: '',
                location: '',
                lat: '',
                lng: '',
                description: '',
                is_visiting_card: '1',
                gst_no: '',
                aletrnate_country_code: "",
                aletrnate_country_iso: "",
            },
            error: {},
            categoryData: [],
            visiting_card_image: "",
            visiting_card_image2: "",
            logo_error: "",
            award_certification_image: "",
            award_certification_image2: "",
            loader: false,
            Danger: false,
            Success_message: "",
        };
    }
    valdaction = () => {
        let s1 = { ...this.state }
        let error = {}

        if (s1.form.business_name && s1.form.business_name.length > 50) {
            error.business_name = "*  Business must be at least 50 characters"
        }
        if (s1.form.business_name == '' || s1.form.business_name == undefined) {
            error.business_name = "* Business Name is required"
        } if (s1.form.category_id == "") {
            error.category_id = "*  Category  is required"
        } if (s1.form.gst_no == '') {
            error.gst_no = "*  GST is required"
        }
        if (s1.form.location == '') {
            error.location = "*  Loaction is required"
        }
        if (s1.form.description == '') {
            error.description = "*  Description is required"
        } if (s1.form.is_visiting_card == '') {
            error.is_visiting_card = "*  Visiting Card is required"
        }
        if (s1.form.is_visiting_card == "1") {
            if (s1.visiting_card_image2 == '') {
                error.visiting_card_image2 = "*  Please upload your card"
            } if (s1.award_certification_image2 == '') {
                error.award_certification_image2 = "*  Please upload your Awards & Certifications"
            }
        }
        return error
    };

    onFilesChange = (files) => {
        if (files[0]) {
            this.setState({
                visiting_card_image2: files[0],
                visiting_card_image: files[0].name,
                logo_error: "",
            })
        }
    }
    onFilesError = (error, file) => {
        this.setState({
            logo_error: error.message + "limit upto 3MB max"
        })
    }

    onFilesChange2 = (files) => {
        if (files[0]) {
            this.setState({
                award_certification_image2: files[0],
                award_certification_image: files[0].name,
                award_certification_error: "",
            })
        }
    }
    handleMob = (event) => {
        let s1 = { ...this.state }
        const result = event.phone.replace(/\D/g, '');
        event.phone = result
        s1.form.alterMobile = event
        this.setState(s1)
    }
    onFilesError2 = (error, file) => {
        this.setState({
            award_certification_error: error.message + "limit upto 3MB max"
        })
    }

    componentDidMount = () => {
        if (this.props.history.location.state) {
            this.setState({ form: this.props.history.location.state.data })
        }
        this.getCategories();
        this.createScriptLoadMap();

    }

    getCategories = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${http.BaseURL}/api/v1/categories`, requestOptions)

            .then(response => response.json())
            .then(result => {
                this.setState({
                    categoryData: result.data
                });
            })
            .catch(error => {
                this.setState({
                    categoryData: []
                });
            });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let s1 = { ...this.state }

        if (name == "aletrnate_country_code") {
            Country.getAllCountries().map(op => {
                if (value == op.phonecode) {
                    s1.form.aletrnate_country_code = op.phonecode
                    s1.form.aletrnate_country_iso = op.isoCode
                }
            })

        }
        s1.form[name] = value
        if (name == "gst_no") {
            s1.form.gst_no = value.replace(/[^\w\s]/gi, '')
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error = this.valdaction()
        }
        this.setState(s1);
    };

    signupAPI = () => {
        this.setState({ loader: true })

        this.setState({
            message_err: ""
        })
        var formdata = new FormData();
        //===================== Persnal Details ================////////
        formdata.append("first_name", this.state.form.first_name);
        formdata.append("last_name", this.state.form.last_name);
        formdata.append("mobile_no", this.state.form.mobile.phone);
        formdata.append("email", this.state.form.email);
        formdata.append("password", this.state.form.password);
        formdata.append("confirm_password", this.state.form.confirm_password);
        formdata.append("gender", this.state.form.gender);
        formdata.append("dob", this.state.form.dob);
        formdata.append("country", this.state.form.country);
        formdata.append("country_iso", this.state.form.mobile.iso2);
        formdata.append("country_code", `+${this.state.form.mobile.dialCode}`);
        formdata.append("state", this.state.form.state);
        formdata.append("city", this.state.form.city);
        formdata.append("pin_code", this.state.form.pincode);
        formdata.append("address", this.state.form.address);
        formdata.append("landmark", this.state.form.landmark);
        formdata.append("image", this.state.form.profile_logo);
        // ================Business Details=================== //
        formdata.append("business_name", this.state.form.business_name);
        // formdata.append("aletrnate_mobile_no", this.state.form.aletrnate_mobile_no);
        formdata.append("category_id", this.state.form.category_id);
        formdata.append("description", this.state.form.description);
        formdata.append("location", this.state.form.location);
        formdata.append("is_visiting_card", this.state.form.is_visiting_card);
        formdata.append("visiting_card_image", this.state.visiting_card_image2);
        formdata.append("award_certification_image", this.state.award_certification_image2);
        formdata.append("latitude", this.state.form.lat);
        formdata.append("longitude", this.state.form.lng);
        formdata.append("location_image", this.state.form.location_image);
        formdata.append("exact_location_name", this.state.form.exact_location_name);
        formdata.append("gst_no", this.state.form.gst_no);
        formdata.append("aletrnate_country_iso", this.state.form.alterMobile.iso2);
        formdata.append("aletrnate_country_code", `+${this.state.form.alterMobile.dialCode}`);
        formdata.append("aletrnate_mobile_no", this.state.form.alterMobile.phone);
        formdata.append("device_type", "Web");



        ///////////////====================///////////////
        http.Login_APi(`v1/vendor/signup`, formdata)
            .then(result => {
                if (result.data.status === 200) {
                    this.props.history.push({
                        pathname: '/verifyOtp',
                        state: {
                            data: this.props.history.location.state.data.mobile_number,
                            formData: this.props.history.location.state.data,
                            data2: this.state.form,
                        }
                    });
                    this.setState({ loader: false })
                }
                else if (result.data.status === 400) {
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

    handleSubmint = () => {
        let s1 = { ...this.state }
        s1.error = this.valdaction()
        if (Object.keys(s1.error).length === 0) {
            this.signupAPI()
        } else {
            this.setState(s1)
        }
    };

    backtoRegister = () => {
        this.props.history.push({
            pathname: '/registerNow',
            state: {
                data: this.state.form,
            }
        });
    };

    // Geo Location //
    initialize = () => {
        let placeSearch;
        let autocomplete;
        let google = window.google;
        let s1 = { ...this.state }
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            { types: ["geocode"] }
        );
        autocomplete.addListener("place_changed", function () {
            placeSearch = autocomplete.getPlace();
            if (placeSearch) {
                this.loactionSubmit(placeSearch)
            }
        }.bind(this));
    };

    loactionSubmit = (placeSearch) => {
        let s1 = { ...this.state }
        if (placeSearch.photos && placeSearch.photos[0] && placeSearch.photos[0].getUrl()) {
            s1.form.location_image = placeSearch.photos[0].getUrl()
        }
        s1.form.exact_location_name = placeSearch.name
        s1.form.location = placeSearch.formatted_address
        s1.form.lat = placeSearch.geometry.location.lat()
        s1.form.lng = placeSearch.geometry.location.lng()
        this.setState(s1)
    }

    createScriptLoadMap = () => {
        var gScript = document.querySelector("[data-setted]");
        var isSetted = gScript && gScript.getAttribute("data-setted");

        if (!isSetted) {
            var index = document.getElementsByTagName("script")[0];
            var script = document.createElement("script");
            script.src =
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDk_8w619G2LteJdDgBARkj0sNR4jMFhPc&libraries=places&callback=initialize";
            script.async = true;
            script.defer = true;
            script.setAttribute("data-setted", true);
            index.parentNode.insertBefore(script, index);
            window.initialize = this.initialize();
        } else {
            this.initialize();
        }
    };

    //   handleChangeLoaction = (e) =>{
    //       console.log(e)
    //     let placeSearch;
    //     let autocomplete;
    //     let google = window.google;
    //     let s1 = {...this.state}
    //     //use Places Autocomplete
    //     autocomplete = new google.maps.places.Autocomplete( e,{ types: ["geocode"] });
    //     // When the user selects an address from the drop-down, populate the
    //     // address fields in the form.
    //     autocomplete.addListener("place_changed", function () {
    //         placeSearch = autocomplete.getPlace();
    //         console.log(placeSearch);
    //         if(placeSearch){
    //             this.loactionSubmit(placeSearch)
    //         // if(placeSearch.photos&&placeSearch.photos[0]&&placeSearch.photos[0].getUrl()){
    //         //     s1.loactionForm.location_image=placeSearch.photos[0].getUrl()
    //         // }
    //         // s1.loactionForm.exact_location_name=placeSearch.name
    //         // s1.loactionForm.location=placeSearch.formatted_address
    //         // s1.loactionForm.lat=placeSearch.geometry.location.lat()
    //         // s1.loactionForm.lng=placeSearch.geometry.location.lng()
    //         // this.setState(s1)
    //         }
    //     }.bind(this));

    //   }


    // handleChange1 = location => {
    //     let s1 = {...this.state}
    //     s1.form.location=location
    //     this.setState(s1);
    // };

    // handleSelect = async (location) => {
    //     let s1 = {...this.state}
    //     let res = await geocodeByAddress(location)
    //     let lang =  await getLatLng(res[0])
    //     s1.form.location=res[0].formatted_address
    //     s1.form.lat=lang.lat
    //     s1.form.lng=lang.lng
    //     this.setState(s1)
    // };

    danger = () => {
        this.setState({
            Danger: false,
            Success_message: "",
            loader: false

        })
    }
    render() {
        const { categoryData, error, Danger, Success_message, loader } = this.state;
        const options = Country.getAllCountries()

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

                <section class="regiForm_banner" >
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div className="register_form  form-height bg_dark_black d-flex">
                                    <div className="vendorwidth1 p-2 align-items-center">
                                        <Container fluid>
                                            <div className="title">
                                                <h1>Business Details</h1>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                                            </div>
                                            <Row>
                                                <Col lg={3}>
                                                    <div className="profile_image mt-5">
                                                        <img src={this.state.form.profile_logo && this.state.form.profile_logo.preview ? this.state.form.profile_logo.preview.url : user_profile} alt="" />
                                                    </div>
                                                </Col>
                                                <Col lg={9}>
                                                    <Form className="label_form mt-4" >
                                                        <Row>
                                                            <Col lg={6}>
                                                                <Form.Group className="mt-3 mb-3">
                                                                    <Form.Label>Business Name <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control type="text" placeholder="Enter First Name" id="business_name" name="business_name" value={this.state.form.business_name} onChange={this.handleChange} />
                                                                    {error && error.business_name ? <><span className="text-danger">{error.business_name}</span></> : ""}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <Form.Group className="mt-3 mb-3">
                                                                    <Form.Label>GST Name <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control type="text" placeholder="Enter First Name" id="gst_no" name="gst_no" value={this.state.form.gst_no} onChange={this.handleChange} />
                                                                    {error && error.gst_no ? <><span className="text-danger">{error.gst_no}</span></> : ""}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <Form.Group className="mt-3 mb-3">
                                                                    <Form.Label>Alternative Phone Number <span className="text-danger">*</span></Form.Label>
                                                                    <ReactIntlTelInput
                                                                        className="mob"
                                                                        // inputProps={inputProps}
                                                                        // intlTelOpts={intlTelOpts}
                                                                        // name="phone"
                                                                        value={this.state.form.alterMobile}
                                                                        onChange={this.handleMob}
                                                                    // onReady={onReady}
                                                                    />
                                                                    {/* <Row>
                                                            <Col lg={3}>
                                                                <Form.Select id="aletrnate_country_code" name="aletrnate_country_code" value={this.state.form.aletrnate_country_code} onChange={this.handleChange} required>
                                                                    {options.map(op => (
                                                                        <option value={op.phonecode}>{op.flag}{op.phonecode}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                            <Col lg={9}>
                                                            <Form.Control type="number" placeholder="Enter Number" id="aletrnate_mobile_no" name="aletrnate_mobile_no" value={this.state.form.aletrnate_mobile_no} onChange={this.handleChange} />
                                                            </Col>
                                                            </Row> */}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <Form.Group className="mt-3 mb-3 editform1">
                                                                    <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Select id="category_id" name="category_id" onChange={this.handleChange}>
                                                                        <option>Select Category</option>
                                                                        {categoryData.map((i, index) => (
                                                                            <option selected={this.state.form.category_id == i.id} value={i.id}>{i.title}</option>
                                                                        ))}
                                                                    </Form.Select>
                                                                    {error && error.category_id ? <><span className="text-danger">{error.category_id}</span></> : ""}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={4}>
                                                                <Form.Group className="mt-3 mb-3">
                                                                    <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                                                                    <div id="locationField">
                                                                        <Form.Control type="text" placeholder="Please Search and Select Location" id="autocomplete" />

                                                                    </div>
                                                                    {/* Geo Location  */}

                                                                    <PlacesAutocomplete
                                                                        value={this.state.form.location}
                                                                        onChange={this.handleChange1}
                                                                        onSelect={this.handleSelect}
                                                                    >
                                                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                            <div>
                                                                                <input
                                                                                    {...getInputProps({
                                                                                        placeholder: 'Please Search and Select Location',
                                                                                        className: 'form-control',
                                                                                        type: "hidden"
                                                                                    })}
                                                                                />
                                                                                <div className="autocomplete-dropdown-container">
                                                                                    {loading && <div>Loading...</div>}
                                                                                    {suggestions.map(suggestion => {
                                                                                        const className = suggestion.active
                                                                                            ? 'suggestion-item--active'
                                                                                            : 'suggestion-item';
                                                                                        // inline style for demonstration purpose
                                                                                        const style = suggestion.active
                                                                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                                        return (
                                                                                            <div
                                                                                                {...getSuggestionItemProps(suggestion, {
                                                                                                    className,
                                                                                                    style,
                                                                                                })}
                                                                                            >
                                                                                                <span>{suggestion.description}</span>
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </PlacesAutocomplete>

                                                                    {/* ========= */}

                                                                    {/* <Form.Control type="text" placeholder="Enter Location" id="location" name="location" value={this.state.form.location} onChange={this.handleChange} /> */}
                                                                    {error && error.location ? <><span className="text-danger">{error.location}</span></> : ""}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="mt-3 mb-3">
                                                                    <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control as="textarea" id="description" name="description" value={this.state.form.description} onChange={this.handleChange} rows={3} />
                                                                    {error && error.description ? <><span className="text-danger">{error.description}</span></> : ""}
                                                                </Form.Group>
                                                            </Col>
                                                            <Col lg={12}>
                                                                <Form.Group className="mt-3 mb-3">
                                                                    <Form.Label>Do you have visiting card? <span className="text-danger">*</span></Form.Label>
                                                                    <div className="mb-3">
                                                                        <div className="d-flex">
                                                                            <Form.Check
                                                                                type="radio"
                                                                                label="Yes"
                                                                                value="1"
                                                                                checked={this.state.form.is_visiting_card == "1"}
                                                                                className="me-4"
                                                                                name="is_visiting_card"
                                                                                onChange={this.handleChange}
                                                                            />
                                                                            <Form.Check
                                                                                type="radio"
                                                                                label="No"
                                                                                value="0"
                                                                                checked={this.state.form.is_visiting_card == "0"}
                                                                                name="is_visiting_card"
                                                                                onChange={this.handleChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {error && error.is_visiting_card ? <><span className="text-danger">{error.is_visiting_card}</span></> : ""}
                                                                </Form.Group>
                                                            </Col>
                                                            {this.state.form.is_visiting_card == "1" ? <>
                                                                <Col lg={6}>
                                                                    <Form.Group className="mt-3 mb-3 upload_btn">
                                                                        <Form.Label>Upload Card </Form.Label>
                                                                        <Form.Control type="Email" placeholder="Upload file" value={this.state.visiting_card_image ? this.state.visiting_card_image : ""} />
                                                                        <div className="custom-file" >
                                                                            <Files
                                                                                className='custom_btn'
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
                                                                                {"Upload"}
                                                                            </Files>
                                                                        </div>
                                                                        {error && error.visiting_card_image2 ? <><span className="text-danger">{error.visiting_card_image2}</span></> : ""}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Form.Group className="mt-3 mb-3 upload_btn">
                                                                        <Form.Label>Upload Awards & Certification6s</Form.Label>
                                                                        <Form.Control type="disabled" placeholder="Upload file" value={this.state.award_certification_image ? this.state.award_certification_image : ""} />
                                                                        <div className="custom-file" >
                                                                            <Files
                                                                                className='custom_btn'
                                                                                onChange={this.onFilesChange2}
                                                                                onError={this.onFilesError2}
                                                                                accepts={['image/*', '.gif', '.png', '.jpg', 'jpeg']}
                                                                                multiple={false}
                                                                                maxFileSize={10000000}
                                                                                minFileSize={0}
                                                                                clickable
                                                                                style={{ cursor: "pointer" }}
                                                                                required
                                                                            >
                                                                                {"Upload"}
                                                                            </Files>
                                                                        </div>
                                                                        {error && error.award_certification_image2 ? <><span className="text-danger">{error.award_certification_image2}</span></> : ""}
                                                                    </Form.Group>
                                                                </Col>
                                                            </>

                                                                : ""
                                                            }
                                                        </Row>
                                                        <Row className="mt-4">
                                                            <Col lg={6}>
                                                                <button type="button" className='custom_btn w100' onClick={this.handleSubmint}>SUBMIT</button>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <button type="button" className='custom_btn w100' onClick={this.backtoRegister}>Back</button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                {/*  */}
            </>)
    }
}
export default BusinessDetails;