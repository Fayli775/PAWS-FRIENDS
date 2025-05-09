'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import useAuth from '@/hooks/useAuth'

interface CalendarProps {
  readOnly?: boolean
  userId?: string
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeSlots = [
  '09:00–10:00',
  '10:00–11:00',
  '11:00–12:00',
  '13:00–14:00',
  '14:00–15:00',
  '15:00–16:00',
  '20:00–21:00',
  '21:00–22:00',
]

const weekdayMap: Record<string, string> = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
}

const reverseMap: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
}

const publicHolidays = [
  { date: '2025-01-01', name: "New Year's Day" },
  { date: '2025-01-02', name: "Day after New Year's Day" },
  { date: '2025-02-06', name: 'Waitangi Day' },
  { date: '2025-04-25', name: 'Anzac Day' },
  { date: '2025-06-02', name: "King's Birthday" },
  { date: '2025-10-27', name: 'Labour Day' },
  { date: '2025-12-25', name: 'Christmas Day' },
  { date: '2025-12-26', name: 'Boxing Day' },
]

export default function Calendar({ readOnly = false }: CalendarProps) {
  const { user, accessToken } = useAuth(true)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  const normalizeTime = (t: string) => t.slice(0, 5)

  const availabilityArrayToSelected = (slots: any[]): Record<string, boolean> => {
    const result: Record<string, boolean> = {}
    slots.forEach(slot => {
      const abbr = reverseMap[slot.weekday]
      const timeSlot = `${normalizeTime(slot.start_time)}–${normalizeTime(slot.end_time)}`
      const key = `${abbr}-${timeSlot}`
      result[key] = true
    })
    return result
  }

  const selectedToAvailabilityArray = (selected: Record<string, boolean>) => {
    const result: {
      weekday: string
      start_time: string
      end_time: string
    }[] = []

    Object.keys(selected).forEach(key => {
      if (selected[key]) {
        const [abbr, range] = key.split('-')
        const [start, end] = range.split('–')
        result.push({
          weekday: weekdayMap[abbr],
          start_time: start,
          end_time: end,
        })
      }
    })

    return result
  }

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        if (!accessToken) return

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/availability/${user?.id}?t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        const json = await res.json()
        const slots = Array.isArray(json) ? json : json.availability || []

        setSelected(availabilityArrayToSelected(slots))
      } catch (err) {
        console.error('Error fetching availability:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [user?.id, accessToken])

  const handleToggle = (d: string, slot: string) => {
    if (readOnly) return
    const key = `${d}-${slot}`
    setSelected(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const clearAll = () => {
    if (!readOnly) setSelected({})
  }

  const saveAll = async () => {
    if (readOnly) return

    try {
      if (!accessToken) return
      const array = selectedToAvailabilityArray(selected)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/availability`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(array),
      })

      if (!res.ok) throw new Error('Failed to save availability')
      alert('Availability saved successfully!')
    } catch (err) {
      alert('Failed to save calendar. Please try again.')
      console.error('Error saving availability:', err)
    }
  }

  const getUpcomingHolidays = () => {
    const today = new Date()
    return publicHolidays.filter(holiday => new Date(holiday.date) > today)
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom>
        <strong>Choose your available time slots</strong>
      </Typography>

      <Table size="small" sx={{ marginTop: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {weekdays.map(d => (
              <TableCell key={d} align="center">{d}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map(slot => (
            <TableRow key={slot}>
              <TableCell>{slot}</TableCell>
              {weekdays.map(d => {
                const key = `${d}-${slot}`
                return (
                  <TableCell
                    key={key}
                    align="center"
                    onClick={() => handleToggle(d, slot)}
                    sx={{
                      cursor: readOnly ? 'default' : 'pointer',
                      backgroundColor: selected[key] ? '#A78BFA' : '#F3F4F6',
                      borderRadius: 1,
                      userSelect: 'none',
                    }}
                  >
                    {selected[key] ? '✔️' : ''}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Upcoming Public Holidays
        </Typography>
        <Box>
          {getUpcomingHolidays().map(holiday => {
            const holidayDate = new Date(holiday.date)
            const weekday = weekdays[holidayDate.getDay() - 1] || 'Sun'
            return (
              <Typography key={holiday.date} variant="body2">
                <strong>{holiday.date} ({weekday}):</strong> {holiday.name}
              </Typography>
            )
          })}
        </Box>
      </Box>

      {!readOnly && (
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={saveAll}>Save</Button>
          <Button variant="outlined" onClick={clearAll}>Clear</Button>
        </Box>
      )}
    </Box>
  )
}
