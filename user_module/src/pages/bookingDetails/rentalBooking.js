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
class RentalBooking extends Component {
    state = {
        max_length: 160,
        rating: 0, review: "", hover: -1, alert: false, message: "",warning:false
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
                    this.setState({ loder: false, alert: true, message: res.data.message ,rating:0,review:""})
                } else {
                    this.setState({ loder: false })
                }
            }).catch(err => {
                this.setState({ loder: false })
                // console.log(err)
            })
        }

    }
    render() {
        let { activityinfo } = this.props
        const defaultPosition2 = {
            lat: parseFloat(activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail.latitude && activityinfo.rental_activity.user.vendor_business_detail.latitude),
            lng: parseFloat(activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail.longitude && activityinfo.rental_activity.user.vendor_business_detail.longitude),

        }
        return (
            <>
                <Col lg={8}>
                    <div className="activity_title">
                        <div className="title d-flex justify-content-between align-items-between">
                            <div>
                                <h1>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.title && activityinfo.rental_activity.title}</h1>
                                <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail.location && activityinfo.rental_activity.user.vendor_business_detail.location}</p>

                                <div className="rating d-flex align-items-center mt-3">
                                    <p className="ratingstar">4.6 <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                    <p className="ms-1 reviews">(300 Reviews)</p>
                                </div>
                                <div className="highlight">
                                    <div className="info mt-3">
                                        <p className="title">Activity Highlight</p>
                                        {
                                            activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.description && activityinfo.rental_activity.description.length > this.state.max_length ?
                                                (
                                                    <p>
                                                        {`${activityinfo.rental_activity.description.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={() => this.setState({ max_length: activityinfo.rental_activity.description.length })}>Read more</button>
                                                    </p>
                                                ) :
                                                <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.description && activityinfo.rental_activity.description}
                                                    <button type="button" className="readMore" onClick={() => this.setState({ max_length: 160 })}>Read less</button>
                                                </p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="vendor_profile">
                                <a href="#">
                                    <img src={activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.image ? activityinfo.rental_activity.user.image : adventure_vendor} />
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail.business_name && activityinfo.rental_activity.user.vendor_business_detail.business_name}</p>
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr className="custom_hr" />


                    {/* /////////////////////////////////////////////////// Multiday Activity/////////////////////////////////////////////////////////// */}

                    <div className="activy_details">
                        <h4 className="sec_tite">Rental Details</h4>

                        <ul>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Vehicle Type</p>
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.activity && activityinfo.rental_activity.activity.title && activityinfo.rental_activity.activity.title}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Vehicle</p>
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.brand && activityinfo.rental_activity.brand.name && activityinfo.rental_activity.brand.name}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Model</p>
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.model && activityinfo.rental_activity.model.name && activityinfo.rental_activity.model.name}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Quantity</p>
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.quantity && activityinfo.rental_activity.quantity}</p>
                                </div>
                            </li>

                            <li>
                                <div className="info mt-3">
                                    <p className="title">What to take</p>
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.what_to_take && activityinfo.rental_activity.what_to_take.map(op => <>{op.name},</>)}</p>
                                </div>
                            </li>
                            <li>
                                <div className="info mt-3">
                                    <p className="title">Things included</p>
                                    <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.thing_service_included && activityinfo.rental_activity.thing_service_included.map(op => <>{op.name},</>)}</p>
                                </div>
                            </li>
                        </ul>

                        <div className="price_box box_detail mt-3">
                            {/* <h5>Vehicle Details</h5> */}
                            <h5 className="title">Vehicle Details</h5>
                            <div className="availabe_box info ">
                                <Row className="">
                                    {activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.vehicle_details && activityinfo.rental_activity.vehicle_details.map(op => (
                                        <Col md={12}>
                                            <p>Registration No : {op.registration_no} - Model : {op.year}</p>
                                        </Col>
                                    ))}
                                </Row>
                            </div>I
                        </div>

                    </div>
                    <hr />
                    <div className="info">
                        <p className="title">Warning</p>
                        {activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.warning && activityinfo.rental_activity.warning && activityinfo.rental_activity.warning.length > this.state.max_length ?
                            (
                                <p>
                                    {`${activityinfo.rental_activity.warning.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={() => this.setState({ max_length: activityinfo.rental_activity.warning.length })}>Read more</button>
                                </p>
                            ) :
                            <p>{activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.warning && activityinfo.rental_activity.warning} <button type="button" className="readMore" onClick={() => this.setState({ max_length: 160 })}>Read less</button></p>
                        }
                        {/* <p>{this.props.data &&this.props.data.warning && this.props.data.warning}</p> */}
                    </div>


                    <>
                        <hr className="custom_hr" />
                        <div className="info">
                            <p className="title">Map Location</p>
                            <div className="vendor_location mt-2">
                                <LocationPicker
                                    zoom={14}
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
                    {/* {!this.state.switch && <Comment defaultPosition={defaultPosition} warning={activityinfo && activityinfo.warning && activityinfo.warning} />} */}
                    {/* Acivities and rental sec end */}
                </Col>
            </>)
    }


}
export default RentalBooking;