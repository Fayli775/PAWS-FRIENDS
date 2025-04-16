'use client'

import { Grid, Box } from '@mui/material'
import Sidebar from './components/Sidebar'
import ProfileForm from './components/ProfileForm'

export default function ProfilePage() {
    return (
        <Box sx={{ backgroundColor: '#FFFDF5', minHeight: '100vh' }}>

            <Grid container minHeight="100vh">
                <Grid
                item
                xs={12}
                md={3}
                sx={{
                    backgroundColor: '#F7F3FF',
                    p: 3,
                    borderRight: '1px solid #E5E7EB',
                }}
                >
                <Sidebar />

                </Grid>
        
                <Grid
                item
                xs={12}
                md={9}
                sx={{
                    backgroundColor: '#FFFDF5',
                    p: 4,
                }}
                >
                <ProfileForm />

                </Grid>
            </Grid>
        </Box>

    )
  }
  
