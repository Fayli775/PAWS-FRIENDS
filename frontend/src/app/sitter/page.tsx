'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  List,
  ListItem,
} from '@mui/material'
import Image from 'next/image'
import Header from '@/components/Header'
import Calendar from '@/app/profile/components/Calendar'

type Pet = { id: number; name: string; photo?: string }

export default function SitterPublicProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const sitterId = params.id

  // 👤 Sitter's own pets (to showcase on their profile)
  const [sitterPets, setSitterPets] = useState<Pet[]>([])

  // 🐾 Owner's pets (for the booking dropdown)
  const [ownerPets, setOwnerPets] = useState<Pet[]>([])

  // --- Booking form state ---
  const [petId, setPetId] = useState<number | ''>('')
  const [serviceType, setServiceType] = useState<string>('')
  const [timeSlot, setTimeSlot] = useState<string>('')

  // --- Mock sitter data ---
  const mockPetTypes = ['Dog', 'Cat']
  const mockServicesOffered = ['Dog Walking', 'Pet Sitting']
  const mockAvailabilitySlots: Record<string, boolean> = {
    'Mon-09:00–10:00': true,
    'Wed-11:00–12:00': true,
    'Fri-14:00–15:00': true,
  }

  useEffect(() => {
    // TODO: replace with real API calls

    // 1️⃣ Fetch sitter's own pets
    setSitterPets([
      { id: 1, name: 'Buddy', photo: '/dog-photo.jpg' },
      { id: 2, name: 'Mittens', photo: '/pets/mittens.jpg' },
    ])

    // 2️⃣ Fetch current (booking) owner's pets
    setOwnerPets([
      { id: 10, name: 'Oscar', photo: '/pets/oscar.jpg' },
      { id: 11, name: 'Luna', photo: '/pets/luna.jpg' },
    ])
  }, [])

  const handleBook = () => {
    if (!petId || !serviceType || !timeSlot) {
      alert('Please select your pet, a service, and a time slot.')
      return
    }
    // TODO: POST to /order with { sitterId, petId, serviceType, timeSlot }
    console.log('Booking:', { sitterId, petId, serviceType, timeSlot })
    alert(`Booked pet #${petId} for ${serviceType} at ${timeSlot}`)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container component="main" maxWidth="lg" sx={{ flex: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column: Sitter Info */}
          <Grid item xs={12} md={7}>
            {/* Avatar & Name */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src="/avatar.jpg"
                sx={{ width: 80, height: 80 }}
                alt="sitter-avatar"
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  James S.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Auckland, NZ
                </Typography>
                <Box mt={1}>⭐ 🛡️ 🏅</Box>
              </Box>
            </Box>

            {/* Bio */}
            <Box mt={3}>
              <Typography>
                I provide experienced, loving care for dogs in the Auckland area.
                Whether your pup is high-energy or a couch potato, I’ll make sure
                they have a great time while you’re away...
              </Typography>
            </Box>

            {/* Sitter's Pets Showcase */}
            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                My Pets
              </Typography>
              {sitterPets.length > 0 ? (
                <Image
                  src={sitterPets[0].photo!}
                  alt={sitterPets[0].name}
                  width={400}
                  height={250}
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <Image
                  src="/dog-photo.jpg"
                  alt="default-dog"
                  width={400}
                  height={250}
                  style={{ borderRadius: 8 }}
                />
              )}
            </Box>

            {/* Supported Pet Types */}
            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Pet Types I Care For
              </Typography>
              <Stack direction="row" spacing={1}>
                {mockPetTypes.map((type) => (
                  <Chip key={type} label={type} />
                ))}
              </Stack>
            </Box>

            {/* Services Offered */}
            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Services I Offer
              </Typography>
              <List dense>
                {mockServicesOffered.map((svc) => (
                  <ListItem key={svc}>• {svc}</ListItem>
                ))}
              </List>
            </Box>

            {/* Availability (read-only) */}
            <Box mt={4}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                My Availability
              </Typography>
              <Calendar readOnly selectedSlots={mockAvailabilitySlots} />
            </Box>
          </Grid>

          {/* Right Column: Booking Card */}
          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Book James’s Services
              </Typography>

              {/* Owner's Pet Selector */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="pet-select-label">Your Pet</InputLabel>
                <Select
                  labelId="pet-select-label"
                  label="Your Pet"
                  value={petId}
                  onChange={(e) => setPetId(e.target.value as number)}
                >
                  {ownerPets.map((pet) => (
                    <MenuItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Service Type Selector */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="service-select-label">Service Type</InputLabel>
                <Select
                  labelId="service-select-label"
                  label="Service Type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  {mockServicesOffered.map((svc) => (
                    <MenuItem key={svc} value={svc}>
                      {svc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Time Slot Selector */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="time-select-label">Time Slot</InputLabel>
                <Select
                  labelId="time-select-label"
                  label="Time Slot"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  {Object.keys(mockAvailabilitySlots)
                    .filter((k) => mockAvailabilitySlots[k])
                    .map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        {slot}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, backgroundColor: '#A78BFA' }}
                onClick={handleBook}
              >
                Book Now
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
