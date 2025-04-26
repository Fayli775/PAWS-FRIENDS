'use client'; // Needed for useState, useEffect, etc.
import React, { useState } from 'react';
import SearchSection from '@/components/SearchSection';
import ServicesSection from '@/components/ServicesSection';
import EventsCarousel from '@/components/EventsCarousel';
import SiteShare from '@/components/SiteShare';
import { Box, Stack } from '@mui/material';
import Header from '@/components/Header'; // Import the header
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

// Types
interface PetSitter {
  id: string;
  name: string;
  location: string;
  petTypes: string[];
  rate: number;
  imageUrl: string;
}

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [petType, setPetType] = useState('');
  const [searchResults, setSearchResults] = useState<PetSitter[]>([]);

  const handleSearch = () => {
    const query = new URLSearchParams()
    if (keyword) query.append('keyword', keyword)
    if (location) query.append('location', location)
    if (petType && petType !== 'Any') query.append('petType', petType)
  
    router.push(`/search?${query.toString()}`)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Stack useFlexGap direction="column" spacing={{lg:4, sm:2}}>
        <SearchSection onSearchResults={handleSearch} />

        <ServicesSection />

        <SiteShare />

        <EventsCarousel />
        {searchResults.length > 0 && (
          <Box sx={{ p: 4 }}>
            <ul>
              {searchResults.map((sitter) => (
                <li key={sitter.id}>{sitter.name} - {sitter.location} ({sitter.petTypes.join(', ')})</li>
              ))}
            </ul>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
