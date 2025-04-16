'use client'

import { Typography, Box } from '@mui/material'

export default function Services() {
  return (
    <Box>
      <Typography variant="h5" color="#1E1B4B" fontWeight={600}>
        Services You Provide
      </Typography>
      <Typography variant="body1" mt={2}>
        (Placeholder) Here you can manage which pet services you provide, such as dog walking or pet sitting.
      </Typography>
    </Box>
  )
}
