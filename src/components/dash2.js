import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AdministrativeInformation from '../pages/administrativeInformation'
import AdministrativeInformationIasiSitta from '../pages/administrativeInformationIasiSitta'
import GeneralBuildingInformation from '../pages/generalBuildingInformation'
import GeneralBuildingInformationIasiSitta from '../pages/generalBuildingInformationIasiSitta'
import BuildingMaterialInventory from '../pages/BuildingMaterialInventory'
import BuildingMaterialInventoryIAsiSitta from '../pages/BuildingMaterialInventoryIasiSitta'
import BuildingEnvelope from '../pages/buildingEnvelope'
import BuildingEnvelopeIasiSitta from '../pages/buildingEnvelopeIasiSitta'
import TechnicalBuildingSystem from '../pages/technicalBuildingSystem'
import TechnicalBuildingSystemIasiSitta from '../pages/technicalBuildingSystemIasiSitta'
import Equipmentwithdescriptionanddesign from '../pages/buildingEnvelope'
import ConsumptiondataofenergyForecasting from '../pages/Consumptiondataofenergy(forecasting)'
import ConsumptiondataofenergyHistorical from '../pages/Consumptiondataofenergy(historical)'
import ConsumptiondataofenergyInvoices from '../pages/Consumptiondataofenergy(invoices)'
import Informationonoccupancy from '../pages/Informationonoccupancy'
import ComfortEwellbeing from '../pages/Comfort&well-being'
import BuildingPerformance from '../pages/documentationPerformance'
import MaintenanceReport from '../pages/maintenanceReport'
import BuildingPerformanceIASI from '../pages/documentationPerformanceIASI'
import CostInformationinvoices from '../pages/CostInformationHeatingAndHotWater'
import Savingsintheoperatingcostsrenovation from '../pages/savingsintheoperatingcosts(renovation)'
import DesignAndPlansOfTheBuilding from '../pages/DesignAndPlansOfTheBuilding'
import Documentation from '../pages/Documentation'
import DocumentationIasiSitta from '../pages/DocumentationIasiSitta'
import BIM from '../pages/BIM'

