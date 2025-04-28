'use client'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Sidebar from './components/Sidebar'
import PersonalInfo from './components/PersonalInfo'
import Calendar from './components/Calendar'
import Services from './components/Services'
import Reviews from './components/Reviews'
import Pets from './components/Pets'
import ChangePassword from './components/ChangePassword' // 新加
import Certifications from './components/Certifications' // 新加

export default function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState<
    'Personal Info' | 'Calendar' | 'Services' | 'Reviews' | 'Pets' | 'Security' | 'Certifications'
  >('Personal Info')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fef8f2' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: '15%', padding: 2 }}>
          <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 4 }}>
          {selectedTab === 'Personal Info' && <PersonalInfo />}
          {selectedTab === 'Pets' && <Pets />}
          {selectedTab === 'Services' && <Services />}
          {selectedTab === 'Calendar' && <Calendar />}
          {selectedTab === 'Reviews' && <Reviews />}
          {selectedTab === 'Security' && <ChangePassword />}        {/* 新增 */}
          {selectedTab === 'Certifications' && <Certifications />}  {/* 新增 */}
        </Box>
      </Box>
    </Box>
  )
}
