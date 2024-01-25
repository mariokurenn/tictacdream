
import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const LogoutButton = ({ setLoggedIn }) => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);

    navigate("/");
  };

  return (
    <Button variant="outlined" style={{border: "1px solid white", color: "white"}} onClick={handleLogout}>Sign out</Button>
  );
};

export default LogoutButton;
