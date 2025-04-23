'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material'

type Pet = {
  id: number
  name: string
  type: string
  description: string
  photo: string
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])

  useEffect(() => {
    // TODO: 换成 real API 调用 GET /pet/list?ownerId={userId}
    // mock 示例数据：
    setPets([
      {
        id: 1,
        name: 'Buddy',
        type: 'Dog',
        description: 'Golden Retriever, 3 years old',
        photo: '/pets/buddy.jpg',
      },
      {
        id: 2,
        name: 'Whiskers',
        type: 'Cat',
        description: 'Tabby cat, loves naps',
        photo: '/pets/whiskers.jpg',
      },
    ])
  }, [])

  return (
    <Box>
      <Typography variant="h5" color="#1E1B4B" fontWeight={600} mb={2}>
        My Pets
      </Typography>

      <Grid container spacing={2}>
        {pets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={pet.photo}
                  alt={pet.name}
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                />
                <Typography fontWeight={600}>{pet.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.type}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {pet.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
