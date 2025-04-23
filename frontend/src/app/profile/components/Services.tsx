'use client'

import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  Button,
  Snackbar,
} from '@mui/material'

// 模拟服务数据
const mockServices = [
  { id: 1, name: 'Dog Walking', description: 'outdoor walks' },
  { id: 2, name: 'Pet Sitting', description: 'In-home care for pets' },
  { id: 3, name: 'Cat Feeding', description: 'Daily feeding and check-ins' },
]

const ALL_PET_TYPES = ['Dog', 'Cat', 'Rabbit', 'Other'] as const

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([])
  const [dirty, setDirty] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  // 读取初始数据
  useEffect(() => {
    // TODO: GET /user/{id}
    const initialServices = [1, 3]
    const initialPetTypes = ['Dog']
    setSelectedServices(initialServices)
    setSelectedPetTypes(initialPetTypes)
  }, [])

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    setDirty(true)
  }

  const handlePetTypesChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPetTypes(e.target.value as string[])
    setDirty(true)
  }

  const handleSave = async () => {
    // TODO: 调用 PUT /user/{id} 接口
    // 示例：
    // await fetch(`/api/user/${userId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ serviceIds: selectedServices, petTypes: selectedPetTypes }),
    // })

    setDirty(false)
    setSnackbarOpen(true)
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B" mb={2}>
        Services You Provide
      </Typography>

      <Grid container spacing={2} mb={4}>
        {mockServices.map(service => (
          <Grid item xs={12} md={6} key={service.id}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight={600}>
                      {service.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {service.description}
                    </Typography>
                  </Box>
                }
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" fontWeight={600} color="#1E1B4B" mb={2}>
        Supported Pet Types
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="pet-types-label">Pet Types</InputLabel>
        <Select
          labelId="pet-types-label"
          multiple
          value={selectedPetTypes}
          onChange={handlePetTypesChange}
          input={<OutlinedInput label="Pet Types" />}
          renderValue={selected => (selected as string[]).join(', ')}
        >
          {ALL_PET_TYPES.map(type => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedPetTypes.includes(type)} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* —— 新增 Save 按钮 —— */}
      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="contained"
          disabled={!dirty}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          disabled={!dirty}
          onClick={() => {
            // 重置为上次保存时的值
            // TODO: 用初始值重新 setSelectedServices/Types
            setDirty(false)
          }}
        >
          Reset
        </Button>
      </Box>

      {/* 操作反馈 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Settings saved"
      />
    </Box>
  )
}
