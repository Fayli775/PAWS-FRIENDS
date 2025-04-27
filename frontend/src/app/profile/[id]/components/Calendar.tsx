// src/app/profile/components/Calendar.tsx
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
} from '@mui/material'

export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const timeSlots = [
  '09:00–10:00',
  '10:00–11:00',
  '11:00–12:00',
  '13:00–14:00',
  '14:00–15:00',
  '15:00–16:00',
]

// 新西兰公众假期列表
const publicHolidays = [
  { date: '2025-01-01', name: "New Year's Day" },
  { date: '2025-01-02', name: "Day after New Year's Day" },
  { date: '2025-02-06', name: 'Waitangi Day' },
  { date: '2025-04-25', name: 'Anzac Day' },
  { date: '2025-06-02', name: 'King’s Birthday' },
  { date: '2025-10-27', name: 'Labour Day' },
  { date: '2025-12-25', name: 'Christmas Day' },
  { date: '2025-12-26', name: 'Boxing Day' },
]

type CalendarProps = {}

export default function Calendar({}: CalendarProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [readOnly, setReadOnly] = useState(true) // 控制是否可编辑
  const [loading, setLoading] = useState(false) // 控制加载状态

  // 从数据库加载用户的日历数据
  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/calendar') // 替换为你的后端 API 路径
        if (!response.ok) {
          throw new Error('Failed to fetch calendar data')
        }
        const data = await response.json()
        setSelected(data) // 假设后端返回的格式与 `selected` 状态一致
      } catch (error) {
        console.error('Error fetching calendar data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCalendar()
  }, [])

  const handleToggle = (day: string, slot: string) => {
    if (readOnly) return
    const key = `${day}-${slot}`
    setSelected(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const clearAll = () => {
    if (!readOnly) {
      setSelected({})
    }
  }

  const saveAll = async () => {
    if (readOnly) return
    try {
      const response = await fetch('/api/calendar', {
        method: 'POST', // 或 'PUT'，根据你的后端设计
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selected),
      })
      if (!response.ok) {
        throw new Error('Failed to save calendar data')
      }
      alert('Calendar saved successfully!')
      setReadOnly(true) // 保存后切换回只读模式
    } catch (error) {
      console.error('Error saving calendar data:', error)
      alert('Failed to save calendar. Please try again.')
    }
  }

  // 获取即将到来的公众假期
  const getUpcomingHolidays = () => {
    const today = new Date()
    return publicHolidays.filter(holiday => new Date(holiday.date) > today)
  }

  return (
    <Box>
      {/* 提示信息 */}
      <Typography variant="h6" align="center" gutterBottom>
        <strong>Please choose your available time for providing pet services</strong>
      </Typography>

      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <>
          <Table size="small" sx={{ marginTop: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                {weekdays.map(d => (
                  <TableCell key={d} align="center">
                    {d}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map(slot => (
                <TableRow key={slot}>
                  <TableCell>{slot}</TableCell>
                  {weekdays.map((d, index) => {
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

          {/* 即将到来的公众假期 */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Upcoming Public Holidays in New Zealand
            </Typography>
            <Box>
              {getUpcomingHolidays().map(holiday => {
                const holidayDate = new Date(holiday.date)
                const weekday = weekdays[holidayDate.getDay()] // 获取星期几
                return (
                  <Typography key={holiday.date} variant="body1">
                    <strong>{holiday.date} ({weekday}):</strong> {holiday.name}
                  </Typography>
                )
              })}
            </Box>
          </Box>

          {/* 按钮 */}
          <Box mt={2} display="flex" gap={2}>
            {readOnly ? (
              <Button variant="contained" onClick={() => setReadOnly(false)}>
                Modify
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={saveAll}>
                  Save
                </Button>
                <Button variant="outlined" onClick={clearAll}>
                  Clear
                </Button>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
