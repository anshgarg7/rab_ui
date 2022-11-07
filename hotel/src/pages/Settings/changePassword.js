import React, { Component } from 'react';
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab } from "react-bootstrap";
import '../../assets/css/style.css';
// import vist_img from '../../assets/images/vist.png';
// import award_img from '../../assets/images/award.png';
import auth from "../../services/auth";
import http from "../../Helper/http";
import SweetAlert from 'react-bootstrap-sweetalert';
import Spinner from "react-bootstrap/Spinner";
import Slide from '@mui/material/Slide';
import { Snackbar, Alert } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function TransitionDown(props) {
    return <Slide {...props} direction="left" />;
}
class changePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldpassword: '',
            password: '',
            confirm_password: '',
            loading: false,
            message_err: "",
            redirect: false,
            warning: false,
            Success: false,
            Success_message: "",
            Danger: false,

            password_err: '',
            c_password_err: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async () => {
        this.setState({ loading: true })
        if (this.state.oldpassword == '') {
            this.setState({
                oldpassword_err: '* Old Password is required',
                password_err: '',
                message_err: '',
                c_password_err: '',
            })
            return false
        }

        if (this.state.password == '') {
            this.setState({
                password_err: "* Password is required",
                oldpassword_err: '',
                message_err: '',
                c_password_err: '',
            })
            return false
        }
        if (this.state.confirm_password == '') {
            this.setState({
                c_password_err: "* Confirm Password is required",
                oldpassword_err: '',
                password_err: '',
                message_err: '',
            })
            return false
        }
        if (this.state.password !== this.state.confirm_password) {
            this.setState({
                message_err: "*  Confirm Password is not match with password",
                oldpassword_err: '',
                password_err: '',
                c_password_err: ''
            })
            return false
        }

        var urlencoded = new URLSearchParams();
        urlencoded.append("old_password", this.state.oldpassword);
        urlencoded.append("new_password", this.state.password);

        await http.postData(`v1/hotel/change_password`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    this.setState({
                        Success: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else if (data && data.status === 400) {
                    this.setState({
                        warning: true,
                        Success_message: result.data.message,
                        loading: false
                    })
                }
                else {
                    console.log(data.message)
                }
            })
            .catch(error => {
                this.setState({
                    Danger: true,
                    message_err: error,
                })
            });

    }

    onSuccess = () => {
        this.setState({
            Success: false,
            Success_message: "",
            loading: false
        })
        auth.logout()
        window.location.reload("/login")
    };

    danger = () => {
        this.setState({
            Danger: false,
            Success_message: "",
            loading: false

        })
    }


    render() {
        const { message_err, oldpassword_err, password_err, c_password_err, phone, oldpassword, password, confirm_password, Success, Danger, Success_message, loading } = this.state;

        if (this.state.warning) {
            setTimeout(() => {
                this.setState({
                    warning: false
                })
            }, 3500)
        }
        return (
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                // open="true"
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Snackbar
                    open={this.state.warning}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    TransitionComponent={TransitionDown}
                    message={this.state.Success_message}
                // key={transition ? transition.name : ''}
                ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh", backgroundColor: "#d32f2f !important" }}>
                        {this.state.Success_message}
                    </Alert></Snackbar>
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
                        danger
                        closeOnClickOutside={true}
                        confirmBtnBsStyle="danger"
                        onConfirm={this.danger}
                    >
                        {Success_message}
                    </SweetAlert> : ''
                }
                <Container fluid>
                    <Row>
                        <Col md={5}>
                            <div className="mainfile mt-3">
                                <div className="formcolr">
                                    <h6 class="meefont text-white bfont">Change Password</h6>
                                    <Row className="mb-3">
                                        <Col lg={12}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Old Password</Form.Label>
                                                <Form.Control type="password" name="oldpassword" value={this.state.oldpassword} placeholder="Enter Old Password" onChange={this.handleChange} />
                                                {oldpassword_err && oldpassword_err ? <><span className="text-danger">{oldpassword_err}</span></> : ""}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="editform">
                                                <Form.Label className="form-label">New Password</Form.Label>
                                                <Form.Control type="password" name="password" value={this.state.password} placeholder="Enter New Password" onChange={this.handleChange} />
                                                {password_err && password_err ? <><span className="text-danger">{password_err}</span></> : ""}
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Confirm Password</Form.Label>
                                                <Form.Control type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} placeholder="Enter Confirm Password" />
                                                {c_password_err && c_password_err ? <><span className="text-danger">{c_password_err}</span></> : ""}
                                            </div>
                                            {message_err && message_err ? <><span className="text-danger">{message_err}</span></> : ""}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} >
                                            <div class="addbutt text-center mb-2">
                                                <Button type="button" variant="secondary" className="custom_btn" onClick={() => this.handleSubmit()}>Update</Button>
                                            </div>
                                            {/* {loading ?
                                                <Spinner animation="border" role="status" className="spinner_custom" style={{ color: '#fff' }}>
                                                </Spinner>
                                                : ""
                                            } */}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default changePassword;