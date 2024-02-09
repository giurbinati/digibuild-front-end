import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { OBJModel } from 'react-3d-viewer'

import DownloadButtonGBXML from '../components/downloadButtonXMl'
import DownloadButtonFile from '../components/downloadButtonFile'
import VisualizationGBXML from '../components/VisualizationGBXML';

export default function Home({ setList, list }) {

  return (

    <Box sx={{ flexGrow: 1, minHeight: "78vh", marginTop: "1vh", marginBottom: "1vh" }}>
      <Paper elevation={0} sx={{ textAlign: "center", marginBottom: "1rem" }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontWeight: 700, marginTop: "1vh", padding: "1%" }}>
            Design and plans of the building
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="xl" sx={{ marginBottom: "1vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <DownloadButtonFile />
            </Grid>
          </Grid>
        </Box>
      </Container>
        {/* <Box>
          <Grid container spacing={2} justifyContent="center">
            <OBJModel
              src="/BIM_KYT_ARK_OPT_IFC4_brg.obj"
              width={800}
              height={800}
            />
          </Grid>
        </Box> */}
      <Paper elevation={0} sx={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ color: "rgb(42, 182, 131)", fontFamily: "Poppins, Roboto", fontWeight: 700, marginTop: "1vh", padding: "1%" }}>
            BIM
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="xl" sx={{ marginBottom: "1vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
              <VisualizationGBXML />
          </Grid>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ marginBottom: "3vh", padding: "2%" }}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <DownloadButtonGBXML />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
