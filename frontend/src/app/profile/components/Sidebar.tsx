'use client'

import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import UploadAvatar from './UploadAvatar'

const menuItems = ['Profile', 'Calendar', 'Services', 'Ratings & Reviews']

export default function Sidebar() {
  return (
    <Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item} selected={item === 'Profile'}>
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />
      <UploadAvatar />



    </Box>
  )
}
