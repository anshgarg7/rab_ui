import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import activity_image from '../../assets/images/activity_image.png';
import location_Himachal from '../../assets/images/location_img.png';
import surfing from '../../assets/images/surfing.png';
import { Player } from 'video-react';
// import ModelAvailability from "./model";
import http from "../../Helper/http";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import NavBar from "../../Common/navBar";
import Footer from "../../Common/footer"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import OwlCarousel from 'react-owl-carousel2';  
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Carousel from 'react-elastic-carousel';
import Slider from "react-slick";

class AllAdventure extends Component {

    state = {
        loaction: null,
        category: null,
        categoryAll: [],
        setIndex: 9,
        breakPoints: [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2 },
            { width: 768, itemsToShow: 3 },
            { width: 1200, itemsToShow: 4 },
        ],

        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 5,
            },
        },
        responsive1: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 7,
            },
        },
        placeData: [],
        data: [],

    }
    callGetApi = (url, val) => {
        http.getData(url).then(res => {

            if (res.status == 200) {
                console.log("============", res)
                this.setState({ [val]: res.data, loder: false })
            }
        }).catch(err => {
            this.setState({ loder: false })
            console.log(err)
        })
    }

    componentDidMount() {
        let s1 = { ...this.state }
        let { category } = this.props.match.params
        this.setState({ loder: true })

        if (category == "Adventure") {
            this.callGetApi(`v1/user/get_all_adventure_activities`, "categoryAll")
            this.callGetApi(`v1/user/get_category_popular_activities/Adventure`, "data")
            this.setState({ category: category })
        } else {
            this.callGetApi(`v1/user/get_all_rental_activities`, "categoryAll")
            this.callGetApi(`v1/user/get_category_popular_activities/Rental`, "data")
            this.setState({ category: category })

        }
    }
    fillPlaceData = () => {
        let s1 = { ...this.state }
        if (s1.placeData.length !== 5) {
            for (let i = 0; s1.placeData.length != 5; i++) {
                s1.placeData.push({ image: activity_image, state: "Punjab" })
            }
        }
        this.setState(s1)
    }
    render() {

        const options = {
            items: 1,
            nav: true,
            rewind: true,
            autoplay: true
        };

        let { data, category, setIndex, categoryAll } = this.state
        // if (placeData.length !== 0 && placeData.length != 5) {
        //     this.fillPlaceData()
        // }
        return (<>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.loder}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* top banner section start*/}
            <NavBar />
            <section className="top_banner">
                <Container>
                    <Row>
                        <Col xl={6}>
                            <h1>Explore All {this.state.category}</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <Form className="mt-3">
                                <Form.Group className="mb-3 form_grp">
                                    <Form.Control type="text" placeholder="Search here" />
                                    <Button variant="primary" type="submit" className="custom_btn">Search</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* top banner section end*/}


            {/*activity section start */}
            <div className="largebg pb-5 pt-5">


                <section className="pb-5">
                    <Container>
                        <div className="sec_heading text-center mb-4">
                            <h1>All {this.state.category}</h1>
                            <p>{categoryAll && categoryAll.length != 0 ? "Lorem Ipsum is simply dummy text of the printing." : <span className="text-danger">No {this.state.category} available</span>}</p>
                        </div>

                        <Row>


                            {categoryAll && categoryAll.length != 0 && categoryAll.map((op, index) => (
                                index <= setIndex
                                    ? <>
                                        <Col xl={4} lg={4} sm={6} xs={12} className="mb-4">
                                            <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}><div class="activityBox">
                                                <div class="activityimg text-center">
                                                    <div class="activityPick">
                                                        <img src={op.images[0].media_path} alt="" />
                                                        <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                                                    </div>
                                                </div>
                                            </div>

                                                <div class="activityinfo">
                                                    <div className="address">
                                                        <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                                                        <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}>
                                                            <h6 className="title">{op.title}</h6>

                                                        </Link>
                                                        <div className="priceflex">
                                                            <div className="rating d-flex align-items-center">
                                                                <p className="ratingstar">5<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                                                <a onClick={() => this.handleModelAvaibilty(true)}><p className="checkavailability ms-2">  </p></a>
                                                                <p className="ms-1 reviews">(256 reviews)</p>
                                                            </div>
                                                            <div className="price">
                                                                {op.price[op.price.length - 1]
                                                                    ? <>
                                                                        <h5>{op.price[op.price.length - 1] && op.price[op.price.length - 1].amount} <p>/{op.price[op.price.length - 1] && op.price[op.price.length - 1].no_of_person}</p></h5>

                                                                    </>
                                                                    : <>
                                                                        <p>{op.price.per_hour && op.price.per_hour.amount}<span> /Hour</span></p>
                                                                        <p>/{op.price.per_day && op.price.per_day.amount}<span> /Day</span></p>
                                                                    </>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div></Link>
                                        </Col>

                                    </>
                                    : ""
                            ))}

                        </Row>
                        {categoryAll && categoryAll.length > 5 &&
                            <div className="text-center">
                                <Button variant="primary" type="submit" className="custom_btn" onClick={() => this.setState({ setIndex: setIndex + 5 })}>View More</Button>
                            </div>
                        }

                    </Container>
                </section>


                {/* Acivities and rental sec start */}
                <section className="pb-5">
                    <Container>
                        <div className="sec_heading text-center mb-4">
                            <h1>Popular {this.state.category}</h1>
                            <p>{data && data.length != 0 ? "Lorem Ipsum is simply dummy text of the printing." : <span className="text-danger">No Any Popular Things</span>}</p>
                        </div>

                        <Row>


                            {data && data.length != 0 && data.map((op, index) => (
                                index <= setIndex
                                    ? <>
                                        <Col xl={4} lg={4} sm={6} xs={12} className="mb-4">
                                            <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}><div class="activityBox">
                                                <div class="activityimg text-center">
                                                    <div class="activityPick">
                                                        <img src={op.images[0].media_path} alt="" />
                                                        <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                                                    </div>
                                                </div>
                                            </div>

                                                <div class="activityinfo">
                                                    <div className="address">
                                                        <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                                                        <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}>
                                                            <h6 className="title">{op.title}</h6>

                                                        </Link>
                                                        <div className="priceflex">
                                                            <div className="rating d-flex align-items-center">
                                                                <p className="ratingstar">5<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                                                <a onClick={() => this.handleModelAvaibilty(true)}><p className="checkavailability ms-2">  </p></a>
                                                                <p className="ms-1 reviews">(256 reviews)</p>
                                                            </div>
                                                            <div className="price">
                                                                {op.price[op.price.length - 1]
                                                                    ? <>
                                                                        <h5>{op.price[op.price.length - 1] && op.price[op.price.length - 1].amount} <p>/{op.price[op.price.length - 1] && op.price[op.price.length - 1].no_of_person}</p></h5>

                                                                    </>
                                                                    : <>
                                                                        <p>{op.price.per_hour && op.price.per_hour.amount}<span> /Hour</span></p>
                                                                        <p>/{op.price.per_day && op.price.per_day.amount}<span> /Day</span></p>
                                                                    </>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div></Link>
                                        </Col>
                                    </>
                                    : ""
                            ))}

                        </Row>
                        {data && data.length > 5 &&
                            <div className="text-center">
                                <Button variant="primary" type="submit" className="custom_btn" onClick={() => this.setState({ setIndex: setIndex + 5 })}>View More</Button>
                            </div>
                        }
                    </Container>
                </section>
                {/* Acivities and rental sec end */}




            </div>
            {/*activity section end */}
            <Footer />
        </>


        )
    }
}
export default AllAdventure;