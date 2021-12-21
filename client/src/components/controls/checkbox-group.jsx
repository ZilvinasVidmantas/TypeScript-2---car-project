import React from 'react';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const CheckboxGroup = ({
  label, checked, name, value, onChange,
}) => (
  <FormGroup>
    <FormControlLabel
      control={(
        <Checkbox
          checked={checked}
          onChange={onChange}
          name={name}
          value={value}
        />
   )}
      label={label}
    />
  </FormGroup>
);

export default CheckboxGroup;
