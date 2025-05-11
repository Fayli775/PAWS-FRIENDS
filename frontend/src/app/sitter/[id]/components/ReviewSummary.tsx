'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Rating } from '@mui/material'

interface Review {
  rating: number
}

export default function ReviewSummary({ sitterId }: { sitterId: number }) {
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [totalReviews, setTotalReviews] = useState<number>(0)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/sitter/${sitterId}`)
        const data = await res.json()

        if (data.status === 'success' && Array.isArray(data.reviews)) {
          const total = data.reviews.length
          const sum = data.reviews.reduce((acc: number, cur: Review) => acc + cur.rating, 0)
          setTotalReviews(total)
          setAverageRating(total > 0 ? sum / total : 0)
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
      }
    }

    fetchReviews()
  }, [sitterId])

  if (averageRating === null) return null

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Rating value={averageRating} precision={0.1} readOnly size="small" />
      <Typography variant="body2">
        {averageRating.toFixed(1)} ({totalReviews} reviews)
      </Typography>
    </Box>
  )
}
