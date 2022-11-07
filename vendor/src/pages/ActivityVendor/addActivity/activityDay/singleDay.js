import React, { Component } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../../assets/css/style.css'

import validaction from "../../validaction/validaction"
import moment from 'moment';



class SingleDay extends Component {


    state = {
        error: {},
        manual: {
            startTime: "", endTime: "", max: ""
        },
        manualSlot: this.props.slots,
        manageFlaxedSlots: [],
        flaxedSlot: this.props.flaxedData,
        auto: this.props.auto,
        // auto: {
        //     startTime: "", duraction: "", day_slot: "", time_slot: ""
        // }, 
        value: null,
        manageSlots: this.props.slots, selectedDate: new Date('2014-08-18T21:11:54')

    }

    handleChangeManual = (e) => {
        let s1 = { ...this.state }
        const { name, value } = e.target

        s1.manual[name] = value

        this.setState(s1)
    }
    showSlotsManual = () => {
        let s1 = { ...this.state }

        if (s1.manual.startTime && s1.manual.endTime && s1.manual.max) {
            let start = this.changeTimeFormat(s1.manual.startTime)
            let end = this.changeTimeFormat(s1.manual.endTime)
            s1.manualSlot.push({ start_time: start, end_time: end, quantity: s1.manual.max })
            s1.manual.startTime = ''
            s1.manual.endTime = ''
            s1.manual.max = ''
        }
        this.props.handleSlots("single", s1.manualSlot)
        // this.setState(s1)
    }

    handleChange = (e) => {
        let s1 = { ...this.state }
        const { name, value } = e.target
        this.props.handleChangeAuto(name, value, "auto")
    }

