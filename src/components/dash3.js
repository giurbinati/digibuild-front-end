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

function Dashboard() {
    const [value, setValue] = useState(0);
    const [valuesub, setValueSub] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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

    // Verifica se hai il ruolo e la struttura prima di renderizzare il componente
    if (userDblStructure !== 'FVH' || userRole !== 'Building Manager') {
        return null;
    }

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Grid style={{ padding: "8px", alignItems: "center" }} container spacing={2} justifyContent="center">
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Building Element Information" {...a11yProps(0)} />
                                <Tab label="Building Operation and Use" {...a11yProps(1)} />
                                <Tab label="Building Performance" {...a11yProps(2)} />
                                <Tab label="Building Documentation BIM" {...a11yProps(3)} />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example">
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CustomTabPanel value={value} index={0}>
                                <BuildingElementInformation />
                            </CustomTabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CustomTabPanel value={value} index={1}>
                                <BuildingOperationAndUse />
                            </CustomTabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CustomTabPanel value={value} index={2}>
                                <BuildingPerformance />
                            </CustomTabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CustomTabPanel value={value} index={3}>
                                <BuildingDocumentationBIM />
                            </CustomTabPanel>
                        </Grid>
                        {/* Aggiungi altri CustomTabPanel per altri componenti sopra qui */}
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={valuesub} index={0}>
                                <BuildingMaterialInventory />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={valuesub} index={1}>
                                <Equipmentwithdescriptionanddesign />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;