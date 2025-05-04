'use client'

import React from 'react'
import { Box, Typography, Stack, TextField, Rating, Button } from '@mui/material'

export default function ReviewForm({
  existingReview,
  existingRating,
  newReview,
  newRating,
  onReviewChange,
  onRatingChange,
  isOwner,
  onSubmit,
}: {
  existingReview: string
  existingRating: number | null
  newReview: string
  newRating: number | null
  onReviewChange: (value: string) => void
  onRatingChange: (value: number | null) => void
  isOwner: boolean
  onSubmit: () => void
}) {
  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight={600}>
        Review
      </Typography>

      {existingReview ? (
        <Box>
          <Rating value={existingRating || 0} readOnly />
          <Typography color="text.secondary" mt={1}>
            {existingReview}
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2} mt={1}>
          <Rating
            value={newRating}
            onChange={(e, newValue) => onRatingChange(newValue)}
          />
          <TextField
            label="Write a review"
            multiline
            rows={3}
            value={newReview}
            onChange={(e) => onReviewChange(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={!isOwner || !newReview.trim() || !newRating}
          >
            Submit Review
          </Button>
        </Stack>
      )}
    </Box>
  )
}
