import React, { useState } from 'react'
import { Box, Typography, Button, MenuItem, TextField, Snackbar, Alert } from '@mui/material'
import axios from 'axios'

interface BookingCardProps {
  sitterId: number
}

export default function BookingCard({ sitterId }: BookingCardProps) {
  const [petId, setPetId] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      if (!token || !userStr) throw new Error('Missing authentication')

      const user = JSON.parse(userStr)
      const ownerId = user.id

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/new`,
        {
          sitterId,
          ownerId,
          petId,
          serviceType,
          bookingTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOpenSnackbar(true)
      // 清空表单
      setPetId('')
      setServiceType('')
      setBookingTime('')
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Failed to submit booking.')
    }
  }

  return (
    <Box sx={{ p: 3, border: '1px solid #eee', borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Book This Sitter
      </Typography>

      <TextField
        label="Pet ID"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Service Type"
        select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Dog Walking">Dog Walking</MenuItem>
        <MenuItem value="Pet Sitting">Pet Sitting</MenuItem>
        <MenuItem value="Boarding">Boarding</MenuItem>
      </TextField>
      <TextField
        label="Booking Time (YYYY-MM-DD HH:mm)"
        value={bookingTime}
        onChange={(e) => setBookingTime(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, backgroundColor: '#A78BFA' }}
        onClick={handleBooking}
      >
        Confirm Booking
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Booking submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}
