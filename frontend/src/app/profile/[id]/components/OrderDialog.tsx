"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Rating,
} from "@mui/material";
import ReviewForm from "./ReviewForm";
import ComplaintForm from "./ComplaintForm";
import useAuth from "@/hooks/useAuth";

function getTimeStatus(bookingTime: string): "upcoming" | "ongoing" | "completed" {
  const now = new Date();
  const booking = new Date(bookingTime);
  const diffMinutes = (booking.getTime() - now.getTime()) / 60000;

  if (diffMinutes > 0) return "upcoming";
  if (diffMinutes > -90) return "ongoing";
  return "completed";
}

export default function OrderDialog({ order, role, onClose, onUpdate }: {
  order: any;
  role: "owner" | "sitter";
  onClose: () => void;
  onUpdate: (updatedFields: any) => void;
}) {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState<number | null>(null);
  const [newComplain, setNewComplain] = useState("");
  const { user, accessToken } = useAuth();

  const timeStatus = getTimeStatus(order.bookingTime);
  const userId = user?.id || null;
  const isOwner = String(userId) === String(order.owner_id);

  const handleStatusUpdate = async (newStatus: string) => {
    console.log("🔥 status update triggered");

    try {
      if (!accessToken) return;

      if (typeof newStatus !== "string") {
        console.error("❌ Invalid status value (should be a string):", newStatus);
        alert("Status must be a string. Check button handler.");
        return;
      }

      console.log("🚀 Submitting status update:", {
        id: order.id,
        status: newStatus,
        note: `${newStatus} by ${role}`,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${order.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            status: newStatus,
            note: `${newStatus} by ${role}`,
          }),
        }
      );

      const data = await res.json();
      console.log("📦 booking update response:", data);

      if (res.ok && data.status === "success") {
        onUpdate({ status: newStatus });
      } else {
        alert("Failed to update booking status.");
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update booking status.");
    }
  };

  const handleSubmitReview = async () => {
    if (!accessToken || !newRating || !newComment.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          booking_id: order.id,
          rating: newRating,
          comment: newComment,
        }),
      });

      const data = await res.json();
      console.log("📮 Review response:", data);

      if (res.ok && data.status === "success") {
        onUpdate({ review: newComment, rating: newRating });
      } else {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.error("Review submit error:", err);
      alert("Failed to submit review.");
    }
  };

  const handleSubmitComplain = async () => {
    if (!accessToken || !newComplain.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/complain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          booking_id: order.id,
          content: newComplain,
        }),
      });

      const data = await res.json();
      console.log("📮 Complaint response:", data);

      if (res.ok && data.status === "success") {
        onUpdate({ complaint: newComplain });
      } else {
        alert("Failed to submit complaint.");
      }
    } catch (err) {
      console.error("Complaint submit error:", err);
      alert("Failed to submit complaint.");
    }
  };
  console.log("🔍 Review debug — isOwner:", isOwner);
  console.log("🔍 Review debug — newComment:", newComment);
  console.log("🔍 Review debug — newRating:", newRating);
  console.log("🔍 Complaint debug — newComplain:", newComplain);


  return (
  
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography><strong>Pet:</strong> {order.petName}</Typography>
          <Typography><strong>Service:</strong> {order.serviceType}</Typography>
          <Typography><strong>Time:</strong> {new Date(order.bookingTime).toLocaleString()}</Typography>
          <Typography><strong>Status:</strong> {order.status}</Typography>

          {timeStatus === "upcoming" && (
            <>
              {role === "owner" && (
                <Button variant="outlined" color="error" onClick={() => handleStatusUpdate("cancelled")}>
                  Cancel Booking
                </Button>
              )}
              {role === "sitter" && order.status === "pending" && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="success" onClick={() => handleStatusUpdate("accepted")}>
                    Accept
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleStatusUpdate("rejected")}>
                    Reject
                  </Button>
                </Stack>
              )}
            </>
          )}

          {timeStatus === "ongoing" && role === "owner" && order.status === "accepted" && (
            <Button variant="contained" color="primary" onClick={() => handleStatusUpdate("completed")}>
              Mark as Completed
            </Button>
          )}

          {order.status === "completed" && (
            <>
              {order.review && order.rating ? (
                <Box>
                  <Typography variant="subtitle1"><strong>Your Review:</strong></Typography>
                  <Typography>{order.review}</Typography>
                  <Rating value={order.rating} readOnly />
                </Box>
              ) : (
                <ReviewForm
                  existingReview={order.review}
                  existingRating={order.rating}
                  newReview={newComment}
                  newRating={newRating}
                  onReviewChange={setNewComment}
                  onRatingChange={setNewRating}
                  isOwner={isOwner}
                  onSubmit={handleSubmitReview}
                />
              )}

              <ComplaintForm
                existingComplaint={order.complain}
                newComplaint={newComplain}
                onComplaintChange={setNewComplain}
                isOwner={isOwner}
                onSubmit={handleSubmitComplain}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
