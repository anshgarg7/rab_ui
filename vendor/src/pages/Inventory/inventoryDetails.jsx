import React, { useEffect, useState } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css';
import { Switch, CircularProgress, Backdrop } from '@mui/material';
import http from "../../Helper/http";
import moment from "moment"
import SweetAlert from 'react-bootstrap-sweetalert';

function InventoryDetails(props) {

    const [slots, setSlots] = useState([])
    const [multiday, setMultiday] = useState([])
    const [loder, setLoder] = useState(false)
    const [aleart, setAleart] = useState(false)
    const [massege, setMassege] = useState("")
    const [selDate, setSelDate] = useState({})
    const [bookSlot, setBookSlot] = useState([])
    let { index } = props.match.params
    const [checked, setChecked] = React.useState(true);
    const [date, setDate] = useState()
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleChangeDate = (e) => {
        console.log(e.target.value)
    }
    const getCallApi = () => {
        setLoder(true)
        console.log(index)
        http.getList(`v1/vendor/get_inventory`).then(res => {
            if (res.status == 200) {
                console.log(res.data)
                if (res.data[index].activity_day_sheets) {
                    setMultiday(res.data[index])
                    setSlots(res.data[index])
                    setBookSlot(res.data[0].slot_bookings[0])
                    console.log(props.history.location.state)
                    setSelDate(props.history.location.state)
                    setLoder(false)
                } else {
                    setSlots(res.data[index])
                    setBookSlot(res.data[0].slot_bookings[0])
                    console.log(props.history.location.state)
                    setSelDate(props.history.location.state)
                    setLoder(false)
                }
            } else {
                console.log(res, "===------=== error")
                // setLoder(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getCallApi()

    }, [index])

    const updateStatus = (param, status, activity_type) => {
        setLoder(true)
        console.log(param, status, activity_type)
        var urlencoded = new URLSearchParams();
        urlencoded.append("status", status);
        urlencoded.append("activity_type", activity_type);
        http.postData(`v1/vendor/inventory/update_status/${param}`, urlencoded).then(res => {
            // debugger
            if (res.data.status == 200) {
                setLoder(false)
                setAleart(true)
                setMassege(status)
                getCallApi()
            } else {
                setLoder(false)
            }
        }).catch(err => {
            setLoder(false)

        })
    }
    console.log(bookSlot)
    console.log(parseInt(slots && slots.activity_time_sheet_times && slots.activity_time_sheet_times.reduce(function (acc, curr) {
        return curr && curr.quantity && curr.quantity + acc
    }, 0)) - parseInt(selDate && selDate.date && bookSlot.find(op => op.date == selDate.date) && selDate && selDate.date && bookSlot.find(op => op.date == selDate.date).booked_quantity))

    let slotAvailable = selDate && selDate.date && bookSlot && bookSlot.find(op => op.date == selDate.date) && selDate && selDate.date && bookSlot.find(op => op.date == selDate.date)
    console.log(slotAvailable, slots && slots.activity_day_sheets && slots.activity_day_sheets.reduce(function (acc, curr) {
        return curr && curr.quantity && curr.quantity + acc
    }, 0))
    return (<>
        {aleart ? <SweetAlert
            success
            // showCancel
            // style={{ backgroundColor: 'black', color: 'white' }}
            confirmBtnText="OK"
            confirmBtnBsStyle="danger"
            title={"Slot status updated successfully."}
            onConfirm={() => setAleart(false)}
            // onCancel={this.onCancel}
            focusCancelBtn
        >
            This slot {massege == 1 ? "Active" : "Frezz"} for every dates
        </SweetAlert> : ""
        }
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loder}
        // open="true"
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <div>
            <Breadcrumb>
                <Link className="breadcrumb_link" to="/myinventory">Inventory Management /</Link>
                <Link className="breadcrumb_link active" to="/inventoryDetails">{slots && slots.activity && slots.activity && slots.activity.title && slots.activity.title} </Link>
            </Breadcrumb>

            <div className="pb-5">
                <Container fluid>
                    <Row>
                        <Col md={6}>
                            <div className="mainfile">
                                <div className="formcolr">
                                    {/* <h4>{slots&&slots.activity&&slots.activity&&slots.activity.title&&slots.activity.title}</h4> */}
                                    <Row className="mb-1">
                                        <Col>
                                            <div className="editform">
                                                <Form.Label className="form-label">Manage Slots</Form.Label>
                                                {/* <Form.Control className="cus datepick" type="date" onChange={handleChangeDate} value={date} name="date" placeholder="dd/mm/yy" /> */}
                                            </div>
                                        </Col>
                                    </Row>
                                    <h6 className="meefont text-white bfont">
                                        {slotAvailable !== undefined
                                            ? <>
                                                {multiday.length != 0
                                                    ? parseInt(slots && slots.activity_day_sheets && slots.activity_day_sheets.reduce(function (acc, curr) {
                                                        return curr && curr.quantity && curr.quantity + acc
                                                    }, 0)) - parseInt(slotAvailable && slotAvailable.booked_quantity)
                                                    : parseInt(slots && slots.activity_time_sheet_times && slots.activity_time_sheet_times.reduce(function (acc, curr) {
                                                        return curr && curr.quantity && curr.quantity + acc
                                                    }, 0)) - parseInt(slotAvailable && slotAvailable.booked_quantity)
                                                }
                                            </>
                                            : <>
                                                {multiday.length != 0
                                                    ? slots && slots.activity_day_sheets && slots.activity_day_sheets.reduce(function (acc, curr) {
                                                        return curr && curr.quantity && curr.quantity + acc
                                                    }, 0)
                                                    : slots && slots.activity_time_sheet_times && slots.activity_time_sheet_times.reduce(function (acc, curr) {
                                                        return curr && curr.quantity && curr.quantity + acc
                                                    }, 0)
                                                }
                                            </>}
                                            &nbsp;&nbsp; Slots Available {selDate && selDate.date && moment(selDate && selDate.date && selDate.date, "YYYY:MM:DD").format('DD/MMMM/YYYY')}</h6>


                                    <ul className="inventory_list">
                                        {multiday.length != 0
                                            ? <>
                                                {multiday.activity_day_sheets && multiday.activity_day_sheets.map(op => (
                                                    <>
                                                        {/* <lable>Date</lable> */}
                                                        <li className="d-flex justify-content-between" key={op.activity_day_sheet_id && op.activity_day_sheet_id}>
                                                            <p>{moment(op.start_date && op.start_date, "YYYY-MM-DD").format("DD-MM-YYYY")} - {moment(op.start_date && op.start_date, "YYYY-MM-DD").add(op.duration && op.duration, "days").format("DD-MM-YYYY")}</p>
                                                            <p>{slotAvailable && slotAvailable.time_slots && slotAvailable.time_slots.find(p => p.id == op.activity_day_sheet_id) ? slotAvailable.time_slots.find(p => p.id == op.activity_day_sheet_id).exist_quantity : op.quantity}/{op.quantity && op.quantity}</p>
                                                            <p>Active <Switch
                                                                checked={op.status == "0" ? false : true}
                                                                onClick={() => updateStatus(op.activity_day_sheet_id, op.status == 0 ? 1 : 0, multiday && multiday.activity_type && multiday.activity_type)}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />Frezz</p>
                                                        </li>
                                                        {/* <lable>Time</lable>
                                                        <li className="d-flex justify-content-between" key={op.activity_day_sheet_id && op.activity_day_sheet_id}>
                                                            <p>{moment(op.start_time && op.start_time, "HH:MM:SS").format("HH:MM A")} - {moment(op.end_time && op.end_time, "HH:MM:SS").format("HH:MM A")}</p>
                                                            <p>8/{op.quantity && op.quantity}</p>
                                                            <p>Active <Switch
                                                                checked={op.status == "0" ? false : true}
                                                                onChange={handleChange}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />Frezz</p>
                                                        </li> */}
                                                    </>
                                                ))}
                                            </>
                                            : <>
                                                {slots && slots.activity_time_sheet_times && slots.activity_time_sheet_times.map(op => (
                                                    <li className="d-flex justify-content-between" key={op.activity_time_sheet_times_id && op.activity_time_sheet_times_id}>
                                                        <p>{moment(op.start_time && op.start_time, "HH:MM:SS").format("HH:MM A")} - {moment(op.end_time && op.end_time, "HH:MM:SS").format("HH:MM A")}</p>
                                                        <p>{slotAvailable && slotAvailable.time_slots && slotAvailable.time_slots.find(p => p.id == op.activity_time_sheet_times_id) ? slotAvailable.time_slots.find(p => p.id == op.activity_time_sheet_times_id).exist_quantity : op.quantity}/{op.quantity && op.quantity}</p>
                                                        <p>Active <Switch
                                                            checked={op.status == "0" ? false : true}
                                                            onClick={() => updateStatus(op.activity_time_sheet_times_id, op.status == 0 ? 1 : 0, slots && slots.activity_type && slots.activity_type)}

                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />Frezz</p>
                                                    </li>
                                                ))}
                                            </>}
                                    </ul>

                                </div>
                            </div>
                        </Col>
                    </Row>


                </Container>
            </div>



        </div>

    </>)
}
export default InventoryDetails;