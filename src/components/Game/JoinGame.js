import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import WinnerOverlay from './WinnerOverlay';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, colors } from '@mui/material';
import { Box } from '@mui/system';
const JoinGame =  ({ setHasJoinedGame }) => {
  const [gameId, setGameId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [game, setGame] = useState(null);
  
  const [loading, setLoading] = useState(false); // Define loading
  const userId = localStorage.getItem('userId'); // Define userId
  const [currentPlayer, setCurrentPlayer] = useState(null); // Define currentPlayer


  const [openWinnerOverlay, setOpenWinnerOverlay] = useState(false);

const handleClose = () => {
  setOpenWinnerOverlay(false);
};
  const fetchGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://tictactoe.aboutdream.io/games/${gameId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        
      }
      if (!gameId) {
        console.error('Game ID is not set');
        return;
      }
      const data = await response.json();
      setGame(data);
      if (data.winner) {
    setOpenWinnerOverlay(true);
}
      setCurrentPlayer(data.first_player.id === userId ? data.first_player : data.second_player);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchGame, 1000); // Fetch the game data every second

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, [fetchGame]);

  const joinGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://tictactoe.aboutdream.io/games/${gameId}/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('API Response:', response);

      if (!response.ok) {
        if (response.status === 403) {
          setErrorMessage('Room is full. You cannot join.');
        } else if (response.status === 404) {
          setErrorMessage('Room does not exist. Please check the game ID.');
        } else {
          // If the response is not okay, but there's no JSON input, handle it as an error
          throw new Error(`Failed to join the game. Server response: ${response.statusText}`);
        }
      } else {
        fetchGame(); // Fetch the game state after joining the game
        setHasJoinedGame(true); // Update hasJoinedGame state
      }
    } catch (error) {
      console.error('Error joining the game:', error);
    }
  };


  const makeMove = async (row, column) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://tictactoe.aboutdream.io/games/${game.id}/move/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ row, column, player: currentPlayer }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to make a move');
      }
  
      // Switch the current player after a successful move
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      fetchGame(); // Fetch the latest game state after making a move
    } catch (error) {
      console.error('Error making a move:', error);
    }
  };

  const handleCellClick = async (rowIndex, columnIndex) => {

    try {
      const response = await fetch(`https://tictactoe.aboutdream.io/games/${game.id}/move/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          player: game.second_player.id,
          row: rowIndex,
          col: columnIndex,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to make a move:', errorData);
        return;
      }
      makeMove(rowIndex, columnIndex);
      const updatedGame = await response.json();
      setGame(updatedGame); // Update the game state with the response
      
    } catch (error) {
      console.error('Error making a move:', error);
    }

  };
  return (
    <div>
      {!game || !game.first_player || (game.first_player.id !== userId && (!game.second_player || game.second_player.id !== userId)) ? (
        <>
 
<Box display="flex" alignItems="center" sx={{mb:2}} >
  <TextField
    id="outlined-start-adornment"
    sx={{ mr:2, borderRadius: '25px' }}
    value={gameId}
    onChange={(e) => setGameId(e.target.value)}
    InputProps={{
      startAdornment: <InputAdornment position="start" variant="standard" className='white' sx={{ color: 'white !important' }}><p>GAME ID:</p></InputAdornment>,
    }}
    className='glassmorphism-input'
  />
  <Button variant='outlined' sx={{color:'white', border: '1', borderColor: '#fff' }} onClick={joinGame}>Join Game</Button>
</Box>
        </>
      ) : null}
      {loading ? (
        <p>Loading...</p>
      ) : game && game.first_player && game.second_player ? (
        <>
          {game && <GameBoard 
            board={game.board} 
            handleCellClick={handleCellClick} 
            firstPlayer={game.first_player} 
            secondPlayer={game.second_player} 
            game={game} 
            setGame={setGame} 
          />}
       <WinnerOverlay gameId={game?.id} open={openWinnerOverlay} handleClose={handleClose} />
        </>
      ) : null}
    </div>
  );
};

export default JoinGame;