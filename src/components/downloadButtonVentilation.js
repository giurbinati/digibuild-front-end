import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PdfViewer() {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Per la gestione degli errori
  const [loading, setLoading] = useState(false); // Per la gestione del caricamento

  const handleOpenPdf = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://cloud2.digibuild-project.com/file/3f067aa2-3c27-495b-871c-edbb7ef71f8b/download', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setData(url);
      } else {
        setError('Errore durante il download del PDF');
      }
    } catch (error) {
      setError('Errore durante il caricamento del PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!data && (
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
          }}
          onClick={handleOpenPdf}
          disabled={loading} // Disabilita il bottone durante il caricamento
        >
          {loading ? 'Loading...' : 'View PDF'}
        </Button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostra un messaggio di errore */}

      {data && (
        <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '50vh', width: '80vh', overflow: 'auto' }}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div style={{ height: '100%', width: '100%' }}>            
              <Viewer fileUrl={data} plugins={[defaultLayoutPluginInstance]} />
            </div>
          </Worker>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;
