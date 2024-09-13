import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AddIdeaForm({ addIdea }) {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && name) {
      addIdea({ category, name });
      setCategory('');
      setName('');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Add New Idea</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            <MenuItem value="Hobby">Hobby</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Idea Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Idea
        </Button>
      </form>
    </Paper>
  );
}

export default AddIdeaForm;