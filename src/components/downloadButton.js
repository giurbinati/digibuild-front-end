import React, { useState } from 'react';
import Button from '@mui/material/Button';

function DownloadButton({ filename }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);

    try {
      // Costruisci l'URL dell'API del backend
      const fullUrl = `http://localhost:8080/last_record`;

      // Esegui una richiesta POST per ottenere il file più recente dal backend
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename })  // Invia il filename al backend
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
        setError('Errore durante il download del file.');
      }
    } catch (err) {
      setError('Errore durante la richiesta al server.');
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
