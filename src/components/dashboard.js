import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AdministrativeInformation from '../pages/administrativeInformation'
import GeneralBuildingInformation from '../pages/generalBuildingInformation'
import BuildingMaterialInventory from '../pages/BuildingMaterialInventory'
import BuildingEnvelope from '../pages/buildingEnvelope'
import TechnicalBuildingSystem from '../pages/technicalBuildingSystem'
import DocumentationPerformance from '../pages/documentationPerformance'
import Documentation from '../pages/Documentation'
import BIM from '../pages/BIM'
import DesignAndPlansOfTheBuilding from '../pages/DesignAndPlansOfTheBuilding'
import ConsumptiondataofenergyForecasting from '../pages/Consumptiondataofenergy(forecasting)'
import ConsumptiondataofenergyHistorical from '../pages/Consumptiondataofenergy(historical)'
import ConsumptiondataofenergyInvoices from '../pages/Consumptiondataofenergy(invoices)'
import Informationonoccupancy from '../pages/Informationonoccupancy'
import ComfortEwellbeing from '../pages/Comfort&well-being'
import EfficientAndClimateResilientBuildings from '../pages/EfficientAndClimateResilientBuildings'
import AdministrativeInformationIasiSitta from '../pages/administrativeInformationIasiSitta'
import GeneralBuildingInformationIasiSitta from '../pages/generalBuildingInformationIasiSitta'
import BuildingMaterialInventoryIAsiSitta from '../pages/BuildingMaterialInventoryIasiSitta'
import BuildingEnvelopeIasiSitta from '../pages/buildingEnvelopeIasiSitta'
import TechnicalBuildingSystemIasiSitta from '../pages/technicalBuildingSystemIasiSitta'
import ConsumptiondataofenergyForecastingIasiSitta from '../pages/Consumptiondataofenergy(forecasting)IasiSitta'
import ConsumptiondataofenergyHistoricalIasiSitta from '../pages/Consumptiondataofenergy(historical)IasiSitta'
//import ConsumptiondataofenergyInvoices from '../pages/Consumptiondataofenergy(invoices)'
import MaintenanceReport from '../pages/maintenanceReport'
import BuildingPerformanceIASI from '../pages/buildingPerformanceIASI'
import CostInformationinvoices from '../pages/CostInformationHeatingAndHotWater'
import DesignAndPlansOfTheBuildingIasiSitta from '../pages/DesignAndPlansOfTheBuildingIasiSitta'
import DocumentationIasiSitta from '../pages/DocumentationIasiSitta'
import CostInformationHotWater from '../pages/CostInformationHotWater'
import CostInformationHeating from '../pages/CostInformationHeating'


