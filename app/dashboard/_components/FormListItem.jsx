import { Button } from '@/components/ui/button'
import { Edit, Share } from 'lucide-react'
import React from 'react'

function FormListItem({ jsonform }) {
    return (
        <div className='border shadow-sm rounded-lg p-4 '>
            <h2 className='text-lg text-black'>{jsonform?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonform?.formHeading}</h2>
            <hr className='my-4'></hr>
            <div className='flex justify-between'>
                <Button variant='outline' size='sm' className='flex gap-2'><Share className='h-5 w-5' /> Share</Button>
                <Button size='sm' className='flex gap-2'><Edit className='h-5 w-5' />Edit</Button>
            </div>
        </div>
    )
}

export default FormListItem