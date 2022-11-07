import React, { Component } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import activity_img from '../../assets/images/activity_img.png';

class RentalDetails extends Component {

    state = {
        images: []
    }

    render() {
        let { data,price } = this.props
        let { images } = this.state
        if (data && data.images) {
            data.images.map(op => {
                images.push({ url: op.media_path })
            })
        }
        return (
            <>
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
                        {/* <div className="me-3">

                            <img src={activity_img} alt="activity_image" />
                        </div> */}

                        <div>
                            <h4 className="title"> {data && data.title && data.title}</h4>
                            <div className="rating d-flex align-items-center">
                                <p className="ratingstar">4.5<i className="fa fa-star ms-1" aria-hidden="true"></i></p>
                                <p className="ms-1 reviews">(546 Reviews)</p>
                            </div>
                            <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i> 1st Block, Rammurthy nagar, Bangalore, 6472</p>

                        </div>

                        <div className="ms-auto">
                            <div className="price">
                                <p>Recieved</p>
                                <h6>{price}</h6>
                            </div>
                            <Link to="" className="custom_btn">Cancel Booking</Link>
                        </div>
                    </div>
                </Row >
            </>)

    }
}
export default RentalDetails