import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getDataForecastingFVH from '../services/getDataForecastingFVH';
import Chart from '../components/chart'
import { Button } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function Home() {
    const [dataForecasting, setDataForecasting] = useState()
    const [section, setSection] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [timeStamp, setTimeStamp] = useState([]);
    const [value, setValue] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    const handleChangeSection = (event) => {
        setSection(event.target.value);
    };
    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };
    const handleChangeRoom = (event) => {
        setRoom(event.target.value);
    };

    const roomOptions = [
        'JKA0.1', 'JKA0.2', 'JKA1', 'JKA1.2_1', 'JKA1.2_2', 'JKA2', 'JKA2.1', 'JKA2.2', 'JKA3', 'JKA3.1', 'JKA3.2',
        'JKA4', 'JKA4.1', 'JKA4.2', 'JKA5', 'JKA5.1', 'JKA5.2', 'JKA6', 'JKA6.1', 'JKA6.2', 'JKA7.1', 'JKA7.2',
        'JKB0.1', 'JKB1', 'JKB1.1', 'JKB1.2', 'JKB1.3', 'JKB2', 'JKB2.1', 'JKB2.2', 'JKB2.3', 'JKB3', 'JKB3.1',
        'JKB3.2', 'JKB4', 'JKB4.1', 'JKB4.2', 'JKB5', 'JKB5.1', 'JKB5.2', 'JKB6', 'JKB6.1', 'JKB6.2', 'JKB7.2',
        'JKB7.3', 'JKC0.0', 'JKC0.1', 'JKC0.2', 'JKC0.3', 'JKC1', 'JKC1.1', 'JKC1.2', 'JKC2', 'JKC2.1', 'JKC2.2',
        'JKC3', 'JKC3.1', 'JKC3.2', 'JKC4', 'JKC4.1', 'JKC4.2', 'JKC5', 'JKC5.1', 'JKC5.2', 'JKC6', 'JKC6.1',
        'JKC6.2', 'JKC7.1', 'JKC7.2'
    ];

    async function fetchDataForecasting() {
        try {
            const data = await getDataForecastingFVH.GetDataForecasting(section, floor, room);
            setDataForecasting(data);
            const timestamps = data.map(item => Object.keys(item)[0]); // Ottieni tutte le chiavi (i timestamp)
            const values = data.map(item => Object.values(item)[0]); // Ottieni tutti i valori
            // Aggiorna gli stati per il grafico
            setTimeStamp(timestamps);
            setValue(values);
        } catch (error) {
            console.error('Fetch error:', error);
            throw error; // Rilancia l'errore per la gestione nel componente
        }
    }
    const handleSearchClick = () => {
        // Validate selections
        if (floor == '' && section == '') {
            setErrorMessage('Please select at least one of Section or Floor.'); // Set error message
        } else {
            setErrorMessage(''); // Clear error message
            fetchDataForecasting(); // Call fetch function if validation passes
        }
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                minHeight: '78vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                {/* Grid item per il Paper contenente la Tabella e il Bottone */}
                <Grid container spacing={8} justifyContent="center">
                    {/* Section Select */}
                    <Grid item xs={12} sm={2}>
                        <Box sx={{ minWidth: 120, marginTop: '3vh' }}>
                            <FormControl fullWidth>
                                <InputLabel id="section-select-label">Section</InputLabel>
                                <Select
                                    labelId="section-select-label"
                                    id="section-select"
                                    value={section}
                                    label="Section"
                                    onChange={handleChangeSection}
                                >
                                    <MenuItem value={'A'}>A</MenuItem>
                                    <MenuItem value={'B'}>B</MenuItem>
                                    <MenuItem value={'C'}>C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    {/* Floor Select */}
                    <Grid item xs={12} sm={2}>
                        <Box sx={{ minWidth: 120, marginTop: '3vh' }}>
                            <FormControl fullWidth>
                                <InputLabel id="floor-select-label">Floor</InputLabel>
                                <Select
                                    labelId="floor-select-label"
                                    id="floor-select"
                                    value={floor}
                                    label="Floor"
                                    onChange={handleChangeFloor}
                                    disabled={!section}
                                >
                                    <MenuItem value={'0'}>0</MenuItem>
                                    <MenuItem value={'1'}>1</MenuItem>
                                    <MenuItem value={'2'}>2</MenuItem>
                                    <MenuItem value={'3'}>3</MenuItem>
                                    <MenuItem value={'4'}>4</MenuItem>
                                    <MenuItem value={'5'}>5</MenuItem>
                                    <MenuItem value={'6'}>6</MenuItem>
                                    <MenuItem value={'7'}>7</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    {/*  <Grid item xs={12} sm={2}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="room-select-label">Room</InputLabel>
                                <Select
                                    labelId="room-select-label"
                                    id="room-select"
                                    value={room}
                                    label="Room"
                                    onChange={handleChangeRoom}
                                    MenuProps={MenuProps}
                                >
                                    {roomOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid> */}
                </Grid>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#057BBE',
                                    padding: '1vh 2vh', // Padding verticale e orizzontale
                                    minWidth: '20vh', // Larghezza minima per mantenere la dimensione minima del bottone
                                    fontSize: '2ch',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '2vh', // Aggiunto margine superiore per distanziare il pulsante dalla tabella
                                    textAlign: 'center', // Centra il testo verticalmente
                                    marginBottom: '3vh',
                                }}
                                onClick={handleSearchClick}> Search</Button>
                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Typography color="error" variant="body1" sx={{ marginTop: '1vh', color: 'red' }}>
                                        {errorMessage}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Chart labels={timeStamp} data={value} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );

}