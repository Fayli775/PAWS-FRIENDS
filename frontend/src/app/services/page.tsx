'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '@/components/Header';
import Box from '@mui/material/Box';

export default function ServicesPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Our Services
            </Typography>
            <Typography variant="body1">
                Placeholder content for the Services page.
            </Typography>
        </Container>
    </Box>
  );
} 