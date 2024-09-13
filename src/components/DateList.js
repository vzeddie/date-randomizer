import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Fade, IconButton, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Favorite, Hiking, Weekend } from '@mui/icons-material';

const categoryColors = {
  Romantic: '#ffcccb',
  Adventure: '#90ee90',
  Relaxing: '#add8e6',
};

const categoryIcons = {
  Romantic: <Favorite />,
  Adventure: <Hiking />,
  Relaxing: <Weekend />,
};

function DateList({ dates, categoryColors, categoryIcons, onDelete }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Date Ideas</Typography>
      <List>
        {dates.map((date, index) => (
          <Fade in={true} timeout={500} style={{ transitionDelay: `${index * 100}ms` }} key={date.id}>
            <ListItem 
              sx={{ 
                bgcolor: categoryColors[date.category], 
                mb: 2, 
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {categoryIcons[date.category]}
                <ListItemText 
                  primary={date.name} 
                  secondary={date.category} 
                  sx={{ ml: 2 }}
                />
              </Box>
              <IconButton 
                onClick={() => onDelete(date.id)} 
                size="small" 
                sx={{ 
                  '&:hover': { 
                    color: 'error.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Delete />
              </IconButton>
            </ListItem>
          </Fade>
        ))}
      </List>
    </Paper>
  );
}

export default DateList;