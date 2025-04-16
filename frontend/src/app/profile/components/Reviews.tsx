'use client'

import {
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  Divider,
} from '@mui/material'

// 模拟评价数据
const mockReviews = [
  {
    id: 1,
    rating: 5,
    reviewer: 'Alice',
    date: '2024-03-21',
    comment: 'Great service! My dog was super happy.',
  },
  {
    id: 2,
    rating: 4,
    reviewer: 'Bob',
    date: '2024-04-02',
    comment: 'Good sitter. Communication could improve.',
  },
]

export default function Reviews() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B" mb={2}>
        Your Ratings & Reviews
      </Typography>

      {mockReviews.map((review) => (
        <Card key={review.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>{review.reviewer}</Typography>
              <Typography variant="caption" color="text.secondary">
                {review.date}
              </Typography>
            </Box>

            <Rating value={review.rating} readOnly size="small" sx={{ my: 1 }} />
            <Divider />
            <Typography variant="body2" mt={1}>
              {review.comment}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
