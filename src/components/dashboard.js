import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Home from '../pages/home';
import Home2 from '../pages/home2'
import AuthService from '../services/auth';
import AdministrativeInformation from '../pages/administrativeInformation'
import GeneralBuildingInformation from '../pages/generalBuildingInformation'
import BuildingElementInformation from '../pages/buildingElementInformation'
import BuildingMaterialInventory from '../pages/BuildingMaterialInventory'
import Equipmentwithdescriptionanddesign from '../pages/Equipmentwithdescriptionanddesign'
import BuildingOperationAndUse from '../pages/buildingOperationAndUse'
import BuildingPerformance from '../pages/buildingPerformance'
import SmartReadiness from '../pages/smartReadiness'
import BuildingDocumentationBIM from '../pages/buildingDocumentationBIM'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    //console.log(props)
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            //hidden={value !== index}
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
    const [value, setValue] = useState(1);
    const [valuesub, setValueSub] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        /* if(value === 2 || value === 3) {
            setValueSub(1);
        } */
    };

    const handleChange1 = (event, newValue) => {
        setValueSub(newValue);
    };

    const [userRole, setUserRole] = useState("");
    const [userDblStructure, setUserDblStructure] = useState("");

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setUserRole(AuthService.getRole());
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    useEffect(() => {
        // Nel componente dove hai bisogno della struttura
        setUserDblStructure(AuthService.getDblStructure());
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta


    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Grid style={{ padding: "8px", alignItems: "center" }} container spacing={2} justifyContent="center">
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {(userDblStructure === 'FVH' && userRole === 'Building Manager') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Building Element Information" {...a11yProps(2)} />
                            <Tab label="Building Operation and Use" {...a11yProps(3)} />
                            <Tab label="Building Performance" {...a11yProps(4)} />
                            <Tab label="Building Documentation BIM" {...a11yProps(6)} />
                        </Tabs>
                    )}
                    {(userDblStructure === 'FVH' && userRole === 'Landlords') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                            <Tab label="Building Element Information" {...a11yProps(2)} />
                            <Tab label="Building Operation and Use" {...a11yProps(3)} />
                            <Tab label="Building Performance" {...a11yProps(4)} />
                            <Tab label="Smart Readiness" {...a11yProps(5)} />
                        </Tabs>
                    )}
                    {(userDblStructure === 'FVH' && userRole === 'Owner-occupiers') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                            <Tab label="Building Element Information" {...a11yProps(2)} />
                            <Tab label="Building Operation and Use" {...a11yProps(3)} />
                            <Tab label="Building Performance" {...a11yProps(4)} />
                            <Tab label="Smart Readiness" {...a11yProps(5)} />
                        </Tabs>
                    )}
                    {(userDblStructure === 'FVH' && userRole === 'policy makers') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                        </Tabs>
                    )}
                    {(userDblStructure === 'FVH' && userRole === 'Public authorities') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                        </Tabs>
                    )}
                    {(userDblStructure === 'IASI&SITTA' && userRole === 'Building Manager') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Building Element Information" {...a11yProps(0)} />
                            <Tab label="Building Operation and Use" {...a11yProps(1)} />
                            <Tab label="Building Performance" {...a11yProps(2)} />
                            <Tab label="Building Documentation BIM" {...a11yProps(3)} />
                        </Tabs>
                    )}
                    {(userDblStructure === 'IASI&SITTA' && userRole === 'Landlords') && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                            <Tab label="Building Element Information" {...a11yProps(2)} />
                            <Tab label="Building Operation and Use" {...a11yProps(3)} />
                            <Tab label="Building Performance" {...a11yProps(4)} />
                            <Tab label="Finance" {...a11yProps(5)} />
                        </Tabs>
                    )}
                    {userDblStructure === 'IASI&SITTA' && userRole === 'Owner-occupiers' && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                            <Tab label="Building Element Information" {...a11yProps(2)} />
                            <Tab label="Building Operation and Use" {...a11yProps(3)} />
                            <Tab label="Building Performance" {...a11yProps(4)} />
                            <Tab label="Finance" {...a11yProps(5)} />
                        </Tabs>
                    )}
                    {userDblStructure === 'IASI&SITTA' && userRole === 'policy makers' && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                        </Tabs>
                    )}
                    {userDblStructure === 'IASI&SITTA' && userRole === 'Public authorities' && (
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Administrative Information" {...a11yProps(0)} />
                            <Tab label="General Building Information" {...a11yProps(1)} />
                        </Tabs>
                    )}
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={2}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            {/* sub dashboard historical data */}
                            <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example">
                                <Tab label="Building Material Inventory" {...a11yProps(7)} />
                                <Tab label="Equipment with description and design" {...a11yProps(8)} />
                            </Tabs>
                        </Box>
                    </TabPanel>
                    <CustomTabPanel value={value} index={0}>
                        <AdministrativeInformation />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <GeneralBuildingInformation />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        {/* <BuildingElementInformation /> */}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        {/*  <BuildingOperationAndUse /> */}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        {/* <BuildingPerformance /> */}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>
                        {/* <SmartReadiness /> */}
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={6}>
                        {/*  <BuildingDocumentationBIM /> */}
                    </CustomTabPanel>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}></Grid>
                <TabPanel value={valuesub} index={7}>
                    <BuildingMaterialInventory />
                </TabPanel>
                <TabPanel value={valuesub} index={8}>
                    <Equipmentwithdescriptionanddesign />
                </TabPanel>
                <Grid />
            </Grid>
        </Box>

    );
}