import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import activity_image from '../assets/images/activity_image.png';
import rental_image from '../assets/images/rental_img.png';
import { Player } from 'video-react';
import NavBar from "../Common/navBar";
import Footer from "../Common/footer";
import http from "../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
class MyBookings extends Component {

  state = {
    loder: false,
    allActivity: [],
    dataactivity: [],
    datarental: [],
    dataTaxi: []



  }



  componentDidMount() {
    let s1 = { ...this.state }
    this.setState({ loder: true })
    console.log("jjkjkj")
    http.getList(`v1/user/get_all_bookings`).then((res) => {
      if (res.status == 200) {
        console.log(res)
        this.setState({ allActivity: res.data, loder: false })
      } else {
        this.setState({ loder: false })
      }
    }).catch((err) => {
      this.setState({ loder: false })
    })
  }

  render() {

    let { allActivity, datarental, dataactivity,dataTaxi } = this.state
    if (allActivity.length != 0) {
      datarental = allActivity.filter(op => op.activity_category == "Rental")
      dataactivity = allActivity.filter(op => op.activity_category == "Adventure")
    }


    return (<>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loder}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NavBar />
      <div className="bg_black ">

        {/* top banner section start*/}
        <section className="top_banner">
          <Container>
            <Row>
              <Col xl={6}>
                <h1>My Booking</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </Col>
            </Row>
          </Container>
        </section>
        {/* top banner section end*/}

        <section className="mybooking_tab">
          <div className="search_form1">
            <Container>
              <Tabs
                defaultActiveKey="All"
                transition={false}
                id="noanim-tab-example"
                className="mb-4 custom_tab"
              >
                <Tab eventKey="All" title="All">
                  <div className="booking_lists">
                    <div className="sec_heading text-center mb-4 mt-4">
                      <h1>All Activity</h1>
                    </div>
                    <Row>
                      {allActivity&&allActivity.length != 0 && allActivity.map(op => (
                        <>
                          <Col xl={3} lg={4} sm={6} xs={12} className="mb-4">
                            <Link to={`/mybooking_details/${op.activity_category}/${op.id}`}>
                              <div class="activityBox">
                                <div class="activityimg text-center">
                                  <div class="activityPick">
                                    <img src={op.images&&op.images[0] && op.images[0].media_path} alt="" />
                                    <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                                  </div>
                                </div>
                                {/* <div class="activityVideo">
                                <Player style={{ width: '100%', height: '100%' }}
                                  playsInline
                                  poster="/assets/poster.png"
                                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                />
                              </div> */}
                              </div>
                              <div class="activityinfo d-flex align-items-center justify-content-between">
                                <div>
                                  <p className="location"><i class="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                                  <Link to="/mybooking_details"><h6 className="title">{op.title}</h6></Link>
                                  <p className="booking_stats yellow" style={op.status=="5"?{color:"red"}:{color:"yellow"}}>{op.status == "1" ? "Pending" : op.status == "2" ? "In Progress" : op.status == "3" ? "Abandoned" : op.status == "4" ? "Completed" : op.status == "5" ? "Cancelled" : ""}</p>
                                </div>
                                <div className="price">
                                  <h5>{op.total_price}</h5>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        </>
                      ))}
                      {allActivity.length == 0 && <span className="text-danger text-center pt-5">No booking Availabe Book your activity</span>}
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="Activity" title="Activity">
                  <div className="booking_lists">
                    <div className="sec_heading text-center mb-4 mt-4">
                      <h1>Adventure Bookings</h1>
                    </div>
                    <Row>
                      {dataactivity.length != 0 && dataactivity.map(op => (
                        <>
                          <Col xl={3} lg={4} sm={6} xs={12} className="mb-4">
                            <Link to={`mybooking_details/${op.activity_category}/${op.id}`}>
                              <div class="activityBox">
                                <div class="activityimg text-center">
                                  <div class="activityPick">
                                    <img src={op.images&&op.images[0] && op.images[0].media_path} alt="" />
                                    <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                                  </div>
                                </div>
                                {/* <div class="activityVideo">
                                <Player style={{ width: '100%', height: '100%' }}
                                  playsInline
                                  poster="/assets/poster.png"
                                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                />
                              </div> */}
                              </div>
                              <div class="activityinfo d-flex align-items-center justify-content-between">
                                <div>
                                  <p className="location"><i class="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                                  <Link to="/mybooking_details"><h6 className="title">{op.title}</h6></Link>
                                  <p className="booking_stats yellow" style={op.status=="5"?{color:"red"}:op.status=="4"?{color:"green"}:{color:"yellow"}}>{op.status == "1" ? "Pending" : op.status == "2" ? "In Progress" : op.status == "3" ? "Abandoned" : op.status == "4" ? "Completed" : op.status == "5" ? "Cancelled" : ""}</p>
                                </div>
                                <div className="price">
                                  <h5>{op.total_price}</h5>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        </>
                      ))}
                      {dataactivity.length == 0 && <span className="text-danger text-center pt-5">No Adventure booking Availabe Book your Adventure activity</span>}
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="Rental" title="Rental">
                  <div className="booking_lists">
                    <div className="sec_heading text-center mb-4  mt-4">
                      <h1>Rental Bookings</h1>
                    </div>
                    <Row>
                      {datarental.length != 0 && datarental.map(op => (
                        <>
                          <Col xl={3} lg={4} sm={6} xs={12} className="mb-4">
                            <Link to={`mybooking_details/${op.activity_category}/${op.id}`}>
                              <div class="activityBox">
                                <div class="activityimg text-center">
                                  <div class="activityPick">
                                    <img src={op.images&&op.images[0] && op.images[0].media_path} alt="" />
                                    <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                                  </div>
                                </div>
                                {/* <div class="activityVideo">
                                <Player style={{ width: '100%', height: '100%' }}
                                  playsInline
                                  poster="/assets/poster.png"
                                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                />
                              </div> */}
                              </div>
                              <div class="activityinfo d-flex align-items-center justify-content-between">
                                <div>
                                  <p className="location"><i class="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                                  <h6 className="title">{op.title}</h6>
                                  <p className="booking_stats yellow" style={op.status=="5"?{color:"red"}:op.status=="4"?{color:"green"}:{color:"yellow"}}>{op.status == "1" ? "Pending" : op.status == "2" ? "In Progress" : op.status == "3" ? "Abandoned" : op.status == "4" ? "Completed" : op.status == "5" ? "Cancelled" : ""}</p>
                                </div>
                                <div className="price">
                                  <h5>{op.total_price}</h5>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        </>
                      ))}
                      {datarental.length == 0 && <span className="text-danger text-center pt-5">No Rental booking Availabe Book your Rental activity</span>}
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="Taxi" title="Taxi">
                  <div className="search_form_area mb-4 mt-4">
                    <Form className="d-sm-inline-flex">
                      <Form.Group className="custom_input me-1">
                        <Form.Control placeholder="Pickup Location" />
                        <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/location-sharp.svg`} alt="logo" />
                      </Form.Group>
                      <Form.Group className="custom_input me-1">
                        <Form.Control placeholder="Drop Location" />
                        <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/location-sharp.svg`} alt="logo" />
                      </Form.Group>

