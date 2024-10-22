import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GetDataFVH from '../services/getDataFVH';
import putDataFVH from '../services/putDataFVH';
import EditableTable from '../components/editableTable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function AdministrativeInformation() {
    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');  // Aggiunto stato per il messaggio di successo

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(0);
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
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


    const handleConfirmChanges = async (updatedCategories) => {
        if (!validateInput(updatedCategories)) {
            setOpenSnackbar(true); // Mostra un messaggio di errore se la validazione fallisce
            return;
        }
        try {
            await putDataFVH.updateData(0, updatedCategories);
            console.log('Aggiornamento completato con successo');
            setCategories(updatedCategories); // Aggiorna lo stato con i nuovi valori
            setSuccessMessage('Update completed successfully!');  // Imposta il messaggio di successo
            setErrorMessage('');  // Rimuove eventuali messaggi di errore
            setOpenSnackbar(true); // Mostra lo Snackbar con il messaggio di successo
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            setErrorMessage('Error while updating data.');
            setOpenSnackbar(true); // Mostra lo Snackbar con il messaggio di errore
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setErrorMessage('');  // Reset del messaggio di errore
        setSuccessMessage('');  // Reset del messaggio di successo
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
                                Ownership Information
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <EditableTable categories={categories} onConfirmChanges={handleConfirmChanges} />
                    </Grid>
                </Grid>
            </Container>

            {/* Snackbar per mostrare i messaggi di errore o successo */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={errorMessage ? "error" : "success"} // Mostra success se non c'è un messaggio di errore
                    sx={{ width: '100%' }}
                >
                    {errorMessage || successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
