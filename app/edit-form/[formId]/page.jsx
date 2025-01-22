'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controller from '../_components/Controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { RWebShare } from "react-web-share";


function EditForm() {

    const { user } = useUser()
    const params = useParams();
    const [jsonForm, setJsonForm] = useState([])
    const router = useRouter()
    const [updateTrigger, setUpdateTrigger] = useState();
    const [record, setRecord] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('light')
    const [selectedBg, setSelectedBg] = useState('none')
    const [selectedStyle, setSelectedStyle] = useState('default')
    const [selectedItem, setSelectedItem] = useState(-1)
    const [selectedBorder, setSelectedBorder] = useState(-1)



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
        setSelectedTheme(result[0].theme)
        setSelectedBg(result[0].background)


        // console.log('usestate jsonform', jsonForm)




    }

    const deleteField = (indexToRemove) => {
        const result = jsonForm.fields.filter((item, index) => index != indexToRemove)
        jsonForm.fields = result;
        setUpdateTrigger(Date.now())


    }
    const updateControllerFields = async (value, columnName) => {
        const result = await db.update(JsonForms)
            .set({
                [columnName]: value
            }).where(and(eq(JsonForms.id, record.id), eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress)))
        toast('Updated!!')
    }


    return (
        <div className='p-10 '>
            <div className='flex justify-between items-center'>

                <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={() => router.back()}>
                    <ArrowLeft />Back
                </h2>
                <div className='flex gap-3'>
                    <Link href={'/aiform/' + record?.id} target='_blank'>

                        <Button className='flex gap-2 bg-primary hover:bg-purple-700'><SquareArrowOutUpRight /> Live preview</Button>
                    </Link>
                    <RWebShare
                        data={{
                            text: jsonForm?.formHeading + ", build your form in seconds with ai form creator",
                            url: process.env.NEXT_PUBLIC_BASE_URL + '/ai-form/' + record?.id,
                            title: jsonForm?.formTitle,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button className='flex gap-2 bg-green-600 hover:bg-green-700'><Share2 /> share</Button>
                    </RWebShare>

                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='border rounded-lg shadow-md p-4'>
                    <Controller
                        selectedBorder={selectedBorder}
                        setSelectedBorder={setSelectedBorder}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        selectedStyle={(value) => {
                            updateControllerFields(value, 'style')
                            setSelectedStyle(value)
                        }}
                        selectedTheme={(value) => {
                            updateControllerFields(value, 'theme')
                            setSelectedTheme(value)
                        }

                        }
                        selectedBg={(value) => {
                            updateControllerFields(value, 'background')
                            setSelectedBg(value)
                        }
                        }
                    />
                </div>
                <div className='md:col-span-2 border rounded-lg  p-5 flex items-center justify-center' style={{ background: selectedBg }}>
                    <FormUi jsonForm={jsonForm} onFieldUpdate={onFieldUpdate}
                        deleteField={(index) => deleteField(index)}
                        selectedTheme={selectedTheme}
                        selectedStyle={selectedStyle}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditForm