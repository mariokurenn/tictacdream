

import React from 'react';
import { Button } from '@mui/material/';

const CreateGameButton = ({ onClick }) => {
  return (
    <Button variant="contained" sx={{background: 'transparent', boxShadow: 'none', "&.MuiButtonBase-root:hover": {bgcolor: 'transparent', boxShadow: 'none'},}} onClick={onClick}>
      Create Game
    </Button>
  );
};

export default CreateGameButton;