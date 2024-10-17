import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const config = {
  host: process.env.REACT_APP_API_HOST,
  timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_DATE_ViewPDFFVH = config.host + "/last_record";

function PdfViewerApi({ filename, pilot, building }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showViewer, setShowViewer] = useState(false); // Stato per gestire la visibilità del visualizzatore

  const handleOpenPdf = async () => {
    setLoading(true);
    setError(null);
    const requestBody = { filename, pilot };
    if (building) {
      requestBody.building = building;
    }

    try {
      const response = await fetch(API_URL_DATE_ViewPDFFVH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Passa il filename come JSON
      });

      if (response.ok) {
        const blobData = await response.blob(); // Converti la risposta in blob
        const url = URL.createObjectURL(blobData); // Crea l'URL del blob
        setData(url); // Imposta l'URL per visualizzare il PDF
        setShowViewer(true); // Mostra il visualizzatore
      } else {
        setError('Error while downloading the PDF');
      }
    } catch (error) {
      setError('Error while loading PDF');
    } finally {
      setLoading(false);
    }
  };

  const handleClosePdf = () => {
    setShowViewer(false); // Nasconde il visualizzatore PDF
    setData(null); // Resetta il dato PDF
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#057BBE',
          padding: '1vh 2vh',
          minWidth: '20vh',
          width: '20vh',
          fontSize: '2ch',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2vh',
          textAlign: 'center',
        }}
        onClick={handleOpenPdf}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'View PDF'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Modale per visualizzare il PDF */}
      <Dialog open={showViewer} onClose={handleClosePdf} maxWidth="lg" fullWidth>
        <DialogTitle>Viiew PDF</DialogTitle>
        <DialogContent>
          {data && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <div style={{ height: '70vh', width: '100%' }}>
                <Viewer fileUrl={data} plugins={[defaultLayoutPluginInstance]} />
              </div>
            </Worker>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PdfViewerApi;
