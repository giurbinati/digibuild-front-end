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
import TablePagination from '@mui/material/TablePagination';
import getDataIasiSitta from '../services/getDataIasiSitta';
import putDataIasiSitta from '../services/putDataIasiSitta';


export default function EditableTable() {

    const config = {
        host: process.env.REACT_APP_API_HOST,
        timer: parseInt(process.env.REACT_APP_TIMER)
    };

    const API_URL_DATE_PutDataIasiSitta = config.host + "/putcategoriesservicesiasisitta";

    const [categories, setCategories] = useState([]);
    const [building, setBuilding] = useState('Roznovanu')
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getDataIasiSitta.fetchBuildingData(building, 2, 0);
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
        setPage(0);
    };

    // Convert object to array of rows
    const rows = Object.entries(categories).map(([key, value]) => ({
        name: key,
        value: value,
    }));

    const handleEditRow = (index) => {
        const actualIndex = page * rowsPerPage + index;
        setEditableRowIndex(actualIndex);
        setEditedValue(rows[actualIndex].value);
    };

    const handleSave = async () => {
        const updatedValues = { ...categories };
        const actualIndex = editableRowIndex;
        updatedValues[rows[actualIndex].name] = editedValue;
        setCategories(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleConfirmChanges = async () => {
        // Invia la richiesta PUT al backend con l'indice dell'array e i dati aggiornati
        try {
            const updatedValues = { ...categories };
            const buildingName = building;
            const response = await putDataIasiSitta.updateBuildingData(buildingName, 2, updatedValues, 0);
            //console.log(response)
        } catch (error) {
            console.log(error);
            console.error('Errore durante la richiesta PUT:', error);
        }
    };


    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const [page, setPage] = useState(0); // Stato per la pagina corrente
    const [rowsPerPage, setRowsPerPage] = useState(11); // Stato per il numero di righe per pagina

    // Funzione per cambiare pagina
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Funzione per cambiare il numero di righe per pagina
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset della pagina alla prima dopo aver cambiato il numero di righe per pagina
    };

    // Righe che verranno visualizzate nella pagina corrente
    const rowsToShow = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleAddMaterial = () => {
        // Filtra i nomi dei campi per trovare quelli che iniziano con 'Material'
        const materialKeys = Object.keys(categories).filter(key => key.startsWith('Material'));

        // Trova l'ultimo numero di materiale
        const lastMaterialIndex = materialKeys.reduce((max, key) => {
            const match = key.match(/Material\s*(\d+)/); // Cattura solo il numero del materiale
            return match ? Math.max(max, parseInt(match[1], 10)) : max; // Aggiorna il massimo
        }, 0);

        // Incrementa l'indice per il nuovo set di materiali
        const newMaterialIndex = lastMaterialIndex + 1;

        // Crea il nuovo set di campi per il materiale
        const newMaterial = {
            [`Material ${newMaterialIndex} - Type`]: "",
            [`Material ${newMaterialIndex} - Location`]: "",
            [`Material ${newMaterialIndex} - Volume`]: "",
            [`Material ${newMaterialIndex} - Weight`]: "",
            [`Material ${newMaterialIndex} - Embodied carbon`]: "",
            [`Material ${newMaterialIndex} - Life span`]: "",
            [`Material ${newMaterialIndex} - Fire resistance class`]: "Rating",
            [`Material ${newMaterialIndex} - Waste category`]: "Code",
            [`Material ${newMaterialIndex} - Certificate 1`]: "Linked document",
            [`Material ${newMaterialIndex} - Chemical declaration`]: "Linked document",
            [`Material ${newMaterialIndex} - Global Trade Item Number`]: "Linked document"
        };

        // Aggiorna lo stato delle categorie con il nuovo materiale
        setCategories(prevCategories => ({ ...prevCategories, ...newMaterial }));
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
                        {rowsToShow.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                    {editableRowIndex === (page * rowsPerPage + index) ? (
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
                                    {editableRowIndex === (page * rowsPerPage + index) ? (
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
                {/* Aggiungi la paginazione qui */}
                <TablePagination
                    rowsPerPageOptions={[5, 11, 22]}
                    component="div"
                    count={rows.length} // Numero totale di righe
                    rowsPerPage={rowsPerPage} // Numero di righe per pagina
                    page={page} // Pagina corrente
                    onPageChange={handleChangePage} // Cambia pagina
                    onRowsPerPageChange={handleChangeRowsPerPage} // Cambia righe per pagina
                />
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
                                onClick={handleAddMaterial}
                            >
                                Add Material
                            </Button>
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
                                onClick={handleConfirmChanges}
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