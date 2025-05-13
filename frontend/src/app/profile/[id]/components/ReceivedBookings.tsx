'use client'

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import axios from 'axios'
import OrderDialog from './OrderDialog'
import useAuth from '@/hooks/useAuth'

const statusColorMap: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  pending: 'warning',
  Pending: 'warning',
  accepted: 'success',
  Accepted: 'success',
  Confirmed: 'success',
  confirmed: 'success',
  completed: 'success',
  Completed: 'success',
  cancelled: 'error',
  Cancelled: 'error',
  rejected: 'error',
  Rejected: 'error',
}

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

export default function ReceivedBookings() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const { user, accessToken } = useAuth()

  useEffect(() => {
    const fetchBookings = async () => {
      if (!accessToken || !user?.id) return

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/sitter/${user.id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const data = res.data.bookings.map((b: any) => ({
          id: b.id,
          petName: b.pet_type,
          serviceType: b.service_type,
          bookingTime: b.start_time,
          status: b.status || 'Pending',
          notes: b.notes || '',
          review: b.review || '',
          rating: b.rating || null,
          complaint: b.complaint || '',
          role: 'sitter',
          owner_id: b.owner_id,
        }))
        setOrders(data)
      } catch (err) {
        console.error('Failed to fetch sitter bookings:', err)
      }
    }

    fetchBookings()
  }, [user, accessToken])

  const handleCloseDialog = () => {
    setSelectedOrder(null)
  }

  const handleUpdateOrder = (updatedFields: any) => {
    setOrders((prev: any[]) =>
      prev.map((order) =>
        order.id === selectedOrder.id ? { ...order, ...updatedFields } : order
      )
    )
    setSelectedOrder((prev: any | null) => (prev ? { ...prev, ...updatedFields } : prev))
  }

  const upcomingOrders = orders.filter((o) => 
    getTimeStatus(o.bookingTime) === 'upcoming' && 
    o.status !== 'cancelled' && 
    o.status !== 'rejected' &&
    o.status !== 'completed'
  );

  const ongoingOrders = orders.filter((o) => 
    getTimeStatus(o.bookingTime) === 'ongoing' && 
    o.status !== 'cancelled' && 
    o.status !== 'rejected' &&
    o.status !== 'completed'
  );

  const completedOrders = orders.filter((o) => 
    getTimeStatus(o.bookingTime) === 'completed' || 
    o.status === 'cancelled' || 
    o.status === 'rejected'
  );

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

      <Typography variant="h6" mt={4}>Past Orders</Typography>
      {completedOrders.length > 0 ? completedOrders.map(renderOrderCard) : <Typography>No past orders.</Typography>}

      {selectedOrder && (
        <OrderDialog
          order={selectedOrder}
          role="sitter"
          onClose={handleCloseDialog}
          onUpdate={handleUpdateOrder}
        />
      )}
    </Box>
  )
}
