import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import GetDataFVH from '../services/getDataFVH';
import putDataFVH from '../services/putDataFVH';
import EditableTable from '../components/editableTable';

export default function TechnicalBuildingSystem() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(2, 2);
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
            await putDataFVH.updateData(2, updatedCategories, 2);
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
                marginTop: '2vh'
            }}
        >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    {/* Grid item per il Paper contenente la Tabella e il Bottone */}
                    <Grid item xs={12}>
                        <EditableTable categories={categories} onConfirmChanges={handleConfirmChanges} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
