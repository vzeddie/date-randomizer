import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField, Box } from '@mui/material';
import { Casino, Refresh } from '@mui/icons-material';

function RandomizeDate({ dates, onRandomize, initialSeed }) {
  const [category, setCategory] = useState('All');
  const [seed, setSeed] = useState(initialSeed || '');

  useEffect(() => {
    if (initialSeed) {
      setSeed(initialSeed);
    }
  }, [initialSeed]);

  const handleRandomize = () => {
    onRandomize(category, seed);
  };

  const generateNewSeed = () => {
    const newSeed = Math.random().toString(36).substring(2, 15);
    setSeed(newSeed);
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          sx={{ flexGrow: 1, mr: 1 }}
        />
        <Button
          onClick={generateNewSeed}
          variant="outlined"
          startIcon={<Refresh />}
        >
          New Seed
        </Button>
      </Box>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleRandomize}
        startIcon={<Casino />}
        fullWidth
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