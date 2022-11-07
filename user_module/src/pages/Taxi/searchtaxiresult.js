import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import hondaCar_img from '../../assets/images/hondaCar.png';
import Footer from "../../Common/footer";
import NavBar from "../../Common/navBar";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import mini from "../../assets/images/mini.jpg"
import mid from "../../assets/images/mid.jpg"
import large from "../../assets/images/large.jpg"

class Searchtaxiresult extends Component {

    state = {
        loder: false,
        driverResult: [],
        form:{},
    }

    componentDidMount() {
        // let s1 = {...this.setState}
        this.setState({ loder: true })
        if (this.props.history.location.state) {
            this.setState({ loder: false, driverResult: this.props.history.location.state.data ,form:this.props.history.location.state.form  })

        }
    }
  

    render() {
        let { driverResult,form } = this.state
        console.log(driverResult)
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
                        <div class="col-md-7"><h2 class="text-white mt-5">Book your ride on finger tips</h2><p class="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>
                        <Col md={5}>
                            <div className="sidespac mt-5">
                                <h4 className="text-white">{form.dropLoaction}</h4>
                                <h6 className="text-white mt-4">{driverResult && driverResult.length} Result Found</h6>
                                <ul className="backcoboo p-0" >
                                    {driverResult && driverResult.map(op => (
                                        <li>
                                            <Link 
                                                to={{
                                                    pathname: `/confirmBooking/${op.id}`,
                                                    state: { form: this.props.history.location.state.form ,data:op.taxi_rate_list.total_km}
                                                }}
                                            >
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <div className="searchlist1">
                                                            <img src={op.model&&op.model.type&&op.model.type=="Compact SUV"||op.model.type=="SUV"?large:op.model.type=="Sedan"||op.model.type=="Compact Sedan"?mid:op.model.type=="Hatchback"?mini:hondaCar_img} alt="" />
                                                        </div>
                                                        <div className="ps-2 pe-2">
                                                            <h6>{op.brand && op.brand.name && op.brand.name}({op.model && op.model.name && op.model.name})-{op.model && op.model.type && op.model.type}</h6>
                                                           <p>Per Km Charge : <span>{op.taxi_rate_list&&op.taxi_rate_list.per_km_charge&&op.taxi_rate_list.per_km_charge} INR</span></p>
                                                           <p>Total Km : <span>{op.taxi_rate_list&&op.taxi_rate_list.total_km &&op.taxi_rate_list.total_km}</span></p>
                                                        </div>
                                                    </div>

                                                    <div className=" px-4">
                                                        <h5>{op.taxi_rate_list&&op.taxi_rate_list.total_km_charge&&op.taxi_rate_list.total_km_charge} INR</h5>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        </Col>

                    </Row>
                </div>

            </div>

            <Footer />

        </>)
    }


}
export default Searchtaxiresult;