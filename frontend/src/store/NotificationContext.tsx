'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const NotificationContext = createContext<any>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(async () => {
      // 模拟 fetch('/api/notifications/unread')
      const newNotifications = await fetch('/api/notifications/unread').then(res => res.json())

      if (newNotifications.length > 0) {
        setNotifications((prev) => [...newNotifications, ...prev])
        setUnreadCount((prev) => prev + newNotifications.length)

        newNotifications.forEach(n => {
          toast.info(`🔔 ${n.title}`, {
            onClick: () => {
              router.push(`/profile?tab=Orders&highlight=${n.relatedBookingId}`)
            }
          })
        })
      }
    }, 30000) // 每30秒检查一次

    return () => clearInterval(interval)
  }, [router])

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, setUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}
