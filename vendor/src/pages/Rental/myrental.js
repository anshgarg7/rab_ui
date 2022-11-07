import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import '../../assets/css/style.css'
import http from "../../Helper/http";
import auth from "../../services/auth";


const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}


class MyRental extends Component {
  constructor() {
    super();
    this.state = {
      rentalActivityData: []
    };
  }

  componentDidMount = () => {
    this.get_RentalActvities();
  }

  get_RentalActvities = () => {
    const user = auth.getUser()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${http.BaseURL}/api/v1/vendor/rental_activities`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          rentalActivityData: result.data
        });
      })
      .catch(error => {
        this.setState({
          rentalActivityData: []
        });
      });
  }
  render() {

    console.log("============", this.state.rentalActivityData);
    const { rentalActivityData } = this.state;
    return (<>

      <div className="p-5">
        <div className="page_title d-flex justify-content-between align-items-center">
          <h5>My Rental</h5>
        </div>

        <div>
          <Table responsive="sm" className="custom-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th className="px-5">Activity</th>
                <th>Completed</th>
                <th>Pending</th>
                <th>Cancelled</th>
                <th className="px-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {rentalActivityData && rentalActivityData.map((i, index) => (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td>{i.title}</td>
                  <td>150 (dummy)</td>
                  <td>65 (dummy)</td>
                  <td>40 (dummy)</td>
                  <td>
                    <Link className="viewbtn" to={`/rentaldetail/${i.id}`}><i className="fa fa-eye" aria-hidden="true"></i> </Link>
                  </td>
                </tr>
              ))}
              <tr>
                <td>(dummy)</td>
                <td>Mahindra Thar (dummy)</td>
                <td>1500 (dummy)</td>
                <td>40 (dummy)</td>
                <td>30 (dummy)</td>
                <td>
                  <Link className="viewbtn" to="/rentaldetail/1"><i className="fa fa-eye" aria-hidden="true"></i></Link>
                </td>
              </tr>

            </tbody>
          </Table>
          {/* <>
            <Items currentItems={currentItems} />
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </> */}
        </div>

        <Link className="round_btn" to="/addnewrental"><i className="fa fa-plus" aria-hidden="true"></i></Link>
      </div>

    </>)
  }


}
export default MyRental;