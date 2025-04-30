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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PetForm, { Pet } from "./PetForm";

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!userStr || !token) throw new Error("User not logged in");

        const user = JSON.parse(userStr);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/owner/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch pets");
        const data = await response.json();
        setPets(data);
      } catch (err: any) {
        console.error("Error fetching pets:", err);
        setError(err.message || "Unknown error");
      }
    };

    fetchPets();
  }, []);

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setOpenForm(true);
  };

  const handleDelete = async (petId: number) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pets/deletePet/${petId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete pet");
      setPets((prev) => prev.filter((p) => p.id !== petId));
    } catch (err) {
      console.error("Error deleting pet:", err);
      alert("Failed to delete pet.");
    }
  };

  const handleFormSubmit = async (newPet: Pet) => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      if (!token || !user?.id) throw new Error("Missing user token or ID");

      if (editingPet) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/updatePet/${editingPet.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newPet),
          }
        );
        if (!response.ok) throw new Error("Failed to update pet");
        setPets((prev) =>
          prev.map((p) => (p.id === newPet.id ? { ...newPet } : p))
        );
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pets/addNewPet`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...newPet, owner_id: user.id }),
          }
        );
        if (!response.ok) throw new Error("Failed to add new pet");
        const { petId } = await response.json();
        setPets((prev) => [...prev, { ...newPet, id: petId }]);
      }

      setOpenForm(false);
    } catch (err) {
      console.error("Error saving pet:", err);
      alert("Failed to save pet.");
    }
  };

  return (
    <Box>
      {/* ✅ 顶部只出现一次 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={600}>
          My Pets
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditingPet(null);
            setOpenForm(true);
          }}
        >
          Add Pet
        </Button>
      </Box>

      {/* ✅ 只渲染一次卡片 Grid */}
      <Grid container spacing={3}>
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pet.id}>
            <Card sx={{ position: "relative", height: "100%" }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ position: "absolute", top: 4, right: 6 }}
              >
                <IconButton size="small" onClick={() => handleEdit(pet)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(pet.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>

              <CardContent>
                <Avatar
                  src={
                    pet.photo ||
                    (pet.type === "Cat"
                      ? "/defaultAvatarCat.png"
                      : "/defaultAvatarDog.png")
                  }
                  sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
                />
                <Typography variant="h6" textAlign="center">
                  {pet.name}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  {pet.type}
                </Typography>
                <Box mt={2}>
                  {pet.description && (
                    <Typography variant="body2">
                      <strong>Description:</strong> {pet.description}
                    </Typography>
                  )}
                  {pet.vetContact && (
                    <Typography variant="body2">
                      <strong>Vet Contact:</strong> {pet.vetContact}
                    </Typography>
                  )}
                  {pet.familyEmergencyContact && (
                    <Typography variant="body2">
                      <strong>Emergency Contact:</strong> {pet.familyEmergencyContact}
                    </Typography>
                  )}
                  {pet.medicalConditions && (
                    <Typography variant="body2">
                      <strong>Medical Conditions:</strong> {pet.medicalConditions}
                    </Typography>
                  )}
                  {pet.allergies && (
                    <Typography variant="body2">
                      <strong>Allergies:</strong> {pet.allergies}
                    </Typography>
                  )}
                  {pet.medications && (
                    <Typography variant="body2">
                      <strong>Medications:</strong> {pet.medications}
                    </Typography>
                  )}
                  {pet.specialInstructions && (
                    <Typography variant="body2">
                      <strong>Special Instructions:</strong> {pet.specialInstructions}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ 弹窗 PetForm */}
      {openForm && (
        <PetForm
          initialData={editingPet}
          onClose={() => setOpenForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
