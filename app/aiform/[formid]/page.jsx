'use client'
import { JsonForms } from '@/configs/schema'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '@/configs'
import { and, eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import FormUi from '@/app/edit-form/_components/FormUi'
import Image from 'next/image'
import Link from 'next/link'

function LiveAiForm() {
    const params = useParams();
    const [record, setRecord] = useState([]);
    const [jsonForm, setJsonForm] = useState([])

    useEffect(() => {

        params && GetFormData()
    }, [params])

    const GetFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.id, Number(params?.formid)))
        console.log('reslult form formin', result)
        setRecord(result[0]);
        const cleanedResponse = result[0].jsonform.replace("```json", "").replace("```", "");
        setJsonForm(JSON.parse(cleanedResponse))


    }


    return (


        <div className='p-10 flex justify-center items-center'
            style={{ backgroundImage: record?.background }}
        >


            {record && <FormUi
                jsonForm={jsonForm}
                onFieldUpdate={() => console.log}
                deleteField={() => console.log}
                selectedStyle={record?.style ? JSON.parse(record?.style) : null}
                // selectedStyle={JSON.parse(record?.style)}
                selectedTheme={record?.theme}
                editable={false}
                formId={record.id}



            />}
            <Link href={process.env.NEXT_PUBLIC_BASE_URL} className='flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer'>
                <Image src={'/logo.svg'} width={120} height={80} alt='logo' />
                Creat your own ai form
            </Link>
        </div>






    )
}

export default LiveAiForm