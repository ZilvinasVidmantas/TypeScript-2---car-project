import * as React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, Button } from '@mui/material';

// Generate liked cars
function createData(id, brand, model, year, price) {
  return {
    id,
    brand,
    model,
    year,
    price,
  };
}

const rows = [
  createData(
    0,
    'opel',
    'žopel',
    '2000',
    312.44,
  ),
  createData(
    1,
    'opel',
    'žopel',
    '2000',
    866.99,
  ),
  createData(
    2,
    'opel',
    'žopel',
    '2000',
    100.81,
  ),
  createData(
    3,
    'opel',
    'žopel',
    '2000',
    654.39,
  ),
  createData(
    4,
    'opel',
    'žopel',
    '2000',
    212.79,
  ),
];

const preventDefault = (event) => {
  event.preventDefault();
};

const LikedCars = () => (
  <>
    <Typography component="h2" variant="h6">Patinkantys automobiliai</Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Markė</TableCell>
          <TableCell>Modelis</TableCell>
          <TableCell>metai</TableCell>
          <TableCell align="right">Kaina</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.brand}</TableCell>
            <TableCell>{row.model}</TableCell>
            <TableCell>{row.year}</TableCell>
            <TableCell align="right">{`${row.price}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Button onClick={preventDefault}>
      {/* <Link color="primary" href="#"  sx={{ mt: 3 }}> */}
      Daugiau
      {/* </Link> */}
    </Button>
  </>
);

export default LikedCars;
