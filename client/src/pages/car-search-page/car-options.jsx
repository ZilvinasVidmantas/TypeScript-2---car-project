import React from 'react';
import {
  Divider,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const CarOptions = ({ view, onChange }) => (
  <Paper elevation={4} sx={{ p: 2, mb: 2 }}>
    <Typography component="h2" variant="h4">
      Pasirinkimai
    </Typography>
    <Divider sx={{ my: 1 }} />
    <Typography component="h2" variant="h5">
      Išdėstymas
    </Typography>
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={onChange}
      size="small"
      sx={{ my: 1 }}
    >
      <ToggleButton value="table" aria-label="table">
        <ViewListIcon />
        <Typography
          variant="subtitle2"
          component="span"
          sx={{ textTransform: 'none' }}
        >
          Lentelė
        </Typography>
      </ToggleButton>
      <ToggleButton value="card" aria-label="card">
        <ViewModuleIcon />
        <Typography
          variant="subtitle2"
          component="span"
          sx={{ textTransform: 'none' }}
        >
          Kortelės
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  </Paper>
);

export default CarOptions;
