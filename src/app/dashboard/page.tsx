import Attendance from '@/components/attendance'
import DetailBanner from '@/components/dashboard'
import Exams from '@/components/exams'
import React from 'react'

function DashboardPage() {
  return (
    <div className='flex-col max-w-6xl p-4 md:p-6 mx-auto'>
      <DetailBanner/>
      <div className='grid grid-cols-2 w-full rounded-md my-5 gap-5'>
        <Attendance/>
        <Exams/>
      </div>
    </div>
  )
}

export default DashboardPage