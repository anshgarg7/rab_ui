import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container, Tabs, Tab, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import location_Himachal from '../../assets/images/location_img.png';
import banner from "../../assets/images/banner.jpg"
import banner1 from "../../assets/images/banner1.png"
import banner2 from "../../assets/images/boating_activity.jpg"
import adventure_category from '../../assets/images/adventure_category.png';
import { Player } from 'video-react';
import NavBar from "../../Common/navBar";
import Footer from "../../Common/footer";
import SimpleImageSlider from "react-simple-image-slider";
import http from "../../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import cal from "../../assets/images/cal.svg"
import select from "../../assets/images/drop.svg"
import offer_image from "../../assets/images/offer_image.svg"
import loc from "../../assets/images/loc.svg"
import PlacesAutocomplete from 'react-places-autocomplete';
import { Snackbar, Alert, Slide } from '@mui/material';
import RentalImg from "../../assets/images/rental.jpg"
import AdventureImg from "../../assets/images/adventure.jpg"
import Taxi from "../../assets/images/taxi.jpg"
import RentalPro from "../../assets/images/RentalPro.jpg"
import auth from "../../services/auth";
import TaxiBook from "./taxibook";
function TransitionDown(props) {
  return <Slide {...props} direction="left" />;
}




class Home extends Component {


  state = {
    form: { location: "", latitude: "", longitude: "", activity_id: "", activity_category: "" },
    error_message: "",
    warning: false,
    activityData: [],
    showRating: false,
    value: 2,
    hover: -1,
    images: [
      { url: banner },
      { url: banner1 },
      { url: banner2 },
    ],
    placeData: [],
    loder: false,
    data: [],
    open: false

  }

  handleModelAvaibilty = (val) => {
    let s1 = { ...this.state }
    s1.open = val
    this.setState(s1)
  }

