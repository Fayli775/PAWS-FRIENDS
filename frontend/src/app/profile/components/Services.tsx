'use client'

import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
} from '@mui/material'
import { useState } from 'react'

// 模拟服务数据
const mockServices = [
  { id: 1, name: 'Dog Walking', description: '30-60 minute walks' },
  { id: 2, name: 'Pet Sitting', description: 'In-home care for pets' },
  { id: 3, name: 'Cat Feeding', description: 'Daily feeding and check-ins' },
]

export default function Services() {
  const [selected, setSelected] = useState<number[]>([])

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B" mb={2}>
        Services You Provide
      </Typography>

      <Grid container spacing={2}>
        {mockServices.map((service) => (
          <Grid item xs={12} md={6} key={service.id}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.includes(service.id)}
                    onChange={() => handleToggle(service.id)}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight={600}>{service.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
