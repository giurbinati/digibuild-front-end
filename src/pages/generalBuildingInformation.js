import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function EditableTable() {

    const [valuesDesignAndPlansOfTheBuilding, setValuesDesignAndPlansOfTheBuilding] = useState({
        "District heating access": "Linked data",
        "Year built": "2020",
        "Solar potential": "Linked data",
        "Soil/terrain": "Linked data",
        "Climate information": "Linked data",
        "Physical accessibility": "Accessible (by wheelchairs etc.)",
        "Safety manual": "Fire Safety manual",
        "History of any major renovations or replacements": "No (major renovations)",
        "Building pictures": "To be defined",
        "Number of floors": "7",
        "Historical status": "Building without historic value",
        "Building surroundings": "Urban",
        "Floor area": "35629 m2",
        "Building’s envelope": "Concrete, structural Insulated panels",
        "Building volume": "209300 m3",
        "Shape factor": "Linked data",
        "Type of construction": "Linked data",
        "Roof type": "Standard Insulated Roof with Asphalt Shingles",
        "Facade type": "Brick",
    });

    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    // Convert object to array of rows
    const rows = Object.keys(valuesDesignAndPlansOfTheBuilding).map(key => ({
        name: key,
        value: valuesDesignAndPlansOfTheBuilding[key]
    }));

    const handleEditRow = (index) => {
        setEditableRowIndex(index);
        setEditedValue(rows[index].value);
    };

    const handleSave = () => {
        // Update valuesOwnershipInformation with the edited value
        const updatedValues = { ...valuesDesignAndPlansOfTheBuilding };
        updatedValues[rows[editableRowIndex].name] = editedValue;

        setValuesDesignAndPlansOfTheBuilding(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const tableDesignAndPlansOfTheBuilding = () => {
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
                                Design and plans of the building
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
                            {tableDesignAndPlansOfTheBuilding()}
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
                            // onClick={handleAddRow} // Non è necessario in questo contesto
                            >
                                Confirm Changes
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
