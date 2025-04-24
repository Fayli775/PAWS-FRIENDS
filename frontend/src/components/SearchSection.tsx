'use client';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

interface PetSitter {
  id: string;
  name: string;
  location: string;
  petTypes: string[];
  rate: number;
  imageUrl: string;
}

interface SearchSectionProps {
  onSearchResults?: (results: PetSitter[]) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearchResults }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [petType, setPetType] = useState('');
  const [loading, setLoading] = useState(false);

  // Placeholder locations and pet types - can be fetched from API later
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Any'];

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true);
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
      onSearchResults?.(data);
      console.log('Search Results:', data);
    } catch (error) {
      console.error("Failed to fetch sitters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        backgroundImage: 'url("/home_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexBasis: '890px'
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 249, 235, 0.85)', p: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Find the Right Pet Sitter
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Search by keyword or filter your needs
        </Typography>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
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
          <Grid size={{ xs: 12, sm: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSearch}
              disabled={loading}
              sx={{ height: '56px' }}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchSection; 