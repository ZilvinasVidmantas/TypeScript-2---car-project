import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { Link } from 'react-router-dom';
// import Pagination from './car-table-pagination';

const CarTable = ({ cars }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, cars.length - page * rowsPerPage);

  const rows = cars
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(({
      id, brand, model, year, price,
    }) => (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>{brand}</TableCell>
        <TableCell>{model}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="right">{year}</TableCell>
        <TableCell align="right" sx={{ width: 1 / 100, whiteSpace: 'nowrap' }}>
          <Link to={`/car/${id}`}>Peržiūrėti</Link>
        </TableCell>
      </TableRow>
    ));
  return loading
    ? (
      <>
        <Skeleton animation="wave" height={60} />
        <Skeleton animation="wave" height={60} />
        <Skeleton animation="wave" height={60} />
      </>
    ) : (
      <TableContainer component={Paper} elevation={4} square>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Markė</TableCell>
              <TableCell>Modelis</TableCell>
              <TableCell align="right">Kaina €</TableCell>
              <TableCell align="right">Gam. Metai</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
            {' '}
            {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
            )}
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
