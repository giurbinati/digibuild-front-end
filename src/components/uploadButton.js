import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const config = {
  host: process.env.REACT_APP_API_HOST,
};

const API_URL_DATE_UploadFileFVH = config.host + "/upload";

const UploadButton = ({ fileType, keyword, pilot, building, requiresDateRange = false }) => {
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Funzione che gestisce l'upload del file
  const uploadFileService = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pilot", pilot);
    if (building) {
      formData.append("building", building);
    }

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

  // Funzione per estrarre e validare l'intervallo di tempo nel nome del file
  const validateDateRange = (fileName) => {
    // Regex per cercare un intervallo di date nel formato gg.mm.yyyy-gg.mm.yyyy
    const dateRangePattern = /\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}/;
    return dateRangePattern.test(fileName);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Controllo che il file contenga la keyword
      const isKeywordInFilename = file.name.toLowerCase().includes(keyword.toLowerCase());
      if (!isKeywordInFilename) {
        setError(`Error: The file name must contain the keyword '${keyword}'.`);
        return;
      }

      // Se l'upload richiede un intervallo di tempo, valida il nome del file
      if (requiresDateRange) {
        const isDateRangeValid = validateDateRange(file.name);
        if (!isDateRangeValid) {
          setError(`Error: The file name must contain a valid date range in the format 'dd.mm.yyyy-dd.mm.yyyy'.`);
          return;
        }
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
        accept={fileType}
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
