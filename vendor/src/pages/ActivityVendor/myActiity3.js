import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import http from "../../Helper/http";
import '../../assets/css/style.css'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
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
        id: 'quantity', label: 'Quantity', minWidth: 10, bgColor: "#e52346", pb: "3px", align: 'center',
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

export default function MyActivity3() {
    const [rows, setRows] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loder,setLoder] = useState(false)

    useEffect(() => {
        setLoder(true)
        get_RentalActvities();
    }, [page])



    const get_RentalActvities = () => {
        http.getList(`v1/vendor/adventure_activities`).then((res) => {
            console.log("----", res)
            if (res.status == 200) {
                setRows(res.data)
                setLoder(false)
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

    return (<>
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
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell  align={column.align} sx={{ color: "white" }}>
                                                        {console.log(row.activity && row.activity && row.activity.activity_adventure_type && row.activity.activity_adventure_type && row.activity.activity_adventure_type.name && row.activity.activity_adventure_type.name)}
                                                        {column.id == "activity" ? value && value.title && value.title
                                                            // : column.id == "model" ? value && value.name && value.name
                                                            : column.id == "activity_adventure_type" ? row.activity && row.activity && row.activity.activity_adventure_type && row.activity.activity_adventure_type && row.activity.activity_adventure_type.name && row.activity.activity_adventure_type.name
                                                                : column.id == "action" ? <Link className="viewbtn" to={`/activitydetails/${row.id}`}><i className="fa fa-eye" aria-hidden="true"></i> View Details</Link>
                                                                    : value}
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <Link className="round_btn" to="/mynewactivity"><i className="fa fa-plus" aria-hidden="true"></i></Link>
    </>
    );
}
