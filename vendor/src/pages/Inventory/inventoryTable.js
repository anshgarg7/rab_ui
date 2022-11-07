import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import moment from 'moment'
import { Link } from "react-router-dom";
import '../../assets/css/style.css'
import http from "../../Helper/http";
import '../../assets/css/style.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getDate } from 'date-fns';

import { Switch, Modal, TextField, Box, Paper, CircularProgress, Backdrop, Typography, TableRow, TablePagination, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// const columns = [
//     {
//         id: 'title', align: 'center', label: 'Title', minWidth: 10, bgColor: "#e52346", pb: "3px",
//         color: 'white',
//     },
//     {
//         id: 'activity', align: 'center', label: 'Activity', minWidth: 10, bgColor: "#e52346", pb: "3px",
//         color: 'white',
//     },


//     {
//         id: 'activity_adventure_type',
//         label: 'Activity Type',
//         minWidth: 10,
//         align: 'center',
//         bgColor: "#e52346",
//         color: 'white',
//         pb: "3px",
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'status',
//         label: 'Status',
//         minWidth: 10,
//         align: 'center',
//         bgColor: "#e52346",
//         pb: "3px",
//         color: 'white',
//         format: (value) => value.toLocaleString('en-US'),
//     },

//     {
//         id: 'is_approved', label: 'Aproved Status', minWidth: 10, bgColor: "#e52346", pb: "3px", align: 'center',
//         color: 'white',
//     },
//     {
//         id: 'action', align: 'center', label: 'Action', minWidth: 10, bgColor: "#e52346", pb: "3px",
//         color: 'white',
//     },
// ];

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


export default function InventoryTable() {
    const [rows, setRows] = useState(
        {
            slots: [
                { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
                // { startTime: "12:29", endTime: "02:12", quantaty: "3" },
            ]
        }
    )


    const [columns, setColumns] = useState([

        { date: "2022-06-01" },
        { date: "2022-06-02" },
        { date: "2022-06-03" },
        { date: "2022-06-04" },
        { date: "2022-06-05" },
        { date: "2022-06-06" },
        { date: "2022-06-07" },
        { date: "2022-06-08" },
        { date: "2022-06-09" },
        { date: "2022-06-10" },
        { date: "2022-06-11" },
        { date: "2022-06-12" },
        { date: "2022-06-13" },
        { date: "2022-06-14" },
        { date: "2022-06-15" },
        { date: "2022-06-16" },
        { date: "2022-06-17" },
        { date: "2022-06-18" },
        { date: "2022-06-19" },

    ])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loder, setLoder] = useState(false)
    const [serach, setSearch] = useState("")
    const [serachResult, setSerachResult] = useState([])
    const [filterDateStart, setFilterDateStart] = useState("")
    const [filterDateEnd, setFilterDateEnd] = useState("")
    const [open, setOpen] = React.useState(false);
    const [inventory, setInventory] = useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        let newValue = new Date()
        let startDate = new Date(newValue)
        let endDate = moment(newValue).add(7, 'days').format("YYYY-MM-DD")
        endDate = new Date(endDate)

        let result = [];
        let index = 0;
        while (endDate >= startDate) {
            result.push({ date: moment(new Date(moment(newValue).add(index, 'days').format("YYYY-MM-DD"))).format("YYYY-MM-DD") });
            index++
            startDate.setDate(startDate.getDate() + 1)
            // startDate.setDate(startDate.getDate() + 1);
        }
        console.log(result);
        setColumns(result)
        let start = new Date(columns[0].date)

        setFilterDateStart(start)

    }, []);

    useEffect(() => {
        let start = new Date(columns[0].date)
        let end = new Date(columns[0].date)

        setFilterDateStart(start)
        end.setDate(end.getDate() + 5)
        setFilterDateEnd(end)
    }, []);
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };


    const get_RentalActvities = () => {
        http.getList(`v1/vendor/adventure_activities`).then((res) => {
            if (res.status == 200) {
                setRows(res.data)
                setLoder(false)
                setSerachResult(res.data)
            }

        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        setLoder(true)
        http.getList(`v1/vendor/get_inventory`).then(res => {
            if (res.status == 200) {
                setInventory(res.data)
                setLoder(false)
            } else {
                console.log(res, "===------=== error")
                // setLoder(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const handleChangeStart = (newValue) => {
        let startDate = new Date(newValue)
        let endDate = moment(newValue).add(7, 'days').format("YYYY-MM-DD")
        endDate = new Date(endDate)

        let result = [];
        let index = 0;
        while (endDate >= startDate) {
            result.push({ date: moment(new Date(moment(newValue).add(index, 'days').format("YYYY-MM-DD"))).format("YYYY-MM-DD") });
            index++
            startDate.setDate(startDate.getDate() + 1)
            // startDate.setDate(startDate.getDate() + 1);
        }
        setColumns(result)
        setFilterDateStart(newValue)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(inventory)
    return (

        <div className="p-5">
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                style={{ width: "200%" }}
                                // disableOpenPicker="true"
                                onChange={handleChangeStart}
                                // label="Date&Time picker"
                                // value={this.props.endDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider><br />
                        <h6 className='pt-4'>10 slots Avilable (22/May)</h6>
                        {/* {rows} */}
                        <h6>10 pm - 12 pm <span className='pl-4' style={{ paddingRight: "15vh", paddingLeft: "15vh" }}>8</span>
                            Active <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />Frezz</h6>
                        <hr />
                        <h6>10 pm - 12 pm <span className='pl-4' style={{ paddingRight: "15vh", paddingLeft: "15vh" }}>8</span>
                            Active <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />Frezz</h6>
                        <hr />
                        <h6>10 pm - 12 pm <span className='pl-4' style={{ paddingRight: "15vh", paddingLeft: "15vh" }}>8</span>
                            Active <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />Frezz</h6>
                    </Box>
                </Modal>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loder}
            // open="true"
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="page_title d-flex justify-content-between align-items-center">
                <h5>My Inventory</h5>
            </div>
            <Paper sx={{ width: '100%', padding: "3px" }}>
                <TableContainer sx={{ maxHeight: 540 }}>
                    <Table aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ backgroundColor: "rgb(19 19 24)" }} colSpan={2}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            style={{ width: "100%", color: "white", backgroundColor: "white" }}
                                            // disableOpenPicker="true"
                                            // min={columns[0].date}
                                            onChange={handleChangeStart}
                                            inputFormat="dd/MM/yyyy"
                                            // label="Date&Time picker"
                                            value={filterDateStart}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: "rgb(19 19 24)" }} colSpan={2}>
                                    s
                                </TableCell>
                                <TableCell align="center" sx={{ backgroundColor: "rgb(19 19 24)" }} colSpan={2}>
                                    s
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell
                                    align="center"
                                    style={{ top: 57, width: 10, color: "white", backgroundColor: "#e52346", borderBottom: "4px solid white" }}
                                >
                                    Activity
                                </TableCell>
                                {columns.map((column, index) => (
                                    // filterDateStart <= new Date(column.date) && new Date(moment(filterDateStart).add(6, 'days').format('YYYY-MM-DD')) >= new Date(column.date) &&
                                    (<TableCell
                                        key={index}
                                        align="center"
                                        style={{ top: 57, width: 10, color: "white", backgroundColor: "#e52346", borderBottom: "4px solid white" }}
                                    >
                                        {/* {console.log(new Date(column.date))} */}
                                        {moment(column.date, "YYYY:MM:DD").format('DD/MMMM')}
                                    </TableCell>)
                                ))}
                                <TableCell
                                    align="center"
                                    style={{ top: 57, width: 10, color: "white", backgroundColor: "#e52346", borderBottom: "4px solid white" }}
                                >
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {inventory.length != 0
                            ? <TableBody>
                                {inventory
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell align="center" sx={{ color: "white" }}>
                                                    {row && row.activity && row.activity.title && row.activity.title}
                                                </TableCell>
                                                {columns.map((column) => {
                                                    // console.log(row && row.slot_bookings && row.slot_bookings[0].find(op => new Date(op.date) == new Date(column.date)))
                                                    if (row.activity_day_sheets) {
                                                        if (row.activity_day_sheets.find(op => new Date(column.date) >= new Date(op.start_date) && new Date(column.date) < new Date(moment(op.start_date).add(op.duration, "days").format("YYYY-MM-DD")))) {
                                                            return (
                                                                <>
                                                                    <TableCell key={column.date} align="center" sx={{ color: "white" }}>
                                                                        <Link
                                                                            to={{
                                                                                pathname: `/inventoryDetails/${index}`,
                                                                                state: { date: column.date }
                                                                            }}
                                                                        >
                                                                            {row.slot_bookings[0].find(op => op.date == column.date) ? row.slot_bookings[0].find(op => op.date == column.date).booked_quantity : 0}
                                                                            /
                                                                            {row && row.activity_day_sheets && row.activity_day_sheets.length != 0 && row.activity_day_sheets.reduce(function (acc, curr) {
                                                                                return curr && curr.quantity && curr.quantity + acc
                                                                            }, 0)}
                                                                        </Link>
                                                                    </TableCell>
                                                                </>

                                                            );
                                                        } else {
                                                            return (
                                                                <>
                                                                    <TableCell align="center" sx={{ color: "white" }}>
                                                                        N/A
                                                                    </TableCell>
                                                                </>
                                                            )
                                                        }

                                                    } else {
                                                        if (row.list_date.find(op => new Date(column.date) >= new Date(op.start_date) && new Date(column.date) <= new Date(op.end_date))) {
                                                            return (
                                                                <>
                                                                    <TableCell align="center" sx={{ color: "white" }}>
                                                                        <Link
                                                                            to={{
                                                                                pathname: `/inventoryDetails/${index}`,
                                                                                state: { date: column.date }
                                                                            }}
                                                                        >
                                                                            {row.slot_bookings[0].find(op => op.date == column.date) ? row.slot_bookings[0].find(op => op.date == column.date).booked_quantity : 0}
                                                                            /{row && row.activity_time_sheet_times && row.activity_time_sheet_times.length != 0 && row.activity_time_sheet_times.reduce(function (acc, curr) {
                                                                                return curr && curr.quantity && curr.quantity + acc
                                                                            }, 0)}
                                                                        </Link>
                                                                    </TableCell>
                                                                </>

                                                            );
                                                        } else {
                                                            return (
                                                                <>
                                                                    <TableCell align="center" sx={{ color: "white" }}>
                                                                        N/A
                                                                    </TableCell>
                                                                </>
                                                            )
                                                        }
                                                    }
                                                })}
                                                <TableCell align="center" sx={{ color: "white" }}>
                                                    <Link className="viewEditbtn" to={`/inventoryDetails/${index}`}><i className="fa fa-edit" aria-hidden="true"></i> </Link>
                                                </TableCell>
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
                    count={inventory.length}
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
