import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const DrawerList = (
  <Box>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Pagrindinis" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CarRepairIcon />
      </ListItemIcon>
      <ListItemText primary="Mano automobiliai" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <Link to="/add-car">
        <ListItemText primary="Pridėti automobilį" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Profilis" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Nustatymai" />
    </ListItem>
  </Box>
);

export default DrawerList;
