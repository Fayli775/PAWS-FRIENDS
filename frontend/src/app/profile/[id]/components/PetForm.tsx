'use client'

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import AvatarUpload from "@/components/AvatarUpload";
import { Pet } from './PetCard';
import useAuth from '@/hooks/useAuth';

interface PetFormProps {
  initialData?: Pet | null;
  onClose: () => void;
  onSubmit: (pet: Pet) => void;
}

export default function PetForm({ initialData, onClose, onSubmit }: PetFormProps) {
  const { accessToken } = useAuth();
  const [pet, setPet] = useState<Pet>({
    name: '',
    type: 'Dog',
    description: '',
    photo: '',
    vet_contact_phone: '',
    emergency_contact_phone: '',
    allergies: '',
    medications: '',
    special_instructions: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPet(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload using the UploadAvatar callback
  const handleAvatarUpload = async (imageData: string, file: File) => {
    setIsUploading(true);
    try {
      if (!accessToken) throw new Error('Authentication required');

      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/uploadTempPhoto`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Failed to upload photo');
      const { photoUrl } = await response.json();
      
      setPet(prev => ({ 
        ...prev, 
        photo: photoUrl.startsWith('http') 
          ? photoUrl 
          : `${process.env.NEXT_PUBLIC_API_URL}${photoUrl}`
      }));
    } catch (err) {
      console.error('Upload error:', err);
      throw err; 
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(pet);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} textAlign="center">
            <AvatarUpload
              initialImage={pet.photo || (pet.type === 'Cat' ? '/defaultAvatarCat.png' : '/defaultAvatarDog.png')}
              onImageChange={handleAvatarUpload}
            />
            {isUploading && (
              <Typography variant="caption" color="text.secondary">
                Uploading...
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pet Name"
              name="name"
              value={pet.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Pet Type"
              name="type"
              value={pet.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={pet.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Vet Contact Phone"
              name="vet_contact_phone"
              value={pet.vet_contact_phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emergency Contact Phone"
              name="emergency_contact_phone"
              value={pet.emergency_contact_phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Allergies"
              name="allergies"
              value={pet.allergies}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Medications"
              name="medications"
              value={pet.medications}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Special Instructions"
              name="special_instructions"
              value={pet.special_instructions}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting || !pet.name}
          sx={{
            backgroundColor: '#A78BFA',
            '&:hover': {
              backgroundColor: '#8B5CF6',
            }
          }}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}