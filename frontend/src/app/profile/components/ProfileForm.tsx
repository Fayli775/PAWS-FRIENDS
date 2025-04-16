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
    email: 'jenny@example.com',      // 只读
    nick_name: 'JennyZ',             // 可编辑
    passwd: '',                      // 新密码
    bio: '',                         // 个人简介
    logo: '',                        // 头像 base64
  })

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    console.log('✅ Saving user data:', formData)

    // 模拟“发送到后端”
    setTimeout(() => {
      setOpenSnackbar(true)
    }, 500)
  }

  const handleCancel = () => {
    setFormData({
      email: 'jenny@example.com',
      nick_name: 'JennyZ',
      passwd: '',
      bio: '',
      logo: '',
    })
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={500}>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B">
        Profile
      </Typography>

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

      {/* 成功提示（模拟） */}
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
