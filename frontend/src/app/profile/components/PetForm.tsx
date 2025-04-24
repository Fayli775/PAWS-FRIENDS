'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
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

export type Pet = {
  id: number
  name: string
  type: string
  description?: string
  photo?: string
}

type PetFormProps = {
  initialData: Pet | null
  onClose: () => void
  onSubmit: (pet: Pet) => void
}

const PET_TYPES = ['Dog', 'Cat', 'Rabbit', 'Other']

export default function PetForm({
  initialData,
  onClose,
  onSubmit,
}: PetFormProps) {
  // 表单状态
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined)

  // 初始化：如果是编辑模式，填充 initialData
  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setType(initialData.type)
      setDescription(initialData.description || '')
      setPhotoPreview(initialData.photo)
    }
  }, [initialData])

  // 处理文件选择
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setPhotoFile(file)
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  // 提交时聚合数据
  const handleSubmit = () => {
    // 简单校验
    if (!name.trim() || !type) {
      alert('Please enter both name and type.')
      return
    }

    const pet: Pet = {
      id: initialData?.id ?? Date.now(), // 新增时用临时 ID
      name: name.trim(),
      type,
      description: description.trim(),
      photo: photoPreview,
    }
    onSubmit(pet)
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Edit Pet' : 'Add Pet'}</DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Name"
          fullWidth
          required
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="pet-type-label">Type</InputLabel>
          <Select
            labelId="pet-type-label"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
              {photoPreview ? 'Change Photo' : 'Upload Photo'}
            </Button>
          </label>
        </Box>

        {photoPreview && (
          <Box mt={2} display="flex" justifyContent="center">
            <Avatar
              src={photoPreview}
              alt="pet-photo-preview"
              sx={{ width: 100, height: 100 }}
            />
          </Box>
        )}
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
