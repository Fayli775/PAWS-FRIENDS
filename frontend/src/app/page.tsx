'use client'; // Needed for useState, useEffect, etc.
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';
import ServicesSection from '@/components/ServicesSection';
import { Box, Stack } from '@mui/material';

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
  const [searchResults, setSearchResults] = useState<PetSitter[]>([]);

  const handleSearchResults = (results: PetSitter[]) => {
    setSearchResults(results);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Stack useFlexGap direction="column" spacing={{lg:4, sm:2}}>
        {/* Search Section */}
        <SearchSection onSearchResults={handleSearchResults} />

        {/* Services Section */}
        <ServicesSection />

        {/* Display Search Results */}
        {searchResults.length > 0 && (
          <Box sx={{ p: 4 }}>
            <ul>
              {searchResults.map((sitter) => (
                <li key={sitter.id}>{sitter.name} - {sitter.location} ({sitter.petTypes.join(', ')})</li>
              ))}
            </ul>
          </Box>
        )}

        {/* You can add more sections here */}
        {/* Example:
        <FeaturedSittersSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <ContactSection />
        */}
      </Stack>
    </Box>
  );
}
