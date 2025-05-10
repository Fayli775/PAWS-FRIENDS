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
import useAuth from "@/hooks/useAuth";

const availableLanguages = [
  "English",
  "中文",
  "Te Reo Māori",
  "Hindi",
  "Korean",
  "Japanese",
  "Spanish",
];

const ServiceCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(3),
  backgroundColor: "#fffffa",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  height: 150,
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
  const { user, accessToken } = useAuth(true);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [initialSelectedServices, setInitialSelectedServices] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [initialSelectedLanguages, setInitialSelectedLanguages] = useState([]);
  const [dirtyService, setDirtyService] = useState(false);
  const [dirtyLanguage, setDirtyLanguage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !accessToken) return;
      
      try {
        // service type
        const serviceRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services/sitters/${user.id}/services`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const serviceData = await serviceRes.json();
        console.log("serviceData", serviceData);
        const serviceIds = serviceData?.map((s) => s.service_id);
        setSelectedServices(serviceIds);
        setInitialSelectedServices(serviceIds);

        // languange
        const langRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/languages`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const langData = await langRes.json();
        setSelectedLanguages(langData.languages || []);
        setInitialSelectedLanguages(langData.languages || []);

        //all servies
        const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
        const allData = await allRes.json();
        setAvailableServices(allData.services || []);
      } catch (err) {
        console.error("upload failed:", err);
      }
    };

    fetchData();
  }, [user, accessToken]);

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setDirtyService(true);
  };

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((x) => x !== lang) : [...prev, lang]
    );
    setDirtyLanguage(true);
  };

  const handleSaveServices = async () => {
    if (!user || !accessToken) return;
    
    try {
      const payload = selectedServices.map((id) => ({ service_id: id }));

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/sitters/${user.id}/services`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      setInitialSelectedServices([...selectedServices]);
      setSnackbarMessage("Save services successfully");
      setSnackbarOpen(true);
      setDirtyService(false);
    } catch (err) {
      console.error("failed to save the service:", err);
    }
  };

  const handleResetServices = async () => {
    if (!user || !accessToken) return;
    
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/services/sitters/${user.id}/services`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setSelectedServices([]);
      setInitialSelectedServices([]);
      setSnackbarMessage("Reset services successfully");
      setSnackbarOpen(true);
      setDirtyService(false);
    } catch (err) {
      console.error("reset service failed:", err);
    }
  };

  const handleSaveLanguages = async () => {
    if (!user || !accessToken) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/languages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languages: selectedLanguages }),
      });

      setInitialSelectedLanguages([...selectedLanguages]);
      setSnackbarMessage("Save languages successfully");
      setSnackbarOpen(true);
      setDirtyLanguage(false);
    } catch (err) {
      console.error("language save failed:", err);
    }
  };

  const handleResetLanguages = async () => {
    if (!user || !accessToken) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/languages`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setSelectedLanguages([]);
      setInitialSelectedLanguages([]);
      setSnackbarMessage("Reset languages successfully");
      setSnackbarOpen(true);
      setDirtyLanguage(false);
    } catch (err) {
      console.error("language reset failed:", err);
    }
  };

  const getServiceIcon = (name) => {
    if (name === "Dog Walking") return "/dog-walking.png";
    if (name === "In-Home Feeding") return "/in-home-feeding.png";
    if (name === "Dog Grooming & Care") return "/grooming.png";
    return "/default.png";
  };

  return (
    <Box>
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
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" disabled={!dirtyLanguage} onClick={handleSaveLanguages}>
            Save Languages
          </Button>
          <Button variant="outlined" disabled={!dirtyLanguage} onClick={handleResetLanguages}>
            Reset Languages
          </Button>
        </Box>
      </Box>

      <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
        Services You Provide
      </Typography>

      <Grid container spacing={2}>
        {availableServices.map((service) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={service.id} style={{ display: "flex" }}>
            <ServiceCard elevation={2}>
              <IconWrapper>
                <img src={getServiceIcon(service.name)} alt={service.name} />
              </IconWrapper>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.duration}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "medium", color: "primary.main", mb: 2 }}
                >
                  ${service.price}
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
        <Button variant="contained" disabled={!dirtyService} onClick={handleSaveServices}>
          Save Services
        </Button>
        <Button variant="outlined" disabled={!dirtyService} onClick={handleResetServices}>
          Reset Services
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}
