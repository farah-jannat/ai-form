'use client'
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs';
import { desc, eq } from 'drizzle-orm';
import FormListItem from './FormListItem';

function FormList() {
    const { user } = useUser();
    const [formList, setFormList] = useState([]);
    useEffect(() => {
        user && GetFormList()
    }, [user])
    const GetFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));
        console.log('result from getformlist', result)
        setFormList(result);
    }

    return (
        <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
            {formList.map((form, index) => (
                <div key={index}><FormListItem jsonform={JSON.parse(form.jsonform)} /></div>
            ))}
        </div>
    )
}

export default FormList