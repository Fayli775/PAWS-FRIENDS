'use client';
import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: '#f8f8f8',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              
              <img src="/footer-logo.png" alt="Footer Logo" width={32} />
              <Typography 
                variant="h5" 
                component="span"
                sx={{ 
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-comic-neue)',
                  ml: 1
                }}
              >
                Paw's Friend
              </Typography>
            </Box>
            {/* Tagline as subtext */}
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.9rem',
                letterSpacing: '0.5px'
              }}
            >
              Connecting pet lovers in NZ
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <IconButton aria-label="Facebook" sx={{ color: '#3b5998' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Instagram" sx={{ color: '#c32aa3' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="YouTube" sx={{ color: '#ff0000' }}>
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>

        {/* First section with divider and cat illustration */}
        <Box sx={{ position: 'relative', mb: 2, mt: 8 }}>
          
            <img 
              src="/footer-cat.png" 
              alt="Cat illustration" 
              width={isMobile ? 150 : 180} 
              style={{ 
                position: 'absolute',
                right: '60px',
                transform: 'translateY(-63%)',
                zIndex:99
                // bottom: isMobile ? '-5px' : '-10px'
              }}
            />
          <Divider textAlign='right' sx={{ width: '100%', position: 'relative', zIndex: 0 }}>
          

          </Divider>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '80%', mb: 4, gap: 2 }}>
          {/* Quick Links */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 max-content' } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" passHref>
                <Typography component="span" sx={{ cursor: 'pointer' }}>Home</Typography>
              </Link>
              <Link href="/services" passHref>
                <Typography component="span" sx={{ cursor: 'pointer' }}>Services</Typography>
              </Link>
              <Link href="/site-share" passHref>
                <Typography component="span" sx={{ cursor: 'pointer' }}>Site Share</Typography>
              </Link>
              <Link href="/contact" passHref>
                <Typography component="span" sx={{ cursor: 'pointer' }}>Contact Us</Typography>
              </Link>
            </Stack>
          </Box>

          {/* Resources */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 max-content' } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="/faqs" passHref>
                <Typography component="span" sx={{ cursor: 'pointer' }}>FAQs</Typography>
              </Link>
              <Link href="/support" passHref>
                <Typography component="span" sx={{ cursor: 'pointer' }}>Support</Typography>
              </Link>
            </Stack>
          </Box>

          {/* Contact Us */}
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 max-content' } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Typography>📞 +64 123 456 789</Typography>
              <Typography>📧 info@example.com</Typography>
              <Typography>📍 123 Queen St, Auckland</Typography>
            </Stack>
          </Box>
        </Box>

        {/* Second divider before copyright */}
        <Divider sx={{ mb: 3 }} />

        {/* Copyright */}
        <Typography variant="body2">
          © 2025 Paw's Friend. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 