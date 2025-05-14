"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AvatarUpload from "@/components/AvatarUpload";
import LocationSelect from "@/components/LocationSelect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

export default function RegisterPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [location, setLocation] = useState<string>("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [biography, setBiography] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  const router = useRouter();

  const handleEmailChange = async (value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setIsEmailValid(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkEmail?email=${value}`
      );
      if (!response.ok) {
        throw new Error("Failed to check email");
      }
      const data = await response.json();
      setIsEmailValid(data.isUnique);
    } catch (error) {
      console.error("Error checking email:", error);
      setIsEmailValid(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setIsPasswordMatch(value === password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim() || !location.trim()) {
      showSnackbar("Registration failed. Please fill in all required fields.", "error");
      return;
    }

    if (!isEmailValid) {
      showSnackbar("Registration failed. Email is already taken.", "error");
      return;
    }

    if (!isPasswordMatch) {
      showSnackbar("Registration failed. Passwords do not match.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("user_name", username);
    formData.append("bio", biography);
    formData.append("region", location);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      showSnackbar("Registration successful! Go to Log in page.", "success");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      showSnackbar("Registration failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "#fef8f2" }}>
      <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={!isEmailValid && email.trim() !== ""}
            helperText={!isEmailValid && email.trim() !== "" ? "Email is already taken. Please choose another." : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            error={!isPasswordMatch && confirmPassword.trim() !== ""}
            helperText={!isPasswordMatch && confirmPassword.trim() !== "" ? "Passwords do not match." : ""}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Biography"
            label="Biography"
            type="text"
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
          <LocationSelect value={location} onChange={(e) => setLocation(e.target.value as string)} />
          <AvatarUpload
            avatar={avatar}
            setAvatar={(previewUrl, file) => {
              setAvatar(previewUrl);
              setAvatarFile(file ?? null);
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link href="/login" style={{ color: "blue", textDecoration: "underline" }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ bottom: '80px' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
