import { Input } from '@/components/ui/input'
import React from 'react'

import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FieldEdit from './FieldEdit'

function FormUi({ jsonForm }) {
    return (
        <div className='border p-5 md:w-[600px] rounded-lg'>
            <h2 className='font-bold text-center text-2xl'>{jsonForm.formTitle}</h2>
            <h2 className='text-sm text-gray-400 text-center'>{jsonForm.formHeading}</h2>

            {jsonForm?.fields?.map((field, index) => (
                <div key={index}>

                    {field.fieldType == 'select' ?
                        <div className='my-3'>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={field.label} />
                                </SelectTrigger>
                                <SelectContent>
                                    {field.options.map((item, index) => (
                                        <SelectItem key={index} value="light">{item}</SelectItem>
                                    ))}


                                </SelectContent>
                            </Select>
                        </div>
                        : field.fieldType == 'checkbox' ?
                            <div className='my-3'>
                                <label className='text-xs text-gray-500'>{field.label}</label>
                                {field?.options ? field?.options?.map((item, index) => (
                                    <div className='flex gap-2'>
                                        <Checkbox />
                                        <h2>{item.label}</h2>

                                    </div>

                                ))
                                    :

                                    <div className='flex  items-center gap-2'>
                                        <Checkbox />
                                        <h2>{field.label}</h2>
                                    </div>
                                }
                            </div>
                            : field.fieldType == "radiogroup" ?
                                <div>
                                    <label className='text-xs text-gray-500'>{field.label}</label>

                                    <RadioGroup>
                                        {field?.options?.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <RadioGroupItem value={item} id={item} />
                                                <Label htmlFor={item}>{item}</Label>
                                            </div>
                                        ))}


                                    </RadioGroup>

                                </div>


                                : < div className='my-3'>
                                    <label className='text-xs text-gray-500'>{field.label}</label>
                                    <Input type={field?.type}
                                        placeholder={field?.placeholder}
                                    // name={field?.fieldName}
                                    />
                                </div>
                    }
                    <div><FieldEdit /></div>
                </div>

            ))}
        </div >
    )
}

export default FormUi