'use client'
import React, { useState } from 'react'
import { Box, Button, Typography, List, ListItem } from '@mui/material'

export default function Certifications() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setSelectedFiles(Array.from(files))
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one file.')
      return
    }
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found.')

      const formData = new FormData()
      selectedFiles.forEach((file) => {
        formData.append('certifications', file)
      })

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/uploadCertifications`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      alert('Certifications uploaded successfully!')
      setSelectedFiles([])
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload certifications.')
    }
  }

  return (
    <Box display="flex" flexDirection="column" maxWidth={500} gap={3} mx="auto">
      <Typography variant="h5" fontWeight={600}>
        Upload Certifications
      </Typography>

      <input type="file" multiple onChange={handleFileChange} />

      {selectedFiles.length > 0 && (
        <List>
          {selectedFiles.map((file, index) => (
            <ListItem key={index}>{file.name}</ListItem>
          ))}
        </List>
      )}

      <Button variant="contained" onClick={handleUpload} sx={{ backgroundColor: '#A78BFA' }}>
        Upload
      </Button>
    </Box>
  )
}
