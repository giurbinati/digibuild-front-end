import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import moment from 'moment';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chart from '../components/chart'
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';

const config = {
    host: process.env.REACT_APP_API_HOST,
    timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_EletricityDubetPyramid = config.host + "/historicalDataElectricityDubetPyramid";
const API_URL_ElectricityRoznovanu = config.host + "/historicalDataElectricityRoznovanuPalace";
const API_URL_ChillerRoznovanu = config.host + "/historicalDataChillerRoznovanuPalace";

export default function ConsumptionDataOfEnergyHistoricalIasiSitta() {

    const [loadingElectricityDubet, setLoadingElectricityDubet] = useState(false);
    const [loadingElectricityRoznovanu, setLoadingElectricityRoznovanu] = useState(false);
    const [loadingChiller, setLoadingChiller] = useState(false);
    const [errorElectricityDubet, setErrorElectricityDubet] = useState(null);
    const [errorElectricityRoznovanu, setErrorElectricityRoznovanu] = useState(null);
    const [errorChiller, setErrorChiller] = useState(null);
    const [building, setBuilding] = useState('Roznovanu Palace');
    const [electricityDubetPyramidTimeStamp, setElectricityDubetPyramidTimeStamp] = useState(null)
    const [electricityDubetPyramidValue, setElectricityDubetPyramidValue] = useState(null)
    const [electricityRoznovanuTimeStamp, setElectricityRoznovanuTimeStamp] = useState(null)
    const [electricityRoznovanuValue, setElectricityRoznovanuValue] = useState(null)
    const [chillerTimeStamp, setChillerTimeStamp] = useState(null)
    const [chillerValue, setChillerValue] = useState(null)
    const [selectedDateEletricityStartDubetPyramid, setSelectedDateEletricityStartDubetPyramid] = useState(null);
    const [selectedDateEletricityEndDubetPyramid, setSelectedDateEletricityEndDubetPyramid] = useState(null);
    const [selectedDateElectricityStartRoznovanu, setSelectedDateElectricityStartRoznovanu] = useState(null);
    const [selectedDateElectricityEndRoznovanu, setSelectedDateElectricityEndRoznovanu] = useState(null);
    const [selectedDateChillerStartRoznovanu, setSelectedDateChillerStartRoznovanu] = useState(null);
    const [selectedDateChillerEndRoznovanu, setSelectedDateChillerEndRoznovanu] = useState(null);

    const handleRadioChange = (event) => {
        setBuilding(event.target.value);
    };

    const handleDateChangeEletricityStartDubetPyramid = (dateEletricityStartDubetPyramid) => {
        setSelectedDateEletricityStartDubetPyramid(dateEletricityStartDubetPyramid);
    };
    const handleDateChangeEletrecityEndDubetPyramid = (dateEletricityEndDubetPyramid) => {
        setSelectedDateEletricityEndDubetPyramid(dateEletricityEndDubetPyramid);
    };
    const handleDateChangeElectricityStartRoznovanu = (dateElectricityStartRoznovanu) => {
        setSelectedDateElectricityStartRoznovanu(dateElectricityStartRoznovanu);
    };
    const handleDateChangeElectricityEndRoznovanu = (dateElectricityEndRoznovanu) => {
        setSelectedDateElectricityEndRoznovanu(dateElectricityEndRoznovanu);
    };
    const handleDateChangeChillerStartRoznovanu = (dateChillerStartRoznovanu) => {
        setSelectedDateChillerStartRoznovanu(dateChillerStartRoznovanu);
    };
    const handleDateChangeChillerEndRoznovanu = (dateChillerEndRoznovanu) => {
        setSelectedDateChillerEndRoznovanu(dateChillerEndRoznovanu);
    };

    const handleSubmitClickElectricityDubetPyramid = async () => {
        try {
            setLoadingElectricityDubet(true);
            const dataFormattedStartElectricity = selectedDateEletricityStartDubetPyramid.format('YYYYMMDDHHmm');
            const dataFormattedEndElectricity = selectedDateEletricityEndDubetPyramid.format('YYYYMMDDHHmm');
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");

            const response = await fetch(API_URL_EletricityDubetPyramid, {
                method: 'POST',
                body: JSON.stringify({
                    dataFormattedStartElectricity,
                    dataFormattedEndElectricity
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            console.log(responseData);
            let tempDateTimeElectricityDubetPyramid = [];
            let tempValueElectricityDubetPyramid = [];
            let electricityDubetPyramid = responseData.query[0];

            electricityDubetPyramid.forEach((element) => {
                tempDateTimeElectricityDubetPyramid.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                tempValueElectricityDubetPyramid.push(element[1]);
            });

            setElectricityDubetPyramidTimeStamp(tempDateTimeElectricityDubetPyramid);
            setElectricityDubetPyramidValue(tempValueElectricityDubetPyramid);

        } catch (error) {
            console.log(error);
            setErrorElectricityDubet('An error occurred while loading historical data electricity.');
        } finally {
            setLoadingElectricityDubet(false);
        }
    };

    const handleSubmitClickElectricityRoznovanu = async () => {
        try {
            setLoadingElectricityRoznovanu(true);
            const dataFormattedStartElectricityRoznovanu = selectedDateElectricityStartRoznovanu.format('YYYYMMDDHHmm');
            const dataFormattedEndElectricityRoznovanu = selectedDateElectricityEndRoznovanu.format('YYYYMMDDHHmm');
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");

            const response = await fetch(API_URL_ElectricityRoznovanu, {
                method: 'POST',
                body: JSON.stringify({
                    dataFormattedStartElectricityRoznovanu,
                    dataFormattedEndElectricityRoznovanu,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            console.log(responseData);

            let tempDateTimeElectricityRoznovanu = [];
            let tempValueElectricityRoznovanu = [];
            let ElectricityRoznovanu = responseData.query[0];

            ElectricityRoznovanu.forEach((element) => {
                tempDateTimeElectricityRoznovanu.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                tempValueElectricityRoznovanu.push(element[1]);
            });

            setElectricityRoznovanuTimeStamp(tempDateTimeElectricityRoznovanu);
            setElectricityRoznovanuValue(tempValueElectricityRoznovanu);

        } catch (error) {
            console.log(error);
            setErrorElectricityRoznovanu('An error occurred while loading historical data electricity.');
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;

        } finally {
            setLoadingElectricityRoznovanu(false);
        }
    };

    const handleSubmitClickChillerRoznovanu = async () => {
        try {
            setLoadingChiller(true);
            const dataFormattedStartChillerRoznovanu = selectedDateChillerStartRoznovanu.format('YYYYMMDDHHmm');
            const dataFormattedEndChillerRoznovanu = selectedDateChillerEndRoznovanu.format('YYYYMMDDHHmm');
            const token = sessionStorage.getItem("ACCESS_TOKEN_NAME");
            const response = await fetch(API_URL_ChillerRoznovanu, {
                method: 'POST',
                body: JSON.stringify({
                    dataFormattedStartChillerRoznovanu,
                    dataFormattedEndChillerRoznovanu,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const responseData = await response.json();
            console.log(responseData);
            let tempDateTimeChillerRoznovanu = [];
            let tempValueChillerRoznovanu = [];
            let chillerRoznovanu = responseData.query[0];

            chillerRoznovanu.forEach((element) => {
                tempDateTimeChillerRoznovanu.push(moment(element[0], "YYYYMMDDHHmm").format("YYYY-MM-DD HH:mm"));
                tempValueChillerRoznovanu.push(element[1]);
            });

            setChillerTimeStamp(tempDateTimeChillerRoznovanu);
            setChillerValue(tempValueChillerRoznovanu);

        } catch (error) {
            console.log(error);
            setErrorChiller('An error occurred while loading historical data chiller.');
            const errorResponse = {
                status: 503,
                message: "ERR_NETWORK",
            };
            return errorResponse;

        } finally {
            setLoadingChiller(false);
        }
    };


    return (
        <Box sx={{ flexGrow: 1, minHeight: "78vh" }}>
            <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <FormControl>
                        <FormLabel sx={{ fontSize: '2.5ch' }} id="demo-radio-buttons-group-label">Building</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={building}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="Roznovanu Palace" control={<Radio />} label="Roznovanu Palace" />
                            <FormControlLabel value="Dubet Pyramid" control={<Radio />} label="Dubet Pyramid" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Container>

            {building === "Dubet Pyramid" && (
                <>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="Start date time"
                                                value={selectedDateEletricityStartDubetPyramid}
                                                onChange={handleDateChangeEletricityStartDubetPyramid}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="End date time"
                                                value={selectedDateEletricityEndDubetPyramid}
                                                onChange={handleDateChangeEletrecityEndDubetPyramid}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#057BBE', padding: '1vh 2vh', minWidth: '20vh', fontSize: '2ch' }}
                                    onClick={() => { handleSubmitClickElectricityDubetPyramid() }}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Box>
                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                {loadingElectricityDubet ? (
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
                                        labels={electricityDubetPyramidTimeStamp}
                                        data={electricityDubetPyramidValue}
                                        datasetLabel={'Energy consumption (Kw)'}
                                        chartTitle="Electricity"
                                        yAxisUnit="kW"
                                    />
                                )}
                                {errorElectricityDubet && (
                                    <Grid item xs={12}>
                                        <Alert severity="error" onClose={() => setErrorElectricityDubet(null)}>
                                            {errorElectricityDubet}
                                        </Alert>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Container>
                </>
            )}

            {building === "Roznovanu Palace" && (
                <>
                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="Start date time"
                                                value={selectedDateElectricityStartRoznovanu}
                                                onChange={handleDateChangeElectricityStartRoznovanu}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="End date time"
                                                value={selectedDateElectricityEndRoznovanu}
                                                onChange={handleDateChangeElectricityEndRoznovanu}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#057BBE', padding: '1vh 2vh', minWidth: '20vh', fontSize: '2ch' }}
                                    onClick={() => { handleSubmitClickElectricityRoznovanu() }}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Box>
                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                {loadingElectricityRoznovanu ? (
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
                                        labels={electricityRoznovanuTimeStamp}
                                        data={electricityRoznovanuValue}
                                        datasetLabel={'Energy consumption (Kw)'}
                                        chartTitle="Electricity"
                                        yAxisUnit="kW"
                                    />
                                )}
                                {errorElectricityRoznovanu && (
                                    <Grid item xs={12}>
                                        <Alert severity="error" onClose={() => setErrorElectricityRoznovanu(null)}>
                                            {errorElectricityRoznovanu}
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
                                                value={selectedDateChillerStartRoznovanu}
                                                onChange={handleDateChangeChillerStartRoznovanu}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker
                                                label="End date time"
                                                value={selectedDateChillerEndRoznovanu}
                                                onChange={handleDateChangeChillerEndRoznovanu}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "1vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#057BBE', padding: '1vh 2vh', minWidth: '20vh', fontSize: '2ch' }}
                                    onClick={() => { handleSubmitClickChillerRoznovanu() }}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Box>
                    </Container>

                    <Container maxWidth="xl" sx={{ marginTop: "1vh", marginBottom: "3vh", padding: "2%" }}>
                        <Box>
                            <Grid container spacing={2} justifyContent="center">
                                {loadingChiller ? (
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
                                        labels={chillerTimeStamp}
                                        data={chillerValue}
                                        datasetLabel={'Energy consumption (Kw)'}
                                        chartTitle="Chiller"
                                        yAxisUnit="kW"
                                    />
                                )}
                                {errorChiller && (
                                    <Grid item xs={12}>
                                        <Alert severity="error" onClose={() => setErrorChiller(null)}>
                                            {errorChiller}
                                        </Alert>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </Container>
                </>
            )}
        </Box>
    )

}