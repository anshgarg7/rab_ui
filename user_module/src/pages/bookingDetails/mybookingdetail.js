import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import activites_main_img from '../../assets/images/boating_activity.jpg';
import adventure_vendor from '../../assets/images/adventure_vendor.png';
import http from "../../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Carousel } from 'react-responsive-carousel';
import NavBar from "../../Common/navBar";
import Footer from "../../Common/footer";
import moment from "moment";
import ButtonGroup from '@mui/material/ButtonGroup';
import LocationPicker from 'react-location-picker';
import ActivityBooking from "./activityBooking";
import RentalBooking from "./rentalBooking";
import SweetAlert from 'react-bootstrap-sweetalert';

class MyBookingDetails extends Component {

    state = {
        loder: false,
        activityinfo: {},
        max_length: 160,
        message: "",
        alert: false,
        changeAleart: 0,

    }
    getDetails = () => {
        let { id, category } = this.props.match.params
        this.setState({ loder: true })
        if (id && category) {
            http.getList(`v1/user/get_booking_detail/${category}/${id}`).then((res) => {
                if (res.status == 200) {
                    console.log(res)
                    // debugger
                    this.setState({ loder: false, activityinfo: res.data })
                }
            }).catch((err) => {
                this.setState({ loder: false })
            })
        }
    }
    componentDidMount() {
        this.getDetails()
    }

    cancelBooking = (booking) => {
        let s1 = { ...this.state }
        if (booking) {
            this.setState({ alert: true, message: "Are you sure you want to cancel the booking", changeAleart: 1 })
        }
    }
    handleAleart = () => {
        let s1 = { ...this.state }
        console.log("uigig")
        this.setState({ loder: true, alert: false })
        // if (s1.changeAleart == 2) {
        http.getList(`v1/user/booking_cancel/${s1.activityinfo && s1.activityinfo.activity_category && s1.activityinfo.activity_category}/${s1.activityinfo && s1.activityinfo.id && s1.activityinfo.id}`).then(res => {
            console.log(res)
            if (res.data.status == 200) {
                this.setState({ loder: false, alert: true, changeAleart: 2, message: "Your Payment will be refunded with in  7 working days in the same bank account " })
                this.getDetails()
            } else {
                this.setState({ loder: false })
            }
        }).catch(err => {
            this.setState({ loder: false })
        })
        // }else{

        // }


    }

