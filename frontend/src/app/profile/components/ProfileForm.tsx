'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material'

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    email: 'jenny@example.com',
    nick_name: '',
    passwd: '',
    bio: '',
    logo: '',
  })

  const [errors, setErrors] = useState({
    nick_name: '',
    passwd: '',
    bio: '',
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' })) // 清除当前字段错误提示
  }

  const validate = () => {
    const newErrors: any = {}

    if (!formData.nick_name.trim()) {
      newErrors.nick_name = 'Nickname is required'
    }

    if (formData.passwd && formData.passwd.length < 6) {
      newErrors.passwd = 'Password must be at least 6 characters'
    }

    if (formData.bio.length > 200) {
      newErrors.bio = 'Bio cannot exceed 200 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    console.log('✅ Saving user data:', formData)

    setTimeout(() => {
      setOpenSnackbar(true)
    }, 500)
  }

  const handleCancel = () => {
    setFormData({
      email: 'jenny@example.com',
      nick_name: '',
      passwd: '',
      bio: '',
      logo: '',
    })
    setErrors({ nick_name: '', passwd: '', bio: '' })
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={500}>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B">
        Profile
      </Typography>

      {/* Email 显示 */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Email
        </Typography>
        <Typography variant="body1">{formData.email}</Typography>
      </Box>

      <TextField
        label="Nickname"
        name="nick_name"
        value={formData.nick_name}
        onChange={handleChange}
        error={!!errors.nick_name}
        helperText={errors.nick_name}
        fullWidth
      />
      <TextField
        label="New Password"
        name="passwd"
        type="password"
        value={formData.passwd}
        onChange={handleChange}
        error={!!errors.passwd}
        helperText={errors.passwd}
        fullWidth
      />
      <TextField
        label="Bio"
        name="bio"
        multiline
        rows={3}
        value={formData.bio}
        onChange={handleChange}
        error={!!errors.bio}
        helperText={errors.bio}
        fullWidth
      />

      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#A78BFA', textTransform: 'none' }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Profile saved successfully (mock)
        </Alert>
      </Snackbar>
    </Box>
  )
}
