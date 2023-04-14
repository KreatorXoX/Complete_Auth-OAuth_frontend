import { Outlet } from 'react-router-dom'

import React from 'react'

interface Props {}

const RootLayout = (props: Props) => {
  return (
    <main className='h-screen w-full bg-blue-100'>
      <div className='h-20 border-b-2 border-b-orange-300 w-full flex justify-center items-center'>
        <h2 className='text-2xl text-blue-700 font-medium tracking-wide'>
          Auth Example
        </h2>
      </div>
      <div className='flex justify-center items-center h-[calc(100vh-5rem)]'>
        <Outlet />
      </div>
    </main>
  )
}

export default RootLayout
