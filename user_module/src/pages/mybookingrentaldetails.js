import React ,{Component} from "react";
import {Container,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
// import OwlCarousel from 'react-owl-carousel';  
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import car_img from '../assets/images/car_img.png';
import adventure_vendor from '../assets/images/adventure_vendor.png';
import rental_image from '../assets/images/rental_img.png';

class MyBookingRentalDetails extends Component{

    state = {

        rentalinfo: [
            { label: "Category", value: "Rental" },
            { label: "Vehicle", value: "Mahindra Thar" },
            { label: "Vehicle Type", value: "Car" },
            { label: "What to take", value: "Shoes, Keen Guard" },
            { label: "Things included", value: "Food, DJ" }
        ],

        data: [
            { img: rental_image, title: "BMW G310R", rating: "4.5", reviews: "300", price: "$70" },
            { img: rental_image, title: "BMW G310R", rating: "4.5", reviews: "300", price: "$70" }
                ]
    
      }

    render(){

        let { rentalinfo, data } = this.state
        
        return(<>
        
        <section className="activity_top_img">
          {/* <OwlCarousel items={1} className="owl-theme custom_owl" loop margin={2} >
            <div className="activities_main">
              <img className="img-fluid" src={car_img} alt="car_img" />
            </div>
          </OwlCarousel> */}
        </section>

        <section className="activities_details bg_black pt-5 ">
            <Container>
                <Row>
                    <Col lg={8}>
                        <div className="activity_title">
                            <div className="title d-flex justify-content-between align-items-between">
                                <div>
                                    <h1>Mahindra Thar</h1>
                                    <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i> 1st Block, Rammurthy nagar, Bangalore</p>

                                    <div className="rating d-flex align-items-center mt-3">
                                        <p className="ratingstar">4.6 <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                        <p className="ms-1 reviews">(300 Reviews)</p>
                                    </div>
                                </div>

                                <div className="vendor_profile">
                                    <a href="#">
                                        <img src={adventure_vendor} />
                                        <p>Adventure King</p>
                                    </a>   
                                </div>
                            </div>

                        </div>

                        <hr className="custom_hr" />

                        <div className="activy_details">
                            <h4 className="sec_tite">Activity Details</h4>

                            <ul>
                                {rentalinfo.map(op => (
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">{op.label}</p>
                                            <p>{op.value}</p>
                                        </div>
                                    </li>
                                 ))}
                            </ul>
                        </div>

                        <hr className="custom_hr" />

                        <div className="info">
                            <p className="title">Itinerary</p>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. okay</p>
                        </div>

                        <hr className="custom_hr" />

                        <div className="info pb-5">
                            <p className="title">Map Location</p>
                            <div className="vendor_location mt-2">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="250" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                            </div>
                        </div>
                       
                    </Col>

                    <Col lg={4}>

                        {/* booking form start */}
                        <div className="dark_form_bg top_margin">
                            <div className="price"><h1>$70<span>/ You Paid</span></h1></div>
                            
                            <ul className="booking_details_list">
                                <li><h4 class="sec_tite mt-2">Booking Information</h4></li>
                                <li>
                                    <p>Booking ID</p>
                                    <p>ADG356</p>
                                </li>
                                <li>
                                    <p>Status</p>
                                    <p>Pending</p>
                                </li>
                                <li>
                                    <p>Number of Vehicle</p>
                                    <p>4</p>
                                </li>
                                <li>
                                    <p>Frome Date</p>
                                    <p>20-01-2022</p>
                                </li>
                                <li>
                                    <p>To Date</p>
                                    <p>22-01-2022</p>
                                </li>
                            </ul>
                            <small className="text-center note mt-2">Note : You can cancel the booking before <br /> 24hrs</small>

                            <Link to="/activity_payment" className="custom_btn w100 dark_bg">Cancel Booking</Link>
                            {/* <Button variant="primary" type="submit" className="custom_btn w100" >Book Now</Button> */}

                        </div>
                        {/* booking form start */}
                    </Col>
                </Row>
            </Container>
        </section>
        </>)
        
    }
}
export default MyBookingRentalDetails;