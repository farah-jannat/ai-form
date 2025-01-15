'use client'
import { db } from '@/configs'
import { jsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React from 'react'

function EditForm({ params }) {

    const { user } = useUser()

    const GetFormData = async () => {
        const result = await db.select().from(jsonForms).where(and(eq(jsonForms.id, params?.formId), eq(jsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))
    }




    return (
        <div>EditForm</div>
    )
}

export default EditForm