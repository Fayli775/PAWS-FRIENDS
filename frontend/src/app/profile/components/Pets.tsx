'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Stack,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PetForm, { Pet } from './PetForm'

const mockPets: Pet[] = [
  { id: 1, name: 'Buddy', type: 'Dog', description: 'Golden Retriever, 3 yo', photo: '/pets/buddy.jpg' },
  { id: 2, name: 'Whiskers', type: 'Cat', description: 'Tabby cat, loves naps', photo: '/pets/whiskers.jpg' },
]

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [openForm, setOpenForm] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)

  useEffect(() => {
    // TODO: 用 GET /pet/list?ownerId=xxx 替代
    setPets(mockPets)
  }, [])

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet)
    setOpenForm(true)
  }

  const handleDelete = (petId: number) => {
    if (!confirm('Are you sure you want to delete this pet?')) return
    // TODO: 调用 DELETE /pet/{petId}
    setPets((prev) => prev.filter((p) => p.id !== petId))
  }

  return (
    <Box>
      {/* 顶部标题 + 新增按钮 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600} color="#1E1B4B">
          My Pets
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingPet(null)
            setOpenForm(true)
          }}
        >
          Add Pet
        </Button>
      </Box>

      {/* 宠物卡片列表 */}
      <Grid container spacing={2}>
        {pets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ position: 'relative' }}>
              {/* 编辑 & 删除 按钮组 */}
              <Stack
                direction="row"
                spacing={1}
                sx={{ position: 'absolute', top: 4, right: 6 }}
              >
                <IconButton size="small" onClick={() => handleEdit(pet)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(pet.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>

              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  src={pet.photo}
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

      {/* 弹窗：新增/编辑表单 */}
      {openForm && (
        <PetForm
          initialData={editingPet}
          onClose={() => setOpenForm(false)}
          onSubmit={(newPet) => {
            if (editingPet) {
              // 编辑模式
              setPets((prev) =>
                prev.map((p) => (p.id === newPet.id ? newPet : p))
              )
            } else {
              // 新增模式
              setPets((prev) => [...prev, newPet])
            }
            setOpenForm(false)
          }}
        />
      )}
    </Box>
)
}
