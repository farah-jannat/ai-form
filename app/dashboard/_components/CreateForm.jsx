'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AiChatSession } from '@/configs/AiModel'
import { jsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/configs'
import { Loader2 } from 'lucide-react'

const PROMPT = ", On the basis of description create JSON form with formTitle, fromHeading along with fieldName, FieldTittle, FieldType, placeholder, label, required fields in JSON"


function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false)
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState();
    const { user } = useUser();
    const route = useRouter();


    const onCreateForm = async () => {

        setLoading(true)
        const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
        console.log(result.response.text());

        if (result.response.text()) {

            const resp = await db.insert(jsonForms).values({
                jsonform: result.response.text(),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD/MM/YYYY')
            }).returning({ id: jsonForms.id })

            console.log('New form id', resp[0].id);
            if (resp[0].id) {
                route.push('/edit-form/' + resp[0].id)
            }
            setLoading(false)
        }
        setLoading(false)
    }
    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Form</DialogTitle>
                        <DialogDescription>
                            <Textarea className='my-2' onChange={(event) => setUserInput(event.target.value)} placeholder="Write description of your form" />
                            <div className='flex gap-2 my-3 justify-end'>
                                <Button variant="destructive" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button disabled={loading} onClick={() => onCreateForm()}>
                                    {loading ?
                                        <Loader2 className='animate-spin' /> : 'create'
                                    }
                                </Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm