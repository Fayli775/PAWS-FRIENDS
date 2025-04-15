'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '@/components/Header';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Simple registration form example
export default function RegisterPage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Register
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    {/* Add fields like First Name, Last Name if needed */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                     {/* Add link to login page if needed */}
                </Box>
            </Container>
        </Box>
    );
} 