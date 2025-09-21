"use client"

import { useUser } from "@clerk/nextjs"
import { GetTemporaryaccessToken } from '@/actions/GetTemporaryAccessToken'
import SchematicEmbed from '@/components/Schematic/SchematicEmbed'
import { useEffect, useState } from 'react'

export default function MyPlansPage() {
  const { user, isLoaded } = useUser()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const componentId = process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID

  useEffect(() => {
    async function fetchToken() {
      if (!isLoaded) return
      
      if (!user) {
        setError("Please log in to access your plan")
        setLoading(false)
        return
      }

      try {
        const token = await GetTemporaryaccessToken()
        setAccessToken(token)
      } catch (err) {
        setError("Failed to authenticate. Please try again.")
        console.error('Error getting access token:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchToken()
  }, [user, isLoaded])

  if (!componentId) {
    return (
      <div className='container p-4 xl:max-w-5xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
        <div className='text-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg'>
          <p className='text-yellow-800'>
            Customer portal component is not configured. Please set the NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID environment variable.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='container p-4 xl:max-w-5xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
        <div className='text-center p-8'>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container p-4 xl:max-w-5xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
        <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-red-800'>{error}</p>
        </div>
      </div>
    )
  }

  if (!accessToken) {
    return (
      <div className='container p-4 xl:max-w-5xl mx-auto'>
        <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
        <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-red-800'>
            Unable to authenticate. Please make sure you're logged in and try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container p-4 xl:max-w-5xl mx-auto'>
      <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
      <SchematicEmbed accessToken={accessToken} componentId={componentId} />
    </div>
  )
}

