import React, { Component } from "react";
import { Container, Nav, Tab, Row, Table, Button, Col, Tabs, Form } from "react-bootstrap";
import '../assets/css/style.css';
// import Chart from 'react-google-charts';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Table1 from "./table";
import http from "../Helper/http";
import moment from "moment"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Booking from "../assets/images/booking.png"
import cancelBooking from "../assets/images/booking-cancel.png"
import completeBooking from "../assets/images/complete-booking.png"
import Income from "../assets/images/income1.png"
import activity from "../assets/images/activty.svg"
import inprogress from "../assets/images/progrss.png"
import Chart from './components/Chart'
const LineData = [
  ['x', 'Completed', 'Canceled', 'In Progress'],
  [0, 0, 0, 0],
  [1, 10, 5, 0],
  [2, 23, 15, 0],
  [3, 17, 9, 45],
  [4, 18, 10, 6],
  [5, 9, 5, 0],
  [6, 11, 30, 0],
  [7, 27, 19, 0],
]
const LineChartOptions = {
  hAxis: {
    title: 'Time',
  },
  vAxis: {
    title: 'Popularity',
  },
  series: {
    1: { curveType: 'function' },
  },
}
class Dashboard extends Component {
  state = {
    alignment: "activity",
    serachResult: [],
    rows: [],
    search: "",
    loader: false,
    dashboard: {},
    chartData: {}
  }

  handleChange = (event, newAlignment) => {
    this.setState({ alignment: newAlignment });
  };

  // const[serach, setSearch] = useState("")
  // const[serachResult, setSerachResult] = useState([])
  // useEffect(() => {
  //   get_Bookings();
  // }, [page])
  componentDidMount() {

    this.get_Bookings()
    // this.getdashboard()
    // this.getChartData()
  }

