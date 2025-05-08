'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import axios from 'axios'

interface CertificationStatus {
  nzVerified: boolean
}

export default function CertificationsDisplay({ sitterId }: { sitterId: number }) {
  const [certifications, setCertifications] = useState<CertificationStatus | null>(null)

  useEffect(() => {
    const fetchCertificationStatus = async (sitterId: number) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificate/public/${sitterId}`)
    
        console.log('📡 公共 GET 证书状态:', res.status)
    
        if (!res.ok) {
          const errResult = await res.json()
          console.error('❌ 获取公共证书失败:', errResult)
          throw new Error(errResult.message || 'Failed to fetch public certificates')
        }
    
        const data = await res.json()
        console.log('✅ 返回的公共证书数据:', data)
    
        // 如果有证书，说明是已认证用户
        const isVerified = Array.isArray(data) && data.length > 0
        setCertifications({ nzVerified: isVerified })
      } catch (err: any) {
        console.error('🔥 公共 fetch error:', err)
        setCertifications({ nzVerified: false }) // 默认为未认证
      }
    }

    fetchCertificationStatus(sitterId)
  }, [sitterId])

  if (!certifications) return null

  return (
    <Box mt={2}>
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Chip
          label={certifications.nzVerified ? "NZ Verified" : "NZ Not Verified"}
          color={certifications.nzVerified ? "success" : "default"}
          variant={certifications.nzVerified ? "filled" : "outlined"}
        />
      </Box>
    </Box>
  )
}