                      <Form.Group className="custom_input me-1">
                        <Form.Select>
                          <option>Select Activity</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="custom_input me-1">
                        <Form.Control placeholder="dd/mm/yy" />
                      </Form.Group >
                      <Form.Group className="custom_input">
                        <Button variant="primary" className="custom_btn">Search</Button>
                      </Form.Group >
                    </Form>

                  </div>
                  <div className="booking_lists">
                  <Row>
                    {dataTaxi.length!=0&&dataTaxi.map(op => (
                      <>
                        <Col xl={3} lg={4} sm={6} xs={12} className="mb-4">
                          <div class="activityimg text-center">
                            <img src={op.img} alt="" />
                            <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                          </div>
                          <div class="activityinfo d-flex align-items-center justify-content-between">
                            <div>
                              <p className="location"><i class="fa fa-map-marker me-1" aria-hidden="true"></i>Canada</p>
                              <Link to="activity-details"><h6 className="title">{op.title}</h6></Link>
                              <p className="booking_stats yellow" style={op.status=="5"?{color:"red"}:op.status=="4"?{color:"green"}:{color:"yellow"}}>{op.status}</p>
                            </div>
                            <div className="price">
                              <h5>{op.price}</h5>
                              <p>/Day</p>
                            </div>
                          </div>
                        </Col>
                      </>
                    ))}
                      {dataTaxi.length == 0 && <span className="text-danger text-center pt-5">No Taxi booking Availabe Now Book your Taxi</span>}

                  </Row>
                  </div>

                </Tab>
              </Tabs>

            </Container>
          </div>
        </section>
      </div>
      <Footer />
    </>
    )
  }
}
export default MyBookings;