import React, { useState, useEffect } from 'react';
import { Box, Grid, Snackbar } from '@mui/material';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import getDataIasiSitta from '../services/getDataIasiSitta';
import putDataIasiSitta from '../services/putDataIasiSitta';
import EditableTable from '../components/editableTable';
import Alert from '@mui/material/Alert';

export default function BuildingEnvelopeIasiSitta() {

    const [categories, setCategories] = useState([]);
    const [building, setBuilding] = useState('Roznovanu');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getDataIasiSitta.fetchBuildingData(building, 2, 1);
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
        try {
            const buildingName = building;
            if (!validateInput(updatedCategories)) {
                setOpenSnackbar(true); // Show Snackbar if validation fails
                return; // Stop further execution if validation fails
            }
            await putDataIasiSitta.updateBuildingData(buildingName, 2, updatedCategories, 1);
            console.log('Update completed successfully');
            setCategories(updatedCategories); // Update state with new values
            setSuccessMessage('Update completed successfully!'); // Set success message
            setErrorMessage('');  // Rimuove eventuali messaggi di errore
            setOpenSnackbar(true); // Mostra lo Snackbar con il messaggio di successo
        } catch (error) {
            console.error('Error during PUT request:', error);
            setErrorMessage('Error while updating data.');
            setOpenSnackbar(true); // Show Snackbar for error
        }
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
                    <Grid item xs={12}>
                        <EditableTable categories={categories} onConfirmChanges={handleConfirmChanges} />
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

