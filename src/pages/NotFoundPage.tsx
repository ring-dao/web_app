// NotFoundPage.tsx

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          404 Not Found
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          variant="outlined"
          sx={{ mt: 3 }}
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
