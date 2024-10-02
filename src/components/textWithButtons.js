import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import ViewPdfApiButton from './viewPdfApiButton'; // Assumo che il componente del bottone sia già creato

const TextWithButtons = ({ urls }) => {
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
            <Grid container spacing={4} columns={16} alignItems="center" justify="center" alignContent="center">
                <Grid item xs={8}>
                    <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>
                        Section A
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <ViewPdfApiButton apiUrl={urls.urlSectionA} />
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>
                        Section B
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <ViewPdfApiButton apiUrl={urls.urlSectionB} />
                </Grid>

                <Grid item xs={8}>
                    <Typography variant="h6" style={{ textAlign: 'center', fontSize: '3ch' }}>
                        Section C
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <ViewPdfApiButton apiUrl={urls.urlSectionC} />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TextWithButtons;
