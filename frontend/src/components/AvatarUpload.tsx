import Avatar from "@mui/material/Avatar";
import React from "react";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

interface AvatarUploadProps {
  avatar: string | null;
  setAvatar: (avatar: string | null, file?: File) => void;
  buttonText?: string; 
}

export default function AvatarUpload({ avatar, setAvatar, buttonText = "Upload Avatar" }: AvatarUploadProps) {
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === "image/jpeg" || fileType === "image/png") {
        const url = URL.createObjectURL(file);
        setAvatar(url, file); // Update preview and file
      } else {
        alert("Only JPG, JPEG, and PNG files are allowed.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 2 }}>
      <Avatar
        alt="User Avatar"
        src={avatar || "/defaultAvatarDog.png"} // Display preview or default avatar
        sx={{ width: 150, height: 150 }}
      />
      <input
        accept="image/jpeg, image/png, image/jpg"
        style={{ display: "none" }}
        id="upload-avatar"
        type="file"
        onChange={handleAvatarChange}
      />
      <label htmlFor="upload-avatar">
        <Button variant="contained" component="span">
          {buttonText}
        </Button>
      </label>
    </Box>
  );
}