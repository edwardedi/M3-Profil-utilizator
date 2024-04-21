
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';

function Singup() {
  const [message] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name  =  formData.get('name');
    const username  =  formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Name:', name, 'Username:',username,'Email:', email, 'Password:', password);

  };

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign up 
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Name"
            name="name"
            className='TextField'
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="username"
            className='TextField'
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className='TextField'
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className='TextField'
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
          </Button>
        </form>
        {message && <div>{message}</div>}
        <Grid container justifyContent="flex">
          <Grid item>
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                Happy to see you here! 😊
                </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Singup;
