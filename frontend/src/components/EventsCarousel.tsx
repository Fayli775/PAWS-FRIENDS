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
  url?: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    month: 'May',
    day: '15',
    title: 'Dogs on Campus',
    description: 'Drop in, pat a pup, and enjoy a moment of calm away from study.',
    image: '/dogs_on_campus.avif',
    url: 'https://www.eventbrite.com/e/dogs-on-campus-by-faculty-of-business-tickets-1353024595989?aff=ebdssbdestsearch&keep_tld=1',
  },
  {
    id: 2,
    month: 'May',
    day: '18',
    title: 'Browns Bay Dog Day Out',
    description: 'Get your four-legged furry friends prepped for a great day out in Browns Bay at this dog-centric event that\'s returning by popular demand!',
    image: '/Dog Day Out.avif',
    url: 'https://www.eventbrite.com/e/browns-bay-dog-day-out-tickets-1301693914539?aff=ebdssbdestsearch&keep_tld=1',
  },
  {
    id: 3,
    month: 'July',
    day: '1',
    title: 'K9 Heaven',
    description: 'Welcome to K9 Heaven, where dogs and their humans can enjoy a day filled with fun activities, treats, and lots of tail-wagging moments!',
    image: '/K9_heaven.avif',
    url:'https://www.eventbrite.com/e/k9-heaven-tickets-1329355109919?aff=ebdssbdestsearch',
  },
  {
    id: 4,
    month: 'June',
    day: '28',
    title: 'Cat Lovers Seminar',
    description: 'Learn and discuss cat care with experts and enthusiasts',
    image: '/event-pet-lover-seminar.png',
  },
  
  {
    id: 8,
    month: 'June',
    day: '4',
    title: 'Dog Training Workshop',
    description: 'Learn how to train your dog with the latest techniques',
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
  marginRight: theme.spacing(1),
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

interface IndicatorProps {
  active?: boolean;
}

const Indicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<IndicatorProps>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[300],
  margin: theme.spacing(0, 0.5),
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

const EventsCarousel: React.FC = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const theme = useTheme();
  
  // Responsive breakpoints
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmScreen = useMediaQuery(theme.breakpoints.only('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.only('md'));
  
  // Set number of visible cards based on screen size
  const visibleCards = isXsScreen ? 1 : isSmScreen ? 2 : isMdScreen ? 3 : 4;
  const cardWidth = 280;
  const cardGap = 8;
  const maxScrollIndex = Math.max(0, mockEvents.length - visibleCards);

  const handlePrev = () => {
    setScrollIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxScrollIndex));
  };

  const handleNext = () => {
    setScrollIndex((prevIndex) => (prevIndex < maxScrollIndex ? prevIndex + 1 : 0));
  };

  const handleIndicatorClick = (index: number) => {
    setScrollIndex(index);
  };
  
  return (
    <Box
      id="events-section" // 添加 id
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
              transform: `translateX(-${scrollIndex * (cardWidth + cardGap)}px)`,
              display: 'flex',
              flexWrap: 'nowrap',
              width: '100%',
              gap: 1,
            }}
          >
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                onClick={() => {
                  if (event.url) {
                    window.open(event.url, '_blank');
                  }
                }}
                sx={{
                  cursor: event.url ? 'pointer' : 'default',
                }}
              >
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
          {Array.from({ length: maxScrollIndex + 1 }).map((_, index) => (
            <Indicator
              key={index}
              active={index === scrollIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </Indicators>
      </Container>
    </Box>
  );
};

export default EventsCarousel;