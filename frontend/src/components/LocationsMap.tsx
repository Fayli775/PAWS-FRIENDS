"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS
import L from "leaflet";
import { Box, Typography, Rating, Paper, keyframes } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import ParkIcon from "@mui/icons-material/Park";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

// Standard Leaflet Icon Fix for Webpack/Next.js
// This prevents the default marker icon from appearing broken
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { imageBaseUrl } from "@/const";

// Delete the default icon URL retrieval logic
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Merge the correct icon paths into the default icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});
// --- End Icon Fix ---

// Add paw print animation
const pawPrintAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Add bounce animation for popup
const bounceAnimation = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled components
const StyledMapContainer = styled(Box)(({ theme }) => ({
  height: "70vh", // Further reduced height
  width: "100%",
  position: "relative",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  overflow: "hidden",
  "& .leaflet-container": {
    height: "100%",
    width: "100%",
    zIndex: 1,
    borderRadius: "16px",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/paw-pattern.png")',
    opacity: 0.1,
    pointerEvents: "none",
    zIndex: 2,
  },
}));

const StyledPopup = styled(Popup)({
  "& .leaflet-popup-content-wrapper": {
    borderRadius: "12px",
    padding: "0",
    overflow: "hidden",
    animation: `${bounceAnimation} 0.5s ease-out`,
    maxWidth: "300px",
    width: "auto",
  },
  "& .leaflet-popup-tip": {
    backgroundColor: "#FFB6C1",
  },
  "& .leaflet-popup-content": {
    margin: "0",
    width: "auto !important",
  },
});

const CloseButton = styled("button")({
  position: "absolute",
  top: "8px",
  right: "8px",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
  zIndex: 1001,
  "&:hover": {
    opacity: 0.8,
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  maxWidth: "300px",
  width: "280px",
  borderRadius: "12px",
  backgroundColor: "#FFF0F5",
  border: "2px solid #FFB6C1",
  boxShadow: "0 4px 15px rgba(255,182,193,0.3)",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(255,182,193,0.4)",
  },
}));

const LocationIcon = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "#FFB6C1",
  marginRight: "8px",
  animation: `${pawPrintAnimation} 2s infinite`,
});

// Define an interface for the location data structure
// Should match the data structure returned by your backend API
interface Location {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  description?: string | null; // Optional fields marked with ?
  address?: string | null;
  image_url?: string | null;
  added_by_user_id?: number | null;
  created_at: string; // Assuming dates are strings from JSON
  updated_at: string;
  reviews: Array<{
    id: number;
    user_id: number;
    rating: number;
    comment: string;
    created_at: string;
  }>;
}

// Function to get the appropriate icon based on location type
const getLocationIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "park":
      return <ParkIcon sx={{ color: "#4CAF50" }} />;
    case "beach":
      return <BeachAccessIcon sx={{ color: "#2196F3" }} />;
    case "shopping":
      return <ShoppingCartIcon sx={{ color: "#FF9800" }} />;
    default:
      return <PetsIcon sx={{ color: "#9C27B0" }} />;
  }
};

