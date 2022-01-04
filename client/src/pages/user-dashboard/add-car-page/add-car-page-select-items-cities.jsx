import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const AddCarPageSelectItemsCities = ({
  title, menuItemValue, onChange, value, name,
}) => (
  <Grid item xs={12} md={4}>
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        name={name}
        label={title}
        value={value ?? ''}
        onChange={(event) => onChange(event, name)}
      >
        {menuItemValue.map((menuItem) => (
          <MenuItem key={uuidv4()} value={menuItem}>{menuItem}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

export default AddCarPageSelectItemsCities;
