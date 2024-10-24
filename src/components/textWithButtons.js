import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import ViewPdfButton from './viewPdfApiButton'; 
import UploadButton from './uploadButton';

export default function TextWithButtons({ documents, floor }) {
    const [pilot, setPilot] = useState(null);

    // Filter documents for the specified floor
    const filteredDocuments = documents.filter(doc => doc.floor === floor.toString());

    useEffect(() => {
        const storedPilot = sessionStorage.getItem("PILOT");
        if (storedPilot) {
            setPilot(storedPilot);
            console.log(pilot);
        }
    }, [pilot]);

    return (
        <Paper
            sx={{
                backgroundColor: 'rgba(147, 208, 167, 0.4)',
                padding: '2%',
                width: '70vh',
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
                            <ViewPdfButton
                                filename={doc.filename}
                                pilot={pilot}
                                {...(doc.buildingName && { building: doc.buildingName })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <UploadButton
                                fileType={doc.type}
                                keyword={doc.filename}
                                pilot={pilot}
                                {...(doc.buildingName && { building: doc.buildingName })}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}
