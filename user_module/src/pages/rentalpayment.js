import React ,{Component} from "react";
import {Container,Row,Col,Button,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import OwlCarousel from 'react-owl-carousel';  
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import car_img from '../assets/images/car_img.png';


class RentalPayment extends Component{

    state = {

        rentalinfo: [
            { label: "Category", value: "Rental" },
            { label: "Vehicle", value: "Mahindra Thar" },
            { label: "Vehicle Type", value: "Car" },
            { label: "What to take", value: "Shoes, Keen Guard" },
            { label: "Things included", value: "Food, DJ" }
        ]

      }

    render(){

        let { rentalinfo } = this.state
        
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
                            <div className="title">
                                <div>
                                    <h1>Mahindra Thar</h1>
                                    <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i> 1st Block, Rammurthy nagar, Bangalore</p>

                                    <div className="rating d-flex align-items-center mt-3">
                                        <p className="ratingstar">4.6 <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                        <p className="ms-1 reviews">(300 Reviews)</p>
                                    </div>
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

                        <h4 class="sec_tite mb-2">Add-One</h4>

                        <ul className="addons_label pb-5">
                            <li className="d-flex align-items-center justify-content-between mb-3">
                                <div className="addone_items">
                                    <p>Shoes</p>
                                    <small>$40/Pair</small>
                                </div>

                                <div className="solid_input"><Form.Control type="number" placeholder="1" className="select_input" /></div>

                                <div>
                                    <p>10</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                                <div className="addone_items">
                                    <p>Shoes</p>
                                    <small>$40/Pair</small>
                                </div>

                                <div className="solid_input"><Form.Control type="number" placeholder="1" className="select_input" /></div>

                                <div>
                                    <p>10</p>
                                </div>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={4}>

                        {/* booking form start */}
                        <div className="dark_form_bg top_margin">
                            <div className="price"><h1>$280</h1></div>
                            <Form className="label_form payment_form" >
                                <div className="m-3">
                                    <Form.Label>Make Payment</Form.Label>
                                    <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" />
                                        <div className="ms-3">
                                            <p><b>My Wallet</b></p>
                                            <small>$10 Balance in Wallet</small>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="m-3">
                                    <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" />
                                        <div className="ms-3">
                                            <p><b>**** **** **** 9876</b></p>
                                            <small>Expires Jan/2025</small>
                                        </div>
                                    </Form.Group>
                                </div>

                                <hr className="custom_hr" />
                                
                                <div className="text-center mb-4">
                                    <Link to="" className="white_link">ADD NEW CARD</Link>
                                </div>
                                
                                

                                <Button variant="primary" type="submit" className="custom_btn w100">Make Payment</Button>
                            </Form>
                        </div>
                        {/* booking form start */}
                    </Col>
                </Row>
            </Container>
        </section>
        </>)
        
    }
}
export default RentalPayment;