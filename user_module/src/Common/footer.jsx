import React, { Component } from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../assets/css/style.css'
import auth from "../services/auth";
import { Snackbar, Alert, Slide } from '@mui/material';
import { grey } from "@mui/material/colors";
function TransitionDown(props) {
    return <Slide {...props} direction="left" />;
}
class Footer extends Component {

    state = {
        warning: false,
        error_message: "",
        user: auth.getUser()
    }
    handleLink = () => {
       
       
            this.setState({ warning: true, error_message: "Please Login First" })
        
    }

    render() {
        if (this.state.warning) {
            setTimeout(() => {
                this.setState({
                    warning: false,
                    error_message: "No data Found"
                })
            }, 3500)
        }
        return (<>
            <Snackbar
                open={this.state.warning}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={TransitionDown}
                message={this.state.error_message}
            // key={transition ? transition.name : ''}
            ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh", marginLeft: "5vh" }}>
                    {this.state.error_message}
                </Alert></Snackbar>
            <footer>
                <Container>
                    <Row>
                        <Col md={3}>
                            <div className="company_intro">
                                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
                                <p className="mt-3">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical </p>
                            </div>
                            <div className="social_link d-flex mt-4">
                                <a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href=""><i class="fa fa-google" aria-hidden="true"></i></a>
                                <a href=""><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            </div>
                        </Col>

                        <Col md={5}>
                            <div className="d-flex justify-content-around">
                                <div className="footer_links">
                                    <h4 className="mb-3 mt-5">Services</h4>
                                    <a href="/all/Adventure">Adventure</a>
                                    <a href="/all/Rental">Rental</a>
                                    {this.state.user ?
                                        <Link to="/search_taxi">
                                            Taxi Booking
                                        </Link> :
                                        <p  style={{ cursor: "pointer" ,color:"grey"}} onClick={() => this.handleLink()}>
                                            Taxi Booking
                                        </p>}
                                    {/* <p style={{ cursor: "pointer" }} onClick={() => this.handleLink()}>Taxi Booking</p> */}
                                </div>

                                <div className="footer_links">
                                    <h4 className="mb-3 mt-5">Company</h4>
                                    <Link to="/about">About us</Link>
                                    <Link to="/about">Careers</Link>
                                    <Link to="/about">Team</Link>
                                    <Link to="/about">Support</Link>
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="">
                                <div className="footer_links">
                                    <h4 className="mb-3 mt-5">Subscribe</h4>
                                    <Form className="mt-4">
                                        <Form.Group className="custom_input mb-3">
                                            <Form.Control placeholder="Enter Email Address" />
                                            <Button variant="primary" className="custom_btn"><i class="fa fa-send" aria-hidden="true"></i></Button>
                                        </Form.Group>

                                    </Form>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Container>

                <Container className="mt-5">
                    <div className="d-flex justify-content-between ploicy_sec">
                        <p>Copyrights © 2022  | All rights reserved. </p>
                        <div className="d-flex justify-content-between terms_link">
                            <Link to="/about" className="me-2">Terms & Conditions <span>|</span></Link>
                            <Link to="/about"> Privacy Policy </Link>
                        </div>
                    </div>

                </Container>
            </footer>



        </>)
    }


}
export default Footer;