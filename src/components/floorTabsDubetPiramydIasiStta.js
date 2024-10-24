
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import TextWithButtons from './textWithButtons';

export default function AccordionWithTableIASIDubet() {

    const documentsDubet = [
        { title: 'Floor 0', filename: 'Floor 0', type: 'pdf', buildingName: 'DubetPiramyd', floor: '0' },
        { title: 'Floor 1', filename: 'Floor 1', type: 'pdf', buildingName: 'DubetPiramyd', floor: '1' },
        { title: 'Floor 2', filename: 'Floor 2', type: 'pdf', buildingName: 'DubetPiramyd', floor: '2' },
        { title: 'Floor 3', filename: 'Floor 3', type: 'pdf', buildingName: 'DubetPiramyd', floor: '3' },
        { title: 'Floor 4', filename: 'Floor 4', type: 'pdf', buildingName: 'DubetPiramyd', floor: '4' },
        { title: 'Floor 5', filename: 'Floor 5', type: 'pdf', buildingName: 'DubetPiramyd', floor: '5' },
        { title: 'Floor 6', filename: 'Floor 6', type: 'pdf', buildingName: 'DubetPiramyd', floor: '6' },
    ];

    const accordionItemStyle = {
        minHeight: '5vh', // Altezza minima delle righe dell'accordione impostata a 60px
        fontSize: '2.5ch',
    };

    return (
        <div>
            {[...Array(7).keys()].map(floor => ( 
                <Accordion key={floor}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${floor}-content`}
                        id={`panel${floor}-header`}
                        sx={accordionItemStyle}
                    >
                        Floor {floor}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%", width: "80vh" }}>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons documents={documentsDubet} floor={floor} />
                            </Grid>
                        </Container>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
