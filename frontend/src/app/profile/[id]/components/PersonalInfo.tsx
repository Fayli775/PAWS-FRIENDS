"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Avatar,
} from "@mui/material";
import LocationSelect from "@/components/LocationSelect";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    bio: "",
    avatar: null as string | null,
    location: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    username: "",
    bio: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user, accessToken } = useAuth();

  const MAX_AVATAR_SIZE = 10 * 1024 * 1024; // 10MB

  // 加载用户数据
  async function fetchUserData() {
    if (!accessToken || !user) { // Check if token and userId are available
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }, 
        }
      );

      const avatarUrl = response.data.user.avatar
        ? `${process.env.NEXT_PUBLIC_API_URL}/images/uploads/avatars/${response.data.user.avatar}`
        : null;

      setFormData({
        email: response.data.user.email || "",
        username: response.data.user.user_name || "",
        bio: response.data.user.bio || "",
        avatar: avatarUrl,
        location: response.data.user.region || "",
      });

      setAvatarPreview(avatarUrl);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 401) {
        alert("Authentication failed. Please log in again.");
        // Consider redirecting to login page: router.push('/login');
      } else {
        alert(`Failed to load user data: ${error.message || error}`);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user && accessToken) { // Fetch only when both are available
      fetchUserData();
    }
  }, [user, accessToken]); // Add accessToken to dependency array

  // 处理输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 头像上传和预览
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_AVATAR_SIZE) {
        alert(
          "Avatar file is too large. Please select an image smaller than 10MB."
        );
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarPreview(url); // 本地预览
      setAvatarFile(file); // 保存文件用于上传
    }
  };

  // 验证表单
  const validate = () => {
    const newErrors: any = {};

    if (!formData.username || !formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (formData.bio && formData.bio.length > 200) {
      newErrors.bio = "Bio cannot exceed 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 保存数据
  const handleSave = async () => {
    if (!validate()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("user_name", formData.username);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("region", formData.location);

      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/updateProfile`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchUserData();
      setAvatarFile(null);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save user data. Please try again.");
    }
  };

  const handleCancel = () => {
    fetchUserData();
    setErrors({ username: "", bio: "" });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      maxWidth={500}
      justifyContent={"center"}
      margin="auto"
    >
      <Typography variant="h5" fontWeight={600}>
        Personal Info
      </Typography>

      {/* Avatar 显示和上传 */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Avatar
        </Typography>
        <Avatar
          alt="User Avatar"
          src={avatarPreview || "/default-avatar.png"}
          sx={{ width: 120, height: 120, mb: 2 }}
          onError={(e) => {
            console.error("Avatar load error:", e);
            console.log("Attempted avatar URL:", avatarPreview);
          }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload New Avatar
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Button>
      </Box>

      {/* Email 显示 */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Email:
        </Typography>
        <Typography variant="body1">{formData.email}</Typography>
      </Box>

      {/* Username */}
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
      />

      {/* Biography */}
      <TextField
        label="Biography"
        name="bio"
        multiline
        rows={3}
        value={formData.bio}
        onChange={handleChange}
        error={!!errors.bio}
        helperText={errors.bio}
        fullWidth
      />

      {/* Location */}
      <LocationSelect
        value={formData.location}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, location: e.target.value }))
        }
      />

      {/* Save and Cancel Buttons */}
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>

      {/* Snackbar 提示 */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Profile saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}