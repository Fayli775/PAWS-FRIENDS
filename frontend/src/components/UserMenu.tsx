'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, authenticated, loading } = useAuth();
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    handleClose();
  };

  if (loading) {
    return <Box sx={{ height: 40 }} />;
  }

  if (!authenticated) {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          component={Link}
          href="/login"
          variant="outlined"
          size="small"
        >
          Login
        </Button>
        <Button 
          component={Link}
          href="/register"
          variant="contained"
          size="small"
        >
          Register
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar 
            sx={{ width: 32, height: 32 }}
            src={user?.image || undefined}
            alt={user?.name || 'User'}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          router.push(`/profile/${user?.id}`);
          handleClose();
        }}>
          <Typography>My Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          router.push(`/profile/${user?.id}/notice`);
          handleClose();
        }}>
          <Typography>Notifications</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
} 