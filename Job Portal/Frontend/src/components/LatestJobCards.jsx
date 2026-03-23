import React from 'react'
import { Badge } from './ui/badge'
function LatestJobCards() {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div>
                <h1 className='text-xl font-bold'>Company Name</h1>
                <p className='text-gray-600'>India</p>
            </div>
            <div> 
                <p className='font-semibold'>Job Title</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
               <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
               <Badge className={'text-blue-700 font-bold'} variant="ghost">Full-time</Badge>
               <Badge className={'text-blue-700 font-bold'} variant="ghost">24 Lpa</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards