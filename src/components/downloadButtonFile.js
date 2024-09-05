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
        ssx={{
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
        onClick={openPopup}>
        Download file
      </Button>
    </div>
  );
}

export default PopupButton;
