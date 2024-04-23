"use client";
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Hidden } from '@mui/material';
import { styled } from '@mui/system';

import { auth } from '../../firebase/firebase'; 
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'; 

const NavLink = styled(Link)({
  color: 'white',
  marginLeft: '1rem',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button component={NavLink} href="/Homepage">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} href="/Search">
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button component={NavLink} href="/RadiusMap">
          <ListItemText primary="Radar Maps" />
        </ListItem>
        <ListItem button component={NavLink} href="/Setting">
          <ListItemText primary="Settings" />
        </ListItem>
        {isLoggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={NavLink} href="/">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#ff7f50' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ClimateWise
          </Typography>
          <Hidden smDown>
            <NavLink href="/Homepage">Home</NavLink>
            <NavLink href="/Search">Search</NavLink>
            <NavLink href="/RadiusMap">Radar Maps</NavLink>
            <NavLink href="/Setting">Settings</NavLink>
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" href="/">
                Login
              </Button>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, 
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Navbar;
