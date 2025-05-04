'use client'

import React from 'react'
import { Box, Typography, Stack, TextField, Button } from '@mui/material'

export default function ComplaintForm({
  existingComplaint,
  newComplaint,
  onComplaintChange,
  isOwner,
  onSubmit,
}: {
  existingComplaint: string
  newComplaint: string
  onComplaintChange: (value: string) => void
  isOwner: boolean
  onSubmit: () => void
}) {
  return (
    <Box mt={4}>
      <Typography variant="subtitle1" fontWeight={600}>
        Complaint
      </Typography>

      {existingComplaint ? (
        <Typography color="error" mt={1}>
          {existingComplaint}
        </Typography>
      ) : (
        <Stack spacing={2} mt={1}>
          <TextField
            label="Describe your complaint"
            multiline
            rows={3}
            value={newComplaint}
            onChange={(e) => onComplaintChange(e.target.value)}
            fullWidth
          />
          <Button
            variant="outlined"
            color="error"
            onClick={onSubmit}
            disabled={!isOwner || !newComplaint.trim()}
          >
            Submit Complaint
          </Button>
        </Stack>
      )}
    </Box>
  )
}
