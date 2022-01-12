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
  IconButton,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const StyledTableCell = styled(TableCell)({
  padding: 10,
});

const CarTable = ({ cars, count }) => {
  const [page, setPage] = useState(0);
  const [priceOrder, setPriceOrder] = useState('');
  const [yearsOrder, setYearsOrder] = useState('_sort_desc=year');
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
    if (searchParams.get('_limit')) {
      searchParams.set('_limit', rowsPerPage);
    }
    if (searchParams.get('_page')) {
      searchParams.set('_page', newPage + 1);
    }
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    if (searchParams.get('_limit')) {
      searchParams.set('_limit', parseInt(event.target.value, 10));
    }
    if (searchParams.get('_page')) {
      searchParams.set('_page', 1);
    }
    setSearchParams(searchParams);
    setPage(0);
  };

  const handleYearsOrderChange = () => {
    if (yearsOrder === '_sort_asc=year') {
      setYearsOrder('_sort_desc=year');
      searchParams.delete('_sort_asc');
      searchParams.set('_sort_desc', 'year');
    } else {
      setYearsOrder('_sort_asc=year');
      searchParams.delete('_sort_desc');
      searchParams.set('_sort_asc', 'year');
    }
    setSearchParams(searchParams);
  };

  const handlePriceOrderChange = () => {
    if (priceOrder === '_sort_asc=price') {
      setPriceOrder('_sort_desc=price');
      searchParams.delete('_sort_asc');
      searchParams.set('_sort_desc', 'price');
    } else {
      setPriceOrder('_sort_asc=price');
      searchParams.delete('_sort_desc');
      searchParams.set('_sort_asc', 'price');
    }
    setSearchParams(searchParams);
  };

  const rows = cars
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
                  priceOrder === '_sort_asc=price'
                    ? <ArrowDropUpIcon />
                    : <ArrowDropDownIcon />
                }
              </IconButton>
            </TableCell>
            <TableCell align="right">
              Gam. Metai
              <IconButton onClick={handleYearsOrderChange}>
                {
                  yearsOrder === '_sort_asc=year'
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
        count={count}
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
