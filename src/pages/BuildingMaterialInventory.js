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

    const [valuesBuildingMaterialInventory, setValuesBuildingMaterialInventory] = useState({
        "Material 1 - Type": "Descriptive",
        "Material 1 - Location": "Physical",
        "Material 1 - Volume": "Physical",
        "Material 1 - Weight": "Physical",
        "Material 1 - Embodied carbon": "Physical",
        "Material 1 - Life span": "Physical",
        "Material 1 - Fire resistance class": "Rating",
        "Material 1 - Waste category": "Code",
        "Material 1 - Certificate 1": "Linked document",
        "Material 1 - Chemical declaration": "Linked document",
        "Material 1 - Global Trade Item Number": "Linked document",
        "Material 2 - Type": "Descriptive",
        "Material 2 - Location": "Physical",
        "Material 2 - Volume": "Physical",
        "Material 2 - Weight": "Physical",
        "Material 2 - Embodied carbon": "Physical",
        "Material 2 - Life span": "Physical",
        "Material 2 - Fire resistance class": "Rating",
        "Material 2 - Waste category": "Code",
        "Material 2 - Certificate 1": "Linked document",
        "Material 2 - Chemical declaration": "Linked document",
        "Material 2 - Global Trade Item Number": "Linked document",
    });    

    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    // Convert object to array of rows
    const rows = Object.keys(valuesBuildingMaterialInventory).map(key => ({
        name: key,
        value: valuesBuildingMaterialInventory[key]
    }));

    const handleEditRow = (index) => {
        setEditableRowIndex(index);
        setEditedValue(rows[index].value);
    };

    const handleSave = () => {
        // Update valuesOwnershipInformation with the edited value
        const updatedValues = { ...valuesBuildingMaterialInventory };
        updatedValues[rows[editableRowIndex].name] = editedValue;

        setValuesBuildingMaterialInventory(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const tableBuildingMaterialInventory = () => {
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
                marginTop: '2vh'
            }}
        >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                <Grid container direction="column" alignItems="center" spacing={3}>
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
                            {tableBuildingMaterialInventory()}
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
}