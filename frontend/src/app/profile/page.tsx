'use client'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Header from '@/components/Header'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import Calendar from './components/Calendar'
import Services from './components/Services'
import Reviews from './components/Reviews'
import Pets from './components/Pets'

export default function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState<'Profile'|'Calendar'|'Services'|'Reviews'|'Pets'>('Profile')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 全局头部 */}
      <Header />

      {/* 主内容容器 */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: '10%', 
            backgroundColor: '#f5f5f5',
            padding: 2,
          }}
        >
          <Sidebar
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 4 }}>
          {selectedTab === 'Profile' && <ProfileForm />}
          {selectedTab === 'Pets'     && <Pets />}
          {selectedTab === 'Services' && <Services />}
          {selectedTab === 'Calendar' && <Calendar />}
          {selectedTab === 'Reviews' && <Reviews />}
        </Box>
      </Box>
    </Box>
  )
}
