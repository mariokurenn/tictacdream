import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Typography,Box,Container,TextField,Button} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';


const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false); // Add this line
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  }, [navigate, setIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const request = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch("https://tictactoe.aboutdream.io/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
  
        setUsername("");
        setPassword("");
        setIsLoggedIn(true);
        setShowSuccessAlert(true);


        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setShowErrorAlert(true); 
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" className="white">
        Log in
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
            value={username}
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
            autoComplete="current-password"
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
            Log in
          </Button>
        </Box>
      </Box>
      {showSuccessAlert && (
        <Alert  icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{marginTop:'2rem'}}>
       Welcome {username}! You are now logged in. You will be redirected to dashboard in 3 seconds.
        </Alert>
      )}
      {showErrorAlert && ( // Add this line
        <Alert  icon={<WarningIcon fontSize="inherit" />} severity="error" sx={{marginTop:'2rem'}}>
        There is no user with that username and password. Try again
        </Alert>
        )}
    </Container>
  );
};

export default Login;
