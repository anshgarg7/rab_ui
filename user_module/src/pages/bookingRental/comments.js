import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import LocationPicker from 'react-location-picker';
import { Link } from "react-router-dom";

class Comments extends Component {

    state = {   
        max_length: 160,
    }
    render() {

        const warning  = this.props.data && this.props.data.warning

        return (
            <>
                <div className="info">
                    <p className="title">Warning</p>
                    {warning&&warning.length > this.state.max_length ?
                    (
                        <p>
                            {`${warning.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={()=>this.setState({max_length:warning.length})}>Read more</button>           
                        </p>
                    ) :
                        <p>{warning} <button type="button" className="readMore" onClick={()=>this.setState({max_length:160})}>Read less</button></p>
                    }
                    {/* <p>{this.props.data &&this.props.data.warning && this.props.data.warning}</p> */}
                </div>

                <hr className="custom_hr" />

                <div className="info">
                    <p className="title">Map Location</p>
                    <div className="vendor_location mt-2">
                        <LocationPicker
                            zoom={14}
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '400px' }} />}
                            defaultPosition={this.props.defaultPosition}
                        // onChange={this.handleLocationChange}
                        />
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="250" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                    </div>
                </div>

                <hr className="custom_hr" />

                <h4 className="sec_tite">Comments(10)</h4>

                <ul className="comment_listing">
                    <li>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                        <small>5min ago</small>
                    </li>

                    <li>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                        <small>10min ago</small>
                    </li>

                    <li>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                        <small>15min ago</small>
                    </li>
                </ul>

                <Form className="label_form mt-3">
                    <Form.Group className="mb-3 form_grp">
                        <Form.Label>Comment</Form.Label>
                        {/* <Form.Control type="text" placeholder="Search here" /> */}
                        <Form.Control as="textarea" rows={3} placeholder="Enter Someting Here" />
                        <Button variant="primary" type="submit" className="custom_btn">Post</Button>
                    </Form.Group>
                </Form>


                <hr className="custom_hr" />

                {/* Acivities and rental sec start */}
                <section className="pb-5">
                    <Container fluid>
                        <div className="sec_heading text-center mb-4">
                            <h1>Top Rental Near You!</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing.</p>
                        </div>

                        {/* <Row>
                            {this.props.data.map(op => (
                                <>
                                    <Col xl={6} sm={12} className="mb-4">
                                        <div class="activityimg text-center">
                                            <img src={op.img} alt="" />
                                            <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                                        </div>
                                        <div class="activityinfo d-flex align-items-center justify-content-between">
                                            <div>
                                                <p className="location"><i class="fa fa-map-marker me-1" aria-hidden="true"></i>Canada</p>
                                                <Link to="activity-details"><h6 className="title">{op.title}</h6></Link>

                                                <div className="rating d-flex align-items-center">
                                                    <p className="ratingstar">{op.rating}<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                                    <p className="ms-1 reviews">({op.reviews} Reviews)</p>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <h5>{op.price}</h5>
                                                <p>/Day</p>
                                            </div>
                                        </div>
                                    </Col>
                                </>
                            ))}
                        </Row> */}
                    </Container>
                </section>


            </>)
    }
}
export default Comments;