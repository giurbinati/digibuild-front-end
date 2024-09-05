import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';

import DownloadButtonFile from '../components/downloadButtonFile'
import DownloadButtonEnergyPerformance from '../components/downloadButtonEnergyPerformance'
import DownloadButtonBreeam from '../components/downloadButtonBreeam'
import DownloadButtonSRICertificate from '../components/downloadButtonSRICertificate'
import DownloadButtonSRIResults from '../components/downloadButtonSRIResults'
import { Height } from '@mui/icons-material';

export default function Home({ setList, list }) {


  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '78vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>BREEAM</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonBreeam />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>SRI Certificate</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonSRICertificate />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>SRI Results & certificate</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonSRIResults />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>Energy performance certificate</Typography>
            </Grid>
            <Grid item xs={8}>
              <DownloadButtonEnergyPerformance />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
