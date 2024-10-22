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
import { Box, Grid, Snackbar } from '@mui/material';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TablePagination from '@mui/material/TablePagination';
import getDataIasiSitta from '../services/getDataIasiSitta';
import putDataIasiSitta from '../services/putDataIasiSitta';
import Alert from '@mui/material/Alert';


export default function EditableTable() {
    const [categories, setCategories] = useState([]);
    const [building, setBuilding] = useState('Roznovanu')
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const rows = Object.keys(categories).map(key => ({
        name: key,
        value: categories[key].value,
        typeofdata: categories[key].typeofdata
    }));

    const handleEditRow = (index) => {
        const actualIndex = page * rowsPerPage + index;
        setEditableRowIndex(actualIndex);
        setEditedValue(rows[actualIndex].value);
    };

    const handleSave = async () => {
        const updatedValues = { ...categories };
        const actualIndex = editableRowIndex;
        updatedValues[rows[actualIndex].name] = {
            ...updatedValues[rows[actualIndex].name], // Mantenere tutte le altre proprietà come "type"
            value: editedValue // Aggiorna solo il valore
        };
        setCategories(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };
    

    const handleConfirmChanges = async () => {
        // Invia la richiesta PUT al backend con l'indice dell'array e i dati aggiornati
        try {
            const updatedValues = { ...categories };
            const buildingName = building;
            if (!validateInput(updatedValues)) {
                setOpenSnackbar(true); // Show Snackbar if validation fails
                return; // Stop further execution if validation fails
            }
            await putDataIasiSitta.updateBuildingData(buildingName, 2, updatedValues, 0);
            console.log('Update completed successfully');
            setCategories(updatedValues); // Update state with new values
            setSuccessMessage('Update completed successfully!'); // Set success message
            setErrorMessage('');  // Rimuove eventuali messaggi di errore
            setOpenSnackbar(true); // Mostra lo Snackbar con il messaggio di successo
        } catch (error) {
            console.error('Error during PUT request:', error);
            setErrorMessage('Error while updating data.');
            setOpenSnackbar(true); // Show Snackbar for error
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
            [`Material ${newMaterialIndex} - Type`]: { value: "", typeofdata: "Descriptive", type: "string" },
            [`Material ${newMaterialIndex} - Location`]: { value: "", typeofdata: "Physical", type: "string" },
            [`Material ${newMaterialIndex} - Volume`]: { value: "", typeofdata: "Physical", type: "string" },
            [`Material ${newMaterialIndex} - Weight`]: { value: "", typeofdata: "Physical", type: "string" },
            [`Material ${newMaterialIndex} - Embodied carbon`]: { value: "", typeofdata: "Physical", type: "string" },
            [`Material ${newMaterialIndex} - Life span`]: { value: "", typeofdata: "Physical", type: "string" },
            [`Material ${newMaterialIndex} - Fire resistance class`]: { value: "", typeofdata: "Rating", type: "number" },
            [`Material ${newMaterialIndex} - Waste category`]: { value: "", typeofdata: "Code", type: "string" },
            [`Material ${newMaterialIndex} - Certificate 1`]: { value: "Linked document", typeofdata: "Linked document", type: "Linked documente" },
            [`Material ${newMaterialIndex} - Chemical declaration`]: { value: "Linked document", typeofdata: "Linked document", type: "Linked documente" },
            [`Material ${newMaterialIndex} - Global Trade Item Number`]: { value: "Linked document", typeofdata: "Linked document", type: "Linked documente" }
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
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Type of Data</TableCell>
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
                                    ) : (
                                        row.value
                                    )}
                                </TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                    {row.typeofdata}
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

    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateString);
    };

    const validateInput = (updatedCategories) => {
        let isValid = true;
        const categoriesArray = Array.isArray(updatedCategories)
            ? updatedCategories
            : Object.keys(updatedCategories).map(key => ({
                name: key,
                tableData: updatedCategories[key]
            }));

        categoriesArray.forEach(category => {
            if (typeof category.tableData === 'object' && category.tableData !== null) {
                const data = category.tableData;
                console.log(data);
                if (data.type === 'string') {
                    if (typeof data.value !== 'string') {
                        setErrorMessage(`${category.name} must be a string.`);
                        console.error(`${category.name} must be a string.`);
                        isValid = false;
                    } else if (/^\d+$/.test(data.value)) { // Controlla se è solo numeri
                        setErrorMessage(`${category.name} must be a string.`);
                        console.error(`${category.name} must be a string.`);
                        isValid = false;
                    }
                }
                if (data.type === 'number' && isNaN(Number(data.value))) {
                    setErrorMessage(`${category.name} must be a number.`);
                    console.error(`${category.name} must be a number.`);
                    isValid = false;
                }
                if (data.type === 'Date' && data.value && !isValidDate(data.value)) {
                    setErrorMessage(`${category.name} must be a date (es. YYYY-MM-DD).`);
                    console.error(`${category.name} must be a date.`);
                    isValid = false;
                }
            } else {
                console.error('tableData non è un oggetto valido:', category.tableData);
            }
        });
        return isValid;
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSuccessMessage(''); // Clear success message
        setErrorMessage('');   // Clear error message
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={errorMessage ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {errorMessage || successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}