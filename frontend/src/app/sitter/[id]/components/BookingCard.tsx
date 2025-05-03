'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  Button,
  TextField,
} from '@mui/material'
import axios from 'axios'

export default function BookingCard({ sitterId, ownerPets }: { sitterId: number, ownerPets: any[] }) {
  const [pets, setPets] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const petRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/get/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setPets(Array.isArray(petRes.data) ? petRes.data : petRes.data.pets || [])

        const slotRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/availability/${sitterId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const slots = (slotRes.data.availability || []).map((s: any) => {
          const abbr = s.weekday.slice(0, 3)
          return `${abbr} ${s.start_time.slice(0,5)}–${s.end_time.slice(0,5)}`
        })
        setAvailableSlots(slots)

        const servicesRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/sitters/${sitterId}/services`
        )
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : servicesRes.data.services || [])

        const langRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${sitterId}/languages`
        )
        setLanguages(Array.isArray(langRes.data) ? langRes.data : langRes.data.languages || [])

      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          alert("Session expired. Please log in again.")
          window.location.href = "/login"
        } else {
          console.error("🐾 Failed to load booking info", err)
        }
      }
    }
    fetchData()
  }, [sitterId])

  const handleBooking = async () => {
    if (!selectedPetId || !selectedService || !selectedSlot) {
      alert("Please fill in all fields before booking.")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const userStr = localStorage.getItem("user")
      if (!token || !userStr) return

      const user = JSON.parse(userStr)
      const selectedPet = pets.find(p => p.id === selectedPetId)
      const selectedServiceObj = services.find(s => s.service_id === selectedService)
      const [abbr, timeRange] = selectedSlot.split(' ')
      const [startTime, endTime] = timeRange.split('–')
      const weekdayAbbrMap: Record<string, string> = {
        Monday: 'Mon',
        Tuesday: 'Tue',
        Wednesday: 'Wed',
        Thursday: 'Thu',
        Friday: 'Fri',
        Saturday: 'Sat',
        Sunday: 'Sun',
      }
      
      const weekdayAbbr = weekdayAbbrMap[abbr] || 'Mon'
      

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          sitter_id: sitterId,
          owner_id: user.id,
          pet_type: selectedPet?.type,
          pet_id: selectedPet?.id,
          service_type: selectedServiceObj?.name,
          weekday: weekdayAbbr,
          time_slot: `${startTime}-${endTime}`,
          language: selectedLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      alert("Booking successful!")
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert("Session expired. Please log in again.")
        window.location.href = "/login"
      } else {
        alert("Booking failed. Please try again later.")
        console.error("Booking error:", err)
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Make a Booking</Typography>

        <TextField
          select fullWidth margin="normal"
          label="Select Pet"
          value={selectedPetId ?? ''}
          onChange={(e) => setSelectedPetId(Number(e.target.value))}
        >
          {pets.map(pet => (
            <MenuItem key={pet.id} value={pet.id}>{pet.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          select fullWidth margin="normal"
          label="Select Service"
          value={selectedService ?? ''}
          onChange={(e) => setSelectedService(Number(e.target.value))}
        >
          {services.map(svc => (
            <MenuItem key={svc.service_id} value={svc.service_id}>
              {svc.name} {svc.custom_price !== null ? `($${svc.custom_price})` : '(N/A)'}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select fullWidth margin="normal"
          label="Select Time Slot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          {availableSlots.map(slot => (
            <MenuItem key={slot} value={slot}>{slot}</MenuItem>
          ))}
        </TextField>

        <TextField
          select fullWidth margin="normal"
          label="Preferred Language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languages.map(lang => (
            <MenuItem key={lang} value={lang}>{lang}</MenuItem>
          ))}
        </TextField>



        <Box mt={2}>
          <Button variant="contained" fullWidth onClick={handleBooking}>
            Submit Booking
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
