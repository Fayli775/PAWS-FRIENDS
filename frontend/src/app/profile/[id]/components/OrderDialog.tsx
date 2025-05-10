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
  TextField,
} from "@mui/material";
import ReviewForm from "./ReviewForm";
import ComplaintForm from "./ComplaintForm";
import useAuth from "@/hooks/useAuth";

//calculate the time status
function getTimeStatus(
  bookingTime: string
): "upcoming" | "ongoing" | "completed" {
  const now = new Date();
  const booking = new Date(bookingTime);
  const diffMinutes = (booking.getTime() - now.getTime()) / 60000;

  if (diffMinutes > 0) {
    return "upcoming";
  } else if (diffMinutes > -90) {
    return "ongoing";
  } else {
    return "completed";
  }
}

export default function OrderDialog({
  order,
  role,
  onClose,
  onUpdate,
}: {
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
  console.log("Time Status:", timeStatus);
  console.log("Order:", order);
  console.log("Role:", role);

  const userId = user?.id || null;
  console.log("User ID:", userId);
  console.log("Order Owner ID:", order.owner_id);
  const isOwner = userId === order.owner_id;

  const handleConfirm = () => onUpdate("confirmed");
  const handleCancel = () => onUpdate("cancelled");
  const handleComplete = () => onUpdate("completed");

  const handleSubmitReview = async () => {
    if (newComment.trim() && newRating) {
      try {
        if (!accessToken) return;

        const payload = {
          booking_id: order.id,
          comment: newComment,
          rating: newRating,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (res.ok) {
          setNewComment(newComment);
          setNewRating(newRating);
        } else {
          alert("Failed to submit review.");
        }
      } catch (err) {
        console.error("Review submit error:", err);
      }
    }
  };
  const handleSubmitComplain = async () => {
    if (newComplain.trim()) {
      try {
        if (!accessToken) return;

        const payload = {
          booking_id: order.id,
          content: newComplain,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/complain`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (res.ok) {
          setNewComplain(newComplain);
        } else {
          alert("Failed to submit complain.");
        }
      } catch (err) {
        console.error("Complian submit error:", err);
      }
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/booking/${order.id}`
        );
        const data = await res.json();

        if (data.status === "success") {
          setNewComment(data.reviews[0].comment);
          setNewRating(data.reviews[0].rating);
        }
      } catch (err) {
        console.error("Failed to fetch review:", err);
      }
    };

    const fetchComplain = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/complain/booking/${order.id}`
        );
        const data = await res.json();

        if (data.status === "success") {
          setNewComplain(data.complain[0].content);
        }
      } catch (err) {
        console.error("Failed to fetch review:", err);
      }
    };

    if (order.status === "completed" && (!order.review || !order.rating)) {
      fetchReview();
      fetchComplain();
    }
  }, [order]);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>
            <strong>Pet:</strong> {order.petName}
          </Typography>
          <Typography>
            <strong>Service:</strong> {order.serviceType}
          </Typography>
          <Typography>
            <strong>Time:</strong>{" "}
            {new Date(order.bookingTime).toLocaleString()}
          </Typography>
          <Typography>
            <strong>Status:</strong> {order.status}
          </Typography>

          {/* Render action buttons based on time phase and user role */}
          {timeStatus === "upcoming" && (
            <>
              {role === "owner" && (
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel Booking
                </Button>
              )}
              {role === "sitter" && order.status === "pending" && (
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleConfirm}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                  >
                    Reject
                  </Button>
                </Stack>
              )}
            </>
          )}

          {timeStatus === "ongoing" &&
            role === "owner" &&
            order.status === "Confirmed" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleComplete}
              >
                Mark as Completed
              </Button>
            )}

          {/* Review + Complaint */}
          {order.status === "completed" && (
            <>
              {order.review && order.rating ? (
                <Box>
                  <Typography variant="subtitle1">
                    <strong>Your Review:</strong>
                  </Typography>
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
