import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Nav, Tab, TabPane } from "react-bootstrap";
import '../../../assets/css/style.css';
import vist_img from '../../../assets/images/vist.png';
import award_img from '../../../assets/images/award.png';
import http from "../../../Helper/http";
const Personal = (props) => {
    const [profile, setProfile] = useState({})
    const [max_lengths, setMaxLengths] = useState(160)
    
    useEffect(() => {
        setProfile(props.profile)
    }, [props.profile]);

    console.log(max_lengths)

    return (
        <div className="userdetail p-3">
            <h3>Business Details</h3>
            {/* <h5 className="text-secondary"><i className="fa fa-industry" aria-hidden="true"></i><span className="p-2" >{props.business&&props.business.business_name&&props.business.business_name}</span></h5> */}
            <ul className="listing">
            <li><i className="fa fa-industry" aria-hidden="true"></i> &nbsp;{props.business&&props.business.business_name&&props.business.business_name}</li>
                <li><i className="fa fa-map-marker" aria-hidden="true"></i> &nbsp;{props.business&&props.business.location&&props.business.location}</li>
                <li><i className="fa fa-envelope" aria-hidden="true"></i> &nbsp;{profile.email}</li>
                <li><i className="fa fa-phone" aria-hidden="true"></i> &nbsp;{props.business&&props.business.aletrnate_mobile_no&&props.business.aletrnate_mobile_no}</li>
                <li><i className="fa fa-file-text" aria-hidden="true"></i> &nbsp;{props.business&&props.business.category&&props.business.category.title}</li>
            </ul>
            <div className="mt-3 description">
                <h6>Description</h6>
                <p>
                    {
                        props.business&&props.business.description&&props.business.description.length > max_lengths ?
                        (
                        <p>
                            {`${props.business&&props.business.description.substring(0, max_lengths)}...`}<button type="button" className="readMore" onClick={()=>setMaxLengths(props.business.description.length)}>Read more</button>           
                        </p>
                        ) :
                        <p>{props.business&&props.business.description} <button type="button" className="readMore" onClick={()=>setMaxLengths(160)}>Read less</button></p>
                    }
                    {/* {props.business&&props.business.description&&props.business.description}. */}
                    
                </p>
            </div>
            <hr className="text-white" />
            <h6 className="mb-2">Documents</h6>
            <div className="d-flex">
                <div className="docume">
                    <img src={props.business&&props.business.visiting_card_image&&props.business.visiting_card_image} alt="" />
                    <p>Visiting Card</p>
                </div>
                <div className="docume">
                    <img src={props.business&&props.business.award_certification_image&&props.business.award_certification_image} alt="" />
                    <p>Awards & Certifications</p>
                </div>
            </div>
        </div>)
}
export default Personal;