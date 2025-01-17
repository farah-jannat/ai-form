'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";

function EditForm() {

    const { user } = useUser()
    const params = useParams();
    const [jsonForm, setJsonForm] = useState([])




    useEffect(() => {
        user && GetFormData();
    }, [user])

    const GetFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(and(eq(JsonForms.id, params?.formId),
                eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

        // console.log('jsonform ', result[0].jsonform)
        const cleanedResponse = result[0].jsonform.replace("```json", "").replace("```", "");
        // console.log('cleanedresponse', cleanedResponse)
        setJsonForm(JSON.parse(cleanedResponse))
        // console.log('parse json', JSON.parse(cleanedResponse))

        // console.log('usestate jsonform', jsonForm)


    }


    return (
        <div className='p-10 bg-slate-600'>
            <div className='grid grid-cols-1 bg-red-700 md:grid-cols-3'>
                <div>
                    Controller
                </div>
                <div className='md:col-end-2 bg-blue-500'>Form</div>
            </div>
        </div>
    )
}

export default EditForm