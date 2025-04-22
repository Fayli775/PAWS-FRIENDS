'use client'; // Required for client-side components in Next.js App Router

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import L from 'leaflet';

// --- Standard Leaflet Icon Fix for Webpack/Next.js ---
// This prevents the default marker icon from appearing broken
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Delete the default icon URL retrieval logic
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Merge the correct icon paths into the default icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});
// --- End Icon Fix ---

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
}

// Basic functional component for the map
const LocationsMap: React.FC = () => {
    // --- State Variables ---
    const [locations, setLocations] = useState<Location[]>([]); // To store fetched locations
    const [loading, setLoading] = useState<boolean>(true);      // To track loading state
    const [error, setError] = useState<string | null>(null);    // To store potential errors

    // --- Map Configuration ---
    const mapCenter: L.LatLngTuple = [-36.8509, 174.7645]; // Auckland Center coordinates
    const defaultZoom = 12; // Initial zoom level
    // OpenStreetMap tile layer URL and attribution
    const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tileLayerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    // --- Data Fetching ---
    useEffect(() => {
        // Define the async function to fetch data
        const fetchLocations = async () => {
            setLoading(true); // Start loading
            setError(null);   // Reset error state
            try {
                // Fetch data from your backend endpoint (ensure the port 8000 is correct)
                const response = await fetch('http://localhost:8000/api/locations');

                if (!response.ok) {
                    // Throw an error if response status is not OK (e.g., 404, 500)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const result = await response.json();

                // Check if the backend response indicates success and contains data
                if (result.status === 'success' && Array.isArray(result.data)) {
                    setLocations(result.data); // Update state with fetched locations
                } else {
                    // Handle cases where backend indicates an error or data format is unexpected
                    throw new Error(result.message || 'Failed to fetch locations or data format incorrect');
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

    // --- Conditional Rendering ---
    if (loading) {
        return <p>Loading map and locations...</p>; // Show loading message
    }

    if (error) {
        return <p>Error loading locations: {error}</p>; // Show error message
    }

    // If no error and not loading, render the map with markers and popups
    return (
        // The MapContainer component initializes the map.
        // We must provide a height and width for it to be visible.
        <MapContainer center={mapCenter} zoom={defaultZoom} style={{ height: '600px', width: '100%' }}>
            {/* The TileLayer component displays the map background tiles */}
            <TileLayer
                attribution={tileLayerAttribution}
                url={tileLayerUrl}
            />

            {/* Map over the locations array and render a Marker with a Popup for each */}
            {locations.map((location) => (
                <Marker
                    key={location.id} // Unique key for React reconciliation
                    position={[location.latitude, location.longitude]} // Set marker position
                >
                    {/* Add Popup component inside Marker */}
                    <Popup>
                        {/* Content to display inside the popup */}
                        <strong>{location.name}</strong> ({location.type})
                        <br />
                        {location.description}
                        {/* You can add more details like address, rating (from reviews) later */}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

// Export the component for use in other parts of the application
export default LocationsMap; 