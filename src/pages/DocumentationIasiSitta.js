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

export default function DocumentationIasiSitta() {

  const [building, setBuilding] = useState('Roznovanu');

  const handleRadioChange = (event) => {
    setBuilding(event.target.value);
  };

  const [pilot, setPilot] = useState(null);
  // Array di documenti con i nomi dei file
  const documentsRoznovanu = [
    { title: 'Land Book Extract', filename: 'Land Book Extract', type: 'pdf', buildingName: 'Roznovanu' },
    { title: 'Electricity Affected Areas', filename: 'Electricity', type: 'pdf', buildingName: 'Roznovanu' },
    { title: 'Ventilation Affected Areas', filename: 'Ventilation', type: 'pdf', buildingName: 'Roznovanu' },
    { title: 'Physical security risk assessment and treatment report', filename: 'Physical security risk assessment and treatment report', type: 'pdf', buildingName: 'Roznovanu' },
    { title: 'DHS Schema', filename: 'DHS Schema', type: 'pdf', buildingName: 'Roznovanu' }
  ];

  const documentsDubetPiramyd = [
    { title: 'Land Book Extract', filename: 'Land Book Extract', type: 'pdf', buildingName: 'DubetPiramyd' },
    { title: 'Electricity Affected Areas', filename: 'Electricity', type: 'pdf', buildingName: 'DubetPiramyd' },
    { title: 'Ventilation Affected Areas', filename: 'Ventilation', type: 'pdf', buildingName: 'DubetPiramyd' },
    { title: 'DHS Schema', filename: 'DHS Schema', type: 'pdf', buildingName: 'DubetPiramyd' }
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
        <Grid container direction="column" alignItems="center" spacing={3}>

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
          {building === "Dubet Pyramid" && (
            <>
              <Grid container spacing={4} columns={16} alignItems="center" justifyContent="center">
                {documentsDubetPiramyd.map((doc) => (
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
                        <ViewPdfApiButton filename={doc.filename} pilot={pilot} building={doc.buildingName} />
                      ) : (
                        <DownloadButton filename={doc.filename} pilot={pilot} />
                      )}
                    </Grid>

                    {/* Upload Button */}
                    <Grid item xs={12} sm={4}>
                      <UploadButton fileType={doc.type} keyword={doc.filename} pilot={pilot} building={doc.buildingName} />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {building === "Roznovanu" && (
            <>
              <Grid container spacing={4} columns={16} alignItems="center" justifyContent="center">
                {documentsRoznovanu.map((doc) => (
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
                        <ViewPdfApiButton filename={doc.filename} pilot={pilot} building={doc.buildingName} />
                      ) : (
                        <DownloadButton filename={doc.filename} pilot={pilot} />
                      )}
                    </Grid>

                    {/* Upload Button */}
                    <Grid item xs={12} sm={4}>
                      <UploadButton fileType={doc.type} keyword={doc.filename} pilot={pilot} building={doc.buildingName} />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};
