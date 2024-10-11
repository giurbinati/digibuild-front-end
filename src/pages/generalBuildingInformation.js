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


export default function GeneralBuildingInformation() {

    const [categories, setCategories] = useState([]);

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


    const handleConfirmChanges = async (updatedCategories) => {
        try {
            await putDataFVH.updateData(1, updatedCategories);
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
                                Design and plans of the building
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
