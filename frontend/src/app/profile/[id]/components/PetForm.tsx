'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from '@mui/material'

export type Pet = {
  id?: number
  name: string
  type: string
  description?: string
  photo?: string
  vetContact?: string
  familyEmergencyContact?: string
  medicalConditions?: string
  allergies?: string
  medications?: string
  specialInstructions?: string
}

type PetFormProps = {
  initialData: Pet | null
  onClose: () => void
  onSubmit: (pet: Pet) => void
}

const defaultPet: Pet = {
  name: '',
  type: '',
  description: '',
  photo: '',
  vetContact: '',
  familyEmergencyContact: '',
  medicalConditions: '',
  allergies: '',
  medications: '',
  specialInstructions: '',
}

export default function PetForm({ initialData, onClose, onSubmit }: PetFormProps) {
  const [formData, setFormData] = useState<Pet>(defaultPet)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setPreviewUrl(initialData.photo || '')
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
    // 暂时只做预览：实际上传建议交给父组件处理
    setFormData(prev => ({ ...prev, photo: URL.createObjectURL(file) }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.type) {
      alert('Please fill in name and type.')
      return
    }
    onSubmit(formData)
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* 宠物照片预览 */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={previewUrl || '/defaultAvatarDog.png'} sx={{ width: 80, height: 80 }} />
            <Button variant="outlined" component="label">
              Upload Photo
              <input type="file" hidden onChange={handlePhotoChange} />
            </Button>
          </Stack>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Vet Contact"
            name="vetContact"
            value={formData.vetContact}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Emergency Contact"
            name="familyEmergencyContact"
            value={formData.familyEmergencyContact}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Medical Conditions"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Special Instructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#A78BFA' }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
