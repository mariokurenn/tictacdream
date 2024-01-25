import React from 'react';
import {Typography, Avatar} from '@mui/material';

const GameBoard = ({ board, handleCellClick, firstPlayer, secondPlayer, game, setGame }) => (
  <>
   <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
          <Avatar alt="User Avatar" sx={{mr:1}} src="https://i.pravatar.cc/300/300" />
          <Typography variant="body2" color="text.secondary" className='white'>
          Player 1: {firstPlayer ? firstPlayer.username : 'Waiting for player...'}
          </Typography>
    </div>
    <div style={{display: 'flex', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem'}}>
          <Avatar alt="User Avatar" sx={{mr:1}} src="https://i.pravatar.cc/300/300" />
          <Typography variant="body2" color="text.secondary" className='white'>
          Player 2: {secondPlayer ? secondPlayer.username : 'Waiting for player...'}
          </Typography>
    </div>

    <table style={{marginBottom: '2rem'}}>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <td 
              key={columnIndex} 
              onClick={() => handleCellClick(rowIndex, columnIndex)} className="white-border cell">
                {firstPlayer && cell === firstPlayer.id ? 'X' : 
                 secondPlayer && cell === secondPlayer.id ? 'O' : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </>
);



export default GameBoard;