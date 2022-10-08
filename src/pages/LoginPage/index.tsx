import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from 'react-query';
import { loginServiceHandler, LoginDataInterface } from '../../services/auth/login-services';

const theme = createTheme();

interface LoginFuntionProps {
  field: string;
  value: string;
}

export default function SignInSide() {
  const [loginData, setLoginData] = useState<LoginDataInterface>({
    email: '',
    password: '',
  });

  const mutation = useMutation((data: LoginDataInterface) => loginServiceHandler(data), {
    onSuccess: () => {},
  });

  const inputChangeHandler = ({ field, value }: LoginFuntionProps) => {
    if (field === 'email') {
      setLoginData({
        ...loginData,
        email: value,
      });
    } else {
      setLoginData({
        ...loginData,
        password: value,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ width: '80%', margin: 'auto', borderRadius: '11px' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
          }}
        />
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} > */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTopRightRadius: '12px',
              borderBottomRightRadius: '12px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                error={loginData['email'] === ''}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e: any) => inputChangeHandler({ field: 'email', value: e.target.value })}
              />
              <TextField
                margin="normal"
                error={loginData['password'] === ''}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e: any) => inputChangeHandler({ field: 'password', value: e.target.value })}
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => mutation.mutate(loginData)}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
