'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List, ListItemText, ListItem, Drawer } from '@mui/material';


const navItems = [
  { label: 'Site Share', path: '/site-share' },
  { label: 'Events', path: '/events' },
  { label: 'Log in', path: '/login' },
  { label: 'Register', path: '/register' },
];


export default function Header() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileDrawerOpen((prev)=>!prev);
  };
  const mobileDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
  
    <List>
      {navItems.map((item) => (
        <ListItem key={item.label} component={Link} href={item.path} sx={{ textAlign: 'center' }}>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="sticky" color="transparent" elevation={0} sx={{  backgroundColor: '#fff8e9' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Paw's Friend Logo" style={{ width:'60px', height:'60px', marginRight: '10px' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'var(--font-comic-neue)' }}>
              Paw's Friend
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.label} component={Link} href={item.path} color="inherit" sx={{ textTransform: 'none', fontWeight: 500, mx: {sm:0, md:1} }}>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </Button>
            ))}
          </Box>
          <IconButton  sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon 
              onClick={handleDrawerToggle}
             
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '250px',
            },
          }}
        >
          {mobileDrawer}
        </Drawer>
      </nav>
    </>
  );
} 