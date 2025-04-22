'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

// Service interface
interface Service {
  title: string;
  description: string;
  price: string;
  icon: string;
}

// Services data
const services: Service[] = [
  {
    title: 'In-Home Feeding',
    description: 'We visit your pet at home and ensure timely meals',
    price: 'From $25/hr',
    icon: '/in-home-feeding.png'
  },
  {
    title: 'Dog Walking',
    description: 'Daily walks to keep your dog happy and healthy',
    price: 'From $25/hr',
    icon: '/dog-walking.png'
  },
  {
    title: 'Boarding',
    description: "Safe, cozy home for your pets while you're away",
    price: 'From $25/hr',
    icon: '/boarding.png'
  },
  {
    title: 'Grooming',
    description: 'Professional grooming to keep pets clean and pretty',
    price: 'From $25/hr',
    icon: '/grooming.png'
  }
];

// Styled components
const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: '#fffffa',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

const ServicesSection: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: '#fafafa',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          Our Services
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Explore Trusted Pet Care: Walking, Grooming, Boarding & More
        </Typography>

        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid size={{xs:12, sm:6, md:3}} key={service.title}>
              <ServiceCard elevation={2}>
                <IconWrapper>
                  <img src={service.icon} alt={service.title} />
                </IconWrapper>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {service.description}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'medium',
                      color: 'primary.main'
                    }}
                  >
                    {service.price}
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection; 