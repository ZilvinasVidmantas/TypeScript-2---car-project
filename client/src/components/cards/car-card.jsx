import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageFluid from '../images/image-fluid';

const StyledCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: theme.spacing(38),
  borderRadius: theme.spacing(2),
  color: theme.palette.common.black,
  margin: theme.spacing(1.25),
  transition: theme.transitions.easeMe,
  boxShadow: theme.shadows[26],
  ':hover': {
    boxShadow: theme.shadows[25],
    transform: 'scale(1.05)',
    transformOrigin: 'center',
  },
}));

const StyledCardContent = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  margin: '0',
  padding: '0',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const CarCard = ({ image, title, subtitle }) => {
  const theme = useTheme();
  return (
    <StyledCard>
      <Box sx={{
        position: 'relative',
      }}
      >
        <ImageFluid
          sx={{
            height: theme.spacing(28.75),
            borderTopLeftRadius: theme.spacing(1.875),
            borderTopRightRadius: theme.spacing(2),
          }}
          src={image}
        />
      </Box>
      <StyledCardContent>
        <Typography
          component="h3"
          variant="h5"
          sx={{
            textTransform: 'none',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <Typography component="h4" variant="subtitle1">
          {subtitle}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default CarCard;
