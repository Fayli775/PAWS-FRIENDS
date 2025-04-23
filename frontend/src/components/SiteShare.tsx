'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Park interface
interface Park {
  id: number;
  name: string;
  rating: number;
  activity: string;
}

// Mock data for parks
const dogFriendlyParks: Park[] = [
  {
    id: 1,
    name: 'Onehunga Foreshore',
    rating: 4.7,
    activity: 'Dog Walking'
  },
  {
    id: 2,
    name: 'Victoria Park',
    rating: 4.4,
    activity: 'Dog Walking'
  },
  {
    id: 3,
    name: 'Auckland Domain',
    rating: 4.3,
    activity: 'Dog Walking'
  }
];

// Styled components
const MapContainer = styled(Paper)(({ theme }) => ({
  height: '600px',
  position: 'relative',
  borderRadius: 0,
  overflow: 'hidden',
  backgroundColor: '#e5f2f9',
  boxShadow: 'none',
  border: 'none',
}));

const MapPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e5f2f9',
  backgroundImage: 'url("/map-background.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.text.secondary,
}));

const ParksContainer = styled(Box)(({ theme }) => ({
  //height: '600px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  boxShadow: 'none',
  border: 'none',
}));

const ParksHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2, 2, 2),
  backgroundColor: 'white',
}));

const ParksListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(0, 2),
  backgroundColor: 'white',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none', /* Firefox */
  msOverflowStyle: 'none', /* IE and Edge */
}));

const ParkInfoCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  borderBottom: '1px solid #eaeaea',
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#f7a325',
}));

// Star icon component to avoid dependency issues
const StarIcon = () => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="#f7a325" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
  </svg>
);

const SiteShare: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: '#fef8f2',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            color: '#1a1a1a'
          }}
        >
          Site Share
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Find any dog-friendly place to walk and play with your pet.
        </Typography>

        <Grid container spacing={0} sx={{ backgroundColor: 'white', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
          <Grid size={{xs: 12, md: 8}}>
            <MapContainer>
              <MapPlaceholder>
                {/* Map content would go here */}
              </MapPlaceholder>
            </MapContainer>
          </Grid>
          <Grid size={{xs: 12, md: 4}}>
            <ParksContainer>
              <ParksHeader>
              <ParkInfoCard>
                    <Box>
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', fontSize: '1.75rem', color: '#1a1a1a' }}>
                        Dog-Friendly Parks in Auckland
                      </Typography>
                      
                    </Box>
                  </ParkInfoCard>
              </ParksHeader>
              
              <ParksListContainer>
                {dogFriendlyParks.map((park) => (
                  <ParkInfoCard key={park.id}>
                    <Box>
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1a1a1a' }}>
                        {park.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                        {park.activity}
                      </Typography>
                    </Box>
                    <RatingContainer>
                      <StarIcon />
                      <Typography variant="body1" fontWeight="medium" sx={{ ml: 0.5, fontSize: '1.25rem', color: 'black' }}>
                        {park.rating}
                      </Typography>
                    </RatingContainer>
                  </ParkInfoCard>
                ))}
              </ParksListContainer>
            </ParksContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SiteShare; 