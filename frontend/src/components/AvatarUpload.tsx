import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box"; 

interface AvatarUploadProps {
  avatar: string | null;
  setAvatar: (avatar: string | null) => void;
}

export default function AvatarUpload({ avatar, setAvatar }: AvatarUploadProps) {
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        const reader = new FileReader();
        reader.onload = () => {
          setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Only JPG, JPEG, and PNG files are allowed.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 2 }}>
      <Avatar
        alt="User Avatar"
        src={avatar || "/defaultAvatarDog.png"}
        sx={{ width: 150, height: 150, }} 
      />
      <input
        accept="image/jpeg, image/png, image/jpg"
        style={{ display: "none" }}
        id="upload-avatar"
        type="file"
        onChange={handleAvatarChange}
      />
      <label htmlFor="upload-avatar">
        <IconButton color="primary" aria-label="upload picture" component="span" sx={{ marginTop: 2 }}>
          <PhotoCamera />
        </IconButton>
      </label>
    </Box>
  );
}