import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import FloorTabs from '../components/floorTabs'
export default function DesignAndPlansOfTheBuilding() {

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
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <FloorTabs />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
