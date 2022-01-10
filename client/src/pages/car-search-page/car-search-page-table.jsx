import React, { useEffect, useState } from 'react';
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
import { Link, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { createUrlParamObj } from '../../helpers';

const StyledTableCell = styled(TableCell)({
  padding: 10,
});

const CarTable = ({ cars, dataLength }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [cars]);

  const handleChangePage = (_, newPage) => {
    setLoading(true);
    setPage(newPage);
    const keys = ['_limit', '_page'];
    keys.forEach((key) => {
      searchParams.delete(key);
    });
    const params = [
      { key: '_page', value: newPage + 1 },
      { key: '_limit', value: rowsPerPage },
    ];
    const newParams = createUrlParamObj(searchParams, params);
    setSearchParams(newParams);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = cars.map(({
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
            <TableCell align="right">Kaina €</TableCell>
            <TableCell align="right">Gam. Metai</TableCell>
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
        count={dataLength}
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
