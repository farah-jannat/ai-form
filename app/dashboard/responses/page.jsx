'use client'

import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { index } from 'drizzle-orm/mysql-core'
import React, { useEffect, useState } from 'react'
import FormListItemResp from './_components/FormListItemResp'

function Responses() {
    const [formList, setFormList] = useState([]);
    const { user } = useUser();


    useEffect(() => {
        user && GetFormList()
    }, [user])
    const GetFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms?.createdBy, user?.primaryEmailAddress?.emailAddress))
        console.log('result form responses page', result)
        setFormList(result);
    }

    return (
        <div className='p-10 grid grid-cols-2 lg:grid-cols-3 gap-5'>

            {formList.map((form, index) => (
                <FormListItemResp
                    key={index}
                    formRecord={form}
                    jsonForm={JSON.parse(form.jsonform)}
                />
            ))}

        </div>
    )
}

export default Responses