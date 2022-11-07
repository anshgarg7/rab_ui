import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import user_profile from '../../assets/images/dummy_profile.png';
import Files from 'react-files';
import http from "../../Helper/http"
import Button from "@restart/ui/esm/Button";
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class KycDetails extends Component {
    state = {
        profile: this.props.profile,
        identity: "",
        identity2: "",
        logo_error: "",
        message_err: "",
        success: false,
        error: {}
    };



    addKYC = async () => {
        this.setState({
            message_err: "",loder:true
        })
        console.log(this.state.identity2)
        var formdata = new FormData();
        formdata.append("identity", this.state.identity2 ? this.state.identity2 : '');

        await http.postData(`v1/vendor/kyc`, formdata)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    this.setState({
                        success: true, Infinity: "", identity2: '',loder:false
                    })
                }
                else {
                    this.setState({
                        message_err: data.message,loder:false
                    })
                }
            })
            .catch(error => {
                console.log(error)
            });
    };
    valdaction = () => {
        let s1 = { ...this.state }
        let error = {}
        if (s1.identity2 == '') {
            error.identity2 = "* Please upload your document"
        }
        return error
    };

    handleSubmit = () => {
        let s1 = { ...this.state }
        s1.error = this.valdaction()
        console.log(s1.error)
        if (Object.keys(s1.error).length === 0) {
            this.addKYC()
        } else {
            this.setState(s1)

        }
    }



    onFilesChange = (files) => {
        if (files[0]) {
            this.setState({
                identity2: files[0],
                identity: files[0].name,
                logo_error: "",
            })
        }
    }
    onFilesError = (error, file) => {
        this.setState({
            logo_error: error.message + "limit upto 3MB max"
        })
    }


    render() {
        const { categoryData, profile, message_err, identity, identity2, error, success } = this.state;
        console.log("kyc details screen", this.props.profile)
        return (
            <div className="p-4 d-flex align-items-center">
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.loder}
                // open="true"
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {
                    success ? <SweetAlert
                        success
                        // closeOnClickOutside={true}
                        confirmBtnBsStyle="danger"
                        title="Success"
                        onConfirm={() => this.setState({ success: false, identity: "", identity2: "", error: {} })}
                    >
                        Your KYC Done Successfully
                    </SweetAlert> : ''
                }
                <Container fluid>
                    <div className="title">
                        <h1>KYC Details</h1>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <Form className="label_form mt-4" >
                                <Row>
                                    <h4 className="sec_tite mt-3" > KYC</h4>
                                    <Col lg={6}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" disabled value={this.props.profile && this.props.profile.first_name && this.props.profile.first_name} placeholder="Enter Name" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mt-3 mb-3">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" disabled value={this.props.profile && this.props.profile.address && this.props.profile.address} placeholder="Enter Address" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group className="mt-3 mb-3 upload_btn">
                                            <Form.Label>Upload Government Verified ID</Form.Label>
                                            <Form.Control type="text" value={identity} placeholder="Upload file" />

                                            <div className="custom-file">
                                                <input type="file" id="actual-btn" hidden />
                                                <label for="actual-btn" className="custom_btn">Upload</label>
                                            </div>
                                            <div className="custom-file" >
                                                <Files
                                                    className='custom_btn'
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
                                                    {"Upload"}
                                                </Files>
                                            </div>
                                            {error && error.identity2 ? <span className="text-danger">{error.identity2}</span> : ""}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col lg={6}>
                                        <Button className="custom_btn w100" onClick={() => this.handleSubmit()}>SUBMIT</Button>
                                        {message_err ? <p style={{ color: "red", fontSize: "15px" }}> {message_err} </p> : ""}
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>)
    }

}
export default KycDetails