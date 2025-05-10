"use client";
import SearchSection from "@/components/SearchPageContent";
import ServicesSection from "@/components/ServicesSection";
import EventsCarousel from "@/components/EventsCarousel";
import SiteShare from "@/components/SiteShare";
import { Box, Stack } from "@mui/material";
export default function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Stack useFlexGap direction="column" spacing={{ lg: 4, sm: 2 }}>
        <SearchSection />
        <ServicesSection />
        <SiteShare />
        <EventsCarousel />
      </Stack>
    </Box>
  );
}
