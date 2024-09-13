import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AddDateForm({ addDate }) {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && name) {
      addDate({ category, name });
      setCategory('');
      setName('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Add New Date Idea</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <MenuItem value="Romantic">Romantic</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
            <MenuItem value="Relaxing">Relaxing</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Date Idea"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Date Idea
        </Button>
      </form>
    </Paper>
  );
}

export default AddDateForm;