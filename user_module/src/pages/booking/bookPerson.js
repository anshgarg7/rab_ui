import React, { Component } from "react";
import { Container, Tabs, Tab, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
class BookPerson extends Component {

    state = {
        value: "",
        data: this.props.data
    }
    handleChange = (newValue) => {
        this.setState({ value: newValue });
    };

    disableWeekends = (date) => {
        let s1 = { ...this.state }
        let boolean = null
        this.props.data.list_date.map(op => {
            console.log(moment(op.start_date).toISOString())
            let start = new Date(op.start_date)
            let end = new Date(op.end_date)
            boolean = start.setDate(start.getDate() - 1) >= date || end <= date
        })
        console.log(boolean)
        return boolean
    }
    render() {
        const today = new Date();
        // console.log(this.props.data)
        return (
            <>
                <Col lg={4}>

                    {/* booking form start */}
                    <div className="dark_form_bg top_margin">
                        <div className="price"><h1>{this.props.price.amount}<span>/person</span></h1></div>
                        <Form className="label_form" >

                            <Form.Group className="m-3">
                                <Form.Label>Number of Person </Form.Label>
                                <Form.Control type="text" name="person" value={this.props.price.person} onChange={this.props.handleChange} placeholder="Enter Number of Person" />
                            </Form.Group>
                            {
                                this.props.data && this.props.data.activity_type && this.props.data.activity_type == "1"
                                    ? <Form.Group className="m-3">
                                        <Form.Label>Slots</Form.Label>
                                        <Form.Select aria-label="Default select example" name="slot" onChange={this.props.handleChange}>
                                            <option selected>Select Slot</option>
                                            {this.props.data && this.props.data.activity_slot_data && this.props.data.activity_slot_data && this.props.data.activity_slot_data.slot && this.props.data.activity_slot_data.slot.map((op, index) => (
                                                <option value={index}>
                                                    {moment(op.start_time, 'hh:mm:ss').format('hh:mm A')} - {moment(op.end_time, 'hh:mm:ss').format('hh:mm A')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {op.quantity}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group> : ""
                            }

                            <Form.Group className="m-3">
                                {/* <Form.Label>Date</Form.Label> */}

                                {this.props.data && this.props.data.activity_type && this.props.data && this.props.data.activity_type == "1"
                                    ?
                                    <>
                                        <Form.Label>Start Date </Form.Label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                // label="Start Date"
                                                inputFormat="MM/dd/yyyy"
                                                value={this.props.form.date}
                                                sx={{ width: "100%" }}
                                                shouldDisableDate={this.disableWeekends}
                                                onChange={this.props.handleChangeDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        <Form.Label className="pt-3">End Date </Form.Label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DesktopDatePicker
                                                // label="End Date"
                                                inputFormat="MM/dd/yyyy"
                                                value={this.props.form.endDate}
                                                sx={{ width: "100%" }}
                                                disableOpenPicker="true"
                                                // shouldDisableDate={this.disableWeekends}
                                                // onChange={this.handleChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </>
                                    :
                                    <>
                                        <Form.Label >Start Date </Form.Label>
                                        <Form.Select aria-label="Default select example" name="date" value={this.props.form.date} onChange={this.props.handleChange}>
                                            <option selected>Select Start Date</option>
                                            {this.props.data.activity_slot_data && this.props.data.activity_slot_data.map(op => (
                                                <option>{op.start_date}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Label className="pt-3">End Date </Form.Label>
                                        <Form.Control type="text" name="person" value={this.props.form.endDate} placeholder="End Date" className="pt-1" />

                                        {/* <Form.Select aria-label="Default select example" name="date" value={this.props.form.endDate} onChange={this.props.handleChange}> */}
                                        {/* <option selected>Select End Date</option> */}
                                        {/* {this.props.date && this.props.date.map(op => (
                                        <option>{op}</option>
                                    ))} */}
                                        {/* </Form.Select>  */}
                                    </>
                                }
                            </Form.Group>
                            {this.props.data && this.props.data.is_pickup && this.props.data.is_pickup == "1" &&
                                <Form.Group className="m-3">
                                    <Form.Label className="text-danger">Pick Up</Form.Label>
                                    <div className="d-flex justify-content-between align-items-center">

                                        <div className="addone_items d-flex align-items-center">
                                            <div className="me-4">
                                                <input type="checkbox" name="is_pickup" value={this.props.is_pickup} checked={this.props.form.is_pickup == "1"} onChange={this.props.handleChange} /></div>
                                            <div>
                                                <p>Pick Up</p>
                                            </div>

                                        </div>
                                    </div>

                                </Form.Group>
                            }

                            <Form.Group className="m-3">
                                <Form.Label className="text-danger">Add Ons</Form.Label>
                                {this.props.data && this.props.data.add_ons && this.props.data.add_ons.map(op => (
                                    <div className="d-flex justify-content-between align-items-center">

                                        <div className="addone_items d-flex align-items-center">
                                            <div className="me-4">
                                                <input type="checkbox" name="addOnList" value={op.id} checked={this.props.form.addOnList.find(p => p.id == op.id)} onChange={this.props.handleAddons} /></div>
                                            <div>
                                                <p>{op.item}</p>
                                                <small>${op.price}/Pair</small></div>

                                        </div>
                                        <ButtonGroup disableElevation variant="contained" className="mb-3">
                                            <Button className="custom_btn w-5" disabled={op.setQuantity == undefined || op.setQuantity == 1} onClick={() => this.props.movmentAddon("sub", op.id)}>-</Button>
                                            <div className="solid_input"><Form.Control placeholder="1" name="quantity" value={op.setQuantity} onChange={this.props.handleAddons} className="select_input text-center" /></div>
                                            <Button className="custom_btn w-5" disabled={!this.props.form.addOnList.find(p => p.id == op.id)} onClick={() => this.props.movmentAddon("sum", op.id)}>+</Button>
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
                            <div className="text-center w-100">
                                <Button className="custom_btn text-center" onClick={() => this.props.handleAdventure()} style={{ fontSize: "2vh", paddingLeft: "9vh", paddingRight: "9vh", marginBottom: "2vh" }}>Add</Button>
                            </div> */}

                            <Button className="custom_btn w-100" onClick={() => this.props.makePayment(true)}>Book Now</Button>
                            {/* <Button variant="primary" type="submit" className="custom_btn w100" >Book Now</Button> */}
                        </Form>
                    </div>
                    {/* booking form start */}
                </Col>
            </>)
    }

}

export default BookPerson;
