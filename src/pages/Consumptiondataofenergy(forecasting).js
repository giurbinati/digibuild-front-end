import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import getDataForecastingFVH from '../services/getDataForecastingFVH';
import Chart from '../components/chart'
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { Alert } from '@mui/material';


export default function Home() {
    const [section, setSection] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [valueTotal, setValueTotal] = useState([]);
    const [valueSection, setValueSection] = useState([]);
    const [valueFloor, setValueFloor] = useState(null);
    const [timeStamp, setTimeStamp] = useState(null);
    const [timeStampFloor, setTimeStampFloor] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingTotal, setLoadingTotal] = useState(false);
    const [loadingSection, setLoadingSection] = useState(false);
    const [errorTotal, setErrorTotal] = useState(null);
    const [errorSection, setErrorSection] = useState(null);
    const [error, setError] = useState(null);

    const handleChangeSection = (event) => {
        const selectedSection = event.target.value; // Get the selected value
        setSection(selectedSection);
        // If "None" is selected, reset the floor state
        if (selectedSection === '') {
            setFloor(''); // Reset floor to None
        }
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

    // Funzioni di fetch aggiornate
    const fetchDataForecastingTotal = async () => {
        try {
            const data = await getDataForecastingFVH.GetDataForecasting();
            console.log('1', data);
            console.log('2', data.Total);
            const dataTotal = data.Total.Total;
            const timestamps = dataTotal.map(item => Object.keys(item)[0]); // Ottieni tutte le chiavi (i timestamp)
            const values = dataTotal.map(item => Object.values(item)[0]); // Ottieni tutti i valori
            const valuesA = data.Sections.A.map(item => Object.values(item)[0]);  // Valori di A
            const valuesB = data.Sections.B.map(item => Object.values(item)[0]);  // Valori di B
            const valuesC = data.Sections.C.map(item => Object.values(item)[0]);  // Valori di C
            setValueSection([
                {
                    label: 'Section A',
                    data: valuesA,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                },
                {
                    label: 'Section B',
                    data: valuesB,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                },
                {
                    label: 'Section C',
                    data: valuesC,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)'
                }
            ]);
            // Aggiorna gli stati per il grafico
            setTimeStamp(timestamps);
            setValueTotal(values);
            console.log('4', valueSection)
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorTotal('An error occurred while loading data in Total.'); // Imposta il messaggio di errore
            setErrorSection('An error occurred while loading data in Section.');
        } finally {
            setLoadingTotal(false); // Set loading to false after fetching
            setLoadingSection(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setErrorTotal('');
            setErrorSection('')
            setLoadingTotal(true); // Attiva il caricamento per il totale
            setLoadingSection(true); // Attiva il caricamento per le sezioni

            // Esegui le due chiamate in parallelo
            fetchDataForecastingTotal(); // Non usare await
            //fetchDataForecastingSection(); // Non usare await
        };
        fetchData();
    }, []);

    async function fetchDataForecasting() {
        try {
            const data = await getDataForecastingFVH.GetDataForecasting(section, floor, room);
            console.log(data);
            const datasets = {};
            const keys = Object.keys(data);
            const colors = [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(255, 192, 203, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(128, 128, 128, 1)',
                'rgba(128, 0, 128, 1)'
            ];

            keys.forEach((key, index) => {
                const values = data[key].map(item => Object.values(item)[0]);
                datasets[`Floor ${index}`] = {
                    label: `Floor ${index}`,
                    data: values,
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
                };
            });

            setValueFloor(Object.values(datasets));
            setTimeStampFloor(timeStamp)
        } catch (error) {
            console.error('Fetch error:', error);
            setError('An error occurred while loading data in Floor.');
            throw error;
        } finally {
            setLoading(false);
        }
    }


    const handleSearchClick = () => {
        // Validate selections
        if (section == '') {
            setValueFloor(null);
            setErrorMessage('Please select at least one of Section.'); // Set error message

        } else {
            setErrorMessage(''); // Clear error message
            setLoading(true);
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
                {/* Grid item per i nuovi due Chart in una singola riga */}
                <Grid container spacing={4} justifyContent="center" sx={{ marginBottom: '3vh' }}>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                        {loadingTotal ? (
                            <CircularProgress
                                size={120}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1,
                                }}
                            />
                        ) : (
                            <Chart
                                labels={timeStamp}
                                data={valueTotal}
                                datasetLabel={'Energy consumption (Kw)'}
                                chartTitle="Total"
                                yAxisUnit="kW"
                            />
                        )}

                        {errorTotal && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorTotal(null)}>
                                    {errorTotal}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                        {loadingSection ? (
                            <CircularProgress
                                size={120}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1,
                                }}
                            />
                        ) : (
                            <Chart
                                labels={timeStamp}
                                datasets={valueSection}
                                datasetLabel={''}
                                chartTitle="Section"
                                yAxisUnit="kW"
                            />
                        )}

                        {errorSection && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorSection(null)}>
                                    {errorSection}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Grid>

                {!loadingTotal && !loadingSection && ( // Condizione per visualizzare le Select, il Bottone e il Grafico
                    <Grid container direction="column" alignItems="center">
                        {/* Section Select */}
                        <Grid item xs={12}>
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
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value={'A'}>A</MenuItem>
                                        <MenuItem value={'B'}>B</MenuItem>
                                        <MenuItem value={'C'}>C</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                            <Box>
                                <Grid container direction="column" alignItems="center">
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#057BBE',
                                                padding: '1vh 2vh',
                                                minWidth: '20vh',
                                                fontSize: '2ch',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: '2vh',
                                                textAlign: 'center',
                                                marginBottom: '3vh',
                                            }}
                                            onClick={handleSearchClick}
                                        >
                                            Search
                                        </Button>
                                    </Grid>
                                    {errorMessage && (
                                        <Grid item xs={12}>
                                            <Typography color="error" variant="body1" sx={{ marginTop: '1vh', color: 'red' }}>
                                                {errorMessage}
                                            </Typography>
                                        </Grid>
                                    )}

                                    <Grid item xs={12} sx={{ position: 'relative', width: '100%' }}>
                                        {/* Condizione per visualizzare il caricamento o il grafico */}
                                        {loading ? (
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '400px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
<<<<<<< Updated upstream
                                            >
                                                <CircularProgress size={120} />
                                            </Box>
                                        ) : (
=======
                                            />
                                        ) : (valueFloor && (
>>>>>>> Stashed changes
                                            <Chart
                                                labels={timeStampFloor}
                                                datasets={valueFloor} // This can be empty
                                                datasetLabel={''}
                                                chartTitle="Floor"
                                                yAxisUnit="kW"
                                                style={{ position: 'relative' }}
                                            />)
                                        )}

                                        {error && (
                                            <Grid item xs={12}>
                                                <Alert severity="error" onClose={() => setError(null)}>
                                                    {error}
                                                </Alert>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </Grid>
                )}
            </Container>
        </Box>
    );
}