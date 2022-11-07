import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';
import user_profile from '../../assets/images/dummy_profile.png';
import Files from 'react-files';

class Vendorregisterkycdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: [],
            business_name: '',
            aletrnate_mobile_no: '',
            category_id: '',
            location: '',
            description: '',
            is_visiting_card: '',
            visiting_card_image: '',
            award_certification_image: '',

            identity: "",
            identity2: "",
            logo_error: "",

        };
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
        const { categoryData, message_err, identity, identity2 } = this.state;
        return (<>
            <div className="register_form bg_dark_black">
                <Row className="m-0">
                    <Col lg={3} md={12}>
                        <div className="">
                            <div className="right_bg_img">
                                <img src={register_bg} />
                            </div>
                        </div>
                    </Col>
                    <Col lg={9} md={12}>
                        <div className="p-4 d-flex align-items-center">
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
                                                        <Form.Control type="text" placeholder="Enter Name" />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={6}>
                                                    <Form.Group className="mt-3 mb-3">
                                                        <Form.Label>Address</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Address" />
                                                    </Form.Group>
                                                </Col>
                                                <Col lg={12}>
                                                    <Form.Group className="mt-3 mb-3 upload_btn">
                                                        <Form.Label>Upload Government Verified ID</Form.Label>
                                                        <Form.Control type="Email" placeholder="Upload file" />

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
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mt-4">
                                                <Col lg={6}>
                                                    <Link to="/vendorregisterbankdetails" className="custom_btn w100">SUBMIT</Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>

            </div>

        </>)


    }
}
export default Vendorregisterkycdetails;