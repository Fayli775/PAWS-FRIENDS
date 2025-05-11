'use client'

import { useEffect, useState } from 'react'
import { Box, Chip } from '@mui/material'

interface CertificationStatus {
  nzVerified: boolean
}

export default function CertificationsDisplay({ sitterId }: { sitterId: number }) {
  const [certifications, setCertifications] = useState<CertificationStatus | null>(null)

  useEffect(() => {
    const fetchCertificationStatus = async (sitterId: number) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificate/public/${sitterId}`)
        if (!res.ok) {
          const errResult = await res.json()
          console.error('Failed to fetch public certifications:', errResult)
          throw new Error(errResult.message || 'Failed to fetch public certificates')
        }
    
        const data = await res.json()
        // If certificates exist, user is considered verified
        const isVerified = Array.isArray(data) && data.length > 0
        setCertifications({ nzVerified: isVerified })
      } catch (err: any) {
        console.error('Public fetch error:', err)
        setCertifications({ nzVerified: false }) // Default to not verified
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
