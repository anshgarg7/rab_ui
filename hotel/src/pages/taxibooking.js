import React, { Component } from "react";
import {Container,Nav,Tab,Row,Table, Button} from "react-bootstrap";
import '../assets/css/style.css'
import {Link  } from "react-router-dom";

class Taxibooking extends Component{

  render(){

    return(<>
    

        <div>
            
                <div className="page_title d-flex justify-content-between align-items-center">
                  <h5>My Referral List</h5>
                </div>
             
                <div>
                      <Table responsive="sm" className="custom-table">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th className="px-5">Customer</th>
                            <th className="px-5">Phone Number</th>
                            <th className="px-5">Driver Name</th>
                            <th className="px-5">Status</th>
                            <th className="px-5">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>John</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="vendorDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>John</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="vendorDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>John</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="vendorDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>John</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="vendorDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>John</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="vendorDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>John</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="vendorDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                        </tbody>
                      </Table>
                </div>
                <Link className="round_btn" to="/taxibookingForm"><i class="fa fa-plus" aria-hidden="true"></i></Link>
       
        </div>

     
      
    </>)
  }


}
export default Taxibooking;