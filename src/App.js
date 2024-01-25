import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthTabs from './components/Auth/AuthTabs';
import Dashboard from './components/Dashboard';
import video from './media/background.mp4';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
       <video src={video} autoPlay muted loop className='video-background'></video>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthTabs setLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard setLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
    </div>
   
  );
};

export default App;
