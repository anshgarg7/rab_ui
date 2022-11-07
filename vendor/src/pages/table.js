import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableHead } from '@mui/material';
import avter from "../assets/images/avter.jpg"
import Avatar from '@mui/material/Avatar';
import http from '../Helper/http';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#e52346",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
    createData('Cupcake', 305, 3.7, 2, 2, 2, 2, 2),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable(props) {
    const [page, setPage] = React.useState(0);
    const rows = props.rows
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
       // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    console.log(rows)
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead sx={{ backgroundColor: "red" }}>
                        <TableRow>
                            <StyledTableCell align="left">Title</StyledTableCell>
                            <StyledTableCell align="left">Custmor</StyledTableCell>
                            <StyledTableCell align="left">Custmor Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Phone Number</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell style={{ width: 160 }} align="left">
                                    {row && row.rental_activity && row.rental_activity.title && row.rental_activity.title}
                                    {row && row.adventure_activity && row.adventure_activity.title && row.adventure_activity.title}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="left">
                                    <Avatar alt="Remy Sharp" src={avter} />
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="left">
                                    {row && row.user && row.user.first_name && row.user.last_name && `${row.user.first_name} ${row.user.last_name}`}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="left">
                                    {row && row.user && row.user.email && row.user.email}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="left">
                                    {row && row.user && row.user.mobile_no && row.user.mobile_no}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="let">
                                    {row && row.status
                                        && row.status == "1" ? "Pending" : row.status == "2" ? "In Progress" : row.status == "3" ? "Abandoned" : row.status == "4" ? "Completed" : row.status == "5" ? "Cancelled" : ""}
                                </TableCell>
                                <TableCell style={{ width: 60 }} align="left">
                                    <Link className="viewbtn" to={`/bookingdetails/${row.activity_category}/${row.id}`}><i className="fa fa-eye" aria-hidden="true"></i> </Link>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    );
}
