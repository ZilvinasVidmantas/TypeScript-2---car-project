import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import ApiService from '../../../services/api-service';

const ProfilePageUserInfo = () => {
  const [user, setUser] = useState(null);
  // const { id } = useParams();
  const id = 16;

  const userFieldsData = [
    { name: 'El. paštas', value: user?.email },
    { name: 'Vartotojo vardas', value: `${user?.name} ${user?.surname[0]}.` },
    { name: 'Vardas', value: user?.name },
    { name: 'Pavardė', value: user?.surname },
    { name: 'Miestas', value: user?.city },
    { name: 'Telefono numeris', value: user?.mobile },
  ];

  useEffect(() => {
    (async () => {
      const fetchedUser = await ApiService.getUser(id);
      setUser(fetchedUser);
    })();
  }, [id]);

  return (
    <Box>
      <Box sx={{ py: 5 }}>
        <Typography variant="h6">Vartotojo informacija</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        gap: 3,
        flexDirection: 'column',
      }}
      >
        <Grid container rowSpacing={4} columnSpacing={6} sx={{ py: 1 }}>
          {userFieldsData.map(({ name, value }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                disabled={name === 'El. paštas' || name === 'Vartotojo vardas'}
                fullWidth
                id="outlined-size-small"
                label={name}
                value={value}
                // onChange={(e) => handleFieldChange(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ pb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" sx={{ textTransform: 'none' }}>
            Išsaugoti
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePageUserInfo;
