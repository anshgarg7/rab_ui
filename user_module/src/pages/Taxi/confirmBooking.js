import React, { Component } from "react";
import { Container, Nav, Tab, Row, Col, Form, Table, ProgressBar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import hondaCar_img from '../../assets/images/hondaCar.png';
import Footer from "../../Common/footer";
import NavBar from "../../Common/navBar";
import http from "../../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import user_img from '../../assets/images/user.jpg';
import LocationPicker from 'react-location-picker';
import mini from "../../assets/images/mini.jpg"
import mid from "../../assets/images/mid.jpg"
import large from "../../assets/images/large.jpg"
import CircularProgress from '@mui/material/CircularProgress';
import MapPolyline from "./PolyLine/CustomPolyline"
import moment from "moment";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TransitionDown(props) {
    return <Slide {...props} direction="left" />;
}
class ConfirmBooking extends Component {

    state = {
        loder: false,
        driverDetail: {},
        form: {},
        successMassage: "",
        success: false,
        error_message: "",
        warning:false,
    }

    componentDidMount() {
        this.setState({ loder: true })
        if (this.props.history.location.state) {
            this.setState({ form: this.props.history.location.state.form })
            console.log(this.props.history.location.state.form)
        }

        let { id } = this.props.match.params
        console.log(this.props.history.location.state.data, "asksajksakjsakjk")
        var urlencoded = new URLSearchParams();
        urlencoded.append("total_km", this.props.history.location.state.data);
        http.postData(`v1/user/get_taxi_detail/${id}`, urlencoded).then(res => {
            console.log("==========================", res)
            if (res.status == 200) {
                this.setState({ loder: false, driverDetail: res.data.data, form: this.props.history.location.state.form })
            } else {
                this.setState({ loder: false })
            }
        }).catch(err => {
            this.setState({ loder: false })

            console.log(err)
        })
    }

    bookTaxi = () => {
        let s1 = { ...this.state }
        var urlencoded = new URLSearchParams();
        urlencoded.append("driver_id", s1.driverDetail && s1.driverDetail.id && s1.driverDetail.id);
        urlencoded.append("price", s1.driverDetail.taxi_rate_list.total_km_charge);
        urlencoded.append("total_price", s1.driverDetail.taxi_rate_list.total_km_charge);
        urlencoded.append("start_date_time", moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
        http.postData(`v1/user/taxi_booking`, urlencoded).then(res => {
            console.log(res)
            if (res.status == 200) {
                this.addPay(res.data.data)
            } else {
                this.setState({ warning: true, error_message: "Please Login first", loder: false })
            }
        }).catch(err => {
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
                urlencoded.append("taxi_booking_id", res.id);
                http.postData(`v1/user/taxi_booking_payment`, urlencoded)
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
        this.setState({ success: false })
    }









    render() {
        let { driverDetail, form } = this.state
        const pos = [
            { lat: form.pickLat, lng: form.pickLng },
            { lat: form.dropLat, lng: form.dropLng },
        ]
        console.log(driverDetail, "klklkl")
        let defaultPosition = {
            lat: "30.7046486",
            lng: "76.71787259999999"
        }
        if (this.state.warning) {
            setTimeout(() => {
                this.setState({
                    warning: false
                })
            }, 2500)
        }
        return (<>
            <Snackbar
                open={this.state.warning}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                TransitionComponent={TransitionDown}
                message={this.state.error_message}
            // key={transition ? transition.name : ''}
            ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh" }}>
                    {this.state.error_message}
                </Alert>
            </Snackbar>

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
            <NavBar />
            <div className="searchtaxibanner1">
                <div className="container-fluid">
                    <Row >
                        <Col className="p-0" lg={7} md={12} sm={12}>
                            <div className="searchlistcar d-sm-inline-flex">
                                <div className="searchlistcar1">
                                    {/* <img src={driverDetail&&driverDetail.model&&driverDetail.model.type&&driverDetail.model.type=="Compact SUV"||driverDetail.model.type=="SUV"?large:driverDetail.model.type=="Sedan"&&driverDetail.model.type=="Compact Sedan"?mid:driverDetail.model.type=="Hatchback"?mini:hondaCar_img} alt="" /> */}
                                    {driverDetail && driverDetail.model && driverDetail.model.type
                                        ? <img src={driverDetail && driverDetail.model && driverDetail.model.type && driverDetail.model.type == "Compact SUV" || driverDetail.model.type == "SUV" ? large : driverDetail.model.type == "Sedan" || driverDetail.model.type == "Compact Sedan" ? mid : driverDetail.model.type == "Hatchback" ? mini : hondaCar_img} alt="" />

                                        : ""}
                                    {/* <img src={driverDetail && driverDetail.model && driverDetail.model.type && driverDetail.model.type == "Compact SUV" || driverDetail.model.type == "SUV" ? large : hondaCar_img} alt="" /> */}
                                </div>
                                <div className="searchlistdata w-100">
                                    <h3>{form.dropLoaction}</h3>
                                    <div className="d-flex justify-content-between align-items-center ms-5;">

                                        <div className="ps-4">
                                            <div className="my-2">
                                                <p> <span class=" red me-2">
                                                </span>{form.pickLocation}</p>

                                            </div>

                                            <div className="my-2 mt-4">
                                                <p> <span class=" green me-2">
                                                </span>{form.dropLoaction}</p>

                                            </div>
                                        </div>
                                        <div className="dollar01">
                                            <h2>
                                                {driverDetail && driverDetail.taxi_rate_list && driverDetail.taxi_rate_list.total_km_charge && driverDetail.taxi_rate_list.total_km_charge} INR
                                            </h2>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <h5>Booking Details</h5>
                                    <div className="searchlistbooking d-flex">

                                        <div className="serachcardetails">
                                            <p>Car</p>
                                            <p>Model</p>
                                            <p>Car Type</p>
                                            <p>Date</p>
                                            <p>Per Km Charge</p>
                                            <p>Total Km</p>
                                        </div>
                                        <div className="serachcardetails">
                                            <p>{driverDetail && driverDetail.brand && driverDetail.brand.name && driverDetail.brand.name}</p>
                                            <p>{driverDetail && driverDetail.model && driverDetail.model.name && driverDetail.model.name}</p>
                                            <p>{driverDetail && driverDetail.model && driverDetail.model.type && driverDetail.model.type}</p>
                                            <p>22-10-2021</p>
                                            <p>{driverDetail && driverDetail.taxi_rate_list && driverDetail.taxi_rate_list.per_km_charge && driverDetail.taxi_rate_list.per_km_charge} INR</p>
                                            <p>{driverDetail && driverDetail.taxi_rate_list && driverDetail.taxi_rate_list.total_km && driverDetail.taxi_rate_list.total_km}</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <Row>
                                        <Col md={3}>
                                            <div className="venderdetailsimgs1 mt-2">
                                                <img src={driverDetail && driverDetail.image ? driverDetail.image : user_img} alt="" />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="venderdetails2 text-white mt-2">
                                                <h6>{driverDetail && driverDetail.first_name && driverDetail.first_name} {driverDetail && driverDetail.last_name && driverDetail.last_name}  (Taxi Driver)</h6>
                                                <div className="my-2">
                                                    <p> <span className="me-2 text-secondary"><i className="fa fa-phone" aria-hidden="true"></i>
                                                    </span>{driverDetail && driverDetail.mobile_no && driverDetail.mobile_no}</p>
                                                    <p> <span className="me-2 text-secondary">
                                                        <i className='fa fa-envelope-square'></i>
                                                    </span>{driverDetail && driverDetail.email && driverDetail.email}</p>
                                                    <p><span className="me-2 text-secondary">
                                                        <i className="fa fa-taxi" aria-hidden="true"></i>
                                                    </span>{driverDetail && driverDetail.taxi_driver_business_detail && driverDetail.taxi_driver_business_detail.registration_no && driverDetail.taxi_driver_business_detail.registration_no}
                                                    </p>
                                                    <p> <span className="me-2 text-secondary"> <i className='fa fa-drivers-license'></i>
                                                    </span>{driverDetail && driverDetail.taxi_driver_business_detail && driverDetail.taxi_driver_business_detail.license_no && driverDetail.taxi_driver_business_detail.license_no}
                                                    </p>
                                                </div>
                                            </div>
                                        </Col>

                                    </Row>


                                    <div class="addbutt1 mt-4">
                                        <Button className="custom_btn" onClick={() => this.bookTaxi()}>Book Now</Button>
                                    </div>
                                    <p className="mt-3">
                                        Note :   You can cancel the booking before 6hrs
                                    </p>

                                </div>
                            </div>
                            {/* <div className="box1_detail mt-5">
                                <ProgressBar variant="success" now={20} />
                            </div> */}

                        </Col>

                        <Col className="p-0" md={5}>
                            <div className="mapimg mr-5">
                                <div className="mt-2 pr-5" style={{ borderRadius: "8vh", marginRight: "3vh" }}>
                                    <MapPolyline pos={pos} form={form} />
                                    {/* <LocationPicker
                                        zoom={10}
                                        containerElement={<div style={{ height: '100%' }} />}
                                        mapElement={<div style={{ height: '400px' }} />}
                                        defaultPosition={defaultPosition}
                                    // onChange={this.handleLocationChange}
                                    /> */}
                                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="495" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>

            </div>

            <Footer />

        </>)
    }


}
export default ConfirmBooking;