  callGetApi = (url, val) => {
    http.getData(url).then(res => {

      if (res.status == 200) {
        this.setState({ [val]: res.data, loder: false })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  filterApi = () => {
    this.setState({ loder: true })
    var urlencoded = new URLSearchParams();
    urlencoded.append("activity_category", this.state.form.location);
    urlencoded.append("latitude", this.state.form.latitude);
    urlencoded.append("longitude", this.state.form.longitude);
    urlencoded.append("activity_id", this.state.form.activity_id);

    http.postData(`v1/user/get_filter_activities`, urlencoded)
      .then(res => {
        let { data } = res
        if (data.status == 200) {
          let statusData = data.data.length == 0 ? true : false
          if (statusData) {
            this.setState({ loder: false, warning: true, error_message: "No Data Found" })
          }
        }
      }).catch(err => {
        console.log(err)
      })

  }

  componentDidMount() {
    let s1 = { ...this.state }
    this.setState({ loder: true })
    this.callGetApi(`v1/user/get_all_activities`, "activityData")
    this.callGetApi(`v1/user/get_activities_places`, "placeData")
    this.callGetApi(`v1/user/get_popular_activities`, "data")
  }

  fillPlaceData = () => {
    let s1 = { ...this.state }
    if (s1.placeData.length !== 3) {
      for (let i = 0; s1.placeData.length != 3; i++) {
        s1.placeData.push({ image: location_Himachal })
      }
    }
    this.setState(s1)
  }


  createScriptLoadMap = () => {
    console.log("Kkkkkkkkkkkkkkkkkkkkkkkkk")
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
      window.initialize = this.initialize();
    } else {
      this.initialize();
    }
  };
  initialize = () => {
    let placeSearch;
    let autocomplete;
    let google = window.google;
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );
    autocomplete.addListener("place_changed", function () {
      placeSearch = autocomplete.getPlace();
      if (placeSearch) {
        this.loactionSubmit(placeSearch)
      }
    }.bind(this));
  };

  loactionSubmit = (placeSearch) => {
    let s1 = { ...this.state }

    console.log(placeSearch)
    // s1.form.exact_location_name = placeSearch.name
    s1.form.location = placeSearch.formatted_address
    s1.form.latitude = placeSearch.geometry.location.lat()
    s1.form.longitude = placeSearch.geometry.location.lng()
    // s1.form.location = placeSearch.formatted_address
    // s1.form.lat = placeSearch.geometry.location.lat()
    // s1.form.lng = placeSearch.geometry.location.lng()
    this.setState(s1)
  }

  getLoaction = () => {
    return (
      <>
        <div id="locationField">
          <Form.Control type="text" placeholder="Pickup Location" onChange={this.createScriptLoadMap} id="autocomplete" />
        </div>
        <PlacesAutocomplete
          value={this.state.form.location}
          onChange={this.handleChangeLoc}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Please Search and Select Location',
                  className: 'form-control',
                  type: "hidden",
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
      </>)
  }
  setValue = (val) => {
    let s1 = { ...this.state }
    s1.form.activity_category = val
    s1.form.activity_id = ""
    s1.form.location = ""
    s1.form.latitude = ""
    s1.form.longitude = ""
    this.setState(s1)
  }
  handleChange = (e) => {
    let s1 = { ...this.state }
    s1.form.activity_id = e.target.value
    this.setState(s1)
  }

  handleLink = ()=>{
    let user = auth.getUser()
    if(user){
       this.props.history.push("/search_taxi")
    }else{
      this.setState({warning:true,error_message:"Please Login First"})
    }
  }

  render() {
    let { data, placeData, activityData, form, warning } = this.state
    let rentalData = null
    let adventureData = null
    if (activityData && activityData.length != 0) {
      rentalData = activityData.filter(op => op.activity_category == "Rental")
      adventureData = activityData.filter(op => op.activity_category == "Adventure")
    }
    if (warning) {
      setTimeout(() => {
        this.setState({
          warning: false,
          loder: false,
          error_message: "No data Found"
        })
      }, 3500)
    }
    console.log(form)
    return (<>
      <Snackbar
        open={warning}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        message={this.state.error_message}
      // key={transition ? transition.name : ''}
      ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh", marginLeft: "5vh" }}>
          {this.state.error_message}
        </Alert></Snackbar>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loder}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <NavBar />


      {/* {/ Banner section start /} */}
      <section className="banner_sec">

        <div>
          <SimpleImageSlider
            // className="rsis-image"
            width="100%"
            height="100vh"
            style={{ maxHeight: "auto", width: "100%" }}
            autoPlay="true"
            images={this.state.images}
            showBullets={true}
            showNavs={true}
          />
        </div>

      </section>
      {/* {/ Banner section end /}
      {/ <ModelAvailability handleModel={this.handleModelAvaibilty} open={open} /> /} */}
      <div className="largebg pb-5">
        <div className="locationFilter">
          <div className="search_form">
            <Container>
              <Tabs
                defaultActiveKey="Rental"
                transition={false}
                id="noanim-tab-example"
                className="mb-2 custom_tab"
              >
                <Tab eventKey="Activity" title="Adventure" onClick={() => this.setValue("Adventure")}>
                  <div className="search_form_area">
                    <Form className="d-sm-inline-flex">
                      <Form.Group className="custom_input me-2">
                        {this.getLoaction()}
                        <img className="img-fluid" src={loc} alt="logo" />
                      </Form.Group>
                      <Form.Group className="custom_input1 me-2">
                        <img className="img-fluid" src={select} alt="logo" />
                        <Form.Select onChange={this.handleChange}>
                          <option>Select Activity</option>
                          {adventureData && adventureData.length != 0 && adventureData.map(op => (
                            <option value={op.id}>{op.title}</option>
                          ))}
                          <img className="img-fluid" src={select} alt="logo" />
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="custom_input me-2">
                        <Form.Control placeholder="dd/mm/yy" className="pl-4" />
                        <img className="img-fluid" src={cal} alt="logo" />
                      </Form.Group >
                      <Form.Group className="custom_input">
                        <Button variant="primary" className="custom_btn" onClick={() => this.filterApi()}>Search</Button>
                      </Form.Group >
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="Rental" title="Rental" onClick={() => this.setValue("Rental")}>
                  <div className="search_form_area">
                    <Form className="d-sm-inline-flex">
                      <Form.Group className="custom_input me-2">
                        {this.getLoaction()}
                        <img className="img-fluid" src={loc} alt="logo" />
                      </Form.Group>
                      <Form.Group className="custom_input1 me-2">
                        <img className="img-fluid" src={select} alt="logo" />
                        <Form.Select onChange={this.handleChange}>
                          <option>Select Activity</option>
                          {rentalData && rentalData.length != 0 && rentalData.map(op => (
                            <option value={op.id}>{op.title}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="custom_input me-2">
                        <Form.Control placeholder="dd/mm/yy" />
                        <img className="img-fluid" src={cal} alt="logo" />
                      </Form.Group >
                      <Form.Group className="custom_input">
                        <Button variant="primary" className="custom_btn" onClick={() => this.filterApi()}>Search</Button>
                      </Form.Group >

                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="Taxi" title="Taxi">
                  <div className="search_form_area">
                    <Form className="d-sm-inline-flex">
                      <Form.Group className="custom_input me-2">
                        {this.getLoaction()}
                        <img className="img-fluid" src={loc} alt="logo" />
                      </Form.Group>
                      <Form.Group className="custom_input me-2">
                        {this.getLoaction()}
                        <img className="img-fluid" src={loc} alt="logo" />
                      </Form.Group>

                      <Form.Group className="custom_input1 me-2">
                        <img className="img-fluid" src={select} alt="logo" />
                        <Form.Select>
                          <option>Select Activity</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="custom_input me-2">
                        <Form.Control placeholder="dd/mm/yy" />
                        <img className="img-fluid" src={cal} alt="logo" />
                      </Form.Group >
                      <Form.Group className="custom_input">
                        <Button variant="primary" className="custom_btn">Search</Button>
                      </Form.Group >
                    </Form>
                  </div>
                </Tab>
              </Tabs>

            </Container>
          </div>
        </div>
        {/* {/ location section start /} */}
        <section className="category pt-5 pb-5">
          <Container>
            <Row>
              <Col md={8}>
                <Row className="mb-4">
                  {this.state.placeData.length != 0 && this.state.placeData.map((op, index) => (
                    <>
                      {index == 0
                        ? <>
                          <Col md={12} className="mb-4" key={index}>
                            <Row>
                              <Col md={6}>
                                <Link to={`/explorelocation/${op.state}`} className="location_box">
                                  <img src={op.image ? op.image : location_Himachal} alt="" />
                                  <div className="text-shadow"></div>
                                  <p>{op.state}</p>
                                </Link>
                              </Col>
                              <Col md={6} className="text-center d-flex align-items-center">
                                <div className="explore_location">
                                  <h3>Explore {this.state.placeData.length != 0 && this.state.placeData.length}+ Locations in India</h3>
                                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                  <Link to="/explorelocation" className="custom_btn">Explore</Link>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </>
                        : index > 2
                          ? ""
                          : <Col md={6}>
                            <Link to={`/explorelocation/${op.state}`} className="location_box">
                              <img src={op.image ? op.image : location_Himachal} alt="" />
                              <div className="text-shadow"></div>
                              <p>{op.state}</p>
                            </Link>
                          </Col>
                      }
                    </>
                  ))}
                </Row>
              </Col>
              <Col md={4}>
                {placeData.length != 0 && placeData[3]
                  && <Col md={12}>
                    <Link to={`/explorelocation/${placeData[3].state}`} className="location_box tall_img">
                      <img src={placeData[3].image} alt="" />
                      <div className="text-shadow"></div>
                      <p>{placeData[3].state}</p>
                    </Link>
                  </Col>
                }
              </Col>
            </Row>
          </Container>
        </section>
        {/* {/ location section end /}


        {/ Category section start /} */}
        <section className="pb-5 pt-5">
          <Container>
            <div className="sec_heading text-center mb-4">
              <h1>What Would You Like to Do?</h1>
              <p>Lorem Ipsum is simply dummy text of the printing.</p>
            </div>

            <Row>
              <Col md={4}>
                <Link to="/all/Adventure">
                  <div className="category_box">
                    <img src={AdventureImg} className="img_adjust" alt="" />
                    <p>Adventure </p>
                  </div>
                </Link>
              </Col>
              <Col md={4}>
                <Link to="/all/Rental">
                  <div className="category_box">
                    <img src={RentalPro} alt="" className="img_adjust" />
                    <p>Rental </p>
                  </div>
                </Link>
              </Col>
              <Col md={4}>
                {/* <Link to="/search_taxi"> */}
                  <div className="category_box" style={{cursor:"pointer"}} onClick={()=>this.handleLink()}>
                    <img src={Taxi} className="img_adjust" alt="" />
                    <p>Taxi </p>
                  </div>
                {/* </Link> */}
              </Col>
            </Row>
          </Container>
        </section>
        {/* {/ Category section end /} */}


        {/*activity section start */}
        <section className="pb-5">
          <Container>
            <div className="sec_heading text-center mb-4">
              <h1>Popular Things to Do!</h1>
              {data && data.length != 0 ? <p>Lorem Ipsum is simply dummy text of the printing.</p> : <p className="text-danger">No Any Popular Things</p>}
            </div>



            <Row>


              {data && data.length != 0 && data.map((op, index) => (
                index <= 5
                  ? <>
                    <Col xl={4} lg={4} sm={6} xs={12} className="mb-4" key={index}>
                      <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}><div className="activityBox">
                        <div className="activityimg text-center">
                          <div className="activityPick">
                            <img src={op.images[0].media_path} alt="" />
                            <span><i className="fa fa-heart" aria-hidden="true"></i></span>
                          </div>
                        </div>
                      </div>

                        <div className="activityinfo">
                          <div className="address">
                            <p className="location"><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{op.location}</p>
                            <Link to={op.activity_category == "Rental" ? `/rental_details/${op.id}` : `/activity-details/${op.id}`}>
                              <h6 className="title">{op.title}</h6>

                            </Link>
                            <div className="priceflex">
                              <div className="rating d-flex align-items-center">
                                <p className="ratingstar">5<i className="fa fa-star ms-1" aria-hidden="true"></i></p>
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
            <Col xl={8} lg={8} sm={6} xs={12} className="mb-4">
              <div className="fixed-rate-box">

              </div>
            </Col>
          </Container>
        </section>
        {/*activity section end */}

        {/*offer section start */}
        <section className=" pb-5">
          <OwlCarousel items={1} className="owl-theme custom_owl" loop margin={8} >
            <div className="offer_details">
              <div className="offer_content">
                <Container>
                  <h1>River Rafting in Rishikesh</h1>
                  <p>10kms River Rafting From Brahmpuri to Rishikesh Ramjhula</p>
                  <Button variant="primary" className="custom_btn">Explore Now</Button>
                </Container>
              </div>
              <img className="img-fluid" src={offer_image} alt="logo" />
            </div>

            <div className="offer_details">
              <div className="offer_content">
                <Container>
                  <h1>River Rafting in Rishikesh</h1>
                  <p>10kms River Rafting From Brahmpuri to Rishikesh Ramjhula</p>
                  <Button variant="primary" className="custom_btn">Explore Now</Button>
                </Container>
              </div>
              <img className="img-fluid" src={offer_image} alt="logo" />
            </div>

            <div className="offer_details">
              <div className="offer_content">
                <Container>
                  <h1>River Rafting in Rishikesh</h1>
                  <p>10kms River Rafting From Brahmpuri to Rishikesh Ramjhula</p>
                  <Button variant="primary" className="custom_btn">Explore Now</Button>
                </Container>
              </div>
              <img className="img-fluid" src={offer_image} alt="logo" />
            </div>
          </OwlCarousel>
        </section>
        {/*offer section end */}


        {/*book taxi start*/}
      <TaxiBook/>
        {/*book taxi end*/}
      </div>

      {/* {/ login form start /}

      {/ login form end /} */}
      <Footer />


    </>)


  }
}
export default Home;