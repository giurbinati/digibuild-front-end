import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';

import AuthService from '../services/auth';
import UploadButton from '../components/uploadButton'
import DownloadButton from '../components/downloadButton'

export default function Home({ setList, list }) {
    const [values, setValues] = useState({
        "Material 1 - Type": "Descriptive",
        'Material 1 - Location': "Physical",
        'Material 1 - Volume': "Physical",
        'Material 1 - Weight': "Physical",
        'Material 1 - Embodied carbon': "Physical",
        'Material 1 - Life span': "Physical",
        'Material 1 - Fire resistance class': "Rating",
        'Material 1 - Waste category': "Code",
        'Material 1 - Certificate 1': "Linked document",
        'Material 1 - Chemical declaration': "Linked document",
        'Material 1 - Global Trade Item Number': "Linked document",
        "Material 2 - Type": "Descriptive",
        'Material 2 - Location': "Physical",
        'Material 2 - Volume': "Physical",
        'Material 2 - Weight': "Physical",
        'Material 2 - Embodied carbon': "Physical",
        'Material 2 - Life span': "Physical",
        'Material 2 - Fire resistance class': "Rating",
        'Material 2 - Waste category': "Code",
        'Material 2 - Certificate 1': "Linked document",
        'Material 2 - Chemical declaration': "Linked document",
        'Material 2 - Global Trade Item Number': "Linked document"
    });

    function getRandom(max) {
        return (Math.random() * max);
    }

    /* useEffect(() => {
        setTimeout(() => {
            setValues({
                "Material 1 - Type": 0,
                'Material 1 - Location': 0,
                'Material 1 - Volume': 0,
                'Material 1 - Weight': 0,
                'Material 1 - Embodied carbon': 0,
                'Material 1 - Life span': 0,
                'Material 1 - Fire resistance class': 0,
                'Material 1 - Waste category': 0,
                'Material 1 - Certificate 1': 0,
                'Material 1 - Chemical declaration': 0,
                'Material 1 - Chemical declaration': 0,
                'Material 1 - Global Trade Item Number': 0
            });
        }, 2000);
        // Update count to be 5 after timeout is scheduled
        //console.log(Object.keys(values));
    }, [values]); */


    const table = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#38ACEC", fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(values).map((row) => (
                            <TableRow
                                key={row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row}
                                </TableCell>
                                <TableCell align="right">{values[row]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }


    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
            <Container maxWidth="xl" >
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {/* <Grid item>
                            <UploadButton />
                        </Grid> */}
                        <Grid item>
                            <DownloadButton />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "3%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }} */>
                    <Grid container spacing={2} justifyContent="center">
                        {table()}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );

}