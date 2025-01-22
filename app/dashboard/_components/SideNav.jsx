'use client'

import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'


function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard'
        },
        {
            id: 1,
            name: 'Responses',
            icon: MessageSquare,
            path: '/dashboard/responses'
        },
        {
            id: 1,
            name: 'Analytics',
            icon: LineChart,
            path: '/dashboard/analytics'
        },
        {
            id: 1,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        }

    ]

    const path = usePathname();
    useEffect(() => {
        console.log(path.includes('responses') !== -1)
    }, [path])


    return (
        <div className='h-screen shadow-md border'>
            <div className='p-5'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index} className={`flex items-center gap-3 p-4 hover:bg-primary hover:text-white rounded-lg mb-3 cursor-pointer text-gray-500 ${path == menu.path && 'bg-primary text-white'}`}>
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-20 p-6 w-64'>
                <Button className='w-full'>+ Create Form</Button>
                <div className='my-7'>
                    <Progress value={33} />
                    <h2 className='text-sm mt-2 text-gray-600'><strong>2</strong> out of <strong>3</strong> file created</h2>
                    <h2 className='text-sm mt-3 text-gray-600'>Upgrade your plan for unlimited ai form build</h2>

                </div>
            </div>
        </div>

    )
}

export default SideNav