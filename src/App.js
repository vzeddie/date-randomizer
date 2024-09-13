import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Modal, Box, TextField } from '@mui/material';
import DateList from './components/DateList';
import AddDateForm from './components/AddDateForm';
import RandomizeDate from './components/RandomizeDate';
import { encodeConfig, decodeConfig } from './utils/configEncoder';

const initialDates = [
  { id: 1, category: 'Romantic', name: 'Picnic in the park' },
  { id: 2, category: 'Adventure', name: 'Hiking trip' },
  { id: 3, category: 'Relaxing', name: 'Movie night at home' },
];

function App() {
  const [dates, setDates] = useState(initialDates);
  const [randomDate, setRandomDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const hash = window.location.hash.substring(8); // Remove '#config='
    if (hash) {
      const decodedDates = decodeConfig(hash);
      setDates(decodedDates);
    }
    updateShareUrl(dates);
  }, []);

  const addDate = (newDate) => {
    const updatedDates = [...dates, { id: dates.length + 1, ...newDate }];
    setDates(updatedDates);
    updateUrlHash(updatedDates);
    updateShareUrl(updatedDates);
  };

  const handleRandomize = (category) => {
    const filteredDates = category === 'All' ? dates : dates.filter(date => date.category === category);
    const randomIndex = Math.floor(Math.random() * filteredDates.length);
    setRandomDate(filteredDates[randomIndex]);
    setOpenModal(true);
  };

  const updateUrlHash = (updatedDates) => {
    const encodedConfig = encodeConfig(updatedDates);
    window.location.hash = `config=${encodedConfig}`;
  };

  const updateShareUrl = (updatedDates) => {
    const encodedConfig = encodeConfig(updatedDates);
    const url = `${window.location.origin}${window.location.pathname}#config=${encodedConfig}`;
    setShareUrl(url);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" gutterBottom>
        Date Randomizer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DateList dates={dates} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AddDateForm addDate={addDate} />
        </Grid>
      </Grid>
      <RandomizeDate dates={dates} onRandomize={handleRandomize} />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            Random Date Idea
          </Typography>
          {randomDate && (
            <Typography sx={{ mt: 2 }}>
              Category: {randomDate.category}<br />
              Date Idea: {randomDate.name}
            </Typography>
          )}
        </Box>
      </Modal>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Share Your Date Ideas
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={shareUrl}
          InputProps={{
            readOnly: true,
          }}
          helperText="Copy this URL to share your date ideas with others!"
        />
      </Box>
    </Container>
  );
}

export default App;