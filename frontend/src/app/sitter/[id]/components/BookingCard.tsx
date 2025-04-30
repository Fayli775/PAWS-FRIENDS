"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material"
import axios from "axios"

interface BookingCardProps {
  sitterId: number
}

interface Pet {
  id: number
  name: string
}

export default function BookingCard({ sitterId }: BookingCardProps) {
  const [petId, setPetId] = useState("")
  const [pets, setPets] = useState<Pet[]>([])
  const [serviceType, setServiceType] = useState("")
  const [bookingTime, setBookingTime] = useState("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [preferredLanguage, setPreferredLanguage] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const availableLanguages = [
    "English",
    "中文",
    "Te Reo Māori",
    "Hindi",
    "Korean",
    "Japanese",
    "Spanish",
  ]

  // ✅ 加载宠物列表 & 可预约时间段
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      const userStr = localStorage.getItem("user")
      if (!token || !userStr) return

      const user = JSON.parse(userStr)

      try {
        // 获取宠物列表
        const petRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        setPets(petRes.data || [])

        // 获取 sitter 的可用时间段
        const slotRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/availability/${sitterId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        // 转换为 Mon 09:00–10:00 格式
        const slots = (slotRes.data.availability || []).map((s: any) => {
          const dayAbbr = s.weekday.slice(0, 3)
          return `${dayAbbr} ${s.start_time.slice(0, 5)}–${s.end_time.slice(0, 5)}`
        })

        setAvailableSlots(slots)
      } catch (err) {
        console.error("Failed to load pets or availability", err)
      }
    }

    fetchData()
  }, [sitterId])

  const handleBooking = async () => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")

    if (!token || !userStr) {
      alert("Please log in before making a booking.")
      window.location.href = "/login"
      return
    }

    const user = JSON.parse(userStr)
    const ownerId = user.id

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/new`,
        {
          sitterId,
          ownerId,
          petId,
          serviceType,
          bookingTime,
          preferredLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOpenSnackbar(true)
      setPetId("")
      setServiceType("")
      setBookingTime("")
      setPreferredLanguage("")
    } catch (error) {
      console.error("Booking failed:", error)
      alert("Failed to submit booking.")
    }
  }

  return (
    <Box sx={{ p: 3, border: "1px solid #eee", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Book This Sitter
      </Typography>

      {/* 🐶 Pet Selector */}
      <TextField
        label="Select Your Pet"
        select
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
        fullWidth
        margin="normal"
      >
        {pets.map((pet) => (
          <MenuItem key={pet.id} value={pet.id}>
            {pet.name}
          </MenuItem>
        ))}
      </TextField>

      {/* 🛠️ Service Type */}
      <TextField
        label="Service Type"
        select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Dog Walking">Dog Walking</MenuItem>
        <MenuItem value="Pet Sitting">Pet Sitting</MenuItem>
        <MenuItem value="Boarding">Boarding</MenuItem>
      </TextField>

      {/* 🕒 Booking Time */}
      <TextField
        label="Available Time Slot"
        select
        value={bookingTime}
        onChange={(e) => setBookingTime(e.target.value)}
        fullWidth
        margin="normal"
      >
        {availableSlots.map((slot, idx) => (
          <MenuItem key={idx} value={slot}>
            {slot}
          </MenuItem>
        ))}
      </TextField>

      {/* 🗣 Language */}
      <TextField
        label="Preferred Language"
        select
        value={preferredLanguage}
        onChange={(e) => setPreferredLanguage(e.target.value)}
        fullWidth
        margin="normal"
      >
        {availableLanguages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3, backgroundColor: "#A78BFA" }}
        onClick={handleBooking}
      >
        Confirm Booking
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Booking submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}
