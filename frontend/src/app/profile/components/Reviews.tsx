'use client'

import { Typography, Box } from '@mui/material'

export default function Reviews() {
  return (
    <Box>
      <Typography variant="h5" color="#1E1B4B" fontWeight={600}>
        Your Ratings & Reviews
      </Typography>
      <Typography variant="body1" mt={2}>
        (Placeholder) Here you will see feedback from clients about your services.
      </Typography>
    </Box>
  )
}
