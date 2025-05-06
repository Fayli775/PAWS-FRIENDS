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

// Add constants for card dimensions
const CARD_WIDTH = 240;  // Fixed width for all cards
const CARD_HEIGHT = 260; // Fixed height for all cards

interface PetSitter {
  id: number;
  user_name: string;
  bio: string;
  avatar: string;
  region: string;
  average_rating: number | null;
  review_count: number;
}

const regions = ['North Shore', 'West Auckland', 'Central Auckland', 'East Auckland', 'South Auckland'];

const SearchPageContent = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [sitters, setSitters] = useState<PetSitter[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 8; // 每页 8 个

  const [keyword, setKeyword] = useState(params.get('keyword') || '');
  const [region, setRegion] = useState(params.get('region') || '');

  useEffect(() => {
    const fetchSitters = async () => {
      try {
        const query = new URLSearchParams();
        if (keyword) query.set('keyword', keyword);
        if (region) query.set('region', region);
        query.set('page', String(page));
        query.set('limit', String(perPage));

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/sitters/search?${query.toString()}`);
    
        if (!res.ok) {
          throw new Error('Failed to fetch sitters');
        }
        const data = await res.json();
        console.log('✅ API 返回的 sitter 数据:', data); // 👈 加在这里
        setSitters(data.sitters || []);
        setTotalPages(data.pagination?.total_pages || 1);
      } catch (error) {
        console.error('Error fetching sitters:', error);
      }
    };

    fetchSitters();
  }, [page, params]); // 注意：params 变化重新拉数据

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (keyword) query.set('keyword', keyword);
    if (region) query.set('region', region);

    router.push(`/search?${query.toString()}`);
    setPage(1); // 搜索后回到第一页
  };

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

  const handleSitterClick = (sitterId: number) => {
    router.push(`/sitter/${sitterId}`);
  };

  return (
    <Box sx={{ backgroundColor: '#FFF9EB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 搜索栏 */}
      <Box  sx={{
    py: { xs: 12, md: 16 },  // 上下 padding 加大
    minHeight: '600px',      // 最小高度拉大
    textAlign: 'center',
    backgroundImage: 'url("/home_bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#2c3e50',
  }}>
         <Typography
    variant="h2"
    fontWeight="bold"
    gutterBottom
    sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}
  >
          Find the Right Pet Sitter
        </Typography>
        <Typography
    variant="h6"
    color="text.secondary"
    sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, mb: 4 }}
  >
          Search by keyword or region
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{ width: 250, backgroundColor: 'white', borderRadius: 1 }}
          />
          <TextField
            select
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            sx={{ width: 250, backgroundColor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            {regions.map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#8e44ad',
              borderRadius: '20px',
              px: 4,
              height: '56px',
              '&:hover': { backgroundColor: '#732d91' },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* 搜索结果 */}
      <Container sx={{ flexGrow: 1 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Found {sitters.length} sitters
        </Typography>

        {sitters.length === 0 ? (
          <Box textAlign="center" mt={4}>
            <img src="/empty-cat.png" alt="No sitters found" style={{ width: '240px', marginBottom: '16px' }} />
            <Typography variant="body1" color="text.secondary">
              No sitters found. Try searching with different keywords!
            </Typography>
          </Box>
        ) : (
          <>

            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid 
                container 
                spacing={4} 
                sx={{ 
                  justifyContent: 'center',
                  maxWidth: CARD_WIDTH * 5 + 32 * 4, // 5 cards + 4 gaps
                  margin: '0 auto' 
                }}
              >
                {sitters.map((sitter) => (
                  <Grid 
                    item 
                    key={sitter.id}
                    sx={{ 
                      width: CARD_WIDTH,
                      maxWidth: CARD_WIDTH,
                      flexBasis: 'auto'
                    }}
                  >
                    <Card 
                      onClick={() => handleSitterClick(sitter.id)}
                      sx={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 2,
                        borderRadius: '16px',
                        backgroundColor: '#ffffff',
                        boxShadow: 3,
                        transition: '0.3s',
                        cursor: 'pointer',
                        '&:hover': { 
                          boxShadow: 6,
                          transform: 'translateY(-4px)'
                        },
                        overflow: 'hidden',
                      }}
                    >
                      <Avatar
                        src={sitter.avatar ? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/avatars/${sitter.avatar}` : '/avatar.jpg'}
                        alt={sitter.user_name}
      
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mb: 2,
                          flexShrink: 0 // Prevent avatar from shrinking
                        }}
                      />
                      <Typography 
                        variant="h6" 
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                          // Limit to 2 lines
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {sitter.user_name}
                      </Typography>
                      <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={0.5} 
                        sx={{ mt: 'auto', mb: 1 }}
                      >
                        <Rating value={sitter.average_rating || 0} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          ({sitter.review_count})
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        📍 {sitter.region}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                          mt: 1,
                          // Limit bio to 3 lines
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {sitter.bio}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>

            <Box mt={6} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
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
