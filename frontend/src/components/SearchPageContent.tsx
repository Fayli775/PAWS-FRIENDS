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
  AppBar,
  Toolbar,
  Link,
} from '@mui/material';

interface PetSitter {
  id: string;
  name: string;
  location: string;
  petTypes: string[];
  rate: number;
  imageUrl: string;
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
        setSitters(data);
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
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#FFF9EB', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: '#000' }}>
          <Typography variant="h6" fontWeight="bold">
            🐾 Paw’s Friend
          </Typography>
          <Box>
            <Link href="#" underline="hover" sx={{ mx: 2, color: 'inherit' }}>Our Services</Link>
            <Link href="#" underline="hover" sx={{ mx: 2, color: 'inherit' }}>Site Share</Link>
            <Link href="#" underline="hover" sx={{ mx: 2, color: 'inherit' }}>Events</Link>
            <Link href="#" underline="hover" sx={{ mx: 2, color: 'inherit' }}>Log in</Link>
            <Link href="#" underline="hover" sx={{ mx: 2, color: 'inherit' }}>Register</Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Title + Search bar */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Find the Right Pet Sitter
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Search by keyword or filter your needs
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Search by keyword..."
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
          <Button variant="contained" sx={{ backgroundColor: '#8e44ad' }} onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>

      {/* Results */}
      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Search Results
        </Typography>

        {paginatedSitters.length === 0 ? (
          <Typography>No sitters found for your search.</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedSitters.map((sitter) => (
                <Grid item xs={12} sm={6} md={3} key={sitter.id}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar src={sitter.imageUrl} alt={sitter.name} sx={{ width: 64, height: 64, margin: 'auto' }} />
                      <Typography variant="h6" fontWeight="bold">{sitter.name}</Typography>
                      <Typography color="text.secondary">{sitter.location}</Typography>
                      <Typography>Rate: ${sitter.rate}/hr</Typography>
                      <Typography>Types: {sitter.petTypes.join(', ')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(sitters.length / perPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ mt: 8, backgroundColor: '#F4F4F4', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>🐾 Paw’s Friend</Typography>
              <Typography variant="body2">Connecting pet lovers in NZ</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Quick Links</Typography>
              <Typography variant="body2">Home</Typography>
              <Typography variant="body2">Services</Typography>
              <Typography variant="body2">Site Share</Typography>
              <Typography variant="body2">Events</Typography>
              <Typography variant="body2">Contact Us</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Contact Us</Typography>
              <Typography variant="body2">📞 +64 123 456 789</Typography>
              <Typography variant="body2">📧 info@example.com</Typography>
              <Typography variant="body2">✓ Verified pet sitters with pet care training</Typography>
              <Typography variant="body2">✓ Ensuring safe, punctual & reliable service</Typography>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="center">
            <Typography variant="body2">© 2025 Paw’s Friend. All rights reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SearchPageContent;
