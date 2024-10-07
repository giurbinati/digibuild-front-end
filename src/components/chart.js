import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box, Container, Grid } from '@mui/material';

const LineChart = ({ labels, data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart instance
        const myChartRef = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: 'Electricity (kWh)',
                    data: data,
                    fill: false,
                    backgroundColor: "white",
                    borderColor: 'blue',
                    borderWidth: 2,
                    responsive: true
                }]
            }
        });

        // Cleanup chart instance on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data]);

    return (
        <Container maxWidth="xl" sx={{ padding: "2%", height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: '100%', maxWidth: '1400px' }}>
                <canvas ref={chartRef} width={1400} height={1000} style={{ width: '100%', height: '100%' }} />
            </Box>
        </Container>
    );
};

export default LineChart;
