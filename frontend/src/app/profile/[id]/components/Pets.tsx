'use client'

import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AvatarUpload from "@/components/AvatarUpload";

interface Pet {
  id?: number;
  name: string;
  type: string;
  description?: string;
  photo?: string;
  vet_contact_phone?: string;
  emergency_contact_phone?: string;
  allergies?: string;
  medications?: string;
  special_instructions?: string;
}

export default function PetsPage() {
  // 状态管理
  const [pets, setPets] = useState<Pet[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingPetId, setUploadingPetId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 获取认证信息
  const getAuthInfo = () => {
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userStr || !token) throw new Error("User not logged in");
    return { user: JSON.parse(userStr), token };
  };

  // 获取宠物列表
  const fetchPets = async () => {
    try {
      const { user, token } = getAuthInfo();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Failed to fetch pets");
      const data = await response.json();
      setPets(data.map((pet: Pet) => ({
        ...pet,
        photo: pet.photo ? 
          (pet.photo.startsWith('http') ? pet.photo : `${process.env.NEXT_PUBLIC_API_URL}${pet.photo}`) 
          : null
      })));
    } catch (err: any) {
      console.error("Error fetching pets:", err);
      setError(err.message || "Failed to load pets");
    }
  };

  useEffect(() => { fetchPets(); }, []);

  // 处理头像上传
  const handleUploadPetImage = async (petId: number, file: File) => {
    setUploadingPetId(petId);
    try {
      const { token } = getAuthInfo();
      const formData = new FormData();
      formData.append('photo', file);

      // 调试日志
      console.log('Uploading to:', `${process.env.NEXT_PUBLIC_API_URL}/api/pets/uploadPhoto/${petId}`);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/uploadPhoto/${petId}`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      // 检查响应内容
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text.substring(0, 100));
        throw new Error(`Expected JSON but got ${contentType}`);
      }

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed");

      const photoUrl = result.photoUrl.startsWith('http') 
        ? result.photoUrl 
        : `${process.env.NEXT_PUBLIC_API_URL}${result.photoUrl}`;

      setPets(prev => prev.map(pet => 
        pet.id === petId ? { ...pet, photo: photoUrl } : pet
      ));
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message.includes('JSON') 
        ? "Server returned invalid response" 
        : err.message);
    } finally {
      setUploadingPetId(null);
    }
  };

  // 表单提交
  const handleFormSubmit = async (petData: Pet) => {
    setIsSubmitting(true);
    try {
      const { user, token } = getAuthInfo();
      
      const response = await fetch(
        editingPet 
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/pets/updatePet/${editingPet.id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/pets/addNewPet`,
        {
          method: editingPet ? 'PUT' : 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingPet 
            ? petData 
            : { ...petData, owner_id: user.id }),
        }
      );
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Request failed");
  
      // 修改这里：使用 photo_url 而不是 photoUrl
      const updatedPet = {
        ...petData,
        photo: result.pet?.photo_url || petData.photo
      };
  
      setPets(prev => 
        editingPet 
          ? prev.map(p => p.id === petData.id ? updatedPet : p)
          : [...prev, { ...updatedPet, id: result.petId }]
      );
      
      setOpenForm(false);
    } catch (err: any) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save pet");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 删除宠物
  const handleDelete = async (petId: number) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      const { token } = getAuthInfo();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/deletePet/${petId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to delete pet");
      setPets(prev => prev.filter(p => p.id !== petId));
    } catch (err: any) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete pet");
    }
  };

  return (
    <Box p={3}>
      {/* 宠物列表头部 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          My Pets
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingPet(null);
            setOpenForm(true);
          }}
          sx={{ textTransform: 'none' }}
        >
          Add Pet
        </Button>
      </Box>

      {/* 宠物列表 */}
      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                <IconButton size="small" onClick={() => { setEditingPet(pet); setOpenForm(true); }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(pet.id!)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>

              <CardContent>
                <Box textAlign="center" mb={2}>
                  <Box position="relative" display="inline-block">
                    <Avatar
                      src={pet.photo || (pet.type === 'Cat' ? '/defaultAvatarCat.png' : '/defaultAvatarDog.png')}
                      sx={{ width: 120, height: 120 }}
                    />
                    {uploadingPetId === pet.id && (
                      <CircularProgress
                        size={48}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: -24,
                          marginLeft: -24,
                        }}
                      />
                    )}
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    component="label"
                    disabled={uploadingPetId === pet.id}
                    sx={{ 
                      mt: 1,
                      textTransform: 'none',
                      color: '#A78BFA',
                      borderColor: '#A78BFA',
                      '&:hover': { borderColor: '#8B5CF6' }
                    }}
                  >
                    {uploadingPetId === pet.id ? 'Uploading...' : 'Change Photo'}
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg, image/png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && pet.id) handleUploadPetImage(pet.id, file);
                      }}
                    />
                  </Button>
                </Box>

                <Typography variant="h6" align="center" gutterBottom>
                  {pet.name}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                  {pet.type}
                </Typography>

                <Box sx={{ '& > *:not(:last-child)': { mb: 1 } }}>
                  {pet.description && <Typography variant="body2"><strong>Description:</strong> {pet.description}</Typography>}
                  {pet.vet_contact_phone && <Typography variant="body2"><strong>Vet Contact:</strong> {pet.vet_contact_phone}</Typography>}
                  {pet.emergency_contact_phone && <Typography variant="body2"><strong>Emergency Contact:</strong> {pet.emergency_contact_phone}</Typography>}
                  {pet.allergies && <Typography variant="body2"><strong>Allergies:</strong> {pet.allergies}</Typography>}
                  {pet.medications && <Typography variant="body2"><strong>Medications:</strong> {pet.medications}</Typography>}
                  {pet.special_instructions && <Typography variant="body2"><strong>Special Instructions:</strong> {pet.special_instructions}</Typography>}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 宠物表单对话框 */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPet ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} textAlign="center">
              <AvatarUpload
                avatar={editingPet?.photo || (editingPet?.type === 'Cat' ? '/defaultAvatarCat.png' : '/defaultAvatarDog.png')}
                setAvatar={(avatarUrl, file) => {
                  if (file && editingPet?.id) {
                    handleUploadPetImage(editingPet.id, file);
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pet Name"
                name="name"
                value={editingPet?.name || ''}
                onChange={(e) => setEditingPet(prev => ({ ...prev!, name: e.target.value }))}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Pet Type"
                name="type"
                value={editingPet?.type || 'Dog'}
                onChange={(e) => setEditingPet(prev => ({ ...prev!, type: e.target.value }))}
                required
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            {/* 其他表单字段... */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={editingPet?.description || ''}
                onChange={(e) => setEditingPet(prev => ({ ...prev!, description: e.target.value }))}
              />
            </Grid>

            {/* 其他字段... */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button
            onClick={() => editingPet && handleFormSubmit(editingPet)}
            variant="contained"
            disabled={isSubmitting || !editingPet?.name}
            sx={{
              backgroundColor: '#A78BFA',
              '&:hover': { backgroundColor: '#8B5CF6' }
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 错误提示 */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}