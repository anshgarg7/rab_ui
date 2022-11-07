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

class ExploreCategory extends Component {

    state = {
        categoryArr: [],
        loaction: null,
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
            console.log(err)
        })
    }

    componentDidMount() {
        let s1 = { ...this.state }
        let { state, activity_category, id } = this.props.match.params
        this.setState({ loder: true })

        if (state) {
            this.callGetApi(`v1/user/get_activities_of_selected_activity/${state}/${activity_category}/${id}`, "data")
            this.callGetApi(`v1/user/get_all_activities`, "categoryArr")
            this.setState({ id: id, state : state })
        } else {
            this.callGetApi(`v1/user/get_activities_of_selected_activity/${activity_category}/${id}`, "data")
            this.callGetApi(`v1/user/get_all_activities`, "categoryArr")
            this.setState({ id: id })
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
        console.log(this.state.infoLoaction, loaction)


        let { data, loaction, setIndex, placeData, categoryArr } = this.state
        if (placeData.length !== 0 && placeData.length != 5) {
            this.fillPlaceData()
        }
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
                            <h1>Explore {categoryArr && categoryArr.length != 0 && categoryArr.find(op => op.id == this.state.id).title} {this.state
                            .state&&"In"} {this.state.state&&this.state.state}</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            {/* <Form className="mt-3">
                                <Form.Group className="mb-3 form_grp">
                                    <Form.Control type="text" placeholder="Search here" />
                                    <Button variant="primary" type="submit" className="custom_btn">Search</Button>
                                </Form.Group>
                            </Form> */}
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* top banner section end*/}


            {/*activity section start */}
            <div className="largebg pb-5 pt-5">





                {/* Acivities and rental sec start */}
                <section className="pb-5">
                    <Container>
                        <div className="sec_heading text-center mb-4">
                            <h1>All {categoryArr && categoryArr.length != 0 && categoryArr.find(op => op.id == this.state.id).title} {this.state
                            .state&&"In"} {this.state.state&&this.state.state}</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing.</p>
                        </div>

                        <Row>


                            {data && data.length != 0 && data.map((op, index) => (
                                index <= setIndex
                                    ? <>
                                        <Col xl={4} lg={4} sm={6} xs={12} className="mb-4">
                                            <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}>
                                                <div class="activityBox">
                                                    <div class="activityimg text-center">
                                                        <div class="activityPick">
                                                            <img src={op.images[0].media_path} alt="" />
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
                                                        <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                                                        <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}><h6 className="title">{op.title}</h6></Link>
                                                        <div className="rating d-flex align-items-center">
                                                            <p className="ratingstar">{5}<i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                                            {/* <p className="ms-1 reviews">({op.reviews})</p> */}
                                                            <a onClick={() => this.handleModelAvaibilty(true)}><p className="checkavailability ms-2"></p></a>
                                                        </div>
                                                    </div>
                                                    <div className="price">
                                                        {op.price[0]
                                                            ? <>
                                                                <h5>{op.price[0] && op.price[0].amount}</h5>
                                                                <p>/{op.price[0] && op.price[0].no_of_person}</p>
                                                            </>
                                                            : <>
                                                                <p>{op.price.per_hour && op.price.per_hour.amount}<span>Per_hour</span></p>
                                                                <p>/{op.price.per_day && op.price.per_day.amount}<span>Per_Day</span></p>
                                                            </>}
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    </>
                                    : ""
                            ))}

                        </Row>

                        <div className="text-center">
                            <Button variant="primary" type="submit" className="custom_btn" onClick={() => this.setState({ setIndex: setIndex + 5 })}>View More</Button>
                        </div>

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
export default ExploreCategory;