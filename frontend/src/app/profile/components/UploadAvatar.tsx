'use client'

import React, { useState } from 'react'
import { Avatar, Box, Button } from '@mui/material'

export default function UploadAvatar() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box textAlign="center">
      <Avatar
        alt="User Avatar"
        src={image || '/cat-avatar.png'}
        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
      />
      <Button
        variant="contained"
        component="label"
        size="small"
        sx={{ backgroundColor: '#A78BFA', textTransform: 'none' }}
      >
        Upload New Photo
        <input type="file" hidden accept="image/*" onChange={handleImageChange} />
      </Button>
    </Box>
  )
}
