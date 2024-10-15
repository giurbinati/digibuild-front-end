import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box, Container } from '@mui/material';

const LineChart = ({ labels, data, datasetLabel, datasets, chartTitle, yAxisUnit }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart instance
        const myChartRef = chartRef.current.getContext("2d");

        // Create datasets
        const chartDatasets = datasets ? datasets.map(dataset => ({
            label: dataset.label || 'Dataset',
            data: dataset.data || [],
            fill: false,
            backgroundColor: dataset.backgroundColor || "white",
            borderColor: dataset.borderColor || 'blue',
            borderWidth: dataset.borderWidth || 2,
        })) : [{
            label: datasetLabel || 'Dataset',
            data: data || [],
            fill: false,
            backgroundColor: "white",
            borderColor: 'blue',
            borderWidth: 2,
        }];

        chartInstance.current = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: labels || [], // Pass an empty array if no labels
                datasets: chartDatasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: !!chartTitle,
                        text: chartTitle || '',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        color: '#41BFB9',
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: `${yAxisUnit}`, // Use the yAxisUnit prop
                            font: {
                                size: 14,
                                weight: 'bold',
                                color: '#333' // Optional: Change the color of the title
                            }
                        }
                    }
                }
            }
        });

        // Cleanup the chart instance on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data, datasetLabel, datasets, chartTitle, yAxisUnit]);

    return (
        <Container maxWidth="xl" sx={{ padding: "2%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: '100%', maxWidth: '1400px', position: 'relative', backgroundColor: 'white' }}>
                <canvas ref={chartRef} width={700} height={500} />
            </Box>
        </Container>
    );
};

export default LineChart;
