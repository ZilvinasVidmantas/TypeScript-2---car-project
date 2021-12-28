import React from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/containers/form-container';
import FormButton from '../../components/buttons/form-button';

const title = ['Sign Up'];

const SignUp = () => (
  <FormContainer title={title}>
    <Box component="form" noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item sx={{ mb: 2 }} xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <FormButton title={title} />
      <Grid container justify="flex-end">
        <Grid item sx={{ mt: 1 }}>
          <Link to="/sign-in">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  </FormContainer>
);
export default SignUp;
