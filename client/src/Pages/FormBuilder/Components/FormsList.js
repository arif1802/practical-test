import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination } from '@mui/material';
import { useHistory } from "react-router";
import React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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

export default function FormsListTable(props) {
    const history = useHistory()
    const openSurvey = (url) => {
        history.push(`survey/${url}`)
    }
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{ mt: 10 }} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    {!props.forms.length &&
                        <caption>No Data Found</caption>
                    }
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Form Name</StyledTableCell>
                            <StyledTableCell>Form URL</StyledTableCell>
                            <StyledTableCell>Created At</StyledTableCell>
                            <StyledTableCell>Total Responses</StyledTableCell>
                            <StyledTableCell>Open Form</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.forms && (rowsPerPage > 0
                            ? props.forms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.forms
                        ).map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{row.form_name}</StyledTableCell>
                                <StyledTableCell>{window.location.origin}/survey/{row.slug}</StyledTableCell>
                                <StyledTableCell>{row.createdAt}</StyledTableCell>
                                <StyledTableCell align="center">{row.surveys ? row.surveys.length : 0}</StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => openSurvey(row.slug)}>Link</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.forms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
