"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "@/components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AvatarUpload from "@/components/AvatarUpload";
import LocationSelect from "@/components/LocationSelect";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [avatar, setAvatar] = useState<string | null>(null); //预览图
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // 上传用的文件
  const [location, setLocation] = useState<string>("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [biography, setBiography] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // check if email is unique
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

  // check if password and confirm password are the same
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setIsPasswordMatch(value === password);
  };

  // handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if all fields are filled
    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !location.trim()
    ) {
      alert("Registration failed. Please fill in all required fields.");
      return;
    }

    // check if email is valid
    if (!isEmailValid) {
      alert("Registration failed. Email is already taken.");
      return;
    }

    // check if password and confirm password are the same
    if (!isPasswordMatch) {
      alert("Registration failed. Passwords do not match.");
      return;
    }

    // 创建 FormData 对象
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

      const responseData = await response.json();
      
      alert("Registration successful! Redirecting to Log in page…");
      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fef8f2",
      }}
    >
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
            helperText={
              !isEmailValid && email.trim() !== ""
                ? "Email is already taken. Please choose another."
                : ""
            }
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
            helperText={
              !isPasswordMatch && confirmPassword.trim() !== ""
                ? "Passwords do not match. Please try again."
                : ""
            }
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
          <LocationSelect
            value={location}
            onChange={(e) => setLocation(e.target.value as string)}
          />
          <AvatarUpload
            avatar={avatar}
            setAvatar={(previewUrl, file) => {
              setAvatar(previewUrl);
              setAvatarFile(file ?? null);
            }}
          />{" "}
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
          <Typography variant="body2" align="center">
            Already have an account?
            <Link
              href="/login"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
