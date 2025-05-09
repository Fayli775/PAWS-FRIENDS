import React from 'react';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fef8f2' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box sx={{ width: '15%', padding: 2, backgroundColor: 'RGB(253, 244, 246)' }}>
          <Sidebar profileId={params.id} />
        </Box>
        <Box sx={{ flex: 1, padding: 4 }}>
          {children} 
        </Box>
      </Box>
    </Box>
  );
}
