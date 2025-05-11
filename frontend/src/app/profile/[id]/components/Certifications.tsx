"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AvatarUpload from "@/components/AvatarUpload";
import useAuth from "@/hooks/useAuth";

export default function Certifications() {
  const { accessToken } = useAuth(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteFile, setPendingDeleteFile] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchUploadedFiles = async () => {
    if (!accessToken) return;

    try {
      const res = await fetch(`${API_URL}/api/certificate/certificates`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        const errResult = await res.json();
        console.error("Failed to fetch certifications:", errResult);
        throw new Error(errResult.message || "Failed to load certifications");
      }

      const data = await res.json();
      setUploadedFiles(data);
    } catch (err: any) {
      console.error("fetch error:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, [accessToken]);

  const handleUpload = async () => {
    if (!selectedFile || !accessToken) return;

    try {
      const formData = new FormData();
      formData.append("certification", selectedFile);

      const res = await fetch(`${API_URL}/api/certificate/uploadCertificate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const result = await res.json();

      if (!res.ok) {
        console.error("Upload failed:", result);
        throw new Error(result.message || "Upload failed");
      }

      setMessage("Upload successful!");
      setSelectedFile(null);
      setPreviewUrl(null);
      fetchUploadedFiles();
    } catch (err: any) {
      console.error("upload error:", err);
      setError(err.message);
    }
  };

  const handleDelete = (filePath: string) => {
    setPendingDeleteFile(filePath);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteFile || !accessToken) return;

    const filename = pendingDeleteFile.split("/").pop();
    if (!filename) return;

    try {
      const res = await fetch(
        `${API_URL}/api/certificate/deleteCertificate/${filename}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete certification.");

      setMessage("Deleted successfully!");
      setUploadedFiles((prev) => prev.filter((f) => f !== pendingDeleteFile));
    } catch (err: any) {
      console.error("delete error:", err);
      setError(err.message);
    } finally {
      setConfirmOpen(false);
      setPendingDeleteFile(null);
    }
  };

  return (
    <Box display="flex" flexDirection="column" maxWidth={600} gap={3} ml={4}>
      <Typography variant="h5" fontWeight={600}>
        Upload Certifications
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: -2 }}>
        Please upload any of the following proof documents:
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>Local pet registration certificate</li>
          <li>Pet-business verification (proof of premises, NZBN, etc.)</li>
          <li>Sitter accreditation (NZQA-certified courses)</li>
          <li>Pet care skills certifications (first-aid, professional references)</li>
        </ul>
      </Typography>

      <AvatarUpload
        avatar={previewUrl}
        setAvatar={(url, file) => {
          setPreviewUrl(url);
          if (file) setSelectedFile(file);
        }}
        buttonText="Upload Certification" // 自定义按钮文本
      />

      <Button
        variant="contained"
        onClick={handleUpload}
        sx={{ backgroundColor: "#A78BFA" }}
        disabled={!selectedFile}
      >
        Save
      </Button>

      {uploadedFiles.length > 0 && (
        <>
          <Typography variant="h6">Uploaded Certifications</Typography>
          <Grid container spacing={2}>
            {uploadedFiles.map((file, idx) => (
              <Grid item key={idx}>
                <Stack alignItems="center" spacing={1}>
                  <Avatar
                    src={`${API_URL}/images/uploads/certificates/${file.certificate_name}`}
                    sx={{ width: 80, height: 80 }}
                    imgProps={{
                      onError: (e) =>
                        (e.currentTarget.src = "/defaultAvatarDog.png"),
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDelete(
                        `/images/uploads/certificates/${file.certificate_name}`
                      )
                    }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this file?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
      >
        <Alert severity="success" onClose={() => setMessage(null)} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)} sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
