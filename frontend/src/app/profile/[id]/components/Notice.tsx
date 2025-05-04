'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, Chip } from '@mui/material'

interface Notice {
  id: number
  title: string
  message: string
  read_tag: number
  created_at: string
}

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    const fetchNotices = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/my`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.status === 'success') setNotices(data.notices)
    }
    fetchNotices()
  }, [])

  return (
    <Box>
      <Typography variant="h5" mb={2}>📩 Your Inbox</Typography>
      {notices.map((n) => (
        <Card
        key={n.id}
        variant="outlined"
        sx={{
          mb: 2,
          cursor: 'pointer',
          backgroundColor: n.read_tag === 1 ? '#fff' : '#f0f8ff', // 未读淡蓝背景
        }}
        onClick={async () => {
          if (n.read_tag === 0) {
            try {
              const token = localStorage.getItem('token')
              await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/${n.id}/read`, {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              // 更新本地状态
              setNotices((prev) =>
                prev.map((item) =>
                  item.id === n.id ? { ...item, read_tag: 1 } : item
                )
              )
            } catch (err) {
              console.error('Mark as read failed:', err)
            }
          }
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{n.title}</Typography>
            {n.read_tag === 0 && <Chip label="New" color="primary" size="small" />}
          </Box>
          <Typography variant="body2" mt={1}>{n.message}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(n.created_at).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      
      ))}
    </Box>
  )
}
