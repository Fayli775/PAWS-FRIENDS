'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Rating,
  TextField,
} from '@mui/material'
import ReviewForm from './ReviewForm'
import ComplaintForm from './ComplaintForm'

// 计算时间状态
function getTimeStatus(bookingTime: string): 'upcoming' | 'ongoing' | 'completed' {
  const now = new Date()
  const booking = new Date(bookingTime)
  const diffMinutes = (booking.getTime() - now.getTime()) / 60000

  if (diffMinutes > 0) {
    return 'upcoming'
  } else if (diffMinutes > -90) {
    return 'ongoing'
  } else {
    return 'completed'
  }
}

export default function OrderDialog({
  order,
  role,
  onClose,
  onUpdate,
}: {
  order: any
  role: 'owner' | 'sitter'
  onClose: () => void
  onUpdate: (updatedFields: any) => void
}) {
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState<number | null>(null)
  const [newComplaint, setNewComplaint] = useState('')

  const timeStatus = getTimeStatus(order.bookingTime)

  const handleConfirm = () => onUpdate({ status: 'Confirmed' })
  const handleCancel = () => onUpdate({ status: 'Cancelled' })
  const handleComplete = () => onUpdate({ status: 'Completed' })

  const handleSubmitReview = () => {
    if (newReview.trim() && newRating) {
      onUpdate({ review: newReview, rating: newRating })
      setNewReview('')
      setNewRating(null)
    }
  }

  const handleSubmitComplaint = () => {
    if (newComplaint.trim()) {
      onUpdate({ complaint: newComplaint })
      setNewComplaint('')
    }
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography><strong>Pet:</strong> {order.petName}</Typography>
          <Typography><strong>Service:</strong> {order.serviceType}</Typography>
          <Typography><strong>Time:</strong> {order.bookingTime}</Typography>
          <Typography><strong>Status:</strong> {order.status}</Typography>

          {/* 按时间阶段和角色渲染操作按钮 */}
          {timeStatus === 'upcoming' && (
            <>
              {role === 'owner' && (
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel Booking
                </Button>
              )}
              {role === 'sitter' && order.status === 'Pending' && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="success" onClick={handleConfirm}>
                    Accept
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleCancel}>
                    Reject
                  </Button>
                </Stack>
              )}
            </>
          )}

          {timeStatus === 'ongoing' && role === 'owner' && order.status === 'Confirmed' && (
            <Button variant="contained" color="primary" onClick={handleComplete}>
              Mark as Completed
            </Button>
          )}

          {/* Review + Complaint */}
          {(order.status === 'Completed' || order.status === 'Cancelled') && (
            <>
              <ReviewForm
                existingReview={order.review}
                existingRating={order.rating}
                newReview={newReview}
                newRating={newRating}
                onReviewChange={setNewReview}
                onRatingChange={setNewRating}
                onSubmit={handleSubmitReview}
              />
              <ComplaintForm
                existingComplaint={order.complaint}
                newComplaint={newComplaint}
                onComplaintChange={setNewComplaint}
                onSubmit={handleSubmitComplaint}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
