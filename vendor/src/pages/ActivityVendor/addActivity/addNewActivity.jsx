import React, { Component } from "react";
import { Breadcrumb, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../../assets/css/style.css'
import MultiDay from "./activityDay/multipleDay";
import SingleDay from "./activityDay/singleDay";
import http from "../../../Helper/http";
import { Box, Typography, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Files from 'react-files';
import { FileUploader } from "react-drag-drop-files";
import upload from "../../../assets/images/upload.png"
import { Country, State, City } from 'country-state-city';
import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SweetAlert from 'react-bootstrap-sweetalert';
import validaction from "../validaction/validaction";
import LocationPicker from 'react-location-picker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment'
// import Button from '@mui/material/Button';
import { Snackbar, Alert, Slide } from '@mui/material';
// import Slide from '@mui/material/Slide';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
import PlacesAutocomplete from 'react-places-autocomplete';

// import upload from "../../../../assets/images/upload.png"
import { OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from '@mui/material';
import helper from "./helper";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function TransitionDown(props) {
  return <Slide {...props} direction="left" />;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const names = [
  'Hindi',
  'English',
  'Punjabi',
  'Tamil',
];

function getStyles(name, personName) {

  return {
    // backgroundColor:"white",

    fontWeight:
      personName.indexOf(name) === -1
        ? "12px"
        : "2px",
  };
}

class AddNewActivity extends Component {
  constructor() {
    super();
    this.state = {
      loder: false,
      flaxedData: { slot_type: [], duration: "", start_time: "", day_quantity: "", duration_quantity: "", itinerary: "", pendingSlot: 0 },
      editPriceIndex: -1,
      websiteData: "",
      priceArr: [],
      modelPrice: false,
      priceTable: { people: 1, price: null },
      activity: { activityDay: "", activityType: "", availability: "", activityFuture: "", is_pickup: "" },
      whatTake: {
        value: "",
        items: []
      },
      thinkServices: {
        value: "",
        items: []
      },
      addOn: {
        price: "",
        item: "",
        quty: '',
        items: []
      },
      actFuture: { futureDate: "", futureSpot: "" },
      dateTable: {},
      categoryArr: [],
      subCategoryArr: [],
      modelArr: [],
      form: {
        activity_id: null,
        activity_adventure_type_id: null,
        title: "",
        level: null,
        altitude_depth_height: null,
        age_from: null,
        age_to: null,
        description: "",
        warning: "",
        is_pickup: "0",
        price: [],
        is_extra_charges: 1,
        address_line_one: "",
        address_line_two: "",
        landmark: "",
        country: "",
        state: "",
        city: "",
        pin_code: "",
        latitude: "",
        longitude: "",
        location: "",
        what_to_take: [],
        add_ons: [],
        is_provide_all_parts: "0",
        images: [],
        lat: "",
        lng: "",
        is_website: "0",
        website_link: "",
        list_date: [],
        thing_service_included: [],
        profile_image: [],
        video: "",
        activity_type_data: {
          activity_type: "1",
          single_day_categories: "3",
          slot_type: "1",
          repeat_in_fature: [],
          auto: { start_time: "", slot_time_duration: "", day_slot: "", time_slot: "" },
          flexd: [],
          slot: [],
          activity_repeat_in_future: "0",
          repeat_start_date: "",
          spot: "",
          duration: "",
          start_date: "",
          no_of_spot: "",
          quantity: "",
          start_time: "",
          end_time: "",
          itinerary: [],
        },
        language: [],
      },
      activity_type_data: {},
      logo_error: '',
      countryVal: "",
      stateVal: "",
      error: {},
      warning: false,
      success: false,
      error_message: ""
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params
    this.setState({ loder: true })
    if (id) {
      http.getList(`v1/vendor/adventure_activity/detail/${id}`).then(res => {
        this.setState({ form: res.data, loder: false })
        console.log("sdds================", res)
      }).catch(err => {
        console.log(err)
      })
    }
    this.getCategory(`v1/vendor/get_activities_by_vendor_selected_category`, "categoryArr")
    this.createScriptLoadMap();
    // this.getCategory(`v1/vendor/get_adventure_activity_types/${this.state.form.activity_id}`, "subCategoryArr")

    // if (id) {

    //   this.getCategory(`v1/vendor/get_adventure_activity_types/${this.state.form.activity_id}`, "subCategoryArr")
    // }
  }

  handleSubmitForm = async () => {
    let s1 = { ...this.state }
    console.log("=====ggggg", s1.form.what_to_take.length);
    this.setState({ loder: true })
    let { id } = this.props.match.params
    s1.error = validaction.formValiaction(this.state.form, id ? "edit" : "add")
    // s1.error = validaction.validactionFlaxed(s1.form.activity_type_data.flexd, s1.form.activity_type_data.slot, id ? "edit" : "add" ,s1.form.activity_type_data.single_day_categories)

    if (Object.keys(s1.error).length === 0) {
      if (id) {
        let formData = helper.editApi(s1.form)
        http.postData(`v1/vendor/adventure_activity/update/${s1.form.id}`, formData)
          .then(result => {

            if (result.data.status === 200) {
              this.setState({ success: true, error_message: result.data.message, loder: false })
            } else {
              this.setState({ warning: true, error_message: result.data.message, loder: false })
            }
          })
          .catch(error => {
            this.setState({ warning: true, error_message: "somthing want wrong", loder: false })
          });

      } else {
        let formData = helper.callApi(s1.form)
        http.postData(`v1/vendor/adventure_activity/store`, formData)
          .then(result => {
            console.log("===================", result);
            if (result.data.status === 200) {
              this.setState({ success: true, error_message: result.data.message, loder: false })
            } else {
              this.setState({ warning: true, error_message: result.data.message, loder: false })
            }
          })
          .catch(error => {
            this.setState({ warning: true, error_message: "somthing want wrong", loder: false })
          });

      }
    } else {
      s1.loder = false
      this.setState(s1)
    }
  }


  onFilesChange = (files) => {
    let s1 = { ...this.state }
    console.log(files[0])
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

  handleChange1 = (event) => {
    let s1 = { ...this.state }
    const { target: { value } } = event;
    let language = typeof value === 'string' ? value.split(',') : value
    s1.form.language = language
    this.setState(s1)
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let s1 = { ...this.state }
    s1.form.activity_type_data[name] = value
    if (Object.keys(s1.error).length != 0) {
      s1.error = validaction.formValiaction(this.state.form, "edit")
    }
    this.setState(s1);
  };
  /////////////////////////////////////////////////////////////////

  getCategory = async (url, val) => {
    let s1 = { ...this.state }
    console.log(url)
    http.getList(url)
      .then(result => {
        console.log(result)
        if (result.status == 200) {
          console.log(result.data)
          this.setState({ [val]: result.data, loder: false })
        } else {
          // setErrMessage(result.message)
        }
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleFormChange = (event) => {
    const { name, value } = event.target;
    let s1 = { ...this.state }
    console.log("====", value)
    if (name == "country") {
      s1.countryVal = value
      Country.getAllCountries().map(op => {
        if (value == op.isoCode) {
          s1.form.country = op.name
        }
      })
    }
    else if (name == "state") {
      s1.stateVal = value
      State.getStatesOfCountry(s1.countryVal).map(op => {
        if (s1.stateVal == op.isoCode) {
          s1.form.state = op.name
        }
      })
    } else {
      s1.form[name] = value
    }

    this.getCategory(`v1/vendor/get_adventure_activity_types/${s1.form.activity_id}`, "subCategoryArr")
    if (Object.keys(s1.error).length != 0) {
      s1.error = validaction.formValiaction(this.state.form, "edit")
    }
    this.setState(s1);
  }
  onClickAdd = (check) => {
    // console.log(test);
    let s1 = { ...this.state }
    if (check === "whatTake") {
      if (s1.whatTake.value) {
        s1.form.what_to_take.push({ name: s1.whatTake.value })
        s1.whatTake.value = ''
        this.setState(s1)
      }
    }
    else if (check === "thingsInclude") {
      if (s1.thinkServices.value) {
        s1.form.thing_service_included.push({ name: s1.thinkServices.value })
        s1.thinkServices.value = ''
        this.setState(s1)
      }
    } else if (check == "addOn") {
      if (s1.addOn.price && s1.addOn.item) {
        s1.form.add_ons.push({ item: s1.addOn.item, price: s1.addOn.price, quantity: s1.addOn.quty })
        s1.addOn.price = ''
        s1.addOn.item = ''
        s1.addOn.quty = ''
        this.setState(s1)
      }
    }
    else if (check == "weblink") {
      console.log(s1.websiteData);
      if (s1.websiteData) {
        s1.form.website_link = s1.websiteData
        s1.websiteData = ""
        this.setState(s1)
      }
    }
    else if (check == "addList") {
      console.log(s1.dateTable.startDate)
      if (s1.dateTable.startDate && s1.dateTable.endDate) {
        s1.form.list_date.push({ start_date: s1.dateTable.startDate, end_date: s1.dateTable.endDate })
        s1.dateTable.startDate = ""
        s1.dateTable.endDate = ""
        this.setState(s1)
      }
    }
    else if (check == "future") {
      if (s1.actFuture.futureDate && s1.actFuture.futureSpot) {
        s1.form.activity_type_data.repeat_in_fature.push({ repeat_start_date: s1.actFuture.futureDate, spot: s1.actFuture.futureSpot })
        s1.actFuture.futureDate = ""
        s1.actFuture.futureSpot = ""
        this.setState(s1)
      }
    }
    else if (check === "addons") {
      const { inputValue2, inputValue3, addons } = this.state;
      // console.log(inputValue);
      if (inputValue2 && inputValue3) {
        const nextState = [...addons, inputValue2 + "($" + inputValue3 + ")"];
        // console.log(nextState);
        this.setState({
          addons: nextState,
          inputValue2: '',
          inputValue3: ''
        });

      }
    }
    if (Object.keys(s1.error).length != 0) {
      s1.error = validaction.formValiaction(this.state.form, "edit")
    }
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
    } else if (name == "item") {
      s1.addOn.item = value
    } else if (name == "quty") {
      s1.addOn.quty = value
    }
    else if (name == "startDate" || name == "endDate") {
      s1.dateTable[name] = value
    } else if (name == "websiteData") {
      s1.websiteData = value
    } else if (name == "futureDate" || name == "futureSpot") {
      console.log(name, value)
      s1.actFuture[name] = value
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
      this.setState(s1)
    }
    else if (check === "weblink") {
      let s1 = { ...this.state }
      s1.form.website_link = ""
      this.setState(s1)
    }
    else if (check === "addList") {
      let s1 = { ...this.state }
      s1.form.list_date.splice(index, 1)
      this.setState(s1)
    }
    else if (check === "addons") {
      let s1 = { ...this.state }
      s1.form.add_ons.splice(index, 1)
      this.setState(s1)
    }
    else if (check === "future") {
      let s1 = { ...this.state }
      s1.form.activity_type_data.repeat_in_fature.splice(index, 1)
      this.setState(s1)
    }
    this.setState(s1)
  }

  onChangePrice = (e) => {
    console.log("onchage")
    let s1 = { ...this.state }
    s1.priceTable.price = e.target.value
    this.setState(s1)
  }

  addPrice = () => {
    console.log("add")
    let s1 = { ...this.state }
    if (s1.priceTable.price) {
      if (s1.editPriceIndex > -1) {
        let obj = { no_of_person: s1.priceTable.people, amount: s1.priceTable.price }
        s1.form.price[s1.editPriceIndex] = obj
        s1.priceTable.people = 0
        s1.form.price.map(o => s1.priceTable.people++)
        s1.priceTable.price = ''
        s1.priceTable.people++
        s1.editPriceIndex = -1
      } else {
        let arr = { no_of_person: s1.priceTable.people, amount: s1.priceTable.price }
        s1.form.price.push(arr)
        s1.priceTable.price = ''
        s1.priceTable.people++
      }
    }
    if (Object.keys(s1.error).length != 0) {
      s1.error = validaction.formValiaction(this.state.form, "edit")
    }
    this.setState(s1)
  }
  editPrice = (index) => {
    console.log("edit")
    let s1 = { ...this.state }
    let obj = { people: s1.form.price[index].no_of_person, price: s1.form.price[index].amount }
    s1.priceTable = obj
    s1.editPriceIndex = index
    this.setState(s1)
  }
  reset = () => {
    let s1 = { ...this.state }
    s1.form.price = []
    s1.priceTable = { people: 1, price: null }
    this.setState(s1)
  }
  handleChangeLoc = location => {
    let s1 = { ...this.state }
    s1.form.location = location
    this.setState(s1);
  };

  handleSelect = async (location) => {
    let s1 = { ...this.state }
    let res = await geocodeByAddress(location)
    console.log(res)
    let lang = await getLatLng(res[0])
    s1.form.location = res[0].formatted_address
    s1.form.latitude = lang.lat
    s1.form.longitude = lang.lng
    this.setState(s1)
  };

  handleChangeAuto = (name, value, val) => {
    let s1 = { ...this.state }

    if (val == "auto") {
      s1.form.activity_type_data.auto[name] = value
    } else if (val == "singleCat" || val == "slot_type") {
      s1.form.activity_type_data[name] = value
      s1.form.activity_type_data.slot = []
    } else if (name == "itinerary") {
      s1.form.activity_type_data.itinerary[val] = value
    }
    this.setState(s1)
  }
  handleSlots = (val, arr) => {
    let s1 = { ...this.state }
    if (val == "single") {
      s1.form.activity_type_data.slot = arr
    } else if (val == "multi") {
      s1.form.activity_type_data.itinerary = arr
    } else if (val == "flex") {
      s1.form.activity_type_data.slot = arr

    } else if (val == "flexData") {

      s1.form.activity_type_data.flexd.push(arr)

    }
    console.log("lkllk")
    this.setState(s1)
  }
  handleFlaxedSlot = (e) => {
    let s1 = { ...this.state }
    const { name, value } = e.target
    if (name == "slot_type") {

      if (s1.flaxedData.slot_type.find(o => o == value)) {
        s1.flaxedData.slot_type.splice(s1.flaxedData.slot_type.findIndex(op => op == value), 1)
        if (s1.form.activity_type_data.flexd.length != 0) {

          if (s1.form.activity_type_data.flexd.find(h => h.slot_type == value)) {
            console.log(s1.form.activity_type_data.flexd.find(l => l.slot_type == value),"klklklklk")
            s1.flaxedData.pendingSlot= s1.flaxedData.pendingSlot+parseInt(s1.form.activity_type_data.flexd.find(l => l.slot_type == value).duration_quantity)
            s1.form.activity_type_data.flexd.splice(s1.form.activity_type_data.flexd.findIndex(l => l.slot_type == value), 1)
            if (s1.form.activity_type_data.slot.find(op => op.slot_type == value)) {
              // console.log(s1.form.activity_type_data.slot.find(l => l.slot_type == value))
              s1.form.activity_type_data.slot.splice(s1.form.activity_type_data.slot.findIndex(l => l.slot_type == value), 1)
            }
          }
        }
      } else {
        s1.flaxedData.slot_type.push(value)
      }
    } else {
      if (name == "day_quantity") {
        s1.flaxedData.pendingSlot = value
      }
      s1.flaxedData[name] = value
    }

    this.setState(s1)
  }
  removeImage = (index, val) => {
    let s1 = { ...this.state }
    if (val == "image") {
      s1.form.images.splice(index, 1)
      s1.form.profile_image.splice(index, 1)
    } else {
      s1.form.video = ''
    }
    // if (Object.keys(s1.error).length != 0) {
    //   s1.error = validate.valdaction(this.state.form)
    // }
    this.setState(s1)
  }

  handleLocationChange = ({ position, address, places }) => {
    let s1 = { ...this.state }
    console.log(position, address, places)
    s1.form.location = address
    s1.form.latitude = position.lat
    s1.form.longitude = position.lng
    this.setState(s1)
    // Set new location
    // this.setState({ position, address });
  }
  createScriptLoadMap = () => {
    var gScript = document.querySelector("[data-setted]");
    var isSetted = gScript && gScript.getAttribute("data-setted");

    if (!isSetted) {
      var index = document.getElementsByTagName("script")[0];
      var script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDk_8w619G2LteJdDgBARkj0sNR4jMFhPc&libraries=places&callback=initialize";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-setted", true);
      index.parentNode.insertBefore(script, index);
      window.initialize = this.initialize();
    } else {
      this.initialize();
    }
  };
  initialize = () => {
    let placeSearch;
    let autocomplete;
    let google = window.google;
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      { types: ["geocode"] }
    );
    autocomplete.addListener("place_changed", function () {
      placeSearch = autocomplete.getPlace();
      if (placeSearch) {
        this.loactionSubmit(placeSearch)
      }
    }.bind(this));
  };

  loactionSubmit = (placeSearch) => {
    let s1 = { ...this.state }
    if (placeSearch.photos && placeSearch.photos[0] && placeSearch.photos[0].getUrl()) {
      s1.form.location_image = placeSearch.photos[0].getUrl()
    }
    console.log(placeSearch)
    // s1.form.exact_location_name = placeSearch.name
    s1.form.location = placeSearch.formatted_address
    s1.form.latitude = placeSearch.geometry.location.lat()
    s1.form.longitude = placeSearch.geometry.location.lng()
    // s1.form.location = placeSearch.formatted_address
    // s1.form.lat = placeSearch.geometry.location.lat()
    // s1.form.lng = placeSearch.geometry.location.lng()
    this.setState(s1)
  }
  // hanldepeople = () => {
  //   let s1 = { ...this.state }
  //   s1.priceTable.people = s1.form.price.length+1
  //   this.setState(s1)
  // }

  render() {
    const { activity, whatTake, priceArr, priceTable, warning, thinkServices, addOn, form, success, error_message, inputValue, item_takes, inputValue1, error, inputValue5, weblink, inputValue2, inputValue3, addons, successfull } = this.state;
    let { id } = this.props.match.params
    let currentDate = new Date()
    if (form.list_date.length != 0) {
      currentDate = form.list_date[form.list_date.length - 1].end_date
      console.log(form.list_date[form.list_date.length - 1].end_date, "ggygygygygygygy")
    }
    console.log(moment(currentDate).format("YYYY-MM-DD "))

    const defaultPosition = {
      lat: this.state.form.latitude ? parseFloat(this.state.form.latitude) : 0,
      lng: this.state.form.longitude ? parseFloat(this.state.form.longitude) : 0,
    }
    if (warning) {
      setTimeout(() => {
        this.setState({
          warning: false
        })
      }, 3500)
    }
    if (!this.state.subCategoryArr) {
      this.getCategory(`v1/vendor/get_adventure_activity_types/${this.state.form.activity_id}`, "subCategoryArr")
    }
    console.log("============", error)
    return (<>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loder}
      // open="true"
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={warning}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={TransitionDown}
        message={this.state.error_message}
      // key={transition ? transition.name : ''}
      ><Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: "5vh", marginLeft: "5vh" }}>
          {this.state.error_message}
        </Alert></Snackbar>
      {
        success ?
          <SweetAlert
            success
            title={error_message}
            // style={{ backgroundColor: 'black', color: 'white' }}
            confirmBtnBsStyle={'danger'}
            onConfirm={() => this.props.history.push("/myactivity")}
          // onCancel={this.onCancel}
          >
          </SweetAlert> : ""}


      <div className="p-5">
        <Breadcrumb>
          <Link className="breadcrumb_link" to="/myActivity">My Activity /</Link>
          <Link className="breadcrumb_link active" to="/mynewactivity">Add New Activity </Link>
        </Breadcrumb>


        <div className="mainfile">
          <Form>
            <div className="formcolr">
              <Row>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Row>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Category <span className="text-danger">*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="activity_id" value={this.state.form.activity_id} onChange={this.handleFormChange}>
                            {/* <option >{this.state.form.activity_id  && this.state.categoryArr.find(op=>op.id==this.state.form.activity_id).title?this.state.categoryArr.find(op=>op.id==this.state.form.activity_id).title : "Select Category"}</option> */}
                            <option value="0">Select Category</option>
                            {this.state.categoryArr && this.state.categoryArr.map(op => (
                              <option value={op.id}>{op.title}</option>
                            ))}
                            {/* {this.state.categoryArr.length > 0 ? this.state.categoryArr.map(op => (
                              this.state.form.activity_id == op.id
                                ? ""
                                : <option value={op.id}>{op.title}</option>
                            )) : ""} */}
                          </Form.Select>
                          {error && error.activity_id && <span className="text-center text-danger">{error.activity_id}</span>}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Sub-Category <span className="text-danger">*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="activity_adventure_type_id" value={this.state.form.activity_adventure_type_id} onChange={this.handleFormChange}>
                            {/* <option >{this.state.form.activity_adventure_type  ? this.state.subCategoryArr.find(op=>op.id==this.state.form.activity_adventure_type).name : "Select Category"}</option> */}
                            <option value="0">Select Category</option>
                            {
                              this.state.subCategoryArr.map(op => (
                                <option value={op.id}>{op.name}</option>
                              ))
                            }
                            {/* {this.state.subCategoryArr.length > 0 ? this.state.subCategoryArr.map(op => (
                              this.state.form.activity_adventure_type == op.id
                                ? ""
                                : <option value={op.id}>{op.name}</option>
                            )) : ""} */}
                          </Form.Select>
                          {error && error.activity_adventure_type_id && <span className="text-center text-danger">{error.activity_adventure_type_id}</span>}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Title <span className="text-danger">*</span></Form.Label>
                          <Form.Control className="cus" type="text" name="title" value={this.state.form.title} onChange={this.handleFormChange} placeholder="Enter Title" maxLength="191" />
                          {error && error.title && <span className="text-center text-danger">{error.title}</span>}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Level  <span className="text-danger">*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="level" value={this.state.form.level} onChange={this.handleFormChange}>
                            <option value="0" selected>Select Level</option>
                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Expert</option>
                          </Form.Select>
                          {error && error.level && <span className="text-center text-danger">{error.level}</span>}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Age from <span className="text-danger">*</span></Form.Label>
                          <Form.Control className="cus" type="number" name="age_from" value={this.state.form.age_from} onChange={this.handleFormChange} placeholder="From Age" />
                          {error && error.age_from && <span className="text-center text-danger">{error.age_from}</span>}
                        </div>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Age to <span className="text-danger">*</span></Form.Label>
                          <Form.Control className="cus" type="number" name="age_to" value={this.state.form.age_to} onChange={this.handleFormChange} placeholder="From Age" />
                          {error && error.age_to && <span className="text-center text-danger">{error.age_to}</span>}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Altitude/Depth/Height <span className="text-danger">*</span></Form.Label>
                          <div className="sel">
                            <Form.Control className="cus pt-4" type="number" name="altitude_depth_height" value={this.state.form.altitude_depth_height} onChange={this.handleFormChange} placeholder="Enter Here" />
                            {/* <Form.Select aria-label="Default select example">
                              <option selected>Height</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </Form.Select> */}
                          </div>
                          {error && error.altitude_depth_height && <span className="text-center text-danger">{error.altitude_depth_height}</span>}
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <div className="editform extra">
                          <Form.Label className="form-label">Language <span className="text-danger">*</span></Form.Label>
                          <div>
                            <div>
                              <FormControl sx={{ m: 1, width: 300, mt: 3 }} className="language-sell">
                                <Select
                                  multiple
                                  displayEmpty
                                  className="language-select"
                                  value={this.state.form.language}
                                  onChange={this.handleChange1}
                                  input={<OutlinedInput />}
                                  renderValue={(selected) => {
                                    if (selected.length === 0) {
                                      return <p>Select Language</p>;
                                    }

                                    return selected.join(', ');
                                  }}
                                  MenuProps={MenuProps}
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem disabled value="">
                                    <em>Placeholder</em>
                                  </MenuItem>
                                  {names.map((name) => (
                                    <MenuItem
                                      key={name}
                                      value={name}
                                      sx={getStyles(name, this.state.form.language)}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                            {/* <FormControl sx={{ m: 1, width: 300 }}>
                              <InputLabel id="demo-multiple-chip-label">Language</InputLabel>
                              <Form.Select aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </Form.Select>
                            </FormControl> */}
                          </div>
                          {error && error.language && <span className="text-center text-danger">{error.language}</span>}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <div className="singleAct-container">
                      <h6 className="meefont text-white bfont"> Price Table  <span className="text-danger">*</span></h6>
                      <div className="editform">
                        {/* <label>{priceTable.people}</label>
                        <input type="number" placeholder="Enter Price" name="price" value={priceTable.price} onChange={this.onChangePrice} />
                        <button className="addbut" type="button" onClick={() => this.addPrice()} >{this.state.editPriceIndex > -1 ? "Change" : "Add"}</button> */}
                        <Form.Label className="form-label">No of People</Form.Label>
                        <Form.Label className="d-flex detail">
                          <Form.Control className="enteita me-2" type="text" value={priceTable.people} />
                          <Form.Control className="enteita mx-2" type="number" placeholder="Enter Price" name="price" value={priceTable.price} onChange={this.onChangePrice} />
                          <button className="addbut" type="button" onClick={() => this.addPrice()} >{this.state.editPriceIndex > -1 ? "Change" : "Add"}</button>
                        </Form.Label>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <ul className="addlist p-">
                            {form.price && form.price.map((op, index) => (
                              <li onClick={() => this.editPrice(index)}>No of People : {op.no_of_person} , Price : {op.amount} &nbsp; &nbsp;<i className="fa fa-edit text-danger" aria-hidden="true"></i></li>
                            ))}
                          </ul>
                          {form.price.length == 0 ? "" : <div className="editform"> <Form.Label><button className="btn btn-danger" type="button" onClick={() => this.reset()} >Reset</button></Form.Label></div>}
                        </div>
                        {error && error.price && <span className="text-center text-danger">{error.price}</span>}
                      </div>
                      
                    </div>
                    {/* 
                    <Row className="singleAct-container">
                      <h6>Price</h6>
                      <Col lg={4} md={4} sm={12}>
                        <p>No of People: <span>1</span></p>
                      </Col>
                      <Col lg={8} md={8} sm={8}>

                        <div className="editform">
                          <Form.Label className="d-flex bordedit">
                            <Form.Control type="text" className="cus" placeholder="Enter Price" />
                            <button className="addbut" type="button" >Add</button>
                          </Form.Label>
                        </div>
                      </Col>
                    </Row> */}
                  </Col>
                </Row>





                <Col lg={12} md={12} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Highlight  <span className="text-danger">*</span> </Form.Label>
                    <textarea className="form-control" name="description" value={this.state.form.description} onChange={this.handleFormChange} placeholder="Enter here"></textarea>
                    {error && error.description && <span className="text-center text-danger">{error.description}</span>}
                  </div>
                </Col>
                <Col lg={12} md={12} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Warning  <span className="text-danger">*</span></Form.Label>
                    <textarea className="form-control" name="warning" value={this.state.form.warning} onChange={this.handleFormChange} placeholder="Enter here"></textarea>
                    {error && error.warning && <span className="text-center text-danger">{error.warning}</span>}
                  </div>
                </Col>
              </Row>
              {/* <hr className="text-white" /> */}
              <Row className="singleAct1-container">
                <Col lg={12} md={12} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">PickUp</Form.Label>
                    <div className="d-flex w-100">
                      <div className="form-check pe-5 d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="is_pickup" value="1" checked={this.state.form.is_pickup == 1} id="flexRadioDefault1" onChange={this.handleFormChange} />
                        <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                          Yes
                        </Form.Label>
                      </div>
                      <div className="form-check d-flex align-items-center">
                        <input className="form-check-input " type="radio" name="is_pickup" value="0" checked={this.state.form.is_pickup == 0} id="flexRadioDefault1" onChange={this.handleFormChange} />
                        <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                          No
                        </Form.Label>
                      </div>
                    </div>
                    {error && error.is_extra_charges && <span className="text-center text-danger">{error.is_extra_charges}</span>}
                  </div>
                  <div className="editform">

                    {this.state.form.is_pickup == 1 && <div className="d-flex w-100">
                      <div className="form-check pe-5 d-flex align-items-center">
                        <Form.Control className="form-check-input" type="radio" checked={form.is_extra_charges == "1"} name="is_extra_charges" value="1" id="flexRadioDefault1" onChange={this.handleFormChange} />
                        <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                          Extra Charges
                        </Form.Label>
                      </div>
                      <div className="form-check d-flex align-items-center">
                        <Form.Control className="form-check-input " type="radio" checked={form.is_extra_charges == "0"} name="is_extra_charges" value="0" id="flexRadioDefault1" onChange={this.handleFormChange} />
                        <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                          Free
                        </Form.Label>
                      </div>
                    </div>}
                  </div>
                </Col>
                {this.state.form.is_pickup == 1
                  && <><Col lg={7} md={12} sm={12}>
                    <h6 className="meefont text-white bfont">Meeting Point</h6>
                    <Row>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Address1  <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" className="cus" name="address_line_one" value={form.address_line_one} onChange={this.handleFormChange} placeholder="Enter Address Line 1" />
                          {error && error.address_line_one && <span className="text-center text-danger">{error.address_line_one}</span>}
                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Address2  <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" className="cus" name="address_line_two" value={form.address_line_two} onChange={this.handleFormChange} placeholder="Enter Address Line 2" />
                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Land mark  <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" className="cus" name="landmark" value={form.landmark} onChange={this.handleFormChange} placeholder="Enter Landmark" />
                          {error && error.landmark && <span className="text-center text-danger">{error.landmark}</span>}

                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Location  <span className="text-danger">*</span></Form.Label>

                          <div id="locationField">
                            <Form.Control type="text" placeholder="Please Search and Select Location" onChange={this.createScriptLoadMap} id="autocomplete" />
                          </div>
                          <PlacesAutocomplete
                            value={this.state.form.location}
                            onChange={this.handleChangeLoc}
                            onSelect={this.handleSelect}
                          >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div>
                                <input
                                  {...getInputProps({
                                    placeholder: 'Please Search and Select Location',
                                    className: 'form-control',
                                    type: "hidden",
                                  })}
                                />
                                <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                      ? 'suggestion-item--active'
                                      : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                      <div
                                        {...getSuggestionItemProps(suggestion, {
                                          className,
                                          style,
                                        })}
                                      >
                                        <span>{suggestion.description}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                          {error && error.location && <span className="text-center text-danger">{error.location}</span>}
                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Country  <span className="text-danger">*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="country" value={form.country} onChange={this.handleFormChange}>
                            <option >{form.country ? form.country : "Select"}</option>
                            {Country.getAllCountries().map(op => (
                              <option value={op.isoCode}>{op.name}</option>
                            ))}

                          </Form.Select>
                          {error && error.country && <span className="text-center text-danger">{error.country}</span>}
                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">State  <span className="text-danger">*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="state" value={form.state} onChange={this.handleFormChange}>
                            <option >{form.state ? form.state : "Select"}</option>
                            {this.state.countryVal &&
                              State.getStatesOfCountry(this.state.countryVal).map(op => (
                                <option value={op.isoCode}>{op.name}</option>
                              ))}

                          </Form.Select>
                          {error && error.state && <span className="text-center text-danger">{error.state}</span>}
                        </div>
                      </Col>
                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">City  <span className="text-danger">*</span></Form.Label>
                          <Form.Select aria-label="Default select example" name="city" value={form.city} onChange={this.handleFormChange}>
                            <option >{form.city ? form.city : "Select"}</option>
                            {this.state.countryVal && this.state.stateVal &&
                              City.getCitiesOfState(this.state.countryVal, this.state.stateVal).map(op => (
                                <option value={op.name}>{op.name}</option>
                              ))}

                          </Form.Select>
                          {error && error.city && <span className="text-center text-danger">{error.city}</span>}
                        </div>
                      </Col>

                      <Col md={6} sm={12}>
                        <div className="editform">
                          <Form.Label className="form-label">Pin Code  <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="text" className="cus" name="pin_code" value={form.pin_code} onChange={this.handleFormChange} placeholder="Enter Code" />
                          {error && error.pin_code && <span className="text-center text-danger">{error.pin_code}</span>}
                        </div>
                      </Col>

                    </Row>
                  </Col>
                    <Col lg={5} md={12} sm={12}>
                      <div className="editform box_detail map_box">
                        <Form.Label className="form-label">Location  <span className="text-danger">*</span></Form.Label>
                        <div style={{ height: '60%', width: '100%', border: "0" }}>
                          <LocationPicker
                            zoom={14}
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '275px' }} />}
                            defaultPosition={defaultPosition}
                            onChange={this.handleLocationChange}
                          />
                        </div>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin" width="100%" height="60%" frameborder="0" style={{ border: 0 }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}

                      </div>
                    </Col></>}

                {error && error.is_pickup && <span className="text-center text-danger">{error.is_pickup}</span>}
              </Row>
              {/* <hr className="text-white" /> */}
              <Row className="pt-4">
                <Col lg={6} md={12} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">What to Take</Form.Label>
                    <Form.Label className="d-flex bordedit">
                      <Form.Control className="enteita" type="text" name="whatTake" placeholder="Enter Item" value={whatTake.value} onChange={this.onChangeitem} />
                      <button className="addbut" type="button" onClick={() => this.onClickAdd('whatTake')}>Add</button>
                    </Form.Label>
                    <ul className="addlist p-0">
                      {form.what_to_take && form.what_to_take.map((item, index) => (
                        <li onClick={() => this.removeItem(index, 'whatTake')}>{item.name} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                      ))}
                    </ul>
                  </div>
                  {error && error.what_to_take && <span className="text-center text-danger">{error.what_to_take}</span>}
                </Col>

                <Col lg={6} md={12} sm={12}>
                  <div className="editform">
                    <Form.Label className="form-label">Things and services included</Form.Label>
                    <Form.Label className="d-flex bordedit">
                      <Form.Control className="enteita" type="text" placeholder="Enter Item" name="thinkServices" value={thinkServices.value} onChange={this.onChangeitem} />
                      <button className="addbut" type="button" onClick={() => this.onClickAdd('thingsInclude')}>Add</button>
                    </Form.Label>
                    <ul className="addlist p-0">
                      {form.thing_service_included && form.thing_service_included.map((thing, index) => (
                        <li onClick={() => this.removeItem(index, 'thing')}>{thing.name} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                      ))}
                    </ul>
                  </div>
                  {error && error.thing_service_included && <span className="text-center text-danger">{error.thing_service_included}</span>}
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
                      {form.add_ons && form.add_ons.map((addon, index) => (
                        <li onClick={() => this.removeItem(index, 'addons')}>{addon.item}({addon.price})-{addon.quantity} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                      ))}
                    </ul>
                  </div>
                  {error && error.add_ons && <span className="text-center text-danger">{error.add_ons}</span>}
                </Col>
              </Row>
              {/* <hr className="text-white" /> */}
              {!id
                && <Row className="singleAct1-container">
                  <Col lg={12} md={12} sm={12}>
                    <div className="editform">
                      <Form.Label className="form-label">Activity Type</Form.Label>
                      <div className="w-100">
                        <Container>
                          <Row className="pt-3">
                            <Col md={6}>
                              <div className="form-check ">
                                <input className="form-check-input" type="radio" id="flexRadioDefault1" checked={this.state.form.activity_type_data.activity_type == "1"} name="activity_type" value="1" onChange={this.handleChange} />
                                <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                                  Single Day
                                </Form.Label>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="form-check ">
                                {/* <Form.Control className="form-check-input" type="radio" name="flexRadioDefault"
                         // id="flexRadioDefault1" /> */}
                                <input className="form-check-input" type="radio" name="activity_type" checked={this.state.form.activity_type_data.activity_type == "2"} value="2" id="flexRadioDefault1" onChange={this.handleChange} />
                                <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                                  Multiple Day
                                </Form.Label>
                              </div>
                            </Col>
                          </Row>
                        </Container>

                        <Container >
                          <Row>
                            <Col md={12}>

                              {this.state.form.activity_type_data.activity_type == "1"
                                && <SingleDay
                                  errorAdd={this.state.error}
                                  flaxedData={this.state.flaxedData}
                                  handleFlaxed={this.handleFlaxedSlot}
                                  handleSlots={this.handleSlots}
                                  handleChange={this.handleChange}
                                  activity={this.state.form.activity_type_data}
                                  handleChangeAuto={this.handleChangeAuto}
                                  slots={this.state.form.activity_type_data.slot}
                                  auto={this.state.form.activity_type_data.auto} />}
                            </Col>
                            <Col md={12}>
                              {this.state.form.activity_type_data.activity_type == "2"
                                && <MultiDay
                                  errorAdd={this.state.error}
                                  activity={form.activity_type_data}
                                  actFuture={this.state.actFuture}
                                  onChangeitem={this.onChangeitem}
                                  removeItem={this.removeItem}
                                  onClickAdd={this.onClickAdd}
                                  showSlots={this.handleSlots}
                                  handleItinerary={this.handleChangeAuto}
                                  itinerary={form.activity_type_data.itinerary}
                                  handleChange={this.handleChange} />}
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  </Col>
                  {error && error.activity_type && <span className="text-center text-danger">{error.activity_type}</span>}
                </Row>
              }
              {/* <hr className="text-white" /> */}
              {/* <Col lg={12} md={12} sm={12} className="pt-2">
                <div class="editform d-flex">
                  <div className="imagform">
                    <Form.Label class="form-label">Upload Image</Form.Label>
                    <ul class="imgedit p-0 pt-4">
                      <li class="active my-2 me-2">Vertical Image</li>
                      <li>Horizontal Image</li>
                    </ul>
                  </div>
                  <div className="videoform my-2 ms-3 ">
                    <Form.Label class="form-label">Upload video</Form.Label>
                    <ul class="imgedit p-0 pt-4">
                      <li class="active">Upload</li>
                    </ul>
                  </div>
                </div>
              </Col> */}


              <div className="editform d-flex mt-3 pt-4">
                <div className="imagform">
                  <Form.Label className="form-label">Upload Media  <span className="text-danger">*</span></Form.Label>
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
                                    {/* <Form.Label class="form-label">Upload video</Form.Label> */}
                {/* <ul class="imgedit p-0">
                                    <li class="active">

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
                              <i onClick={() => this.removeImage(index, "image")} className="fa fa-close" style={{ fontSize: "18px", color: "red", paddingLeft: "18vh" }}></i>
                              <img src={op.preview ? op.preview.url : op.media_path} alt="" style={{ marginBottom: "3vh" }} />
                            </div>
                          </Col>
                        ))}
                        {/* {this.state.form.images.map(op => (
                          <Col md={2}>
                            <img src={op.preview ? op.preview.url : op.media_path} alt="" />
                          </Col>
                        ))} */}
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
                {error && error.images ? <><span className="text-danger" style={{fontSize:"12px"}}>{error.images}</span></> : ""}
              </div>

              <Row className="pt-4">
                <Col lg={6} md={12} sm={12}>
                  <h6 className="meefont text-white bfont">List Date  <span className="text-danger">*</span></h6>
                  <Row>
                    <Col md={5}>
                      <div className="editform">
                        <Form.Label className="form-label">Start Date</Form.Label>
                        <form className="d-flex detail">
                          <Form.Control className="dateedit" min={moment(currentDate).format("YYYY-MM-DD")} name="startDate" value={this.state.dateTable.startDate} onChange={this.onChangeitem} type="date" />
                        </form>
                        {error && error.list_date && <span className="text-center text-danger">{error.list_date}</span>}
                      </div>
                    </Col>
                    <Col md={5}>
                      <div className="editform">
                        <Form.Label className="form-label">End Date</Form.Label>
                        <form className="d-flex detail">
                          <Form.Control className="dateedit" name="endDate" disabled={!this.state.dateTable.startDate} min={moment(this.state.dateTable.startDate).format("YYYY-MM-DD")} value={this.state.dateTable.endDate} onChange={this.onChangeitem} type="date" />
                        </form>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="editform">
                        <Form.Label className="form-label"></Form.Label>
                        <form className="d-flex detail">
                          <button type="button" className="addbut" onClick={() => this.onClickAdd('addList')}>Add</button>
                        </form>
                      </div>
                    </Col>
                    <div className="editform">
                      <ul className="addlist p-0">
                        {form.list_date && form.list_date.map((item, index) => (
                          <li onClick={() => this.removeItem(index, 'addList')}>{item.start_date} - {item.end_date} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                        ))}
                      </ul>
                    </div>

                  </Row>
                  <Row>
                    <Col md={12} sm={12}>
                      <Row>
                        <Col md={12} sm={12}>
                          <div className="editform">
                            <Form.Label className="form-label">Will your company provider all the parts of this activity</Form.Label>
                            <div className="d-flex w-100">
                              <div className="form-check pe-5">
                                <input className="form-check-input" type="radio" checked={form.is_provide_all_parts == "1"} name="is_provide_all_parts" value="1" onChange={this.handleFormChange}
                                  id="flexRadioDefault1" />
                                <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                                  Yes
                                </Form.Label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" checked={form.is_provide_all_parts == "0"} name="is_provide_all_parts" value="0" onChange={this.handleFormChange}
                                  id="flexRadioDefault1" />
                                <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                                  No
                                </Form.Label>
                              </div>
                            </div>
                            {error && error.is_provide_all_parts && <span className="text-center text-danger">{error.is_provide_all_parts}</span>}
                          </div>
                        </Col>
                        <Col md={12} sm={12}>
                          <div className="editform">
                            <Form.Label className="form-label">Do you have wbsite?</Form.Label>
                            <div className="d-flex w-100">
                              <div className="form-check pe-5">
                                <Form.Control className="form-check-input" type="radio" checked={form.is_website == "1"} name="is_website" value="1" onChange={this.handleFormChange}
                                  id="flexRadioDefault1" />
                                <Form.Label className="form-check-label text-white ms-2" htmlFor="flexRadioDefault1">
                                  Yes
                                </Form.Label>
                              </div>
                              <div className="form-check">
                                <Form.Control className="form-check-input" type="radio" checked={form.is_website == "0"} name="is_website" value="0" onChange={this.handleFormChange}
                                  id="flexRadioDefault1" />
                                <Form.Label className="form-check-label text-white " htmlFor="flexRadioDefault1">
                                  No
                                </Form.Label>
                              </div>
                            </div>
                            {error && error.is_website && <span className="text-center text-danger">{error.is_website}</span>}
                          </div>
                          {form.is_website && form.is_website == "1"
                            && <div className="editform">
                              <Form.Label className="form-label">If yes enter website link</Form.Label>
                              <form className="d-flex adddeta">
                                <Form.Control className="enteita me-2" type="text" placeholder="Enter Link" name="websiteData" value={this.state.websiteData} onChange={this.onChangeitem} />
                                <button className="addbut" type="button" onClick={() => this.onClickAdd('weblink')}>Add</button>
                              </form>
                              <ul className="addlist p-0">
                                {form.website_link && <li onClick={() => this.removeItem('weblink')}>{form.website_link} &nbsp; &nbsp;<i className="fa fa-times" aria-hidden="true"></i></li>
                                }
                                {/* {weblink && weblink.map((item, index) => (
                                  <li onClick={() => this.removeItem(index, 'weblink')}>{item} &nbsp; &nbsp;<i class="fa fa-times" aria-hidden="true"></i></li>
                                ))} */}
                              </ul>
                            </div>}
                          {/* <div className="editform">
                          <Form.Label className="form-label">If yes enter website link</Form.Label>
                          <form className="d-flex adddeta">
                            <Form.Control className="enteita me-2" type="text" placeholder="Enter Link" />
                            <button className="addbut">Add</button>
                          </form>
                          <ul className="addlinks p-0">
                            <li>www.somthing.com &nbsp; &nbsp;<i class="fa fa-times" aria-hidden="true"></i></li>
                          </ul>
                        </div> */}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr className="text-white" />
              <Row>
                <Col lg={2} md={4} >
                  <div className="addbutt mb-2">
                    <button type="button" className="custom_btn" onClick={() => this.handleSubmitForm()}>{id ? "EDIT" : "SUBMIT"}</button>
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
export default AddNewActivity;