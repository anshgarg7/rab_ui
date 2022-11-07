import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../../assets/css/style.css'
import http from "../../Helper/http";
import '../../assets/css/style.css'
const columns = [
    {
        id: 'title', align: 'center', label: 'Title', minWidth: 10, bgColor: "#e52346", pb: "3px",
        color: 'white',
    },
    {
        id: 'activity', align: 'center', label: 'Activity', minWidth: 10, bgColor: "#e52346", pb: "3px",
        color: 'white',
    },


    {
        id: 'activity_adventure_type',
        label: 'Activity Type',
        minWidth: 10,
        align: 'center',
        bgColor: "#e52346",
        color: 'white',
        pb: "3px",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 10,
        align: 'center',
        bgColor: "#e52346",
        pb: "3px",
        color: 'white',
        format: (value) => value.toLocaleString('en-US'),
    },

    {
        id: 'is_approved', label: 'Aproved Status', minWidth: 10, bgColor: "#e52346", pb: "3px", align: 'center',
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
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loder, setLoder] = useState(false)
    const [serach, setSearch] = useState("")
    const [serachResult, setSerachResult] = useState([])

    useEffect(() => {
        setLoder(true)
        get_RentalActvities();
    }, [page])
    useEffect(() => {
        if (serach == "") {
            setRows(serachResult)
        } else {
            let proData = rows
                .filter(item => {
                    console.log(item.title)
                    if (item.title.includes(serach) || item.activity.activity_adventure_type.name.includes(serach) || item.activity.title.includes(serach)) { return true }
                })
            console.log(proData)
            setRows(proData)
        }

    }, [serach]);



    const get_RentalActvities = () => {
        http.getList(`v1/vendor/adventure_activities`).then((res) => {
            console.log("----", res)
            if (res.status == 200) {
                setRows(res.data)
                setLoder(false)
                setSerachResult(res.data)
            }

        }).catch((err) => {
            console.log(err)
        })

    }



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
            // open="true"
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="page_title d-flex justify-content-between align-items-center">
                <h5>My Activity</h5>
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
                        {rows.length != 0
                            ? <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align} sx={{ color: "white" }}>
                                                            {console.log(row.activity && row.activity && row.activity.activity_adventure_type && row.activity.activity_adventure_type && row.activity.activity_adventure_type.name && row.activity.activity_adventure_type.name)}
                                                            {column.id == "activity" ? value && value.title && value.title
                                                                // : column.id == "model" ? value && value.name && value.name
                                                                : column.id == "activity_adventure_type" ? row.activity && row.activity && row.activity.activity_adventure_type && row.activity.activity_adventure_type && row.activity.activity_adventure_type.name && row.activity.activity_adventure_type.name
                                                                    : column.id == "action" ? <Link className="viewbtn" to={`/activitydetails/${row.id}`}><i className="fa fa-eye" aria-hidden="true"></i> </Link>
                                                                        : column.id == "status"
                                                                            ? value == 1 ? "Active " : "Disabled"
                                                                            : column.id == "is_approved"
                                                                                ? value == "1" ? "Active" : "Not Active"
                                                                                : value}
                                                            {/* {value} */}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                            : <spna className="text-danger text-center">No Result Found</spna>
                        }

                    </Table>
                </TableContainer>s
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
            <Link className="round_btn" to="/mynewactivity"><i className="fa fa-plus" aria-hidden="true"></i></Link>
        </div>
    );
}
