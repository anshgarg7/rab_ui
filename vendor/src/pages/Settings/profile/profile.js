import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab, TabPane } from "react-bootstrap";
import '../../../assets/css/style.css';
import vist_img from '../../../assets/images/vist.png';
import award_img from '../../../assets/images/award.png';
import { Link } from "react-router-dom"
import Business from "../profile/business"
const Profile = (props) => {
    const [persnal, setPersnal] = useState({})
    const [business, setBusiness] = useState({})

    useEffect(() => {
        setPersnal(props.profile && props.profile)
        setBusiness(props.profile.vendor_business_detail && props.profile.vendor_business_detail)
    }, [props.profile]);
    console.log(persnal)
    return (
        <div>
            <Row>
                <Col lg={3} sm={12} md={4} >
                    <div className="text-center my-2 pt-4 profile_col" style={{ paddingRight: "4px" }}>
                        <div className="right_bg1_img"> <img src={persnal.image} alt="" width="160" /></div>
                        <h4 className="pt-2">{persnal.first_name} {persnal.last_name}</h4>
                        <ul className="listing " style={{ color: "gray" }}>
                            <li> &nbsp;{persnal.email}</li>
                            <li> &nbsp;{persnal.mobile_no}</li>
                            <li> &nbsp;{persnal.landmark}</li>
                        </ul>
                    </div>
                </Col>

                <Col lg={9} md={12} sm={12} className="profile_col">
                    <div className="userdetail">
                        <Row className="pt-5">
                            <Col lg={9} md={12} sm={12} spacing={2}>
                                <h4>Personal Details</h4>
                            </Col>
                            <Col lg={3} md={4} sm={12} spacing={2}>
                                <div className="addbutt mb-2">
                                  <button  onClick={()=>props.handleEvent("Edit Profile")}>edit Profile</button>
                                </div>
                            </Col>
                        </Row>
                        <div className="profile_list">
                            <p><i className="fa fa-venus-double" aria-hidden="true"></i><span>&nbsp;{persnal.gender}</span></p>
                            <p><i className="fa fa-calendar" aria-hidden="true"></i><span>&nbsp;{persnal.dob}</span></p>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> <span>&nbsp;{persnal.address}, {persnal.city},{persnal.state},{persnal.country}</span></p>
                            <p><i className="fa fa-map-pin" aria-hidden="true"></i> <span>&nbsp;{persnal.pin_code}</span></p>
                            <p><i className="fa fa-bank" aria-hidden="true"></i><span> &nbsp;{persnal.landmark}</span></p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Container className="profile_col pt-2">  <Business profile={props.profile} business={business}/></Container>
        </div>)
}
export default Profile;