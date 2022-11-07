import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css';
import activity_img from '../../assets/images/activity_img.png'
import http from "../../Helper/http";
import auth from "../../services/auth";
import SimpleImageSlider from "react-simple-image-slider";
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Rentalactivity(props) {

    const [max_length, setMaxLength] = useState(160)
    const [max_lengthd, setMaxLengthd] = useState(160)
    const [show, setShow] = useState(false);
    const [loder,setLoder] = useState(false)
    const handleClose = () => setShow(false);
    // const updateStatus = () => setUpdateStatus
    const handleShow = () => setShow(true);

    const [errMessage, setErrMessage] = useState()
    const [message_err, setMessageErr] = useState("")
    const [profile, setProfile] = useState({})
    const user = auth.getUser()
    const rentalActivityId = props.match.params.id
    useEffect(() => {
        setLoder(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${http.BaseURL}/api/v1/vendor/rental_activities/detail/${rentalActivityId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("======hello======", result);
                if (result.status == 200) {
                    // console.log("djsghfgshdgfsdghfgsdjfjsdgfj",result)
                    setProfile(result.data)
                    setErrMessage(result.message)
                    setLoder(false)
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

    const updateStatus = async (status) => {
        setMessageErr("")
        setLoder(true)
        var urlencoded = new URLSearchParams();
        urlencoded.append("status", status == 0 ? 1 : 0);

        await http.postData(`v1/vendor/rental_activity/update_status/${rentalActivityId}`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    setLoder(false)
                }
                else {
                    setLoder(false)
                    setMessageErr(data.message)
                }
            })
            .catch(error => {
                setLoder(false)
                setMessageErr(error)
            });
    };

    // const handleSubmit = () => {
    //     if (Object.keys(error).length === 0) {

    //     } else {
    //         updateStatus()
    //     }
    // }
    // console.log("============",rentalActivityId);

    // handleWarning = () => {
    //     this.setState({
    //         warning: true
    //     })
    // }

    // const handleCancel = () => {
    //     this.setState({
    //         warning: false
    //     })
    // }

    // const handleStatus = () => {

    //     setForm({
    //        ...form, old_password: "",
    //        new_password: "",
    //        confirm_new_password: "",
    //     })
    //     setAlert({ ...alert, loginsuccess: false, loginMessage: "" })
    //  }
    const images = []
    if (profile && profile.images) {
        profile.images.map(op => {
            images.push({ url: op.media_path })
        })
    }
    const description  = profile && profile.description && profile.description

    console.log(max_length);
    return (<>
         <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loder}
      // open="true"
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        {/* {warning ? <SweetAlert
                warning
                showCancel
                confirmBtnText="OK"
                confirmBtnBsStyle="danger"
                title="Are You Sure !"
                onConfirm={() => handleStatus()}
                onCancel={() => handleCancel()}
                focusCancelBtn
            >

            </SweetAlert> : ""
            } */}
        <div className="p-5">
            <Breadcrumb>
                <Link className="breadcrumb_link" to="/myrental">My Rental /</Link>
                <Link className="breadcrumb_link active" to="/activitydetails"> Rental Details</Link>
            </Breadcrumb>
            <div className="pb-5">
                <Container fluid>
                    <Row className="mb-4">
                        <div className="activity_details d-sm-inline-flex align-items-center">
                            <div className="me-3">
                                <div>
                                    {images.length == 0
                                        ? <img src={activity_img} alt="activity_image" />
                                        : <SimpleImageSlider
                                            width="260px"
                                            height="180px"
                                            images={images}
                                            showBullets={true}
                                            showNavs={false}
                                        />}
                                </div>
                                {/* <img src={profile && profile.images && profile.images.media_path} alt="activity_image" /> */}
                            </div>
                            <div className="booknowrental d-sm-inline-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h4 className="title">{profile.title}</h4>
                                    <div className="rating d-flex align-items-center">
                                        <p className="ratingstar">4.5<i className="fa fa-star ms-1" aria-hidden="true"></i></p>
                                        <p className="ms-1 reviews">(546 Reviews)</p>
                                    </div>
                                    <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                                        1st Block, Rammurthy nagar, Bangalore, 6472</p>
                                    <div className="box_detail mt-3">
                                        <h5>Highlights</h5>
                                        {
                                            description&&description.length > max_lengthd ?
                                            (
                                            <p>
                                               test {`${description.substring(0, max_lengthd)}...`}<button type="button" className="readMore" onClick={()=>setMaxLengthd(description.length)}>Read more</button>           
                                            </p>
                                            ) :
                                            <p>{description} <button type="button" className="readMore" onClick={()=>setMaxLengthd(160)}>Read less</button></p>
                                        } 
                                    </div>
                                </div>
                                <div className="activityebook">
                                    <Link to="/bookactivity" className="custom_btn">Book Now</Link>
                                </div>
                            </div>
                        </div>
                    </Row >
                    <hr />
                    <Row>
                        <Col md={8}>
                            <ul className="info_list mb-5">
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Company</h5>
                                        <p>
                                            {profile.brand && profile.brand.name ? profile.brand.name : ""}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Modal</h5>
                                        <p>
                                            {profile.model && profile.model.name ? profile.model.name : ""}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Quantity</h5>
                                        <p>
                                            {profile && profile.quantity ? profile.quantity : ""}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Item Included</h5>
                                        <p>
                                            {profile.thing_service_included && profile.thing_service_included.map(op => (
                                                <>{op.name} <br /></>
                                            ))}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>What To Take</h5>
                                        <p>
                                            {profile.what_to_take && profile.what_to_take.map(op => (
                                                <>{op.name} <br /></>
                                            ))}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Add Ons</h5>
                                        <p>
                                            {profile && profile.add_ons && profile.add_ons.map(op => (
                                                <>{op.item}({op.price})-{op.quantity},</>
                                            ))}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Price</h5>
                                        <p>
                                            Per Hour ${profile.price && profile.price.per_hour.amount ? profile.price.per_hour.amount : ""} / Per Day ${profile.price && profile.price.per_day.amount ? profile.price.per_day.amount : ""}

                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <hr />

                            <div className="box_detail mt-3">
                                <h5>Warning</h5>
                                <p className="pt-2">
                                {
                                        profile && profile.warning&&profile && profile.warning.length > max_length ?
                                        (
                                        <p>
                                            test {`${profile && profile.warning.substring(0, max_length)}...`}<button type="button" className="readMore" onClick={()=>setMaxLength(profile && profile.warning.length)}>Read more</button>           
                                        </p>
                                        ) :
                                        <p>{profile && profile.warning} <button type="button" className="readMore" onClick={()=>setMaxLength(160)}>Read less</button></p>
                                    }
                                    
                                    {/* {profile && profile.warning && profile.warning} */}
                                    </p>
                            </div>

                            <hr />
                            <div className="d-flex">
                                <Link to={`/editRental/${rentalActivityId}`} className="custom_btn white_btn me-3">Edit Activity</Link>
                                {/* <Link to="" className="custom_btn">Disable Activity</Link> */}
                                <Button className="custom_btn" onClick={() => updateStatus(profile.status)}>{profile&&profile.status&&profile.status=="0"?"Active Activity":"Disable Activity"}</Button>
                            </div>
                        </Col>
                        <Col md={4}>
                            {/* <div className="box_detail map_box"> */}
                                <div className="price_box box_detail mt-3">
                                    <h5>Vehicle Details</h5>
                                    <div className="availabe_box pt-4">
                                        <ul className="">
                                            {profile && profile.vehicle_details && profile.vehicle_details.map(op => (
                                                <li>
                                                    <p>Registration No : {op.registration_no} - Model : {op.year}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                {/* </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal show={show} onHide={handleClose} className="custom_model">
                <Modal.Header closeButton>
                    <Modal.Title>Add Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    </>)
}
export default Rentalactivity;