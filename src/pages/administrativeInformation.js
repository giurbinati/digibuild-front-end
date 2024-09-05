import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function EditableTable() {

    const [valuesOwnershipInformation, setValuesOwnershipInformation] = useState({
        "Unique building identifier": "66440",
        "Address": "Työpajankatu 8, 00580 Helsinki",
        "Building owner": "Name and contact details",
        "DBL prepared by": "Name and contact details",
        "When was the DBL last edited": "Date",
        "Ownership type": "External owner (investment company)",
        "Tenancy agreement": "Linked data",
        "Utilities contracts": "Linked data",
        "Maintenance log": "Linked data",
        "Licenses": "Linked data",
        "Building type": "Office",
        "Building name": "Kaupunkiympäristötalo (KYMP-talo)",
        "Ownership": "Name and contact details",
    });

    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    // Convert object to array of rows
    const rows = Object.keys(valuesOwnershipInformation).map(key => ({
        name: key,
        value: valuesOwnershipInformation[key]
    }));

    const handleEditRow = (index) => {
        setEditableRowIndex(index);
        setEditedValue(rows[index].value);
    };

    const handleSave = () => {
        // Update valuesOwnershipInformation with the edited value
        const updatedValues = { ...valuesOwnershipInformation };
        updatedValues[rows[editableRowIndex].name] = editedValue;

        setValuesOwnershipInformation(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const tableOwnershipInformation = () => {
        return (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Value</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                    {editableRowIndex === index ? (
                                        <TextField
                                            value={editedValue}
                                            onChange={handleValueChange}
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    fontSize: '2.5ch' // Dimensione del carattere all'interno del TextField
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '2.5ch' // Dimensione del carattere dell'etichetta
                                                },
                                            }}
                                        />
                                    ) : row.value.startsWith('http') ? (
                                        <a href={row.value} target="_blank" rel="noopener noreferrer" style={{ fontSize: '2.5ch' }}>{row.value}</a>
                                    ) : (
                                        row.value
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editableRowIndex === index ? (
                                        <Button
                                            onClick={handleSave}
                                            sx={{
                                                color: '#41BFB9',
                                                fontSize: '2.5ch'
                                            }}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={{
                                                color: '#41BFB9',
                                                fontSize: '2.5ch'
                                            }}
                                            onClick={() => handleEditRow(index)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
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
                justifyContent: 'center',
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
                                Ownership Information
                            </Typography>
                        </Paper>
                    </Grid>

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
                            {tableOwnershipInformation()}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#057BBE',
                                    padding: '1vh 2vh', // Padding verticale e orizzontale
                                    minWidth: '20vh', // Larghezza minima per mantenere la dimensione minima del bottone
                                    fontSize: '2ch',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '2vh', // Aggiunto margine superiore per distanziare il pulsante dalla tabella
                                    textAlign: 'center', // Centra il testo verticalmente
                                }}
                            /* onClick={handleAddRow} */
                            >
                                Confirm Changes
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
