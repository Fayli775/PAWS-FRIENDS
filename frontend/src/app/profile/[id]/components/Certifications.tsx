'use client'
import React, { useState, useEffect } from 'react'
import {
  Box, Button, Typography, Avatar, Stack,
  Snackbar, Alert, IconButton, Grid
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Certifications() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const getAuthToken = () => localStorage.getItem('token')

  const fetchUploadedFiles = async () => {
    try {
      const token = getAuthToken()
      if (!token) throw new Error('No token found.')
      const res = await fetch(`${API_URL}/api/users/me/certifications`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to load certifications')
      const data = await res.json()
      setUploadedFiles(data) // Expecting array of file paths like /uploads/certifications/xxx.jpg
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchUploadedFiles()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    try {
      const token = getAuthToken()
      if (!token) throw new Error('No token found.')

      const formData = new FormData()
      formData.append('certification', selectedFile)

      const res = await fetch(`${API_URL}/api/users/me/uploadCertifications`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.message || 'Upload failed')
      }

      setMessage('Upload successful!')
      setSelectedFile(null)
      setPreviewUrl(null)
      fetchUploadedFiles()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (filePath: string) => {
    const filename = filePath.split('/').pop()
    if (!filename) return
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const token = getAuthToken()
      const res = await fetch(`${API_URL}/api/users/me/deleteCertification/${filename}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error('Failed to delete certification.')
      setMessage('Deleted successfully!')
      setUploadedFiles(prev => prev.filter(f => f !== filePath))
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Box display="flex" flexDirection="column" maxWidth={600} gap={3} mx="auto">
      <Typography variant="h5" fontWeight={600}>
        Upload Certification (Avatar Style)
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          src={previewUrl || '/defaultAvatarDog.png'}
          sx={{ width: 80, height: 80 }}
          imgProps={{ onError: (e) => (e.currentTarget.src = '/defaultAvatarDog.png') }}
        />
        <Button component="label" variant="outlined">
          Choose File
          <input hidden type="file" accept="image/*" onChange={handleFileChange} />
        </Button>
      </Stack>

      {selectedFile && (
        <Typography variant="body2" color="text.secondary">
          Selected: {selectedFile.name}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleUpload}
        sx={{ backgroundColor: '#A78BFA' }}
        disabled={!selectedFile}
      >
        Upload
      </Button>

      {uploadedFiles.length > 0 && (
        <>
          <Typography variant="h6">Uploaded Certifications</Typography>
          <Grid container spacing={2}>
            {uploadedFiles.map((filePath, idx) => (
              <Grid item key={idx}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar
                    src={`${API_URL}${filePath}`}
                    sx={{ width: 80, height: 80 }}
                    imgProps={{ onError: (e) => (e.currentTarget.src = '/defaultAvatarDog.png') }}
                  />
                  <IconButton size="small" onClick={() => handleDelete(filePath)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Snackbar open={!!message} autoHideDuration={6000} onClose={() => setMessage(null)}>
        <Alert severity="success" onClose={() => setMessage(null)}>{message}</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
      </Snackbar>
    </Box>
  )
}
