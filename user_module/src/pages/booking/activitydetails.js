import React, { Component } from "react";
import { Container, Tabs, Tab, Row, Col, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import ButtonGroup from '@mui/material/ButtonGroup';
import auth from "../../services/auth";
// import OwlCarousel from 'react-owl-carousel';  
// import 'owl.carousel/dist/assets/owl.carousel.css';  
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import activites_main_img from '../../assets/images/boating_activity.jpg';
import adventure_vendor from '../../assets/images/adventure_vendor.png';
import activity_image from '../../assets/images/activity_image.png';
import { Player } from 'video-react';
import NavBar from "../../Common/navBar";
import Footer from "../../Common/footer";
import http from "../../Helper/http";
import SimpleImageSlider from "react-simple-image-slider";
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import LocationPicker from 'react-location-picker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import Comment from "./comments"
import { Snackbar, Alert } from '@mui/material';
import BookPerson from "./bookPerson";
import ReadMoreReact from 'read-more-react';
// import http from "../../Helper/http";
import helper from "./helper";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import MakePayment from "./makePayment";
import { Carousel } from 'react-responsive-carousel';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TransitionDown(props) {
    return <Slide {...props} direction="left" />;
}

class ActivityDetails extends Component {

    state = {
        readmore: false,
        max_length: 160,
        switch: false,
        successMassage: "",
        success: false,
        images: [], open: false,
        warning: false,
        error_message: "",
        price: { amount: 0, person: "" },
        dateTable: false,
        showSlot: "",
        form: {
            is_pickup: "0",
            addon: { quantity: 1 },
            addOnList: [],
            slot: { start_time: "", end_time: "" },
            date: "",
            endDate: "",
            slot_id: "",
            quantity: "",
            adventure: { first_name: "", last_name: "", age: "", list: [] }
        }, loder: false,

        activityinfo: [
            { label: "Category", value: "Water Sports" },
            { label: "Altitude Height", value: "500 feets" },
            { label: "Age Limit", value: "18yrs - 30yrs" },
            { label: "Pickup", value: "Yes" },
            { label: "What to take", value: "Shoes, Keen Guard" },
            { label: "Things included", value: "Food, DJ" },
            { label: "Duration", value: "2 hrs" },
            { label: "Difficulty Level ", value: "Intermediate" }
        ],
        data: [],



    }
    callGetApi = (url, val) => {
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




    componentDidMount() {
        let { id } = this.props.match.params
        this.setState({ loder: true })
        if (id) {
            this.callGetApi(`v1/user/get_activity_detail/Adventure/${id}`, 'data')
        }
    }
    handleChange = (e) => {
        let { name, value } = e.target
        let s1 = { ...this.state }
        if (name == "person") {

            if (s1.form.quantity == "" && s1.data.activity_type != "2") {
                s1.error_message = "Select Slot First"
                s1.warning = true
            } else {
                if (s1.form.quantity >= value && s1.data.activity_type != "2") {
                    s1.price[name] = value
                    if (s1.data && s1.data.price) {
                        let price = s1.data.price.find(op => op.no_of_person == value)
                        console.log(price, s1.price.amount)
                        if (price) {
                            s1.price.amount = parseFloat(s1.price.amount) + parseFloat(price.amount)
                        } else {
                            s1.price.amount = s1.data.price[s1.data.price.length - 1].amount * value
                            if (s1.form.addOnList.length != 0) {
                                s1.form.addOnList.map(op => {
                                    s1.price.amount = parseFloat(s1.price.amount) + parseFloat(op.price)
                                })
                            }
                        }
                    }
                } else if (s1.data.activity_type == "2") {
                    s1.price[name] = value
                    let price = s1.data.price.find(op => op.no_of_person == value)
                    if (price) {
                        s1.price.amount = price.amount
                    } else {
                        s1.price.amount = s1.data.price[s1.data.price.length - 1].amount * value
                    }
                } else {
                    s1.error_message = "slot quantity is low please enter valid person quantity"
                    s1.warning = true
                }
            }
        } else if (name == "date") {
            s1.form[name] = value
            let index = s1.data.activity_slot_data.findIndex(op => op.start_date == value)
            let date = new Date(s1.data.activity_slot_data[index].start_date)
            s1.form.endDate = date.setDate(date.getDate() + s1.data.activity_slot_data[index].duration)
            s1.form.endDate = moment(s1.form.endDate).format(" YYYY-MM-DD")
            s1.form.slot_id = s1.data.activity_slot_data[index].activity_day_sheet_id
            s1.form.slot.start_time = s1.data.activity_slot_data[index].start_time
            s1.form.slot.end_time = s1.data.activity_slot_data[index].end_time
            console.log(s1.form.endDate)
        } else if (name == "slot") {

            s1.data.activity_slot_data.slot.map((op, index) => {
                if (index == value) {
                    // s1.showSlot=`${moment(op.start_time, 'hh:mm:ss').format('hh:mm A')} - ${moment(op.end_time, 'hh:mm:ss').format('hh:mm A')}0/${op.quantity}`
                    s1.form.slot.start_time = op.start_time
                    s1.form.slot.end_time = op.end_time
                    s1.form.quantity = op.quantity
                    s1.form.slot_id = op.activity_time_sheet_times_id
                }
            })

        } else if (name == "is_pickup") {
            s1.form[name] = e.target.checked ? "1" : "0"
        } else {
            if (s1.form.quantity == "" && s1.form.slot == "" && s1.form.date == "" && s1.price.person == "" && s1.price.amount == "") {
                s1.error_message = "Fill all fields the add Adventures details"
                s1.warning = true
            } else {
                s1.form.adventure[name] = value
            }
        }
        this.setState(s1)
    }
    handleChangeDate = (newValue) => {
        let s1 = { ...this.state }
        s1.form.date = newValue
        s1.form.endDate = newValue
        this.setState(s1);
    };
    handleAdventure = () => {
        let s1 = { ...this.state }
        if (s1.form.adventure.first_name && s1.form.adventure.last_name && s1.form.adventure.age) {
            s1.form.adventure.list.push({ first_name: s1.form.adventure.first_name, last_name: s1.form.adventure.last_name, age: s1.form.adventure.age })
            s1.form.adventure.first_name = ""
            s1.form.adventure.last_name = ""
            s1.form.adventure.age = ""
        }
        this.setState(s1)
    }
    removeItem = (index) => {
        let s1 = { ...this.state }
        s1.form.adventure.list.splice(index, 1)
        this.setState(s1)
    }
    handleImages = () => {
        let s1 = { ...this.state }

        if (s1.data && s1.data.images) {
            //    s1.images = []
            s1.data.images.map(op => {
                s1.images.push({ url: op.media_path })
            })
        }
    }
    addonAmount = (value) => {
        let s1 = { ...this.state }
        if (s1.form.addOnList.length != 0) {
            let index = s1.form.addOnList.findIndex(op => op.id == value)
            s1.price.amount = parseFloat(s1.price.amount) + parseFloat(s1.form.addOnList[index].price) * parseFloat(s1.form.addOnList[index].setQuantity)
        }
        this.setState(s1)
    }
    handleAddons = (e) => {
        const { name, value, checked } = e.target
        let s1 = { ...this.state }
        if (checked) {
            let obj = s1.data.add_ons.find(op => op.id == value)
            console.log(obj)
            s1.form.addOnList.push({ id: obj.id, item: obj.item, price: obj.price, quantity: obj.quantity, setQuantity: obj.setQuantity == undefined ? 1 : obj.setQuantity })
            this.addonAmount(value)
        } else {
            if (s1.form.addOnList.length != 0) {

                let index = s1.form.addOnList.findIndex(op => op.id == value)
                s1.data.add_ons[s1.data.add_ons.findIndex(op => op.id == value)].setQuantity = 1
                s1.price.amount = parseFloat(s1.price.amount) - parseFloat(s1.form.addOnList[index].price) * parseFloat(s1.form.addOnList[index].setQuantity)
                // s1.form.addOnList.map(op => {
                //     console.log(parseFloat(s1.price.amount), parseFloat(op.price),value)
                //     s1.price.amount = parseFloat(s1.price.amount) - parseFloat(op.price)
                // })
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
            s1.data.add_ons[index].setQuantity = parseInt(s1.data.add_ons[index].setQuantity)
            if (s1.form.addOnList.find(op => op.id == id)) {
                let obj = s1.data.add_ons[index].setQuantity
                s1.form.addOnList[s1.form.addOnList.findIndex(op => op.id == id)].setQuantity = parseInt(obj)
            }
            if (s1.form.addOnList.length != 0) {
                if (val == "sum") {
                    s1.form.addOnList.map(op => {
                        s1.price.amount = parseFloat(s1.price.amount) + parseFloat(op.price)
                    })
                } else {
                    s1.form.addOnList.map(op => {
                        s1.price.amount = parseFloat(s1.price.amount) - parseFloat(op.price)
                    })
                }
            }
        }


        // s1.data.add_ons.setQuantity = val == "sum" ? s1.form.addon.quantity + 1 : s1.form.addon.quantity - 1
        // s1.data.add_ons.setQuantity = parseInt(s1.form.addon.quantity)

        this.setState(s1)
    }
    handleModel = (val) => {
        this.setState({ [val]: true })
    }
    makePayment = (val) => {
        let s1 = { ...this.state }

        // this.setState({ switch: val })
        console.log(s1.price.amount, s1.price.peried, s1.price.duraction, s1.date)
        if (s1.price.amount == 0 || s1.price.peried == "" || s1.price.duraction == "" || s1.form.date == "" ) {
            s1.warning = true
            s1.error_message = `Please fill all the fields `
            this.setState(s1)

        } else {
        this.setState({ switch: val })
        }


    }
    handleMakePayment = async () => {
        let user = auth.getUser()
        let s1 = { ...this.state }
        console.log(s1)
        this.setState({ loder: true })
        let urlencoded = helper.callApi(s1.price, s1.form, s1.data)
        console.log("ki", urlencoded)
        http.postData(`v1/user/booking`, urlencoded)
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    this.addPay(res.data.data)
                } else {
                    this.setState({ warning: true, error_message: "Please Login first", loder: false })
                }
            }).catch((err) => {
                console.log(err)
            })
    }
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
    onSuccess = () => {
        this.props.history.push("/home")
    }



    readMore = () => {
        this.setState({ readmore: true })
    }



    handleWordCount = event => {
        const charCount = event.target.value.length;
        const charLeft = 140 - charCount;
        this.setState({ chars_left: charLeft });
    }
    render() {

        let { warning, error_message, data, data2, readmore } = this.state

        const description = this.state.data && this.state.data.description



        if (this.state.images.length == 0) {
            this.handleImages()
        }
        const defaultPosition = {
            lat: parseFloat(data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.latitude && data.user.vendor_business_detail.latitude),
            lng: parseFloat(data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.longitude && data.user.vendor_business_detail.longitude),
        }
        const defaultPosition2 = {
            lat: parseFloat(data && data.latitude && data.latitude),
            lng: parseFloat(data && data.longitude && data.longitude),
        }
        const dates = [];
        let startDate = null;
        let endDate = null;
        if (data && data.list_date) {
            data.list_date.map(op => {
                dates.push({ startDate: moment(op.start_date), endDate: moment(op.end_date) })
            })
        }
        let date = [];
        if (dates.length != 0) {
            dates.map(op => {
                for (var m = moment(op.startDate); m.isBefore(op.endDate); m.add(1, 'days')) {
                    date.push(m.format('YYYY-MM-DD'));
                }
            })
        }
        if (warning) {
            setTimeout(() => {
                this.setState({
                    warning: false
                })
            }, 2500)
        }
        // if (data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.latitude) {
        //   defaultPosition = {
        //         lat: data.user.vendor_business_detail.latitude,
        //         lng: data.user.vendor_business_detail.longitude
        //     }
        // }
        console.log(this.state.form.addOnList)
        let adventureEndDate = null
        if (data && data.activity_slot_data && data.activity_slot_data[0] && data.activity_slot_data[0].duration) {
            const date = new Date(data.activity_slot_data[0].start_date);
            date.setDate(date.getDate() + parseInt(data.activity_slot_data[0].duration))
            adventureEndDate = moment(date).format('YYYY-MM-DD')
        }

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
                </Alert>
            </Snackbar>

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
                            {data && data.price && data.price.map(op => (
                                <div className="pt-4">
                                    <Row>
                                        <Col md={6}>
                                            <h6 className="text-white text-center"> No of Person : {op.no_of_person} </h6>
                                        </Col>
                                        <Col md={6}>
                                            <p className="text-white text-center">Price  :  {op.amount}</p>
                                        </Col>
                                    </Row>
                                </div>
                            )).reverse()}
                        </DialogContentText>

                    </DialogContent>
                    <div className="bg-danger" style={{ height: "50px" }}>

                    </div>
                </Dialog>
                <Dialog
                    maxWidth="lg"
                    open={this.state.dateTable}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => this.setState({ dateTable: false })}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle className="text-center bg-danger text-white">{"Date Table"}</DialogTitle>
                    <DialogContent style={{ backgroundColor: "#202026" }}>
                        <DialogContentText id="alert-dialog-slide-description" sx={{ width: "100vh" }} >
                            {data && data.list_date && data.list_date.map(op => (
                                <div className="pt-4">
                                    <Row>
                                        <Col md={6}>
                                            <h6 className="text-white text-center"> Start Date : {op.start_date} </h6>
                                        </Col>
                                        <Col md={6}>
                                            <p className="text-white text-center">End Date  :  {op.end_date}</p>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </DialogContentText>

                    </DialogContent>
                    <div className="bg-danger" style={{ height: "50px" }}>

                    </div>
                </Dialog>
            </div>
            <section className="activity_top_img">
                {/* <OwlCarousel items={1} className="owl-theme custom_owl" loop margin={2} > */}
                <div className="activities_main">
                    <div>
                        {/* <SimpleImageSlider
                            // className="rsis-image"
                            width="100%"
                            height="74vh"
                            style={{ maxHeight: "auto", width: "100%" }}
                            autoPlay="true"
                            images={this.state.images}
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
                    </div>
                    {/* <img className="img-fluid" width="100%" src={data && data.images && data.images[3].media_path && data.images[0].media_path} alt="logo" /> */}
                </div>
                {/* </OwlCarousel> */}
            </section>

            <section className="activities_details bg_black  ">
                <Container>
                    <Row>
                        <Col lg={8}>
                            <div className="activity_title">
                                <div className="title d-flex justify-content-between align-items-between">
                                    <div>
                                        <h1>{data && data.title && data.title}</h1>
                                        <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>{data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.location && data.user.vendor_business_detail.location}</p>

                                        <div className="rating d-flex align-items-center mt-3">
                                            <p className="ratingstar">4.6 <i class="fa fa-star ms-1" aria-hidden="true"></i></p>
                                            <p className="ms-1 reviews">(300 Reviews)</p>
                                        </div>
                                    </div>

                                    <div className="vendor_profile">
                                        <a href="#">
                                            <img src={data && data.user && data.user.image ? data.user.image : adventure_vendor} />
                                            <p>{data && data.user && data.user.vendor_business_detail && data.user.vendor_business_detail.business_name && data.user.vendor_business_detail.business_name}</p>
                                        </a>
                                    </div>
                                </div>

                                <div className="highlight">
                                    <div className="info mt-3">
                                        <p className="title">Activity Highlight</p>
                                        {description && description.length > this.state.max_length ?
                                            (
                                                <p>
                                                    {`${description.substring(0, this.state.max_length)}...`}<button type="button" className="readMore" onClick={() => this.setState({ max_length: description.length })}>Read more</button>
                                                </p>
                                            ) :
                                            <p>{description} <button type="button" className="readMore" onClick={() => this.setState({ max_length: 160 })}>Read less</button></p>
                                        }

                                    </div>
                                </div>
                            </div>

                            <hr className="custom_hr" />

                            <div className="activy_details">
                                <h4 className="sec_tite">Activity Details</h4>

                                {/* <Table responsive>
                                    <tbody>
                                        <tr>
                                        <th>Category</th>
                                        <th>Activity Type</th>
                                        <th>Language</th>
                                        <th>Altitude Height</th>
                                        </tr>
                                        <tr>
                                        <td>Hot Air Ballooning</td>
                                        <td>Long Distance And Roziere
                                            Hot Air Balloons</td>
                                        <td>English,Punjabi</td>
                                        <td>300.000</td>
                                        </tr>
                                        <tr>
                                        <th>Age Limit</th>
                                        <th>What to take</th>
                                        <th>Things included</th>
                                        </tr>
                                        <tr>
                                        <td>20yrs - 40yra</td>
                                        <td>Lunch</td>
                                        <td>Safety Jacket,</td>
                                        </tr>
                                    </tbody>
                                    </Table> */}

                                <ul>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Category</p>
                                            <p>{data && data.activity && data.activity.title && data.activity.title}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Activity Type</p>
                                            <p>{data && data.activity_adventure_type && data.activity_adventure_type.name && data.activity_adventure_type.name}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Language</p>
                                            <p>{data && data.language && data.language}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Altitude Height</p>
                                            <p>{data && data.altitude_depth_height && data.altitude_depth_height}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="info mt-3">
                                            <p className="title">Age Limit</p>
                                            <p>{data && data.age_from && data.age_from}yrs - {data && data.age_to && data.age_to}yrs</p>
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
                                    {/* {activityinfo.map(op => (
                                        <li>
                                            <div className="info mt-3">
                                                <p className="title">{op.label}</p>
                                                <p>{op.value}</p>
                                            </div>
                                        </li>
                                    ))} */}
                                </ul>
                            </div>
                            <hr className="custom_hr" />

                            {/* /////////////////////////////////////////////////// Multiday Activity/////////////////////////////////////////////////////////// */}
                            <div className="price_box box_detail mt-3">
                                <h5>List Date Table</h5>
                                <div className="availabe_box pt-4">
                                    <ul className="info_list">
                                        {data && data.list_date && data.list_date.map(op => (
                                            <li>

                                                <p>Start Date : {op.start_date} </p>

                                                <p>End Date : {op.end_date}</p>
                                            </li>
                                        )).reverse()}
                                    </ul>
                                </div>
                            </div>
                            <hr className="custom_hr" />

                            <div className="price_box box_detail mt-3">
                                <h5>Price/Person Table</h5>
                                <div className="availabe_box pt-4">
                                    <ul className="info_list">
                                        {data && data.price && data.price.map(op => (
                                            <li>

                                                <p>{op.no_of_person} - ${op.amount}</p>

                                            </li>
                                        )).reverse()}
                                    </ul>
                                </div>
                            </div>
                            {data && data.activity_type && data.activity_type == "2"
                                &&
                                <div>
                                    <hr className="custom_hr" />
                                    <div className="activy_details">
                                        <h4 className="sec_tite">Adventure Details</h4>
                                        <ul>
                                            <li>
                                                <div className="info mt-3">
                                                    <p className="title">Start Date</p>
                                                    {console.log(data && data)}
                                                    <p>{data && data.activity_slot_data && data.activity_slot_data[0].start_date && data.activity_slot_data[0].start_date}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="info mt-3">
                                                    <p className="title">End Date</p>
                                                    <p>{data && data.activity_slot_data && data.activity_slot_data[0].duration && adventureEndDate}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="info mt-3">
                                                    <p className="title">No of Spots</p>
                                                    <p>{data && data.activity_slot_data && data.activity_slot_data[0].no_of_spot}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="info mt-3">
                                                    <p className="title">Start Time</p>
                                                    <p>{data && data.activity_slot_data && data.activity_slot_data[0].start_time && moment(data.activity_slot_data[0].start_time, "hh:mm A").format("hh:mm A")}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="info mt-3">
                                                    <p className="title">End Time</p>
                                                    <p>{data && data.activity_slot_data && data.activity_slot_data[0].end_time && moment(data.activity_slot_data[0].end_time, "hh:mm A").format("hh:mm A")}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <ul>
                                        {data && data.activity_slot_data && data.activity_slot_data[0].itinerary && data.activity_slot_data[0].itinerary.map(op => (
                                            <li>
                                                <div className="p-4">
                                                    <p className="text-white">DAY : <span style={{ color: "#b5b5b5" }}>{op.day}</span></p>
                                                    <p className="text-white">Itinerary : <span style={{ color: "#b5b5b5" }}>{op.itinerary}</span></p>
                                                </div>
                                            </li>
                                        )).reverse()}
                                    </ul>

                                </div>
                            }

                            {this.state.switch
                                ? <>
                                    <hr className="custom_hr" />

                                    {this.state.form.addOnList.length != 0 && <h4 class="sec_tite mb-2">Add-On</h4>}

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
                            {/* /////////////////////////////////////////////////// Flaxed Activity///////////////////////////////////////////////////////////// */}
                            {this.state.switch
                                && <>
                                    {data && data.activity_type && data.activity_type == "1" && data.single_day_categories && data.single_day_categories == "2"
                                        &&
                                        <>
                                            <div>
                                                <hr className="custom_hr" />

                                                <h4 className="sec_tite">Adventure Details</h4>
                                                <ul>
                                                    {data.activity_slot_data && data.activity_slot_data && data.activity_slot_data.slot && data.activity_slot_data.slot.map((op, index) => (
                                                        <li>
                                                            <div className="p-4">
                                                                <div className="activy_details">
                                                                    <h4 className="sec_tite">
                                                                        {data.activity_slot_data &&
                                                                            data.activity_slot_data.flexd.find((p, ind) => ind == index).slot_type == "3" ? "Morning Slot"
                                                                            : data.activity_slot_data.flexd.find((p, ind) => ind == index).slot_type == "4" ? "Afternoon Slot"
                                                                                : "Evening Slot"}
                                                                    </h4>
                                                                    <ul>
                                                                        <li>
                                                                            <div className="info mt-3">
                                                                                <p className="title">Start Time</p>
                                                                                <p>{op.start_time}</p>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="info mt-3">
                                                                                <p className="title">End Time</p>
                                                                                <p>{op.end_time}</p>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="info mt-3">
                                                                                <p className="title">Quantty</p>
                                                                                <p>{op.quantity}</p>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                {/* <p className="text-white">DAY : <span style={{ color: "#b5b5b5" }}>{op.day}</span></p> */}
                                                                <p className="text-white pt-3">Itinerary : <span style={{ color: "#b5b5b5" }}>{op.itinerary}</span></p>
                                                            </div>
                                                        </li>
                                                    )).reverse()}
                                                </ul>
                                            </div>
                                            <ul>
                                                {data && data.activity_slot_data && data.activity_slot_data.itinerary && data.activity_slot_data.itinerary.map(op => (
                                                    <li>
                                                        <div className="p-4">
                                                            <p className="text-white">DAY : <span style={{ color: "#b5b5b5" }}>{op.day}</span></p>
                                                            <p className="text-white">Itinerary : <span style={{ color: "#b5b5b5" }}>{op.itinerary}</span></p>
                                                        </div>
                                                    </li>
                                                )).reverse()}
                                            </ul>


                                        </>
                                    }
                                </>}
                            {!this.state.switch &&
                                <>
                                    {data && data.is_pickup && data.is_pickup == "1"
                                        &&
                                        <Row>
                                            <hr className="custom_hr" />

                                            <>
                                                <hr className="custom_hr" />

                                                <Col md={12}>
                                                    <div className="price_box">
                                                        <div className="box_detail mt-3">
                                                            <h5>Pick Up Loaction : <span className="text-secondary">{data.is_pickup == "1" && "Yes"}</span></h5>
                                                            {/* <p>{activityData&&activityData.is_pickup&&activityData.is_pickup=="0"?"No":"Yes"}</p> */}
                                                        </div>
                                                        {/* <div>Pick Up Loaction : <p>{activityData&&activityData.is_pickup&&activityData.is_pickup=="0"?"No":"Yes"}</p></div> */}
                                                        <ul className="info_list">

                                                            <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>Meeting Charge</h5>
                                                                    <p>
                                                                        {data && data.is_extra_charges && data.is_extra_charges == "1" ? "yes" : "free"}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>Address line one</h5>
                                                                    <p>
                                                                        {data && data.address_line_one && data.address_line_one}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>Address line Two</h5>
                                                                    <p>
                                                                        {data && data.address_line_two && data.address_line_two}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>Country</h5>
                                                                    <p>
                                                                        {data && data.country && data.country}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>State</h5>
                                                                    <p>
                                                                        {data && data.state && data.state}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>City</h5>
                                                                    <p>
                                                                        {data && data.city && data.city}
                                                                    </p>
                                                                </div>
                                                            </li><li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>Landmark</h5>
                                                                    <p>
                                                                        {data && data.landmark && data.landmark}
                                                                    </p>
                                                                </div>
                                                            </li><li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>Loaction</h5>
                                                                    <p><i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                                                                        {data && data.location && data.location}
                                                                    </p>
                                                                </div>
                                                            </li> <li>
                                                                <div className="box_detail mt-3">
                                                                    <h5>PinCode/ZipCode</h5>
                                                                    <p>
                                                                        {data && data.pin_code && data.pin_code}
                                                                    </p>
                                                                </div>
                                                            </li>


                                                        </ul>
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className="box_detail map_box pt-3" >
                                                        <h5>Availability</h5>
                                                        {/* <MapPicker defaultLocation={defaultPosition}
                                    zoom={13}
                                    mapTypeId="roadmap"
                                    style={{ height: '80%' }}
                                    // onChangeLocation={handleChangeLocation}
                                    // onChangeZoom={handleChangeZoom}
                                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' /> */}
                                                        <LocationPicker
                                                            style={{ border: "0", width: "10px", height: "20px" }}
                                                            zoom={18}
                                                            containerElement={<div style={{ height: '100%' }} />}
                                                            mapElement={<div style={{ height: '255px' }} />}
                                                            defaultPosition={defaultPosition2}
                                                        // onChange={this.handleLocationChange}
                                                        />
                                                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="60%" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                                                    </div>
                                                </Col>
                                            </>
                                        </Row>
                                    }
                                </>}
                            <>

                            </>

                            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                            {!this.state.switch && <Comment defaultPosition={defaultPosition} warning={data && data.warning && data.warning} />}
                            {/* Acivities and rental sec end */}
                        </Col>
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                        {!this.state.switch
                            ? <BookPerson
                                handleModel={this.handleModel}
                                form={this.state.form}
                                handleAddons={this.handleAddons}
                                movmentAddon={this.movmentAddon}
                                price={this.state.price}
                                data={this.state.data}
                                date={date}
                                handleChangeDate={this.handleChangeDate}
                                makePayment={this.makePayment}
                                handleChange={this.handleChange}
                                handleAdventure={this.handleAdventure}
                                removeItem={this.removeItem} />

                            : <MakePayment
                                price={this.state.price}
                                handleMakePayment={this.handleMakePayment}
                            />}
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                         */}
                    </Row>
                </Container>
            </section>
            <Footer />
        </>)

    }
}
export default ActivityDetails;