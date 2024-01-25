import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './Auth/LogoutButton';
import AuthTabs from './Auth/AuthTabs';
import Text from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import TicTacToeGame from './Game/TicTacToeGame';
import JoinGame from './Game/JoinGame';
import GameList from './Game/GameList';
import CreateGameButton from './Game/CreateGameButton';
import FinishedGames from './Game/FinishedGames';




const Dashboard = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [game, setGame] = useState(null);
  const username = localStorage.getItem('username');

  const [showTicTacToe, setShowTicTacToe] = useState(false);

  const handleCreateGameClick = () => {
    setShowTicTacToe(true);
  };
  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // If not, redirect to the login page or AuthTabs
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  const token = localStorage.getItem('token');

  return (
    <div style={{ padding: theme.spacing(5)}}>
    
      <Grid container mb={4} spacing={1} alignItems="center" className='glassmorphism'>
        <Grid item xs={5} style={{ display: 'flex', alignItems: 'center',  }}>
          <Avatar alt="User Avatar" src="https://i.pravatar.cc/300/300" />
          <Text style={{ marginLeft: "10px", color: "white" }}>Welcome {username}</Text>
        </Grid>
        <Grid item xs={3}>
          <CreateGameButton onClick={handleCreateGameClick} />
        </Grid>
        <Grid item xs={2}>
  
        </Grid>
        <Grid item xs={2} >
          {token ? (
            <LogoutButton setLoggedIn={setLoggedIn} />
          ) : (
            <AuthTabs />
          )}
        </Grid>
      </Grid>


      
      {showTicTacToe && token && <TicTacToeGame token={token} />}
      <JoinGame />
      <GameList />

      <FinishedGames />
    </div>
  );
};

export default Dashboard;
