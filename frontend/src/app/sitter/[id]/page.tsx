'use client'

import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@mui/material'
import Image from 'next/image'
import Calendar from '@/app/profile/[id]/components/Calendar'
import CertificationsDisplay from './components/CertificationsDisplay'
import BookingCard from './components/BookingCard'

type Pet = {
  id: number
  name: string
  photo_url?: string
}

export default function SitterPublicProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const sitterId = params.id

  const [sitterPets, setSitterPets] = useState<Pet[]>([])
  const [ownerPets, setOwnerPets] = useState<Pet[]>([])
  const [services, setServices] = useState<string[]>([])
  const [userName, setUserName] = useState('')
  const [region, setRegion] = useState('')
  const [avatar, setAvatar] = useState('/avatar.jpg')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${sitterId}`)
        const userData = await userRes.json()
        const user = userData.user

        setUserName(user.user_name || 'Sitter')
        setRegion(user.region || '')
        setAvatar(user.avatar ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatar}` : '/avatar.jpg')
        setBio(user.bio || '')

        const petsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${sitterId}`)
        const petsData = await petsRes.json()
        setSitterPets(petsData || [])

        const servicesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/sitters/${sitterId}/services`)
        const servicesData = await servicesRes.json()
        setServices(servicesData.map((s: any) => s.name))

        const userStr = localStorage.getItem('user')
        const currentUser = userStr ? JSON.parse(userStr) : null
        if (currentUser?.id) {
          const myPetsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${currentUser.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const myPetsData = await myPetsRes.json()
          setOwnerPets(myPetsData || [])
        }

      } catch (err) {
        console.error('❌ Failed to load sitter data', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [sitterId])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" maxWidth="lg" sx={{ flex: 1, mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {/* Header Section */}
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={avatar} sx={{ width: 80, height: 80 }} alt="sitter-avatar" />
              <Box>
                <Typography variant="h6" fontWeight="bold">{userName}</Typography>
                <Typography variant="body2" color="text.secondary">{region}</Typography>
                <CertificationsDisplay sitterId={Number(sitterId)} />
              </Box>
            </Box>

            {/* Bio */}
            <Box mt={3}>
              <Typography>{bio}</Typography>
            </Box>

            {/* Pets */}
            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>My Pets</Typography>
              {sitterPets.length > 0 ? (
                <img
                  src={
                    sitterPets[0].photo_url
                      ? `${process.env.NEXT_PUBLIC_API_URL}${sitterPets[0].photo_url}`
                      : '/dog-photo.jpg'
                  }
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

            {/* Services */}
            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>Services I Offer</Typography>
              <List dense>
                {services.map(svc => (
                  <ListItem key={svc}>• {svc}</ListItem>
                ))}
              </List>
            </Box>

            {/* Availability */}
            <Box mt={4}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>My Availability</Typography>
              <Calendar readOnly userId={sitterId} />
            </Box>
          </Grid>

          {/* Booking Section */}
          <Grid item xs={12} md={5}>
            <BookingCard sitterId={Number(sitterId)} ownerPets={ownerPets} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
