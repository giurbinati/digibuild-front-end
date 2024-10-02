import React, { useState } from 'react';

const UploadButton = () => {
  // Funzione che gestisce l'upload del file
  const [uploadStatus, setUploadStatus] = useState("");
  const uploadFileService = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Aggiunge il file a FormData

    try {
        const response = await fetch("http://localhost:8080/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Errore durante l'upload del file");
        }

        const data = await response.json();
        setUploadStatus("Upload completato con successo!");
        console.log("Upload completato:", data);
    } catch (error) {
        setUploadStatus("Errore durante l'upload del file.");
        console.error("Errore:", error);
    }
};

// Funzione che gestisce la selezione del file
const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const file = files[0];
        console.log('File selezionato:', file.name);

        // Chiama il servizio di upload
        await uploadFileService(file);
    }
};

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }} // Nascondi l'input file
        onChange={handleFileChange}
        accept="*"
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' }}>
        Carica un documento
      </label>
    </div>
  );
};

export default UploadButton;
