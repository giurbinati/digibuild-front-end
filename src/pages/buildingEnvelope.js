import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import GetDataFVH from '../services/getDataFVH';
import putDataFVH from '../services/putDataFVH';
import EditableTable from '../components/editableTable';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function BuildingEnvelope() {

    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Aggiungi uno stato per la severità del messaggio

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(2, 1);
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
                    if (typeof data.value !== 'string' || /^\d+$/.test(data.value)) { // Controlla se è solo numeri
                        setSnackbarMessage(`${category.name} must be a string.`);
                        setSnackbarSeverity('error');
                        isValid = false;
                    }
                }
                if (data.type === 'number' && isNaN(Number(data.value))) {
                    setSnackbarMessage(`${category.name} must be a number.`);
                    setSnackbarSeverity('error');
                    isValid = false;
                }
                if (data.type === 'Date' && data.value && !isValidDate(data.value)) {
                    setSnackbarMessage(`${category.name} must be a date (es. YYYY-MM-DD).`);
                    setSnackbarSeverity('error');
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
            await putDataFVH.updateData(2, updatedCategories, 1);
            console.log('Aggiornamento completato con successo');
            setCategories(updatedCategories); // Aggiorna lo stato con i nuovi valori
            setSnackbarMessage('Update completed successfully!'); // Messaggio di successo
            setSnackbarSeverity('success'); // Setta la severità del messaggio a 'success'
            setOpenSnackbar(true); // Mostra il messaggio di successo
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
            setSnackbarMessage('Error while updating data.'); // Messaggio di errore
            setSnackbarSeverity('error'); // Setta la severità del messaggio a 'error'
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
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
