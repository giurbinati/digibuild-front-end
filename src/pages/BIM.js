import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import VisualizationGBXML from '../components/VisualizationGBXML';
import DownloadButton from '../components/downloadButton'

export default function BIM() {

    const bim = process.env.REACT_APP_API_FVH_BIM

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
                        <VisualizationGBXML />
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginBottom: "3vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <DownloadButton downloadUrl={bim} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};
