import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const config = {
  host: process.env.REACT_APP_API_HOST,
  timer: parseInt(process.env.REACT_APP_TIMER)
};

const API_URL_DATE_UploadFileFVH = config.host + "/upload";

const UploadButton = ({ fileType, keyword, pilot }) => {
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Funzione che gestisce l'upload del file
  const uploadFileService = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pilot", pilot);
    console.log(pilot)

    try {
      const response = await fetch(API_URL_DATE_UploadFileFVH, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore durante l'upload del file");
      }

      const data = await response.json();
      setUploadStatus("Upload completato con successo!");
      setError(null);
    } catch (error) {
      setUploadStatus("");
      setError('Errore durante l\'upload del file.');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      const isKeywordInFilename = file.name.toLowerCase().includes(keyword.toLowerCase());
      if (!isKeywordInFilename) {
        setError(`Error: The file name must contain the keyword '${keyword}'.`);
        return;
      }

      await uploadFileService(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id={`file-upload-${keyword}`} // ID unico
        onChange={handleFileChange}
        accept="*"
        style={{ display: 'none' }}
      />
      <label htmlFor={`file-upload-${keyword}`}>
        <Button
          component="span"
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
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#046AA0',
            },
          }}
        >
          Upload File
        </Button>
      </label>

      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {uploadStatus && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {uploadStatus}
        </Typography>
      )}
    </div>
  );
};

export default UploadButton;
