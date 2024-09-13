import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const categoryColors = {
  Romantic: '#ffcccb',
  Adventure: '#90ee90',
  Relaxing: '#add8e6',
};

function DateList({ dates }) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Date Ideas</Typography>
      <List>
        {dates.map((date) => (
          <ListItem key={date.id} sx={{ bgcolor: categoryColors[date.category], mb: 1 }}>
            <ListItemText primary={date.name} secondary={date.category} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default DateList;