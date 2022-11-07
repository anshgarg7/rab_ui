import React, { Component } from "react";
import { Container, Tabs, Tab, Row, Col, Button, Form } from "react-bootstrap";
import loc from "../../assets/images/loc.svg"

class TaxiBook extends Component {

    state = {
        error_message: "",
        warning: false,
        loder: false,
        form: { dateTime: "", bookingType: 2, pickLocation: "", pickLat: "", pickLng: "", dropLoaction: "", dropLat: "", dropLng: "" }
    }
    initialize = (name) => {
        let placeSearch;
        let autocomplete;
        let google = window.google;
        if (name == "pickup") {
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete1"),
                { types: ["geocode"] }
            );
        } else {
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById("autocomplete"),
                { types: ["geocode"] }
            );
        }
        console.log(autocomplete)

        autocomplete.addListener("place_changed", function () {
            placeSearch = autocomplete.getPlace();
            console.log(placeSearch)
            if (placeSearch) {
                console.log("LLLLL")
                this.loactionSubmit(placeSearch, name)
            }
        }.bind(this));
    };

    loactionSubmit = (placeSearch, name) => {
        let s1 = { ...this.state }
        let all = document.getElementById("autocomplete").name
        console.log(name, placeSearch)
        if (name == "pickup") {
            s1.form.pickLocation = placeSearch.formatted_address
            s1.form.pickLat = placeSearch.geometry.location.lat()
            s1.form.pickLng = placeSearch.geometry.location.lng()
        } else {
            s1.form.dropLoaction = placeSearch.formatted_address
            s1.form.dropLat = placeSearch.geometry.location.lat()
            s1.form.dropLng = placeSearch.geometry.location.lng()
        }
        this.setState(s1)
    }

    createScriptLoadMap = (name) => {
        var gScript = document.querySelector("[data-setted]");
        var isSetted = gScript && gScript.getAttribute("data-setted");
        if (!isSetted) {
            var index = document.getElementsByTagName("script")[0];
            var script = document.createElement("script");
            script.src =
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDk_8w619G2LteJdDgBARkj0sNR4jMFhPc&libraries=places&callback=initialize";
            script.async = true;
            script.defer = true;
            script.setAttribute("data-setted", true);
            index.parentNode.insertBefore(script, index);
            window.initialize = this.initialize(name);
        } else {
            this.initialize(name);
        }
    };
    handleChange = (e) => {
        const { name, value } = e.target
        if (name == "pickup") {
            this.createScriptLoadMap(name)
        } else {
            this.createScriptLoadMap(name)
        }

        // console.log(name)
    }

    render() {


        return (
            <>
                <section className="bg_black pb-5 pt-5 book_taxi_sec">
                    <Container>
                        <Row>
                            <Col md={7} className="d-flex align-items-center">
                                <div className="title">
                                    <h1>Book Your Ride</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                </div>
                            </Col>
                            <Col md={5}>
                                <div className="box">
                                    <p>Looking for Taxi</p>
                                    <h4>Request a ride now</h4>
                                    <Form className="mt-4">
                                        <Form.Group className="custom_input mb-3">
                                            <div id="locationField">
                                                <Form.Control className="cus" type="text" placeholder="Enter Pickup Location" name="pickup" id="autocomplete" onChange={this.handleChange} />
                                                <img className="img-fluid" src={loc} alt="logo" />
                                            </div>
                                            {/* <Form.Control placeholder="Enter Pickup Location" /> */}
                                            {/* <img className="img-fluid" src={loc} alt="logo" /> */}
                                        </Form.Group>
                                        <Form.Group className="custom_input mb-3">
                                            <div id="locationField">
                                                <Form.Control className="cus" type="text" placeholder="Enter Pickup Location" name="drop" id="autocomplete1" onChange={this.handleChange} />
                                                <img className="img-fluid" src={loc} alt="logo" />
                                            </div>

                                            {/* <Form.Control placeholder="Enter Dropoff Location" />
                                            <img className="img-fluid" src={loc} alt="logo" /> */}
                                        </Form.Group>
                                        <Button variant="primary" className="custom_btn">Search</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </>)
    }
}
export default TaxiBook;
