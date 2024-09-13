import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Modal, Box, TextField, Paper, Fade, IconButton, Zoom } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7, Favorite, Hiking, Weekend, LocalMovies, Museum, Casino, Restaurant, MusicNote, ShoppingCart } from '@mui/icons-material';
import DateList from './components/DateList';
import AddDateForm from './components/AddDateForm';
import RandomizeDate from './components/RandomizeDate';
import { encodeConfig, decodeConfig } from './utils/configEncoder';

const getCategoryColors = (mode) => ({
  Romantic: mode === 'light' ? '#ffcccb' : '#4a3034',
  Adventure: mode === 'light' ? '#90ee90' : '#2d4a34',
  Relaxing: mode === 'light' ? '#add8e6' : '#2d3e4a',
  'Movie/TV Show': mode === 'light' ? '#ffd700' : '#4a4a2d',
  Culture: mode === 'light' ? '#dda0dd' : '#4a2d4a',
  Random: mode === 'light' ? '#ff7f50' : '#4a3d2d',
  Food: mode === 'light' ? '#98fb98' : '#2d4a3d',
  Music: mode === 'light' ? '#87cefa' : '#2d3d4a',
  Shopping: mode === 'light' ? '#f08080' : '#4a2d2d',
});

const categoryIcons = {
  Romantic: <Favorite />,
  Adventure: <Hiking />,
  Relaxing: <Weekend />,
  'Movie/TV Show': <LocalMovies />,
  Culture: <Museum />,
  Random: <Casino />,
  Food: <Restaurant />,
  Music: <MusicNote />,
  Shopping: <ShoppingCart />,
};

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    background: {
      default: mode === 'light' ? '#fff0f5' : '#333333',
      paper: mode === 'light' ? '#ffffff' : '#424242',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

const initialDates = [
  { id: 1, category: 'Romantic', name: 'Picnic in the park' },
  { id: 2, category: 'Adventure', name: 'Hiking trip' },
  { id: 3, category: 'Relaxing', name: 'Movie night at home' },
  { id: 4, category: 'Movie/TV Show', name: 'Watch a classic film' },
  { id: 5, category: 'Culture', name: 'Visit a local museum' },
  { id: 6, category: 'Random', name: 'Try a new hobby together' },
  { id: 7, category: 'Food', name: 'Cook a new recipe together' },
  { id: 8, category: 'Music', name: 'Attend a live concert' },
  { id: 9, category: 'Shopping', name: 'Explore a flea market' },
];

function App() {
  const [dates, setDates] = useState(initialDates);
  const [randomDate, setRandomDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [mode, setMode] = useState('light');

  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const categoryColors = React.useMemo(() => getCategoryColors(mode), [mode]);

  useEffect(() => {
    const hash = window.location.hash.substring(8);
    if (hash) {
      const decodedDates = decodeConfig(hash);
      setDates(decodedDates);
    }
    updateShareUrl(dates);
  }, [dates]); // Add dates to the dependency array

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

  const deleteDate = (id) => {
    const updatedDates = dates.filter(date => date.id !== id);
    setDates(updatedDates);
    updateUrlHash(updatedDates);
    updateShareUrl(updatedDates);
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

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', transition: 'background-color 0.3s' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', my: 4, color: 'text.primary' }}>
            Date Randomizer
          </Typography>
          <Grid container spacing={4}>
            <Fade in={true} timeout={800}>
              <Grid item xs={12} md={6}>
                <DateList 
                  dates={dates} 
                  categoryColors={categoryColors} 
                  categoryIcons={categoryIcons} 
                  onDelete={deleteDate}
                />
              </Grid>
            </Fade>
            <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}>
              <Grid item xs={12} md={6}>
                <AddDateForm addDate={addDate} />
              </Grid>
            </Fade>
          </Grid>
          <Fade in={true} timeout={800} style={{ transitionDelay: '400ms' }}>
            <Box mt={4}>
              <RandomizeDate dates={dates} onRandomize={handleRandomize} />
            </Box>
          </Fade>
          <Modal 
            open={openModal} 
            onClose={() => setOpenModal(false)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zoom in={openModal} timeout={300}>
              <Paper sx={{
                width: 400,
                p: 4,
                boxShadow: 24,
                borderRadius: 4,
                bgcolor: randomDate ? categoryColors[randomDate.category] : 'background.paper',
                color: mode === 'dark' ? 'white' : 'black',
              }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Here's your random date idea!
                </Typography>
                {randomDate && (
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    {categoryIcons[randomDate.category]}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Category: {randomDate.category}
                      </Typography>
                      <Typography variant="body1">
                        Date Idea: {randomDate.name}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Zoom>
          </Modal>
          <Fade in={true} timeout={800} style={{ transitionDelay: '600ms' }}>
            <Paper sx={{ mt: 4, mb: 2, p: 3 }}>
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
            </Paper>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;