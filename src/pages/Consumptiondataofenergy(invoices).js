import React, { useEffect, useState } from 'react';
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

import AuthService from '../services/auth';
import UploadButton from '../components/uploadButton'
import DownloadButton from '../components/downloadButton'

export default function Home({ setList, list }) {
    const [values, setValues] = useState({
        'Measured heating consumption': "kWh/year",
        'Measured electricity consumption ': "kWh/year",
        'Measured hot water consumption ': "Litres/year",
    });
    function getRandom(max) {
        return (Math.random() * max);
    }

    /* useEffect(() => {
        setTimeout(() => {
            setValues({
                "Unique building identifier": getRandom(100),
                'Address': getRandom(100),
                'Building owner': getRandom(100),
                'DBL prepared by': getRandom(100),
                'When was the DBL last edited': getRandom(100),
                'Ownership type': getRandom(100),
                'Tenancy agreement': getRandom(100),
                'Utilities contracts': getRandom(100),
                'Maintenance service contact': getRandom(100),
                'Insurance documents': getRandom(100),
                'Maintenance log': getRandom(100),
                'Licenses': getRandom(100),
                'Sbuilding type': getRandom(100),
                'Building name': getRandom(100),
                'Ownership': getRandom(100)
            });
        }, 2000);
        // Update count to be 5 after timeout is scheduled
        //console.log(Object.keys(values));
    }, [values]); */


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
                        {Object.keys(values).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                    {row}
                                </TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>{values[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                minHeight: '78vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0, // Assicurati che non ci siano padding aggiuntivi
                margin: 0,  // Assicurati che non ci siano margin aggiuntivi
            }}
        >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                <Grid container direction="column" alignItems="center"> {/* Spaziatura tra i componenti */}
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
                            {/* Grid container per i pulsanti nella stessa riga */}
                            <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: '2vh' }}>
                                <Grid item>
                                    <UploadButton />
                                </Grid>
                                <Grid item>
                                    <DownloadButton />
                                </Grid>
                            </Grid>

                            {/* Grid container per la tabella */}
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12}>
                                    {table()}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}