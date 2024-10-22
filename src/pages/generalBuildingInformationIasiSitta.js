import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Grid, Snackbar } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import getDataIasiSitta from '../services/getDataIasiSitta';
import putDataIasiSitta from '../services/putDataIasiSitta';
import EditableTable from '../components/editableTable';
import Alert from '@mui/material/Alert';

export default function AdministrativeInformationIasiSitta() {
    const [categories, setCategories] = useState([]);
    const [building, setBuilding] = useState('Roznovanu');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getDataIasiSitta.fetchBuildingData(building, 1);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
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
        let firstErrorMessage = ''; // Store the first error message

        // Convert the object to an array
        const categoriesArray = Array.isArray(updatedCategories)
            ? updatedCategories
            : Object.entries(updatedCategories).map(([key, value]) => ({
                name: key,
                tableData: value,
            }));
            console.log(categoriesArray)

        // Iterate over each category
        categoriesArray.forEach(category => {
            const data = category.tableData;
            console.log(data)

            // Ensure data is a valid object
            if (data && typeof data === 'object') {
                // Validate based on type
                if (data.type === 'string') {
                    if (typeof data.value !== 'string') {
                        firstErrorMessage = `${category.name} must be a string.`;
                        isValid = false; // Set validity to false
                    } else if (/^\d+$/.test(data.value)) {
                        firstErrorMessage = `${category.name} must be a string (not just numbers).`;
                        isValid = false; // Set validity to false
                    }
                } else if (data.type === 'number' && isNaN(Number(data.value))) {
                    firstErrorMessage = `${category.name} must be a number.`;
                    isValid = false; // Set validity to false
                } else if (data.type === 'Date' && data.value && !isValidDate(data.value)) {
                    firstErrorMessage = `${category.name} must be a date (e.g., YYYY-MM-DD).`;
                    isValid = false; // Set validity to false
                }
            } else {
                console.error('tableData is not a valid object:', category.tableData);
            }
        });

        // If there's a validation error, set the error message
        if (!isValid) {
            setErrorMessage(firstErrorMessage);
            console.error(firstErrorMessage);
        }

        return isValid; // Return the validity status
    };

    const handleConfirmChanges = async (updatedCategories) => {
        // Validate input
        if (!validateInput(updatedCategories)) {
            setOpenSnackbar(true); // Show Snackbar if validation fails
            return; // Stop further execution if validation fails
        }

        // Proceed with the API call if validation passes
        try {
            await putDataIasiSitta.updateBuildingData(building, 1, updatedCategories);
            console.log('Update completed successfully');
            setCategories(updatedCategories); // Update state with new values
            setSuccessMessage('Update completed successfully!'); // Set success message
            setOpenSnackbar(true); // Show Snackbar for success
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
};
