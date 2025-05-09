"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      // Success - redirect to home or a protected page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please try again.");
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
        paddingBottom: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <img src="/defaultAvatarCat.png" alt="Default Avatar" width={150} />
      </Box>
      <Container component="main" maxWidth="xs" sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Log In
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link
              href="/register"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
