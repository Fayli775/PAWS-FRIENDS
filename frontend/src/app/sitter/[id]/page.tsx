'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material'
import Calendar from '@/app/profile/[id]/components/Calendar'
import CertificationsDisplay from './components/CertificationsDisplay'
import ReviewSummary from './components/ReviewSummary'
import BookingCard from './components/BookingCard'
import useAuth from '@/hooks/useAuth'

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
  const { user, accessToken } = useAuth()

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
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${sitterId}`)
        const userData = await userRes.json()
        const sitterUser = userData.user

        setUserName(sitterUser.user_name || 'Sitter')
        setRegion(sitterUser.region || '')
        setAvatar(
          sitterUser.avatar 
            ? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/avatars/${sitterUser.avatar}`
            : '/avatar.jpg'
        )
        setBio(sitterUser.bio || '')

        const petsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${sitterId}`)
        const petsData = await petsRes.json()
        setSitterPets(petsData || [])

        const servicesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services/sitters/${sitterId}/services`)
        const servicesData = await servicesRes.json()
        setServices(servicesData.map((s: any) => s.name))

        if (user?.id) {
          const myPetsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${user.id}`, {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
          })
          const myPetsData = await myPetsRes.json()
          setOwnerPets(myPetsData || [])
        }

      } catch (err) {
        console.error('Failed to load sitter data', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [sitterId, user, accessToken])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" maxWidth="lg" sx={{ flex: 1, mt:2, mb: 4 }}>
        <Grid
          container
          spacing={4}
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: 'auto auto auto auto',
            gap: 1,
          }}
        >
          {/* first row: personal info */}
          <Grid item sx={{ gridRow: '1 / 2', gridColumn: '1 / 3' }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar 
                src={avatar} 
                sx={{ width: 100, height: 100 }} 
                alt="sitter-avatar"
                onError={(e) => {
                  console.error('Avatar load error:', e)
                  ;(e.target as HTMLImageElement).src = '/avatar.jpg'
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">{userName}</Typography>
                <Typography variant="body2" color="text.secondary">{region}</Typography>
                <ReviewSummary sitterId={Number(sitterId)} />
                <CertificationsDisplay sitterId={Number(sitterId)} />
              </Box>
            </Box>
          </Grid>

          {/* second column: booking card */}
          <Grid item sx={{ gridRow: '1 / 5', gridColumn: '2 / 3' }}>
            <Box mb={1}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>Book a Service</Typography>
              <BookingCard sitterId={Number(sitterId)} ownerPets={ownerPets} />
            </Box>
          </Grid>

          {/* second row：Biography */}
          <Grid item sx={{ gridRow: '2 / 3', gridColumn: '1 / 2' }}>
            <Box mb={1}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>Biography</Typography>
              <Typography>{bio}</Typography>
            </Box>
          </Grid>

          {/* third row：My Pets */}
          <Grid item sx={{ gridRow: '3 / 4', gridColumn: '1 / 2' }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>My Pets</Typography>
              <Grid container spacing={2}>
                {sitterPets.length > 0 ? (
                  sitterPets.map((pet, index) => (
                    <Grid item xs={6} sm={4} key={index}>
                      <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                          src={
                            pet.photo_url
                              ? `${process.env.NEXT_PUBLIC_API_URL}${pet.photo_url}`
                              : '/defaultAvatarDog.png'
                          }
                          alt={pet.name}
                          sx={{ width: 90, height: 90 }}
                          imgProps={{
                            onError: (e) => (e.currentTarget.src = '/defaultAvatarDog.png'),
                          }}
                        />
                        <Typography variant="body2" align="center" mt={1}>
                          {pet.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No pets available.
                  </Typography>
                )}
              </Grid>
            </Box>
          </Grid>

          {/* fourth row：My Availability */}
          <Grid item sx={{ gridRow: '4 / 5', gridColumn: '1 / 2' }}>
            <Box sx={{ maxWidth: '70%' }}>
              <Typography variant="subtitle1" fontWeight={600} mb={0}>
                My Availability
              </Typography>
              <Box sx={{ mx: 0 }}> {/* 确保 Calendar 没有多余的 margin-top */}
                <Calendar readOnly userId={sitterId} hideHeader={true} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}