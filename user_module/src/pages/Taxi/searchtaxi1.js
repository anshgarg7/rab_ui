import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import car_img from '../../assets/images/car.png';
import NavBar from "../../Common/navBar";
import Footer from "../../Common/footer";
import PlacesAutocomplete from 'react-places-autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import http from "../../Helper/http";
import moment from "moment"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function TransitionDown(props) {
  return <Slide {...props} direction="left" />;
}
class SearchTaxi1 extends Component {



  state = {
    error_message: "",
    warning: false,
    loder: false,
    form: { dateTime: "", bookingType: 2, pickLocation: "", pickLat: "", pickLng: "", dropLoaction: "", dropLat: "", dropLng: "" }
  }

  callTaxiFilterApi = () => {
    this.setState({ loder: true })
    const { bookingType, pickLat, pickLng, dropLat, dropLng, dateTime } = this.state.form
    // var urlencoded = new URLSearchParams();
    console.log(this.state.form)
    var urlencoded = new URLSearchParams();
    urlencoded.append("pickup_latitude", pickLat);
    urlencoded.append("pickup_longitude", pickLng);
    urlencoded.append("drop_latitude", dropLat);
    urlencoded.append("drop_longitude", pickLng);
    urlencoded.append("start_date_time", bookingType == 1 ? moment(dateTime).format("YYYY-MM-DD HH:mm:ss") : moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));


    http.postData(`v1/user/get_filter_taxi`, urlencoded).then(res => {
      console.log(res)
      if (res.data.status == 200) {
        if (res.data.data.length == 0) {
          this.setState({ loder: false, error_message: "NO  active driver available on this route", warning: true })
        } else {
          this.props.history.push({
            pathname: '/search_taxi_result',
            state: {
              data: res.data.data,
              form: this.state.form
            }
          });
        }
      }
      else {
        this.setState({ warning: true, error_message: "Please Login first", loder: false })
      }

    }).catch(err => {
        this.setState({ warning: true, error_message: "Please Login first", loder: false })

      console.log(err)
    })



  }



  componentDidMount() {
    // this.createScriptLoadMap();

  }
  handleChangeStart = (newValue) => {
    let s1 = { ...this.state }
    s1.form.dateTime = newValue
    this.setState(s1)
  }
  handleBookingType = (val) => {
    let s1 = { ...this.state }
    s1.form.bookingType = val
    this.setState(s1)
  }
  // Geo Location //
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

    autocomplete.addListener("place_changed", function () {
      placeSearch = autocomplete.getPlace();
      if (placeSearch) {
        this.loactionSubmit(placeSearch, name)
      }
    }.bind(this));
  };

  loactionSubmit = (placeSearch, name) => {
    let s1 = { ...this.state }
    let all = document.getElementById("autocomplete").name
    console.log(all)
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

    console.log(name)
  }

  render() {
    let { bookingType } = this.state.form
    if (this.state.warning) {
      setTimeout(() => {
          this.setState({
              warning: false
          })
      }, 2500)
  }
    return (<>
      <NavBar />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loder}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>

        <div className="searchtaxibanner">

          <Row>
            <Col md={7}>
              <h2 className="text-white mt-5">Book your ride on finger tips</h2>
              <p className="text-white">Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.</p>
            </Col>
            <Col md={5}>
              <div className="formcolr4">
                <Form>
                  <Row>
                    <p className="text-white mt-4">Looking for Taxi</p>
                    <h3 className="text-white">Request a ride now</h3>
                    <Col lg={6} md={6} sm={12} >
                      <div class="addbutt2 my-2">
                        <Button variant="primary" className="custom_btn" style={bookingType == 1 ? { backgroundColor: "#E52346", color: "#fff" } : { backgroundColor: "rgb(248 248 248)", color: "#E52346" }} onClick={() => this.handleBookingType(1)}>Pre-Booking</Button>
                      </div>
                    </Col>
                    <Col lg={6} md={6} sm={12} >
                      <div class="addbutt3 my-2" >
                        <Button variant="primary" className="custom_btn" style={bookingType == 2 ? { backgroundColor: "#E52346", color: "#fff" } : { backgroundColor: "rgb(248 248 248)", color: "#E52346" }} onClick={() => this.handleBookingType(2)}>Outstation</Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12}>
                      <div className="editform mt-4">
                        <div id="locationField">
                          <Form.Control className="cus" type="text" placeholder="Enter Pickup Location" name="pickup" id="autocomplete1" onChange={this.handleChange} />
                        </div>
                        {/* Geo Location  */}

                        <PlacesAutocomplete
                          value={this.state.form.location}
                          onChange={this.handleChange1}
                          onSelect={this.handleSelect}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: 'Please Search and Select Location',
                                  className: 'form-control',
                                  type: "hidden"
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>


                      </div>
                    </Col>

                    <Col lg={12} md={12} sm={12}>
                      <div className="editform mt-4">
                        <div id="locationField">
                          <Form.Control className="cus" type="text" placeholder="Enter Drop Location" name="drop" id="autocomplete" onChange={this.handleChange} />

                        </div>
                        {/* Geo Location  */}

                        <PlacesAutocomplete
                          value={this.state.form.location}
                          onChange={this.handleChange1}
                          onSelect={this.handleSelect}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: 'Please Search and Select Location',
                                  className: 'form-control',
                                  type: "hidden"
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>



                      </div>
                    </Col>
                    {bookingType == 1
                      && <Col lg={12} md={12} sm={12}>
                        <div className="editform my-4">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                              sx={{ width: "100%" }}
                              onChange={this.handleChangeStart}
                              className="cus"
                              minDate={new Date()}
                              // label="Date&Time picker"
                              value={this.state.form.dateTime}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          {/* <Form.Control className="cus" type="date" placeholder="Enter Drop Location" /> */}
                        </div>
                      </Col>}

                    <Row>

                      <Col lg={12} md={12} sm={12} >
                        <div class="addbutt2 mt-4 text-center">
                          <Button onClick={() => this.callTaxiFilterApi()} className="custom_btn">Search</Button>


                        </div>
                      </Col>

                    </Row>
                  </Row>

                </Form>
              </div>

            </Col>

          </Row>
        </div>

      </div>

      <Footer />

    </>)
  }


}
export default SearchTaxi1;