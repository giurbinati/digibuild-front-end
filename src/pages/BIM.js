import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import VisualizationGBXML from '../components/VisualizationGBXML';
import DownloadButton from '../components/downloadButton'
import UploadButton from '../components/uploadButton';

export default function BIM() {

    const documents = { title: 'BIM', filename: 'BIM', type: 'document' };

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
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item>
                            <VisualizationGBXML />
                        </Grid>
                        <Grid item container justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: "2vh" }}>
                            <Grid item>
                                <DownloadButton filename={documents.filename} />
                            </Grid>
                            <Grid item>
                                <UploadButton keyword={documents.filename} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};
