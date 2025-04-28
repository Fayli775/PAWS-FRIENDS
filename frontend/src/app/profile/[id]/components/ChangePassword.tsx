'use client'
import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material'
import axios from 'axios'

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('New passwords do not match.')
      return
    }
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found.')

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/changePassword`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setSnackbarOpen(true)
      setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
    } catch (error) {
      console.error('Failed to change password:', error)
      alert('Failed to change password.')
    }
  }

  return (
    <Box display="flex" flexDirection="column" maxWidth={400} gap={2} mx="auto">
      <Typography variant="h5" fontWeight={600}>
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        type="password"
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="New Password"
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Confirm New Password"
        type="password"
        name="confirmNewPassword"
        value={formData.confirmNewPassword}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#A78BFA' }}>
        Save
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Password changed successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}
