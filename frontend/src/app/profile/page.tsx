'use client'

import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import Calendar from './components/Calendar' // 🆕
import Services from './components/Services' // ⏳未来添加
import Reviews from './components/Reviews'   // ⏳未来添加

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState('Profile')

  return (
    <Grid container minHeight="100vh">
      {/* Sidebar 左侧 */}
      <Grid item xs={12} md={3} sx={{ backgroundColor: '#F7F3FF', p: 3 }}>
        <Sidebar selectedTab={selectedTab} onTabChange={setSelectedTab} />
      </Grid>

      {/* Main Content 区域右侧 */}
      <Grid item xs={12} md={9} sx={{ backgroundColor: '#FFFDF5', p: 4 }}>
        {selectedTab === 'Profile' && <ProfileForm />}
        {selectedTab === 'Calendar' && <Calendar />}
        {selectedTab === 'Services' && <Services />}
        {selectedTab === 'Reviews' && <Reviews />}
      </Grid>
    </Grid>
  )
}