//import Prova from '../pages/prova'
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
    const [value, setValue] = useState(0);
    const [valuesub, setValueSub] = useState(0);
    const [valueSubSub, setValueSubSub] = useState(0);
    const [valuesub2, setValueSub2] = useState(0);
    const [valueSubSub2, setValueSubSub2] = useState(0);
    const [valuesub3, setValueSub3] = useState(0);
    const [valueSubSub3, setValueSubSub3] = useState(0);
    const [valuesub4, setValueSub4] = useState(0);
    const [valueSubSub4, setValueSubSub4] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setValueSub(0);
        setValueSubSub(0);
        setValueSub2(0);
        setValueSubSub2(0);
        setValueSub3(0);
        setValueSubSub3(0);
        setValueSub4(0);
        setValueSubSub4(0);
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

    const handleChange4 = (event, newValue) => {
        setValueSub4(newValue);
        setValueSubSub4(0);
    };

    const [userRole, setUserRole] = useState('');
    const [pilot, setPilot] = useState('')

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setUserRole(sessionStorage.getItem('ROLE'));
        //console.log('dash', userRole)
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    useEffect(() => {
        // Nel componente dove hai bisogno del ruolo
        setPilot(sessionStorage.getItem('PILOT'));
        //console.log('pilot', pilot)
    }, []); // Dipendenza vuota per eseguire useEffect solo una volta

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {(pilot === 'FVH') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    aria-label="basic tabs example"
                                    sx={{
                                        '& .MuiTab-root': {
                                            minHeight: '5vh', // Imposta l'altezza minima
                                            fontSize: '2.5ch',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            backgroundColor: 'rgba(5, 123, 190, 0.2)', // Sfondo nero
                                            color: '#057BBE', // Colore del testo bianco
                                            '&.Mui-selected': {
                                                backgroundColor: '#057BBE', // Sfondo blu quando selezionato
                                                color: 'white', // Colore del testo bianco
                                            },
                                        },
                                    }}
                                >
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                    <Tab label="Building Element Information" {...a11yProps(2)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(3)} />
                                    <Tab label="Building Performance" {...a11yProps(4)} />
                                    <Tab label="Building Documentation" {...a11yProps(5)} />
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
                                    <BuildingMaterialInventory />
                                </TabPanel>
                                <TabPanel value={valuesub} index={1}>
                                    <BuildingEnvelope />
                                </TabPanel>
                                <TabPanel value={valuesub} index={2}>
                                    <TechnicalBuildingSystem />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example"
                                        sx={{
                                            '& .MuiTab-root': {
                                                flex: '1', margin: '0 10px', fontWeight: 'bold', fontSize: '2.5ch', textAlign: 'center',
                                                '&.Mui-selected': {
                                                    color: '#41BFB9', // Colore del testo bianco
                                                },
                                            }
                                        }}>
                                        <Tab label="Consumption data of energy (forecasting)" {...a11yProps(0)} />
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
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub4} onChange={handleChange4} aria-label="basic example" sx={{
                                        '& .MuiTab-root': {
                                            flex: '1', margin: '0 10px', fontWeight: 'bold', fontSize: '2.5ch', textAlign: 'center',
                                            '&.Mui-selected': {
                                                color: '#41BFB9', // Colore del testo bianco
                                            },
                                        }
                                    }}>
                                        <Tab label="Documentation" {...a11yProps(0)} />
                                        <Tab label="Efficient and climate resilient buildings" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub4} index={0}>
                                    <DocumentationPerformance />
                                </TabPanel>
                                <TabPanel value={valuesub4} index={1}>
                                    <EfficientAndClimateResilientBuildings />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={5}>
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
                                    <Documentation />
                                </TabPanel>
                                <TabPanel value={valuesub3} index={2}>
                                    <BIM />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
            {(pilot === 'IASI&SITTA') && (
                <>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    aria-label="basic tabs example"
                                    sx={{
                                        '& .MuiTab-root': {
                                            minHeight: '5vh', // Imposta l'altezza minima
                                            fontSize: '2.5ch',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            backgroundColor: 'rgba(5, 123, 190, 0.2)', // Sfondo nero
                                            color: '#057BBE', // Colore del testo bianco
                                            '&.Mui-selected': {
                                                backgroundColor: '#057BBE', // Sfondo blu quando selezionato
                                                color: 'white', // Colore del testo bianco
                                            },
                                        },
                                    }}
                                >
                                    <Tab label="Administrative Information" {...a11yProps(0)} />
                                    <Tab label="General Building Information" {...a11yProps(1)} />
                                    <Tab label="Building Element Information" {...a11yProps(2)} />
                                    <Tab label="Building Operation and Use" {...a11yProps(3)} />
                                    <Tab label="Building Performance" {...a11yProps(4)} />
                                    <Tab label="Finance" {...a11yProps(5)} />
                                    <Tab label="Building Documentation" {...a11yProps(6)} />
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
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub2} onChange={handleChange2} aria-label="basic example"
                                        sx={{
                                            '& .MuiTab-root': {
                                                flex: '1', margin: '0 10px', fontWeight: 'bold', fontSize: '2.5ch', textAlign: 'center',
                                                '&.Mui-selected': {
                                                    color: '#41BFB9', // Colore del testo bianco
                                                },
                                            }
                                        }}>
                                        <Tab label="Consumption data of energy (forecasting)" {...a11yProps(0)} />
                                        <Tab label="Consumption data of energy, water, gas, and other resources (invoices)" {...a11yProps(1)} />
                                        <Tab label="Consumption data of energy" {...a11yProps(2)} />
                                        <Tab label="Maintenance report" {...a11yProps(3)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub2} index={0}>
                                    <ConsumptiondataofenergyForecastingIasiSitta />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={1}>
                                    <ConsumptiondataofenergyInvoices />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={2}>
                                    <ConsumptiondataofenergyHistoricalIasiSitta />
                                </TabPanel>
                                <TabPanel value={valuesub2} index={3}>
                                    <MaintenanceReport />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={4}>
                                <BuildingPerformanceIASI />
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={5}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub3} onChange={handleChange3} aria-label="basic example"
                                        sx={{
                                            '& .MuiTab-root': {
                                                flex: '1', margin: '0 10px', fontWeight: 'bold', fontSize: '2.5ch', textAlign: 'center',
                                                '&.Mui-selected': {
                                                    color: '#41BFB9', // Colore del testo bianco
                                                },
                                            }
                                        }}>
                                        <Tab label="Cost Information (invoices thermal energy for heating and hot water)" {...a11yProps(0)} />
                                        <Tab label="Cost Information (invoices thermal energy for hot water)" {...a11yProps(1)} />
                                        <Tab label="Cost Information (invoices thermal energy for heating)" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub3} index={0}>
                                    <CostInformationinvoices />
                                </TabPanel>
                                <TabPanel value={valuesub3} index={1}>
                                    <CostInformationHotWater />
                                </TabPanel>
                                <TabPanel value={valuesub3} index={2}>
                                    <CostInformationHeating />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TabPanel value={value} index={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Tabs value={valuesub4} onChange={handleChange4} aria-label="basic example" sx={{
                                        '& .MuiTab-root': {
                                            flex: '1', margin: '0 10px', fontWeight: 'bold', fontSize: '2.5ch', textAlign: 'center',
                                            '&.Mui-selected': {
                                                color: '#41BFB9', // Colore del testo bianco
                                            },
                                        }
                                    }}>
                                        <Tab label="Design and plans of the building" {...a11yProps(0)} />
                                        <Tab label="Documentation" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valuesub4} index={0}>
                                    <DesignAndPlansOfTheBuildingIasiSitta />
                                </TabPanel>
                                <TabPanel value={valuesub4} index={1}>
                                    <DocumentationIasiSitta />
                                </TabPanel>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
}