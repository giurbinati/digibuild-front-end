import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FloorTabsRoznovanuIasiSitta from '../components/floorTabsRoznovanuIasiStta';
import FloorTabsDubetPiramydIasiSitta from '../components/floorTabsDubetPiramydIasiStta';

export default function Home() {
  const [building, setBuilding] = useState('Roznovanu Palace'); // Stato per tenere traccia dell'edificio selezionato

  const handleRadioChange = (event) => {
    setBuilding(event.target.value); // Cambia lo stato in base alla selezione dell'utente
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
        marginTop: '2vh',
      }}
    >
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Box mb={4}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              {/* RadioGroup per selezionare l'edificio */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Building</FormLabel>
                <RadioGroup
                  aria-label="building"
                  name="building"
                  value={building}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="Roznovanu Palace"
                    control={<Radio />}
                    label="Roznovanu Palace"
                  />
                  <FormControlLabel
                    value="Dubet Pyramid"
                    control={<Radio />}
                    label="Dubet Pyramid"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              {/* Visualizza il tab corretto in base all'edificio selezionato */}
              {building === 'Roznovanu Palace' ? (
                <FloorTabsRoznovanuIasiSitta />
              ) : (
                <FloorTabsDubetPiramydIasiSitta />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
