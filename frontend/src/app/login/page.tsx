"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      // 存储 JWT 到 localStorage
      localStorage.setItem("token", data.token);

      // 确保 user 对象存在且结构正确
      if (!data.user || !data.user.id) {
        throw new Error("User data not found in response");
      }

      // 正确保存用户信息（id, email, user_name等）到 localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      console.log("User data:", data.user);

      // 跳转到用户的 Profile 页面
      window.location.href = `/profile/${data.user.id}`;
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your email and password.");
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
            disabled={isSubmitting} // 禁用按钮防止重复提交
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
