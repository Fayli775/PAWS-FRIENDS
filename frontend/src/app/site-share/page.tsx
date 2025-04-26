'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '@/components/Header';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import PetsIcon from '@mui/icons-material/Pets';
import { styled } from '@mui/material/styles';

const DynamicLocationsMap = dynamic(() => import('@/components/LocationsMap'), {
    ssr: false,
    loading: () => <p>Loading map...</p>
});

const StyledContainer = styled(Container)(({ theme }) => ({
    background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)',
    borderRadius: '24px',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/paw-pattern.svg")',
        opacity: 0.1,
        pointerEvents: 'none',
    }
}));

const TitleBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
}));

export default function SiteSharePage() {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            
            <StyledContainer maxWidth="lg">
                <TitleBox>
                    <PetsIcon sx={{ fontSize: 40, color: '#FF69B4' }} />
                    <Box>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                color: '#FF69B4',
                                fontWeight: 'bold',
                                mb: 1
                            }}
                        >
                            Pet-Friendly Locations
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#4A5568',
                                fontSize: '1.1rem'
                            }}
                        >
                            Explore dog-friendly parks, cafes, and trails near you. Click on a marker for details.
                        </Typography>
                    </Box>
                </TitleBox>

                <Box sx={{ 
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    <DynamicLocationsMap />
                </Box>
            </StyledContainer>
        </Box>
    );
} 