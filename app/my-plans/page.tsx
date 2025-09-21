import SchematicComponent from '@/components/Schematic/SchematicComponent'
import React from 'react'

const MyPlan = () => {
  const componentId = process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID

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

  return (
    <div className='container p-4 xl:max-w-5xl mx-auto'>
      <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
      <SchematicComponent componentId={componentId} />
    </div>
  )
}

export default MyPlan