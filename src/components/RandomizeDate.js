import React, { useState } from 'react';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Casino } from '@mui/icons-material';

function RandomizeDate({ dates, onRandomize }) {
  const [category, setCategory] = useState('All');

  const handleRandomize = () => {
    onRandomize(category);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Randomize Date</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Romantic">Romantic</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Relaxing">Relaxing</MenuItem>
          <MenuItem value="Movie/TV Show">Movie/TV Show</MenuItem>
          <MenuItem value="Culture">Culture</MenuItem>
          <MenuItem value="Random">Random</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Music">Music</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
        </Select>
      </FormControl>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleRandomize}
        startIcon={<Casino />}
        sx={{ 
          borderRadius: 20,
          px: 3,
        }}
      >
        Randomize
      </Button>
    </Paper>
  );
}

export default RandomizeDate;