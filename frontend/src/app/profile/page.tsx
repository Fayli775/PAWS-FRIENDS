'use client'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'
import Calendar from './components/Calendar'
import Services from './components/Services'
import Reviews from './components/Reviews'

export default function MyProfilePage() {
  const [selectedTab, setSelectedTab] = useState<'Profile'|'Calendar'|'Services'|'Reviews'>('Profile')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* 全局头部 */}
      <Header />

      {/* 主内容容器 */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{ flex: 1, mt: 4, mb: 4 }}
      >
        {/* Grid: 左侧 Sidebar + 右侧内容 */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Sidebar
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            {selectedTab === 'Profile' && <ProfileForm />}
            {selectedTab === 'Calendar' && <Calendar />}
            {selectedTab === 'Services' && <Services />}
            {selectedTab === 'Reviews' && <Reviews />}
          </Grid>
        </Grid>
      </Container>

      {/* （如果有 Footer 则放这儿） */}
    </Box>
  )
}
