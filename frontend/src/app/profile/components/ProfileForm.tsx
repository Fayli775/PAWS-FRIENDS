'use client'
import React from 'react'

import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    email: 'jenny@example.com',
    nick_name: 'JennyZ',
    passwd: '',
    bio: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    console.log('Saving profile:', formData)
  }

  const handleCancel = () => {
    // 可重置为初始数据
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={500}>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B">
        Profile
      </Typography>

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField
        label="Nickname"
        name="nick_name"
        value={formData.nick_name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="New Password"
        name="passwd"
        type="password"
        value={formData.passwd}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Bio"
        name="bio"
        multiline
        rows={3}
        value={formData.bio}
        onChange={handleChange}
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
    </Box>
  )
}
