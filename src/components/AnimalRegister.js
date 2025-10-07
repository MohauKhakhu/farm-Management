import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import axios from 'axios';

const AnimalRegister = () => {
  const [animals, setAnimals] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    animal_id: '',
    breed: '',
    age: '',
    weight: ''
  });

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/animals');
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/animals', formData);
      fetchAnimals();
      setOpen(false);
      setFormData({ animal_id: '', breed: '', age: '', weight: '' });
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  return (
    <Container>
      <Button variant="contained" onClick={() => setOpen(true)} style={{ margin: '20px 0' }}>
        Add New Animal
      </Button>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Animal ID</TableCell>
              <TableCell>Breed</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.id}</TableCell>
                <TableCell>{animal.animal_id}</TableCell>
                <TableCell>{animal.breed}</TableCell>
                <TableCell>{animal.age}</TableCell>
                <TableCell>{animal.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Animal</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Animal ID"
              fullWidth
              variant="outlined"
              value={formData.animal_id}
              onChange={(e) => setFormData({...formData, animal_id: e.target.value})}
              required
            />
            <TextField
              margin="dense"
              label="Breed"
              fullWidth
              variant="outlined"
              value={formData.breed}
              onChange={(e) => setFormData({...formData, breed: e.target.value})}
              required
            />
            <TextField
              margin="dense"
              label="Age"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Weight"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add Animal</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default AnimalRegister;