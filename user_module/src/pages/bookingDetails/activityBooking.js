import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import moment from "moment";
import adventure_vendor from '../../assets/images/adventure_vendor.png';
import LocationPicker from 'react-location-picker';
import activity_image from "../../assets/images/activity_image.png"
import http from "../../Helper/http";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import SweetAlert from 'react-bootstrap-sweetalert';
import Backdrop from '@mui/material/Backdrop';
import { Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TransitionDown(props) {
    return <Slide {...props} direction="left" />;
}

const labels = {
    // 0.5: 'Useless',
    1: 'Useless+',
    // 1.5: 'Poor',
    2: 'Poor+',
    // 2.5: 'Ok',
    3: 'Ok+',
    // 3.5: 'Good',
    4: 'Good+',
    // 4.5: 'Excellent',
    5: 'Excellent+',
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
class ActivityBooking extends Component {
    state = {
        max_length: 160, page: 0, rowsPerPage: 5,
        rating: 0, review: "", hover: -1, alert: false, message: "", warning: false
    }


    postComment = () => {

        var urlencoded = new URLSearchParams();
        if (this.state.rating == "" || this.state.review == "") {
            if (this.state.rating == "") {
                this.setState({ message: "Please enter  rating.", warning: true })
            } if (this.state.review == "") {
                this.setState({ message: "Please enter review.", warning: true })
            }

        } else {
            this.setState({ loder: true })
            urlencoded.append("booking_id", this.props.id);
            urlencoded.append("rating", parseInt(this.state.rating));
            urlencoded.append("review", this.state.review)
            http.postData(`v1/user/booking_rating_reviews`, urlencoded).then(res => {
                console.log(res)
                if (res.data.status == 200) {
                    this.setState({ loder: false, alert: true, message: res.data.message, rating: 0, review: "" })
                } else {
                    this.setState({ loder: false })
                }
            }).catch(err => {
                this.setState({ loder: false })
                // console.log(err)
            })
        }

    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
        // setPage(newPage);
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ page: 0, rowsPerPage: +event.target.value })
        // setRowsPerPage(+event.target.value);
        // setPage(0);
    };

    render() {
        let { adventure_activity, activityinfo } = this.props
        const defaultPosition2 = {
            lat: parseFloat(adventure_activity && adventure_activity.user && adventure_activity.user.vendor_business_detail && adventure_activity.user.vendor_business_detail && adventure_activity.user.vendor_business_detail.latitude && adventure_activity.user.vendor_business_detail.latitude),
            lng: parseFloat(adventure_activity && adventure_activity.user && adventure_activity.user.vendor_business_detail && adventure_activity.user.vendor_business_detail && adventure_activity.user.vendor_business_detail.longitude && adventure_activity.user.vendor_business_detail.longitude),
        }
        const defaultPosition = {
            lat: parseFloat(adventure_activity && adventure_activity.latitude && adventure_activity.latitude),
            lng: parseFloat(adventure_activity && adventure_activity.longitude && adventure_activity.longitude),
        }
        console.log(defaultPosition2)
        if (this.state.warning) {
            setTimeout(() => {
                this.setState({
                    warning: false
                })
            }, 2500)
        }
        return (
            <>
                <Snackbar
                    open={this.state.warning}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    TransitionComponent={TransitionDown}
                    message={this.state.message}
                // key={transition ? transition.name : ''}
                ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh" }}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.loder}
                // open="true"
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {
                    this.state.alert ?
                        <SweetAlert
                            success
                            title={this.state.message}
                            // style={{ backgroundColor: 'black', color: 'white' }}
                            confirmBtnBsStyle={'danger'}
                            onConfirm={() => this.setState({ alert: false })}
                        // onCancel={this.onCancel}
                        >
                            {/* {this.state.message} */}
                        </SweetAlert> : ""}
                <Col lg={8}>
                    <div className="activity_title">
                        <div className="title d-flex justify-content-between align-items-between">
                            <div>
                                <h1>{adventure_activity && adventure_activity.activity && adventure_activity.activity.title && adventure_activity.activity.title}</h1>
                                <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{adventure_activity && adventure_activity.user && adventure_activity.user.vendor_business_detail && adventure_activity.user.vendor_business_detail.location && adventure_activity.user.vendor_business_detail.location}</p>

                                <div className="rating d-flex align-items-center mt-3">
                                    <p className="ratingstar">4.6 <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    <p className="ms-1 reviews">(300 Reviews)</p>
                                </div>
                            </div>

                            <div className="vendor_profile">
                                <a href="#">
                                    <img src={adventure_activity && adventure_activity.user && adventure_activity.user.image ? adventure_activity.user.image : adventure_vendor} />
                                    <p>{adventure_activity && adventure_activity.user && adventure_activity.user.vendor_business_detail && adventure_activity.user.vendor_business_detail.business_name && adventure_activity.user.vendor_business_detail.business_name}</p>
                                </a>
                            </div>
                        </div>

                        <div className="highlight">
                            <div className="info mt-3">
                                <p className="title">Activity Highlight</p>
                                {adventure_activity && adventure_activity.description && adventure_activity.description.length > this.state.max_length ?
                                    (
                                        <p>
                                            {`${adventure_activity.description.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={() => this.setState({ max_length: adventure_activity.description.length })}>Read more</button>
                                        </p>
                                    ) :
                                    <p>{adventure_activity && adventure_activity.description && adventure_activity.description} <button type="button" className="readMore" onClick={() => this.setState({ max_length: 160 })}>Read less</button></p>
                                }

                            </div>
                        </div>
                    </div>

                    <hr className="custom_hr" />


                    <div className="activy_details pb-5">
                        <h4 className="sec_tite">Activity Details</h4>

                        <ul>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Category</p>
                                    <p>{adventure_activity && adventure_activity.activity && adventure_activity.activity.title && adventure_activity.activity.title}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Activity Type</p>
                                    <p>{adventure_activity && adventure_activity.activity_adventure_type && adventure_activity.activity_adventure_type && adventure_activity.activity_adventure_type.name && adventure_activity.activity_adventure_type.name}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Language</p>
                                    <p>{adventure_activity && adventure_activity.language && adventure_activity.language}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Altitude Height</p>
                                    <p>{adventure_activity && adventure_activity.altitude_depth_height && adventure_activity.altitude_depth_height}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Age Limit</p>
                                    <p>{adventure_activity && adventure_activity.age_from && adventure_activity.age_from}yrs - {adventure_activity && adventure_activity.age_to && adventure_activity.age_to}yrs</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">What to take</p>
                                    <p>{adventure_activity && adventure_activity.what_to_take && adventure_activity.what_to_take.map(op => <>{op.name},</>)}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Things included</p>
                                    <p>{adventure_activity && adventure_activity.thing_service_included && adventure_activity.thing_service_included.map(op => <>{op.name},</>)}</p>
                                </div>
                            </li>
                            {/* {activityinfo.map(op => (
                                        <li>
                                            <div className="info mt-3">
                                                <p className="title">{op.label}</p>
                                                <p>{op.value}</p>
                                            </div>
                                        </li>
                                    ))} */}
                        </ul>
                    </div>
                    {/* ////////////////////////////////////////////Date Table //////////////////////////////////////// */}
                    <div className="price_box box_detail mt-3">
                        <h5>List Date Table</h5>
                        <div className="availabe_box pt-4">
                            <ul className="info_list">
                                {adventure_activity && adventure_activity.list_date && adventure_activity.list_date.map(op => (
                                    <li>

                                        <p>Start Date : {op.start_date} </p>

                                        <p>End Date : {op.end_date}</p>
                                    </li>
                                )).reverse()}
                            </ul>
                        </div>
                    </div>
                    {/* //////////////////////////////////////Price Table ////////////////////////////////////////// */}
                    <hr className="custom_hr" />

                    <div className="price_box box_detail mt-3">
                        <h5>Price/Person Table</h5>
                        <div className="availabe_box pt-4">
                            <ul className="info_list">
                                {adventure_activity && adventure_activity.price && adventure_activity.price.map(op => (
                                    <li>

                                        <p>{op.no_of_person} - ${op.amount}</p>

                                    </li>
                                )).reverse()}
                            </ul>
                        </div>
                    </div>
                    <hr className="custom_hr" />

                    {/* ////////////////////////////////////////////////Add ons /////////////////////////////////////////////// */}
                    <div className="price_box">
                        {activityinfo && activityinfo.booking_add_ons && activityinfo.booking_add_ons.length != 0 && <h4 class="sec_tite mb-2">Add-On</h4>}

                        <ul className="addons_label p-2">
                            {activityinfo && activityinfo.booking_add_ons && activityinfo.booking_add_ons.map(op => (
                                <>
                                    <li className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="addone_items">
                                            <p>{op.activity_add_on && op.activity_add_on.item_name && op.activity_add_on.item_name}</p>
                                            <small>{op.activity_add_on && op.activity_add_on.item_price && op.activity_add_on.item_price}/Pair</small>
                                        </div>

                                        {/* <div className="solid_input"><Form.Control type="number" placeholder="1" className="select_input" disabled="true" value={op.setQuantity}/></div> */}
                                        {/* <ButtonGroup disableElevation variant="contained" className="mb-3">
                                        <Button className="custom_btn w-5" disabled={op.setQuantity == undefined || op.setQuantity == 1} onClick={() => this.movmentAddon("sub", op.id)}>-</Button>
                                        <div className="solid_input"><Form.Control placeholder="1" name="quantity" value={op.setQuantity} onChange={this.handleAddons} className="select_input text-center" /></div>
                                        <Button className="custom_btn w-5" onClick={() => this.movmentAddon("sum", op.id)}>+</Button>
                                    </ButtonGroup> */}
                                        <div>
                                            <p><span className="text-white">Quantity</span> : {op.quantity}</p>
                                        </div>
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                    {/* /////////////////////////////////////////////////// Multiday Activity/////////////////////////////////////////////////////////// */}
                    {adventure_activity && adventure_activity.activity_type && adventure_activity.activity_type == "2"
                        &&
                        <div>
                            <hr className="custom_hr" />
                            <div className="activy_details">
                                <h4 className="sec_tite">Adventure Details</h4>
                                <ul>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Start Date</p>
                                            {console.log(adventure_activity && adventure_activity)}
                                            <p>{adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity[0].start_date && adventure_activity.activity_slot_adventure_activity[0].start_date}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">End Date</p>
                                            {/* <p>{adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity[0].duration && adventureEndDate}</p> */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">No of Spots</p>
                                            <p>{adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity[0].no_of_spot}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Start Time</p>
                                            <p>{adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity[0].start_time && moment(adventure_activity.activity_slot_adventure_activity[0].start_time, "hh:mm A").format("hh:mm A")}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">End Time</p>
                                            <p>{adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity[0].end_time && moment(adventure_activity.activity_slot_adventure_activity[0].end_time, "hh:mm A").format("hh:mm A")}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul>
                                {adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity[0].itinerary && adventure_activity.activity_slot_adventure_activity[0].itinerary.map(op => (
                                    <li>
                                        <div className="p-4">
                                            <p className="text-white">DAY : <span style={{ color: "#b5b5b5" }}>{op.day}</span></p>
                                            <p className="text-white">Itinerary : <span style={{ color: "#b5b5b5" }}>{op.itinerary}</span></p>
                                        </div>
                                    </li>
                                )).reverse()}
                            </ul>

                        </div>
                    }
                    {/* 
                    {this.state.switch
                        ? <>
                            <hr className="custom_hr" />

                            {this.state.form.addOnList.length != 0 && <h4 class="sec_tite mb-2">Add-One</h4>}

                            <ul className="addons_label pb-5">
                                {this.state.form.addOnList && this.state.form.addOnList.map(op => (
                                    <>
                                        <li className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="addone_items">
                                                <p>{op.item}</p>
                                                <small>{op.price}/Pair</small>
                                            </div>

                                            <div className="solid_input"><Form.Control type="number" placeholder="1" className="select_input" disabled="true" value={op.setQuantity}/></div>
                                            <ButtonGroup disableElevation variant="contained" className="mb-3">
                                                <Button className="custom_btn w-5" disabled={op.setQuantity == undefined || op.setQuantity == 1} onClick={() => this.movmentAddon("sub", op.id)}>-</Button>
                                                <div className="solid_input"><Form.Control placeholder="1" name="quantity" value={op.setQuantity} onChange={this.handleAddons} className="select_input text-center" /></div>
                                                <Button className="custom_btn w-5" onClick={() => this.movmentAddon("sum", op.id)}>+</Button>
                                            </ButtonGroup>
                                            <div>
                                                <p>{op.quantity}</p>
                                            </div>
                                        </li>
                                    </>
                                ))}
                            </ul>

                        </>
                        : ""} */}
                    {/* /////////////////////////////////////////////////// Flaxed Activity///////////////////////////////////////////////////////////// */}
                    {this.state.switch
                        && <>
                            {adventure_activity && adventure_activity.activity_type && adventure_activity.activity_type == "1" && adventure_activity.single_day_categories && adventure_activity.single_day_categories == "2"
                                &&
                                <>
                                    <div>
                                        <hr className="custom_hr" />

                                        <h4 className="sec_tite">Adventure Details</h4>
                                        <ul>
                                            {adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity.slot && adventure_activity.activity_slot_adventure_activity.slot.map((op, index) => (
                                                <li>
                                                    <div className="p-4">
                                                        <div className="activy_details">
                                                            <h4 className="sec_tite">
                                                                {adventure_activity.activity_slot_adventure_activity &&
                                                                    adventure_activity.activity_slot_adventure_activity.flexd.find((p, ind) => ind == index).slot_type == "3" ? "Morning Slot"
                                                                    : adventure_activity.activity_slot_adventure_activity.flexd.find((p, ind) => ind == index).slot_type == "4" ? "Afternoon Slot"
                                                                        : "Evening Slot"}
                                                            </h4>
                                                            <ul>
                                                                <li>
                                                                    <div className="info mt-3">
                                                                        <p className="title">Start Time</p>
                                                                        <p>{op.start_time}</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="info mt-3">
                                                                        <p className="title">End Time</p>
                                                                        <p>{op.end_time}</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="info mt-3">
                                                                        <p className="title">Quantty</p>
                                                                        <p>{op.quantity}</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        {/* <p className="text-white">DAY : <span style={{ color: "#b5b5b5" }}>{op.day}</span></p> */}
                                                        <p className="text-white pt-3">Itinerary : <span style={{ color: "#b5b5b5" }}>{op.itinerary}</span></p>
                                                    </div>
                                                </li>
                                            )).reverse()}
                                        </ul>
                                    </div>
                                    <ul>
                                        {adventure_activity && adventure_activity.activity_slot_adventure_activity && adventure_activity.activity_slot_adventure_activity.itinerary && adventure_activity.activity_slot_adventure_activity.itinerary.map(op => (
                                            <li>
                                                <div className="p-4">
                                                    <p className="text-white">DAY : <span style={{ color: "#b5b5b5" }}>{op.day}</span></p>
                                                    <p className="text-white">Itinerary : <span style={{ color: "#b5b5b5" }}>{op.itinerary}</span></p>
                                                </div>
                                            </li>
                                        )).reverse()}
                                    </ul>


                                </>
                            }
                        </>}
                    {!this.state.switch &&
                        <>
                            {adventure_activity && adventure_activity.is_pickup && adventure_activity.is_pickup == "1"
                                &&
                                <Row>
                                    <hr className="custom_hr" />

                                    <>
                                        <hr className="mt-2" />
                                        <Col md={12}>
                                            <div className="price_box">
                                                <div className="box_detail mt-3">
                                                    <h5>Pick Up Loaction : <span className="text-secondary">{adventure_activity.is_pickup == "1" && "Yes"}</span></h5>
                                                    {/* <p>{activityadventure_activity&&activityadventure_activity.is_pickup&&activityadventure_activity.is_pickup=="0"?"No":"Yes"}</p> */}
                                                </div>
                                                {/* <div>Pick Up Loaction : <p>{activityadventure_activity&&activityadventure_activity.is_pickup&&activityadventure_activity.is_pickup=="0"?"No":"Yes"}</p></div> */}
                                                <ul className="info_list">

                                                    <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>Meeting Charge</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.is_extra_charges && adventure_activity.is_extra_charges == "1" ? "yes" : "free"}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>Address line one</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.address_line_one && adventure_activity.address_line_one}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>Address line Two</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.address_line_two && adventure_activity.address_line_two}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>Country</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.country && adventure_activity.country}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>State</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.state && adventure_activity.state}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>City</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.city && adventure_activity.city}
                                                            </p>
                                                        </div>
                                                    </li><li>
                                                        <div className="box_detail mt-3">
                                                            <h5>Landmark</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.landmark && adventure_activity.landmark}
                                                            </p>
                                                        </div>
                                                    </li><li>
                                                        <div className="box_detail mt-3">
                                                            <h5>Loaction</h5>
                                                            <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                                                                {adventure_activity && adventure_activity.location && adventure_activity.location}
                                                            </p>
                                                        </div>
                                                    </li> <li>
                                                        <div className="box_detail mt-3">
                                                            <h5>PinCode/ZipCode</h5>
                                                            <p>
                                                                {adventure_activity && adventure_activity.pin_code && adventure_activity.pin_code}
                                                            </p>
                                                        </div>
                                                    </li>


                                                </ul>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="box_detail map_box pt-3" >
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
                                                    zoom={18}
                                                    containerElement={<div style={{ height: '100%' }} />}
                                                    mapElement={<div style={{ height: '255px' }} />}
                                                    defaultPosition={defaultPosition}
                                                // onChange={this.handleLocationChange}
                                                />
                                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="60%" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                                            </div>
                                        </Col>
                                    </>
                                </Row>
                            }
                        </>}
                    <>
                        <hr className="custom_hr" />

                        <div className="info">
                            <p className="title">Itinerary</p>
                            {adventure_activity && adventure_activity.warning && adventure_activity.warning.length > this.state.max_length ?
                                (
                                    <p>
                                        {`${adventure_activity.warning.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={() => this.setState({ max_length: adventure_activity.warning.length })}>Read more</button>
                                    </p>
                                ) :
                                <p>{adventure_activity && adventure_activity.warning && adventure_activity.warning} <button type="button" className="readMore" onClick={() => this.setState({ max_length: 160 })}>Read less</button></p>
                            }
                            {/* <p>{this.props.warning}</p> */}
                        </div>

                        <hr className="custom_hr" />
                        <div className="info">
                            <p className="title">Map Location</p>
                            <div className="vendor_location mt-2">
                                <LocationPicker
                                    zoom={15}
                                    containerElement={<div style={{ height: '100%' }} />}
                                    mapElement={<div style={{ height: '400px' }} />}
                                    defaultPosition={defaultPosition2}
                                // onChange={this.handleLocationChange}
                                />
                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="250" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                            </div>
                        </div>

                        <hr className="custom_hr" />

                        <h4 className="sec_tite">Comments(10)</h4>
                        <ul className="comment_listing">
                            <li>

                                <div className="bankname d-flex align-items-center">
                                    <span>
                                        <img class="round-imguser d-flex" src={activity_image} style={{ borderRadius: "50%", width: "70px", height: "70px" }} />
                                    </span>
                                    <span className="ms-3">
                                        <h4>Sonam Designer</h4>
                                        <p className="star-rate"><i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    </span>
                                </div>

                                {/* <div class="bankname d-flex align-items-center"><span><img class="round-imguser d-flex" src="src={activity_image}" style="border-radius: 50%;width: 70px;height: 70px;"></span><span class="ms-3"><h4>**** **** **** 8765</h4><p>Punjab National Bank</p></span></div>
                        <img className="round-imguser d-flex" src={activity_image} />
                        <h2 className="d-flex">sonam Designer</h2> */}

                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                                <small>5min ago</small>
                            </li>

                            <li>
                                <div className="bankname d-flex align-items-center">
                                    <span>
                                        <img class="round-imguser d-flex" src={activity_image} style={{ borderRadius: "50%", width: "70px", height: "70px" }} />
                                    </span>
                                    <span className="ms-3">
                                        <h4>Sonam Designer</h4>
                                        <p className="star-rate"><i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    </span>
                                </div>

                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                                <small>10min ago</small>
                            </li>

                            <li>
                                <div className="bankname d-flex align-items-center">
                                    <span>
                                        <img class="round-imguser d-flex" src={activity_image} style={{ borderRadius: "50%", width: "70px", height: "70px" }} />
                                    </span>
                                    <span className="ms-3">
                                        <h4>Sonam Designer</h4>
                                        <p className="star-rate"><i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i>
                                            <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    </span>
                                </div>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                                <small>15min ago</small>
                            </li>
                        </ul>
                        {/* <Pagination count={11} defaultPage={6}  /> */}
                        <Stack spacing={2}>
                            <Pagination count={5} page={this.state.page} onChange={this.handleChange} />
                        </Stack>
                        {/* <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            className='bro'
                            count={10}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            // sx={{ color: "red" ,backgroundColor:"#e52346"}}
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                        /> */}

                        <Form className="label_form mt-3">
                            <Form.Group className="mb-3 form_grp">
                                <div className="d-flex justify-content-between">
                                    <Form.Label>Comment</Form.Label>
                                    <Box
                                        sx={{
                                            width: 20,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div>
                                            <Rating
                                                style={{ color: "white" }}
                                                name="hover-feedback"
                                                value={this.state.rating}
                                                precision={0.5}
                                                getLabelText={getLabelText}
                                                onChange={(event, newValue) => {
                                                    this.setState({ rating: newValue });
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    this.setState({ hover: newHover })
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                        </div>
                                        {this.state.rating !== null && (
                                            <Box sx={{ ml: 2 }}>{labels[this.state.hover !== -1 ? this.state.hover : this.state.rating]}</Box>
                                        )}
                                    </Box>



                                </div>

                                {/* <Form.Control type="text" placeholder="Search here" /> */}
                                <Form.Control as="textarea" name="comment" value={this.state.review} onChange={(e) => this.setState({ review: e.target.value })} rows={3} placeholder="Enter Someting Here" />
                            </Form.Group>
                        </Form>

                        <button onClick={() => this.postComment()} className="custom_btn"  >Post</button>

                        <hr className="custom_hr" />

                    </>

                    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    {/* {!this.state.switch && <Comment defaultPosition={defaultPosition} warning={adventure_activity && adventure_activity.warning && adventure_activity.warning} />} */}
                    {/* Acivities and rental sec end */}
                </Col>
            </>
        )
    }

}
export default ActivityBooking;