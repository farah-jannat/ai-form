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
import { toast } from 'sonner'
import Controller from '../_components/Controller'

function EditForm() {

    const { user } = useUser()
    const params = useParams();
    const [jsonForm, setJsonForm] = useState([])
    const router = useRouter()
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('light')



    useEffect(() => {
        if (updateTrigger) {
            setJsonForm(jsonForm)
            updateJsonFormInDb()
        }

    }, [updateTrigger])

    const onFieldUpdate = (value, index) => {

        jsonForm.fields[index].label = value.label;
        jsonForm.fields[index].placeholder = value.placeholder;
        setUpdateTrigger(Date.now())

    }
    const updateJsonFormInDb = async () => {
        const result = await db.update(JsonForms)
            .set({
                jsonform: jsonForm
            }).where(and(eq(JsonForms.id, record.id), eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)))

        toast('Updated!!')
        console.log('result of updaing db', result)
    }



    useEffect(() => {
        user && GetFormData();
    }, [user])

    const GetFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(and(eq(JsonForms.id, params?.formId),
                eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

        console.log('jsonform ', result[0].jsonform)
        setRecord(result[0])
        const cleanedResponse = result[0].jsonform.replace("```json", "").replace("```", "");
        // console.log('cleanedresponse', cleanedResponse)
        setJsonForm(JSON.parse(cleanedResponse))
        console.log('parse json', JSON.parse(cleanedResponse))

        // console.log('usestate jsonform', jsonForm)




    }

    const deleteField = (indexToRemove) => {
        const result = jsonForm.fields.filter((item, index) => index != indexToRemove)
        jsonForm.fields = result;
        setUpdateTrigger(Date.now())


    }


    return (
        <div className='p-10 '>
            <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={() => router.back()}>
                <ArrowLeft />Back
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='border rounded-lg shadow-md p-4'>
                    <Controller selectedTheme={(value) => setSelectedTheme(value)} />
                </div>
                <div className='md:col-span-2 border rounded-lg  p-5 flex items-center justify-center'>
                    <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate}
                        deleteField={(index) => deleteField(index)}
                        selectedTheme={selectedTheme}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditForm