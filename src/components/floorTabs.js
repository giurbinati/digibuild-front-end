
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import TextWithButtons from './textWithButtons';

export default function AccordionWithTable() {

    const documents = [
        { title: 'Section A', filename: 'Floor 0 Section A', type: 'pdf', floor: '0' },
        { title: 'Section B', filename: 'Floor 0 Section B', type: 'pdf', floor: '0' },
        { title: 'Section C', filename: 'Floor 0 Section C', type: 'pdf', floor: '0' },
        { title: 'Section A', filename: 'Floor 1 Section A', type: 'pdf', floor: '1' },
        { title: 'Section B', filename: 'Floor 1 Section B', type: 'pdf', floor: '1' },
        { title: 'Section C', filename: 'Floor 1 Section C', type: 'pdf', floor: '1' },
        { title: 'Section A', filename: 'Floor 2 Section A', type: 'pdf', floor: '2' },
        { title: 'Section B', filename: 'Floor 2 Section B', type: 'pdf', floor: '2' },
        { title: 'Section C', filename: 'Floor 2 Section C', type: 'pdf', floor: '2' },
        { title: 'Section A', filename: 'Floor 3 Section A', type: 'pdf', floor: '3' },
        { title: 'Section B', filename: 'Floor 3 Section B', type: 'pdf', floor: '3' },
        { title: 'Section C', filename: 'Floor 3 Section C', type: 'pdf', floor: '3' },
        { title: 'Section A', filename: 'Floor 4 Section A', type: 'pdf', floor: '4' },
        { title: 'Section B', filename: 'Floor 4 Section B', type: 'pdf', floor: '4' },
        { title: 'Section C', filename: 'Floor 4 Section C', type: 'pdf', floor: '4' },
        { title: 'Section A', filename: 'Floor 5 Section A', type: 'pdf', floor: '5' },
        { title: 'Section B', filename: 'Floor 5 Section B', type: 'pdf', floor: '5' },
        { title: 'Section C', filename: 'Floor 5 Section C', type: 'pdf', floor: '5' },
        { title: 'Section A', filename: 'Floor 6 Section A', type: 'pdf', floor: '6' },
        { title: 'Section B', filename: 'Floor 6 Section B', type: 'pdf', floor: '6' },
        { title: 'Section C', filename: 'Floor 6 Section C', type: 'pdf', floor: '6' },
        { title: 'Section A', filename: 'Floor 7 Section A', type: 'pdf', floor: '7' },
        { title: 'Section B', filename: 'Floor 7 Section B', type: 'pdf', floor: '7' },
        { title: 'Section C', filename: 'Floor 7 Section C', type: 'pdf', floor: '7' },
    ];

    const accordionItemStyle = {
        minHeight: '5vh', // Altezza minima delle righe dell'accordione impostata a 60px
        fontSize: '2.5ch',
    };

    return (
        <div>
            {[...Array(8).keys()].map(floor => ( // Create 8 accordion sections for floors 0 to 7
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
                        <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons documents={documents} floor={floor} />
                            </Grid>
                        </Container>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
