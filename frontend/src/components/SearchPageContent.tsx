'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Pagination,
  TextField,
  MenuItem,
  Stack,
  Chip,
  Rating,
} from '@mui/material';

interface PetSitter {
  id: string;
  name: string;
  location: string;
  petTypes: string[];
  rate: number;
  imageUrl: string;
  bio: string;
  rating: number;
  reviewCount: number;
  badges: string[];
}

const locations = ['Auckland', 'Wellington', 'Christchurch'];
const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit'];

const SearchPageContent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [sitters, setSitters] = useState<PetSitter[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 4;

  const [keyword, setKeyword] = useState(params.get('keyword') || '');
  const [location, setLocation] = useState(params.get('location') || '');
  const [petType, setPetType] = useState(params.get('petType') || '');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const query = new URLSearchParams();
        if (keyword) query.set('keyword', keyword);
        if (location) query.set('location', location);
        if (petType) query.set('petType', petType);

        const res = await fetch(`/api/sitters?${query.toString()}`);
        const data = await res.json();

        const enhancedData = data.map((sitter: any) => ({
          ...sitter,
          rating: (4.7 + Math.random() * 0.3).toFixed(1),
          reviewCount: Math.floor(20 + Math.random() * 30),
          badges: ['Certified', 'Experienced'],
          bio: sitter.bio || 'Pet lover with lots of care!',
        }));

        setSitters(enhancedData);
      } catch (error) {
        console.error('Failed to fetch sitters:', error);
      }
    };

    fetchResults();
  }, [params]);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (keyword) query.set('keyword', keyword);
    if (location) query.set('location', location);
    if (petType) query.set('petType', petType);

    router.push(`/search?${query.toString()}`);
  };

  const paginatedSitters = sitters.slice((page - 1) * perPage, page * perPage);

  return (
    <Box sx={{ backgroundColor: '#FFF9EB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title + Search bar */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Find the Right Pet Sitter
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Search by keyword, location or pet type
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ width: 250 }}
          />
          <TextField
            select
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={{ width: 200 }}
          >
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Pet Type"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            sx={{ width: 200 }}
          >
            {petTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" sx={{ backgroundColor: '#8e44ad', borderRadius: '20px' }} onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>

      {/* Results */}
      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Found {sitters.length} sitters
        </Typography>

        {paginatedSitters.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <img
              src="/empty-cat.png"
              alt="No Results"
              style={{ width: '200px', marginBottom: '20px' }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No sitters found.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try searching without a keyword?
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={4}>
              {paginatedSitters.map((sitter) => (
                <Grid item xs={12} sm={6} md={3} key={sitter.id}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 2,
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    boxShadow: 3,
                    transition: '0.3s',
                    '&:hover': { boxShadow: 6 },
                  }}>
                    <Avatar src={sitter.imageUrl} alt={sitter.name} sx={{ width: 80, height: 80, mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold">{sitter.name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                      <Rating value={parseFloat(sitter.rating)} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        ({sitter.reviewCount})
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      📍 {sitter.location}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Starts from ${sitter.rate}/hr
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {sitter.bio}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" justifyContent="center">
                      {sitter.badges.map((badge, index) => (
                        <Chip
                          key={index}
                          label={badge}
                          size="small"
                          sx={{
                            backgroundColor: badge === 'Certified' ? '#d1f0d1' : '#d1e8ff',
                            color: '#333',
                          }}
                        />
                      ))}
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box mt={6} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(sitters.length / perPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default SearchPageContent;
