import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GetDataFVH from '../services/getDataFVH'
import putDataFVH from '../services/putDataFVH';
import EditableTable from '../components/editableTable';

export default function AdministrativeInformation() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(0);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleConfirmChanges = async (updatedCategories) => {
        try {
            await putDataFVH.updateData(0, updatedCategories);
            console.log('Aggiornamento completato con successo');
            setCategories(updatedCategories); // Update the state with new values
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
        }
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
        </Box>
    );
}
