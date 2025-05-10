'use client'

import React, { useEffect } from 'react'
import useMockServiceWorker from '@/mocks/useMockServiceWorker'

export default function MockWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('useMockServiceWorker hook is about to be called')
  }, [])

  useMockServiceWorker()

  return <>{children}</>
}
