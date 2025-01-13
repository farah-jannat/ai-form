import { SignedIn } from '@clerk/nextjs'
import React from 'react'

function DashboardLayout({ children }) {
    return (
        <div>
            <SignedIn>
                {children}
            </SignedIn>
        </div>
    )
}

export default DashboardLayout