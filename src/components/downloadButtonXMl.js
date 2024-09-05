import React from 'react';
import Button from '@mui/material/Button';

const DownloadButton = () => {
  const handleDownload = () => {
    // Crea un oggetto URL per il tuo file
    const fileUrl = process.env.PUBLIC_URL + '/BIM_KYT_ARK_OPT_IFC4_bst_gb.xml';

    // Crea un elemento link temporaneo
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'BIM_KYT_ARK_OPT_IFC4_bst_gb.xml'; // Specifica il nome del file da scaricare

    // Aggiungi l'elemento link alla pagina e simula il click
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Rimuovi l'elemento link dalla pagina
    document.body.removeChild(downloadLink);
  };

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#057BBE',
        padding: '1vh 2vh', // Padding verticale e orizzontale
        Width: '5vh', // Larghezza minima per mantenere la dimensione minima del bottone
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2vh', // Aggiunto margine superiore per distanziare il pulsante dalla tabella
        textAlign: 'center', // Centra il testo verticalmente
        height: "4vh"
      }} onClick={handleDownload}>
      Download file
    </Button>
  );
};

export default DownloadButton;
