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
  Tabs,
  Tab
} from '@mui/material'
import useAuth from '@/hooks/useAuth'

// Mock初始数据
const mockMyBookings = [
  {
    id: 1,
    petName: 'Buddy',
    serviceType: 'Dog Walking',
    bookingTime: '2024-05-20T10:00:00',  // ISO格式
    status: 'Confirmed',
    notes: '',
    review: '',
    rating: null,
    complaint: '',
    role: 'owner',
  },
  {
    id: 2,
    petName: 'Mittens',
    serviceType: 'Pet Sitting',
    bookingTime: '2024-05-15T15:00:00',
    status: 'Completed',
    notes: '',
    review: 'Amazing service!',
    rating: 5,
    complaint: '',
    role: 'owner',
  }
]

const mockReceivedBookings = [
  {
    id: 3,
    petName: 'Oscar',
    serviceType: 'Dog Walking',
    bookingTime: '2024-05-21T08:00:00',
    status: 'Pending',
    notes: '',
    review: '',
    rating: null,
    complaint: '',
    role: 'sitter',
  },
  {
    id: 4,
    petName: 'Luna',
    serviceType: 'Pet Sitting',
    bookingTime: '2024-05-10T11:00:00',
    status: 'Cancelled',
    notes: '',
    review: '',
    rating: null,
    complaint: '',
    role: 'sitter',
  }
]

// 状态颜色
const statusColorMap: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  Pending: 'warning',
  Confirmed: 'success',
  Completed: 'success',
  Cancelled: 'error',
}

// 动态判断时间阶段
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

export default function Orders() {
  const [tab, setTab] = useState<'myBookings' | 'receivedBookings'>('myBookings')
  const [myOrders, setMyOrders] = useState(mockMyBookings)
  const [receivedOrders, setReceivedOrders] = useState(mockReceivedBookings)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
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
    if (!selectedOrder) return
    updateOrder(selectedOrder.id, { status: 'Confirmed' })
  }

  const handleCancel = () => {
    if (!selectedOrder) return
    updateOrder(selectedOrder.id, { status: 'Cancelled' })
  }

  const handleComplete = () => {
    if (!selectedOrder) return
    updateOrder(selectedOrder.id, { status: 'Completed' })
  }

  const handleSubmitReview = () => {
    if (!selectedOrder || !newReview.trim() || !newRating) return
    updateOrder(selectedOrder.id, { review: newReview, rating: newRating })
    setNewReview('')
    setNewRating(null)
  }

  const handleSubmitComplaint = () => {
    if (!selectedOrder || !newComplaint.trim()) return
    updateOrder(selectedOrder.id, { complaint: newComplaint })
    setNewComplaint('')
  }

  const updateOrder = (id: number, fields: any) => {
    const update = (list: any[]) =>
      list.map((order) => (order.id === id ? { ...order, ...fields } : order))
    if (tab === 'myBookings') {
      setMyOrders(update(myOrders))
      setSelectedOrder({ ...selectedOrder, ...fields })
    } else {
      setReceivedOrders(update(receivedOrders))
      setSelectedOrder({ ...selectedOrder, ...fields })
    }
  }

  const orders = tab === 'myBookings' ? myOrders : receivedOrders

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3} ml={4}>
        My Orders
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3, ml:4 }}>
        <Tab value="myBookings" label="My Bookings" />
        <Tab value="receivedBookings" label="Received Bookings" />
      </Tabs>

      <Stack spacing={2} ml={4}>
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

              {/* 动态判断时间状态 */}
              {(() => {
                const timeStatus = getTimeStatus(selectedOrder.bookingTime)

                // Upcoming阶段
                if (timeStatus === 'upcoming') {
                  if (selectedOrder.role === 'owner') {
                    return (
                      <Button variant="outlined" color="error" onClick={handleCancel}>
                        Cancel Booking
                      </Button>
                    )
                  }
                  if (selectedOrder.role === 'sitter' && selectedOrder.status === 'Pending') {
                    return (
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={handleConfirm}>
                          Accept
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleCancel}>
                          Reject
                        </Button>
                      </Stack>
                    )
                  }
                }

                // Confirmed时Owner可以手动Mark Completed
                if (timeStatus === 'ongoing' && selectedOrder.role === 'owner' && selectedOrder.status === 'Confirmed') {
                  return (
                    <Button variant="contained" color="primary" onClick={handleComplete}>
                      Mark as Completed
                    </Button>
                  )
                }

                return null
              })()}

              {/* Completed阶段展示 Review + Complaint */}
              {(selectedOrder.status === 'Completed' || selectedOrder.status === 'Cancelled') && (
                <>
                  {/* Review区 */}
                  <Typography variant="subtitle1" fontWeight={600} mt={4}>
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
                </>
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
