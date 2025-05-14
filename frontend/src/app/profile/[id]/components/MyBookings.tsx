'use client'

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import OrderDialog from './OrderDialog'
import axios from 'axios'
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

  if (diffMinutes > 0) return 'upcoming'
  else if (diffMinutes > -90) return 'ongoing'
  else return 'completed'
}

export default function MyBookings() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const { user, accessToken } = useAuth()

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        if (!accessToken || !user?.id) return

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        const bookings = await Promise.all(res.data.bookings.map(async (b: any) => {
          let review = ''
          let rating = null
          let complaint = ''

          try {
            const reviewRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/booking/${b.id}`)
            const reviewData = await reviewRes.json()
            if (reviewData.status === 'success' && reviewData.reviews.length > 0) {
              review = reviewData.reviews[0].comment
              rating = reviewData.reviews[0].rating
            }
          } catch (e) {
            console.warn('No review for booking', b.id)
          }

          try {
            const complainRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/complain/booking/${b.id}`)
            const complainData = await complainRes.json()
            if (complainData.status === 'success' && complainData.complain.length > 0) {
              complaint = complainData.complain[0].content
            }
          } catch (e) {
            console.warn('No complaint for booking', b.id)
          }

          const mapped = {
            id: b.id,
            petName: b.pet_type,
            serviceType: b.service_type,
            bookingTime: b.start_time,
            status: b.status || 'Pending',
            review,
            rating,
            notes: b.notes || '',
            complaint,
            role: 'owner',
            owner_id: b.owner_id,
          }
          console.log('📦 mapped booking:', mapped)
          return mapped
        }))

        console.log("🧩 current user id:", user?.id);
        setOrders(bookings)
      } catch (err) {
        console.error('Failed to fetch my bookings:', err)
      }
    }

    fetchMyBookings()
  }, [user, accessToken])

  const handleCloseDialog = () => {
    setSelectedOrder(null)
  }

  const handleUpdateOrder = (updatedFields: any) => {
    setOrders((prev: any[]) =>
      prev.map((order: any) =>
        order.id === selectedOrder?.id ? { ...order, ...updatedFields } : order
      )
    )
    setSelectedOrder((prev: any) => (prev ? { ...prev, ...updatedFields } : prev))
  }

  const updateBookingStatus = async (status: string, note?: string) => {
    try {
      if (!accessToken) {
        alert('You need to login first.')
        return
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${selectedOrder?.id}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, note: note || '' }),
      })

      if (res.ok) {
        handleUpdateOrder({ status })
      } else {
        alert('Failed to update booking status.')
      }
    } catch (err) {
      console.error('Booking status update failed:', err)
    }
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
      onClick={() => {
        console.log("🧩 selected order (onClick):", order);
        setSelectedOrder(order)
      }}
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

      <Typography variant="h6" mt={4}>Past Orders</Typography>
      {completedOrders.length > 0 ? completedOrders.map(renderOrderCard) : <Typography>No past orders.</Typography>}

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
