"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import AvatarUpload from "@/components/AvatarUpload";
import LocationSelect from "@/components/LocationSelect"; // 引入 LocationSelect 组件

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    email: "jenny@example.com",
    username: "",
    passwd: "",
    bio: "",
    avatar: null as string | null, // 用于存储头像
    location: "", // 新增 location 字段
  });

  const [errors, setErrors] = useState({
    username: "",
    passwd: "",
    bio: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // 清除当前字段错误提示
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (formData.passwd && formData.passwd.length < 6) {
      newErrors.passwd = "Password must be at least 6 characters";
    }

    if (formData.bio.length > 200) {
      newErrors.bio = "Bio cannot exceed 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    console.log("✅ Saving user data:", formData);

    setTimeout(() => {
      setOpenSnackbar(true);
    }, 500);
  };

  const handleCancel = () => {
    setFormData({
      email: "jenny@example.com",
      username: "",
      passwd: "",
      bio: "",
      avatar: null,
      location: "", // 重置 location
    });
    setErrors({ username: "", passwd: "", bio: "" });
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} maxWidth={500}>
      <Typography variant="h5" fontWeight={600} >
        Profile
      </Typography>

      {/* Avatar 上传 */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Avatar
        </Typography>
        <AvatarUpload
          avatar={formData.avatar}
          setAvatar={(avatar) => setFormData((prev) => ({ ...prev, avatar }))}
        />
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

      {/* Password */}
      <TextField
        label="New Password"
        name="passwd"
        type="password"
        value={formData.passwd}
        onChange={handleChange}
        error={!!errors.passwd}
        helperText={errors.passwd}
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
          sx={{ backgroundColor: "#A78BFA", textTransform: "none" }}
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
          Profile saved successfully (mock)
        </Alert>
      </Snackbar>
    </Box>
  );
}
