import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Modal, Box } from '@mui/material';
import IdeaList from './components/IdeaList';
import AddIdeaForm from './components/AddIdeaForm';
import RandomizeIdea from './components/RandomizeIdea';

const initialIdeas = [
  { id: 1, category: 'Work', name: 'Start a blog' },
  { id: 2, category: 'Personal', name: 'Learn a new language' },
  { id: 3, category: 'Hobby', name: 'Try watercolor painting' },
];

function App() {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [randomIdea, setRandomIdea] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const addIdea = (newIdea) => {
    setIdeas([...ideas, { id: ideas.length + 1, ...newIdea }]);
  };

  const handleRandomize = (category) => {
    const filteredIdeas = category === 'All' ? ideas : ideas.filter(idea => idea.category === category);
    const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
    setRandomIdea(filteredIdeas[randomIndex]);
    setOpenModal(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" gutterBottom>
        Idea Randomizer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <IdeaList ideas={ideas} />
        </Grid>
        <Grid item xs={12} md={6}>
          <AddIdeaForm addIdea={addIdea} />
        </Grid>
      </Grid>
      <RandomizeIdea ideas={ideas} onRandomize={handleRandomize} />
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
            Random Idea
          </Typography>
          {randomIdea && (
            <Typography sx={{ mt: 2 }}>
              Category: {randomIdea.category}<br />
              Idea: {randomIdea.name}
            </Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default App;