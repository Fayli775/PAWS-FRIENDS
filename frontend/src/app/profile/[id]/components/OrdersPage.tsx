'use client'

import React, { useState } from 'react'
import { Box, Typography, Tabs, Tab, Stack } from '@mui/material'
import MyBookings from './MyBookings'
import ReceivedBookings from './ReceivedBookings'

export default function OrdersPage() {
  const [tab, setTab] = useState<'myBookings' | 'receivedBookings'>('myBookings')

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        My Orders
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab value="myBookings" label="My Bookings" />
        <Tab value="receivedBookings" label="Received Bookings" />
      </Tabs>

      <Stack spacing={2}>
        {tab === 'myBookings' && <MyBookings />}
        {tab === 'receivedBookings' && <ReceivedBookings />}
      </Stack>
    </Box>
  )
}
