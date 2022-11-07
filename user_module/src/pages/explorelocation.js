import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import activity_image from '../assets/images/activity_image.png';
import location_Himachal from '../assets/images/location_img.png';
import surfing from '../assets/images/surfing.png';
import { Player } from 'video-react';
import http from "../Helper/http";
import NavBar from "../Common/navBar";
import Footer from "../Common/footer"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import OwlCarousel from 'react-owl-carousel2';  
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class ExploreLocation extends Component {

    state = {
        loaction: null,
        setIndex: 5,
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

        infoLoaction: {},
        allActivity: [],
       
        owldata: [
            { img: activity_image, title: "Goa" },
            { img: location_Himachal, title: "Himachal" },
            { img: activity_image, title: "Uttarakhand" },],



        categoryArr: [{ img: surfing, title: "Surfing" },
        { img: surfing, title: "Surfing" },
        { img: surfing, title: "Surfing" },
        { img: surfing, title: "Surfing" },
        { img: surfing, title: "Surfing" },]

    }
    callGetApi = (url, val) => {
        this.setState({ loder: true })
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
        let { loaction } = this.props.match.params
        this.setState({ loder: true })
        console.log(loaction)
        if (loaction) {
            this.callGetApi(`v1/user/get_activity_place_all_activities/${loaction}`, "infoLoaction")
            this.callGetApi(`v1/user/get_all_location/${loaction}`, "placeData")
            this.callGetApi(`v1/user/get_all_activities/${loaction}`, "categoryArr")
            this.callGetApi(`v1/user/get_popular_activities/${loaction}`, "data")
            this.callGetApi(`v1/user/get_all_rental_adventure_activities/${loaction}`, "allActivity")
            this.setState({ loaction: loaction })
        } else {
            this.callGetApi(`v1/user/get_all_activities`, "categoryArr")
            this.callGetApi(`v1/user/get_activities_places`, "placeData")
            this.callGetApi(`v1/user/get_popular_activities`, "data")
            this.callGetApi(`v1/user/get_all_rental_adventure_activities`, "allActivity")

        }
    }
    fillPlaceData = () => {
        let s1 = { ...this.state }
        if (s1.placeData.length !== 5) {
            for (let i = 0; s1.placeData.length != 5; i++) {
                s1.placeData.push({ image: activity_image, state: "" })
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


        let { data, loaction, categoryArr, setIndex, placeData, allActivity } = this.state
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
                            <h1>Explore {loaction ? loaction : "Experiences"}</h1>
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

                {/* locations sec start */}
                <section className=" pb-5">
                    <div className="sec_heading text-center mb-4">
                        <h1>Explore {placeData && placeData.length}+ Locations in {loaction ? loaction : "India"}</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing.</p>
                    </div>
                    <Container>

                        <OwlCarousel responsive={this.state.responsive} className="owl-theme custom_owl" loop margin={15} >
                            {placeData && placeData.length != 0 && placeData.map((op,index) => (

                                <div className="offer_details" key={index}>
                                    <div className="location_box">
                                        {!loaction
                                            ? <a href={`/explorelocation/${op.state}`} className="location_box">
                                                <img src={op.image ? op.image : activity_image} alt="" />
                                                <div className="text-shadow"></div>
                                                <p>{op.state ? op.state : op.location ? op.location : ""}</p>
                                            </a> : <>
                                                <img src={op.image ? op.image : activity_image} alt="" />
                                                <div className="text-shadow"></div>
                                                <p>{op.state ? op.state : op.location ? op.location : ""}</p>

                                            </>}

                                    </div>
                                </div>


                            ))}
                        </OwlCarousel>
                    </Container>

                </section>
                {/* locations sec end */}

                {/* Acivities list sec start */}
                <section className="activities_list_sec pb-5">
                    <div className="sec_heading text-center mb-4">
                        <h1>What would you like to do?</h1>
                        <p>{categoryArr.length == 0 ? <span className="text-danger">No Category Found</span> : "Lorem Ipsum is simply dummy text of the printing."}</p>
                    </div>
                    <Container>
                        <OwlCarousel responsive={this.state.responsive1} className="owl-theme custom_owl" loop margin={5} nav={true} navText={[
                            '<span class="arrow prev">‹</span>',
                            '<span class="arrow next">›</span>'
                        ]}>
                            {categoryArr && categoryArr.map((op,index) => (
                                <Link to={!loaction ? `/explorelocation/${op.activity_category}/${op.id}` : `/explorelocation/${loaction}/${op.activity_category}/${op.id}`}>
                                    <div className="offer_details"  key={index}>
                                        <a href="" className="activities_list">
                                            <img src={op.image ? op.image : surfing} alt="" />
                                            <p>{op.title ? op.title : "Skiing"}</p>
                                        </a>

                                    </div>
                                </Link>
                            ))}
                        </OwlCarousel>
                    </Container>

                </section>
                {/* Acivities list sec end */}


                {/* Acivities and rental sec start */}
                <section className="pb-5">
                    <Container>
                        <div className="sec_heading text-center mb-4">
                            <h1>Top Activity in {loaction ? loaction : "India"}</h1>
                            <p>{data && data.length == 0 ? <span className="text-danger">No Top Activity Found</span> : "  Lorem Ipsum is simply dummy text of the printing."}</p>
                        </div>

                        <Row>


                            {data && data.length != 0 && data.map((op, index) => (
                                index <= setIndex
                                    ? <>
                                        <Col xl={4} lg={4} sm={6} xs={12} className="mb-4"  key={index}>
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
                        {data.length > 5
                            && <div className="text-center">
                                <Button variant="primary" type="submit" className="custom_btn" onClick={() => this.setState({ setIndex: setIndex + 5 })}>View More</Button>
                            </div>}

                    </Container>
                </section>
                {/* //////////////////////////////////////////////All Activity /////////////////////////////////////////////////////// */}
                <section className="pb-5">
                    <Container>
                        <div className="sec_heading text-center mb-4">
                            <h1>All Adventure in {loaction ? loaction : "India"}</h1>
                            <p>{allActivity && allActivity.find(op => op.activity_category == "Adventure") ? "Lorem Ipsum is simply dummy text of the printing." : <span className="text-danger">No Adventure Found</span>}</p>
                        </div>

                        <Row>
                            {allActivity && allActivity.length != 0 && allActivity.map((op, index) => (
                                index <= setIndex && op.activity_category == "Adventure"
                                    ? <>
                                        <Col xl={4} lg={4} sm={6} xs={12} className="mb-4"  key={index}>
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
                        {allActivity.length > 5
                            && <div className="text-center">
                                <Button variant="primary" type="submit" className="custom_btn" onClick={() => this.setState({ setIndex: setIndex + 5 })}>View More</Button>
                            </div>}

                    </Container>
                </section>
                <section className="pb-5">
                    <Container>
                        <div className="sec_heading text-center mb-4">
                            <h1>All Rental in {loaction ? loaction : "India"}</h1>
                            <p>{allActivity && allActivity.find(op => op.activity_category == "Rental") ? "Lorem Ipsum is simply dummy text of the printing." : <span className="text-danger">No rental found</span>}</p>
                        </div>

                        <Row>
                            {allActivity && allActivity.length != 0 && allActivity.map((op, index) => (
                                index <= setIndex && op.activity_category == "Rental"
                                    ? <>
                                        <Col xl={4} lg={4} sm={6} xs={12} className="mb-4"  key={index}>
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
                        {allActivity.length > 5
                            && <div className="text-center">
                                <Button variant="primary" type="submit" className="custom_btn" onClick={() => this.setState({ setIndex: setIndex + 5 })}>View More</Button>
                            </div>}

                    </Container>
                </section>
                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                {/* Acivities and rental sec end */}




            </div>
            {/*activity section end */}
            <Footer />
        </>


        )
    }
}
export default ExploreLocation;