function TabPanel(props) {
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

TabPanel.propTypes = {
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

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const [valuesub, setValueSub] = useState(0);
    const [valueSubSub, setValueSubSub] = useState(0);
    const [valuesub2, setValueSub2] = useState(0);
    const [valueSubSub2, setValueSubSub2] = useState(0);
    const [valuesub3, setValueSub3] = useState(0);
    const [valueSubSub3, setValueSubSub3] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setValueSub(0);
        setValueSubSub(0);
        setValueSub2(0);
        setValueSubSub2(0);
        setValueSub3(0);
        setValueSubSub3(0);
    };

    const handleChange1 = (event, newValue) => {
        setValueSub(newValue);
        setValueSubSub(0);
    };

    const handleChange2 = (event, newValue) => {
        setValueSub2(newValue);
        setValueSubSub2(0);
    };

    const handleChange3 = (event, newValue) => {
        setValueSub3(newValue);
        setValueSubSub3(0);
    };

    const [userRole, setUserRole] = useState("");
    const [userDblStructure, setUserDblStructure] = useState("");

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setUserRole(sessionStorage.getItem('ROLE'));
        console.log(userRole)
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setUserDblStructure(sessionStorage.getItem('PILOT'));
        console.log(userDblStructure)
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    return (
        <Box sx={{ width: '100%' }}>
            {(userDblStructure === 'FVH' && userRole === 'Building Manager') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Building Element Information" {...a11yProps(0)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(1)} />
                                    <Tab label="Building Performance" {...a11yProps(2)} />
                                    <Tab label="Building Documentation BIM" {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventory />
                                </TabPanel>

                                <TabPanel value={valuesub} index={1}>
                                    <Equipmentwithdescriptionanddesign />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                        <Tab label="Information on occupancy" {...a11yProps(3)} />
                                        <Tab label="Comfort & well-being" {...a11yProps(4)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecasting />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistorical />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <Informationonoccupancy />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={4}>
                                    <ComfortEwellbeing />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={2}>
                                <BuildingPerformance />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={3}>
                                {/* <BuildingDocumentationBIM /> */}
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'FVH' && userRole === 'Landlord') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                    <Tab label="Building Element Information" {...a11yProps(2)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(3)} />
                                    <Tab label="Building Performance" {...a11yProps(4)} />
                                    <Tab label="Smart Readiness" {...a11yProps(5)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={2}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventory />
                                </TabPanel>

                                <TabPanel value={valuesub} index={1}>
                                    <Equipmentwithdescriptionanddesign />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={3}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                        <Tab label="Information on occupancy" {...a11yProps(3)} />
                                        <Tab label="Comfort & well-being" {...a11yProps(4)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecasting />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistorical />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <Informationonoccupancy />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={4}>
                                    <ComfortEwellbeing />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={4}>
                                <BuildingPerformance />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={5}>
                                {/* <SmartReadiness /> */}
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'FVH' && userRole === 'Owner-occupiers') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                    <Tab label="Building Element Information" {...a11yProps(2)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(3)} />
                                    <Tab label="Building Performance" {...a11yProps(4)} />
                                    <Tab label="Smart Readiness" {...a11yProps(5)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={2}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventory />
                                </TabPanel>

                                <TabPanel value={valuesub} index={1}>
                                    <Equipmentwithdescriptionanddesign />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={3}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                        <Tab label="Information on occupancy" {...a11yProps(3)} />
                                        <Tab label="Comfort & well-being" {...a11yProps(4)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecasting />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistorical />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <Informationonoccupancy />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={4}>
                                    <ComfortEwellbeing />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={4}>
                                <BuildingPerformance />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={5}>
                               {/*  <SmartReadiness /> */}
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'FVH' && userRole === 'policy makers') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'FVH' && userRole === 'Public authorities') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'IASI&SITTA' && userRole === 'Building_Manager') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Building Element Information" {...a11yProps(0)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(1)} />
                                    <Tab label="Building Performance" {...a11yProps(2)} />
                                    <Tab label="Building Documentation BIM" {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventory />
                                </TabPanel>

                                <TabPanel value={valuesub} index={1}>
                                    <Equipmentwithdescriptionanddesign />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                        <Tab label="Maintenance Report" {...a11yProps(3)} />
                                        <Tab label="Information on occupancy" {...a11yProps(4)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecasting />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistorical />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <MaintenanceReport />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={4}>
                                    <Informationonoccupancy />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={2}>
                                <BuildingPerformanceIASI />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TabPanel value={value} index={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Tabs value={valuesub3} onChange={handleChange3} aria-label="basic example" sx={{
                                '& .MuiTab-root': {
                                    flex: '1', margin: '0 10px', fontWeight: 'bold', fontSize: '2.5ch', textAlign: 'center',
                                    '&.Mui-selected': {
                                        color: '#41BFB9', // Colore del testo bianco
                                    },
                                }
                            }}>
                                <Tab label="Design and plans of the building" {...a11yProps(0)} />
                                <Tab label="Documentation" {...a11yProps(1)} />
                                <Tab label="BIM" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={valuesub3} index={0}>
                            <DesignAndPlansOfTheBuilding />
                        </TabPanel>
                        <TabPanel value={valuesub3} index={1}>
                            <DocumentationIasiSitta />
                        </TabPanel>
                        <TabPanel value={valuesub3} index={2}>
                            <BIM />
                        </TabPanel>
                    </TabPanel>
                </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'IASI&SITTA' && userRole === 'Landlord') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                    <Tab label="Building Element Information" {...a11yProps(2)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(3)} />
                                    <Tab label="Building Performance" {...a11yProps(4)} />
                                    <Tab label="Finance" {...a11yProps(5)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformationIasiSitta />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformationIasiSitta />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={2}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{
                                        '& .MuiTab-root': {
                                            flex: '1', margin: '0 10px', fontWeight: 'bold', textAlign: 'center', fontSize: '2.5ch', '&.Mui-selected': {
                                                color: '#41BFB9', // Colore del testo bianco
                                            },
                                        }
                                    }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Building envelope" {...a11yProps(1)} />
                                        <Tab label="Technical building system" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventoryIAsiSitta />
                                </TabPanel>
                                <TabPanel value={valuesub} index={1}>
                                    <BuildingEnvelopeIasiSitta />
                                </TabPanel>
                                <TabPanel value={valuesub} index={2}>
                                    <TechnicalBuildingSystemIasiSitta />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={3}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                        <Tab label="Maintenance Report" {...a11yProps(3)} />
                                        <Tab label="Information on occupancy" {...a11yProps(4)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecasting />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistorical />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <MaintenanceReport />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={4}>
                                    <Informationonoccupancy />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={4}>
                                <BuildingPerformanceIASI />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={5}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub3} onChange={handleChange3} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 5px' } }}>
                                        <Tab label="Cost Information (invoices)" {...a11yProps(0)} />
                                        <Tab label="Savings in the operating costs (renovation)" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub3} index={0}>
                                    <CostInformationinvoices />
                                </TabPanel>

                                <TabPanel value={valuesub3} index={1}>
                                    <Savingsintheoperatingcostsrenovation />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'IASI&SITTA' && userRole === 'Owner-occupier') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                    <Tab label="Building Element Information" {...a11yProps(2)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(3)} />
                                    <Tab label="Building Performance" {...a11yProps(4)} />
                                    <Tab label="Finance" {...a11yProps(5)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={2}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub} onChange={handleChange1} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Building Material Inventory" {...a11yProps(0)} />
                                        <Tab label="Equipment with description and design" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub} index={0}>
                                    <BuildingMaterialInventory />
                                </TabPanel>

                                <TabPanel value={valuesub} index={1}>
                                    <Equipmentwithdescriptionanddesign />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={3}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Consumption data of energy, water, gas, and other resources (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resource (historical)" {...a11yProps(2)} />
                                        <Tab label="Maintenance Report" {...a11yProps(3)} />
                                        <Tab label="Information on occupancy" {...a11yProps(4)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecasting />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistorical />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <MaintenanceReport />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={4}>
                                    <Informationonoccupancy />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={value} index={4}>
                                <BuildingPerformanceIASI />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={5}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub3} onChange={handleChange3} aria-label="basic example" sx={{ '& .MuiTab-root': { margin: '0 10px' } }}>
                                        <Tab label="Cost Information (invoices)" {...a11yProps(0)} />
                                        <Tab label="Savings in the operating costs (renovation)" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub3} index={0}>
                                    <CostInformationinvoices />
                                </TabPanel>

                                <TabPanel value={valuesub3} index={1}>
                                    <Savingsintheoperatingcostsrenovation />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'IASI&SITTA' && userRole === 'policy_Maker') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(userDblStructure === 'IASI&SITTA' && userRole === 'Public_Authority') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={0}>
                                <AdministrativeInformation />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={1}>
                                <GeneralBuildingInformation />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}

        </Box>
    );
}
