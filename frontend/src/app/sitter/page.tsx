'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Stack,
  Chip,
  List,
  ListItem,
} from '@mui/material'
import Image from 'next/image'
import Header from '@/components/Header'
import Calendar from '@/app/profile/[id]/components/Calendar'
import CertificationsDisplay from './components/CertificationsDisplay'
import BookingCard from './components/BookingCard'

type Pet = { id: number; name: string; photo?: string }

export default function SitterPublicProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const sitterId = params.id

  // 👤 Sitter's own pets (showcase)
  const [sitterPets, setSitterPets] = useState<Pet[]>([])

  // 🐾 Owner's pets (for booking dropdown)
  const [ownerPets, setOwnerPets] = useState<Pet[]>([])

  // --- Mock sitter data (replace later with real API) ---
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" maxWidth="lg" sx={{ flex: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column: Sitter Info */}
          <Grid item xs={12} md={7}>
            {/* Avatar, Name, Certifications */}
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

                {/* ✅ Certifications Badge */}
                <CertificationsDisplay sitterId={Number(sitterId)} />
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

            {/* Sitter's Pets */}
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

            {/* Availability (Calendar) */}
            <Box mt={4}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                My Availability
              </Typography>
              <Calendar readOnly selectedSlots={mockAvailabilitySlots} />
            </Box>
          </Grid>

          {/* Right Column: Booking */}
          <Grid item xs={12} md={5}>
            <BookingCard sitterId={Number(sitterId)} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
