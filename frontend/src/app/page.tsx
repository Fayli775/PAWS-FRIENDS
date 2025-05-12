'use client'; // Needed for useState, useEffect, etc.
import EventsCarousel from '@/components/EventsCarousel';
import SearchSection from '@/components/SearchPageContent';
import ServicesSection from '@/components/ServicesSection';
import SiteShare from '@/components/SiteShare';
import { Box, Stack } from '@mui/material';
import { Suspense } from 'react';


export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Stack useFlexGap direction="column" spacing={{lg:4, sm:2}}>
      <Suspense fallback={<div>Loading search filters...</div>}> {/* You can customize this fallback */}
          <SearchSection />
        </Suspense>
      
        <ServicesSection />
        <SiteShare />
        <EventsCarousel />
      </Stack>
    </Box>
  );
}
