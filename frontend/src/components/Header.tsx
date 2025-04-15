'use client';
import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

// Simple Paw icon component
const PawIcon = (props: any) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.5-7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#4A5568" />
     { /* Replace with a more accurate paw SVG path if desired */ }
  </SvgIcon>
);

const navItems = [
  { label: 'Our Services', path: '/services' },
  { label: 'Site Share', path: '/site-share' },
  { label: 'Events', path: '/events' },
  { label: 'Log in', path: '/login' },
  { label: 'Register', path: '/register' },
];

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.default' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PawIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Paw's Friend
          </Typography>
        </Box>
        <Box>
          {navItems.map((item) => (
            <Button key={item.label} component={Link} href={item.path} color="inherit" sx={{ textTransform: 'none', fontWeight: 500, mx: 1 }}>
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 