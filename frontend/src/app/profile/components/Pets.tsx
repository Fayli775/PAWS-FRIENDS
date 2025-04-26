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

const defaultAvatars = {
  Dog: '/dog-avatar.png',
  Cat: '/cat-avatar.png',
}

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Dog',
    description: 'Golden Retriever, 3 yo',
    vetContact: '0211234567',
    familyEmergencyContact: '0229876543',
    medicalConditions: 'None',
    allergies: 'None',
    medications: 'None',
    specialInstructions: 'Loves long walks',
    photo: '',
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    description: 'Tabby cat, loves naps',
    vetContact: '0217654321',
    familyEmergencyContact: '0221234567',
    medicalConditions: 'Asthma',
    allergies: 'None',
    medications: 'Inhaler',
    specialInstructions: 'Keep indoors',
    photo: '',
  },
]

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [openForm, setOpenForm] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)

  useEffect(() => {
    // 模拟从后端获取宠物数据，并设置默认头像
    const petsWithDefaultPhotos = mockPets.map((pet) => ({
      ...pet,
      photo: pet.photo,
    }))
    setPets(petsWithDefaultPhotos)
  }, [])

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet)
    setOpenForm(true)
  }

  const handleDelete = (petId: number) => {
    if (!confirm('Are you sure you want to delete this pet?')) return
    setPets((prev) => prev.filter((p) => p.id !== petId))
  }

  return (
    <Box>
      {/* 顶部标题 + 新增按钮 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>
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
      <Grid container spacing={4}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={3} key={pet.id} style={{ display: 'grid', width: '25%' }}>
            <Card
              variant="outlined"
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
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

              <CardContent>
                {/* 宠物头像 */}
                <Avatar
                  src={
                    pet.photo ||
                    (pet.type === 'Cat'
                      ? '/defaultAvatarCat.png'
                      : '/defaultAvatarDog.png')
                  }
                  sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }}
                />
                {/* 宠物名字和类型 */}
                <Typography variant="h6" fontWeight={600} textAlign="center">
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {pet.type}
                </Typography>
                {/* 其他信息左对齐 */}
                <Box mt={2}>
                  <Typography variant="body2" mt={1}>
                    <strong>Description:</strong> {pet.description}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Vet Contact:</strong> {pet.vetContact}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Emergency Contact:</strong> {pet.familyEmergencyContact}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Medical Conditions:</strong> {pet.medicalConditions}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Allergies:</strong> {pet.allergies}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Medications:</strong> {pet.medications}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Special Instructions:</strong> {pet.specialInstructions}
                  </Typography>
                </Box>
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
                prev.map((p) =>
                  p.id === newPet.id
                    ? { ...newPet, photo: newPet.photo }
                    : p
                )
              )
            } else {
              // 新增模式
              setPets((prev) => [
                ...prev,
                { ...newPet, photo: newPet.photo },
              ])
            }
            setOpenForm(false)
          }}
        />
      )}
    </Box>
  )
}
