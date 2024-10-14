import React, { useState } from 'react';
import Button from '@mui/material/Button';

const config = {
  host: process.env.REACT_APP_API_HOST,
  timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_DATE_DownloadFileFVH = config.host + "/last_record";

function DownloadButton({ filename, pilot }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      // Esegui una richiesta POST per ottenere il file più recente dal backend
      const response = await fetch(API_URL_DATE_DownloadFileFVH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename, pilot })  // Invia il filename al backend
      });

      if (response.ok) {
        console.log(response)
        // Converti la risposta in blob
        const blob = await response.blob();

        // Crea un link temporaneo per scaricare il file
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', filename); // Usa il filename per il download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Rilascia la memoria dell'URL temporaneo
      } else {
        setError('Error while downloading the file.');
      }
    } catch (err) {
      setError('Error during the request to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#057BBE',
          padding: '1vh 2vh',
          minWidth: '20vh',
          width:'20vh',
          fontSize: '2ch',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2vh',
          textAlign: 'center',
        }}
        onClick={handleDownload}
        disabled={loading}>
        {loading ? 'Downloading...' : 'Download file'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default DownloadButton;
