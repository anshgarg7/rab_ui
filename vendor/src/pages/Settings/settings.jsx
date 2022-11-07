import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab, TabPane } from "react-bootstrap";
import '../../assets/css/style.css';
import vist_img from '../../assets/images/vist.png';
import award_img from '../../assets/images/award.png';
import PaymentMethod from "./paymentMethod";
import ContentUs from "./contectUs"
import ChangePassword from "./changePassword";
import CustmorSupport from "./custmorSupport";
import Personal from "./profile/personal";
import KycDetails from "./kysDetails"
import http from "../../Helper/http";
import Business from "./profile/business";
import Profile from "./profile/profile";
import EditProfile from "./editProfile"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Settings() {

    const [errMessage, setErrMessage] = useState()
    const [profile, setProfile] = useState({})
    const [event, setEvent] = useState("Profile")
    const [loder, setLoder] = useState(false)
    useEffect(() => {
        setLoder(true)
        http.getList(`v1/vendor/get_profile`)
            .then(result => {
                if (result.status == 200) {
                    setProfile(result.data)
                    setLoder(false)
                    setErrMessage(result.message)
                } else {
                    setLoder(false)
                    setErrMessage(result.message)
                }
            })
            .catch(error => {
                setLoder(false)
                console.log(error)
            });
    }, []);

    const handleEvent = (val) => {
        setEvent(val)
    }
    console.log(event)
    return (<>
        <div className="p-5">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loder}
            // open="true"
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Tab.Container id="left-tabs-example" defaultActiveKey={event != "Profile" ? event : "profile"}>
                <div className="page_title m-0">
                    <h5 className="mb-2">Settings</h5>
                    <Nav variant="pills" className="d-flex ">
                        <Nav.Item>
                            <Nav.Link style={{ cursor: "pointer" }} eventKey="profile">{event != "Profile" ? event : "Profile"}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ cursor: "pointer" }} eventKey="paymentmethod">Payment Method</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ cursor: "pointer" }} eventKey="kycdetails">KYC Details</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ cursor: "pointer" }} eventKey="chnagepassword">Change Password</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{ cursor: "pointer" }} eventKey="contactus">Contact Us</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <Tab.Content>
                    <Tab.Pane eventKey="profile">
                        {event != "Profile" ? <EditProfile profile={profile} handleEvent={handleEvent} /> : <div className="mt-2 text-white">
                            <Container fluid>
                                <Profile profile={profile} handleEvent={handleEvent} />
                            </Container>
                        </div>}
                    </Tab.Pane>
                    <Tab.Pane eventKey="paymentmethod">
                        <PaymentMethod />
                    </Tab.Pane>

                    <Tab.Pane eventKey="kycdetails">
                        <KycDetails profile={profile} />
                    </Tab.Pane>

                    <Tab.Pane eventKey="chnagepassword">
                        <ChangePassword />
                    </Tab.Pane>

                    <Tab.Pane eventKey="contactus">
                        <ContentUs profile={profile} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="edit">
                        <ContentUs />
                    </Tab.Pane>

                </Tab.Content>


            </Tab.Container>


        </div>

    </>)
}
export default Settings;