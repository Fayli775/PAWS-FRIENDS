'use client'

import React, { useState } from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import OrderDialog from './OrderDialog'

// Mock数据（Owner版，包含不同时间段）
const mockMyBookings = [
  {
    id: 1,
    petName: 'Buddy',
    serviceType: 'Dog Walking',
    bookingTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1小时后（Upcoming）
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
    bookingTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30分钟前（Ongoing）
    status: 'Confirmed',
    notes: '',
    review: '',
    rating: null,
    complaint: '',
    role: 'owner',
  },
  {
    id: 3,
    petName: 'Charlie',
    serviceType: 'Cat Sitting',
    bookingTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3小时前（Completed）
    status: 'Completed',
    notes: '',
    review: 'Very good!',
    rating: 5,
    complaint: '',
    role: 'owner',
  }
]

// 状态颜色
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

  if (diffMinutes > 0) {
    return 'upcoming'
  } else if (diffMinutes > -90) {
    return 'ongoing'
  } else {
    return 'completed'
  }
}

export default function MyBookings() {
  const [orders, setOrders] = useState(mockMyBookings)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)

  const handleCloseDialog = () => {
    setSelectedOrder(null)
  }

  const handleUpdateOrder = (updatedFields: any) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, ...updatedFields } : order
      )
    )
    setSelectedOrder((prev) => prev ? { ...prev, ...updatedFields } : prev)
  }

  // 分类
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
            <Box color="text.secondary">{new Date(order.bookingTime).toLocaleString()}</Box>
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

      {/* 订单详情弹窗 */}
      {selectedOrder && (
        <OrderDialog
          order={selectedOrder}
          role="owner"
          onClose={handleCloseDialog}
          onUpdate={handleUpdateOrder}
        />
      )}
    </Box>
  )
}
