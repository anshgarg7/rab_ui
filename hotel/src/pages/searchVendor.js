import React, { Component } from "react";
import { Container, Nav, Tab, Row, Table, Col, Form, } from "react-bootstrap";
import '../assets/css/style.css';
import {Link} from "react-router-dom";
import bike_img from '../assets/images/bike.png';
import activity_image from '../assets/images/activity_image.png';
import { Player } from 'video-react';

class SearchVendor extends Component {

    state={
        data: [{ img: activity_image, title: "Paragliding in Manali", rating: "4.5", price: "$70", text: "check availability" },
        { img: activity_image, title: "Paragliding in Manali", rating: "4.5", price: "$70", text: "check availability" },
        { img: activity_image, title: "Paragliding in Manali", rating: "4.5", price: "$70", text: "check availability" },
        ]
     
    }

    render() {
    let {data} = this.state
        return (<>

            <Container fluid>
                <div className="selectbooking text-white">
                    <Row>
                        <Col lg={3} md={6} sm={12}>
                            <div className="editform1 mb-2">
                                <Form.Label className="form-label">Service</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option selected>Activity</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <div className="editform1 mb-2">
                                <Form.Label className="form-label">Category</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option selected>Paragliding</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                            </div>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <div className="editform1 mb-2">
                                <Form.Label className="form-label">Date</Form.Label>
                                <div className="d-flex detail1">
                                    <Form.Control className="dateedit1" type="date" />
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <div className="editform1 mb-2">
                                <Form.Label className="form-label"></Form.Label>
                                <div className="d-flex justify-content-center detail">
                                    <button className="addbut4">Search</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="myreferralList py-4 text-white">
                    <div className="activity1">
                        <h4 className="text-white mb-4">Activity</h4>
                      
            <Row>


{data.map(op => (
  <>
    <Col xl={4} lg={4} sm={6} xs={12} className="mb-4">
      <div class="activityBox">
        <div class="activityimg text-center">
          <div class="activityPick">
            <img src={op.img} alt="" />
            <span><i class="fa fa-heart" aria-hidden="true"></i></span>
          </div>
        </div>
        <div class="activityVideo">
                        <Player style={{width:'100%', height:'100%'}}
                          playsInline
                          poster="/assets/poster.png"
                          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        />
                      </div>
      </div>

      <div class="activityinfo d-flex align-items-center justify-content-between">
        <div>
          <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i>Canada</p>
          <Link to="activity-details"><h6 className="title">{op.title}</h6></Link>
          <div className="rating d-flex align-items-center">
            <p className="ratingstar">{op.rating}<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
            {/* <p className="ms-1 reviews">({op.reviews})</p> */}
            <a  onClick={()=>this.handleModelAvaibilty(true)}><p className="checkavailability ms-2">  {op.text}</p></a>
          </div>
        </div>
        <div className="price">
          <h5>{op.price}</h5>
          <p>/person</p>

        </div>
      </div>
    </Col>
  </>
))}

</Row>
                    </div>

                    <div className="Rentals my-4">
                        <h4 className="text-white mb-4">Rentals</h4>
                        <Row>
                       
                        <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                        <div className="position-relative">
                                <div className="activityimg text-center">
                                    <img src={bike_img} alt="" />
                                </div>
                                <div className="activityinfo p-3">

                                    <div className="location">
                                    <div className="likeheart"><i class="fa fa-heart" aria-hidden="true"></i></div>
                                        <div className="mb-1">
                                        <p><i class="fa fa-map-marker me-2" aria-hidden="true"></i>Canada</p>
                                        </div>
                                        <div className="paragliding d-flex">
                                        <h6><Link className="text-white" to="rentalActivityDetails"> BMW G310R</Link></h6>
                                            <h6>$100</h6>
                                        </div>
                                        <div className="activityrating1 d-flex">
                                            <div className="activityrating d-flex">
                                                <p>4.5 </p>
                                                <i class="fa fa-star ms-2" aria-hidden="true"></i>
                                            </div>
                                            <p className="ms-2">(546 Reviews)</p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Container>

        </>)
    }


}
export default SearchVendor;