import React, { useEffect, useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css';
import activity_img from '../../assets/images/activity_img.png'
import http from "../../Helper/http";
import SimpleImageSlider from "react-simple-image-slider";
import LocationPicker from 'react-location-picker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SweetAlert from 'react-bootstrap-sweetalert';
function ActivityDetails(props) {
    const [activityData, setActivityData] = useState({})
    const [max_length, setMaxLength] = useState(180)
    const [max_length1, setMaxLength1] = useState(180)
    const [show, setShow] = useState(false);
    const [apiError, setApiError] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loder, setLoder] = useState(false)
    const [aleart, setAleart] = useState(false)
    const [massege, setMessage] = useState("")
    const getDetails = async () => {
        let { id } = props.match.params
        setLoder(true)
        await http.getList(`v1/vendor/adventure_activity/detail/${id}`)
            .then(res => {
                //    console.log(res)
                setActivityData(res.data)
                setLoder(false)
            }).catch(err => {
                setApiError(err)
            })
    }
    useEffect(() => {
        getDetails()
    }, [])
    const disableActivity = (status) => {
        setLoder(true)
        let { id } = props.match.params
        var urlencoded = new URLSearchParams();
        urlencoded.append("status", status);
        http.postData(`v1/vendor/adventure_activity/update_status/${id}`, urlencoded).then(res => {
            console.log(res)
            if (res.data.status == 200) {
                setLoder(false)
                setAleart(true)
                setMessage(status)
                getDetails()

            } else { setLoder(false) }
        }).catch(err => {
            setLoder(false)
        })
    }
    const images = []
    if (activityData && activityData.images) {
        activityData.images.map(op => {
            images.push({ url: op.media_path })
        })
    }
    const defaultPosition = {
        lat: parseFloat(activityData && activityData.latitude && activityData.latitude),
        lng: parseFloat(activityData && activityData.longitude && activityData.longitude),
    }
    return (<>
        {aleart ? <SweetAlert
            success
            // showCancel
            // style={{ backgroundColor: 'black', color: 'white' }}
            confirmBtnText="OK"
            confirmBtnBsStyle="danger"
            title={"Activity status updated successfully."}
            onConfirm={() => setAleart(false)}
            // onCancel={this.onCancel}
            focusCancelBtn
        >
            This Activity is {massege == 1 ? "Active" : "Disabled"} for User
        </SweetAlert> : ""
        }
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loder}
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>

        <div className="p-5">
            <Breadcrumb>
                <Link className="breadcrumb_link" to="/myActivity">My Activity /</Link>
                <Link className="breadcrumb_link active" to="/activitydetails">Activity Details </Link>
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
                                            width="240px"
                                            height="200px"
                                            images={images}
                                            showBullets={true}
                                            showNavs={false}
                                        />}
                                </div>
                            </div>

                            <div>
                                <h4 className="title">{activityData && activityData.title && activityData.title}</h4>
                                <div className="rating d-flex align-items-center">
                                    <p className="ratingstar">4.5<i className="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    <p className="ms-1 reviews">(546 Reviews)</p>
                                </div>
                                <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i> 1st Block, Rammurthy nagar, Bangalore, 6472</p>
                                <div className="box_detail mt-3">
                                    <h5>Highlights</h5>
                                    <p>
                                        {
                                            activityData && activityData.description && activityData.description.length > max_length1 ?
                                                (
                                                    <p>
                                                        {`${activityData && activityData.description.substring(0, max_length1)}...`}<button type="button" className="readMore" onClick={() => setMaxLength1(activityData.description.length)}>Read more...</button>
                                                    </p>
                                                ) :
                                                <p>{activityData && activityData.description} <button type="button" className="readMore" onClick={() => setMaxLength1(160)}>Read less</button></p>
                                        }
                                        {/* {activityData && activityData.description && activityData.description} */}
                                    </p>
                                </div>
                            </div>

                            {/* <div className="activityebook">
                                <Link to="/bookactivity" className="custom_btn">Book Now</Link>
                            </div> */}
                        </div>
                    </Row >
                    <hr />
                    <Row>
                        <Col md={8}>
                            <ul className="info_list">
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Category</h5>
                                        <p>{activityData && activityData.activity && activityData.activity.title && activityData.activity.title}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Altitude Height</h5>
                                        <p>{activityData && activityData.altitude_depth_height && activityData.altitude_depth_height} feets</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Age Limit</h5>
                                        <p>{activityData && activityData.age_from && activityData.age_from}yrs - {activityData && activityData.age_from && activityData.age_to}yrs</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>What to take</h5>
                                        <p>
                                            {activityData && activityData.what_to_take && activityData.what_to_take.map(op => (
                                                <>{op.name},</>
                                            ))}
                                        </p>
                                        {/* <p>Shoes, Keen Guard</p> */}
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Things included</h5>
                                        <p>
                                            {activityData && activityData.thing_service_included && activityData.thing_service_included.map(op => (
                                                <>{op.name},</>
                                            ))}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Add Ons</h5>
                                        <p>
                                            {activityData && activityData.add_ons && activityData.add_ons.map(op => (
                                                <>{op.item}({op.price}),</>
                                            ))}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Duration</h5>
                                        <p>2 hrs</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Language</h5>
                                        <p>{activityData && activityData.language && activityData.language.map(op => <>{op},</>)}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Pickup</h5>
                                        <p>
                                            {activityData && activityData.is_pickup && activityData.is_pickup == "1" ? "YES" : "NO"}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Capacity/Appointment</h5>
                                        <p>10</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Add-on</h5><p>
                                            {activityData && activityData.add_ons && activityData.add_ons.map(op => (
                                                <>{op.item}/{op.price}-{op.quantity}</>
                                            ))}</p>
                                    </div>
                                </li>

                            </ul>

                            {/* <hr /> */}

                            {/* <div className="box_detail mt-3">
                                <h5>Itinerary</h5>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div> */}

                            {/* <hr /> */}
                        </Col>
                        <Col md={4}>
                            <div className="price_box box_detail mt-3">
                                <h5>Price/Person</h5>
                                <div className="availabe_box pt-4">
                                    <ul className="info_list">
                                        {activityData && activityData.price && activityData.price.map(op => (
                                            <li>

                                                <p>{op.no_of_person} - ${op.amount}</p>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        {activityData && activityData.is_pickup == "1"
                            &&
                            <>
                                <hr className="mt-2" />
                                <Col md={8}>
                                    <div className="price_box">
                                        <div className="box_detail mt-3">
                                            <h5>Pick Up Loaction : <span className="text-secondary">{activityData && activityData.is_pickup && activityData.is_pickup == "0" ? "No" : "Yes"}</span></h5>
                                            {/* <p>{activityData&&activityData.is_pickup&&activityData.is_pickup=="0"?"No":"Yes"}</p> */}
                                        </div>
                                        {/* <div>Pick Up Loaction : <p>{activityData&&activityData.is_pickup&&activityData.is_pickup=="0"?"No":"Yes"}</p></div> */}
                                        <ul className="info_list">

                                            {activityData && activityData.is_extra_charges
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>Meeting Charge</h5>
                                                        <p>
                                                            {activityData && activityData.is_extra_charges && activityData.is_extra_charges == "1" ? "yes" : "free"}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.address_line_one
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>Address line one</h5>
                                                        <p>
                                                            {activityData && activityData.address_line_one && activityData.address_line_one}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.address_line_two
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>Address line Two</h5>
                                                        <p>
                                                            {activityData && activityData.address_line_two && activityData.address_line_two}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.country
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>Country</h5>
                                                        <p>
                                                            {activityData && activityData.country && activityData.country}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.state
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>State</h5>
                                                        <p>
                                                            {activityData && activityData.state && activityData.state}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.city
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>City</h5>
                                                        <p>
                                                            {activityData && activityData.city && activityData.city}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.landmark
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>Landmark</h5>
                                                        <p>
                                                            {activityData && activityData.landmark && activityData.landmark}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.location
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>Loaction</h5>
                                                        <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                                                            {activityData && activityData.location && activityData.location}
                                                        </p>
                                                    </div>
                                                </li>}
                                            {activityData && activityData.pin_code
                                                && <li>
                                                    <div className="box_detail mt-3">
                                                        <h5>PinCode/ZipCode</h5>
                                                        <p>
                                                            {activityData && activityData.pin_code && activityData.pin_code}
                                                        </p>
                                                    </div>
                                                </li>}


                                        </ul>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="box_detail map_box" >
                                        <h5>Availability</h5>
                                        {/* <MapPicker defaultLocation={defaultPosition}
                                            zoom={13}
                                            mapTypeId="roadmap"
                                            style={{ height: '80%' }}
                                            // onChangeLocation={handleChangeLocation}
                                            // onChangeZoom={handleChangeZoom}
                                            apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' /> */}
                                        <LocationPicker
                                            style={{ border: "0", width: "10px", height: "20px" }}
                                            zoom={12}
                                            containerElement={<div style={{ height: '100%' }} />}
                                            mapElement={<div style={{ height: '255px' }} />}
                                            defaultPosition={defaultPosition}
                                        // onChange={this.handleLocationChange}
                                        />
                                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="60%" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                                    </div>
                                </Col>
                            </>}
                    </Row>
                    <hr />
                    <div className="box_detail mt-3">
                        <h5>Warning</h5>
                        <p>
                            {
                                activityData && activityData.warning && activityData.warning.length > max_length ?
                                    (
                                        <p>
                                            {`${activityData && activityData.warning.substring(0, max_length)}...`}<button type="button" className="readMore" onClick={() => setMaxLength(activityData.warning.length)}>Read more...</button>
                                        </p>
                                    ) :
                                    <p>{activityData && activityData.warning} <button type="button" className="readMore" onClick={() => setMaxLength(160)}>Read less</button></p>
                            }
                            {/* {activityData && activityData.description && activityData.description} */}
                        </p>
                    </div>
                    <hr />

                    <div className="d-flex">
                        <Link to={`/editActivity/${activityData && activityData.id}`} className="custom_btn white_btn me-3">Edit Activity</Link>
                        <Button className="custom_btn " onClick={() => disableActivity(activityData && activityData.status && activityData.status == "0" ? 1 : 0)}>{activityData && activityData.status && activityData.status == 0 ? "Active Activity" : "Disable Activity"}</Button>
                    </div>

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
export default ActivityDetails;