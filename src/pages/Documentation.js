import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import DownloadButtonLCA from '../components/downloadButtonLCA'
import DownloadButtonElectricity from '../components/downloadButtonElectricity'
import DownloadButtonVentilation from '../components/downloadButtonVentilation'
import DownloadButtonGenralBuilding from '../components/DownloadButtonGeneralBuiulding';
export default function Home({ setList, list }) {

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
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>General building information-FVH pilot</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonGenralBuilding />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Electricity Affected Areas</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonElectricity />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Ventilation Affected Areas</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonVentilation />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>LCA Assesment (building phase) 2020</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonLCA />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
