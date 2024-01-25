import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, ListItemIcon, Avatar, Typography, ListItemAvatar } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const GameList = () => {
  const [games, setGames] = useState({ results: [] });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://tictactoe.aboutdream.io/games/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };
    fetchGames();
    const intervalId = setInterval(fetchGames, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Typography variant="h5" color="initial" sx={{color:'white', mt:'2rem'}}>Online servers:</Typography>
      <List sx={{display: 'flex', justifyContent: 'flex-start', gap: '2rem', width: '100%'}}>
        {games.results.map(game => (
          game.status === 'open' && (
            <div key={game.id} style={{maxWidth:'235px'}}>
              <ListItem className='glassmorphism-list' sx={{width:'100%'}}>
              <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', width:'100%'}}>
                <ListItemIcon>
                  <FiberManualRecordIcon style={{ color: 'green' }} />
                </ListItemIcon>
                <ListItemText primary={`Game ID: ${game.id}`} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem',width:'100%'}}>
                <Avatar alt="User Avatar" sx={{mr:1}} src="https://i.pravatar.cc/300/300" />
                <Typography variant="body2" color="text.secondary" className='white'>
                  Player 1: {game.first_player ? game.first_player.username : 'Unknown'}
                </Typography>
               </div>
               
              </ListItem>
            </div>
          )
        ))}
      </List>
    </div>
  );
};

export default GameList;