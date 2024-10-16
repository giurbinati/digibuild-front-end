import React, { useEffect, useState, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chart from '../components/chart'
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { Alert } from '@mui/material';

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_Eletricity = config.host + "/historicalData";
const API_URL_Heating = config.host + "/historicalDataHeating";
const API_URL_Cooling = config.host + "/historicalDataCooling";

export default function ConsumptionDataOfEnergyHistorical() {

    const [selectedDateEletricityStart, setSelectedDateEletricityStart] = useState(null);
    const [selectedDateEletricityEnd, setSelectedDateEletricityEnd] = useState(null);
    const [selectedDateHeatingStart, setSelectedDateHeatingStart] = useState(null);
    const [selectedDateHeatingEnd, setSelectedDateHeatingEnd] = useState(null);
    const [selectedDateCoolingStart, setSelectedDateCoolingStart] = useState(null);
    const [selectedDateCoolingEnd, setSelectedDateCoolingEnd] = useState(null);
    const [electricityTimeStamp, setElectricityTimeStamp] = useState(null)
    const [electricityValue, setElectricityValue] = useState(null)
    const [heatingTimeStamp, setHeatingTimeStamp] = useState(null)
    const [heatingValue, setHeatingValue] = useState(null)
    const [coolingTimeStamp, setCoolingTimeStamp] = useState(null)
    const [coolingValue, setCoolingValue] = useState(null)
    const [loadingCooling, setLoadingCooling] = useState(false);
    const [loadingElectricity, setLoadingElectricity] = useState(false);
    const [loadingHeating, setLoadingHeating] = useState(false);
    const [errorCooling, setErrorCooling] = useState(null);
    const [errorElectricity, setErrorElectricity] = useState(null);
    const [errorHeating, setErrorHeating] = useState(null);

    const handleDateChangeEletricityStart = (dateEletricityStart) => {
        setSelectedDateEletricityStart(dateEletricityStart);
    };
    const handleDateChangeEletrecityEnd = (dateEletricityEnd) => {
        setSelectedDateEletricityEnd(dateEletricityEnd);
    };
    const handleDateChangeHeatingStart = (dateHeatingStart) => {
        setSelectedDateHeatingStart(dateHeatingStart);
    };
    const handleDateChangeHeatingEnd = (dateHeatingEnd) => {
        setSelectedDateHeatingEnd(dateHeatingEnd);
    };
    const handleDateChangeCoolingStart = (dateCoolingStart) => {
        setSelectedDateCoolingStart(dateCoolingStart);
    };
    const handleDateChangeCoolingEnd = (dateCoolingEnd) => {
        setSelectedDateCoolingEnd(dateCoolingEnd);
    };

    const handleSubmitClickElectricity = async () => {
        try {
            setLoadingElectricity(true);
            const dataFormattedStartElectricity = selectedDateEletricityStart.format('YYYYMMDDHHmm');
            const dataFormattedEndElectricity = selectedDateEletricityEnd.format('YYYYMMDDHHmm');
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");

            const response = await fetch(API_URL_Eletricity, {
                method: "POST", // Use POST to include body
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    startDate: dataFormattedStartElectricity,
                    endDate: dataFormattedEndElectricity,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            console.log(responseData);

            let tempDateTimeElectricity = [];
            let tempValueElectricity = [];
            let electricity = responseData.query[0];

            electricity.forEach((element) => {
                tempDateTimeElectricity.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                tempValueElectricity.push(element[1]);
            });

            setElectricityTimeStamp(tempDateTimeElectricity);
            setElectricityValue(tempValueElectricity);
        } catch (error) {
            console.log(error);
            setErrorElectricity('An error occurred while loading historical data electricity.')
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
        finally {
            setLoadingElectricity(false);
        }
    };

    const handleSubmitClickHeating = async () => { // Funzione per riempire il chart con il bottone di ricerca
        try {
            setLoadingHeating(true);
            // Format the dates to send
            const dataFormattedStartHeating = selectedDateHeatingStart.format('YYYYMMDDHHmm');
            const dataFormattedEndHeating = selectedDateHeatingEnd.format('YYYYMMDDHHmm');

            // Retrieve the token from session storage
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");
            //console.log(token);

            // Make the POST request with the formatted dates
            const response = await fetch(API_URL_Heating, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`, // Aggiungi il token nel campo Authorization
                },
                body: JSON.stringify({
                    startDate: dataFormattedStartHeating,
                    endDate: dataFormattedEndHeating
                }), // Send dates in the body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            console.log(responseData);

            let tempDateTimeHeating = [];
            let tempValueHeating = [];
            let heating = responseData.query[0]; // Assegna direttamente responseData.query[0] a heating

            heating.forEach((element) => {
                // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                tempDateTimeHeating.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                tempValueHeating.push(element[1]);
            });

            setHeatingTimeStamp(tempDateTimeHeating);
            setHeatingValue(tempValueHeating);
        } catch (error) {
            // Handle network error
            console.log(error);
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            setErrorHeating('An error occurred while loading historical data heating.')
            return errorResponse;
        }
        finally {
            setLoadingHeating(false);
        }
    };

    const handleSubmitClickCooling = async () => { // funzione per riempire il charter con il bottone search
        try {
            setLoadingCooling(true);
            // Formatta le date di inizio e fine
            const dataFormattedStartCooling = selectedDateCoolingStart.format('YYYYMMDDHHmm');
            const dataFormattedEndCooling = selectedDateCoolingEnd.format('YYYYMMDDHHmm');

            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");
            //console.log(token);

            const response = await fetch(API_URL_Cooling, { // Utilizza l'URL corretto per la tua API
                method: "POST", // Cambia il metodo in POST
                body: JSON.stringify({ dataFormattedStartCooling, dataFormattedEndCooling }), // Aggiungi le date al body
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`, // Aggiungi il token nel campo Authorization
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            console.log(responseData);

            let tempDateTimeCooling = [];
            let tempValueCooling = [];
            let cooling = responseData.query[0]; // Assegna direttamente responseData.query[0] a cooling
            console.log(cooling);

            cooling.forEach((element) => {
                // Accedi agli attributi ontime e value per ciascun elemento e aggiungili agli array temporanei
                tempDateTimeCooling.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                tempValueCooling.push(element[1]);
            });

            setCoolingTimeStamp(tempDateTimeCooling);
            setCoolingValue(tempValueCooling);
        } catch (error) {
            // Gestisci gli errori di rete
            console.log(error);
            setErrorCooling('An error occurred while loading historical data cooling.')
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;
        }
        finally {
            setLoadingCooling(false);
        }
    };


    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
            {/* <Box sx={{ flexGrow: 1, minHeight: "90vh" }}> */}
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start date time"
                                        value={selectedDateEletricityStart}
                                        onChange={handleDateChangeEletricityStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End date time"
                                        value={selectedDateEletricityEnd}
                                        onChange={handleDateChangeEletrecityEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
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
                            }}
                            /* onClick={handleAddRow} */
                            onClick={() => { handleSubmitClickElectricity() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                        {/* {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>} */}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        {loadingElectricity ? (
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '400px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress size={120} />
                            </Box>
                        ) : (
                            <Chart
                                labels={electricityTimeStamp}
                                data={electricityValue}
                                datasetLabel={'Electricity (Kwh)'}
                                chartTitle="Electricity"
                                yAxisUnit="kwh"
                            />
                        )}
                        {errorElectricity && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorElectricity(null)}>
                                    {errorElectricity}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start date time"
                                        value={selectedDateHeatingStart}
                                        onChange={handleDateChangeHeatingStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End date time"
                                        value={selectedDateHeatingEnd}
                                        onChange={handleDateChangeHeatingEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
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
                            }}
                            onClick={() => { handleSubmitClickHeating() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                        {/* {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>} */}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        {loadingHeating ? (
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '400px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress size={120} />
                            </Box>
                        ) : (
                            <Chart
                                labels={heatingTimeStamp}
                                data={heatingValue}
                                datasetLabel={'Heating (Kwh)'}
                                chartTitle="Heating"
                                yAxisUnit="kwh"
                            />
                        )}
                        {errorHeating && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorHeating(null)}>
                                    {errorHeating}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>

            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Start date time"
                                        value={selectedDateCoolingStart}
                                        onChange={handleDateChangeCoolingStart}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="End date time"
                                        value={selectedDateCoolingEnd}
                                        onChange={handleDateChangeCoolingEnd}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
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
                            }}
                            onClick={() => { handleSubmitClickCooling() }}> Search</Button> {/*qui definisco il bottone search, dove al click sono collegati le funzioni per mandare i dati al server per eseguire la query(sendSelectBackend(); sendDataStartToBackend(); sendDataEndToBackend();) e la funzione per prendere i dati dalla query e metterli sullo chart (handleSubmitClick())*/}
                        {/* {failMessage && <p style={{ color: 'red' }}>Please, fill in the fields above.</p>} */}
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                <Box /* sx={{ paddingLeft: "32px", marginTop: "32px", paddingRight: "32px" }}*/ >
                    <Grid container spacing={2} justifyContent="center">
                        {loadingCooling ? (
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '400px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress size={120} />
                            </Box>
                        ) : (
                            <Chart
                                labels={coolingTimeStamp}
                                data={coolingValue}
                                datasetLabel={'District Cooling (Kwh)'}
                                chartTitle="Cooling"
                                yAxisUnit="kwh"
                            />
                        )}
                        {errorCooling && (
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => setErrorCooling(null)}>
                                    {errorCooling}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );

}