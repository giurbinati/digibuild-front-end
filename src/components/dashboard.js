import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Home from '../pages/home';
import Home2 from '../pages/home2'
import AuthService from '../services/auth';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 useEffect(() => {
    // Nel componente dove hai bisogno del ruolo
    const userRole = AuthService.getRole();
    console.log(userRole);
  }, []); // La dipendenza vuota fa sì che useEffect venga eseguito solo una volta


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Administrative Information" {...a11yProps(0)} />
          <Tab label="General Building Information" {...a11yProps(1)} />
          <Tab label="Building Element Information" {...a11yProps(2)} />
          <Tab label="Building Operation and Use" {...a11yProps(3)} />
          <Tab label="Building Performance" {...a11yProps(4)} />
          <Tab label="Smart Readiness" {...a11yProps(5)} />
          <Tab label="Building Documentation BIM" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* <Home/> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Home2/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}