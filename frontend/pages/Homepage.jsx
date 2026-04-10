import React from 'react'
import { usePins } from '../context/PinContext'

const Homepage = () => {
  const { pins, loading } = usePins();
  return (
    <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
      <div className='px-4 py-6 sm:px-0'>
        <div className='flex rounded-lg border-4 border-dashed border-gray-200 flex-wrap'>
          {pins.map((pin)=> (
            <p key={pin._id}>{pin.title}</p>
          ))}


        </div>
      </div>

    </div>
  )
  
}

export default Homepage
