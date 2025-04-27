"use client";

import { Box, List, ListItemButton, ListItemText } from "@mui/material";

interface SidebarProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = ["Personal Info", "Pets", "Services", "Calendar", "Reviews"];

export default function Sidebar({ selectedTab, onTabChange }: SidebarProps) {
  return (
<Box sx={{ backgroundColor:"RGB(253, 244, 246)", margin: 0, padding:0, }}>
      <List sx={{margin:0, padding:0 }}>
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
  );
}
