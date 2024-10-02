import React from 'react';
import Button from '@mui/material/Button';

function DownloadButton({ downloadUrl }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadUrl; // Il link per il download passato come prop
    link.setAttribute('download', ''); // Imposta l'attributo "download" per scaricare il file automaticamente
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
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
        onClick={handleDownload}>
        Download file
      </Button>
    </div>
  );
}

export default DownloadButton;