// Basic functional component for the map
const LocationsMap: React.FC = () => {
  // --- State Variables ---
  const [locations, setLocations] = useState<Location[]>([]); // To store fetched locations
  const [loading, setLoading] = useState<boolean>(true); // To track loading state
  const [error, setError] = useState<string | null>(null); // To store potential errors
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // --- Map Configuration ---
  const mapCenter: L.LatLngTuple = [-36.8509, 174.7645]; // Auckland Center coordinates
  const defaultZoom = 12; // Initial zoom level
  // OpenStreetMap tile layer URL and attribution
  const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  // Function to get the full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";
    // If the path is already a full URL, return it as is
    if (imagePath.startsWith("http")) return imagePath;
    // Otherwise, prepend the backend server URL
    return `${imageBaseUrl}${imagePath}`;
  };

  // --- Data Fetching ---
  useEffect(() => {
    // Define the async function to fetch data
    const fetchLocations = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        // Fetch data from your backend endpoint (ensure the port 8000 is correct)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`);

        if (!response.ok) {
          // Throw an error if response status is not OK (e.g., 404, 500)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const result = await response.json();

        // Check if the backend response indicates success and contains data
        if (result.status === "success" && Array.isArray(result.data)) {
          setLocations(result.data); // Update state with fetched locations
        } else {
          // Handle cases where backend indicates an error or data format is unexpected
          throw new Error(
            result.message ||
              "Failed to fetch locations or data format incorrect"
          );
        }
      } catch (err: any) {
        console.error("Failed to fetch locations:", err);
        setError(`Failed to load locations: ${err.message}`); // Update error state
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchLocations(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle marker click
  const handleMarkerClick = (location: Location, e: L.LeafletMouseEvent) => {
    e.originalEvent.preventDefault();
    e.originalEvent.stopPropagation();

    // Get the click position relative to the viewport
    const rect = e.containerPoint;
    setPopupPosition({
      x: rect.x,
      y: rect.y,
    });
    setSelectedLocation(location);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setSelectedLocation(null);
    setPopupPosition(null);
  };

  // --- Conditional Rendering ---
  if (loading) {
    return <p>Loading map and locations...</p>; // Show loading message
  }

  if (error) {
    return <p>Error loading locations: {error}</p>; // Show error message
  }

  // If no error and not loading, render the map with markers and popups
  return (
    <StyledMapContainer>
      <MapContainer
        center={mapCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer attribution={tileLayerAttribution} url={tileLayerUrl} />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={L.divIcon({
              className: "custom-marker",
              html: `<div style="
                                background-color: #FFB6C1;
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                                border: 2px solid white;
                                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: bold;
                                cursor: pointer;
                            ">🐾</div>`,
            })}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.preventDefault();
                e.originalEvent.stopPropagation();
              },
            }}
          >
            <StyledPopup>
              <StyledPaper>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1.5,
                    mb: 1.5,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                    >
                      <LocationIcon>
                        {getLocationIcon(location.type)}
                      </LocationIcon>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#FF69B4",
                          fontSize: "1rem",
                        }}
                      >
                        {location.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#FF69B4",
                        mb: 0.5,
                        fontSize: "0.85rem",
                      }}
                    >
                      {location.type}
                    </Typography>

                    {location.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4A5568",
                          fontSize: "0.85rem",
                          lineHeight: 1.3,
                          mb: 0.5,
                        }}
                      >
                        {location.description}
                      </Typography>
                    )}

                    {location.address && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#FF69B4",
                        }}
                      >
                        <PetsIcon sx={{ mr: 0.5, fontSize: 14 }} />
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {location.address}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {location.image_url && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={getImageUrl(location.image_url)}
                        alt={location.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {location.reviews && location.reviews.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bold",
                        color: "#FF69B4",
                        mb: 0.5,
                        fontSize: "0.85rem",
                      }}
                    >
                      Recent Reviews
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        maxHeight: "120px",
                        overflowY: "auto",
                        pr: 1,
                      }}
                    >
                      {location.reviews.map((review) => (
                        <Paper
                          key={review.id}
                          elevation={0}
                          sx={{
                            p: 0.75,
                            backgroundColor: "#FFF0F5",
                            borderRadius: "8px",
                            border: "1px solid #FFB6C1",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 0.25,
                            }}
                          >
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                              sx={{ color: "#FF69B4" }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#FF69B4",
                                fontSize: "0.7rem",
                              }}
                            >
                              {new Date(review.created_at).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#4A5568",
                              fontSize: "0.8rem",
                              lineHeight: 1.3,
                            }}
                          >
                            {review.comment}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                )}
              </StyledPaper>
            </StyledPopup>
          </Marker>
        ))}
      </MapContainer>
    </StyledMapContainer>
  );
};

// Export the component for use in other parts of the application
export default LocationsMap;
