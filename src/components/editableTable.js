import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditableTable = ({ categories, onConfirmChanges }) => {
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    // Mappa i dati con value e type
    const rows = Object.keys(categories).map(key => ({
        name: key,
        value: categories[key].value,
        typeofdata: categories[key].typeofdata
    }));

    const handleEditRow = (index) => {
        setEditableRowIndex(index);
        setEditedValue(rows[index].value);
    };

    const handleSave = () => {
        const updatedValues = { ...categories };
        updatedValues[rows[editableRowIndex].name].value = editedValue;
        // Call the onConfirmChanges to send the updated values
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleConfirmChanges = async () => {
        // Poi invia la richiesta PUT al backend
        try {
            const updatedValues = { ...categories };
            onConfirmChanges(updatedValues);  // Pass updated values to parent
            console.log('Aggiornamento completato con successo');
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
        }
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const editableTable = () => {
        return (
            <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                        <TableRow>
                            <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Value</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch', whiteSpace: 'nowrap' }}>Type of Data</TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                    {editableRowIndex === index ? (
                                        <TextField
                                            value={editedValue}
                                            onChange={handleValueChange}
                                            sx={{
                                                '& .MuiInputBase-root': { fontSize: '2.5ch' },
                                                '& .MuiInputLabel-root': { fontSize: '2.5ch' },
                                            }}
                                        />
                                    ) : (
                                        row.value
                                    )}
                                </TableCell>
                                <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                    {row.typeofdata}
                                </TableCell>
                                <TableCell align="right">
                                    {editableRowIndex === index ? (
                                        <Button
                                            onClick={handleSave}
                                            sx={{ color: '#41BFB9', fontSize: '2.5ch' }}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={{ color: '#41BFB9', fontSize: '2.5ch' }}
                                            onClick={() => handleEditRow(index)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Paper sx={{ backgroundColor: 'rgba(147, 208, 167, 0.4)', padding: '2%', width: '900px', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {editableTable()}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#057BBE',
                    padding: '1vh 2vh',
                    minWidth: '20vh',
                    fontSize: '2ch',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2vh',
                    textAlign: 'center',
                }}
                onClick={() => handleConfirmChanges()}  // Call the passed function
            >
                Confirm Changes
            </Button>
        </Paper>
    );
};

export default EditableTable;
