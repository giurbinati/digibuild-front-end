import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ViewPdfApiButton from '../components/viewPdfApiButton';
import UploadButton from '../components/uploadButton';

const config = {
  host: process.env.REACT_APP_API_HOST,
  timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_INVOICE = config.host + "/invoices";

export default function CostInformationHeating() {
  const [invoices, setInvoices] = useState([]);
  const [pilot, setPilot] = useState(null);
  const [filename, setFilename] = useState('heating');
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPilot = sessionStorage.getItem("PILOT");
    if (storedPilot) {
      setPilot(storedPilot);
    }
  }, []);

  // Fetch invoices dynamically
  useEffect(() => {
    const fetchInvoices = async () => {
      const requestBody = { filename, pilot};

      const response = await fetch(API_URL_INVOICE, {
        method: 'POST', // Use POST to send the request body
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Pass the request body as JSON
      });

      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
        setError(null); // Resetta l'errore se la richiesta ha successo
      } else {
        setInvoices([]); // Resetta le fatture se c'è un errore
        if (response.status === 404) {
          setError('No invoices available.'); // Imposta il messaggio di errore
        } else {
          console.error('Failed to fetch invoices:', response.status);
        }
      }
    };

    if (pilot) {
      fetchInvoices();
    }
  }, [pilot, filename]);

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
            <UploadButton
              fileType={'pdf'}
              keyword={filename}
              pilot={pilot}
              requiresDateRange={true}
            />
        </Grid>

        <Paper
          sx={{
            backgroundColor: 'rgba(147, 208, 167, 0.4)',
            padding: '2%',
            width: 'auto',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '3vh'
          }}
        >
          <Grid container spacing={4} columns={16} alignItems="center" justifyContent="center">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <Grid container item key={invoice.filename} spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" align="center" style={{ fontSize: '3ch' }}>
                      {invoice.metadata.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ViewPdfApiButton filename={invoice.filename} pilot={pilot} />
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" style={{ fontSize: '2.5ch' }}>
                No invoices available.
              </Typography>
            )}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );

}
