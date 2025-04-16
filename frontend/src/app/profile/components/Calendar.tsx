'use client'

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'
import { useState } from 'react'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeSlots = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
]

export default function Calendar() {
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const toggleSlot = (day: string, time: string) => {
    const key = `${day}-${time}`
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isSelected = (day: string, time: string) =>
    selected[`${day}-${time}`] === true

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} color="#1E1B4B" mb={2}>
        Weekly Service Availability
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {weekdays.map((day) => (
              <TableCell key={day} align="center">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((time) => (
            <TableRow key={time}>
              <TableCell>{time}</TableCell>
              {weekdays.map((day) => {
                const key = `${day}-${time}`
                return (
                  <TableCell
                    key={key}
                    align="center"
                    sx={{
                      backgroundColor: isSelected(day, time)
                        ? '#A78BFA'
                        : '#F3F4F6',
                      cursor: 'pointer',
                      borderRadius: 1,
                    }}
                    onClick={() => toggleSlot(day, time)}
                  >
                    {isSelected(day, time) ? '✔️' : ''}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined">Clear</Button>
      </Box>
    </Box>
  )
}
