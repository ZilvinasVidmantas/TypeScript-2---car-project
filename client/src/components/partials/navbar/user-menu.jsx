import React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const UserMenu = ({ handleCloseNavMenu }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Link to="/sign-in">
        <Button
          sx={{
            height: '50px',
            width: '100px',
            fontWeight: 'bold',
            mr: 1,
          }}
          variant="contained"
        >
          Sign in
        </Button>
      </Link>
      <Link to="/sign-up">
        <Button
          sx={{
            height: '50px',
            width: '100px',
            fontWeight: 'bold',
          }}
          variant="contained"
        >
          Sign up
        </Button>
      </Link>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseNavMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserMenu;
