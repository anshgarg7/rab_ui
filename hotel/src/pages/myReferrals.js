import React, { Component } from "react";
import {Container,Nav,Tab,Row,Table,Button,} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../assets/css/style.css'
class MyReferrals extends Component{
 
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
                            <th> Email Address</th>
                            <th>Phone Number</th>
                            <th className="px-5">Category</th>
                            <th>Status</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>shivbhatiabca01@gmail.com</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td> 
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>shivbhatiabca01@gmail.com</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td> 
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>shivbhatiabca01@gmail.com</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td> 
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>shivbhatiabca01@gmail.com</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td> 
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>shivbhatiabca01@gmail.com</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td> 
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Mark Smith</td>
                            <td>shivbhatiabca01@gmail.com</td>
                            <td>9876543210</td>
                            <td>Activity, Paragliding</td>
                            <td>Pending</td> 
                          </tr>
                        </tbody>
                      </Table>
                </div>
       
        </div>

     
      
    </>)
  }


}
export default MyReferrals;