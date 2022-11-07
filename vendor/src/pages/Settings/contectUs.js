import React, { useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import '../../assets/css/style.css';
import vist_img from '../../assets/images/vist.png';
import award_img from '../../assets/images/award.png';
import http from "../../Helper/http";
import SweetAlert from 'react-bootstrap-sweetalert';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const ContentUs = (props) => {
    let profile = props.profile
    // Contact Us Form Start
    const [contactform, setContactForm] = useState({
        email: "",
        subject: "",
        message: "",
    })
    const [loder, setLoder] = useState(false)
    const [massege_err, setMassege] = useState("")
    const [alert, setAlert] = useState({
        warning: false,
        message: "",
        contactSuccess: false,
        contactMessage: "",
    })

    const onContactSuccess = () => {
        setAlert({ ...alert, contactSuccess: false, contactMessage: "" })
        setContactForm({ ...contactform, message: "" })
    }
    const handleContactForm = async () => {
        setLoder(true)
        var urlencoded = new URLSearchParams();
        urlencoded.append("first_name", profile.first_name);
        urlencoded.append("last_name", profile.last_name);
        urlencoded.append("email", profile.email);
        urlencoded.append("mobile_no", profile.mobile_no);
        urlencoded.append("message", contactform.message);

        await http.postData(`v1/vendor/contact_us/store`, urlencoded)
            .then(result => {
                let { data } = result;
                // console.log(data);
                if (data && data.status === 200) {

                    setAlert({ ...alert, contactSuccess: true, contactMessage: data.message })
                    setLoder(false)
                }
                else if (data && data.status === 400) {
                    setAlert({ ...alert, warning: true, message: result.data.message })
                    setLoder(false)
                }
                else {
                    setAlert({ ...alert, warning: true, message: result.data.message })
                    setLoder(false)
                }
            })
            .catch(error => {
                setMassege(error)
                setLoder(false)

            });
    }

    const handleChange = (text) => {
        setContactForm({ ...contactform, message: text })
    };

    // Contact Us Form End


    return (<div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loder}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        {
            alert.warning ?
                <SweetAlert
                    danger
                    confirmBtnBsStyle="danger"
                    title={alert.message}
                    onConfirm={() => setAlert({ ...alert, warning: false, message: "" })}
                    focusCancelBtn
                >
                </SweetAlert> : ""
        }
        {
            alert.contactSuccess ?
                <SweetAlert
                    success
                    title={alert.contactMessage}
                    confirmBtnBsStyle={'danger'}
                    onConfirm={() => onContactSuccess()}
                >
                </SweetAlert> : ""
        }
        <Container fluid>
            <Row>
                <Col md={12}>
                    <div className="mainfile mt-3">
                        <div className="formcolr">

                            <h6 className="meefont text-white bfont">Contact Us</h6>

                            <Row className="mb-3">
                                <Col lg={6} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Email Address</Form.Label>
                                        <Form.Control className="cus" type="text" name="email" value={profile && profile ? profile.email : ""} placeholder="Enter Email Address" readOnly />
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Mobile Number</Form.Label>
                                        <Form.Control className="cus" type="text" name="mobile_no" value={profile && profile ? profile.mobile_no : ""} readOnly />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Message</Form.Label>
                                        <div className="form-group">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={contactform.message}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    handleChange(data);
                                                }}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    // console.log('Editor is ready to use!', editor);
                                                }}
                                                onBlur={(event, editor) => {
                                                    // console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    // console.log('Focus.', editor);
                                                }}
                                            />
                                        </div>


                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} >
                                    <div className="addbutt text-center mb-2">
                                        <Button variant="secondary" className="custom_btn" onClick={() => handleContactForm()}>Submit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>)
}
export default ContentUs