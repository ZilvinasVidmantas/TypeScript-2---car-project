import React from 'react';
import {
  Button,
} from '@mui/material';

const formButton = ({ children, ...rest }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    sx={{ height: 56, mb: 1 }}
    {...rest}
  >
    {children}
  </Button>
);

export default formButton;
