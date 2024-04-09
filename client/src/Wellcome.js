import React from 'react';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';// poti sa te joci aici cu orice icon vrei sau gasesti 
import { Container, Typography, Button, Avatar, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Welcome() {
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
        <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
          <SentimentSatisfiedIcon /> 
        </Avatar>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Welcome to Booking Iași
        </Typography>
        <Button
          component={RouterLink} //RouterLink pentru calea catre pagina de autentificare
          to="/login"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Connect
        </Button>
      </Box>
    </Container>
  );
}

export default Welcome;
