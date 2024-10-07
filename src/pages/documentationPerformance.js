import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import ViewPdfApiButton from '../components/viewPdfApiButton';
import DownloadButton from '../components/downloadButton';
import UploadButton from '../components/uploadButton';

export default function DocumentationPerformance() {
  const documents = [
    { title: 'Breeam', filename: 'breeam', type: 'pdf' },
    { title: 'SRI Certificate', filename: 'sri_certificate', type: 'document' },
    { title: 'SRI Result', filename: 'SRI_FVH_Results', type: 'document' },
    { title: 'Energy Performance Certificate', filename: 'Energy Performance Certificate', type: 'pdf' }
  ];

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
            {documents.map((doc, index) => (
              <Grid container item key={index} spacing={2} alignItems="center" justifyContent="center">
                {/* Title */}
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" align="center" style={{ fontSize: '3ch' }}>
                    {doc.title}
                  </Typography>
                </Grid>

                {/* View or Download Button */}
                <Grid item xs={12} sm={4}>
                  {doc.type === 'pdf' ? (
                    <ViewPdfApiButton filename={doc.filename} />
                  ) : (
                    <DownloadButton filename={doc.filename} />
                  )}
                </Grid>

                {/* Upload Button */}
                <Grid item xs={12} sm={4}>
                  <UploadButton fileType={doc.type} keyword={doc.filename} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
