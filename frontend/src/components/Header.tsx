'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List, ListItemText, ListItem, Drawer } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Check login status whenever the component mounts or updates
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      setIsLoggedIn(!!token);
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserId(user.id);
      }
    };

    // Check immediately
    checkLoginStatus();

    // Listen for storage changes (in case login/logout happens in another tab)
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserId(null);
    router.push('/');
  };

  // Define navigation items based on login status
  const navItems = [
    { label: 'Site Share', path: '/site-share' },
    { label: 'Events', path: '/events' },
    ...(isLoggedIn && userId
      ? [
          { label: 'Profile', path: `/profile/${userId}` },
          { label: 'Logout', onClick: handleLogout }
        ]
      : [
          { label: 'Log in', path: '/login' },
          { label: 'Register', path: '/register' }
        ]
    ),
  ];

  const mobileDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            component={item.onClick ? 'div' : Link} 
            href={item.path} 
            onClick={item.onClick}
            sx={{ textAlign: 'center', cursor: 'pointer' }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="sticky" color="transparent" elevation={0} sx={{ backgroundColor: '#fff8e9' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Paw's Friend Logo" style={{ width:'60px', height:'60px', marginRight: '10px' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'var(--font-comic-neue)' }}>
              Paw's Friend
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                component={item.onClick ? 'button' : Link} 
                href={item.path} 
                onClick={item.onClick}
                color="inherit" 
                sx={{ textTransform: 'none', fontWeight: 500, mx: {sm:0, md:1} }}
              >
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                  {item.label}
                </Typography>
              </Button>
            ))}
          </Box>
          <IconButton sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon onClick={handleDrawerToggle} />
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