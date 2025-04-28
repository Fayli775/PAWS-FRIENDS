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
  id: number;
  user_name: string;
  bio: string;
  avatar: string;
  region: string;
  average_rating: number | null;
  review_count: number;
}

interface SearchSectionProps {
  onSearchResults?: (results: PetSitter[]) => void;
}

const regions = ['North Shore', 'West Auckland', 'Central Auckland', 'East Auckland', 'South Auckland'];

const SearchSection: React.FC<SearchSectionProps> = ({ onSearchResults }) => {
  const [keyword, setKeyword] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append('keyword', keyword);
    if (region) queryParams.append('region', region);
    queryParams.append('page', '1'); // 默认查第一页
    queryParams.append('limit', '8'); // 每页查8条，跟之前设定一致

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/sitters/search?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onSearchResults?.(data.sitters || []);
      console.log('Search Results:', data);
    } catch (error) {
      console.error('Failed to fetch sitters:', error);
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
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search by keyword..."
              variant="outlined"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              sx={{ backgroundColor: 'background.paper' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: 'background.paper' }}>
              <InputLabel>Region</InputLabel>
              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                label="Region"
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                {regions.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
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