    render() {

        let { activityinfo } = this.state
        console.log(activityinfo)
        let cancelBooking = null
        if (activityinfo && activityinfo.start_date && activityinfo.start_time) {
            let date = new Date(`${activityinfo.start_date} ${activityinfo.start_time}`)
            let currentDate = new Date()
            date.setDate(date.getDate() + 1)
            cancelBooking = currentDate <= date ? true : false
            console.log(currentDate, "llllllllllllllllllllllllllllllllll")
        }
        // const description = activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.description
        // const defaultPosition2 = {
        //     lat: parseFloat(activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail.latitude && activityinfo.rental_activity.user.vendor_business_detail.latitude),
        //     lat: parseFloat(activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.user && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail && activityinfo.rental_activity.user.vendor_business_detail.longitude && activityinfo.rental_activity.user.vendor_business_detail.longitude),

        // }
        return (<>
            {this.state.alert ? <SweetAlert
                warning
                confirmBtnText="OK"
                confirmBtnBsStyle="danger"
                title={this.state.message}
                onConfirm={() => this.handleAleart(this.state.changeAleart)}
                focusCancelBtn
            >
            </SweetAlert> : ""
            }
            <NavBar />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.loder}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <section className="activity_top_img">
                <div className="activities_main">
                    <div>
                        {activityinfo && activityinfo.rental_activity ?
                            <>
                                <Carousel autoPlay="true" width="100%" height="45%" interval={1000} style={{ maxHeight: "auto", width: "100%" }}>
                                    {activityinfo && activityinfo.rental_activity && activityinfo.rental_activity.images && activityinfo.rental_activity.images.map(op => (
                                        <div>
                                            <img src={op.media_path} />
                                            {/* <p className="legend">Legend 1</p> */}
                                        </div>
                                    ))}
                                </Carousel>
                            </>
                            :
                            <>
                                <Carousel autoPlay="true" width="100%" height="45%" interval={1000} style={{ maxHeight: "auto", width: "100%" }}>
                                    {activityinfo && activityinfo.adventure_activity && activityinfo.adventure_activity.images && activityinfo.adventure_activity.images.map(op => (
                                        <div>
                                            <img src={op.media_path} />
                                            {/* <p className="legend">Legend 1</p> */}
                                        </div>
                                    ))}
                                </Carousel>
                            </>}
                    </div>
                </div>
            </section>
            <section className="activities_details bg_black  ">
                <Container>
                    <Row>
                        {activityinfo && activityinfo.adventure_activity ? <ActivityBooking adventure_activity={activityinfo.adventure_activity} id={activityinfo&&activityinfo.id&&activityinfo.id} activityinfo={activityinfo} /> : <RentalBooking activityinfo={activityinfo} id={activityinfo&&activityinfo.id&&activityinfo.id} />}
                        <Col lg={4}>

                            {/* booking form start */}
                            <div className="dark_form_bg top_margin">
                                <div className="price"><h3>{activityinfo && activityinfo.booking_payment && activityinfo.booking_payment.currency && activityinfo.booking_payment.currency}{activityinfo && activityinfo.booking_payment && activityinfo.booking_payment.total_price && activityinfo.booking_payment.total_price}<span>/ You Paid</span></h3></div>

                                <ul className="booking_details_list">
                                    <li><h4 class="sec_tite mt-2">Booking Information</h4></li>
                                    <li>
                                        <p>Booking ID</p>
                                        <p>ADG356</p>
                                    </li>
                                    <li>
                                        <p>Status</p>
                                        {
                                            activityinfo && activityinfo.status
                                                ? <p>{activityinfo.status == "1" ? "Pending" : activityinfo.status == "2" ? "In Progress" : activityinfo.status == "3" ? "Abandoned" : activityinfo.status == "4" ? "Completed" : activityinfo.status == "5" ? "Cancelled" : ""}</p>
                                                : ""
                                        }
                                    </li>
                                    <li>
                                        <p>Quantity</p>
                                        <p>{activityinfo && activityinfo.quantity && activityinfo.quantity}</p>
                                    </li>
                                    <li>
                                        <p>Start Date</p>
                                        <p>{activityinfo && activityinfo.start_date && moment(activityinfo.start_date).format("DD-MM-YYYY")}</p>
                                    </li>
                                    <li>
                                        <p>End Date</p>
                                        <p>{activityinfo && activityinfo.end_date && moment(activityinfo.end_date).format("DD-MM-YYYY")}</p>
                                    </li>
                                    <li>
                                        <p>Time</p>
                                        <p>{activityinfo && activityinfo.start_time && moment(activityinfo.start_time, 'hh:mm:ss').format('hh:mm A')}-{activityinfo && activityinfo.end_time && moment(activityinfo.end_time, 'hh:mm:ss').format('hh:mm A')}</p>
                                    </li>
                                </ul>

                                {activityinfo && activityinfo.status && activityinfo.status == "5"
                                    ? <small className="text-center note mt-2 mb-3">Your Payment will be refunded with in  7 working days <br/> in the same bank account </small>
                                    : <small className="text-center note mt-2">Note : You can cancel the booking before <br /> 24hrs</small>
                                }


                                {activityinfo && activityinfo.status && activityinfo.status == "5"
                                    ? ""
                                    : <Button className="custom_btn w100 dark_bg" onClick={() => this.cancelBooking(cancelBooking)} style={!cancelBooking  ? { backgroundColor: "red" } : { backgroundColor: "gray" }}>
                                    {cancelBooking
                                        ? "Cancel Booking"
                                        : "Booked"
                                    }

                                </Button>
                                }
                                {/* <Button variant="primary" type="submit" className="custom_btn w100" >Book Now</Button> */}

                            </div>
                            {/* booking form start */}
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>)

    }
}
export default MyBookingDetails;