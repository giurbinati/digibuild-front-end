import React, { useState } from 'react';
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
import Tooltip from '@mui/material/Tooltip';

export default function Home({ setList, list }) {
    const [values, setValues] = useState({
        "Max number of occupants": "2500",
        "Average occupancy rate": "33%",
        "Utilization rate": "48%",
    });
    

    const table = () => {
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
                        {Object.keys(values).map((row, index) => {
                            let message;
                            if (index === 0) {
                                message = "This parameter represents the max number of people that the building can include.";
                            } else if (index === 1) {
                                message = "It measures the average number of occupants in the building over a given period of time.";
                            } else if (index === 2) {
                                message = "This parameter is the percentage of space that is actually used in the building.";
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
                                        <TableCell align="right" style={{ fontSize: '2.5ch' }}>{values[row]}</TableCell>
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
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                <Grid container direction="column" alignItems="center">
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
                            {table()}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
