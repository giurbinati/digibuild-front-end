import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import TextWithButtons from './textWithButtons';

export default function AccordionWithTableIASIRoznovanu() {

    const documentsRoznovanu = [
        { title: 'Floor -1', filename: 'Floor -1', type: 'pdf', buildingName: 'Roznovanu', floor: '-1' },
        { title: 'Floor 0', filename: 'Floor 0', type: 'pdf', buildingName: 'Roznovanu', floor: '0' },
        { title: 'Floor 1', filename: 'Floor 1', type: 'pdf', buildingName: 'Roznovanu', floor: '1' },
        { title: 'Floor 2', filename: 'Floor 2', type: 'pdf', buildingName: 'Roznovanu', floor: '2' },
    ];

    const accordionItemStyle = {
        minHeight: '5vh', // Altezza minima delle righe dell'accordione impostata a 60px
        fontSize: '2.5ch',
    };

    return (
        <div>
            {[-1, 0, 1, 2].map(floor => ( // Includiamo anche il piano -1
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
                                <TextWithButtons documents={documentsRoznovanu} floor={floor} />
                            </Grid>
                        </Container>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
