'use client'; // Needed for useState, useEffect, etc.
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid'; // For layout
import Header from '@/components/Header'; // Import the header

// Placeholder for API call result
interface PetSitter {
  id: string;
  name: string;
  location: string;
  petTypes: string[];
  rate: number;
  imageUrl: string;
}

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [petType, setPetType] = useState('');
  const [searchResults, setSearchResults] = useState<PetSitter[]>([]);
  const [loading, setLoading] = useState(false);

  // Placeholder locations and pet types - can be fetched from API later
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Any'];

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true);
    setSearchResults([]); // Clear previous results
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append('keyword', keyword);
    if (location) queryParams.append('location', location);
    if (petType && petType !== 'Any') queryParams.append('petType', petType);

    try {
        const response = await fetch(`/api/sitters?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PetSitter[] = await response.json();
        setSearchResults(data);
        console.log('Search Results:', data);
    } catch (error) {
        console.error("Failed to fetch sitters:", error);
        // Handle error state in UI if needed
    } finally {
        setLoading(false);
    }
  };

  // Basic effect to test MSW on initial load (optional)
  useEffect(() => {
    fetch('/api/sitters')
      .then(res => res.json())
      .then(data => console.log('Initial MSW fetch:', data))
      .catch(err => console.error('Initial MSW fetch failed:', err));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex', // Use flexbox for centering
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          py: 8, // Padding top and bottom
          backgroundImage: 'url("/home_bg.png")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 249, 235, 0.85)', p: 4, borderRadius: 2, textAlign: 'center' }}> {/* Semi-transparent overlay for text */} 
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Find the Right Pet Sitter
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Search by keyword or filter your needs
          </Typography>

          {/* Search Controls - Using MUI v7 Grid API */}
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            {/* Grid item for keyword search */}
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Search by keyword..."
                variant="outlined"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Grid>
            {/* Grid item for location */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'background.paper' }}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  label="Location"
                >
                  <MenuItem value="">
                    <em>Any</em>
                  </MenuItem>
                  {locations.map((loc) => (
                    <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
             {/* Grid item for pet type */}
            <Grid size={{ xs: 6, sm: 3 }}>
              <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'background.paper' }}>
                <InputLabel>Pet Type</InputLabel>
                <Select
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  label="Pet Type"
                >
                   {petTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
             {/* Grid item for search button */}
            <Grid size={{ xs: 12, sm: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSearch}
                disabled={loading}
                sx={{ height: '56px' }} // Match TextField height
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
          </Grid>

          {/* Display Search Results (Example) */}
          {searchResults.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">Results:</Typography>
              {/* Basic list display - enhance as needed */}
              <ul>
                {searchResults.map((sitter) => (
                  <li key={sitter.id}>{sitter.name} - {sitter.location} ({sitter.petTypes.join(', ')})</li>
                ))}
              </ul>
            </Box>
          )}
        </Container>
      </Box>
      {/* Footer could go here */}
    </Box>
  );
}
