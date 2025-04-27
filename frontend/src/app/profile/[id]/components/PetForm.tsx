'use client'

import React, { useState, ChangeEvent, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  InputLabel,
  FormControl,
  Avatar,
} from '@mui/material'

export interface Pet {
  id: number
  name: string
  type: string
  description: string
  vetContact: string
  familyEmergencyContact: string
  medicalConditions: string
  allergies: string
  medications: string
  specialInstructions: string
  photo: string
}

interface PetFormProps {
  initialData: Pet | null
  onClose: () => void
  onSubmit: (pet: Pet) => void
}

const PET_TYPES = ['Dog', 'Cat']

export default function PetForm({
  initialData,
  onClose,
  onSubmit,
}: PetFormProps) {
  const [formData, setFormData] = useState<Pet>(
    initialData || {
      id: Date.now(),
      name: '',
      type: 'Dog', // 默认类型为 Dog
      description: '',
      vetContact: '',
      familyEmergencyContact: '',
      medicalConditions: '',
      allergies: '',
      medications: '',
      specialInstructions: '',
      photo: '',
    }
  )

  const [errors, setErrors] = useState({
    vetContact: '',
    familyEmergencyContact: '',
  })

  const getAvatar = () => {
    if (formData.photo) return formData.photo
    return formData.type === 'Cat' ? '/defaultAvatarCat.png' : '/defaultAvatarDog.png'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement

    // 验证电话号码格式
    if (name === 'vetContact' || name === 'familyEmergencyContact') {
      const phoneRegex = /^0\d{1,9}$/ // 新西兰电话号码格式
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: 'Invalid phone number. Must start with 0 and contain 2-10 digits.',
        }))
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }))
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file) {
      setFormData((prev) => ({ ...prev, photo: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = () => {
    // 检查是否有未通过验证的字段
    if (errors.vetContact || errors.familyEmergencyContact) {
      alert('Please fix the errors before submitting.')
      return
    }
    onSubmit(formData)
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Pet' : 'Add Pet'}</DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="pet-type-label">Type</InputLabel>
          <Select
            labelId="pet-type-label"
            label="Type"
            name="type"
            value={formData.type}
            onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as string }))}
          >
            {PET_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Vet Contact"
          name="vetContact"
          value={formData.vetContact}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.vetContact}
          helperText={errors.vetContact}
        />
        <TextField
          label="Family Emergency Contact"
          name="familyEmergencyContact"
          value={formData.familyEmergencyContact}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.familyEmergencyContact}
          helperText={errors.familyEmergencyContact}
        />
        <TextField
          label="Medical Conditions"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medications"
          name="medications"
          value={formData.medications}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Special Instructions"
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <input
            accept="image/*"
            id="pet-photo-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          <label htmlFor="pet-photo-upload">
            <Button variant="outlined" component="span">
              {formData.photo ? 'Change Photo' : 'Upload Photo'}
            </Button>
          </label>
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <Avatar
            src={getAvatar()}
            alt="pet-photo-preview"
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? 'Save Changes' : 'Add Pet'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
