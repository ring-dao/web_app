import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Paper } from '@mui/material';
import { proposal } from '../sdk/contractConnector'; // Make sure the paths and imports are correct
const SubmitProposal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleProposal = async () => {
    try {
      // Assuming the proposal function is correctly imported and works with one argument
      await proposal(description);
      alert('Proposal submitted successfully');
    } catch (error) {
      console.error('Failed to submit proposal:', error);
      alert('Failed to submit proposal');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Submit a Proposal
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleProposal}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SubmitProposal;
