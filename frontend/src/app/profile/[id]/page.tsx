'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Sidebar from './components/Sidebar'
import PersonalInfo from './components/PersonalInfo'
import Calendar from './components/Calendar'
import Services from './components/Services'
import Reviews from './components/Reviews'
import Pets from './components/Pets'
import ChangePassword from './components/ChangePassword'
import Certifications from './components/Certifications'
import Notice from './components/Notice'

import Header from '@/components/Header'
import OrdersPage from './components/OrdersPage'


export default function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState<
    'Personal Info' | 'Calendar' | 'Services' | 'Reviews' | 'Pets' | 'Orders' | 'Security' | 'Certifications' | 'Notice'
  >('Personal Info')

  const userStr = localStorage.getItem('user') 
  const user = userStr ? JSON.parse(userStr) : null
  const userId = user ? user.id : null

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
          {selectedTab === 'Calendar' && <Calendar userId={userId}/>}
          {selectedTab === 'Orders' && <OrdersPage />}  {/* ✅ 加上新 Orders */}
          {selectedTab === 'Reviews' && <Reviews />}
          {selectedTab === 'Security' && <ChangePassword />}
          {selectedTab === 'Certifications' && <Certifications />}
          {selectedTab === 'Notice' && <Notice />}
        </Box>
      </Box>
    </Box>
  )
}
