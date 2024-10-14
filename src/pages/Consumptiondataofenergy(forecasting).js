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
    const [timeStampTotal, setTimeStampTotal] = useState([]);
    const [valueTotal, setValueTotal] = useState([]);
    const [timeStampSection, setTimeStampSection] = useState([]);
    const [valueSection, setValueSection] = useState([]);
    const [valueSectionA, setValueSectionA] = useState([]);
    const [valueSectionB, setValueSectionB] = useState([]);
    const [valueSectionC, setValueSectionC] = useState([]);
    const [timeStamp, setTimeStamp] = useState([]);
    const [value, setValue] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingTotal, setLoadingTotal] = useState(false);
    const [loadingSection, setLoadingSection] = useState(false);
    const [errorTotal, setErrorTotal] = useState(null);
    const [errorSection, setErrorSection] = useState(null);
    const [error, setError] = useState(null);

    console.log('YourComponent mounted');

    useEffect(() => {
        // Log quando il componente viene montato
        console.log('useEffect triggered');

        // Log per verificare se il componente viene smontato
        return () => {
            console.log('YourComponent unmounted');
        };
    }, []);

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
            const timestamps = dataTotal.map(item => item.timestamp); // Ottieni tutte le chiavi (i timestamp)
            const values = dataTotal.map(item => item.value); // Ottieni tutti i valori
            const valuesA = data.Sections.A.map(item => item.value);  // Valori di A
            const valuesB = data.Sections.B.map(item => item.value);  // Valori di B
            const valuesC = data.Sections.C.map(item => item.value);  // Valori di C
            setValueSection([
                { label: 'Dataset 1', data: valuesA },
                { label: 'Dataset 2', data: valuesB },
                { label: 'Dataset 3', data: valuesC }
            ]);
            setValueSectionA(valuesA);
            setValueSectionB(valuesB);
            setValueSectionC(valuesC);
            // Aggiorna gli stati per il grafico
            setTimeStampTotal(timestamps);
            setTimeStampSection(timestamps);
            setValueTotal(values);
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorTotal('An error occurred while loading data in Total.'); // Imposta il messaggio di errore
            setErrorSection('An error occurred while loading data in Section.');
        } finally {
            setLoadingTotal(false); // Set loading to false after fetching
            setLoadingSection(false); // Set loading to false after fetching
        }
    };

    // non necessaria
   /*  const fetchDataForecastingSection = async () => {
        try {
            const data = await getDataForecastingFVH.GetDataForecasting();
            console.log('3', data);
            console.log('4', data.Sections);
            const timestamps = data.Sections.A.map(item => item.timestamp); // Ottieni tutte le chiavi (i timestamp)
            const valuesA = data.Sections.A.map(item => item.value);  // Valori di A
            const valuesB = data.Sections.B.map(item => item.value);  // Valori di B
            const valuesC = data.Sections.C.map(item => item.value);  // Valori di C
            // Aggiorna gli stati per il grafico
            setTimeStampSection(timestamps);
            setValueSection([
                { label: 'Dataset 1', data: valuesA },
                { label: 'Dataset 2', data: valuesB },
                { label: 'Dataset 3', data: valuesC }
            ]);
            setValueSectionA(valuesA);
            setValueSectionB(valuesB);
            setValueSectionC(valuesC);
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorSection('An error occurred while loading data in Section.');
        } finally {
            setLoadingSection(false); // Set loading to false after fetching
        }
    }; */

    useEffect(() => {
        const fetchData = async () => {
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
            setLoading(true);
            const data = await getDataForecastingFVH.GetDataForecasting(section, floor, room);
            const timestamps = data.map(item => Object.keys(item)[0]); // Ottieni tutte le chiavi (i timestamp)
            const values = data.map(item => Object.values(item)[0]); // Ottieni tutti i valori
            // Aggiorna gli stati per il grafico
            setTimeStamp(timestamps);
            setValue(values);
        } catch (error) {
            console.error('Fetch error:', error);
            setError('An error occurred while loading data in Floor.')
            throw error; // Rilancia l'errore per la gestione nel componente
        } finally {
            setLoading(false); // Set loading to false after fetching
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
                {/* Grid item per i nuovi due Chart in una singola riga */}
                <Grid container spacing={4} justifyContent="center" sx={{ marginBottom: '3vh' }}>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                        {loadingTotal && (
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
                        )}
                        <Chart
                            labels={timeStampTotal}
                            data={valueTotal}
                            datasetLabel={'Energy consumption (Kw)'}
                            chartTitle="Total"
                        />
                        {errorTotal && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorTotal(null)}>
                                    {errorTotal}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                        {/* Spinner per il caricamento dentro il grafico a destra */}
                        {loadingSection && (
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
                        )}
                        <Chart
                            labels={timeStampSection}
                            data={valueSection}
                            datasetLabel={'Energy consumption (Kw)'}
                            chartTitle="Section"
                        />
                        {errorSection && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorSection(null)}>
                                    {errorSection}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                {/* Sezione delle Select */}
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
                                    <MenuItem value="">None</MenuItem>
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
                                    <MenuItem value="">None</MenuItem>
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
                </Grid>
            </Container>

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
                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Typography color="error" variant="body1" sx={{ marginTop: '1vh', color: 'red' }}>
                                        {errorMessage}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ position: 'relative', width: '100%' }}>
                            {/* Spinner per caricamento dentro il grafico */}
                            {loading && (
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
                            )}
                            <Chart
                                labels={timeStamp}
                                data={value}
                                datasetLabel={'Energy consumption (Kw)'}
                                chartTitle="Floor"
                                style={{ position: 'relative' }}
                            />
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
        </Box>
    );

}