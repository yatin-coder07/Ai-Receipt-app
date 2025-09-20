import PDFDropzone from '@/components/PDFDropzone'
import ReceiptList from '@/components/ReceiptList'
import React from 'react'

function Receipts() {
  return (
    <div  className='container mx-auto py-10 px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-col-1 lg:grid-col-2 gap-18'>
             <PDFDropzone/>
        <ReceiptList/>
        </div>
       
    </div>
  )
}

export default Receipts