import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
} from '@mui/material';

const ProfilePageUserInfo = () => (
  <Box>
    <Box sx={{ py: '40px' }}>
      <Typography variant="h6">Vartotojo informacija</Typography>
    </Box>
    <Box sx={{
      display: 'flex',
      gap: 3,
      flexDirection: 'column',
    }}
    >
      <Grid container rowSpacing={4} columnSpacing={6} sx={{ px: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            id="outlined-size-small"
            label="El. paštas"
            defaultValue="pastas@rastas.lt"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField disabled fullWidth id="outlined-size-small" size="small" defaultValue="Paštetas R." label="Vartotojo vardas" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth id="outlined-size-small" size="small" defaultValue="Paštetas" label="Vardas" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth id="outlined-size-small" size="small" defaultValue="Raštauskas" label="Pavardė" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth id="outlined-size-small" size="small" defaultValue="Vilnius" label="Miestas" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth id="outlined-size-small" size="small" defaultValue="+370 646 58977" label="Telefono numeris" />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" sx={{ textTransform: 'none' }}>
          Išsaugoti
        </Button>
      </Box>
    </Box>
  </Box>
);

export default ProfilePageUserInfo;
