import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import ViewPdfApiButton from '../components/viewPdfApiButton'
import DownloadButtonInvoices from '../components/DownloadButtonInvoices';
export default function CostInformationHeatingAndHotWater() {

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
      <Grid container direction="column" alignItems="center" spacing={3}>
        {/* Grid item per il Titolo */}

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
            Roznovanu Palace
          </Typography>
        </Paper>
      </Grid>
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
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>
              Invoicing Period 23.02.2022-25.03.2022</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>
              Invoicing Period 27.12.2021-25.01.2022</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Invoicing Period 25.01.2022-23.02.2022</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Invoicing Period 25.10.2021-24.11.2021</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''}/>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Invoicing Period 25.03.2022-27.04.2022</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Invoicing Period 25.05.2022-25.10.2022</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Invoicing Period 27.04.2022-25.05.2022</Typography>
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ViewPdfApiButton apiUrl={''} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
