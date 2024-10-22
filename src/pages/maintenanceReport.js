import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function MaintenanceReport() {
    const [valuesDubetPyramid, setValuesDubetPyramid] = useState({
        'KPI1': "34",
        'KPI2': "23",
        'KPI3': "50",
    });

    const [valuesRoznovanu, setValuesRoznovanu] = useState({
        'KPI_1': "34",
        'KPI_2': "23",
        'KPI_3': "50",
    });

    const [building, setBuilding] = useState('Roznovanu Palace');

    const handleRadioChange = (event) => {
        setBuilding(event.target.value);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);

    const handlePopoverOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setHoveredRow(index);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredRow(null);
    };



    const tableDubetPyramid = () => {
        return (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesDubetPyramid).map((row, index) => {
                            let message;
                            if (index === 0) {
                                message = "1";
                            } else if (index === 1) {
                                message = "2.";
                            } else if (index === 2) {
                                message = "3.";
                            } else {
                                message = ""; // Gestisci tutti gli altri casi
                            }

                            return (
                                <Tooltip
                                    key={row}
                                    title={<Typography sx={{ p: 1 }}>{message}</Typography>}
                                    arrow
                                    enterTouchDelay={0}
                                    leaveTouchDelay={3000}
                                >
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                            {row}
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: '2.5ch' }}>{valuesDubetPyramid[row]}</TableCell>
                                    </TableRow>
                                </Tooltip>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    const tableRoznovanu = () => {
        return (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(valuesRoznovanu).map((row, index) => {
                            let message;
                            if (index === 0) {
                                message = "1";
                            } else if (index === 1) {
                                message = "2.";
                            } else if (index === 2) {
                                message = "3.";
                            } else {
                                message = ""; // Gestisci tutti gli altri casi
                            }

                            return (
                                <Tooltip
                                    key={row}
                                    title={<Typography sx={{ p: 1 }}>{message}</Typography>}
                                    arrow
                                    enterTouchDelay={0}
                                    leaveTouchDelay={3000}
                                >
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                            {row}
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: '2.5ch' }}>{valuesRoznovanu[row]}</TableCell>
                                    </TableRow>
                                </Tooltip>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
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
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <FormControl>
                        <FormLabel sx={{ fontSize: '2.5ch' }} id="demo-radio-buttons-group-label">Building</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={building}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="Roznovanu Palace" control={<Radio />} label="Roznovanu Palace" />
                            <FormControlLabel value="Dubet Pyramid" control={<Radio />} label="Dubet Pyramid" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Container>
            {building === "Dubet Pyramid" && (
                <>
                    <Container maxWidth="xl" sx={{ padding: 0 }}>
                        <Grid container direction="column" alignItems="center">
                            {/* Grid item per il Paper contenente la Tabella e il Bottone */}
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
                                    {tableDubetPyramid()}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )}
            {building === "Roznovanu Palace" && (
                <>
                    <Container maxWidth="xl" sx={{ padding: 0 }}>
                        <Grid container direction="column" alignItems="center">
                            {/* Grid item per il Paper contenente la Tabella e il Bottone */}
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
                                    {tableRoznovanu()}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )}
        </Box >
    );
}