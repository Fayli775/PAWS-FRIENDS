'use client'

import React, { useState, useEffect } from 'react'
import {
  Box, Typography, Grid, Card, CardContent, Avatar,
  Button, IconButton, Stack, Snackbar, Alert, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  MenuItem, CircularProgress
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import useAuth from '@/hooks/useAuth'

interface Pet {
  id?: number
  name: string
  type: string
  description?: string
  photo?: string
  vet_contact_phone?: string
  emergency_contact_phone?: string
  allergies?: string
  medications?: string
  special_instructions?: string
}

export default function PetsPage() {
  const { user, accessToken } = useAuth(true)
  const [pets, setPets] = useState<Pet[]>([])
  const [openForm, setOpenForm] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getFullPhotoUrl = (photo?: string) => {
    if (!photo) return '/defaultAvatarDog.png'
    return photo.startsWith('http') ? photo : `${process.env.NEXT_PUBLIC_API_URL}${photo}`
  }

  const fetchPets = async () => {
    if (!user || !accessToken) return
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${user.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      if (!response.ok) throw new Error('Failed to fetch pets')
      const data = await response.json()
      setPets(data.map((pet: any) => ({
        ...pet,
        photo: getFullPhotoUrl(pet.photo || pet.photo_url)
      })))
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => { 
    if (user && accessToken) {
      fetchPets() 
    }
  }, [user, accessToken])

  const handleFormSubmit = async (petData: Pet) => {
    if (!user || !accessToken) return
    
    setIsSubmitting(true);
    try {
      const isEdit = !!editingPet?.id;
      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/pets/updatePet/${editingPet.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/pets/addNewPet`;

      const formData = new FormData();
      formData.append('name', petData.name);
      formData.append('type', petData.type);
      if (petData.description) formData.append('description', petData.description);
      if (petData.vet_contact_phone) formData.append('vet_contact_phone', petData.vet_contact_phone);
      if (petData.emergency_contact_phone) formData.append('emergency_contact_phone', petData.emergency_contact_phone);
      if (petData.allergies) formData.append('allergies', petData.allergies);
      if (petData.medications) formData.append('medications', petData.medications);
      if (petData.special_instructions) formData.append('special_instructions', petData.special_instructions);
      if (selectedImageFile) formData.append('petPhoto', selectedImageFile);
      if (!isEdit) formData.append('owner_id', user.id);

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      await fetchPets();

      setOpenForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setSelectedImageFile(null);
    }
  }


  const handleDelete = async (petId: number) => {
    if (!accessToken) return
    if (!confirm('Are you sure?')) return
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets/deletePet/${petId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      setPets(prev => prev.filter(p => p.id !== petId))
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Box >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} ml={4} mr={2}>
        <Typography variant="h5" fontWeight="bold">My Pets</Typography>
        <Button variant="contained" onClick={() => {
          setEditingPet({ name: '', type: 'Dog' })
          setSelectedImageFile(null)
          setOpenForm(true)
        }} >
          Add Pet
        </Button>
      </Box>

      <Grid container spacing={3} ml={4}>
        {pets.map((pet) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={pet.id}
            sx={{
              display: "flex",
              justifyContent: "center", // 确保卡片居中
              width: '200px'
            }}
          >
            <Card
              sx={{
                width: "100%", // 确保卡片宽度占满父容器
                maxWidth: 200, // 设置最大宽度，减小卡片宽度
              }}
            >
              <Stack direction="row" justifyContent="flex-end">
                <IconButton
                  onClick={() => {
                    setEditingPet(pet);
                    setSelectedImageFile(null);
                    setOpenForm(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(pet.id!)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <CardContent>
                <Avatar
                  src={pet.photo}
                  alt={pet.name}
                  sx={{ width: 100, height: 100, mx: 'auto' }}
                  imgProps={{ onError: (e) => (e.currentTarget.src = '/defaultAvatarDog.png') }}
                />
                <Typography align="center">{pet.name}</Typography>
                <Typography align="center" variant="body2">
                  {pet.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPet?.id ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Name" value={editingPet?.name || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, name: e.target.value }))
          } sx={{ mb: 2 }} />
          <TextField select fullWidth label="Type" value={editingPet?.type || 'Dog'} onChange={e =>
            setEditingPet(prev => ({ ...prev!, type: e.target.value }))
          } sx={{ mb: 2 }}>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
          </TextField>
          <TextField fullWidth label="Description" value={editingPet?.description || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, description: e.target.value }))
          } sx={{ mb: 2 }} />
          <TextField fullWidth label="Vet Contact Phone" value={editingPet?.vet_contact_phone || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, vet_contact_phone: e.target.value }))
          } sx={{ mb: 2 }} />
          <TextField fullWidth label="Emergency Contact Phone" value={editingPet?.emergency_contact_phone || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, emergency_contact_phone: e.target.value }))
          } sx={{ mb: 2 }} />
          <TextField fullWidth label="Allergies" value={editingPet?.allergies || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, allergies: e.target.value }))
          } sx={{ mb: 2 }} />
          <TextField fullWidth label="Medications" value={editingPet?.medications || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, medications: e.target.value }))
          } sx={{ mb: 2 }} />
          <TextField fullWidth label="Special Instructions" multiline rows={2} value={editingPet?.special_instructions || ''} onChange={e =>
            setEditingPet(prev => ({ ...prev!, special_instructions: e.target.value }))
          } sx={{ mb: 2 }} />

          <Typography variant="subtitle2" sx={{ mt: 1 }}>Upload Pet Photo</Typography>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setSelectedImageFile(file)
          }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={() => editingPet && handleFormSubmit(editingPet)} disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
      </Snackbar>
    </Box>
  )
}
