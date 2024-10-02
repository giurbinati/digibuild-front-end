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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import getDataIasiSitta from '../services/getDataIasiSitta';
import putDataIasiSitta from '../services/putDataIasiSitta';


export default function EditableTable() {

    const [categories, setCategories] = useState([]);
    const [building, setBuilding] = useState('Roznovanu')
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getDataIasiSitta.fetchBuildingData(building, 2, 2);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
                throw error; // Rilancia l'errore per la gestione nel componente
            }
        }
        fetchCategories();
    }, [building]);

    const handleRadioChange = (event) => {
        setBuilding(event.target.value);
    };

    // Convert object to array of rows
    const rows = Object.keys(categories).map(key => ({
        name: key,
        value: categories[key]
    }));

    const handleEditRow = (index) => {
        setEditableRowIndex(index);
        setEditedValue(rows[index].value);
    };

    const handleSave = async () => {
        const updatedValues = { ...categories };
        updatedValues[rows[editableRowIndex].name] = editedValue;
        setCategories(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');

        // Invia la richiesta PUT al backend con l'indice dell'array e i dati aggiornati
        try {
            const buildingName = building;
            const response = await putDataIasiSitta.updateBuildingData(buildingName, 2, updatedValues, 2);
            //console.log(response)
        } catch (error) {
            console.log(error);
            console.error('Errore durante la richiesta PUT:', error);
        }
    };


    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const tableTechnicalBuilding = () => {
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
                    <Grid item>
                        <FormControl>
                            <FormLabel sx={{ fontSize: '2.5ch' }} id="demo-radio-buttons-group-label">Building</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={building}
                                onChange={handleRadioChange}

                            >
                                <FormControlLabel value="Roznovanu" control={<Radio />} label="Roznovanu Palace" />
                                <FormControlLabel value="Dubet Pyramid" control={<Radio />} label="Dubet Pyramid" />
                            </RadioGroup>
                        </FormControl>
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
                            {tableTechnicalBuilding()}
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
