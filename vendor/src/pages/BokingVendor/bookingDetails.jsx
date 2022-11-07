import React, { useEffect, useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css';
import activity_img from '../../assets/images/activity_img.png';
import user_img from '../../assets/images/user_image.png'
import http from "../../Helper/http";
import AdventureDetails from "./adventureDetails";
import RentalDetails from "./rentalDetails";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



function BookingDetails(props) {

    const [show, setShow] = useState(false);
    const [loder, setLoder] = useState(false)
    const [data, setData] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { id, category } = props.match.params
    useEffect(() => {
        console.log(category, id)
        setLoder(true)
        http.getList(`v1/vendor/get_booking_details/${category}/${id}`).then((res) => {
            console.log("----", res)
            if (res.status == 200) {
                setLoder(false)
                setData(res.data)
            }

        }).catch((err) => {
            setLoder(false)
            console.log(err)
        })
    }, [id])






    return (<>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loder}
        // open="true"
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>

        <div className="p-5">
            <Breadcrumb>
                <Link className="breadcrumb_link" to="/mybookings">My Booking /</Link>
                <Link className="breadcrumb_link active" to="/bookingdetails">Bookings Details </Link>
            </Breadcrumb>


            <div className="pb-5">
                <Container fluid>
                    {data && data.rental_activity ? <RentalDetails data={data.rental_activity} price={data.total_price && data.total_price} /> : <AdventureDetails data={data.adventure_activity} price={data.total_price && data.total_price} />}

                    <hr />

                    <Row>
                        <Col>
                            <h6 className="meefont text-white bfont mb-0">Booking Details</h6>
                            <ul className="info_list booking_info-list">
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking ID</h5>
                                        <p>#ASD534663456</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Category</h5>
                                        <p>{data && data.adventure_activity ? data.adventure_activity && data.adventure_activity.activity && data.adventure_activity.activity.title && data.adventure_activity.activity.title : data.rental_activity && data.rental_activity.activity && data.rental_activity.activity.title && data.rental_activity.activity.title}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking Start Date</h5>
                                        <p>{data && data.start_date && data.start_date}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking Start Time</h5>
                                        <p>{data && data.start_time && data.start_time}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking End Date</h5>
                                        <p>{data && data.end_time && data.end_time}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Booking Start Date</h5>
                                        <p>{data && data.start_date && data.start_date}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Price</h5>
                                        <p>{data && data.total_price && data.total_price}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="box_detail mt-3">
                                        <h5>Status</h5>
                                        <p> {
                                            data && data.status
                                                ? <p>{data.status == "1" ? "Pending" : data.status == "2" ? "In Progress" : data.status == "3" ? "Abandoned" : data.status == "4" ? "Completed" : data.status == "5" ? "Cancelled" : ""}</p>
                                                : ""
                                        }</p>
                                    </div>
                                </li>
                                {data && data.booking_add_ons && data.booking_add_ons.length != 0
                                    && <li>
                                        <div className="box_detail mt-3">
                                            <h5>Add Ons</h5>

                                            <p>
                                                {data && data.booking_add_ons && data.booking_add_ons.length != 0 && data.booking_add_ons.map(op => (
                                                    `${op.activity_add_on && op.activity_add_on.item_name && op.activity_add_on.item_name}(${op.activity_add_on && op.activity_add_on.item_price && op.activity_add_on.item_price})-${op.quantity && op.quantity}`
                                                ))}
                                            </p>
                                        </div>
                                    </li>}
                            </ul>
                        </Col>
                    </Row>
                    <hr />

                    <Row>
                        <Col md={6}>
                            <div className="activity_details customer_details d-flex align-items-center">
                                <div className="me-3">
                                    <img src={data && data.user && data.user.image ? data.user.image : user_img} alt="activity_image" />
                                </div>
                                <div>
                                    <h4 className="title">{data && data.user && data.user.first_name && data.user.last_name && `${data.user.first_name} ${data.user.last_name}`}</h4>
                                    <p className="location"><i className="fa fa-envelope me-2" aria-hidden="true"></i>{data && data.user && data.user.email && data.user.email}</p>
                                    <p className="location"><i className="fa fa-phone me-2" aria-hidden="true"></i> {data && data.user && data.user.mobile_no && data.user.mobile_no}</p>
                                </div>
                            </div>
                        </Col>


                        <Col>
                            <div className="customer_feedback">
                                <h6 className="meefont text-white bfont mb-0">Feedback From Customer</h6>
                                <div className="d-flex rating_star">
                                    <i className="fa fa-star me-1" aria-hidden="true"></i>
                                    <i className="fa fa-star me-1" aria-hidden="true"></i>
                                    <i className="fa fa-star me-1" aria-hidden="true"></i>
                                    <i className="fa fa-star me-1" aria-hidden="true"></i>
                                </div>
                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </Col>
                    </Row>


                </Container>
            </div>



        </div>

    </>)
}
export default BookingDetails;