import React, { Component } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import Files from 'react-files';
import { FileUploader } from "react-drag-drop-files";
import upload from "../../assets/images/upload.png"
import http from "../../Helper/http";
import validate from "./Validaction/addnewValidaction"
import auth from "../../services/auth";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SweetAlert from 'react-bootstrap-sweetalert';
class AddNewRental extends Component {
    constructor() {
        super();
        this.state = {
            loder: false,
            success: false,
            success_message: "",
            error: {},
            loader: false,
            ///////
            whatTake: {
                value: "",
            },
            thinkServices: {
                value: "",
            },
            addOn: {
                price: "",
                item: "",
                quty:""
            },
            vehicle_Del: {
                year: "",
                registration_no: "",
            },
            categoryArr: [],
            brandArr: [],
            modelArr: [],
            form2: {},
            form: {
                profile_image: [],
                images: [],
                brand: null,
                activity: null,
                model: null,
                title: "",
                quantity: null,
                description: "",
                warning: "",
                vehicle_details: [],
                video: "",
                price: {
                    per_hour: { amount: null },
                    per_day: { amount: null }
                },
                what_to_take: [],
                thing_service_included: [],
                add_ons: []
            },
            form2: {

            }
        };
    }








    getCategory = async (url, val) => {
        let s1 = { ...this.state }
        // console.log(url)
        http.getList(url)
            .then(result => {
                // console.log(result)
                if (result.status == 200) {

                    this.setState({ [val]: result.data, loder: false })

                    // console.log(result.data)
                } else {
                    // setErrMessage(result.message)
                }
            })
            .catch(error => {
                this.setState({ loder: false })
                console.log(error)
            });
    }
    getdetails = (url) => {
        let s1 = { ...this.state }
        console.log(url)
        http.getList(url)
            .then(result => {
                console.log(result)
                if (result.status == 200) {
                    let s1 = { ...this.state }
                    if (result && result.data) {
                        let s1 = { ...this.state }
                        this.setState({ ...s1.form, form: result.data, loder: false })
                        // this.setState(s1)
                    }

                    // console.log(result.data)
                } else {
                    this.setState({ loder: false })
                    // setErrMessage(result.message)
                }
            })
            .catch(error => {
                this.setState({ loder: false })
                console.log(error)
            });
    }

