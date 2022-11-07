import React, { Component } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment"
import '../../../../assets/css/style.css'
class MultiDay extends Component {
    state = {

        actFuture: this.props.actFuture,

        itinerary: this.props.itinerary
    }
    showItinerary = () => {
        let s1 = { ...this.state }
        let slots = []
        for (let i = 1; i <= parseInt(this.props.activity.duration); i++) {
            slots.push("")
        }
        this.props.showSlots("multi", slots)
    }
    handleChange = (e) => {
        let s1 = { ...this.state }
        const { name, value } = e.target
        console.log(name)
        s1.multidaySlot[name] = value
        this.setState(s1)
    }
    handleFuture = () => {
        let s1 = { ...this.state }

        if (s1.date != "" & s1.slot != "") {
            let arr = []
            let obj = { repeat_start_date: s1.date, spot: s1.slot }
            arr.push(obj)
            this.props.showSlots("multi", obj)

        }
    }

    render() {
        let { activity, handleChange } = this.props
        return (
            <Row className="pt-3">
                <Col lg={4} md={6} sm={12} >
                    <div className="editform">
                        <Form.Label className="form-label">Duration  <span className="text-danger">*</span></Form.Label>
                        <Form.Control className="cus" type="text" name="duration" value={activity.duration} onChange={handleChange} placeholder="Select Days" />
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="editform">
                        <Form.Label className="form-label">Start Date  <span className="text-danger">*</span></Form.Label>
                        <form className="d-flex detail">
                            <Form.Control className="dateedit" name="start_date" min={moment(new Date()).format("YYYY-MM-DD")} value={activity.start_date} onChange={handleChange} type="date" />
                        </form>
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="editform">
                        <Form.Label className="form-label">No. of spot  <span className="text-danger">*</span></Form.Label>
                        <Form.Control className="cus" name="no_of_spot" value={activity.no_of_spot} onChange={handleChange} type="text" placeholder="Enter Spot" />
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="editform">
                        <Form.Label className="form-label">Quantity  <span className="text-danger">*</span></Form.Label>
                        <Form.Control className="cus" name="quantity" value={activity.quantity} onChange={handleChange} type="text" placeholder="Enter Quantity" />
                    </div>
                </Col>

                <Col lg={4} md={6} sm={12}>
                    <div className="editform">
                        <Form.Label className="form-label">Start Time  <span className="text-danger">*</span></Form.Label>
                        <Form.Control className="cus" type="time" name="start_time" value={activity.start_time} onChange={handleChange} placeholder="Select Time" />
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className="editform">
                        <Form.Label className="form-label">End Time  <span className="text-danger">*</span></Form.Label>
                        <Form.Control className="cus" type="time" name="end_time" value={activity.end_time} onChange={handleChange} placeholder="Select Time" />
                    </div>
                </Col>
                <Col lg={12} md={12} sm={12} className="pt-3 text-right">
                    <div className="addbutt1 mb-2" style={{ textAlign: "-webkit-right" }}>
                        <Button className="custom_btn" onClick={() => this.showItinerary()}>Show Itinerary</Button>
                    </div>

                </Col>
                {activity.itinerary.length != 0 &&
                    <>
                        <Container className="singleAct1-container" style={{ padding: "4vh", borderRadius: "2vh" }}>
                            <p>Itinerary</p>

                            {activity.itinerary.map((op, index) => (
                                <>
                                    <Col lg={12} md={12} sm={12}>
                                        <div className="editform">
                                            <Form.Label className="form-label">Day {index + 1}</Form.Label>
                                            <textarea className="form-control" name="itinerary" value={op} onChange={(e) => this.props.handleItinerary(e.target.name, e.target.value, index)} placeholder="Enter Descriptions here"></textarea>
                                        </div>
                                    </Col>
                                </>
                            ))}
                            {activity.itinerary.length != 0
                                && <>
                                    <Col md={12} sm={12} className="pt-3">
                                        <div className="editform">
                                            <Form.Label className="form-label">Will this activity repeat in Future?</Form.Label>
                                            <div className="d-flex w-100 p-2">
                                                <div className="form-check pe-5">
                                                    <input className="form-check-input" type="radio" name="activity_repeat_in_future" value="1" checked={activity.activity_repeat_in_future == "1"}
                                                        id="flexRadioDefault1" onChange={handleChange} />
                                                    <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                                        Yes
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="activity_repeat_in_future" value="0" checked={activity.activity_repeat_in_future == "0"}
                                                        id="flexRadioDefault1" onChange={handleChange} />
                                                    <Form.Label className="form-check-label text-white ms-2" for="flexRadioDefault1">
                                                        No
                                                    </Form.Label>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={12} sm={12}>
                                        <Row>
                                            {activity.activity_type == "2" && activity.activity_repeat_in_future == "1"
                                                && <Row>
                                                    <Col lg={5} md={5} sm={12}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label">Start Date</Form.Label>
                                                            <form className="d-flex detail">
                                                                <Form.Control className="dateedit" min={moment(activity.start_date).format("YYYY-MM-DD")} name="futureDate" value={this.props.actFuture.futureDate} onChange={this.props.onChangeitem} type="date" />
                                                            </form>
                                                        </div>
                                                    </Col>
                                                    <Col lg={5} md={5} sm={12}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label">Spot </Form.Label>
                                                            <Form.Control className="cus" type="text" name="futureSpot" value={this.props.actFuture.futureSpot} onChange={this.props.onChangeitem} placeholder="Enter Spot" />
                                                        </div>
                                                    </Col>
                                                    <Col lg={2} md={2} sm={12}>
                                                        <div className="editform">
                                                            <Form.Label className="form-label"></Form.Label>
                                                            <form className="d-flex detail">
                                                                <button className="addbut" type="button" onClick={() => this.props.onClickAdd("future")}>Add</button>
                                                            </form>
                                                        </div>
                                                    </Col>
                                                </Row>}
                                            {activity.repeat_in_fature && <>
                                                <ul className="addlist pl-3-">
                                                    {activity.repeat_in_fature && activity.repeat_in_fature.map((op, index) => (
                                                        <li onClick={() => this.props.removeItem(index, "future")}>Start Date : {op.repeat_start_date} , Spot : {op.spot} &nbsp; &nbsp;</li>
                                                    ))}
                                                </ul>
                                            </>}
                                            {this.props.errorAdd && this.props.errorAdd.repeat && <span className="text-danger text-center p-2">{this.props.errorAdd.repeat}</span>}

                                        </Row>
                                    </Col>
                                    {/* <Col lg={12} md={12} sm={12} className="pt-3 text-right">
                                        <div className="addbutt1 mb-2" style={{ textAlign: "-webkit-right" }}>
                                            <Button className="custom_btn" >Submit</Button>
                                        </div>
                                    </Col> */}
                                </>}
                        </Container>
                    </>}
                {this.props.errorAdd && this.props.errorAdd.multySlot && <span className="text-danger text-center p-2">{this.props.errorAdd.multySlot}</span>}
            </Row >)
    }

}
export default MultiDay