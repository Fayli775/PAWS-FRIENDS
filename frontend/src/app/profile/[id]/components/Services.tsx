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
  FormGroup,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

// 可选语言
const availableLanguages = [
  "English",
  "中文",
  "Te Reo Māori",
  "Hindi",
  "Korean",
  "Japanese",
  "Spanish",
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
  height: 150, // 固定图像区域高度
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
  },
}));

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        if (!token || !user?.id) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setSelectedServices(data.user.services || []);
        setSelectedLanguages(data.user.languages_supported || []);
      } catch (err) {
        console.error("Failed to load user preferences", err);
      }
    };

    fetchUserSettings();
  }, []);

  const toggleService = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setDirty(true);
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((x) => x !== lang) : [...prev, lang]
    );
    setDirty(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const payload = {
        services: selectedServices,
        languages_supported: selectedLanguages,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/updateProfile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to save");
      setSnackbarOpen(true);
      setDirty(false);
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save. Please try again.");
    }
  };

  return (
    <Box>
      {/* ✅ 语言选择放在页面最上方 */}
      <Box mb={5} maxWidth="lg" mx="auto" px={{ xs: 2, md: 4 }}>
        <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2, display: "block" }}>
          Languages You Support
        </FormLabel>
        <FormGroup row sx={{ gap: 2 }}>
          {availableLanguages.map((lang) => (
            <FormControlLabel
              key={lang}
              control={
                <Checkbox
                  checked={selectedLanguages.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                />
              }
              label={lang}
            />
          ))}
        </FormGroup>
      </Box>

      {/* 服务模块标题 */}
      <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
        Services You Provide
      </Typography>

      {/* 服务卡片模块 */}
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={3}  lg={3} xl={3} key={service.id} style={{ display: "flex" }}>
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

      {/* Save / Reset 按钮 */}
      <Box mt={4} display="flex" gap={2} justifyContent="center">
        <Button variant="contained" disabled={!dirty} onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="outlined"
          disabled={!dirty}
          onClick={() => {
            setSelectedServices([]);
            setSelectedLanguages([]);
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
