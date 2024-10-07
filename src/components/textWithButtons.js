import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import ViewPdfButton from './viewPdfApiButton'; 
import UploadButton from './uploadButton';

export default function TextWithButtons({ documents, floor }) {
    // Filtra i documenti per il piano specificato
    const filteredDocuments = documents.filter(doc => doc.floor === floor.toString());

    return (
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
            <Grid container spacing={4}>
                {filteredDocuments.map((doc, index) => (
                    <Grid item xs={12} key={index} container justifyContent="space-between" alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="h6">{doc.title}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <ViewPdfButton filename={doc.filename} />
                        </Grid>
                        <Grid item xs={4}>
                            <UploadButton fileType={doc.type} keyword={doc.filename} />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}
