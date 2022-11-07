import React, { Component } from "react";
import { Container, Tabs, Tab, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import ButtonGroup from '@mui/material/ButtonGroup';
// import "../../assets/css/style.css"
class BookRental extends Component {
    state = {
        startDate: "",
        endDate: "",
    }
    // handleChangeStart = (newValue) => {
    //     console.log(newValue)
    //     if (newValue) {
    //         var date = new Date(newValue);
    //         // console.log(date)
    //         date.setDate(newValue.getDate() + 5)
    //         console.log(date)

    //         this.setState({ startDate: newValue, endDate: date })
    //     }
    // };

    disableWeekends = (date) => {
        // console.log(date)
        if (this.props.price.peried == "3") {
            var myDate = new Date();
            var noTime = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
            // console.log(noTime.getFullYear === date.getFullYear && noTime.getMonth() == date.getMonth() && noTime.getDate() == date.getDate() ? false : true)
            return noTime.getFullYear === date.getFullYear && noTime.getMonth() == date.getMonth() && noTime.getDate() == date.getDate() ? false : true
        } else {
            var date1 = new Date();
            date1.setDate(date1.getDate() - 1)
            return date1 > date;
        }
    }

    render() {
   console.log(this.props.form.addOnList)
        return (
            <>
                <Col md={4}>
                    <div className="dark_form_bg top_margin">
                        <div className="price"><h1>{this.props.price.amount}<span>/{this.props.price.peried == "2" ? "Per_day" : this.props.price.peried == "3" ? "Per_hour" : ""}</span></h1></div>
                        <Form className="label_form " >
                            <Form.Group className="m-3">
                                <Form.Label>Price <Button className="custom_btn" style={{ fontSize: "2vh", marginLeft: "25vh", marginBottom: "2vh", fontSize: "1vh" }} onClick={() => this.props.handleModel("open")}>View Price Table</Button></Form.Label>
                                <div className="sel">
                                    <Form.Control type="text" name="duraction" value={this.props.price.duraction} onChange={this.props.handleChange} placeholder={this.props.price.peried == "2" ? "Enter day duraction" : this.props.price.peried == "3" ? "Enter hour duraction" : "Select Peried"} />
                                    <Form.Select aria-label="Default select example" name="peried" value={this.props.price.peried} onChange={this.props.handleChange}>
                                        <option selected>Select Peried</option>
                                        <option value="2">Per_day</option>
                                        <option value="3">Per_hour</option>
                                    </Form.Select>
                                </div>
                            </Form.Group>
                            <Form.Group className="m-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="1" className="select_input" name="quantity" value={this.props.price.quantity} onChange={this.props.handleChange} />
                            </Form.Group>

                            <Form.Group className="m-3">
                                <Form.Label>Start Date or Time</Form.Label>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        // label="Date&Time picker"
                                        shouldDisableDate={this.disableWeekends}
                                        shouldDisableTime={(timeValue, clockType) => {
                                            let date = new Date()
                                            if (this.props.price.peried == "3") {
                                                if ((clockType === 'hours' && date.getHours() == timeValue) || (clockType === 'minutes')) {
                                                    console.log("huhuhu",this.props.startDate.getHours())
                                                    // if(this.props.startDate.getHours()==date)
                                                    return (clockType === 'hours' && timeValue < date.getHours()) || clockType === 'minutes' && timeValue < date.getMinutes()
                                                } else {
                                                    return clockType === 'hours' && timeValue <= date.getHours()
                                                }
                                            } else {
                                                return false
                                            }
                                        }}
                                        sx={{ width: "100%" }}
                                        value={this.props.startDate}
                                        onChange={this.props.handleChangeStart}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Form.Group>
                            <Form.Group className="m-3">
                                <Form.Label>End  Date or Time</Form.Label><br />

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        sx={{ width: "100%" }}
                                        disableOpenPicker="true"
                                        // label="Date&Time picker"
                                        value={this.props.endDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Form.Group>

                            <Form.Group className="m-3">
                                <Form.Label className="text-danger">Add Ons</Form.Label>
                                {this.props.data && this.props.data.add_ons && this.props.data.add_ons.map(op => (
                                    <div className="d-flex justify-content-between align-items-center">

                                        <div className="addone_items d-flex align-items-center">
                                            <div className="me-4">
                                                <input type="checkbox"  name="addOnList" value={op.id} checked={this.props.form.addOnList.find(p=>p.id==op.id)} onChange={this.props.handleAddons}/></div>
                                            <div>
                                                <p>{op.item}</p>
                                                <small>${op.price}/Pair</small></div>

                                        </div>
                                        <ButtonGroup disableElevation variant="contained" className="mb-3">
                                            <Button className="custom_btn w-5" disabled={op.setQuantity==undefined||op.setQuantity==1} onClick={()=>this.props.movmentAddon("sub",op.id)}>-</Button>
                                            <div className="solid_input"><Form.Control  placeholder="1" name="quantity" value={op.setQuantity} onChange={this.props.handleAddons} className="select_input text-center" /></div>
                                            <Button className="custom_btn w-5"  disabled={!this.props.form.addOnList.find(p=>p.id==op.id)}   onClick={()=>this.props.movmentAddon("sum",op.id)}>+</Button>
                                        </ButtonGroup>
                                    </div>
                                ))}

                            </Form.Group>
                            <hr />

                            {/* <Form.Group className="m-3">
                                <Form.Label className="text-danger pb-3">Add Adventure</Form.Label><br />
                                <div>

                                    {this.props.form.adventure.list && this.props.form.adventure.list.map((op, index) => (
                                        <Row className="p-1">
                                            <Col md={2} className="text-center">
                                                <input type="checkbox" />
                                            </Col>
                                            <Col md={8} className="text-white text-left">
                                                {op.first_name} {op.last_name} ({op.age})
                                            </Col>
                                            <Col md={2} className=" text-right">
                                                <div onClick={() => this.props.removeItem(index)}>
                                                    <i class="fa fa-times addIcon" aria-hidden="true"></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    ))}


                                </div>
                                <Form.Label className="pt-3">First Name</Form.Label>
                                <Form.Control type="text" name="first_name" value={this.props.form.adventure.first_name} onChange={this.props.handleChange} placeholder="Enter First Name" className="select_input" />
                            </Form.Group>
                            <Form.Group className="m-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name" value={this.props.form.adventure.last_name} onChange={this.props.handleChange} placeholder="Enter Last Name" className="select_input" />
                            </Form.Group>
                            <Form.Group className="m-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" name="age" value={this.props.form.adventure.age} onChange={this.props.handleChange} placeholder="Enter Age" className="select_input" />
                            </Form.Group>

                            {/* <div class="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label class="control-label" for="datepicker">Select Date</label>
                                        <input type="text" class="form-control" id="datepicker"/>
                                    </div> */}

                            {/* <div className="text-center w-100">
                                <Button className="custom_btn text-center" onClick={() => this.props.handleAdventure()} style={{ fontSize: "2vh", paddingLeft: "9vh", paddingRight: "9vh", marginBottom: "2vh" }}>Add</Button>
                            </div> */}

                            <Link onClick={() => this.props.makePayment(true)} className="custom_btn w-100">Book Now</Link>
                            {/* <Button variant="primary" type="submit" className="custom_btn w100" >Book Now</Button> */}
                        </Form>
                    </div>
                </Col>
            </>)

    }
}
export default BookRental;