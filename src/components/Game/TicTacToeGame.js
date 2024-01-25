import React, { useState, useEffect } from 'react';

import GameBoard from './GameBoard';
import WinnerOverlay from './WinnerOverlay';
import { Button } from '@mui/material';

const TicTacToeGame = ({ userId }) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openWinnerOverlay, setOpenWinnerOverlay] = useState(false);

  const fetchGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://tictactoe.aboutdream.io/games/${game.id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLoading(true);
      if (!response.ok) {
        throw new Error('Failed to fetch the game');
      }
  
      const data = await response.json();
  
      const player1Username = data.first_player.username;
      const player2Username = data.second_player ? data.second_player.username : '';
  
      if (data.second_player && data.second_player.username) {
        console.log('User has joined the game:', data.second_player.username);
      } else {
        console.log('User has not joined the game yet');
      }
  
      setGame((prevGame) => ({
        ...prevGame,
        board: data.board,
        first_player: {
          ...prevGame.first_player,
          username: player1Username,
        },
        second_player: {
          ...(data.second_player || {}),
          username: player2Username,
        },
        winner: data.winner ? data.winner.username : null, // Add this line
      }));
      
      if (data.winner) {
        console.log('Winner found:', data.winner); // Log the winner
        setOpenWinnerOverlay(true);
      }
    } catch (error) {
      console.error('Error fetching the game:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpenWinnerOverlay(false);
  };
  
  useEffect(() => {
    const fetchGameInterval = setInterval(fetchGame, 1000);
  
    return () => {
      clearInterval(fetchGameInterval);
    };
  }, [game]);

  const createGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      const userId = localStorage.getItem('userId');
      const response = await fetch('https://tictactoe.aboutdream.io/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_player: {
            id: userId,
            username: username,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create a new game');
      }
      const data = await response.json();
      console.log('Created new game:', data);
      setGame(data);
    } catch (error) {
      console.error('Error creating a new game:', error);
    }
  };

  const [currentPlayer, setCurrentPlayer] = useState('X');

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

      const updatedGame = await response.json();
      setGame(updatedGame); 
  
      if (updatedGame.winner) {
        setOpenWinnerOverlay(true);
      }

      if (updatedGame.turn === game.turn) {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      } else {
        console.log("Not the current player's turn.");
      }
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
          player: game.first_player.id,
          row: rowIndex,
          col: columnIndex,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to make a move:', errorData);
        return;
      }
  
      const updatedGame = await response.json();
      setGame(updatedGame); 
      makeMove(rowIndex, columnIndex);
    } catch (error) {
      console.error('Error making a move:', error);
    }
  };

  return (
    <div>
      <Button sx={{mb: 1, color: 'white'}} onClick={createGame}>Create new game</Button>
      {game && (
        <>
      <GameBoard
          board={game.board}
          handleCellClick={handleCellClick}
          firstPlayer={game.first_player}
          secondPlayer={game.second_player}
          game={game}
          setGame={setGame}
        />
          <WinnerOverlay gameId={game?.id} open={openWinnerOverlay} handleClose={handleClose} />
        </>
      )}
    </div>
  );
};

export default TicTacToeGame;
