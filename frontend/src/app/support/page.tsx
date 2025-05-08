'use client';

import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const partners = {
  vets: [
    { name: "GreenPaw Veterinary Clinic", address: "123 Dogwood Ave, Auckland", phone: "09 123 4567" },
    { name: "Companion Vet Centre", address: "45 Parnell Rise, Auckland", phone: "09 555 6789" }
  ],
  hospitals: [
    { name: "AnimalCare Pet Hospital", address: "88 Great North Road, Auckland", phone: "09 888 8888" },
    { name: "Southern Cross Animal Hospital", address: "12 Khyber Pass Road, Auckland", phone: "09 222 3333" }
  ],
  grooming: [
    { name: "Fluffy Tails Grooming", address: "9 Remuera Road, Auckland", phone: "09 777 1234" },
    { name: "Pawfect Style", address: "101 Dominion Road, Auckland", phone: "09 789 4567" }
  ],
  boarding: [
    { name: "Happy Tails Boarding", address: "300 Meadowbank Drive, Auckland", phone: "09 999 0001" },
    { name: "Paws & Stay", address: "65 Mt Eden Road, Auckland", phone: "09 456 7890" }
  ],
  supplies: [
    { name: "PawMart", address: "200 Broadway, Auckland", phone: "09 321 1234" },
    { name: "BestBuddy Pet Supplies", address: "55 New North Road, Auckland", phone: "09 654 3210" }
  ]
};

function PartnerSection({ title, list }: { title: string; list: { name: string; address: string; phone: string }[] }) {
  return (
    <Box mb={5}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
      <Grid container spacing={2} alignItems="stretch">
        {list.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                height: 140,
                width: '250px', // Ensures consistent width
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                boxSizing: 'border-box',
              }}
            >
              <Typography fontWeight="bold" align="left">{item.name}</Typography>
              <Typography variant="body2" align="left">{item.address}</Typography>
              <Typography variant="body2" align="left">Phone: {item.phone}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default function SupportPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Our Trusted Partners
      </Typography>

      <PartnerSection title="🐾 Partner Veterinarians" list={partners.vets} />
      <PartnerSection title="🏥 Partner Pet Hospitals" list={partners.hospitals} />
      <PartnerSection title="✂️ Grooming Services" list={partners.grooming} />
      <PartnerSection title="🏠 Pet Boarding Services" list={partners.boarding} />
      <PartnerSection title="🛍 Pet Supplies & Food Stores" list={partners.supplies} />
    </Container>
  );
}