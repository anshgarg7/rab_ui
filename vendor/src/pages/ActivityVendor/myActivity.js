import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import '../../assets/css/style.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import http from "../../Helper/http";
class MyActivity extends Component {


  getRental = () => {
    http.getList(`v1/vendor/adventure_activities`).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){

    this.getRental()
  }
  render() {

    return (<>

      <div className="p-5">
        <div className="page_title d-flex justify-content-between align-items-center">
          <h5>My Activity</h5>
        </div>

        <div>
          <Table responsive="sm" className="custom-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th className="px-5">Activity</th>
                <th>Booking/Day</th>
                <th>Completed</th>
                <th>Pending</th>
                <th>Cancelled</th>
                <th className="px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Jet Skiing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Para-Sailing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jet Skiing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Para-Sailing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>5</td>
                <td>Jet Skiing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>6</td>
                <td>Para-Sailing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>7</td>
                <td>Jet Skiing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
              <tr>
                <td>8</td>
                <td>Para-Sailing</td>
                <td>150</td>
                <td>65</td>
                <td>40</td>
                <td>34</td>
                <td><Link className="viewbtn" to="/activitydetails/2"><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
              </tr>
            </tbody>
          </Table>

        </div>

        <Link className="round_btn" to="/mynewactivity"><i className="fa fa-plus" aria-hidden="true"></i></Link>
      </div>

    </>)
  }


}
export default MyActivity;