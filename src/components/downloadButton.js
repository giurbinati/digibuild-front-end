import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';

function PopupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const openPopup = () => {
    setIsOpen(true);
    setInputText('');
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  console.log(inputText)

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
      /* onClick={handleAddRow} */
      >
        Please download file
      </Button>
      <Dialog open={isOpen} onClose={closePopup}>
        <DialogTitle>Insert name file</DialogTitle>
        <DialogContent>
          <TextField
            label="Name File"
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleInputChange}
          />
          <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px', }}>
            <Button variant="contained" onClick={closePopup}>
              Cancel
            </Button>
            <Button variant="contained" onClick={closePopup}>
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PopupButton;