    changeTimeFormat = (str) => {
        var timeSplit = str.split(':'),
            hours,
            minutes,
            meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < 12) {
            meridian = 'AM';
            if (hours == 0) {
                hours = 12;
            }
        } else {
            meridian = 'PM';
        }
        str = hours + ':' + minutes + ' ' + meridian
        return str
    }

    changetFormat = (val) => {
        const Time = new Date('1970-01-01T' + val + 'Z')
            .toLocaleTimeString('en-US',
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );
        return Time
    }
    showSlots = () => {
        let s1 = { ...this.state }
        let final = s1.auto.day_slot / s1.auto.time_slot
        const startTime = this.changetFormat(s1.auto.start_time)
        const newDateObj = moment(startTime, "HH:mm A").add(s1.auto.slot_time_duration, "hour").format("HH:mm")
        let arr = []
        let a = startTime
        let st = 0
        for (let i = 0; i < final; i++) {
            var new1 = moment(a, "HH:mm A").add(s1.auto.slot_time_duration, "hour").format("HH:mm")
            new1 = this.changetFormat(new1)
            let prev = a
            let next = new1
            if (i > final - 1) {
                let total = s1.auto.day_slot - st
                arr.push({ start_time: prev, end_time: next, quantity: total })
            } else {
                arr.push({ start_time: prev, end_time: next, quantity: s1.auto.time_slot })
                st = st + parseInt(s1.auto.time_slot)
            }
            a = new1
        }
        this.props.handleSlots("single", arr)


    }
    // showSlots = () => {
    //     let s1 = { ...this.state }
    //     console.log(s1.auto.day_slot, s1.auto.time_slot)
    //     let final = s1.auto.day_slot / s1.auto.time_slot
    //     console.log(final)
    //     var currentDateObj = new Date();
    //     let sw = s1.auto.start_time.substring(0, 2)
    //     let w = s1.auto.start_time.substring(3, 6)
    //     currentDateObj.setHours(sw)
    //     currentDateObj.setMinutes(w)
    //     var numberOfMlSeconds = currentDateObj.getTime();
    //     var addMlSeconds = s1.auto.slot_time_duration * 60 * 60 * 1000;
    //     var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    //     let arr = []
    //     let a = currentDateObj
    //     let st = 0
    //     for (let i = 0; i < final; i++) {
    //         var numberOfMlSeconds = a.getTime();
    //         var addMlSeconds = s1.auto.slot_time_duration * 60 * 60 * 1000;
    //         var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    //         // console.log(JSON.stringify(a.getHours()).substring(0, 2))
    //         let prev = `${a.getHours()}:${a.getMinutes()}`
    //         let next = `${newDateObj.getHours()}:${newDateObj.getMinutes()}`
    //         prev = this.changeTimeFormat(prev)
    //         next = this.changeTimeFormat(next)

    //         // console.log(prev)
    //         // console.log(next)
    //         if (i > final - 1) {
    //             let total = s1.auto.day_slot - st
    //             arr.push({ start_time: prev, end_time: next, quantity: total })
    //         } else {
    //             arr.push({ start_time: prev, end_time: next, quantity: s1.auto.time_slot })

    //             st = st + parseInt(s1.auto.time_slot)

    //         }
    //         a = newDateObj

    //     }
    //     // console.log(arr)
    //     console.log(arr)

    //     this.props.handleSlots("single", arr)


    // }
    showFlaxedSlot = () => {
        let s1 = { ...this.state }
        s1.error = {}
        s1.error = validaction.validactionFlaxed(s1.flaxedSlot, s1.manageFlaxedSlots, "add", 2)
        /////////Time logic/////////////
        if (Object.keys(s1.error).length === 0) {
            const endTime = moment(s1.flaxedSlot.start_time, 'HH:mm').add(s1.flaxedSlot.duration, 'hours').format('HH:mm');
            ////////////////////
            const prev = this.changetFormat(s1.flaxedSlot.start_time)
            const next = this.changetFormat(endTime)
            ////////////////////
            let obj = { start_time: prev, end_time: next, quantity: s1.flaxedSlot.duration_quantity, itinerary: s1.flaxedSlot.itinerary }

            s1.flaxedSlot.slot_type.map(op => {
                if (op == s1.manageFlaxedSlots.find(p => p.slot_type == op)) {
                } else {
                    obj = { ...obj, slot_type: op }
                }
            })

            s1.flaxedSlot.slot_type.map(op => {
                if (!s1.manageFlaxedSlots.find(p => p.slot_type == op)) {
                    s1.manageFlaxedSlots.push(obj)

                    s1.flaxedSlot.pendingSlot = s1.flaxedSlot.pendingSlot - s1.flaxedSlot.duration_quantity
                    s1.error.manageFlaxedSlots = ""
                }
                else {
                    s1.error.manageFlaxedSlots = "This quantity is Allready on the Slots list"
                }
            })
            let flax = { ...s1.flaxedSlot, slot_type: s1.flaxedSlot.slot_type[s1.flaxedSlot.slot_type.length - 1] }
            this.props.handleSlots("flex", s1.manageFlaxedSlots)
            this.props.handleSlots("flexData", flax)
        }
        this.setState(s1)
    }


    // handleFlaxed = (e) => {
    //     let s1 = { ...this.state }
    //     const { name, value } = e.target
    //     if (name == "slot_type") {
    //         if (s1.flaxedSlot.slot_type.find(o => o == value)) {
    //             s1.flaxedSlot.slot_type.splice(s1.flaxedSlot.slot_type.findIndex(op => op == value), 1)
    //             if (s1.manageFlaxedSlots.length != 0) {
    //                 if (s1.manageFlaxedSlots.find(h => h.slot_type == value)) {
    //                     s1.manageFlaxedSlots.splice(s1.manageFlaxedSlots.findIndex(l => l.slot_type == value), 1)
    //                 }
    //             }
    //         } else {
    //             s1.flaxedSlot.slot_type.push(value)
    //         }
    //     } else {
    //         if (name == "day_quantity") {
    //             s1.flaxedSlot.pendingCap = value
    //         }
    //         s1.flaxedSlot[name] = value
    //     }
    //     console.log(s1.flaxedSlot.slot_type)
    //     this.setState(s1)
    // }

    render() {
        let { start_time, slot_time_duration, day_slot, time_slot } = this.state.auto
        let { manual, manualSlot, flaxedSlot, manageFlaxedSlots, error } = this.state

        let { activity, handleChange, slots } = this.props
        let manageSlots = slots
        const format = 'h:mm a';

        const now = moment().hour(0).minute(0);
        console.log(this.state.manageSlots)

        return (<div className="InSingle">
            <Row>
                <Col md={12}>
                    <div className="editform mt-3">
                        <div className="d-flex w-100">
                            <div className="form-check pe-5 d-flex align-items-center">
                                <input className="form-check-input" type="radio" checked={activity.single_day_categories == "1"} name="single_day_categories" value="1" id="flexRadioDefault1" onChange={(e) => this.props.handleChangeAuto(e.target.name, e.target.value, "singleCat")} />
                                <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                    Fixed
                                </Form.Label>
                            </div>
                            <div className="form-check pe-5 d-flex align-items-center">
                                <input className="form-check-input " type="radio" checked={activity.single_day_categories == "2"} name="single_day_categories" value="2" id="flexRadioDefault1" onChange={(e) => this.props.handleChangeAuto(e.target.name, e.target.value, "singleCat")} />
                                <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                    Flexed
                                </Form.Label>
                            </div>
                            <div className="form-check d-flex align-items-center">
                                <input className="form-check-input " type="radio" checked={activity.single_day_categories == "3"} name="single_day_categories" value="3" id="flexRadioDefault1" onChange={(e) => this.props.handleChangeAuto(e.target.name, e.target.value, "singleCat")} />
                                <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                    NO
                                </Form.Label>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            {activity.activity_type == "1" && activity.single_day_categories == "1"
                && <Row>
                    <Col md={12}>
                        <div className="editform mt-3">

                            <div className="d-flex w-100">
                                <div className="form-check pe-5 d-flex align-items-center">
                                    <input className="form-check-input" type="radio" checked={activity.slot_type == "1"} name="slot_type" value="1" id="flexRadioDefault1" onChange={(e) => this.props.handleChangeAuto(e.target.name, e.target.value, "slot_type")} />
                                    <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                        Auto
                                    </Form.Label>
                                </div>
                                <div className="form-check pe-5 d-flex align-items-center">
                                    <input className="form-check-input " type="radio" checked={activity.slot_type == "2"} name="slot_type" value="2" id="flexRadioDefault1" onChange={(e) => this.props.handleChangeAuto(e.target.name, e.target.value, "slot_type")} />
                                    <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                        Manual
                                    </Form.Label>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>}
            {activity.activity_type == "1" && activity.single_day_categories == "1" && activity.slot_type == "1"
                && <div className="">
                    <Form>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <h6 className="meefont text-white bfont mt-3">Availability(Auto))</h6>
                                <Row>
                                    <Col md={2}>
                                        <div className="editform">
                                            <Form.Label className="form-label">Start Time  <span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="cus" timeFormat="hh:mm A" type="time" name="start_time" value={start_time} onChange={this.handleChange} placeholder="Select Time" />
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="editform">
                                            <Form.Label className="form-label">Slot Time Duraction  <span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="cus" type="text" name="slot_time_duration" value={slot_time_duration} onChange={this.handleChange} placeholder="Enter Duraction" />
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="editform">
                                            <Form.Label className="form-label">Total Day Slot  <span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="cus" type="text" name="day_slot" value={day_slot} onChange={this.handleChange} placeholder="Enter Totel Slot in whole day" />
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="editform">
                                            <Form.Label className="form-label">Total Time Slot   <span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="cus" type="text" name="time_slot" value={time_slot} onChange={this.handleChange} placeholder="Enter Totel Slot in time" />
                                        </div>
                                    </Col>
                                    <Col md={2}>
                                        <div className="addbutt1 mb-2 pt-2">
                                            <Button className="custom_btn" onClick={() => this.showSlots()}>  Show Slot</Button>
                                        </div>

                                    </Col>
                                    {manageSlots.length && manageSlots.map(op => (
                                        <>
                                            <Col lg={8} md={8} sm={12}>
                                                <div className="editform">
                                                    <Form.Label className="form-label"><span className="text-white">Time Slot : </span>{op.start_time} - {op.end_time} </Form.Label>
                                                </div>
                                            </Col>
                                            <Col lg={4} md={4} sm={12}>
                                                <div className="editform">
                                                    <Form.Label className="form-label"><span className="text-white">Total Slot : </span>{op.quantity}</Form.Label>
                                                </div>
                                            </Col>
                                        </>
                                    ))}
                                    {manageSlots.length != 0
                                        && <Col lg={12} md={12} >
                                            <div className="addbutt1 mb-2" style={{ textAlign: "-webkit-right", marginRight: "8.5vh" }}>
                                                <Button className="custom_btn" >Submit</Button>
                                            </div>
                                        </Col>}

                                    {this.props.errorAdd && this.props.errorAdd.autoSlot && <span className="text-danger text-center p-2">{this.props.errorAdd.autoSlot}</span>}

                                </Row>

                            </Col>
                        </Row>
                    </Form>
                </div>}
            <>
                {activity.activity_type == "1" && activity.single_day_categories == "1" && activity.slot_type == "2"
                    && <div className="">
                        <Form>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <h6 className="meefont text-white bfont mt-3">Availability(Manual) </h6>
                                    <Row>
                                        <Col lg={4} md={8} sm={12}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Start Time  <span className="text-danger">*</span></Form.Label>
                                                <Form.Control className="cus" type="time" name="startTime" value={manual.startTime} onChange={this.handleChangeManual} placeholder="Select Start Time" />
                                            </div>
                                        </Col>
                                        <Col lg={4} md={8} sm={12}>
                                            <div className="editform">
                                                <Form.Label className="form-label">End Time  <span className="text-danger">*</span></Form.Label>
                                                <Form.Control className="cus" type="time" name="endTime" value={manual.endTime} onChange={this.handleChangeManual} placeholder="Select End Time" />

                                            </div>
                                        </Col>
                                        <Col lg={2} md={4} sm={12}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Max Capacity  <span className="text-danger">*</span></Form.Label>
                                                <Form.Control className="cus" type="text" name="max" value={manual.max} onChange={this.handleChangeManual} placeholder="Enter Capacity" />
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="addbutt1 mb-2">
                                                <Button className="custom_btn" onClick={() => this.showSlotsManual()}>  Show Slots</Button>
                                            </div>

                                        </Col>
                                        {manualSlot && manualSlot.map(op => (
                                            <>
                                                <Col lg={8} md={4} sm={12}>
                                                    <div className="editform">
                                                        <Form.Label className="form-label"><span className="text-white">Time Slot : </span>{op.start_time} - {op.end_time} </Form.Label>
                                                    </div>
                                                </Col>

                                                <Col lg={4} md={4} sm={12}>
                                                    <div className="editform">
                                                        <Form.Label className="form-label"><span className="text-white">Total Slot : </span>{op.quantity}</Form.Label>

                                                    </div>

                                                </Col>
                                            </>

                                        ))}{manualSlot.length != 0
                                            && <Col lg={12} md={12} >
                                                <div className="addbutt1 mb-2">
                                                    <Button className="custom_btn">Submit</Button>
                                                </div>
                                            </Col>}
                                    </Row>

                                </Col>
                            </Row>
                        </Form>
                    </div>}
                {activity.activity_type == "1" && activity.single_day_categories == "2"
                    &&
                    <Row>
                        <Col lg={12} md={12} >
                            <div className="editform mt-3">

                                <div className="d-flex w-100">
                                    <div className="form-check pe-5 d-flex align-items-center">
                                        <Form.Control className="form-check-input" type="checkbox" checked={flaxedSlot.slot_type.find(o => o == "Morning")} name="slot_type" value="Morning" id="flexRadioDefault1" onChange={this.props.handleFlaxed} style={{ width: "2vh" }} />
                                        <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                            Morning
                                        </Form.Label>
                                    </div>
                                    <div className="form-check pe-5 d-flex align-items-center">
                                        <Form.Control className="form-check-input " type="checkbox" checked={flaxedSlot.slot_type.find(o => o == "Afternoon")} name="slot_type" value="Afternoon" id="flexRadioDefault1" onChange={this.props.handleFlaxed} style={{ width: "2vh" }} />
                                        <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                            Afternoon
                                        </Form.Label>
                                    </div>
                                    <div className="form-check pe-5 d-flex align-items-center">
                                        <Form.Control className="form-check-input " type="checkbox" checked={flaxedSlot.slot_type.find(o => o == "Evening")} name="slot_type" value="Evening" id="flexRadioDefault1" onChange={this.props.handleFlaxed} style={{ width: "2vh" }} />
                                        <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                            Evening
                                        </Form.Label>
                                    </div>
                                    <div className="form-check pe-5 d-flex align-items-center">
                                        {/* <Form.Control className="form-check-input " type="checkbox" checked={flaxedSlot.slot_type.find(o => o == "Evening")} name="slot_type" value="Evening" id="flexRadioDefault1" onChange={this.handleFlaxed} /> */}
                                        <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                            Pending Slot :
                                        </Form.Label>
                                        <span className="text-danger" style={{    paddingTop: "2px",paddingLeft: "1vh"}}>{`  ${flaxedSlot.pendingSlot}`}</span>
                                    </div>

                                </div>
                            </div>
                        </Col>
                        {activity.activity_type == "1" && activity.single_day_categories == "2"
                            &&
                            <> <Col lg={3} md={6} sm={12}>
                                <div className="editform">
                                    <Form.Label className="form-label">Activity Duration  <span className="text-danger">*</span></Form.Label>
                                    <Form.Control className="cus" type="text" name="duration" value={this.props.duration} onChange={this.props.handleFlaxed} placeholder="Enter Duration" />
                                </div>
                            </Col>
                                <Col lg={3} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Start Time  <span className="text-danger">*</span></Form.Label>
                                        <Form.Control className="cus" type="time" name="start_time" value={this.props.start_time} onChange={this.props.handleFlaxed} placeholder="Select Time" />
                                    </div>
                                </Col>
                                <Col lg={3} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Max Capacity/Day  <span className="text-danger">*</span></Form.Label>
                                        <Form.Control className="cus" type="number" name="day_quantity" disabled={this.state.manageFlaxedSlots.length != 0} value={this.props.day_quantity} onChange={this.props.handleFlaxed} placeholder="Enter Capacity" />
                                    </div>
                                </Col>
                                <Col lg={3} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Max Capacity/Slot  <span className="text-danger">*</span></Form.Label>
                                        <Form.Control className="cus" type="number" name="duration_quantity" value={this.props.duration_quantity} onChange={this.props.handleFlaxed} placeholder="Enter Capacity" />
                                    </div>
                                </Col>
                                <Col lg={10} md={10} sm={10}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Itinerary  <span className="text-danger">*</span></Form.Label>
                                        <textarea className="form-control " name="itinerary" value={this.props.itinerary} onChange={this.props.handleFlaxed} placeholder="Enter Duration"></textarea>
                                    </div>
                                </Col>
                                <Col lg={2} md={2} sm={2}>
                                    <div className="editform">
                                        <div className="addbutt1 mb-2 pt-4">
                                            <Button className="custom_btn" onClick={() => this.showFlaxedSlot()}>Show Slot</Button>
                                        </div>
                                    </div>
                                </Col>
                            </>}
                        <>
                            {manageFlaxedSlots.length != 0
                                && <> {manageFlaxedSlots.map(op => (
                                    <div className="singleAct1-container">
                                        <Row>
                                            <Col lg={2} md={2} sm={2} className="text-center">
                                                <Form.Label className="form-label pt-3"><span className="text-white">{op.slot_type} Slot : </span> </Form.Label>
                                            </Col>
                                            <Col lg={8} md={8} sm={8}>
                                                <Row>
                                                    <Col lg={8} md={8} sm={8}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label"><span className="text-white">Time Slot : </span>{op.start_time} - {op.end_time} </Form.Label>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4} md={4} sm={12}>
                                                        <Form.Label className="form-label"><span className="text-white">Total Slot : </span>{op.quantity} </Form.Label>

                                                    </Col>
                                                    <Col lg={12} md={12} sm={12}>
                                                        <Form.Label className="form-label"><span className="text-white">Itinerary : </span>{op.itinerary} </Form.Label>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                </>}
                        </>
                        {error && error.manageFlaxedSlots && <span className="text-danger text-center p-2">{error.manageFlaxedSlots}</span>}
                        {this.props.errorAdd && this.props.errorAdd.managSlots && <span className="text-danger text-center p-2">{this.props.errorAdd.managSlots}</span>}

                    </Row>}
            </>

        </div>)
    }


}
export default SingleDay