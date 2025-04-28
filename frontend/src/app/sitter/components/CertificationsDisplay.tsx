'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import axios from 'axios'

// 定义认证状态接口
interface CertificationStatus {
  nzIdVerified: boolean
  petRegistrationCertified: boolean
  nzqaCertified: boolean
  petFirstAidCertified: boolean
}

export default function CertificationsDisplay({ sitterId }: { sitterId: number }) {
  const [certifications, setCertifications] = useState<CertificationStatus | null>(null)

/*
useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${sitterId}/certifications`
        )
        setCertifications(response.data)
      } catch (error) {
        console.error('Failed to fetch certifications:', error)
      }
    }
    fetchCertifications()
  }, [sitterId])
*/
    useEffect(() => {
        // 临时Mock，假装拿到了认证数据
        setCertifications({
        nzIdVerified: true,
        petRegistrationCertified: false,
        nzqaCertified: true,
        petFirstAidCertified: true,
        })
    }, [])
    

  if (!certifications) {
    return null
  }

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Verified Certifications
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {/* NZ-ID */}
        <Chip
          label={certifications.nzIdVerified ? "NZ-ID Verified" : "NZ-ID Not Verified"}
          color={certifications.nzIdVerified ? "success" : "default"}
          variant={certifications.nzIdVerified ? "filled" : "outlined"}
        />

        {/* Pet Registration */}
        <Chip
          label={certifications.petRegistrationCertified ? "Pet Registration Certified" : "Pet Registration Not Certified"}
          color={certifications.petRegistrationCertified ? "success" : "default"}
          variant={certifications.petRegistrationCertified ? "filled" : "outlined"}
        />

        {/* NZQA Certified */}
        <Chip
          label={certifications.nzqaCertified ? "NZQA Certified" : "NZQA Not Certified"}
          color={certifications.nzqaCertified ? "success" : "default"}
          variant={certifications.nzqaCertified ? "filled" : "outlined"}
        />

        {/* Pet First Aid */}
        <Chip
          label={certifications.petFirstAidCertified ? "Pet First Aid Certified" : "Pet First Aid Not Certified"}
          color={certifications.petFirstAidCertified ? "success" : "default"}
          variant={certifications.petFirstAidCertified ? "filled" : "outlined"}
        />
      </Box>
    </Box>
  )
}
