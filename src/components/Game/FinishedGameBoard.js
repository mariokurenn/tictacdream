import React from 'react';
import { Typography, Avatar } from '@mui/material';

const FinishedGameBoard = ({ game }) => {
  if (!game || !game.board) {
    return <div>No game data</div>;
  }

  const { board, first_player, second_player } = game;

  return (
    <div>
      <div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
          <Avatar alt="User Avatar" sx={{mr:1}} src="https://i.pravatar.cc/300/300" />
          <Typography variant="body2" >
            Player 1 (X): {first_player ? first_player.username : 'Unknown'}
          </Typography>
        </div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
          <Avatar alt="User Avatar" sx={{mr:1}} src="https://i.pravatar.cc/300/300" />
          <Typography variant="body2" >
            Player 2 (O): {second_player ? second_player.username : 'Unknown'}
          </Typography>
        </div>
      </div>
      <table className='dialog-table'>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <td key={columnIndex} className="white-border">
                  {first_player && cell === first_player.id ? 'X' : 
                   second_player && cell === second_player.id ? 'O' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinishedGameBoard;