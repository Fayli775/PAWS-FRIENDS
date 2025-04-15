'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '@/components/Header';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Simple login form example
export default function LoginPage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Log In
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* Add remember me checkbox if needed */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    {/* Add forgot password / register links if needed */}
                </Box>
            </Container>
        </Box>
    );
} 