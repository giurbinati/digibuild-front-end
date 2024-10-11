import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import TablePagination from '@mui/material/TablePagination';
import GetDataFVH from '../services/getDataFVH';
import putDataFVH from '../services/putDataFVH';

export default function EditableTable() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await GetDataFVH.getCategories(2, 0);
                setCategories(data);
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        }
        fetchCategories();
    }, []);

    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    const rows = Object.keys(categories).map(key => ({
        name: key,
        value: categories[key].value,
        type: categories[key].type
    }));

    const handleEditRow = (index) => {
        const actualIndex = page * rowsPerPage + index;
        setEditableRowIndex(actualIndex);
        setEditedValue(rows[actualIndex].value);
    };

    const handleSave = async () => {
        const updatedValues = { ...categories };
        const actualIndex = editableRowIndex;
        updatedValues[rows[actualIndex].name].value = editedValue; // Update value correctly
        setCategories(updatedValues);
        setEditableRowIndex(null);
        setEditedValue('');
    };

    const handleValueChange = (event) => {
        setEditedValue(event.target.value);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(11);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const rowsToShow = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleAddMaterial = () => {
        // Filter keys starting with 'Material'
        const materialKeys = Object.keys(categories).filter(key => key.startsWith('Material'));

        // Find the last material index
        const lastMaterialIndex = materialKeys.reduce((max, key) => {
            const match = key.match(/Material\s*(\d+)/);
            return match ? Math.max(max, parseInt(match[1], 10)) : max;
        }, 0);

        const newMaterialIndex = lastMaterialIndex + 1;

        const newMaterial = {
            [`Material ${newMaterialIndex} - Type`]: { value: "", type: "Descriptive" },
            [`Material ${newMaterialIndex} - Location`]: { value: "", type: "Physical" },
            [`Material ${newMaterialIndex} - Volume`]: { value: "", type: "Physical" },
            [`Material ${newMaterialIndex} - Weight`]: { value: "", type: "Physical" },
            [`Material ${newMaterialIndex} - Embodied carbon`]: { value: "", type: "Physical" },
            [`Material ${newMaterialIndex} - Life span`]: { value: "", type: "Physical" },
            [`Material ${newMaterialIndex} - Fire resistance class`]: { value: "Rating", type: "Rating" },
            [`Material ${newMaterialIndex} - Waste category`]: { value: "Code", type: "Code" },
            [`Material ${newMaterialIndex} - Certificate 1`]: { value: "Linked document", type: "Linked document" },
            [`Material ${newMaterialIndex} - Chemical declaration`]: { value: "Linked document", type: "Linked document" },
            [`Material ${newMaterialIndex} - Global Trade Item Number`]: { value: "Linked document", type: "Linked document" }
        };

        setCategories(prevCategories => ({ ...prevCategories, ...newMaterial }));
    };

    const handleConfirmChanges = async () => {
        try {
            const updatedValues = { ...categories };
            const response = await putDataFVH.updateData(2, updatedValues, 0);
            console.log('Aggiornamento completato con successo');
        } catch (error) {
            console.error('Errore durante la richiesta PUT:', error);
        }
    };

    const tableBuildingMaterialInventory = () => (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#41BFB9', fontWeight: 'bold' }}>
                    <TableRow>
                        <TableCell style={{ fontSize: '2.5ch' }}>Name</TableCell>
                        <TableCell align="right" style={{ fontSize: '2.5ch' }}>Value</TableCell>
                        <TableCell align="right" style={{ fontSize: '2.5ch' }}>Type of Data</TableCell>
                        <TableCell align="right" style={{ fontSize: '2.5ch' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsToShow.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" style={{ fontSize: '2.5ch' }}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right" style={{ fontSize: '2.5ch' }}>
                                {editableRowIndex === (page * rowsPerPage + index) ? (
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
                                {row.type}
                            </TableCell>
                            <TableCell align="right">
                                {editableRowIndex === (page * rowsPerPage + index) ? (
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
            <TablePagination
                rowsPerPageOptions={[5, 11, 22]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                minHeight: '78vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2vh'
            }}
        >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
                <Grid container direction="column" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                backgroundColor: 'rgba(147, 208, 167, 0.4)',
                                padding: '2%',
                                width: '900px',
                                maxWidth: '1200px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {tableBuildingMaterialInventory()}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#057BBE',
                                    padding: '1vh 2vh',
                                    minWidth: '180px',
                                    color: 'white',
                                    marginTop: '2vh',
                                    fontSize: '2.5ch'
                                }}
                                onClick={handleAddMaterial}
                            >
                                Add New Material
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#057BBE',
                                    padding: '1vh 2vh',
                                    minWidth: '180px',
                                    color: 'white',
                                    marginTop: '2vh',
                                    fontSize: '2.5ch'
                                }}
                                onClick={handleConfirmChanges}
                            >
                                Confirm Changes
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
