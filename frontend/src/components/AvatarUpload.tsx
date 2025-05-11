import Avatar from "@mui/material/Avatar";
import React from "react";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

interface AvatarUploadProps {
  avatar: string | null;
  setAvatar: (url: string, file: File) => void;
}

export default function AvatarUpload({ avatar, setAvatar }: AvatarUploadProps) {
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
        src={avatar || "/defaultAvatarDog.png"} // 显示预览或默认头像
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
          Upload Avatar
        </Button>
      </label>
    </Box>
  );
}