import React, { Component } from "react";
import {Container,Nav,Tab,Row,Table, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../assets/css/style.css'

class MyBooking extends Component{

  render(){

    return(<>
    

        <div>
            
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="page_title d-flex justify-content-between align-items-center">
                  <h5>My Bookings List</h5>
                  <Nav variant="pills" className="d-flex">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Activity</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Rental</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
             
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div>
                      <Table responsive="sm" className="custom-table">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th className="px-5">Customer</th>
                            <th>Phone Number</th>
                            <th className="px-5">Category</th>
                            <th>Status</th>
                            <th className="px-5">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="activityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="activityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="activityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="activityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="activityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="activityDetails1 "><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                        </tbody>
                      </Table>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <div>
                      <Table responsive="sm" className="custom-table">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th className="px-5">Customer</th>
                            <th>Phone Number</th>
                            <th className="px-5">Category</th>
                            <th>Status</th>
                            <th className="px-5">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Car, Honda City</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Car, Honda City</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Car, Honda City</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Car, Honda City</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Car, Honda City</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Car, Honda City</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails1"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                        </tbody>
                      </Table>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
               
             
            </Tab.Container>

           

            <Link className="round_btn" to="/searchVendor"><i class="fa fa-plus" aria-hidden="true"></i></Link>

            
       
        </div>

     
      
    </>)
  }


}
export default MyBooking;