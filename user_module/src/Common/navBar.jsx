import React, { Component } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import '../assets/css/style.css'
import { Link } from "react-router-dom";
import LoginDrawer from "../pages/logindrawer";
// import http from "../Helper/http";
import auth from "../services/auth"
import SweetAlert from 'react-bootstrap-sweetalert';
class NavBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            state: false,
            user: {},
            warning: false
        };
    }

    componentDidMount = () => {
        this.setState({ user: auth.getUser() })
        // if(this.state.user.is_otp_verified == 0)
        // {
        //     this.handleLogout()
        // }
        
    }
    handleState = (open) => {
        let s1 = { ...this.state }
        s1.state = open
        this.setState(s1)
    }

    handleLogout = () => {
        auth.logout()
        window.location.reload("/home")
    }

    handleWarning = () => {
        this.setState({
            warning: true
        })
    }

    handleCancel = () => {
        this.setState({
            warning: false
        })
    }

    render() {
        let { state, user, warning } = this.state
        return (<>
            {warning ? <SweetAlert
                warning
                showCancel
                confirmBtnText="OK"
                confirmBtnBsStyle="danger"
                title="Are You Sure !"
                onConfirm={this.handleLogout}
                onCancel={this.handleCancel}
                focusCancelBtn
            >

            </SweetAlert> : ""
            }


            <LoginDrawer state={state} handleState={this.handleState} />
            <header>
                {/* <Container fluid className="login_bar d-flex justify-content-between align-items-center">
            <p className="hi">someone@something@gmail.com</p>
            <ul className="d-flex justify-content-between align-items-center">
                <li >89799236787</li>
                <li className="me-3 ms-3">|</li>
                <li><button onClick={()=> this.handleState(true)}>Login</button></li>
            </ul>
          </Container> */}
                <Navbar bg="light" expand="lg" className="navbarCustom">
                    <Container fluid>
                        <Navbar.Brand href="/"><img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" variant="light" className="menuDark" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto my-2 my-lg-0 d-flex align-items-center" style={{ maxHeight: '100px' }} navbarScroll>
                                <Link className="link-nav"  to="/">Home</Link>
                                {
                                    user ?<>
                                    <Link className="link-nav" to="/mybookings">My Bookings</Link>
                                    <Link  className="link-nav"  to="/search_taxi">Taxi</Link>
                                    <Link className="link-nav" to="/settings">Settings</Link>
                                    </>
                                    : ""
                                }
                                {/* <Nav.Link href="/vendor_register" className="partner_btn">Become Partner</Nav.Link> */}
                                {/* <Nav.Link><Button type="button" className="login" onClick={()=> this.handleState(true)}>Login</Button></Nav.Link> */}

                                {
                                    user
                                    ? <div className="user_profile ms-1 " >
                                        <img src={user && user.img ? user.img : `${process.env.PUBLIC_URL}/images/scaner.png`} alt="" height="130px" />
                                        <p>{user.name}</p>
                                        <NavDropdown title="" id="basic-nav-dropdown">
                                            <img src={user && user.img ? user.img : `${process.env.PUBLIC_URL}/images/scaner.png`} alt="" />
                                            <h5>{user.name}</h5>
                                            <p>{user && user.email ? user.email : ""}</p>
                                            <p>{user && user.address ? user.address : ""}</p>
                                            <div className="text-center">
                                                <Button type="button" variant="secondary" className="custom_btn mt-3" onClick={this.handleWarning}>Logout</Button>
                                            </div>
                                        </NavDropdown>
                                    </div>
                                    : <Nav.Link><Button type="button" className="login" onClick={() => this.handleState(true)}>Login</Button></Nav.Link>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>



        </>)
    }


}
export default NavBar