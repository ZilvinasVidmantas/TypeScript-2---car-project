import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import InputLabel from '@mui/material/InputLabel';
import AddButton from './add-car-page-button';
import AddCarFormContainer from './add-car-page-container';
import PictureUpload from './add-car-page-picture-upload';
import AddCarPageSelectItems from './add-car-page-select-items';
import AddCarPageSelectItemsCities from './add-car-page-select-items-cities';

const AddCar = () => {
  const [selectedValue, setSelectedValue] = React.useState({
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    transmission: '',
    engingeVolume: '',
    city: '',
  });

  const data = [
    { name: 'brand', title: 'Markė', menuItem: ['Audi', 'BMW', 'Volvo'] },
    { name: 'model', title: 'Modelis', menuItem: ['100', 'X5', 'XC90'] },
    { name: 'year', title: 'Metai', menuItem: ['2000', '2001'] },
    { name: 'fuelType', title: 'Kuro Tipas', menuItem: ['Dyzelis', 'Dujos', 'Benzinas'] },
    { name: 'transmission', title: 'Pavarų dėžė', menuItem: ['Automatinė', 'Mechaninė'] },
    { name: 'engingeVolume', title: 'Variklio tūris', menuItem: ['1.6', '2.0', '2.1'] },
  ];

  const city = [
    { name: 'city', title: 'Miestas', menuItem: ['Vilnius', 'Kaunas', 'Šiauliai', 'Klaipėda'] },
  ];

  const handleChange = (event, name) => {
    setSelectedValue({
      ...selectedValue,
      [name]: event.target.value,
    });
  };
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
        {data.map(({ title, menuItem, name }) => (
          <AddCarPageSelectItems
            name={name}
            key={uuidv4()}
            value={selectedValue[name]}
            title={title}
            menuItemValue={menuItem}
            onChange={handleChange}
          />
        ))}
        <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel>Kaina</InputLabel>
            <TextField id="outlined-size-normal" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <PictureUpload />
        </Grid>
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
            {city.map(({ title, menuItem, name }) => (
              <AddCarPageSelectItemsCities
                name={name}
                key={uuidv4()}
                value={selectedValue[name]}
                title={title}
                menuItemValue={menuItem}
                onChange={handleChange}
              />
            ))}
          </FormControl>
        </Grid>
      </Grid>
      <AddButton />
    </AddCarFormContainer>
  );
};
export default AddCar;