    post_APi = async () => {
        this.setState({ loder: true })

        var formdata = new FormData();

        formdata.append("activity_id", parseInt(this.state.form.activity));
        formdata.append("brand_id", parseInt(this.state.form.brand));
        formdata.append("model_id", parseInt(this.state.form.model));
        formdata.append("title", this.state.form.title);
        formdata.append("quantity", parseInt(this.state.form.quantity));

        this.state.form.vehicle_details.map((i, index) => (
            <>
                {formdata.append(`vehicle_details[${index}][year]`, i.year)}
                {formdata.append(`vehicle_details[${index}][registration_no]`, i.registration_no)}
            </>
        ))

        formdata.append("description", this.state.form.description);
        formdata.append("warning", this.state.form.warning);

        formdata.append("video", this.state.form.video);

        for (var i = 0; i < this.state.form.images.length; i++) {
            formdata.append('images', this.state.form.images[i]);
        }

        formdata.append(`price[per_day]`, this.state.form.price.per_day.amount)
        formdata.append(`price[per_hour]`, this.state.form.price.per_hour.amount)
        // this.state.form.profile_logo.map((i, index) => (
        //     <>
        //       {formdata.append(`images[${index}]`, i)}
        //     </>
        // ))
        this.state.form.what_to_take.map((i, index) => (
            <>
              {formdata.append(`what_to_take[${index}]`, i)}
            </>
        ))
        this.state.form.thing_service_included.map((i, index) => (
            <>
              {formdata.append(`thing_service_included[${index}]`, i)}
            </>
        ))
        // formdata.append("what_to_take[]", this.state.form.what_to_take);
        // formdata.append("thing_service_included[]", this.state.form.thing_service_included);
        this.state.form.add_ons.map((i, index) => (
            <>
                {formdata.append(`add_ons[${index}][item]`, i.item)}
                {formdata.append(`add_ons[${index}][price]`, i.price)}
                {formdata.append(`add_ons[${index}][quantity]`, i.quantity)}
            </>
        ))





        http.postData(`v1/vendor/rental_activity/store`, formdata)
            .then(result => {
                console.log("===================", result);
                if (result.data.status === 200) {
                    this.setState({
                        success: true, success_message: result.data.message, loder: false
                    })

                    console.log(result.data)
                }
                else if (result.data.status === 400) {
                    this.setState({ loder: false })
                    console.log(result.data)
                }
            })
            .catch(error => {
                this.setState({ loder: false })
                console.log(error)
            });

    }
    getdetails = async () => {
        let { id } = this.props.match.params
        await http.getList(`v1/vendor/rental_activities/detail/${id}`).then(result => {
            console.log("dadadad", result.data[0])
            if (result.status == 200) {
                this.setState({
                    form2: result.data && result.data[0], loder: false
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount() {
        let s1 = { ...this.state }
        let { id } = this.props.match.params
        this.setState({ loder: true })
        if (id) {
            this.getdetails(`v1/vendor/rental_activities/detail/${id}`)
        }
        console.log(id)
        this.getCategory(`v1/vendor/get_activities_by_vendor_selected_category`, "categoryArr")
        // this.getCategory(`v1/vendor/get_activities_by_vendor_selected_category`, "activity")
    }
    handleSubmit = () => {
        let s1 = { ...this.state }
        s1.error = validate.valdaction(this.state.form)
        if (Object.keys(s1.error).length === 0) {
            this.post_APi()
        } else {
            this.setState(s1)
        }
    }
    onSuccess = () => {
        this.setState({
            success: false, success_message: ""
        })
        this.props.history.push("/myrental")
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let s1 = { ...this.state }
        if (Object.keys(s1.error).length != 0) {
            s1.error = validate.valdaction(this.state.form)
        }
        if (name == "per_hour" || name == "per_day") {
            s1.form.price[name].amount = parseInt(value)
        } else {
            s1.form[name] = value
        }

        this.getCategory(`v1/brands/${s1.form.activity}`, "brandArr")
        this.getCategory(`v1/models/${s1.form.brand}`, "modelArr")
        if (Object.keys(s1.error).length != 0) {
            s1.error = validate.valdaction(this.state.form)
        }
        this.setState(s1);
    };
    //  add more ///
    onClickAdd = (check) => {
        // console.log(test);
        let s1 = { ...this.state }
        if (check === "whatTake") {
            if (s1.whatTake.value) {
                s1.form.what_to_take.push(s1.whatTake.value)
                s1.whatTake.value = ''
                this.setState(s1)
            }
        }
        else if (check === "thingsInclude") {
            if (s1.thinkServices.value) {
                s1.form.thing_service_included.push(s1.thinkServices.value)
                s1.thinkServices.value = ''
                this.setState(s1)
            }
        }
        else if (check == "addOn") {
            if (s1.addOn.price && s1.addOn.item && s1.addOn.quty) {
                s1.form.add_ons.push({ item: s1.addOn.item, price: parseInt(s1.addOn.price), quantity: parseInt(s1.addOn.quty) })
                s1.addOn.price = ''
                s1.addOn.item = ''
                s1.addOn.quty = ''
                this.setState(s1)
            }
        }
        else if (check == "vehicle_details") {
            if (s1.vehicle_Del.year && s1.vehicle_Del.registration_no) {
                s1.form.vehicle_details.push({ year: parseInt(s1.vehicle_Del.year), registration_no: s1.vehicle_Del.registration_no })
                s1.vehicle_Del.year = ''
                s1.vehicle_Del.registration_no = ''
                this.setState(s1)
            }
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error = validate.valdaction(this.state.form)
        }
        this.setState(s1)
    }
    onFilesChange = (files) => {
        let s1 = { ...this.state }
        // console.log(files[0])
        if (files[0] && s1.form.profile_image.length <= 3) {
            if (files[0].extension == "mp4") {
                let lo = URL.createObjectURL(files[0])
                s1.form.video = lo
                console.log(lo)
            } else {
                s1.form.images.push(files[0])
                s1.form.profile_image.push(files[0].name)
                s1.logo_error = ""
            }
        } else {

            s1.error.images = "You can only 4 images or 1 video uploaded"
        }
        this.setState(s1)
    }
    onFilesError = (error, file) => {
        this.setState({
            logo_error: error.message + "limit upto 3MB max"
        })
    }

    onChangeitem = (e) => {
        const { name, value } = e.target
        let s1 = { ...this.state }
        if (name == "whatTake") {
            s1.whatTake.value = value
        } else if (name == "thinkServices") {
            s1.thinkServices.value = value
        } else if (name == "price") {
            s1.addOn.price = value
        } else if (name == "quty") {
            s1.addOn.quty = value
        }
        else if (name == "item") {
            s1.addOn.item = value
        } else if (name == "year") {
            s1.vehicle_Del.year = value
        } else if (name == "registration_no") {
            s1.vehicle_Del.registration_no = value
        }
        this.setState(s1)
    }

    removeItem = (index, check) => {
        let s1 = { ...this.state }
        if (check === "whatTake") {
            s1.form.what_to_take.splice(index, 1)
        }
        else if (check === "thing") {
            s1.form.thing_service_included.splice(index, 1)

        }
        else if (check === "weblink") {
            let s1 = { ...this.state }
            s1.weblink.splice(index, 1)

        }
        else if (check === "addons") {
            let s1 = { ...this.state }
            s1.form.add_ons.splice(index, 1)

        } else if (check === "vehicle_details") {
            let s1 = { ...this.state }
            s1.form.vehicle_details.splice(index, 1)
        }

        if (Object.keys(s1.error).length != 0) {
            s1.error = validate.valdaction(this.state.form)
        }
        this.setState(s1)
    }
    handleChangeFiles = (file) => {
        console.log(file)
    };
    removeImage = (index, val) => {
        let s1 = { ...this.state }
        if (val == "image") {
            s1.form.images.splice(index, 1)
            s1.form.profile_image.splice(index,1)
        } else {
            s1.form.video = ''
        }
        if (Object.keys(s1.error).length != 0) {
            s1.error = validate.valdaction(this.state.form)
        }
        this.setState(s1)
    }

    render() {
        const { whatTake, success, error, thinkServices, addOn, Success, success_message, inputValue, item_takes, inputValue1, thinginclude, inputValue5, weblink, inputValue2, inputValue3, addons, successfull } = this.state;
        let options = []
        for (let i = 0; i <= 60; i++) {
            const year = new Date().getFullYear() - i;
            options.push(year);
        }
        console.log("====",error)
        


        return (<>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.loder}
            // open="true"
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                success ?
                    <SweetAlert
                        success
                        title={this.state.success_message}
                        // style={{ backgroundColor: 'black', color: 'white' }}
                        confirmBtnBsStyle={'danger'}
                        onConfirm={this.onSuccess}
                    // onCancel={this.onCancel}
                    >

                    </SweetAlert> : ""}


            <div className="p-5">
                <Breadcrumb>
                    <Link className="breadcrumb_link" to="/myrental">My Rentals </Link>
                    <Link className="breadcrumb_link active" to="/mynewactivity">/ Add New Vehicle </Link>
                </Breadcrumb>


                <div className="mainfile">
                    <Form>
                        <div className="formcolr">
                            <Row>
                                <Col lg={4} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Category <span className="text-danger">*</span></Form.Label>
                                        <Form.Select aria-label="Default select example" name="activity" value={this.state.form.activity} onChange={this.handleChange}>
                                            <option  value="0" hidden selected>Select Category</option>
                                            {this.state.categoryArr && this.state.categoryArr.map((op, index) => (
                                                <option value={op.id} key={index}>{op.title}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error.activity ? <><span className="text-danger">{error.activity}</span></> : ""}
                                    </div>
                                </Col>
                                <Col lg={4} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Brand <span className="text-danger">*</span></Form.Label>
                                        <Form.Select aria-label="Default select example" name="brand" value={this.state.form.brand} onChange={this.handleChange}>
                                            <option  value="0" hidden selected>Select Brand</option>
                                            {this.state.brandArr && this.state.brandArr.map((op, index) => (
                                                <option value={op.id} key={index}>{op.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error.brand ? <><span className="text-danger">{error.brand}</span></> : ""}
                                    </div>
                                </Col>
                                <Col lg={4} md={6} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Model <span className="text-danger">*</span></Form.Label>
                                        <Form.Select aria-label="Default select example" name="model" value={this.state.form.model} onChange={this.handleChange}>
                                            <option value="0" hidden selected>Select Model</option>
                                            {this.state.modelArr && this.state.modelArr.map((op, index) => (
                                                <option value={op.id} key={index}>{op.name}</option>
                                            ))}
                                        </Form.Select>
                                        {error && error.model ? <><span className="text-danger">{error.model}</span></> : ""}
                                    </div>
                                </Col>
                                <Col lg={4} md={6} sm={12} className="pt-4">
                                    <div className="editform">
                                        <Form.Label className="form-label">Title <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            onKeyPress={event => (event.target.value.charCode >= 65 && event.target.value.charCode <= 90) || (event.target.value.charCode >= 97 && event.target.value.charCode <= 122)}
                                            className="cus pt-4"
                                            name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter Title" />
                                        {error && error.title ? <><span className="text-danger">{error.title}</span></> : ""}
                                    </div>

                                </Col>

                                <Col lg={8} md={12} sm={12}>
                                    <h6 className="meefont text-white bfont mt-3">Price <span className="text-danger">*</span></h6>
                                    <Row>
                                        <Col md={6}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Price Per Day <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="number" className="cus" name="per_day" value={this.state.form.price.per_day.amount} onChange={this.handleChange} placeholder="Enter Price Per day" />
                                                {error && error.per_day ? <><span className="text-danger">{error.per_day}</span></> : ""}
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Price Per Hour <span className="text-danger">*</span></Form.Label>
                                                <form className="d-flex detail">
                                                    <Form.Control type="number" className="cus" name="per_hour" value={this.state.form.price.per_hour.amount} onChange={this.handleChange} placeholder="Enter Price Per hour" />

                                                </form>
                                                {error && error.per_hour ? <><span className="text-danger">{error.per_hour}</span></> : ""}
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            {/* <div className="editform">
                                                <Form.Label className="form-label"></Form.Label>
                                                <form className="d-flex detail">
                                                    <button className="addbut">Add</button>
                                                </form>
                                            </div> */}
                                        </Col>
                                    </Row>

                                </Col>
                                <Col lg={4} md={12} sm={12} className="pt-4">
                                    <div className="editform">
                                        <Form.Label className="form-label">Inventory <span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="number" className="cus pt-4" name="quantity" value={this.state.quantity} onChange={this.handleChange} placeholder="Enter Quantity" />
                                        {error && error.quantity ? <><span className="text-danger">{error.quantity}</span></> : ""}
                                    </div>
                                </Col>

                                <Col lg={8} md={12} sm={12}>
                                    <h6 className="meefont text-white bfont mt-3">Add Vehicle Details <span className="text-danger">*</span></h6>
                                    <Row>
                                        <Col md={5}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Model Year <span className="text-danger">*</span></Form.Label>
                                                <Form.Select aria-label="Default select example" name="year" value={this.state.vehicle_Del.year} onChange={this.onChangeitem}>
                                                    <option selected>Select Year</option>
                                                    {options.map((op, index) => (
                                                        <option value={op} key={index}>{op}</option>
                                                    ))}
                                                </Form.Select>
                                        {error && error.vehicle_details ? <><span className="text-danger">{error.vehicle_details}</span></> : ""}

                                            </div>
                                        </Col>
                                        <Col md={5}>
                                            <div className="editform">
                                                <Form.Label className="form-label">Registration Number <span className="text-danger">*</span></Form.Label>
                                                <form className="d-flex detail">
                                                    <Form.Control type="text" className="cus" name="registration_no" value={this.state.vehicle_Del.registration_no} onChange={this.onChangeitem} placeholder="Enter Number" />
                                                </form>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="editform">
                                                <Form.Label className="form-label"></Form.Label>
                                                <form className="d-flex detail">
                                                    <Button className="addbut" disabled={this.state.form.vehicle_details.length == parseInt(this.state.form.quantity)} onClick={() => this.onClickAdd('vehicle_details')}>Add</Button>
                                                </form>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="editform">
                                        <ul className="addlist p-0">
                                            {this.state.form.vehicle_details && this.state.form.vehicle_details.map((vehicle, index) => (
                                                <li onClick={() => this.removeItem(index, 'vehicle_details')} key={index}>{vehicle.registration_no} , {vehicle.year} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>

                            <div className="editform d-flex mt-3">
                                <div className="imagform">
                                    <Form.Label className="form-label">Upload Media <span className="text-danger">*</span></Form.Label>
                                    <ul className="imgedit p-0">
                                        <li className="active my-2 me-2">
                                            <Files
                                                className='files-dropzone'
                                                onChange={this.onFilesChange}
                                                onError={this.onFilesError}
                                                // accepts={['.pdf', '.docx', '.doc']}
                                                accepts={['image/*']}
                                                multiple={false}
                                                maxFileSize={10000000}
                                                minFileSize={0}
                                                clickable
                                                style={{ cursor: "pointer" }}
                                                required
                                            >

                                                click to upload Image
                                            </Files>
                                        </li>
                                        <li><Files
                                            className='files-dropzone'
                                            onChange={this.onFilesChange}
                                            onError={this.onFilesError}
                                            // accepts={['.pdf', '.docx', '.doc']}
                                            accepts={['video/mp4']}
                                            multiple={false}
                                            maxFileSize={10000000}
                                            minFileSize={0}
                                            clickable
                                            style={{ cursor: "pointer" }}
                                            required
                                        >

                                            click to upload video
                                        </Files></li>
                                    </ul>
                                </div>
                                {/* <div className="videoform my-2 ms-3">
                                    {/* <Form.Label className="form-label">Upload video</Form.Label> */}
                                {/* <ul className="imgedit p-0">
                                    <li className="active">

                                    </li>
                                </ul>
                            </div> */}
                            </div>
                            <div >
                                <Row className="img_box">
                                    {this.state.form.images.length != 0 || this.state.form.video
                                        ? <Files
                                            className='files-dropzone'
                                            onChange={this.onFilesChange}
                                            onError={this.onFilesError}
                                            // accepts={['.pdf', '.docx', '.doc']}
                                            accepts={['image/*', 'video/mp4']}
                                            multiple={false}
                                            maxFileSize={10000000}
                                            minFileSize={0}
                                            clickable
                                            style={{ cursor: "pointer" }}
                                            required
                                        ><Row>
                                        {this.state.form.images.map((op, index) => (
                                            <Col md={2}>
                                                <div style={{ border: "2px solid white", padding: "1vh" }}>
                                                    <i onClick={() => this.removeImage(index, "image")} className="fa fa-close" style={{ fontSize: "18px", color: "red", paddingLeft: "20vh" }}></i>
                                                    <img src={op.preview ? op.preview.url : op.media_path} alt="" style={{ marginBottom: "3vh" }} />
                                                </div>
                                            </Col>
                                        ))}
                                        {this.state.form.video
                                            &&
                                            <Col md={2}>
                                                <div style={{ border: "2px solid white", padding: "1vh" }}>
                                                    <i onClick={() => this.removeImage(1, "video")} className="fa fa-close" style={{ fontSize: "18px", color: "red", paddingLeft: "20vh" }}></i>
                                                    <video width="90" controls src={this.state.form.video.media_path} type="video/mp4">
                                                        {/* <source src={this.state.form.video} type="video/mp4"> */}
                                                        {/* <source src="mov_bbb.ogg" type="video/ogg"> */}
                                                        Your browser does not support HTML video.
                                                    </video>
                                                </div>
                                            </Col>}

                                    </Row>
                                            
                                            
                                         
                                        </Files>
                                        : <>
                                            <Files
                                                className='files-dropzone'
                                                onChange={this.onFilesChange}
                                                onError={this.onFilesError}
                                                // accepts={['.pdf', '.docx', '.doc']}
                                                accepts={['image/*', 'video/mp4']}
                                                multiple={false}
                                                maxFileSize={10000000}
                                                minFileSize={0}
                                                clickable
                                                style={{ cursor: "pointer" }}
                                                required
                                            >
                                                <Row>
                                                    <Col md={1}><img src={upload} /></Col>
                                                    <Col md={1}><img src={upload} /></Col>
                                                    <Col md={1}><img src={upload} /></Col>
                                                </Row>
                                            </Files>
                                        </>}

                                </Row>
                                {error && error.images ? <><span className="text-danger">{error.images}</span></> : ""}
                            </div>
                            {/* <hr className="text-white " /> */}

                            <Col lg={12} md={12} sm={12}>
                                <div className="editform pt-4">
                                    <Form.Label className="form-label">Highlight <span className="text-danger">*</span></Form.Label>
                                    <textarea className="form-control" name="description" value={this.state.form.description} onChange={this.handleChange} placeholder="Enter here"></textarea>
                                    {error && error.description ? <><span className="text-danger">{error.description}</span></> : ""}
                                </div>
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <div className="editform">
                                    <Form.Label className="form-label">Warning <span className="text-danger">*</span></Form.Label>
                                    <textarea className="form-control" name="warning" value={this.state.form.warning} onChange={this.handleChange} placeholder="Enter here"></textarea>
                                    {error && error.warning ? <><span className="text-danger">{error.warning}</span></> : ""}
                                </div>
                            </Col>
                            <hr className="text-white" />
                            <Row>
                                <Col lg={6} md={12} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">What to Take</Form.Label>
                                        <Form.Label className="d-flex bordedit">
                                            <Form.Control className="enteita" type="text" name="whatTake" placeholder="Enter Item" value={whatTake.value} onChange={this.onChangeitem} />
                                            <button className="addbut" type="button" onClick={() => this.onClickAdd('whatTake')}>Add</button>
                                        </Form.Label>
                                        <ul className="addlist p-0">
                                            {this.state.form.what_to_take && this.state.form.what_to_take.map((item, index) => (
                                                <li onClick={() => this.removeItem(index, 'whatTake')} key={index}>{item} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                                            ))}
                                        </ul>
                                        {error && error.what_to_take ? <><span className="text-danger">{error.what_to_take}</span></> : ""}
                                    </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                    <div className="editform">
                                        <Form.Label className="form-label">Things and services included</Form.Label>
                                        <Form.Label className="d-flex bordedit">
                                            <Form.Control className="enteita" type="text" placeholder="Enter Item" name="thinkServices" value={thinkServices.value} onChange={this.onChangeitem} />
                                            <button className="addbut" type="button" onClick={() => this.onClickAdd('thingsInclude')}>Add</button>
                                        </Form.Label>
                                        <ul className="addlist p-0">
                                            {this.state.form.thing_service_included && this.state.form.thing_service_included.map((thing, index) => (
                                                <li onClick={() => this.removeItem(index, 'thing')} key={index}>{thing} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                                            ))}
                                        </ul>
                                        {error && error.thing_service_included ? <><span className="text-danger">{error.thing_service_included}</span></> : ""}
                                    </div>
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                    <h6 className="meefont text-white bfont">Add Ons</h6>
                                    <div className="editform">
                                        <Form.Label className="form-label">Item</Form.Label>
                                        <Form.Label className="d-flex detail">
                                            <Form.Control className="enteita me-2" type="text" placeholder="Enter Item" name="item" value={addOn.item} onChange={this.onChangeitem} />
                                            <Form.Control className="enteita me-2" type="number" placeholder="Enter Price" name="price" value={addOn.price} onChange={this.onChangeitem} />
                                            <Form.Control className="enteita mx-2" type="number" placeholder="Enter Quantity" name="quty" value={addOn.quty} onChange={this.onChangeitem} />
                                            <button className="addbut" type="button" onClick={() => this.onClickAdd('addOn')} >Add</button>
                                        </Form.Label>
                                        <ul className="addlist p-0">
                                            {this.state.form.add_ons && this.state.form.add_ons.map((addon, index) => (
                                                <li onClick={() => this.removeItem(index, 'addons')} key={index}>{addon.item}({addon.price})-{addon.quantity} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                                            ))}
                                        </ul>
                                        {error && error.add_ons ? <><span className="text-danger">{error.add_ons}</span></> : ""}
                                    </div>
                                </Col>
                            </Row>

                            <hr className="text-white" />
                            <Row>
                                <Col lg={2} md={4} >
                                    <div className="addbutt mb-2">
                                        <Button onClick={() => this.handleSubmit()}>Submit</Button>
                                        {/* <Link className="custom_btn" to="/activitydetails">Submit</Link> */}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>




            </div >



        </>)
    }


}
export default AddNewRental;