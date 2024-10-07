import React, { useState } from 'react';
import UploadFileFVH from '../services/uploadFileFVH';
import { Button, Grid, Typography } from '@mui/material';

const UploadButton = ({ fileType, keyword }) => {
  const [error, setError] = useState(null); // Stato per l'errore
  const [showViewer, setShowViewer] = useState(false); // Stato per mostrare o nascondere l'errore

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isFileTypeValid = (fileType === 'pdf' && fileExtension === 'pdf');
      const isKeywordInFilename = file.name.toLowerCase().includes(keyword.toLowerCase());

      if (!isFileTypeValid) {
        setError(`Error: The file must be a ${fileType.toUpperCase()}.`);
        setShowViewer(true); // Mostra il messaggio di errore
        return;
      }

      if (!isKeywordInFilename) {
        setError(`Error: The file name must contain the keyword '${keyword}'.`);
        setShowViewer(true); // Mostra il messaggio di errore
        return;
      }

      try {
        const result = await UploadFileFVH.uploadFile(file);
        console.log('File uploaded successfully:', result);
        setError(null); // Resetta l'errore se l'upload ha successo
        setShowViewer(false); // Nasconde l'errore se l'upload ha successo
      } catch (error) {
        console.error('Error during file upload:', error);
        setError('Error: There was an error uploading the file.');
        setShowViewer(true); // Mostra il messaggio di errore
      }
    }
  };

  return (
    <div>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          accept="*"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload">
          <Button
            component="span"
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
              color:'white',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#046AA0',
              },
            }}
          >
            Upload File
          </Button>
        </label>
      
      {/* Mostra il messaggio di errore se c'è un errore e showViewer è true */}
      {showViewer && error && (
          <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
      )}
    </div>
  );
};

export default UploadButton;
