"use client";

import { Box, Container, Typography, Grid, Paper } from "@mui/material";

const partners = {
  vets: [
    {
      name: "GreenPaw Veterinary Clinic",
      address: "123 Dogwood Ave, Auckland",
      phone: "09 123 4567",
    },
    {
      name: "Companion Vet Centre",
      address: "45 Parnell Rise, Auckland",
      phone: "09 555 6789",
    },
  ],
  hospitals: [
    {
      name: "AnimalCare Pet Hospital",
      address: "88 Great North Road, Auckland",
      phone: "09 888 8888",
    },
    {
      name: "Southern Cross Animal Hospital",
      address: "12 Khyber Pass Road, Auckland",
      phone: "09 222 3333",
    },
  ],
  grooming: [
    {
      name: "Fluffy Tails Grooming",
      address: "9 Remuera Road, Auckland",
      phone: "09 777 1234",
    },
    {
      name: "Pawfect Style",
      address: "101 Dominion Road, Auckland",
      phone: "09 789 4567",
    },
  ],
  boarding: [
    {
      name: "Happy Tails Boarding",
      address: "300 Meadowbank Drive, Auckland",
      phone: "09 999 0001",
    },
    {
      name: "Paws & Stay",
      address: "65 Mt Eden Road, Auckland",
      phone: "09 456 7890",
    },
  ],
  supplies: [
    {
      name: "PawMart",
      address: "200 Broadway, Auckland",
      phone: "09 321 1234",
    },
    {
      name: "BestBuddy Pet Supplies",
      address: "55 New North Road, Auckland",
      phone: "09 654 3210",
    },
  ],
  training: [
    {
      name: "SmartPaws Training School",
      address: "14 Obedience Ln, Auckland",
      phone: "09 111 2222",
    },
    {
      name: "Good Dog Academy",
      address: "88 Heel Street, Auckland",
      phone: "09 333 4444",
    },
  ],
};

function PartnerSection({
  title,
  list,
}: {
  title: string;
  list: { name: string; address: string; phone: string }[];
}) {
  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {list.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                height: 140,
                width: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <Typography fontWeight="bold" align="left">
                {item.name}
              </Typography>
              <Typography variant="body2" align="left">
                {item.address}
              </Typography>
              <Typography variant="body2" align="left">
                Phone: {item.phone}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function SupportPage() {
  return (
    <Box
      sx={{
        backgroundColor: '#fef8f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md" sx={{ mt: 0, mb: 0}}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
          Our Trusted Partners
        </Typography>

        {/* Custom horizontal layout for vets and hospitals */}
        <Box display="grid" gap={4} mb={4}>
          <Box gridRow={1}>
            <PartnerSection title="🐾 Veterinarians" list={partners.vets} />
          </Box>
          <Box gridRow={1}>
            <PartnerSection title="🏥 Pet Hospitals" list={partners.hospitals} />
          </Box>
          <Box gridRow={1}>
            <PartnerSection title="✂️ Pet Grooming Services" list={partners.grooming} />
          </Box>
          <Box gridRow={2}>
            <PartnerSection title="🏠 Pet Boarding Services" list={partners.boarding} />
          </Box>
          <Box gridRow={2}>
            <PartnerSection title="🎓 Pet Training Services" list={partners.training} />
          </Box>
          <Box gridRow={2}>
            <PartnerSection title="🛍 Pet Supplies & Food" list={partners.supplies} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
