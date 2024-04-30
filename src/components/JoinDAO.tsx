import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';

const JoinDAO = () => {
  return (
    <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar style={{ justifyContent: 'center' }}>
          <Button variant="contained" color="primary" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)' }}>
            Join the DAO
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default JoinDAO;
