import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddButton from './add-car-page-button';
import AddCarFormContainer from './add-car-page-container';
import PictureUpload from './add-car-page-picture-upload';

const AddCar = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const mainTitle = [
    { title: 'Markė', menuItem: ['Audi', 'BMW', 'Volvo'] },
    { title: 'Modelis', menuItem: ['100', 'X5', 'XC90'] },
    { title: 'Metai', menuItem: ['2000', '2001'] },
    { title: 'Kuro Tipas', menuItem: ['Dyzelis', 'Dujos', 'Benzinas'] },
    { title: 'Pavarų dėžė', menuItem: ['Automatinė', 'Mechaninė'] },
    { title: 'Variklio tūris', menuItem: ['1.6', '2.0', '2.1'] },
  ];

  const city = [
    { title: 'Vilnius' },
    { title: 'Kaunas' },
    { title: 'Klaipėda' },
    { title: 'Šiauliai' },
  ];

  return (
    <AddCarFormContainer>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3 }}
      >
        Pridėti automobilį
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{ mb: 1 }}
      >
        Pagrindiniai skelbimo duomenys
      </Typography>
      <Grid container spacing={1}>
        {mainTitle.map(({ title, menuItem }) => (
          <Grid item xs={12} md={4}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel>{title}</InputLabel>
              <Select
                value={value}
                label="Value"
                onChange={handleChange}
              >
                {menuItem.map((x) => (
                  <MenuItem value={x}>{x}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel>Kaina</InputLabel>
            <TextField id="outlined-size-normal" />
          </FormControl>
        </Grid>
        <PictureUpload />
      </Grid>
      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>Kontaktai</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Telefonas</InputLabel>
            <TextField id="outlined-size-normal" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>El.paštas</InputLabel>
            <TextField id="outlined-size-normal" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Miestas</InputLabel>
            <Select
              value={value}
              label="Miestas"
              onChange={handleChange}
            >
              {city.map(({ title }) => (
                <MenuItem value={title}>{title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <AddButton />
    </AddCarFormContainer>
  );
};
export default AddCar;
