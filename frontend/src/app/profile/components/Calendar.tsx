// src/app/profile/components/Calendar.tsx
'use client'

import React, { useState } from 'react'
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
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

type CalendarProps = {
  /** 如果为 true，则不响应点击，也不展示保存/清除按钮 */
  readOnly?: boolean
  /** 只读或静态展示时使用的已选时段映射 */
  selectedSlots?: Record<string, boolean>
}

export default function Calendar({
  readOnly = false,
  selectedSlots = {},
}: CalendarProps) {
  // 只在组件挂载时，用 props.selectedSlots 初始化一次
  const [selected, setSelected] = useState<Record<string, boolean>>(
    () => selectedSlots
  )

  // 点击切换选中状态（只在非只读模式下生效）
  const handleToggle = (day: string, slot: string) => {
    if (readOnly) return
    const key = `${day}-${slot}`
    setSelected(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // 清空所有选中（只在可编辑模式下生效）
  const clearAll = () => {
    if (!readOnly) {
      setSelected({})
    }
  }

  // 保存当前选中状态（只在可编辑模式下生效）
  const saveAll = () => {
    if (readOnly) return
    // TODO: 接入后端 PUT /user/{id}/schedule
    console.log(
      '保存时段：',
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([k]) => k)
    )
  }

  return (
    <Box>
      <Table size="small">
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

      {/* 仅在可编辑模式下显示 Save/Clear 按钮 */}
      {!readOnly && (
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={saveAll}>
            Save
          </Button>
          <Button variant="outlined" onClick={clearAll}>
            Clear
          </Button>
        </Box>
      )}
    </Box>
  )
}
