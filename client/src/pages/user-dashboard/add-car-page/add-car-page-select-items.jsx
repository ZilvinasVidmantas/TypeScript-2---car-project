import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuidv4 } from 'uuid';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const AddCarPageSelectItems = ({
  title, options, onChange, value, name,
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
        {options.map(({ id, label }) => (
          <MenuItem key={uuidv4()} value={id}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

export default AddCarPageSelectItems;
