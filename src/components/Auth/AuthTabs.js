import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import Register from './Register';

const AuthTabs = () => {
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define setIsLoggedIn state

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Tabs value={value} onChange={handleChange} centered  >
        <Tab label="Login" sx={{color: 'white'}}/>
        <Tab label="Register"sx={{color: 'white'}} />
      </Tabs>
      <TabPanel value={value} index={0} >
        <Login setIsLoggedIn={setIsLoggedIn} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register />
      </TabPanel>
    </div>
  );
};

const TabPanel = ({ value, index, children }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

export default AuthTabs;
