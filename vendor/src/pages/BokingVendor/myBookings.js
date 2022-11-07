import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import http from "../../Helper/http";
import '../../assets/css/style.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import avter from "../../assets/images/avter.jpg"
const columns = [
  {
    id: 'title', align: 'center', label: 'Title', minWidth: 10, bgColor: "#e52346", pb: "3px",
    color: 'white',
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 10,
    align: 'center',
    bgColor: "#e52346",
    pb: "3px",
    color: 'white',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'customer', align: 'center', label: 'Customer', minWidth: 10, bgColor: "#e52346", pb: "3px",
    color: 'white',
  },
  {
    id: 'customerName', align: 'center', label: 'Customer', minWidth: 10, bgColor: "#e52346", pb: "3px",
    color: 'white',
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 10,
    align: 'center',
    bgColor: "#e52346",
    color: 'white',
    pb: "3px",
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'phone_number',
    label: 'Phone Number',
    minWidth: 10,
    align: 'center',
    bgColor: "#e52346",
    color: 'white',
    pb: "3px",
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'status', label: 'Status', minWidth: 10, bgColor: "#e52346", pb: "3px", align: 'center',
    color: 'white',
  },
  {
    id: 'action', align: 'center', label: 'Action', minWidth: 10, bgColor: "#e52346", pb: "3px",
    color: 'white',
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];


export default function ColumnGroupingTable() {
  const [rows, setRows] = useState([

  ])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loder, setLoder] = React.useState(false)
  const [serach, setSearch] = useState("")
  const [serachResult, setSerachResult] = useState([])
  useEffect(() => {
    get_Bookings();
  }, [page])



  const get_Bookings = () => {
    setLoder(true)
    http.getList(`v1/vendor/get_all_bookings`).then((res) => {
      console.log("----", res)
      if (res.status == 200) {
        setLoder(false)
        setSerachResult(res.data)
        setRows(res.data)
      }

    }).catch((err) => {
      setLoder(false)
      console.log(err)
    })

  }
  useEffect(() => {
    if (serach == "") {
      setRows(serachResult)
    } else {
      let proData = rows
        .filter(item => {
          console.log(item)
          if (item.user && item.user.email && item.user.email.includes(serach)) { return true }
        })
      console.log(proData)
      setRows(proData)
    }

  }, [serach]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="p-5">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loder}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="page_title d-flex justify-content-between align-items-center">
        <h5>My Bookings</h5>
      </div>
      <Paper sx={{ width: '100%', padding: "3px" }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ backgroundColor: "rgb(19 19 24)" }} colSpan={2}>
                  <Form className="">
                    <Form.Group >
                      <Form className="search_input">
                        <Form.Group controlId="formBasicPassword" >
                          <Form.Control type="text" name="search" value={serach} onChange={(e) => setSearch(e.target.value)} placeholder="Search here" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="custom_btn">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </Button>
                      </Form>
                    </Form.Group>
                  </Form>
                </TableCell>
                <TableCell align="center" sx={{ backgroundColor: "rgb(19 19 24)" }} colSpan={2}>
                  s
                </TableCell>
                <TableCell align="center" sx={{ backgroundColor: "rgb(19 19 24)" }} colSpan={2}>
                  s
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, width: column.minWidth, color: column.color, backgroundColor: column.bgColor, borderBottom: "4px solid white" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        console.log(value)
                        return (
                          <TableCell key={column.id} align={column.align} sx={{ color: "white" }}>
                            {column.id == "title" ? row && row.rental_activity ? row.rental_activity.title && row.rental_activity.title
                              : row.adventure_activity && row.adventure_activity.title && row.adventure_activity.title
                              : column.id == "category" ? row && row.adventure_activity ? row.adventure_activity.activity && row.adventure_activity.activity.title && row.adventure_activity.activity.title
                                : row.rental_activity && row.rental_activity.activity && row.rental_activity.activity.name && row.rental_activity.activity.name
                                : column.id == "email" ? row && row.user && row.user.email && row.user.email
                                  : column.id == "phone_number" ? row && row.user && row.user.mobile_no && row.user.mobile_no
                                    : column.id == "status" ? row && row.status
                                      && row.status == "1" ? "Pending" : row.status == "2" ? "In Progress" : row.status == "3" ? "Abandoned" : row.status == "4" ? "Completed" : row.status == "5" ? "Cancelled" : ""
                                      : column.id == "action" ? <Link className="viewbtn" to={`/bookingdetails/${row.activity_category}/${row.id}`}><i className="fa fa-eye" aria-hidden="true"></i> </Link>
                                        : column.id == "customerName" ? row && row.user && row.user.first_name && row.user.last_name && `${row.user.first_name} ${row.user.last_name}`
                                          : column.id == "customer"
                                            ? <div  className="text-center ml-3">
                                              <Avatar alt="Remy Sharp" src={avter}  />

                                            </div>

                                            : row && row.id}
                            {/* {value} */}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          className='bro'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          // sx={{ color: "red" ,backgroundColor:"#e52346"}}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Link className="round_btn" to="/bookactivity"><i className="fa fa-plus" aria-hidden="true"></i></Link>
    </div>
  );
}
