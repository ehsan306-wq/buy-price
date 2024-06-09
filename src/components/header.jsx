import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography component="div" style={{ padding: '25px 0' }}>
          <img src="/assets/ER.png" alt="EzyRes Logo" style={{ height: 60 }} />
          <img class="h-5 w-auto" src="assets/name.png" alt="" style={{ height: 55 }} />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
