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

  return (
    <Box sx={{ backgroundColor: '#FFF9EB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 搜索栏 */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Find the Right Pet Sitter
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Search by keyword or region
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
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            sx={{ width: 250 }}
          >
            <MenuItem value="">All</MenuItem>
            {regions.map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#8e44ad', borderRadius: '20px' }}
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
            <Grid container spacing={4}>
              {sitters.map((sitter) => (
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
                    <Avatar
                      src={sitter.avatar}
                      alt={sitter.user_name}
                      sx={{ width: 80, height: 80, mb: 2 }}
                    />
                    <Typography variant="h6" fontWeight="bold">{sitter.user_name}</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                      <Rating value={sitter.average_rating || 0} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        ({sitter.review_count})
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      📍 {sitter.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {sitter.bio}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

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
