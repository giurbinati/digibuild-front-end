import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FloorTabsRoznovanuIasiSitta from '../components/floorTabsRoznovanuIasiStta';
import FloorTabsDubetPiramydIasiSitta from '../components/floorTabsDubetPiramydIasiStta';

export default function DesignAndPlansOfTheBuildingIasi() {
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
        marginTop: '2vh'
      }}
    >
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Grid container direction="column" alignItems="center" spacing={3}>

          <FormControl>
            <FormLabel sx={{ fontSize: '2.5ch' }} id="demo-radio-buttons-group-label">Building</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={building}
              onChange={handleRadioChange}

            >
              <FormControlLabel value="Roznovanu Palace" control={<Radio />} label="Roznovanu Palace" />
              <FormControlLabel value="Dubet Pyramid" control={<Radio />} label="Dubet Pyramid" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {building === "Dubet Pyramid" && (
          <>
            <Container maxWidth="xl" sx={{ padding: 0 }}>
              <Grid container spacing={2} justifyContent="center">
                {/* Grid item per il Paper contenente la Tabella e il Bottone */}
                <Grid item>
                  <FloorTabsRoznovanuIasiSitta />
                </Grid>
              </Grid>
            </Container>
          </>
        )}
        {building === "Roznovanu Palace" && (
          <>
            <Container maxWidth="xl" sx={{ padding: 0 }}>
              <Grid container spacing={2} justifyContent="center">
                {/* Grid item per il Paper contenente la Tabella e il Bottone */}
                <Grid item>
                  <FloorTabsDubetPiramydIasiSitta />
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </Container >
    </Box >
  );
}
