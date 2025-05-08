'use client'

import React, { useState, useEffect } from 'react'
import {
  Box, Typography, Avatar, Stack,
  Snackbar, Alert, IconButton, Grid, Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AvatarUpload from '@/components/AvatarUpload'

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
      console.log('📦 当前 Token:', token)

      if (!token) throw new Error('No token found.')

      const res = await fetch(`${API_URL}/api/certificate/certificates`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('📡 GET 请求状态:', res.status)
      if (!res.ok) {
        const errResult = await res.json()
        console.error('❌ 证书获取失败:', errResult)
        throw new Error(errResult.message || 'Failed to load certifications')
      }

      const data = await res.json()
      console.log('✅ 返回的证书数据:', data)
      setUploadedFiles(data)
    } catch (err: any) {
      console.error('🔥 fetch error:', err)
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchUploadedFiles()
  }, [])

  const handleUpload = async () => {
    if (!selectedFile) return
    try {
      const token = getAuthToken()
      console.log('📤 上传前 Token:', token)

      if (!token) throw new Error('No token found.')

      const formData = new FormData()
      formData.append('certification', selectedFile)

      const res = await fetch(`${API_URL}/api/certificate/uploadCertificate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      console.log('📤 上传请求状态:', res.status)
      const result = await res.json()
      console.log('📤 上传响应内容:', result)

      if (!res.ok) {
        console.error('❌ 上传失败:', result)
        throw new Error(result.message || 'Upload failed')
      }

      setMessage('Upload successful!')
      setSelectedFile(null)
      setPreviewUrl(null)
      fetchUploadedFiles()
    } catch (err: any) {
      console.error('🔥 upload error:', err)
      setError(err.message)
    }
  }

  const handleDelete = async (filePath: string) => {
    const filename = filePath.split('/').pop()
    if (!filename) return
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      const token = getAuthToken()
      console.log('🗑️ 删除证书:', filename)

      const res = await fetch(`${API_URL}/api/certificate/deleteCertificate/${filename}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('🗑️ 删除响应状态:', res.status)
      if (!res.ok) throw new Error('Failed to delete certification.')

      setMessage('Deleted successfully!')
      setUploadedFiles(prev => prev.filter(f => f !== filePath))
    } catch (err: any) {
      console.error('🔥 delete error:', err)
      setError(err.message)
    }
  }

  return (
    <Box display="flex" flexDirection="column" maxWidth={600} gap={3} mx="auto">
      <Typography variant="h5" fontWeight={600}>
        Upload Certifications
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: -2 }}>
      Please upload any type of NZ-ID or proof:
      <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
        <li>Local pet registration certificate</li>
        <li>Pet-business verification (business premises proof and NZBN registration details)</li>
        <li>Sitter accreditation (NZQA-certified courses)</li>
        <li>Local pet skills registration (pet first-aid certificates, professional references)</li>
      </ul>
    </Typography>

      <AvatarUpload
        avatar={previewUrl}
        setAvatar={(url, file) => {
          setPreviewUrl(url)
          if (file) setSelectedFile(file)
        }}
      />

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
            {uploadedFiles.map((file, idx) => (
              <Grid item key={idx}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar
                    src={`${API_URL}/images/uploads/certificates/${file.certificate_name}`}
                    sx={{ width: 80, height: 80 }}
                    imgProps={{ onError: (e) => (e.currentTarget.src = '/defaultAvatarDog.png') }}
                  />
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDelete(`/images/uploads/certificates/${file.certificate_name}`)
                    }
                  >
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
