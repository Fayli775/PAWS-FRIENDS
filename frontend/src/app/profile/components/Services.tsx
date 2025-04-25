"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Snackbar,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { width } from "@mui/system";

// 服务数据
const services = [
  {
    id: 1,
    name: "In-Home Feeding",
    description: "We visit your pet at home and ensure timely meals.",
    price: "From $25/hr",
    icon: "/in-home-feeding.png",
  },
  {
    id: 2,
    name: "Dog Walking",
    description: "Daily walks to keep your dog happy and healthy.",
    price: "From $25/hr",
    icon: "/dog-walking.png",
  },
  {
    id: 3,
    name: "Boarding",
    description: "Safe, cozy home for your pets while you're away.",
    price: "From $25/hr",
    icon: "/boarding.png",
  },
  {
    id: 4,
    name: "Grooming",
    description: "Professional grooming to keep pets clean and pretty.",
    price: "From $25/hr",
    icon: "/grooming.png",
  },
];

// Styled components
const ServiceCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(3),
  transition: "transform 0.2s ease-in-out",
  backgroundColor: "#fffffa",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
}));

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [dirty, setDirty] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const initialServices = [1, 3]; // 假设用户已选择 "In-Home Feeding" 和 "Boarding"
    setSelectedServices(initialServices);
  }, []);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setDirty(true);
  };

  const handleSave = async () => {
    console.log("Saving selected services:", selectedServices);
    setDirty(false);
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B" mb={2}>
        Services You Provide
      </Typography>

      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid size={{xs:12, sm:6, md:3}} style={{ display: 'flex' }} key={service.id}>

            <ServiceCard elevation={2}>
              <IconWrapper>
                <img src={service.icon} alt={service.name} />
              </IconWrapper>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "medium",
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  {service.price}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                    />
                  }
                  label="Select"
                />
              </CardContent>
            </ServiceCard>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" gap={2} justifyContent="center">
        <Button variant="contained" disabled={!dirty} onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="outlined"
          disabled={!dirty}
          onClick={() => {
            setSelectedServices([1, 3]); // 重置为初始值
            setDirty(false);
          }}
        >
          Reset
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Settings saved"
      />
    </Box>
  );
}
