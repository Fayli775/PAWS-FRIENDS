'use client'

import { Box, List, ListItemButton, ListItemText } from '@mui/material'

interface SidebarProps {
  selectedTab: string
  onTabChange: (tab: string) => void
}

const menuItems = ['Profile', 'Calendar', 'Services', 'Reviews', 'Pets']

export default function Sidebar({ selectedTab, onTabChange }: SidebarProps) {
  return (
    <Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item}
            selected={selectedTab === item}
            onClick={() => onTabChange(item)}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
