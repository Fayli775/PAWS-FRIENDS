"use client";

import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  profileId: string;
}

const menuItems = [
  { title: 'Personal Info', slug: 'personal-info' },
  { title: 'Pets', slug: 'pets' },
  { title: 'Services', slug: 'services' },
  { title: 'Calendar', slug: 'calendar' },
  { title: 'Orders', slug: 'orders' },
  { title: 'Reviews', slug: 'reviews' },
  { title: 'Security', slug: 'security' },
  { title: 'Certifications', slug: 'certifications' },
  { title: 'Notice', slug: 'notice' },
];

export default function Sidebar({ profileId }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Box sx={{ backgroundColor: "RGB(253, 244, 246)", margin: 0, padding: 0, height: '100%' }}>
      <List sx={{ margin: 0, padding: 0 }}>
        {menuItems.map((item) => {
          const href = `/profile/${profileId}/${item.slug}`;
          const isSelected = pathname === href;

          return (
            <ListItemButton
              key={item.title}
              component={Link}
              href={href}
              selected={isSelected}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  }
                }
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
