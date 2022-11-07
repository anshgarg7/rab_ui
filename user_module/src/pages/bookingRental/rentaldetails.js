import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import SweetAlert from 'react-bootstrap-sweetalert';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import car_img from '../../assets/images/car_img.png';
import adventure_vendor from '../../assets/images/adventure_vendor.png';
import rental_image from '../../assets/images/rental_img.png';
import LocationPicker from 'react-location-picker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import http from "../../Helper/http";
import NavBar from "../../Common/navBar";
import SimpleImageSlider from "react-simple-image-slider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Snackbar, Alert } from '@mui/material';
import Footer from "../../Common/footer"
// import Footer from "../../../Common/footer";
import DatePicker from 'react-datepicker';
import BookRental from "../bookingRental/bookPerson";
import Comments from "./comments";
import MakePayment from "./makePayment";
import helper from "./helper";
import axios from "axios";
import useRazorpay from "react-razorpay";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TransitionDown(props) {
    return <Slide {...props} direction="left" />;
}
class RentalDetails extends Component {

    state = {
        max_length: 160,
        success: false,
        successMassage: "",
        switch: false,
        error_message: "",
        warning: false,
        images: [],
        startDate: "",
        endDate: "",
        open: false,
        price: { duraction: "", amount: 0, peried: "", quantity: 1 },
        form: {
            addon: { quantity: 1 },
            addOnList: [],
            adventure: { first_name: "", last_name: "", age: "", list: [] }
        },
        loder: false,
        rentalinfo: [
            { label: "Category", value: "Rental" },
            { label: "Vehicle", value: "Mahindra Thar" },
            { label: "Vehicle Type", value: "Car" },
            { label: "What to take", value: "Shoes, Keen Guard" },
            { label: "Things included", value: "Food, DJ" }
        ],
        images: [],
        data: {}

    }
    // initPayment = (data) => {
    // 	const options = {
    // 		key: "YOUR_RAZORPAY_KEY",
    // 		amount: data.razorpay_order.amount,
    // 		currency: data.razorpay_order.currency,
    // 		name: data.razorpay_customer.name,
    // 		description: "Test Transaction",
    // 		order_id: data.razorpay_order.order_id,
    // 		handler: async (response) => {
    // 			try {
    // 				const verifyUrl = "http://localhost:8080/api/payment/verify";
    // 				const { data } = await axios.post(verifyUrl, response);
    // 				console.log(data);
    // 			} catch (error) {
    // 				console.log(error);
    // 			}
    // 		},
    // 		theme: {
    // 			color: "#3399cc",
    // 		},
    // 	};
    // 	const rzp1 = new window.Razorpay(options);
    // 	rzp1.open();
    // }





    addPay = (res) => {
        // const Razorpay = useRazorpay();
        console.log(res)
        var options = {
            "key": "rzp_test_4tNCfxYDQ2VCb0", // Enter the Key ID generated from the Dashboard
            "amount": res.total_price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "RAB",
            // "description": "Test Transaction",
            // // "image": "https://example.com/your_logo",
            // "order_id": res.razorpay_order.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": {
                "name": res.razorpay_customer.name,
                "email": res.razorpay_customer.email,
                "contact": "9999999999"
            },
            "readonly": {
                "email": "true",
                "contact": "true"
            },
            "method": {
                "netbanking": "0",
                "wallet": "0",
                //  "PayLater":"0",
            },
            // "checkout":{
            //     "prefill":{
            //         "method":"card"
            //     }
            // },
            handler: (result) => {
                console.log(result);
                this.setState({ loder: true })
                var urlencoded = new URLSearchParams();
                urlencoded.append("payment_id", result.razorpay_payment_id);
                urlencoded.append("booking_id", res.id);
                http.postData(`v1/user/booking_payment`, urlencoded)
                    .then((res) => {
                        if (res.status == 200) {
                            this.setState({ loder: false, success: true, successMassage: res.data.message })
                            console.log(res)
                        }
                    }).catch((err) => {
                        this.setState({ loder: false })
                        console.log(err)
                    })

            },
            // "notes": {
            //     "address": "Razorpay Corporate Office"
            // },
            "theme": {
                "color": "#a30f05"
            }
        };

        // var rzp1 = new Razorpay(options);
        this.setState({ loder: false })
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();

    }


    handleMakePayment = async () => {
        let s1 = { ...this.state }
        this.setState({ loder: true })
        let urlencoded = helper.callApi(s1.price, s1.startDate, s1.endDate, s1.data, s1.form.addOnList)
        console.log("ki", urlencoded)
        http.postData(`v1/user/booking`, urlencoded)
            .then((res) => {
                if (res.status == 200) {
                    this.addPay(res.data.data)
                } else {
                    this.setState({ warning: true, error_message: "Please Login First", loder: false })
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    callGetApi = (url, val) => {
        console.log("ki")
        http.getData(url).then(res => {
            console.log("-===========+", res)

            if (res.status == 200) {
                console.log(res)
                this.setState({ [val]: res.data, loder: false })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    bookingApi = () => {
        this.setState({ loder: true })
        http.postData(``)
    }

    componentDidMount() {
        let { id } = this.props.match.params
        this.setState({ loder: true })
        console.log("lll", id)
        if (id) {
            console.log("ju")
            this.callGetApi(`v1/user/get_activity_detail/Rental/${id}`, 'data')
        }
    }
    addonAmount = () => {
        let s1 = { ...this.state }
        if (s1.form.addOnList.length != 0) {
            s1.form.addOnList.map(op => {
                console.log(parseFloat(s1.price.amount), parseFloat(op.price) , parseFloat(op.setQuantity))
                s1.price.amount = parseFloat(s1.price.amount) + parseFloat(op.price) * parseFloat(op.setQuantity) 
            })
        }
        this.setState(s1)
    }
    handleChange = (e) => {
        let { name, value } = e.target
        let s1 = { ...this.state }
        if (name == "duraction") {
            if (s1.price.peried) {
                console.log(value < "24", s1.price.peried)
                if (value < 24 && s1.price.peried == "3") {
                    console.log("JI")
                    s1.price[name] = value
                    if (s1.data && s1.data.price && s1.price.peried == "2") {
                        s1.price.amount = s1.price.quantity * s1.price.duraction * s1.data.price.per_day.amount
                    } else if (s1.data && s1.data.price && s1.price.peried == "3") {
                        s1.price.amount = s1.price.quantity * s1.price.duraction * s1.data.price.per_hour.amount
                    }
                    this.addonAmount()
                } else if (s1.price.peried == "2") {
                    s1.price[name] = value
                    if (s1.data && s1.data.price && s1.price.peried == "2") {
                        s1.price.amount = s1.price.quantity * s1.price.duraction * s1.data.price.per_day.amount
                    } else if (s1.data && s1.data.price && s1.price.peried == "3") {
                        s1.price.amount = s1.price.quantity * s1.price.duraction * s1.data.price.per_hour.amount
                    }
                    this.addonAmount()
                } else {
                    s1.warning = true
                    s1.error_message = `Please Enter duraction less then 24 hour otherwise select Period Per_day `
                }
            } else {
                s1.warning = true
                s1.error_message = `Select the Peried then enter the Duraction`
            }
        } else if (name == "peried") {
            s1.price[name] = value
            // this.addonAmount()
            if (s1.form.addOnList.length != 0) {
                if (s1.form.addOnList.length != 0) {
                    s1.price.amount = 0
                    s1.form.addOnList.map(op => {
                        console.log(parseFloat(s1.price.amount), parseFloat(op.price))
                        s1.price.amount = parseFloat(s1.price.amount) + parseFloat(op.price)
                    })
                }
            }
            else {
                s1.startDate = ""
                s1.endDate = ""
                s1.price.duraction = ""
                s1.price.quantity = "1"
                s1.price.amount = 0
            }

        } else if (name == "quantity") {
            console.log("ji", s1.price.quantity, s1.data.quantity)
            if (value <= s1.data.quantity) {
                console.log("ji")
                s1.price[name] = value
                if (s1.data && s1.data.quantity && s1.data.price && s1.price.peried && s1.price.quantity) {

                    if (s1.data && s1.data.price && s1.price.peried == "2") {
                        s1.price.amount = s1.price.quantity * s1.price.duraction * s1.data.price.per_day.amount
                    } else if (s1.data && s1.data.price && s1.price.peried == "3") {
                        s1.price.amount = s1.price.quantity * s1.price.duraction * s1.data.price.per_hour.amount
                    }
                    this.addonAmount()

                } else {
                    if (s1.data && s1.data.price && s1.price.peried == "2") {
                        s1.price.amount = s1.price.duraction * s1.data.price.per_day.amount
                    } else if (s1.data && s1.data.price && s1.price.peried == "3") {
                        s1.price.amount = s1.price.duraction * s1.data.price.per_hour.amount
                    }
                    this.addonAmount()
                }
            }
            else {
                s1.warning = true
                s1.error_message = `Max Quantity is ${s1.data.quantity} please enter the quantity under the max quantity`
            }
        }
        else {
            s1.form.adventure[name] = value
        }
        this.setState(s1)
    }
    handleChangeStart = (newValue) => {

        let s1 = { ...this.state }
        if (s1.price.duraction) {
            if (s1.price.peried == "1") {
                var date = new Date(newValue);
                date.setDate(newValue.getDate() + parseInt(s1.price.duraction))
                this.setState({ startDate: newValue, endDate: date })
            } else {
                if (s1.price.duraction < 24) {
                    var date = new Date(newValue);
                    date.setDate(newValue.getDate() + parseInt(s1.price.duraction))
                    this.setState({ startDate: newValue, endDate: date })
                } else {
                    var date = new Date(newValue);
                    date.setDate(newValue.getDate() + parseInt(s1.price.duraction))
                    this.setState({ startDate: newValue, endDate: date })
                }
            }
        } else {
            s1.warning = true
            s1.error_message = `Please Enter duraction first`
            this.setState(s1)
        }

    };

    handleImages = () => {
        let s1 = { ...this.state }

        if (s1.data && s1.data.images) {
            //    s1.images = []
            s1.data.images.map(op => {
                s1.images.push({ url: op.media_path })
            })
        }
    }
    handleModel = (val) => {
        this.setState({ [val]: true })
    }
    makePayment = (val) => {
        let s1 = { ...this.state }
        // this.setState({ switch: val })
        console.log(s1.price.amount, s1.price.peried, s1.price.duraction, s1.startDate, s1.endDate)
        if (s1.price.amount == 0 || s1.price.peried == "" || s1.price.duraction == "" || s1.startDate == "" || s1.endDate == "") {
            s1.warning = true
            s1.error_message = `Please fill all the fields `
            this.setState(s1)

        } else {
            this.setState({ switch: val })
        }


    }
    handleAddons = (e) => {
        const { name, value, checked } = e.target
        let s1 = { ...this.state }
        console.log(value)
        if (checked) {
            let obj = s1.data.add_ons.find(op => op.id == value)
            s1.form.addOnList.push({ id: obj.id, item: obj.item, price: obj.price, quantity: obj.quantity, setQuantity: obj.setQuantity == undefined ? 1 : obj.setQuantity })
            this.addonAmount()
        } else {
            if (s1.form.addOnList.length != 0) {
                s1.form.addOnList.map(op => {
                    console.log(parseFloat(s1.price.amount), parseFloat(op.price), op.setQuantity)
                    s1.price.amount = parseFloat(s1.price.amount) - parseFloat(op.price) * parseFloat(op.setQuantity)
                })
                s1.data.add_ons[s1.data.add_ons.findIndex(op => op.id == value)].setQuantity=1

            }
            s1.form.addOnList.splice(s1.form.addOnList.findIndex(op => op.id == value), 1)
        }
        this.setState(s1)

    }
    movmentAddon = (val, id) => {
        let s1 = { ...this.state }
        let index = s1.data.add_ons.findIndex(op => op.id == id)
        s1.data.add_ons.find(op => op.id == id).setQuantity = s1.data.add_ons.find(op => op.id == id).setQuantity == undefined ? 1 : s1.data.add_ons.find(op => op.id == id).setQuantity
        if (s1.data.add_ons.find(op => op.id == id).setQuantity >= s1.data.add_ons.find(op => op.id == id).quantity && val == "sum") {
            s1.warning = true
            s1.error_message = `Please Enter quantity less then ${s1.data.add_ons.find(op => op.id == id).quantity}  `
        } else {
            s1.data.add_ons[index].setQuantity = s1.data.add_ons[index].setQuantity == NaN || s1.data.add_ons[index].setQuantity == undefined ? 1 : s1.data.add_ons[index].setQuantity
            s1.data.add_ons[index].setQuantity =
                val == "sum"
                    ? s1.data.add_ons.find(op => op.id == id).setQuantity + 1
                    : s1.data.add_ons.find(op => op.id == id).setQuantity - 1
            console.log(s1.data.add_ons.find(op => op.id == id))
            s1.data.add_ons[index].setQuantity = parseInt(s1.data.add_ons[index].setQuantity)
            if (s1.form.addOnList.find(op => op.id == id)) {
                let obj = s1.data.add_ons[index].setQuantity
                console.log(obj)
                s1.form.addOnList[s1.form.addOnList.findIndex(op => op.id == id)].setQuantity = parseInt(obj)
            }
            if (s1.form.addOnList.length != 0) {
                if (val == "sum") {
                    s1.form.addOnList.map(op => {
                        console.log(parseFloat(s1.price.amount), parseFloat(op.price))
                        s1.price.amount = parseFloat(s1.price.amount) + parseFloat(op.price)
                    })
                } else {
                    s1.form.addOnList.map(op => {
                        console.log(parseFloat(s1.price.amount), parseFloat(op.price))
                        s1.price.amount = parseFloat(s1.price.amount) - parseFloat(op.price)
                    })
                }
            }
        }


        // s1.data.add_ons.setQuantity = val == "sum" ? s1.form.addon.quantity + 1 : s1.form.addon.quantity - 1
        // s1.data.add_ons.setQuantity = parseInt(s1.form.addon.quantity)

        this.setState(s1)
    }
    onSuccess = () => {
        this.props.history.push("/home")
    }
    render() {

        let { warning, data } = this.state
        const description = this.state.data && this.state.data.description
        console.log(this.state.form)
        const defaultPosition = {
            lat: parseFloat(data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.latitude && data.user.vendor_business_detail.latitude),
            lng: parseFloat(data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.longitude && data.user.vendor_business_detail.longitude),
        }
        if (warning) {
            setTimeout(() => {
                this.setState({
                    warning: false
                })
            }, 3500)
        }
        if (this.state.images.length == 0) {
            this.handleImages()
        }
        // this.handleMakePayment()
        return (<>
            {
                this.state.success ?
                    <SweetAlert
                        success
                        title={this.state.successMassage}
                        // style={{ backgroundColor: 'black', color: 'white' }}
                        confirmBtnBsStyle={'danger'}
                        onConfirm={this.onSuccess}
                    // onCancel={this.onCancel}
                    >

                    </SweetAlert> : ""}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.loder}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={warning}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={TransitionDown}
                message={this.state.error_message}
            // key={transition ? transition.name : ''}
            ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh" }}>
                    {this.state.error_message}
                </Alert></Snackbar>
            <NavBar />
            <div>
                <Dialog
                    maxWidth="lg"
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({ open: false })}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle className="text-center bg-danger text-white">{"Price Table"}</DialogTitle>
                    <DialogContent style={{ backgroundColor: "#202026" }}>
                        <DialogContentText id="alert-dialog-slide-description" sx={{ width: "100vh" }} >
                            {data && data.price &&
                                <div className="pt-4">
                                    <Row>
                                        <Col md={6}>
                                            <h6 className="text-white text-center">Rent Per Day : {data.price.per_day && data.price.per_day.amount} </h6>
                                        </Col>
                                        <Col md={6}>
                                            <p className="text-white text-center">Rent Per Hour  :  {data.price.per_hour && data.price.per_hour.amount}</p>
                                        </Col>
                                    </Row>
                                </div>
                            }
                        </DialogContentText>

                    </DialogContent>
                    <div className="bg-danger" style={{ height: "50px" }}>

                    </div>
                </Dialog>
            </div>
            <section className="activity_top_img">
                {/* <SimpleImageSlider
                    // className="rsis-image"
                    width="100%"
                    height="74vh"
                    style={{ maxHeight: "auto", width: "100%" }}
                    // autoPlay="true"
                    images={this.state.images && this.state.images}
                    showBullets={true}
                    showNavs={true}
                /> */}

                <Carousel autoPlay="true" width="100%" height="45%" interval={1000} style={{ maxHeight: "auto", width: "100%" }}>
                    {this.state.data.images && this.state.data.images.map(op => (
                        <div>
                            <img src={op.media_path} />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                    ))}
                </Carousel>
                {/* <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}

                {/* <OwlCarousel items={1} className="owl-theme custom_owl" loop margin={2} >
                    {data && data.images && data.images.map(op => (
                        <div className="activities_main">
                            <img className="img-fluid" src={op.media_path} alt="logo" />
                        </div>
                    ))}
                </OwlCarousel> */}
            </section>

            <section className="activities_details bg_black">
                <Container>
                    <Row>
                        <Col lg={8}>
                            {!this.state.switch
                                ? <>
                                    <div className="activity_title">
                                        <div className="title d-flex justify-content-between align-items-between">
                                            <div>
                                                <h1>{data && data.title && data.title}</h1>
                                                <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.location && data.user.vendor_business_detail.location}</p>

                                                <div className="rating d-flex align-items-center mt-3">
                                                    <p className="ratingstar">4.6 <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                                    <p className="ms-1 reviews">(300 Reviews)</p>
                                                </div>
                                                <div className="highlight">
                                                    <div className="info mt-3">
                                                        <p className="title">Activity Highlight</p>
                                                        {
                                                            description && description.length > this.state.max_length ?
                                                                (
                                                                    <p>
                                                                        {`${description.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={() => this.setState({ max_length: description.length })}>Read more</button>
                                                                    </p>
                                                                ) :
                                                                <p>{description}
                                                                    <button type="button" className="readMore" onClick={() => this.setState({ max_length: 160 })}>Read less</button>
                                                                </p>
                                                        }
                                                    </div>
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
                                </>
                                : ""}



                            <div className="activy_details">
                                <h4 className="sec_tite">Rental Details</h4>

                                <ul>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Vehicle Type</p>
                                            <p>{data && data.activity && data.activity.title && data.activity.title}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Vehicle</p>
                                            <p>{data && data.brand && data.brand.name && data.brand.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Model</p>
                                            <p>{data && data.model && data.model.name && data.model.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Quantity</p>
                                            <p>{data && data.quantity && data.quantity}</p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">What to take</p>
                                            <p>{data && data.what_to_take && data.what_to_take.map(op => <>{op.name},</>)}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Things included</p>
                                            <p>{data && data.thing_service_included && data.thing_service_included.map(op => <>{op.name},</>)}</p>
                                        </div>
                                    </li>
                                </ul>

                                <div className="price_box box_detail mt-3">
                                    {/* <h5>Vehicle Details</h5> */}
                                    <h5 className="title">Vehicle Details</h5>
                                    <div className="availabe_box info ">
                                        <Row className="">
                                            {data && data.vehicle_details && data.vehicle_details.map(op => (
                                                <Col md={12}>
                                                    <p>Registration No : {op.registration_no} - Model : {op.year}</p>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>I
                                </div>


                            </div>
                            <hr className="custom_hr" />
                            {this.state.switch
                                ? <>


                                    {this.state.form.addOnList.length != 0 && <h4 class="sec_tite mb-2">Add-One</h4>}

                                    <ul className="addons_label pb-5">
                                        {this.state.form.addOnList && this.state.form.addOnList.map(op => (
                                            <>
                                                <li className="d-flex align-items-center justify-content-between mb-3">
                                                    <div className="addone_items">
                                                        <p>{op.item}</p>
                                                        <small>{op.price}/Pair</small>
                                                    </div>

                                                    {/* <div className="solid_input"><Form.Control type="number" placeholder="1" className="select_input" disabled="true" value={op.setQuantity}/></div> */}
                                                    <ButtonGroup disableElevation variant="contained" className="mb-3">
                                                        <Button className="custom_btn w-5" disabled={op.setQuantity == undefined || op.setQuantity == 1} onClick={() => this.movmentAddon("sub", op.id)}>-</Button>
                                                        <div className="solid_input"><Form.Control placeholder="1" name="quantity" value={op.setQuantity} onChange={this.handleAddons} className="select_input text-center" /></div>
                                                        <Button className="custom_btn w-5" onClick={() => this.movmentAddon("sum", op.id)}>+</Button>
                                                    </ButtonGroup>
                                                    <div>
                                                        <p>{op.quantity}</p>
                                                    </div>
                                                </li>
                                            </>
                                        ))}
                                    </ul>

                                </>
                                : ""}

                            {!this.state.switch
                                ? <Comments data={data} defaultPosition={defaultPosition} />
                                : ""}
                            {/* Acivities and rental sec end */}
                        </Col>



                        {/* booking form start */}
                        {!this.state.switch
                            ? <BookRental
                                price={this.state.price}
                                handleChangeStart={this.handleChangeStart}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                handleModel={this.handleModel}
                                handleAdventure={this.handleAdventure}
                                handleChange={this.handleChange}
                                removeItem={this.removeItem}
                                data={data}
                                handleAddons={this.handleAddons}
                                movmentAddon={this.movmentAddon}
                                makePayment={this.makePayment}
                                form={this.state.form} />
                            : <MakePayment
                                price={this.state.price}
                                handleMakePayment={this.handleMakePayment}
                            />}
                        {/* booking form start */}

                        {/* 

                        </Col> */}
                    </Row>
                </Container>
            </section >
            <Footer />
        </>)

    }
}
export default RentalDetails;