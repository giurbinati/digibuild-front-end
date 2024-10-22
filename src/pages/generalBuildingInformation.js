import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import GetDataFVH from '../services/getDataFVH';
import putDataFVH from '../services/putDataFVH';
import EditableTable from '../components/editableTable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function GeneralBuildingInformation() {

    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Stato per il tipo di messaggio (successo o errore)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(1);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
                throw error; // Rilancia l'errore per la gestione nel componente
            }
        }

        fetchCategories();
    }, []);

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
                if (data.type === 'string') {
                    if (typeof data.value !== 'string') {
                        setSnackbarMessage(`${category.name} must be a string.`);
                        setSnackbarSeverity('error');
                        console.error(`${category.name} must be a string.`);
                        isValid = false;
                    } else if (/^\d+$/.test(data.value)) { // Controlla se è solo numeri
                        setSnackbarMessage(`${category.name} must be a string.`);
                        setSnackbarSeverity('error');
                        console.error(`${category.name} must be a string.`);
                        isValid = false;
                    }
                }
                if (data.type === 'number' && isNaN(Number(data.value))) {
                    setSnackbarMessage(`${category.name} must be a number.`);
                    setSnackbarSeverity('error');
                    console.error(`${category.name} must be a number.`);
                    isValid = false;
                }
                if (data.type === 'Date' && data.value && !isValidDate(data.value)) {
                    setSnackbarMessage(`${category.name} must be a date (es. YYYY-MM-DD).`);
                    setSnackbarSeverity('error');
                    console.error(`${category.name} must be a date.`);
                    isValid = false;
                }
            } else {
                console.error('tableData non è un oggetto valido:', category.tableData);
            }
        });
        return isValid;
    };

    const handleConfirmChanges = async (updatedCategories) => {
        if (!validateInput(updatedCategories)) {
            setOpenSnackbar(true); // Mostra un messaggio di errore se la validazione fallisce
            return;
        }
        try {
            await putDataFVH.updateData(1, updatedCategories);
            console.log('Aggiornamento completato con successo');
            setCategories(updatedCategories); // Aggiorna lo stato con i nuovi valori
            setSnackbarMessage('Update completed successfully!'); // Messaggio di successo
            setSnackbarSeverity('success'); // Imposta il tipo di messaggio come successo
            setOpenSnackbar(true); // Mostra il messaggio di successo
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            setSnackbarMessage('Error while updating data.');
            setSnackbarSeverity('error'); // Imposta il tipo di messaggio come errore
            setOpenSnackbar(true); // Mostra il messaggio di errore
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                    <Grid item xs={12}>
                        <EditableTable categories={categories} onConfirmChanges={handleConfirmChanges} />
                    </Grid>
                </Grid>
            </Container>

            {/* Snackbar per mostrare i messaggi di successo o errore */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
