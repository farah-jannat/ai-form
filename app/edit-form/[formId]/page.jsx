'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormUi from '../_components/FormUi'

function EditForm() {

    const { user } = useUser()
    const params = useParams();
    const [jsonForm, setJsonForm] = useState([])
    const router = useRouter()




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
        console.log('parse json', JSON.parse(cleanedResponse))

        // console.log('usestate jsonform', jsonForm)


    }


    return (
        <div className='p-10 '>
            <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={() => router.back()}>
                <ArrowLeft />Back
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='border rounded-lg shadow-md p-4'>
                    Controller
                </div>
                <div className='md:col-span-2 border rounded-lg h-screen p-5 flex items-center justify-center'>
                    <FormUi jsonForm={jsonForm} />
                </div>
            </div>
        </div>
    )
}

export default EditForm