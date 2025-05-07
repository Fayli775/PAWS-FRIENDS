'use client'

import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'

export default function ChangePassword() {
  const { user, accessToken } = useAuth(true)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('New passwords do not match.')
      return
    }

    if (!user || !accessToken) {
      setErrorSnackbarOpen(true)
      return
    }

    try {
      setLoading(true)

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/updatePassword/${user.id}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      setSnackbarOpen(true)
      setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
    } catch (error) {
      console.error('Failed to change password:', error)
      setErrorSnackbarOpen(true)
    } finally {
      setLoading(false)
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

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ backgroundColor: '#A78BFA', textTransform: 'none' }}
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>

      {/* 成功提示 */}
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

      {/* 失败提示 */}
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          Failed to change password. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  )
}
