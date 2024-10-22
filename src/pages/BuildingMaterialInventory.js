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
import TablePagination from '@mui/material/TablePagination';
import GetDataFVH from '../services/getDataFVH';
import putDataFVH from '../services/putDataFVH';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function tableBuildingMaterialInventory() {
    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false); // Stato per il messaggio di successo
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Stato per il messaggio di successo


    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(2, 0);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        }
        fetchCategories();
    }, []);

    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    const rows = Object.keys(categories).map(key => ({
        name: key,
        value: categories[key].value,
        type: categories[key].typeofdata
    }));

    const handleEditRow = (index) => {
        const actualIndex = page * rowsPerPage + index;
        setEditableRowIndex(actualIndex);
        setEditedValue(rows[actualIndex].value);
    };

    const handleSave = async () => {
        const updatedValues = { ...categories };
        const actualIndex = editableRowIndex;
        updatedValues[rows[actualIndex].name].value = editedValue; // Update value correctly
        setCategories(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(11);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rowsToShow = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleAddMaterial = () => {
        // Filter keys starting with 'Material'
        const materialKeys = Object.keys(categories).filter(key => key.startsWith('Material'));

        // Find the last material index
        const lastMaterialIndex = materialKeys.reduce((max, key) => {
            const match = key.match(/Material\s*(\d+)/);
            return match ? Math.max(max, parseInt(match[1], 10)) : max;
        }, 0);

        const newMaterialIndex = lastMaterialIndex + 1;

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

        setCategories(prevCategories => ({ ...prevCategories, ...newMaterial }));
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
            //console.log('Category:', category);
            if (typeof category.tableData === 'object' && category.tableData !== null) {
                const data = category.tableData;
                console.log(data)
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
                // Validazione aggiuntiva per dati collegati
                /*
                if (data.type === 'Linked data' && typeof data.value !== 'string') {
                    setErrorMessage(`${category.name} deve essere un collegamento valido (Linked data).`);
                    console.error(`${category.name} deve essere un collegamento valido.`);
                    isValid = false;
                }
                */
            } else {
                console.error('tableData non è un oggetto valido:', category.tableData);
            }
        });
        return isValid;
    };

    const handleConfirmChanges = async () => {
        const updatedValues = { ...categories };
        if (!validateInput(updatedValues)) {
            setOpenSnackbar(true); // Mostra un messaggio di errore se la validazione fallisce
            return;
        }
        try {
            await putDataFVH.updateData(2, updatedValues, 0);
            console.log('Aggiornamento completato con successo');
            setCategories(updatedValues); // Aggiorna lo stato con i nuovi valori
            setSuccessMessage('Data updated successfully!'); // Imposta il messaggio di successo
            setSuccessSnackbar(true); // Mostra il messaggio di successo
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            setErrorMessage('Error while updating data.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSuccessSnackbar(false); // Chiudi il messaggio di successo
    };

    const tableBuildingMaterialInventory = () => (
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
                                            '& .MuiInputBase-root': { fontSize: '2.5ch' },
                                            '& .MuiInputLabel-root': { fontSize: '2.5ch' },
                                        }}
                                    />
                                ) : (
                                    row.value
                                )}
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                {row.type}
                            </TableCell>
                            <TableCell align="right">
                                {editableRowIndex === (page * rowsPerPage + index) ? (
                                    <Button
                                        onClick={handleSave}
                                        sx={{ color: '#41BFB9', fontSize: '2.5ch' }}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        sx={{ color: '#41BFB9', fontSize: '2.5ch' }}
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
            <TablePagination
                rowsPerPageOptions={[5, 11, 22]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );

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
                                    padding: '1vh 2vh',
                                    minWidth: '180px',
                                    color: 'white',
                                    marginTop: '2vh',
                                    fontSize: '2.5ch'
                                }}
                                onClick={handleAddMaterial}
                            >
                                Add New Material
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#057BBE',
                                    padding: '1vh 2vh',
                                    minWidth: '180px',
                                    color: 'white',
                                    marginTop: '2vh',
                                    fontSize: '2.5ch'
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
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
