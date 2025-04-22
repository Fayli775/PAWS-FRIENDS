'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '@/components/Header';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';

const DynamicLocationsMap = dynamic(() => import('@/components/LocationsMap'), {
    ssr: false,
    loading: () => <p>Loading map...</p>
});

export default function SiteSharePage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Pet-Friendly Locations
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Explore dog-friendly parks, cafes, and trails near you. Click on a marker for details.
                </Typography>

                <DynamicLocationsMap />

            </Container>
        </Box>
    );
} 