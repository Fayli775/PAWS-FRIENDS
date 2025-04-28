'use client'

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
} from '@mui/material'

// Mock 初始订单数据
const initialOrders = [
  {
    id: 1,
    petName: 'Buddy',
    serviceType: 'Dog Walking',
    bookingTime: '2024-05-01 10:00',
    status: 'Pending',
    notes: 'Please be careful, Buddy is a bit shy.',
    review: '',
    rating: null,
    complaint: '',
  },
  {
    id: 2,
    petName: 'Mittens',
    serviceType: 'Pet Sitting',
    bookingTime: '2024-05-03 15:00',
    status: 'Confirmed',
    notes: 'Mittens loves to play with yarn.',
    review: '',
    rating: null,
    complaint: '',
  },
  {
    id: 3,
    petName: 'Oscar',
    serviceType: 'Dog Walking',
    bookingTime: '2024-05-07 08:00',
    status: 'Completed',
    notes: '',
    review: 'Oscar enjoyed the walk!',
    rating: 5,
    complaint: '',
  },
  {
    id: 4,
    petName: 'Luna',
    serviceType: 'Pet Sitting',
    bookingTime: '2024-05-10 11:00',
    status: 'Cancelled',
    notes: 'Owner had to cancel due to travel change.',
    review: '',
    rating: null,
    complaint: '',
  }
]

// 订单状态对应颜色
const statusColorMap: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  Pending: 'warning',
  Confirmed: 'success',
  Completed: 'success',
  Cancelled: 'error',
}

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<typeof initialOrders[0] | null>(null)
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState<number | null>(null)
  const [newComplaint, setNewComplaint] = useState('')

  const handleCloseDialog = () => {
    setSelectedOrder(null)
    setNewReview('')
    setNewRating(null)
    setNewComplaint('')
  }

  const handleConfirm = () => {
    if (selectedOrder) {
      const updated = orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: 'Confirmed' } : order
      )
      setOrders(updated)
      setSelectedOrder({ ...selectedOrder, status: 'Confirmed' })
    }
  }

  const handleCancel = () => {
    if (selectedOrder) {
      const updated = orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: 'Cancelled' } : order
      )
      setOrders(updated)
      setSelectedOrder({ ...selectedOrder, status: 'Cancelled' })
    }
  }

  const handleComplete = () => {
    if (selectedOrder) {
      const updated = orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: 'Completed' } : order
      )
      setOrders(updated)
      setSelectedOrder({ ...selectedOrder, status: 'Completed' })
    }
  }

  const handleSubmitReview = () => {
    if (selectedOrder && newReview.trim() && newRating) {
      const updated = orders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, review: newReview, rating: newRating }
          : order
      )
      setOrders(updated)
      setSelectedOrder({ ...selectedOrder, review: newReview, rating: newRating })
      setNewReview('')
      setNewRating(null)
    }
  }

  const handleSubmitComplaint = () => {
    if (selectedOrder && newComplaint.trim()) {
      const updated = orders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, complaint: newComplaint }
          : order
      )
      setOrders(updated)
      setSelectedOrder({ ...selectedOrder, complaint: newComplaint })
      setNewComplaint('')
    }
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        My Orders
      </Typography>

      <Stack spacing={2}>
        {orders.map((order) => (
          <Card
            key={order.id}
            variant="outlined"
            sx={{ cursor: 'pointer' }}
            onClick={() => setSelectedOrder(order)}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {order.petName} - {order.serviceType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.bookingTime}
                  </Typography>
                </Box>
                <Chip label={order.status} color={statusColorMap[order.status]} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* 订单详情 Dialog */}
      <Dialog open={!!selectedOrder} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography><strong>Pet:</strong> {selectedOrder.petName}</Typography>
              <Typography><strong>Service:</strong> {selectedOrder.serviceType}</Typography>
              <Typography><strong>Time:</strong> {selectedOrder.bookingTime}</Typography>
              <Typography><strong>Status:</strong> {selectedOrder.status}</Typography>
              <Typography><strong>Notes:</strong> {selectedOrder.notes || 'None'}</Typography>

              {/* 操作按钮 */}
              {selectedOrder.status === 'Pending' && (
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="contained" color="success" onClick={handleConfirm}>
                    Confirm
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              )}

              {selectedOrder.status === 'Confirmed' && (
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="contained" color="primary" onClick={handleComplete}>
                    Mark as Completed
                  </Button>
                </Stack>
              )}

              {/* Completed 或 Cancelled 后展示 Review 和 Complaint */}
              {(selectedOrder.status === 'Completed' || selectedOrder.status === 'Cancelled') && (
                <Box mt={3}>
                  {/* Review区 */}
                  <Typography variant="subtitle1" fontWeight={600}>
                    Review
                  </Typography>
                  {selectedOrder.review ? (
                    <Box>
                      <Rating value={selectedOrder.rating} readOnly />
                      <Typography color="text.secondary" mt={1}>
                        {selectedOrder.review}
                      </Typography>
                    </Box>
                  ) : (
                    <Stack spacing={2} mt={1}>
                      <Rating
                        value={newRating}
                        onChange={(event, newValue) => setNewRating(newValue)}
                      />
                      <TextField
                        label="Write a review"
                        multiline
                        rows={3}
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        fullWidth
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmitReview}
                        disabled={!newReview.trim() || !newRating}
                      >
                        Submit Review
                      </Button>
                    </Stack>
                  )}

                  {/* Complaint区 */}
                  <Typography variant="subtitle1" fontWeight={600} mt={4}>
                    Complaint
                  </Typography>
                  {selectedOrder.complaint ? (
                    <Typography color="error">{selectedOrder.complaint}</Typography>
                  ) : (
                    <Stack spacing={2} mt={1}>
                      <TextField
                        label="Describe your complaint"
                        multiline
                        rows={3}
                        value={newComplaint}
                        onChange={(e) => setNewComplaint(e.target.value)}
                        fullWidth
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleSubmitComplaint}
                        disabled={!newComplaint.trim()}
                      >
                        Submit Complaint
                      </Button>
                    </Stack>
                  )}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
