import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import { Alert, Typography,Box,Container,TextField,Button} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
const Register = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      username: username,
      password: password,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://tictactoe.aboutdream.io/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const authToken = data.token;
          localStorage.setItem('token', authToken);
          setLoggedIn(true);

        } else {
          setShowSuccessAlert(true);
        }
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
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
        <Typography component="h1" variant="h5" className='white'>
          Register now
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            sx={{
              color: 'white',
              borderColor: 'white',
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: 'white',
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: 'white',
              },
              "& input": {
                color: "white",
              },
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            sx={{
              color: 'white',
              borderColor: 'white',
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                "& fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: 'white',
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: 'white',
              },
              "& input": {
                color: "white",
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
   
          <Button type="submit" variant="outlined" sx={{borderColor: 'white', color: 'white', mt:2}}>
            Register
          </Button>
        </Box>
        {showSuccessAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{marginTop:'2rem', marginLeft:'-1.4rem'}}>
            Registration was successful. You can login now.
          </Alert>
        )}
        {showErrorAlert && (
          <Alert icon={<WarningIcon fontSize="inherit" />} severity="error" sx={{marginTop:'2rem', marginLeft:'-5rem'}}>
            There was an error during registration.
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Register;