  getdashboard = () => {
    this.setState({ loader: true })
    let s1 = { ...this.state }
    http.getList(`v1/vendor/dashboard`).then(res => {
      console.log(res)
      if (res.status == 200) {
        s1.chartData = {
          labels: [
            'Cancel Booking',
            'In Progress Booking',
            'Complated Booking',
            'Total Bookings'
          ],
          datasets: [
            {
              data: [res.data.cancelled_bookings_count, res.data.inprogress_bookings_count, res.data.bookings_count, res.data.completed_bookings_count],
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(242, 34, 55)',
                'rgba(245, 245, 66)',
                'rgba(87, 140, 7)',
              ]
            }
          ]
        }
        s1.loader = false
        s1.dashboard = res.data
        // s1.chartData.datasets[0].data.push(res.data.cancelled_bookings_count)
        // s1.chartData.datasets[0].data.push(res.data.inprogress_bookings_count)
        // s1.chartData.datasets[0].data.push(res.data.bookings_count)
        // s1.chartData.datasets[0].data.push(res.data.completed_bookings_count)

        this.setState(s1)
      } else {
        this.setState({ loader: false })

      }
    }).catch(err => {
      this.setState({ loader: false })

    })
  }

  get_Bookings = () => {
    this.setState({ loader: true })
    let s1 = { ...this.state }
    http.getList(`v1/vendor/get_all_bookings`).then((res) => {
      console.log("----", res)
      if (res.status == 200) {
        // setLoder(false)

        s1.rows = res.data.filter(op => op.start_date == moment(new Date()).format("YYYY-MM-DD"))
        s1.serachResult = s1.rows
        s1.loader = false
        this.setState(s1)
      }

    }).catch((err) => {
      this.setState({ loader: false })
      console.log(err)
    })
    ///////////////////////////////////
    http.getList(`v1/vendor/dashboard`).then(res => {
      console.log(res)
      if (res.status == 200) {
        s1.chartData = {
          labels: [
            'Cancel Booking',
            'In Progress Booking',
            'Complated Booking',
            'Total Bookings'
          ],
          datasets: [
            {
              data: [res.data.cancelled_bookings_count, res.data.inprogress_bookings_count, res.data.bookings_count, res.data.completed_bookings_count],
              //backgroundColor:'green',
              backgroundColor: [
                'rgba(242, 34, 55)',
                'rgba(245, 245, 66)',
                'rgba(87, 140, 7)',
              ]
            }
          ]
        }
        s1.loader = false
        s1.dashboard = res.data
        // s1.chartData.datasets[0].data.push(res.data.cancelled_bookings_count)
        // s1.chartData.datasets[0].data.push(res.data.inprogress_bookings_count)
        // s1.chartData.datasets[0].data.push(res.data.bookings_count)
        // s1.chartData.datasets[0].data.push(res.data.completed_bookings_count)

        this.setState(s1)
      } else {
        this.setState({ loader: false })

      }
    }).catch(err => {
      this.setState({ loader: false })

    })

  }

  // useEffect(() => {
  //   if (serach == "") {
  //     setRows(serachResult)
  //   } else {
  //     let proData = rows
  //       .filter(item => {
  //         console.log(item)
  //         if (item.user && item.user.email && item.user.email.includes(serach)) { return true }
  //       })
  //     console.log(proData)
  //     setRows(proData)
  //   }

  // }, [serach]);












  render() {

    let { rows, serachResult, search, dashboard, chartData } = this.state
    // console.log(BrowserView,MobileView,isBrowser,isMobile,deviceType)
    // var uuid = new DeviceUUID().get();
    // const uniqueId = DeviceInfo.getUniqueID();
    // console.log(uniqueId)
    // console.log(uuid);
    if (search == "") {
      // this.setState({rows:serachResult})
      // setRows(serachResult)
    } else {
      let proData = rows
        .filter(item => {
          // console.log(item)
          if (item.user && item.user.email && item.user.email.includes(search) && item.user.mobile_no && item.user.mobile_no.includes(search)) { return true }
        })
      console.log(proData)
      rows = proData
      // setRows(proData)
    }

    return (<>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={this.state.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="dashboardheader p-5">
        <div className="container-fluid ">
          <div className="page_title m-0" style={{ textAlign: "end", paddingBottom: "5vh" }}>
            {/* <Tabs defaultActiveKey="activity" id="uncontrolled-tab-example" className="mb-3" >
              <Tab eventKey="activity" title="Acitvity">
              </Tab>
              <Tab eventKey="rental" title="Rental" ></Tab>
            </Tabs> */}
          </div>
          <Row>
            < Col md={4}>
              <div className="dasboardborder pt-3">
                <div className="totalrefrel bg-primary m-auto">
                  <h2><img src={activity} width="12%" /><span className="p-3" >{dashboard && dashboard.activities_count && dashboard.activities_count}</span></h2>
                  <p>Total Activity</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder   pt-3">
                <div className="totalicom bg-primary m-auto">
                  <h2><img src={Income} width="12%" /><span className="p-3" >{dashboard && dashboard.total_earned_amount && dashboard.total_earned_amount}</span></h2>
                  <p>Total Income</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder pt-3">
                <div className="totalicom  bg-primary m-auto">
                  <h2><img src={Booking} width="12%" /><span className="p-3" >{dashboard && dashboard.total_earned_amount && dashboard.total_earned_amount}</span></h2>
                  <p>Total Bookings</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder pt-3">
                <div className="totalicom bg-warning m-auto">
                  <h2><img src={inprogress} width="12%" /><span className="p-3" >{dashboard && dashboard.inprogress_bookings_count && dashboard.inprogress_bookings_count}</span></h2>
                  <p>In Progress Bookings</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder pt-3">
                <div className="totalicom bg-success m-auto">
                  <h2><img src={completeBooking} width="12%" /><span className="p-3" >{dashboard && dashboard.completed_bookings_count && dashboard.completed_bookings_count}</span></h2>
                  <p>Completed Bookings</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder pt-3">
                <div className="totalicom bg-danger m-auto">
                  <h2><img src={cancelBooking} width="12%" /><span className="p-3" >{dashboard && dashboard.cancelled_bookings_count && dashboard.cancelled_bookings_count}</span></h2>
                  <p>Canceled Bookings</p>
                </div>
              </div>
            </Col>
            < Col md={4}>
              <div className="dasboardborder text-center">
                <div className="scanbar m-auto">
                  <img src={`${process.env.PUBLIC_URL}/images/scaner.png`} alt="" height="130px" />

                </div>
              </div>
            </Col>

          </Row>

        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h4 className="text-white p-4">Current Date (Bookings)</h4>
          <Form className=" pt-3 " style={{ paddingRight: "2vh", width: "30%" }}>
            <Form.Group >
              <Form className="search_input">
                <Form.Group controlId="formBasicPassword" >
                  <Form.Control type="text" name="search" value={search} onChange={(e) => this.setState({ search: e.target.value })} placeholder="Search here" />
                </Form.Group>
                <Button variant="primary" type="submit" className="custom_btn">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </Button>
              </Form>
            </Form.Group>
          </Form>
        </div>

        <Table1 rows={rows} />
      </div>
      < div className="Chartdas pb-4">
        <div className=" container-fluid">
          <Row>
            <Col md={12}>
              <div className="Chartin text-white ">
                <div className="container mt-5 ">
                  <h3 className="p-3">Booking Chart</h3>
                  <div className="chartResponsive">
                    <div className="App">
                      <Chart chartData={this.state.chartData} displayLegend={false} />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="App">
                <h1>React &amp; Chart.js</h1>
                <Chart chartData={this.state.chartData} displayLegend={false} />
              </div> */}
            </Col>
            {/* <Col md={6}>
              <div className="Chartin text-white">
                <div className="container mt-5">
                  <h5>Monthly REPORT</h5>
                  <div className="chartResponsive">
                    <Chart
                      width={'auto'}
                      height={'300px'}
                      chartType="LineChart"
                      loader={<div>Loading Chart</div>}
                      data={LineData}
                      options={LineChartOptions}
                      rootProps={{ 'data-testid': '2' }}
                    />
                  </div>
                </div>
              </div>
            </Col> */}
          </Row>
        </div>
      </div>




    </>)
  }

}
export default Dashboard;