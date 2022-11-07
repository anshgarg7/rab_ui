import React, { Component } from "react";
import {Link } from "react-router-dom";
import {Table, Button} from "react-bootstrap";
import '../../assets/css/style.css'

class Myinventory extends Component{

  render(){

    return(<>
    
        <div className="p-5">
            <div className="page_title d-flex justify-content-between align-items-center">
              <h5>Inventory Management</h5>
            </div>
          
            <div>
                  <Table responsive="sm" className="custom-table invetory_table">
                    <thead>
                      <tr>
                        <th>Activities</th>
                        <th>01/Jan</th>
                        <th>02/Jan</th>
                        <th>03/Jan</th>
                        <th>04/Jan</th>
                        <th>05/Jan</th>
                        <th>06/Jan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                      <tr>
                        <td>Paragliding</td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                        <td><Link to="/inventoryDetails">30/100</Link></td>
                      </tr>
                    </tbody>
                  </Table>
            </div>
        </div>
 
    </>)
  }


}
export default Myinventory;