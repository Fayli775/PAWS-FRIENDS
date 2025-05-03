'use client'

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import OrderDialog from './OrderDialog'
import axios from 'axios'

// 状态颜色映射
const statusColorMap: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  Pending: 'warning',
  Confirmed: 'success',
  Completed: 'success',
  Cancelled: 'error',
}

// 动态时间阶段
function getTimeStatus(bookingTime: string): 'upcoming' | 'ongoing' | 'completed' {
  const now = new Date()
  const booking = new Date(bookingTime)
  const diffMinutes = (booking.getTime() - now.getTime()) / 60000

  if (diffMinutes > 0) return 'upcoming'
  else if (diffMinutes > -90) return 'ongoing'
  else return 'completed'
}

export default function MyBookings() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        const currentUser = userStr ? JSON.parse(userStr) : null
        if (!currentUser?.id) return

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user/${currentUser.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const bookings = res.data.bookings.map((b: any) => ({
          id: b.id,
          petName: b.pet_type,
          serviceType: b.service_type,
          bookingTime: b.start_time,
          status: b.status || 'Pending',
          review: b.review || '',
          rating: b.rating ?? null,
          notes: b.notes || '',
          complaint: b.complaint || '',
          role: 'owner',
        }))
        setOrders(bookings)
      } catch (err) {
        console.error('❌ Failed to fetch my bookings:', err)
      }
    }

    fetchMyBookings()
  }, [])

  const handleCloseDialog = () => {
    setSelectedOrder(null)
  }

  const handleUpdateOrder = (updatedFields: any) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder?.id ? { ...order, ...updatedFields } : order
      )
    )
    setSelectedOrder((prev) => (prev ? { ...prev, ...updatedFields } : prev))
  }
  
  const updateBookingStatus = async (status: string, note?: string) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        alert('You need to login first.')
        return
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${selectedOrder?.id}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, note: note || '' }),
      })
  
      if (res.ok) {
        // 更新前端状态
        handleUpdateOrder({ status })
      } else {
        alert('Failed to update booking status.')
      }
    } catch (err) {
      console.error('❌ Booking status update failed:', err)
    }
  }
  

  // 分类订单
  const upcomingOrders = orders.filter((o) => getTimeStatus(o.bookingTime) === 'upcoming')
  const ongoingOrders = orders.filter((o) => getTimeStatus(o.bookingTime) === 'ongoing')
  const completedOrders = orders.filter((o) => getTimeStatus(o.bookingTime) === 'completed')

  const renderOrderCard = (order: any) => (
    <Card
      key={order.id}
      variant="outlined"
      sx={{ cursor: 'pointer', mb: 2 }}
      onClick={() => setSelectedOrder(order)}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <strong>{order.petName}</strong> - {order.serviceType}
            <Box color="text.secondary">
              {new Date(order.bookingTime).toLocaleString()}
            </Box>
          </Box>
          <Chip label={order.status} color={statusColorMap[order.status]} />
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Box>
      <Typography variant="h6" mt={2}>Upcoming Orders</Typography>
      {upcomingOrders.length > 0 ? upcomingOrders.map(renderOrderCard) : <Typography>No upcoming orders.</Typography>}

      <Typography variant="h6" mt={4}>Ongoing Orders</Typography>
      {ongoingOrders.length > 0 ? ongoingOrders.map(renderOrderCard) : <Typography>No ongoing orders.</Typography>}

      <Typography variant="h6" mt={4}>Completed Orders</Typography>
      {completedOrders.length > 0 ? completedOrders.map(renderOrderCard) : <Typography>No completed orders.</Typography>}

      {selectedOrder && (
        <OrderDialog
          order={selectedOrder}
          role="owner"
          onClose={handleCloseDialog}
          onUpdate={updateBookingStatus}
        />
      )}
    </Box>
  )
}
