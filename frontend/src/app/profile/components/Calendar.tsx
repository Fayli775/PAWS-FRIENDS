'use client'

import { Typography, Box } from '@mui/material'

export default function Calendar() {
  return (
    <Box>
      <Typography variant="h5" color="#1E1B4B" fontWeight={600}>
        Service Availability Calendar
      </Typography>
      <Typography variant="body1" mt={2}>
        (Placeholder) You can set your weekly or holiday availability here.
      </Typography>
    </Box>
  )
}
