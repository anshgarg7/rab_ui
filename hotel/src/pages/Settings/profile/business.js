import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab, TabPane } from "react-bootstrap";
import '../../../assets/css/style.css';
import vist_img from '../../../assets/images/vist.png';
import award_img from '../../../assets/images/award.png';
import http from "../../../Helper/http";
const Personal = (props) => {
    const [profile, setProfile] = useState({})
    console.log(props.profile)
    useEffect(() => {
        setProfile(props.profile)
    }, [props.profile]);
    return (
        <div className="userdetail p-3">
            <h3>Business Details</h3>
            {/* <h5 className="text-secondary"><i class="fa fa-industry" aria-hidden="true"></i><span className="p-2" >{props.business&&props.business.business_name&&props.business.business_name}</span></h5> */}
            <ul className="listing">
            <li><i class="fa fa-industry" aria-hidden="true"></i> &nbsp;{props.business&&props.business.business_name&&props.business.business_name}</li>
                <li><i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp;{props.business&&props.business.location&&props.business.location}</li>
                <li><i class="fa fa-envelope" aria-hidden="true"></i> &nbsp;{profile.email}</li>
                <li><i class="fa fa-phone" aria-hidden="true"></i> &nbsp;{props.business&&props.business.aletrnate_mobile_no&&props.business.aletrnate_mobile_no}</li>
                
            </ul>
            <div className="mt-3 description">
                <h6>Description</h6>
                <p>{props.business&&props.business.description&&props.business.description}.</p>
            </div>
            <hr className="text-white" />
            
        </div>)
}
export default Personal;