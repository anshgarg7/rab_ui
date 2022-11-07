import React, { Component } from "react";
import {Container,Nav,Tab,Row,Table, Button} from "react-bootstrap";
import '../assets/css/style.css'

class RentalmyBookings extends Component{

  render(){

    return(<>
    

        <div>
            
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="page_title d-flex justify-content-between align-items-center">
                  <h5>Taxi Bookings </h5>
                  
                </div>
             
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div>
                      <Table responsive="sm" className="custom-table">
                        <thead>
                          <tr>
                            <th>Sr</th>
                            <th>Customer</th>
                            <th>Phone Number</th>
                            <th>Driver Name</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Joy Root</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Joy Root</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Joy Root</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Joy Root</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Joy Root</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Mark Smith</td>
                            <td>9876543210</td>
                            <td>Joy Root</td>
                            <td>Pending</td>
                            <td><Link className="viewbtn" to="rentalActivityDetails"><i class="fa fa-eye" aria-hidden="true"></i> View Details</Link></td>
                          </tr>
                        </tbody>
                      </Table>
                      </div>
                    </Tab.Pane>
                   
                  </Tab.Content>
               
             
            </Tab.Container>


          
       
        </div>

     
      
    </>)
  }


}
export default RentalmyBookings;