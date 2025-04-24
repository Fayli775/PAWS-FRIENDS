'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Mock data for events
interface Event {
  id: number;
  month: string;
  day: string;
  title: string;
  description: string;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    month: 'APRIL',
    day: '15',
    title: 'Pet Fair',
    description: 'Enjoy a variety of pet-related exhibitors and products',
    image: '/event-pet-fair.png', // These images should be placed in the public folder
  },
  {
    id: 2,
    month: 'APRIL',
    day: '20',
    title: 'Dog Walk Meetup',
    description: 'Meet up with fellow dog lovers for a group walk',
    image: '/event-dog-walk.png',
  },
  {
    id: 3,
    month: 'APRIL',
    day: '28',
    title: 'Cat Lovers Seminar',
    description: 'Learn and discuss cat care with experts and enthusiasts',
    image: '/event-pet-lover-seminar.png',
  },
  {
    id: 4,
    month: 'MAY',
    day: '4',
    title: 'Outdoor Playdate',
    description: 'Spend a fun day outdoors with your furry friend',
    image: '/event-outdoor-play.png',
  },
  {
    id: 5,
    month: 'June',
    day: '4',
    title: 'Dog Training Workshop',
    description: 'Learn how to train your dog with the latest techniques',
    image: '/event-outdoor-play.png',
  },
  {
    id: 6,
    month: 'July',
    day: '14',
    title: 'Pet Food Expo',
    description: 'Spend a fun day outdoors with your furry friend',
    image: '/event-outdoor-play.png',
  },
];

// Styled components
const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(2, 0),
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  transition: 'transform 0.5s ease',
}));

const EventCard = styled(Box)(({ theme }) => ({
  flex: '0 0 auto',
  width: '100%',
  maxWidth: '280px',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  backgroundColor: '#fff',
}));

const EventImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

const EventInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DateBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  marginBottom: theme.spacing(1),
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: 0,
  color: theme.palette.primary.main,
  zIndex: 1,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
}));

const Indicators = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(2, 0),
}));

const Indicator = styled(Box)<{ active?: boolean }>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[300],
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

const EventsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  
  // Responsive breakpoints
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.only('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.only('md'));
  
  // Set events per slide based on screen size
  const eventsPerSlide = isXsScreen ? 1 : isSmScreen ? 2 : isMdScreen ? 3 : 4;
  
  const totalSlides = Math.ceil(mockEvents.length / eventsPerSlide);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < totalSlides - 1 ? prevIndex + 1 : 0));
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  // Group events into slides
  const slides = [];
  for (let i = 0; i < totalSlides; i++) {
    slides.push(
      mockEvents.slice(i * eventsPerSlide, (i + 1) * eventsPerSlide)
    );
  }
  
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        backgroundColor: '#f5f5ff',
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
          Save your Local Events
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Find fun activities in your area for you and your pet
        </Typography>

        <CarouselContainer>
          <NavButton
            onClick={handlePrev}
            sx={{ left: { xs: 0} }}
            aria-label="Previous"
          >
            <Typography variant="h3" component="span">‹</Typography>
          </NavButton>
          
          <CarouselTrack
            sx={{
              transform: `translateX(-${activeIndex * 100}%)`,
              display: 'flex',
              flexWrap: 'nowrap',
              width: '100%',
            }}
          >
            {slides.map((slide, slideIndex) => (
              <Box 
                key={slideIndex}
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexShrink: 0,
                  width: '100%'
                }}
              >
                {slide.map((event) => (
                  <EventCard key={event.id}>
                    <EventImage src={event.image} alt={event.title} />
                    <EventInfo>
                      <DateBox>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ 
                            color: 'primary.main',
                            display: 'block',
                            fontWeight: 'medium',
                          }}
                        >
                          {event.month}
                        </Typography>
                        <Typography
                          variant="h3"
                          component="span"
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 'bold',
                            lineHeight: 1,
                          }}
                        >
                          {event.day}
                        </Typography>
                      </DateBox>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 'bold',
                          mb: 1,
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    </EventInfo>
                  </EventCard>
                ))}
              </Box>
            ))}
          </CarouselTrack>
          
          <NavButton
            onClick={handleNext}
            sx={{ right: { xs: 0} }}
            aria-label="Next"
          >
            <Typography variant="h3" component="span">›</Typography>
          </NavButton>
        </CarouselContainer>
        
        <Indicators>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <Indicator
              key={index}
              active={index === activeIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </Indicators>
      </Container>
    </Box>
  );
};

export default EventsCarousel; 