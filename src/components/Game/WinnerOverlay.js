import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const WinnerOverlay = ({ gameId, open, handleClose }) => {
  const [winner, setWinner] = useState(null);
  const [dialogShown, setDialogShown] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://tictactoe.aboutdream.io/games/${gameId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.winner) {
        setWinner(data.winner.username);
      }
    };
  
    if (!dialogShown) {
      const intervalId = setInterval(fetchGame, 1000); // Send a request every second
  
      // Clear the interval when the component is unmounted or when the dialog is shown
      return () => clearInterval(intervalId);
    }
  }, [gameId, dialogShown]);
  let message;
  if (winner == null) {
    message = "It's a draw";
  } else {
    message = `${winner} won!`;
  }

  const handleCloseAndRefresh = () => {
    setDialogShown(true);
    handleClose();
    window.location.reload();
  };

  return (
    <Dialog open={open && !dialogShown} onClose={handleCloseAndRefresh}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={handleCloseAndRefresh}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WinnerOverlay;