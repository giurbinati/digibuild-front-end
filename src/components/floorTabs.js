
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
    const urlsForFloor0 = {
        urlSectionA: 'https://cloud2.digibuild-project.com/file/c4286a0b-20aa-4c68-9471-d3b33a0e842a/download',
        urlSectionB: 'https://cloud2.digibuild-project.com/file/4ae2b1c2-b9e2-459b-9db1-e8bbcf079246/download',
        urlSectionC: 'https://cloud2.digibuild-project.com/file/2eab78fe-e88d-4f48-ba19-78491d6eae87/download',
    };

    const urlsForFloor1 = {
        urlSectionA: 'https://cloud2.digibuild-project.com/file/f3b2d314-da87-4186-a2cf-2368f2824aa2/download',
        urlSectionB: 'https://cloud2.digibuild-project.com/file/b47289e3-872f-43b1-b355-73c5bd2cb76e/download',
        urlSectionC: 'https://cloud2.digibuild-project.com/file/5af6eff2-5ace-4396-833b-764528d08e9c/download',
    };
    const urlsForFloor2 = {
        urlSectionA: 'Link',
        urlSectionB: 'Link',
        urlSectionC: 'link',
    };
    const urlsForFloor3 = {
        urlSectionA: 'Link',
        urlSectionB: 'Link',
        urlSectionC: 'link',
    };
    const urlsForFloor4 = {
        urlSectionA: 'Link',
        urlSectionB: 'Link',
        urlSectionC: 'link',
    };
    const urlsForFloor5 = {
        urlSectionA: 'Link',
        urlSectionB: 'Link',
        urlSectionC: 'link',
    };
    const urlsForFloor6 = {
        urlSectionA: 'Link',
        urlSectionB: 'Link',
        urlSectionC: 'link',
    };
    const urlsForFloor7 = {
        urlSectionA: 'Link',
        urlSectionB: 'Link',
        urlSectionC: 'link',
    };

    const accordionItemStyle = {
        minHeight: '5vh', // Altezza minima delle righe dell'accordione impostata a 60px
        fontSize: '2.5ch',
    };

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 0
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor0} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 1
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor1} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 2
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor2} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 3
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor3} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 4
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor4} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 5
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor5} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 6
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor6} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={accordionItemStyle}
                >
                    Floor 7
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                            <Grid container spacing={2} justifyContent="center">
                                <TextWithButtons urls={urlsForFloor7} />
                            </Grid>
                        </Box>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
