import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import ViewPdfApiButton from '../components/viewPdfApiButton'
import DownloadButton from '../components/downloadButton'


export default function DocumentationPerformance() {
  const urlEnergyPerformance = process.env.REACT_APP_API_FVH_ENERGYPERFORMANCE


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
        <Paper
          sx={{
            backgroundColor: 'rgba(147, 208, 167, 0.4)',
            padding: '2%',
            width: 'auto', // Cambia '1000px' a 'auto' per una larghezza flessibile
            maxWidth: '100%', // Massima larghezza consentita è 100% del container
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={4} columns={16} alignItems="center" justify="center" alignContent="center">
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Energy Performance Certificate</Typography>
            </Grid>
            <Grid item xs={8}>
              <ViewPdfApiButton apiUrl={urlEnergyPerformance} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
