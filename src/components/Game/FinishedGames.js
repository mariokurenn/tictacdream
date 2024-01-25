import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Dialog,DialogTitle,DialogContent,DialogActions } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FinishedGameBoard from './FinishedGameBoard';
const FinishedGames = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
const [selectedGame, setSelectedGame] = useState(null);

const handleClickOpen = (game) => {
  setSelectedGame(game);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  const fetchGames = async () => {
    try {
      const token = localStorage.getItem('token');
      const limit = page * 20;
      const response = await fetch(`https://tictactoe.aboutdream.io/games/?limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }

      const data = await response.json();
      const username = localStorage.getItem('username');

      const userGames = data.results.filter(game =>
        ((game.first_player && game.first_player.username === username) ||
        (game.second_player && game.second_player.username === username)) &&
        game.status === 'finished'
      );

      setGames(userGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  useEffect(() => {
    fetchGames();
    const intervalId = setInterval(fetchGames, 3000);
    return () => clearInterval(intervalId);
  }, [page]);


  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'flex-start', gap:'2rem'}}>
{games.length === 0 ? (

      <Typography variant="body1" color="initial" sx={{mt: '1rem', color:'white'}}>Currently you didn't finish any game. As soon as you do they will pop here and you can replay them</Typography>
    ) : (
    games.map((game, index) => (
      
      <Card key={index} className='finishedgames-card' sx={{ maxWidth: 345, marginBottom: '1rem', background:'transparent' }}>
        <CardContent>
          <Typography variant="body3" component="div" className='white' style={{marginBottom: '1rem'}}>
            Game ID: {game.id}
          </Typography>
          <Typography variant="body5" color="text.secondary" className='white' sx={{display:'flex'}}>
          <FiberManualRecordIcon style={{ color: 'green' }} />
            Winner: {game.winner ? game.winner.username : 'No winner yet'}
          </Typography>
         
          <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
          <Avatar alt="User Avatar" sx={{mr:1}} src="https://i.pravatar.cc/300/300" />
          <Typography variant="body2" color="text.secondary" className='white'>
            Player 1: {game.first_player.username}
          </Typography>
          </div>

          <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
          <Avatar alt="User Avatar" sx={{mr:1}} src="https://cataas.com/cat?type=square" />
          <Typography variant="body2" color="text.secondary" className='white'>
            Player 2: {game.second_player.username}
          </Typography>
          </div>
          <Typography variant="body2" color="text.secondary" className='white'>
            Time: {new Date(game.created).toLocaleString()}
          </Typography>
          <Button variant='outlined' onClick={() => handleClickOpen(game)} sx={{mt:2, color:'white'}}>Replay game</Button>
        </CardContent>
      </Card>
      ))
     )}
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Game {selectedGame?.id}</DialogTitle>
        <DialogContent>
          {selectedGame && <FinishedGameBoard game={selectedGame} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {games.length > 0 && (
        <div style={{width: '100%'}}>
          <Button  sx={{ml: 1,"&.MuiButtonBase-root:hover": {bgcolor: "transparent"}, color: 'white' }} onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</Button>
          <Button sx={{ color: 'white'}} onClick={() => setPage(prevPage => prevPage + 1)}>Next </Button>
        </div>
      )}
  </div>
);
};

export default FinishedGames;