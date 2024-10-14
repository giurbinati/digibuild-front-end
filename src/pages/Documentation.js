import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import ViewPdfApiButton from '../components/viewPdfApiButton';
import UploadButton from '../components/uploadButton';

export default function Documentation() {
  const [pilot, setPilot] = useState(null);
  // Array di documenti con i nomi dei file
  const documents = [
    { title: 'General building information-FVH pilot', filename: 'General builing information', type: 'pdf' },
    { title: 'Electricity Affected Areas', filename: 'Electricity', type: 'pdf' },
    { title: 'Ventilation Affected Areas', filename: 'Ventilation', type: 'pdf' },
    { title: 'LCA Assesment (building phase)', filename: 'LCA', type: 'pdf' },
    { title: 'Construction information - Outer Walls', filename: 'Construction information - Outer Walls', type: 'pdf' },
    { title: 'air_conditioner-TUWV0611A', filename: 'air_conditioner', type: 'pdf' }
  ];

  useEffect(() => {
    const storedPilot = sessionStorage.getItem("PILOT");
    if (storedPilot) {
      setPilot(storedPilot);
      console.log(pilot)
    }
  }, []);

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
            width: 'auto',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={4} columns={16} alignItems="center" justifyContent="center">
            {documents.map((doc) => (
              <Grid container item key={doc.filename} spacing={2} alignItems="center" justifyContent="center">
                {/* Title */}
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" align="center" style={{ fontSize: '3ch' }}>
                    {doc.title}
                  </Typography>
                </Grid>

                {/* View or Download Button */}
                <Grid item xs={12} sm={4}>
                  {doc.type === 'pdf' ? (
                    <ViewPdfApiButton filename={doc.filename} pilot={pilot} />
                  ) : (
                    <DownloadButton filename={doc.filename} pilot={pilot}  />
                  )}
                </Grid>

                {/* Upload Button */}
                <Grid item xs={12} sm={4}>
                  <UploadButton fileType={doc.type} keyword={doc.filename} pilot={pilot} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
