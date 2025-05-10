'use client'

import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Card,
  CardContent,
  Rating,
  Divider,
} from '@mui/material'
import useAuth from '@/hooks/useAuth'

interface Review {
  id: number
  rating: number
  reviewer: string
  created_at: string
  comment: string
  pet_type: string
  service_type: string
}

export default function Reviews() {
  const { user } = useAuth(true)
  const [reviews, setReviews] = useState<Review[]>([])
  
  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return
      
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/sitter/${user.id}`)
        const data = await res.json()

        if (data.status === 'success') {
          setReviews(data.reviews)
        } else {
          console.error('Failed to load reviews:', data.message)
        }
      } catch (err) {
        console.error('API error:', err)
      }
    }

    fetchReviews()
  }, [user])


  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Your Ratings & Reviews
      </Typography>

      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        <Box>
          {reviews.map((review) => (
            <Card 
              key={`review-${review.id}-${review.created_at}`} 
              variant="outlined" 
              sx={{ mb: 2 }}
            >
              <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight={600}>{review.pet_type}</Typography>
                    <Typography fontWeight={600}>{review.service_type}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>

                <Rating key={review.id} value={review.rating} readOnly size="small" sx={{ my: 1 }} />
                <Divider />
                <Typography variant="body2" mt={1}>
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
            ))
          }
      </Box>
      )}
    </Box>
  )
}
