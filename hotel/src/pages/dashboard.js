import React, { Component } from "react";
import { Container, Nav, Tab, Row, Table, Button, Col, } from "react-bootstrap";
import '../assets/css/style.css';
import Chart from 'react-google-charts';
import scaner_img from '../assets/images/scaner.png';


const LineData = [
  ['x', 'dogs', 'cats'],
  [0, 0, 0],
  [1, 10, 5],
  [2, 23, 15],
  [3, 17, 9],
  [4, 18, 10],
  [5, 9, 5],
  [6, 11, 3],
  [7, 27, 19],
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

  render() {
    return (<>
      <div className="dashboardheader pt-5  ">
        <div className="container-fluid ">
          <Row>
            < Col md={4}>
              <div className="dasboardborder">
                <div className="totalrefrel m-auto">
                  <h2>$50</h2>
                  <p>Total Referrals</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder">
                <div className="totalicom m-auto">
                  <h2>$1250</h2>
                  <p>Total Income</p>
                </div>
              </div>
            </Col>
            < Col md={4} >
              <div className="dasboardborder">
                <div className="totalicom m-auto">
                  <h2>$1250</h2>
                  <p>Total Income</p>
                </div>
              </div>
            </Col>

              {/* < Col md={4}>
                <div className="dasboardborder text-center">
                  <div className="scanbar m-auto">
                    <img src={scaner_img} alt="" />
                  </div>
                </div>
              </Col> */}

          </Row>

        </div>
      </div>
      < div className="Chartdas">
        <div className=" container-fluid">
          <Row>
          <Col md={12}>
              <div className="Chartin text-white">
                <div className="container mt-5">
                  <h5>Monthly REPORT</h5>
                  <div className="dasboardborder text-center mt-4">
                <div className="scanbar m-auto mt-4">
                  <img src={scaner_img} alt="" />
                  <h3 className="text-white">GS2378Df</h3>
                </div>
              </div>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="Chartin text-white">
                <div className="container mt-5 ">
                  <h5>RECENT REPORT</h5>
                  <Chart
                    width={'auto'}
                    height={'300px'}
                    backgound={'black !impotant'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={LineData}
                    options={LineChartOptions}
                    rootProps={{ 'data-testid': '2' }}
                  />
                </div>
              </div>
            </Col>
           
          </Row>
        </div>
      </div>




    </>)
  }


}
export default Dashboard;