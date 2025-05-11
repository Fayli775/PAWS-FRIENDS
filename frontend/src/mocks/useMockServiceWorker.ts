'use client'

import { useEffect } from 'react'

// Only run MSW in development environment and in the browser
const useMockServiceWorker = () => {
  useEffect(() => {
    console.log('Attempting to start useMockServiceWorker')
    // Check if MSW is enabled via environment variable and if running in browser
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' && typeof window !== 'undefined') {
      console.log('Environment variable enabled, attempting to dynamically import MSW worker')
      // Dynamically import the MSW worker setup
      import('@/mocks/browser').then(({ worker }) => {
        console.log('Worker imported successfully, preparing to start')
        // Start the worker
        worker.start()
        console.log('MSW worker started')
      })
    } else if (typeof window !== 'undefined') {
      console.log('MSW is not enabled or not in browser environment.')
    }
  }, [])
}

export default useMockServiceWorker;
