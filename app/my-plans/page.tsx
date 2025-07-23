import SchematicComponent from '@/components/Schematic/SchematicComponent'
import React from 'react'

const MyPlan = () => {
  return (
    <div className='container p-4 xl:max-w-5xl mx-auto'>
      <h1 className='text-2xl font-semibold mb-3 text-center'>Manage Your Plan</h1>
      <SchematicComponent componentId={
        process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID
      }
      />
    </div>
  )
}

export default MyPlan