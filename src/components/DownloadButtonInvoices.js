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
  const [loading, setLoading] = useState(false); // Per la gestione del caricamento

  const handleOpenPdf = () => {
    setLoading(true);
    // Poiché il PDF è in locale nella cartella 'public', possiamo creare l'URL direttamente
    const url = `${process.env.PUBLIC_URL}/heatingHotWaterPeriod 23.02.2022-25.03.2022.pdf`;
    setData(url);
    setLoading(false);
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
