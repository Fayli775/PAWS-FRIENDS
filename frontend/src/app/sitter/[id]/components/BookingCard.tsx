'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Button,
  TextField,
  Snackbar,
  Alert as MuiAlert,
} from '@mui/material'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'

export default function BookingCard({ sitterId, ownerPets }: { sitterId: number, ownerPets: any[] }) {
  const [pets, setPets] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const { user, accessToken } = useAuth()

  const [selectedPetId, setSelectedPetId] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')

  // Snackbar 状态
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning'>('success')

  const showSnackbar = (msg: string, severity: 'success' | 'error' | 'warning') => {
    setSnackbarMsg(msg)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return

      try {
        const petRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/get/my`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        setPets(Array.isArray(petRes.data) ? petRes.data : petRes.data.pets || [])

        const slotRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/availability/${sitterId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const slots = (slotRes.data.availability || []).map((s: any) => {
          const abbr = s.weekday.slice(0, 3)
          return `${abbr} ${s.start_time.slice(0, 5)}–${s.end_time.slice(0, 5)}`
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
          showSnackbar("Your session has expired. Please log in again to continue.", 'warning')
          setTimeout(() => window.location.href = '/login', 2000)
        } else {
          console.error("Failed to load booking info", err)
          showSnackbar("Failed to load booking information. Please try again later.", 'error')
        }
      }
    }
    fetchData()
  }, [sitterId, accessToken])

  const handleBooking = async () => {
    if (!selectedPetId || !selectedService || !selectedSlot) {
      showSnackbar("Please complete all required fields before submitting your booking.", 'warning')
      return
    }

    try {
      if (!accessToken || !user?.id) return

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
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      showSnackbar("Your booking has been successfully submitted. Thank you!", 'success')
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        showSnackbar("Your session has expired. Please log in again to continue.", 'warning')
        setTimeout(() => window.location.href = '/login', 2000)
      } else {
        console.error("Booking error:", err)
        showSnackbar("We were unable to process your booking at this time. Please try again later.", 'error')
      }
    }
  }

  return (
    <Box>
      <Card>
        <CardContent>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}
