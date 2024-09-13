import React, { useState } from 'react';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function RandomizeIdea({ ideas, onRandomize }) {
  const [category, setCategory] = useState('All');

  const handleRandomize = () => {
    onRandomize(category);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
      <Typography variant="h5" gutterBottom>Randomize Idea</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Hobby">Hobby</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleRandomize}>
        Randomize
      </Button>
    </Paper>
  );
}

export default RandomizeIdea;