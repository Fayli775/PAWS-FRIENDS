"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import useAuth from "@/hooks/useAuth";

interface CalendarProps {
  readOnly?: boolean;
  userId?: string;
  hideHeader?: boolean;
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "09:00–10:00",
  "10:00–11:00",
  "11:00–12:00",
  "13:00–14:00",
  "14:00–15:00",
  "15:00–16:00",
  "16:00–17:00",
  "17:00–18:00",
  "18:00–19:00",
  "19:00–20:00",
  "20:00–21:00",
  "21:00–22:00",
];
const weekdayMap = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
} as const;

const reverseMap = Object.fromEntries(
  Object.entries(weekdayMap).map(([abbr, full]) => [full, abbr])
) as Record<string, string>;

export default function Calendar({
  readOnly = false,
  userId,
  hideHeader = false,
}: CalendarProps) {
  const { user, accessToken } = useAuth(true);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [bookedSlots, setBookedSlots] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const normalizeTime = (t: string) => t.slice(0, 5);

  const availabilityArrayToSelected = useCallback((slots: any[]) => {
    const result: Record<string, boolean> = {};
    slots.forEach((slot) => {
      const abbr = reverseMap[slot.weekday];
      const timeSlot = `${normalizeTime(slot.start_time)}–${normalizeTime(slot.end_time)}`;
      result[`${abbr}-${timeSlot}`] = true;
    });
    return result;
  }, []);

  const fetchAvailability = useCallback(async () => {
    if (!accessToken) return;
    const targetUserId = userId || user?.id;
    if (!targetUserId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability/${targetUserId}?t=${Date.now()}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const json = await res.json();
      setSelected(availabilityArrayToSelected(json.availability || []));

      const booked: Record<string, boolean> = {};
      (json.bookedSlots || []).forEach((slot: any) => {
        const abbr = reverseMap[slot.weekday];
        const timeSlot = `${normalizeTime(slot.start_time)}–${normalizeTime(slot.end_time)}`;
        booked[`${abbr}-${timeSlot}`] = true;
      });
      setBookedSlots(booked);
    } catch (err) {
      console.error("Error fetching availability:", err);
    } finally {
      setLoading(false);
    }
  }, [accessToken, userId, user?.id, availabilityArrayToSelected]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const handleToggle = (d: string, slot: string) => {
    const key = `${d}-${slot}`;
    if (readOnly || bookedSlots[key]) return;
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveAll = async () => {
    if (readOnly || !accessToken) return;
    try {
      const array = Object.entries(selected)
        .filter(([key, isSelected]) => isSelected && !bookedSlots[key])
        .map(([key]) => {
          const [abbr, range] = key.split("-");
          const [start, end] = range.split("–");
          return {
            weekday: weekdayMap[abbr as keyof typeof weekdayMap],
            start_time: start,
            end_time: end,
          };
        });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(array),
        }
      );
      if (!res.ok) throw new Error("Failed to save availability");
      setSnackbar({
        open: true,
        message: "Availability saved successfully!",
        severity: "success",
      });
      await fetchAvailability();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to save calendar. Please try again.",
        severity: "error",
      });
      console.error("Error saving availability:", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {!hideHeader && (
        <Typography variant="h5" sx={{ ml: 4, fontWeight: 500 }}>
          Choose your available time slots
        </Typography>
      )}
      <Table size="small" sx={{ mt: 1, ml: 4, width: "70%" }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {weekdays.map((d) => (
              <TableCell key={d} align="center">{d}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((slot) => (
            <TableRow key={slot}>
              <TableCell>{slot}</TableCell>
              {weekdays.map((d) => {
                const key = `${d}-${slot}`;
                const isBooked = bookedSlots[key];
                return (
                  <TableCell
                    key={key}
                    align="center"
                    onClick={() => handleToggle(d, slot)}
                    sx={{
                      cursor: isBooked ? "not-allowed" : "pointer",
                      backgroundColor: isBooked
                        ? "#E5E7EB"
                        : selected[key]
                        ? "#A78BFA"
                        : "#F3F4F6",
                      borderRadius: 1,
                      userSelect: "none",
                      opacity: isBooked ? 0.5 : 1,
                      fontSize: "12px",
                    }}
                  >
                    {isBooked ? "Booked" : selected[key] ? "✔️" : ""}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!readOnly && (
        <Box mt={2} ml={4} display="flex" gap={2}>
          <Button variant="contained" onClick={saveAll}>Save</Button>
          <Button variant="outlined" onClick={() => setSelected({})}>Clear</Button>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "16px 24px",
            backgroundColor: snackbar.severity === "success" ? "#4caf50" : "#f44336",
            color: "white",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
