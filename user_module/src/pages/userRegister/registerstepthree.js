import React, { Component } from "react";
import "../../assets/css/style.css"
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import register_bg from '../../assets/images/register_bg.png';

import SweetAlert from 'react-bootstrap-sweetalert';
// import Spinner from "react-bootstrap/Spinner";
import http from "../../Helper/http";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

class RegisterStepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interestCategory: ["Rafting", "Paragliding", "Cycling", "Trekking"],
            interest: [],

            levelCategory: ["1", "2", "3"],
            level: '',
            form: {
                // country: "",
                // state: "",
                // city: "",
                // address: "",
                // pincode: "",
                // landmark: "",
                // countryVal: "",
                // email: "",
                // mobile_no: "",

            },
            error: {},
            stateVal: "",
            cityVal: "",

            loader: false,
            Danger: false,
            Success_message: "",
            Success: false,
            warning: false,

            levelerr: '',
            interesterr: '',
            movetohome: false,
        }
    }

    componentDidMount = () => {
        console.log(this.props.history.location.state);
        if (this.props.history.location.state == undefined||this.props.history.location.state.length==0) 
        {
            this.props.history.push("/home")
        }
        
        if (this.props.history.location.state) {
            this.setState({ form: this.props.history.location.state.data })
        }
        this.get_activityList();
     
    }


    handleSubmit = () => {
        if (this.state.form == undefined || this.state.form == '' ) 
        {
            console.log("success");
            this.setState({movetohome: true})
            return false;
        }

        if (this.state.interest.length == 0) {
            this.setState({
                interesterr: "* Interest is required",
                levelerr: '',
            })
            return false
        }
        if (this.state.level == '') {
            this.setState({
                levelerr: "* Level is required",
                interesterr: '',
            })
            return false
        }
        this.setState({ loader: true })
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.form.email);
        urlencoded.append("mobile_no", this.state.form.mobile_number.phone);
        // urlencoded.append("activity_id[]", Array(1,2));
        urlencoded.append("level", this.state.level);
        for (var i = 0; i < this.state.interest.length; i++) {
            urlencoded.append('activity_id', this.state.interest[i]);
        }

        http.Login_APi(`v1/user/user_interested_activities/store`, urlencoded)
            .then(result => {
                let { data } = result
                if (data && data.status === 200) {
                    console.log("");
                    this.setState({
                        Success: true,
                        Success_message: data.message,
                        loader: false
                    })
                }
                else {
                    this.setState({
                        loader: false
                    })
                    console.log(data.message)
                }
            })
            .catch(error => {
                this.setState({
                    message_err: error,
                })
            });
    };


    get_activityList = () => {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${http.BaseURL}/api/v1/user/get_all_activities`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    interestCategory: result.data
                });
            })
            .catch(error => {
                this.setState({
                    interestCategory: []
                });
            });
    }

    handleChange = (op) => {
        let s1 = { ...this.state };
        let index = s1.interest.findIndex(o => o == op);
        if (s1.interest.find(o => o == op) == op) {
            s1.interest.splice(index, 1);
        }
        else {
            s1.interest.push(op);
        }
        this.setState(s1);
    }
    levelhandleChange = (op) => {
        this.setState({
            level: op
        });

    }
    backtoRegister = () => {
        this.props.history.push({
            pathname: '/register-two',
            state: {
                data: this.state.form,
            }
        });
    };

    danger = () => {
        this.setState({
            Danger: false,
            Success_message: "",
            loader: false
        })
    }
    onSuccess = () => {
        this.setState({
            Success: false,
            Success_message: "",
        })
        this.props.history.push("/home")
    };

    handledone = () => {
        this.setState({
            warning: false
        })
        this.props.history.push("/home")
    }

    handleWarning = () => {
        this.setState({
            warning: true
        })
    }

    handleCancel = () => {
        this.setState({
            warning: false
        })
    }

    moveonSuccess = () => {
        this.setState({
            movetohome: false
        })
        this.props.history.push("/home")
    }

    render() {
        const { error, Danger, Success_message, loader, interestCategory, interest, Success, levelCategory, level, levelerr, interesterr, warning, movetohome } = this.state;
        console.log("==========", this.state)
        return (<>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loader}
                // open="true"
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            {
                Danger ? <SweetAlert
                    danger
                    closeOnClickOutside={true}
                    confirmBtnBsStyle="danger"
                    onConfirm={this.danger}
                >
                    {Success_message}
                </SweetAlert> : ''
            }

            {
                Success ? <SweetAlert
                    success
                    confirmBtnBsStyle="danger"
                    title="Success"
                    onConfirm={this.onSuccess}
                >
                    {Success_message}
                </SweetAlert> : ''
            }
            {   warning ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="OK"
                    confirmBtnBsStyle="danger"
                    title="Are you sure!"
                    onConfirm={this.handledone}
                    onCancel={this.handleCancel}
                    focusCancelBtn
                >
                     You want to skip this ?
                </SweetAlert> : ""
            }
            {
                movetohome ? <SweetAlert
                    warning
                    confirmBtnBsStyle="danger"
                    onConfirm={this.moveonSuccess}
                >
                    Please Login or Sign Up first after that you can select these options. 
                </SweetAlert> : ''
            }
            
            <div className="register_form bg_dark_black d-sm-flex">
                <div className="w-30">
                    <div className="right_bg_img">
                        <img src={register_bg} />
                    </div>
                </div>

                <div className="w-70 p-3 d-flex align-items-center">
                    <Container fluid>
                        <div className="title text-center">
                            <h2><b>Select any 3 activities that you like</b></h2>
                            <p>It is a established fact that a reader will distracted.</p>
                        </div>
                        <ul className="activity_lists text-center mt-4">
                            {interestCategory && interestCategory.map((op, index) => (
                                <li onClick={() => this.handleChange(op.id)} style={interest.find(o => o == op.id) ? { backgroundColor: "#E52346", color: "#fff", cursor: "pointer" } : { backgroundColor: "#202026", color: "#fff" , cursor: "pointer" }} >{op.title}</li>

                            ))}
                            <br />
                            {interesterr && interesterr ? <><span className="text-danger">{interesterr}</span></> : ""}
                        </ul>

                        <hr className="custom_hr" />

                        <div className="title text-center">
                            <h2><b>Select activity difficulty that you like</b></h2>
                            <p>It is a established fact that a reader will distracted.</p>
                        </div>
                        <ul className="activity_lists text-center mt-4">
                            {levelCategory && levelCategory.map((op) => (
                                <li onClick={() => this.levelhandleChange(op)} style={level == op ? { backgroundColor: "#E52346", color: "#fff", cursor: "pointer" } : { backgroundColor: "#202026", color: "#fff", cursor: "pointer" }} > {op == 1 ? "Beginner" : op == 2 ? "Intermediate" : op == 3 ? "Advanced" : ""} </li>
                            ))}
                            <br />
                            {levelerr && levelerr ? <><span className="text-danger">{levelerr}</span></> : ""}
                        </ul>

                        <div className="text-center">
                            <button type="button" className="custom_btn" onClick={() => this.handleSubmit()}>Submit</button>
                            <br />
                            <div className="text-center">
                                {/* {loader ? 
                                    <Spinner animation="border" role="status" className="spinner_custom" style={{color: '#fff'}}>
                                    </Spinner> 
                                    :  */}
                                    <Link className="link_white mt-3" onClick={this.handleWarning}>Skip</Link>
                                {/* } */}
                            </div>

                        </div>

                    </Container>
                </div>
            </div>

        </>)

    }
}
export default RegisterStepThree;