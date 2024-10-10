import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Box, Container } from '@mui/material';

const LineChart = ({ labels, data, datasetLabel, datasets, chartTitle }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Distruggi l'istanza precedente del grafico se esiste
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Crea una nuova istanza del grafico
        const myChartRef = chartRef.current.getContext("2d");

        // Se datasets non è passato, crea un dataset da data e datasetLabel
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
                labels: labels || [], // Passa array vuoto se non ci sono label
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
                }
            }
        });

        // Cleanup dell'istanza del grafico al dismount del componente
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [labels, data, datasetLabel, datasets, chartTitle]);

    return (
        <Container maxWidth="xl" sx={{ padding: "2%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: '100%', maxWidth: '1400px', position: 'relative', backgroundColor: 'white' }}>
                <canvas ref={chartRef} width={700} height={500} />
            </Box>
        </Container>
    );
};

export default LineChart;
