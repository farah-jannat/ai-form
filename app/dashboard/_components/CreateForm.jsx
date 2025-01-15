'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AiChatSession } from '@/configs/AIModel'

const PROMPT = ", On the basis of description please give form in json format with form tittle, form subheading with form having form field, Form name,  placeholder name, and form label, field type , field required In Json format"
function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false)
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState();


    const onCreateForm = async () => {
        console.log(userInput);
        const result = await AiChatSession.sendMessage("Description:" + userInput + PROMPT);
        console.log(result.response.text());

        if (result.response.text()) {
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
                                <Button disabled={loading} onClick={() => onCreateForm()}>Create</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm