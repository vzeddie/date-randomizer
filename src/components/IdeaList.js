import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const categoryColors = {
  Work: '#ffcccb',
  Personal: '#90ee90',
  Hobby: '#add8e6',
};

function IdeaList({ ideas }) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Ideas</Typography>
      <List>
        {ideas.map((idea) => (
          <ListItem key={idea.id} sx={{ bgcolor: categoryColors[idea.category], mb: 1 }}>
            <ListItemText primary={idea.name} secondary={idea.category} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default IdeaList;