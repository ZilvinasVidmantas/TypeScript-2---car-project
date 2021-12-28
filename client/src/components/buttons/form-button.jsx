import React from 'react';
import {
  Button,
} from '@mui/material';

const formButton = ({ title }) => (
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    sx={{ height: 56 }}
  >
    {title}
  </Button>
);

export default formButton;
