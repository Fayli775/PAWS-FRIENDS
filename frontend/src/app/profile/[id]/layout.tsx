import Box from '@mui/material/Box';
import React from 'react';
import Sidebar from './components/Sidebar';

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fef8f2' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box sx={{ width: '15%', padding: 2, backgroundColor: 'RGB(253, 244, 246)' }}>
          <Sidebar profileId={id} />
        </Box>
        <Box sx={{ flex: 1, padding: 4 }}>
          {children} 
        </Box>
      </Box>
    </Box>
  );
}
