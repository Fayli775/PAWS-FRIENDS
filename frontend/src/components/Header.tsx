'use client';
import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';


const navItems = [
  { label: 'Our Services', path: '/services' },
  { label: 'Site Share', path: '/site-share' },
  { label: 'Events', path: '/events' },
  { label: 'Log in', path: '/login' },
  { label: 'Register', path: '/register' },
];

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{  backgroundColor: '#fff8e9' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Paw's Friend Logo" style={{ width:'60px', height:'60px', marginRight: '10px' }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontFamily: 'var(--font-comic-neue)' }}>
            Paw's Friend
          </Typography>
        </Box>
        <Box>
          {navItems.map((item) => (
            <Button key={item.label} component={Link} href={item.path} color="inherit" sx={{ textTransform: 'none', fontWeight: 500, mx: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {item.label}
              </Typography>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 