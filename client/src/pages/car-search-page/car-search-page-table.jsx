import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CarTable = ({ cars }) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState({ field: '', order: '' });
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const handleChangePage = (event, newPage) => {
    setLoading(true);
    setPage(newPage);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const StyledTableCell = styled(TableCell)({
    padding: 10,
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleYearsOrderChange = () => {
    if (order.order === 'asc') {
      setOrder({ field: 'year', order: 'desc' });
    } else {
      setOrder({ field: 'year', order: 'asc' });
    }
  };

  const handlePriceOrderChange = () => {
    if (order.order === 'asc') {
      setOrder({ field: 'price', order: 'desc' });
    } else {
      setOrder({ field: 'price', order: 'asc' });
    }
  };

  const rows = cars
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({
      id, brand, model, year, price, transmission, fuelType,
    }) => (
      <TableRow key={id}>
        <StyledTableCell>{id}</StyledTableCell>
        <StyledTableCell>{brand}</StyledTableCell>
        <StyledTableCell>{model}</StyledTableCell>
        <StyledTableCell>{transmission}</StyledTableCell>
        <StyledTableCell>{fuelType}</StyledTableCell>
        <StyledTableCell align="right">{price}</StyledTableCell>
        <StyledTableCell align="right">{year}</StyledTableCell>
        <StyledTableCell align="right" sx={{ width: 1 / 100, whiteSpace: 'nowrap' }}>
          <Link to={`/car/${id}`}>Peržiūrėti</Link>
        </StyledTableCell>
      </TableRow>
    ));

  const skeletonRows = Array.from(new Array(rowsPerPage)).map(() => (
    <TableRow>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell><Skeleton animation="wave" height={20} /></StyledTableCell>
      <StyledTableCell>
        <Skeleton animation="wave" height={20} />
      </StyledTableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper} elevation={4} square>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Markė</TableCell>
            <TableCell>Modelis</TableCell>
            <TableCell>Pavarų dėžė</TableCell>
            <TableCell>Kuro tipas</TableCell>
            <TableCell align="right">
              Kaina €
              <IconButton onClick={handlePriceOrderChange}>
                {
                  order.order === 'asc'
                    ? <ArrowDropUpIcon />
                    : <ArrowDropDownIcon />
                }
              </IconButton>
            </TableCell>
            <TableCell align="right">
              Gam. Metai
              <IconButton onClick={handleYearsOrderChange}>
                {
                  order.order === 'asc'
                    ? <ArrowDropUpIcon />
                    : <ArrowDropDownIcon />
                }
              </IconButton>
            </TableCell>
            <TableCell>Veiksmai</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading
              ? skeletonRows
              : rows
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 25]}
        component="div"
        count={cars.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Mašinų skaičius puslapyje:"
      />
    </TableContainer>
  );
};

export default CarTable;
