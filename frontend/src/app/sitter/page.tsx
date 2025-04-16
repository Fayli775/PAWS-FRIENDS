'use client'

import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Select,
  Button,
} from '@mui/material'
import Image from 'next/image'


export default function SitterPublicProfile() {
  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: '#FFFDF5' }}>
      <Grid container spacing={4}>
        {/* Left: Profile Info */}
        <Grid item xs={12} md={7}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="/avatar.jpg"
              sx={{ width: 80, height: 80 }}
              alt="user-avatar"
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                James S.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Auckland, NZ
              </Typography>
              <Box mt={1}>
                ⭐ 🛡️ 🏅 {/* 示例徽章 */}
              </Box>
            </Box>
          </Box>

          <Box mt={3}>
            <Typography>
              I provide experienced, loving care for dogs in the Auckland area.
              Whether your pup is high-energy or a couch potato, I’ll make sure
              they have a great time while you’re away...
            </Typography>
          </Box>

          <Box mt={3}>
            <ul>
              <li>📍 10 km pick-up radius</li>
              <li>🐾 Dogs up to 40 kg</li>
              <li>🏠 Based in Auckland Central</li>
            </ul>
          </Box>

          <Box mt={3}>
            <Image
              src="/dog-photo.jpg"
              alt="user-dog"
              width={400}
              height={250}
              style={{ borderRadius: 8 }}
            />
          </Box>
        </Grid>

        {/* Right: Booking Card */}
        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600}>
              Book James’s Services
            </Typography>

            <Box mt={2}>
              <Typography>
                <strong>Rates:</strong> $25 per hour / $40 for boarding
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography fontSize={14} color="text.secondary">
                Free to Chat: Message James to check availability.
              </Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="body2">Service Type</Typography>
              <Select fullWidth defaultValue="Dog Walking" size="small">
                <MenuItem value="Dog Walking">Dog Walking</MenuItem>
                <MenuItem value="Pet Sitting">Pet Sitting</MenuItem>
              </Select>
            </Box>
            {/* 
                <Box mt={2}>
                <Typography variant="body2">Payment Method</Typography>
                <Select fullWidth defaultValue="Visa" size="small">
                    <MenuItem value="Visa">Visa</MenuItem>
                    <MenuItem value="PayPal">PayPal</MenuItem>
                    <MenuItem value="WeChat Pay">WeChat Pay</MenuItem>
                </Select>
                </Box>
                */}

            <Button
              fullWidth
              sx={{ mt: 3, backgroundColor: '#A78BFA' }}
              variant="contained"
            >
              Book Now
            </Button>
            {/* 
            <Divider sx={{ my: 2 }} />

            <Box display="flex" gap={1} flexWrap="wrap">
            <img src="/visa.png" alt="Visa" height={24} />
            <img src="/wechat.png" alt="WeChat Pay" height={24} />
            <img src="/paypal.png" alt="PayPal" height={24} />
            </Box>
            */}
          </Card>
        </Grid>
      </Grid>
    </Box>
    
    
  )
}
