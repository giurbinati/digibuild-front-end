import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import getDataIasiSitta from '../services/getDataIasiSitta';
import putDataIasiSitta from '../services/putDataIasiSitta';
import EditableTable from '../components/editableTable';


export default function TechbicalBuildingSystemIasiSitta() {

    const [categories, setCategories] = useState([]);
    const [building, setBuilding] = useState('Roznovanu')

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getDataIasiSitta.fetchBuildingData(building, 2, 2);
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

    const handleConfirmChanges = async (updatedCategories) => {
        try {
            const buildingName = building;
            await putDataIasiSitta.updateBuildingData(buildingName, 2, updatedCategories, 2);
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
        </Box>
    );
}
