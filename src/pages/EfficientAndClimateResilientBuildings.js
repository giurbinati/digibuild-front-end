import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

    const config = {
        host: process.env.REACT_APP_API_HOST,
        timer: parseInt(process.env.REACT_APP_TIMER)
    };

    const API_URL_DATE_EfficientAndClimate = config.host + "/efficientAndClimateResilientBuildings";

    const [valuesClimateExposureData, setValuesClimateExposureData] = useState({
        "Heat Wave Score": "",
        "Cold Wave Score": "",
        "Storm Score": "",
        "Flood Score": "",
        "Drought Score": "",
        "Heavy Precipitation Score": "",
    });

    const [valuesNonWeightedClimateResilience, setValuesNonWeightedClimateResilience] = useState({
        "Flood": "",
        "Storm": "",
        "Drought": "",
        "Cold Wave": "",
        "Heat Wave": "",
        "Heavy Precipitation": "",
    });

    const [valuesOverallClimateResilience, setValuesOverallClimateResilience] = useState({
        "Overall Score": "",
    });

    const [valuesClimateResilience, setValuesClimateResilience] = useState({
        "R (Resilience Practices)": "",
        "BE (Building Envelope)": "",
        "ES (Energy Systems)": "",
        "SP (Sustainability Practices)": "",
        "SS (Site Sustainability)": "",
        "WS (Water Systems)": "",
        "LCA (Lifecycle Assessments)": "",
    });

    async function fetchEfficientAndClimateResilientBuildings() {
        try {
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");
            //console.log(token)

            // Effettua la richiesta con il token nei headers
            const response = await fetch(API_URL_DATE_EfficientAndClimate, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Aggiungi il token nel campo Authorization
                },
            });

            if (response.status === 401) {
                logout();
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response)

            const data = await response.json();
            console.log(data)
            // Aggiorna i dati degli stati con i valori corretti
            setValuesClimateExposureData({
                "Heat Wave Score": data[2].heatWave_score,
                "Cold Wave Score": data[2].coldWave_score,
                "Storm Score": data[2].storm_score,
                "Flood Score": data[2].flood_score,
                "Drought Score": data[2].drought_score,
                "Heavy Precipitation Score": data[2].hPrecipitation_score,
            });

            setValuesNonWeightedClimateResilience({
                "Flood": (data[1].results.non_weighted.flood).toFixed(2),
                "Storm": (data[1].results.non_weighted.storm).toFixed(2),
                "Drought": (data[1].results.non_weighted.drought).toFixed(2),
                "Cold Wave": (data[1].results.non_weighted.coldWave).toFixed(2),
                "Heat Wave": (data[1].results.non_weighted.heatWave).toFixed(2),
                "Heavy Precipitation": (data[1].results.non_weighted.h_precipitation).toFixed(2),
            });

            setValuesOverallClimateResilience({
                "Overall Score": (data[1].results.overall_score * 100).toFixed(2), // Converti in una scala da 5
            });

            setValuesClimateResilience({
                "R (Resilience Practices)": (data[1].results.components_score.R * 100).toFixed(2),
                "BE (Building Envelope)": (data[1].results.components_score.BE * 100).toFixed(2),
                "ES (Energy Systems)": (data[1].results.components_score.ES * 100).toFixed(2),
                "SP (Sustainability Practices)": (data[1].results.components_score.SP * 100).toFixed(2),
                "SS (Site Sustainability)": (data[1].results.components_score.SS * 100).toFixed(2),
                "WS (Water Systems)": (data[1].results.components_score.WS * 100).toFixed(2),
                "LCA (Lifecycle Assessments)": (data[1].results.components_score.LCA * 100).toFixed(2),
            });

        } catch (error) {
            console.error('Fetch error:', error);
            throw error; // Rilancia l'errore per la gestione nel componente
        }
    }

    const logout = () => {
        console.log('logout')
        sessionStorage.clear();
        navigate('/login')
    }

    useEffect(() => {
        fetchEfficientAndClimateResilientBuildings();
    }, []); // Dipendenze vuote per eseguire l'effetto solo al montaggio


    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            width: '20vh',
            p: 1,
        },
    }));

    const tableClimateExposureData = () => {
        return (
            <HtmlTooltip
                title={
                    <Typography sx={{ fontSize: '4ch' }}>
                        The scores reflect the building’s actual exposure to these specific hazards on a scale from 0 to 1
                        [0 being no exposure (good for the building) and 1 indicating very high exposure (bad for the building)].
                    </Typography>
                }
                arrow
                enterTouchDelay={0}
                leaveTouchDelay={3000}
            >
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                            <TableRow>
                                <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(valuesClimateExposureData).map((row) => (
                                <TableRow
                                    key={row}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                        {row}
                                    </TableCell>
                                    <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                        {valuesClimateExposureData[row]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </HtmlTooltip>
        );
    };

    const tableNonWeightedClimateResilience = () => {
        return (
            <HtmlTooltip
                title={
                    <Typography sx={{ fontSize: '4ch' }}>
                        These percentages indicate the building's resilience against risks such as flooding, storms, etc. The higher the better.
                    </Typography>
                }
                arrow
                enterTouchDelay={0}
                leaveTouchDelay={3000}
            >
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                            <TableRow>
                                <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(valuesNonWeightedClimateResilience).map((row) => (
                                <TableRow
                                    key={row}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                        {row}
                                    </TableCell>
                                    <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                        {valuesNonWeightedClimateResilience[row]}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </HtmlTooltip>
        );
    };

    const tableOverallClimateResilience = () => {
        return (
            <Tooltip>
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                            <TableRow>
                                <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(valuesOverallClimateResilience).map((row) => (
                                <TableRow
                                    key={row}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                        {row}
                                    </TableCell>
                                    <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                        {valuesOverallClimateResilience[row]}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* </HtmlTooltip> */}
            </Tooltip>
        );
    };

    const tableClimateResilience = () => {
        return (
            <Tooltip>
                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                            <TableRow>
                                <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(valuesClimateResilience).map((row) => (
                                <TableRow
                                    key={row}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                        {row}
                                    </TableCell>
                                    <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                        {valuesClimateResilience[row]}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* </HtmlTooltip> */}
            </Tooltip>
        );
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                minHeight: '78vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2vh'
            }}
        >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    {/* Grid item per il Titolo */}
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#41BFB9',
                                    fontFamily: 'Poppins, Roboto',
                                    fontWeight: 'bold',
                                    marginBottom: '1vh'
                                }}
                            >
                                Climate Exposure Analysis
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                backgroundColor: 'rgba(147, 208, 167, 0.4)',
                                padding: '2%',
                                width: '900px',
                                maxWidth: '1200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {tableClimateExposureData()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#41BFB9',
                                    fontFamily: 'Poppins, Roboto',
                                    fontWeight: 'bold',
                                    marginBottom: '1vh'
                                }}
                            >
                                Non-Weighted Climate Resilience Scores Against Specific Hazards
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                backgroundColor: 'rgba(147, 208, 167, 0.4)',
                                padding: '2%',
                                width: '900px',
                                maxWidth: '1200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {tableNonWeightedClimateResilience()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#41BFB9',
                                    fontFamily: 'Poppins, Roboto',
                                    fontWeight: 'bold',
                                    marginBottom: '1vh'
                                }}
                            >
                                Overall Climate Resilience Score
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                backgroundColor: 'rgba(147, 208, 167, 0.4)',
                                padding: '2%',
                                width: '900px',
                                maxWidth: '1200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {tableOverallClimateResilience()}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#41BFB9',
                                    fontFamily: 'Poppins, Roboto',
                                    fontWeight: 'bold',
                                    marginBottom: '1vh'
                                }}
                            >
                                Climate Resilience Score by Domain
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                backgroundColor: 'rgba(147, 208, 167, 0.4)',
                                padding: '2%',
                                width: '900px',
                                maxWidth: '1200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {tableClimateResilience()}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
}
