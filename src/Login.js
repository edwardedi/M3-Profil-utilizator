import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';// plus Avatar pentru icon
import { Container, Typography, TextField, Button, Grid, Link, Avatar,Box} from '@mui/material';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Email:', email, 'Password:', password);//pt backend sa fie acolo
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
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
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
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>
      </form>
      <Grid container justifyContent="flex">
        <Grid item>
          <Link href="#" variant="body2">
            Don't have an account? Sign up 
          </Link>
        </Grid>
      </Grid>
      </Box>
    </Container>
  );
}

export default Login;
